from flask import Blueprint, request, jsonify
from ..models import Owner, Client
from ..db import session


auth = Blueprint('auth_api', __name__, url_prefix="/api/v1")


@auth.route('/register', methods=['POST'])
def register():

    json_data = request.json

    if(json_data['type'] == 'owner'):
        newUser = Owner(
            name=json_data['name'],
            email=json_data['email'],
        )

    else:
        newUser = Client(
            name=json_data['name'],
            email=json_data['email'],
        )

    newUser.hash_password(json_data['password'])

    try:
        session.add(newUser)
        session.commit()
        status = 'success'
    except:
        status = 'email already in use'

    return jsonify({
        'result': status
    })


@auth.route('/login', methods=['POST'])
def login():
    json_data = request.json

    if(json_data['type'] == 'owner'):
        user = session.query(Owner).filter(
            Owner.email.in_([json_data['email']])).first()
    else:
        user = session.query(Client).filter(
            Client.email.in_([json_data['email']])).first()

    if not user or not user.check_password(json_data['password']):
        return jsonify({
            'success': False
        })

    return jsonify({
        'success': True,
        'id': user.id,
        'type': user.user_type
    })
