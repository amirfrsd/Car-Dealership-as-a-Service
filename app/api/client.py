from flask import Blueprint, jsonify, request
from ..models import Client
from ..db import session

client = Blueprint('client_api', __name__, url_prefix="/api/v1/client")


@client.route('/<int:client_id>', methods=['GET'])
def get_profile(client_id):

    user = session.query(Client).get(client_id)

    if not user:
        return jsonify({
            'success': False
        })

    return jsonify({
        'success': True,
        'id': user.id,
        'type': user.user_type,
        'name': user.name,
        'email': user.email,
        'contact': user.contact
    })


@client.route('/<int:client_id>', methods=['PUT'])
def update_profile(client_id):

    json_data = request.json

    user = session.query(Client).get(client_id)

    if not user:
        return jsonify({
            'success': False
        })

    user.name = json_data['name']
    user.email = json_data['email']
    user.contact = json_data['contact']
    session.commit()
    return jsonify({
        'success': True
    })
