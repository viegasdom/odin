import logging
import os
from flask import Flask


logger = logging.getLogger(__name__)


class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URI",
        "postgres://postgres:mysecretpassword@127.0.0.1:5432/odin",
    )


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(Config):
    TESTING = True


def create_app():
    from . import models, routes

    app = Flask(__name__)

    # Configurations
    env = os.environ.get("ENVIRONMENT", "development")

    if env == "production":
        app.config.from_object(ProductionConfig())
    elif env == "testing":
        app.config.from_object(TestingConfig())
    elif env == "development":
        app.config.from_object(DevelopmentConfig())
    else:
        raise ValueError(
            f"Invalid environment {env}. "
            "Please provide one of the following: "
            "development (default), testing or production"
        )

    models.init_app(app)
    routes.init_app(app)

    return app
