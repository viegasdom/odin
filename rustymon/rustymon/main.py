from rustymon.system.monitor import Monitor, query_process
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware


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
monitor = Monitor(proc_attributes=process_attributes, rate=5.0)
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/processes/{pid}")
async def get_process(pid: int):
    return query_process(pid)


@app.websocket("/system")
async def system_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        processes = await monitor.system_info()
        await websocket.send_json(processes)
