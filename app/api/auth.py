from flask import Blueprint, request, jsonify
from ..models import Owner, Client
from ..db import session
import uuid


auth = Blueprint('auth_api', __name__, url_prefix="/api/v1")


@auth.route('/register', methods=['POST'])
def register():

    json_data = request.json

    default_img = 'https://s3-eu-west-1.amazonaws.com/cardealershipasaservice/avatar_placeholder.png'

    if(json_data['type'] == 'owner'):
        newUser = Owner(
            img=default_img,
            name=json_data['name'],
            email=json_data['email'],
            auth_token=uuid.uuid4().hex
        )

    else:
        newUser = Client(
            img=default_img,
            name=json_data['name'],
            email=json_data['email'],
            auth_token=uuid.uuid4().hex
        )

    newUser.hash_password(json_data['password'])

    try:
        session.add(newUser)
        session.commit()
        status = True
    except:
        status = False

    return jsonify({
        'success': status
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

    user.auth_token = uuid.uuid4().hex
    session.commit()

    return jsonify({
        'success': True,
        'id': user.id,
        'type': user.user_type,
        'token': user.auth_token
    })
