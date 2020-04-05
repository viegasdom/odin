from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from odin.system.monitor import (
    Monitor,
    query_process,
    query_processes,
)
from typing import Optional


origins = [
    "http://localhost:1234",
]


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
monitor = Monitor(proc_attributes=process_attributes, rate=1.0)
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/processes")
async def get_processes(search: Optional[str] = None):
    """
    Fetches all the processes currently running in the system.

    Can receive a query parameter:
        - search: Will query for processes that have either a name,
                  username or pid matching the search string.
    """

    processes = query_processes(search)
    return processes


@app.get("/processes/{pid}")
async def get_process(pid: int):
    process = query_process(pid)
    return process.as_dict()


@app.post("/processes/{pid}/kill")
async def kill_process(pid: int):
    process = query_process(pid)
    process.kill()
    return {"detail": "Process killed with success"}


# @app.post("/verify")
# async def verify_key(key: str):
#     try:
#         verify_config_key(key)
#         return {"key_ "}
#     except:


@app.websocket("/system")
async def system_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        processes = await monitor.system_info()
        await websocket.send_json(processes)
