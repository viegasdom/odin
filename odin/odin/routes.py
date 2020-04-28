from starlette.routing import Route, Mount, WebSocketRoute

from .endpoints import Process, Processes, System


routes = [
    WebSocketRoute("/system", System),
    Mount(
        "/processes",
        routes=[
            Route("/", Processes),
            Route("/{pid:int}", Process, methods=["GET"]),
            Route("/{pid:int}", Process, methods=["DELETE"]),
        ],
    ),
]
