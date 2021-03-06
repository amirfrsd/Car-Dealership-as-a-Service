from flask import Blueprint, jsonify, request
from ..models import Client, Owner
from ..db import session
from ..amazon import s3_upload
import base64

profile = Blueprint('profile_api', __name__, url_prefix="/api/v1")


@profile.route('/<type>/<int:id>', methods=['GET'])
def get_profile(type, id):

    if(request.headers.get('from') == 'profile'):
        if(type == 'client'):
            user = session.query(Client).get(id)
        else:
            user = session.query(Owner).get(id)
    else:
        user = session.query(Owner).get(request.headers.get('id'))
        search_user = session.query(Client).get(id)

    if not user:
        return jsonify({
            'unauthorized': True,
        })

    if not user.check_auth_token(request.headers.get('token')):
        return jsonify({
            'unauthorized': True,
        })

    if(request.headers.get('from') != 'profile'):
        user = search_user

    return jsonify({
        'success': True,
        'id': user.id,
        'img': user.img,
        'type': user.user_type,
        'name': user.name,
        'email': user.email,
        'contact': user.contact
    })


@profile.route('/<type>/<int:id>', methods=['PUT'])
def update_profile(type, id):

    json_data = request.json

    if(type == 'client'):
        user = session.query(Client).get(id)
    else:
        user = session.query(Owner).get(id)

    if not user:
        return jsonify({
            'unauthorized': True,
        })

    if not user.check_auth_token(request.headers.get('token')):
        return jsonify({
            'unauthorized': True,
        })

    if(json_data['data_uri']):
        data = json_data['data_uri'].split(',')[1]
        data = base64.b64decode(data)
        data_extension = json_data['data_extension']

        img = s3_upload(data, data_extension)
        user.img = img

    user.name = json_data['name']
    user.email = json_data['email']
    user.contact = json_data['contact']
    session.commit()
    return jsonify({
        'success': True
    })


@profile.route('/<type>/<int:id>/password', methods=['PUT'])
def change_password(type, id):
    json_data = request.json

    if(type == 'client'):
        user = session.query(Client).get(id)
    else:
        user = session.query(Owner).get(id)

    if not user or not user.check_password(json_data['password']):
        return jsonify({
            'unauthorized': True,
        })

    if not user.check_auth_token(request.headers.get('token')):
        return jsonify({
            'unauthorized': True,
        })

    user.hash_password(json_data['newPassword'])

    return jsonify({
        'success': True
    })


@profile.route('/<type>/<int:id>', methods=['DELETE'])
def delete_user(type, id):

    json_data = request.json

    if(type == 'client'):
        user = session.query(Client).get(id)
    else:
        user = session.query(Owner).get(id)

    if not user or not user.check_password(json_data['password']):
        return jsonify({
            'unauthorized': True,
        })

    if not user.check_auth_token(request.headers.get('token')):
        return jsonify({
            'unauthorized': True,
        })

    session.delete(user)
    session.commit()

    return jsonify({
        'success': True
    })


@profile.route('/clients', methods=['GET'])
def get_clients():

    owner = session.query(Owner).get(request.headers.get('owner_id'))

    if not owner:
        return jsonify({
            'unauthorized': True,
        })

    if not owner.check_auth_token(request.headers.get('token')):
        return jsonify({
            'unauthorized': True,
        })

    clients = session.query(Client)
    response = []

    for client in clients:
        response.append(
            {
                'id': client.id,
                'img': client.img,
                'name': client.name,
                'email': client.email,
                'contact': client.contact
            }
        )

    return jsonify({
        'success': True,
        'clients': response
    })
