from .base import db, Base


class Machine(Base):
    __tablename__ = "machines"

    access_key = db.Column(db.String(2048), nullable=False)
    name = db.Column(db.String(64), nullable=False, unique=True)
    host = db.Column(db.String(2048), nullable=False, unique=True)
