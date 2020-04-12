from flask import Flask, Response

from .machine import machine_bp


def after_request(response: Response) -> Response:
    """
    Defines what changes are made to the response object
    before being sent to the client.
    """

    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def init_app(app: Flask):
    app.after_request(after_request)
    app.register_blueprint(machine_bp)
