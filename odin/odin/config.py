from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware

from .routes import routes


def create_app() -> Starlette:
    app = Starlette(debug=True, routes=routes)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app
