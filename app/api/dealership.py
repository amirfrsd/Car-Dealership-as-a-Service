from flask import Blueprint, jsonify, request
from ..models import Dealership, Owner
from ..db import session

dealership = Blueprint(
    'dealership_api', __name__, url_prefix="/api/v1")


@dealership.route('/owner/<int:id>/dealerships', methods=['GET'])
def get_my_dealerships(id):

    owner = session.query(Owner).get(id)

    if not owner:
        return jsonify({
            'success': False
        })

    dealerships = session.query(Dealership).filter(
        Dealership.owner_id == owner.id)

    response = []

    for dealership in dealerships:
        response.append(
            {
                'id': dealership.id,
                'name': dealership.name,
                'location': dealership.location,
                'contact': dealership.contact
            }
        )

    return jsonify({
        'success': True,
        'dealerships': response
    })


@dealership.route('/dealerships', methods=['GET'])
def get_all_dealerhips():

    dealerships = session.query(Dealership)

    response = []

    for dealership in dealerships:
        response.append(
            {
                'id': dealership.id,
                'name': dealership.name,
                'location': dealership.location,
                'contact': dealership.contact
            }
        )

    return jsonify({
        'success': True,
        'dealerships': response
    })


@dealership.route('/dealerships', methods=['POST'])
def create_dealership():

    json_data = request.json

    owner = session.query(Owner).get(json_data['id'])

    if not owner:
        return jsonify({
            'success': False
        })

    newDealership = Dealership(
        name=json_data['name'],
        location=json_data['location'],
        contact=json_data['contact'],
        owner=owner
    )

    session.add(newDealership)
    session.commit()

    return jsonify({
        'success': True
    })


@dealership.route('/dealership/<int:id>', methods=['GET'])
def get_dealership(id):

    dealership = session.query(Dealership).get(id)

    if not dealership:
        return jsonify({
            'success': False
        })

    return jsonify({
        'success': True,
        'id': dealership.id,
        'name': dealership.name,
        'location': dealership.location,
        'contact': dealership.contact,
        'owner_id': dealership.owner_id
    })


@dealership.route('/dealership/<int:id>', methods=['PUT'])
def edit_dealerhip(id):
    json_data = request.json

    dealership = session.query(Dealership).get(id)

    if not dealership:
        return jsonify({
            'success': False
        })

    dealership.name = json_data['name']
    dealership.location = json_data['location']
    dealership.contact = json_data['contact']
    session.commit()

    return jsonify({
        'success': True
    })
