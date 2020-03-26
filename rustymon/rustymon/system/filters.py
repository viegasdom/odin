import logging
from typing import Any, List, Optional


logger = logging.getLogger(__name__)


# Object can be any object passed to the search
Object = Any


class Search(object):
    """
    Class used to search in an object if a string exists in it's attributes.

    Should be specified on initialization which attributes are being searched
    on and the string being used as a reference.
    """

    def __init__(self, fields: List[str]):
        self.fields = fields

    def __call__(self, instance: Object, search: str) -> Optional[Object]:
        for field in self.fields:
            instance_attribute_value = getattr(instance, field)
            instance_value = (
                instance_attribute_value()
                if callable(instance_attribute_value)
                else instance_attribute_value
            )
            if search in str(instance_value):
                return instance

        return None
