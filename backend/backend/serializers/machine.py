from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class MachinePostSerializer(BaseModel):
    access_key: str
    name: str
    host: str


class MachineGetSerializer(MachinePostSerializer):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class MachinePatchSerializer(BaseModel):
    access_key: Optional[str]
    name: Optional[str]
    host: Optional[str]
