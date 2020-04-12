from flask import Flask

from .machine import machine_bp


def init_app(app: Flask):
    app.register_blueprint(machine_bp)
