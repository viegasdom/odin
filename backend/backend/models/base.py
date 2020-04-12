from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db: SQLAlchemy = SQLAlchemy()


class Base(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
