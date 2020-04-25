import asyncio
import psutil
import time

from dataclasses import dataclass, asdict
from fastapi import HTTPException
from typing import Any, Dict, List, Generator, Optional

from .filters import Search


# For flexibility use the any for the dictionary values
_AttributeValue = Any
_ProcessData = Dict[str, List[_AttributeValue]]
_SystemInfo = Dict[str, _AttributeValue]


@dataclass(frozen=True)
class Process:
    pid: int
    name: str
    status: str
    create_time: float
    num_threads: int
    cpu_percent: float
    cpu_times: List[float]
    memory_info: List[int]
    memory_percent: float
    username: str


def parse_processes(processes: Generator[Process, None, None]) -> _ProcessData:
    proc_data: _ProcessData = {}
    for proc in processes:
        if proc.username.startswith("_"):
            continue

        procs = proc_data.get(proc.username, [])
        procs.append(asdict(proc))
        proc_data[proc.username] = procs

    for username in proc_data.keys():
        proc_data[username].sort(
            key=lambda process: process["pid"], reverse=True
        )

    return proc_data


def query_process(pid: int) -> psutil.Process:
    try:
        process = psutil.Process(pid)
    except psutil.NoSuchProcess:
        raise HTTPException(status_code=404, detail="Process not found")

    if not process.is_running():
        raise HTTPException(
            status_code=404, detail="Process is not running anymore"
        )

    # process.cpu_percent() works in a funny way where at the first call
    # we get a 0.0 since there's no value for the percentage at that point
    # and the following percentage will be the current process usage + previous
    start = time.time()
    try:
        while process.cpu_percent() == 0.0:
            process.cpu_percent()
            current = time.time()
            td = current - start
            if td > 0.3:
                break
    except psutil.AccessDenied:

        def patched_cpu_percent():
            return -1

        # Means user has no access to cpu data
        # in this cases we return a custom number
        # so it can be indentified has an anomally
        process.cpu_percent = patched_cpu_percent

    return process


def query_processes(search: Optional[str] = None) -> List[_ProcessData]:
    if not search:
        return [
            process.as_dict()
            for process in psutil.process_iter()
            if not process.username().startswith("_")
        ]

    processes = []
    search_filter = Search(["name", "pid", "username"])

    for process in psutil.process_iter():
        result = search_filter(process, search)
        if result and not process.username().startswith("_"):
            processes.append(result.as_dict())

    return processes


class Monitor:
    def __init__(self, proc_attributes: List[str], rate: float = 10.0):
        self.proc_attrs = proc_attributes
        self.rate = rate

    async def system_info(self) -> _SystemInfo:
        """
        Function that outputs info about all processes running on the system.

        Returns:
            A list of dicts for relevant attributes from the processes
            running on the machine.
        """

        await self.feedback_interval()

        raw_procs = (
            Process(**proc.info)
            for proc in psutil.process_iter(self.proc_attrs)
        )

        procs = parse_processes(raw_procs)
        memory = psutil.virtual_memory()._asdict()
        swap = psutil.swap_memory()._asdict()
        cpu = psutil.cpu_percent(percpu=True)
        os = {
            "posix": psutil.POSIX,
            "linux": psutil.LINUX,
            "windows": psutil.WINDOWS,
            "macos": psutil.MACOS,
            "freebsd": psutil.FREEBSD,
            "netbsd": psutil.NETBSD,
            "openbsd": psutil.OPENBSD,
            "bsd": psutil.BSD,
            "sunos": psutil.SUNOS,
            "aix": psutil.AIX,
        }
        return {
            "processes": procs,
            "memory": memory,
            "swap": swap,
            "cpu": cpu,
            "os": os,
        }

    async def feedback_interval(self):
        """
        Function that causes the websocket to await before
        sending more feedback.

        Args:
            seconds: How long the feedback interval should be.
        """

        await asyncio.sleep(self.rate)
