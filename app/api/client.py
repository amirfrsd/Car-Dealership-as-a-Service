from flask import Blueprint, jsonify
from ..models import Client
from ..db import session

client = Blueprint('client_api', __name__, url_prefix="/api/v1")


@client.route('/clients', methods=['GET'])
def get_clients():

    clients = session.query(Client)
    response = []

    for client in clients:
        response.append(
            {
                'id': client.id,
                'name': client.name,
                'email': client.email,
                'contact': client.contact
            }
        )

    return jsonify({
        'success': True,
        'clients': response
    })


@client.route('/client/<int:id>', methods=['GET'])
def get_client(id):
    client = session.query(Client).get(id)

    if not client:
        return jsonify({
            'success': False
        })

    return jsonify({
        'success': True,
        'id': client.id,
        'name': client.name,
        'email': client.email,
        'contact': client.contact
    })
