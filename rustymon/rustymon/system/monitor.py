import asyncio
import psutil
from dataclasses import dataclass, asdict
from typing import Any, Dict, List, Generator


# For flexibility use the any for the dictionary values
AttributeValue = Any
ProcessData = Dict[str, List[AttributeValue]]
SystemInfo = Dict[str, AttributeValue]


@dataclass(frozen=True)
class Process(object):
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


def parse_processes(processes: Generator[Process, None, None]):
    proc_data: ProcessData = {}
    for proc in processes:
        if proc.username.startswith("_"):
            continue

        procs = proc_data.get(proc.username, [])
        procs.append(asdict(proc))
        proc_data[proc.username] = procs

    for username in proc_data.keys():
        proc_data[username].sort(key=lambda process: process["pid"])

    return proc_data


class Monitor(object):
    def __init__(self, proc_attributes: List[str], rate: float = 10.0):
        self.proc_attrs = proc_attributes
        self.rate = rate

    async def system_info(self) -> SystemInfo:
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
        return {
            "processes": procs,
            "memory": memory,
            "swap": swap,
            "cpu": cpu,
        }

    async def feedback_interval(self):
        """
        Function that causes the websocket to await before
        sending more feedback.

        Args:
            seconds: How long the feedback interval should be.
        """

        await asyncio.sleep(self.rate)
