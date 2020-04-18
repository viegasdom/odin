from flask import request, jsonify, Blueprint

from backend.models import db
from backend.models.machine import Machine
from backend.serializers.machine import (
    MachinePostSerializer,
    MachineGetSerializer,
)


machine_bp = Blueprint("machine_bp", __name__)


@machine_bp.route("/machines", methods=["GET", "POST"])
def machine():
    if request.method == "GET":
        machines = db.session.query(Machine)
        serialized_machines = [
            MachineGetSerializer.from_orm(machine).dict()
            for machine in machines
        ]
        return jsonify(serialized_machines)

    if request.method == "POST":
        data = request.get_json()
        serialized_data = MachinePostSerializer(**data).dict()
        machine = Machine(**serialized_data)
        db.session.add(machine)
        db.session.commit()
        return jsonify(MachineGetSerializer.from_orm(machine).dict())
