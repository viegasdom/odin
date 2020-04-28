from flask import request, jsonify, Blueprint

from backend.models import db
from backend.models.machine import Machine
from backend.serializers.machine import (
    MachinePostSerializer,
    MachineGetSerializer,
    MachinePatchSerializer,
)


machine_bp = Blueprint("machine_bp", __name__)


@machine_bp.route("/machines", methods=["GET"])
def get_machines():
    machines = db.session.query(Machine)
    serialized_machines = [
        MachineGetSerializer.from_orm(machine).dict()
        for machine in machines
    ]
    return jsonify(serialized_machines)


@machine_bp.route("/machines", methods=["POST"])
def create_machine():
    data = request.get_json()
    serialized_data = MachinePostSerializer(**data).dict()
    machine = Machine(**serialized_data)
    db.session.add(machine)
    db.session.commit()
    return jsonify(MachineGetSerializer.from_orm(machine).dict()), 201


@machine_bp.route("/machines/<int:id_>", methods=["DELETE"])
def delete_machine(id_: int):
    machine = db.session.query(Machine).get(id_)
    db.session.delete(machine)
    db.session.commit()
    return '', 204


@machine_bp.route("/machines/<int:id_>", methods=["PATCH"])
def update_machine(id_: int):
    data = request.get_json()
    serialized_data = MachinePatchSerializer(**data).dict()
    machine = db.session.query(Machine).get(id_)

    for attribute, value in serialized_data.items():
        if value:
            setattr(machine, attribute, value)

    db.session.commit()

    return jsonify(MachineGetSerializer.from_orm(machine).dict()), 200
