from flask import Blueprint
from ..models import Owner
from ..db import session
import json

owner = Blueprint('owner', __name__)

@owner.route('/')
def show_owners():
    users = session.query(Owner).get(1)
    return json.dumps(users.name)
