import asyncio
import psutil
from typing import Any, Dict, List


# For flexibility use the any since each Process attribute
# since there's multiple types an Process attribute can return
AttributeValue = Any
ProcessData = Dict[str, AttributeValue]


class Monitor(object):
    def __init__(self, proc_attributes: List[str], rate: float = 10.0):
        self.proc_attrs = proc_attributes
        self.rate = rate

    async def system_info(self) -> ProcessData:
        """
        Function that outputs info about all processes running on the system.

        Returns:
            A list of dicts for relevant attributes from the processes
            running on the machine.
        """

        await self.feedback_interval()
        procs = [proc.info for proc in psutil.process_iter(self.proc_attrs)]
        memory = psutil.virtual_memory()._asdict()
        swap = psutil.swap_memory()._asdict()
        cpu = psutil.cpu_percent()
        return {"processes": procs, "memory": memory, "swap": swap, "cpu": cpu}

    async def feedback_interval(self):
        """
        Function that causes the websocket to await before
        sending more feedback.

        Args:
            seconds: How long the feedback interval should be.
        """

        await asyncio.sleep(self.rate)
