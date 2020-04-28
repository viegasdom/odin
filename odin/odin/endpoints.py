from starlette.endpoints import HTTPEndpoint, WebSocketEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.websockets import WebSocket
from websockets import ConnectionClosedOK

from odin.system.monitor import (
    Monitor,
    query_process,
    query_processes,
)


class Processes(HTTPEndpoint):
    async def get(self, request: Request) -> JSONResponse:
        search = request.query_params.get("search")
        processes = query_processes(search)
        return JSONResponse(processes)


class Process(HTTPEndpoint):
    async def get(self, request: Request) -> JSONResponse:
        pid = request.path_params.get("pid")
        process = query_process(pid)
        return JSONResponse(process.as_dict())

    async def delete(self, request: Request) -> JSONResponse:
        pid = request.path_params.get("pid")
        process = query_process(pid)
        process.kill()
        return JSONResponse(status_code=204)


class System(WebSocketEndpoint):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        # Attributes that are relevant for each process.
        # If new process attributes are needed add to this list
        # as long as they're compliant with psutil Process attributes.
        process_attributes = [
            "pid",
            "name",
            "status",
            "create_time",
            "num_threads",
            "cpu_percent",
            "cpu_times",
            "memory_info",
            "memory_percent",
            "username",
        ]
        self.monitor = Monitor(proc_attributes=process_attributes, rate=1.0)

    async def on_connect(self, websocket: WebSocket):
        await websocket.accept()
        while True:
            try:
                processes = await self.monitor.system_info()
                await websocket.send_json(processes)
            except ConnectionClosedOK:
                break
