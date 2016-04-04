from flask import Blueprint, request
from ..models import Client
from ..db import session

client = Blueprint('client_api', __name__, url_prefix="/api/v1/client")


@client.route('/register', methods=['POST'])
def register():

    newClient = Client(name=request.json['name'], email=request.json['email'], password=request.json['password'])
    session.add(newClient)
    session.commit()

    return 'api client test'
