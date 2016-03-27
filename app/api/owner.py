from flask import Blueprint
from ..models import Owner
from ..db import session
import json

owner = Blueprint('owner_api', __name__, url_prefix="/api/v1/owner")

@owner.route('s')
def test():
    users = session.query(Owner).get(1)
    return json.dumps(users.name)
