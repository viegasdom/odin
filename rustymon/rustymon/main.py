from rustymon.system.monitor import Monitor
from fastapi import FastAPI, WebSocket


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
]
monitor = Monitor(proc_attributes=process_attributes, rate=10.0)
app = FastAPI()


@app.websocket("/system")
async def system_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        processes = await monitor.system_info()
        await websocket.send_json(processes)
