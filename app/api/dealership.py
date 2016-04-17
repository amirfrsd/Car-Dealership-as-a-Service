from flask import Blueprint, jsonify, request
from ..models import Dealership, Owner
from ..db import session

dealership = Blueprint(
    'dealership_api', __name__, url_prefix="/api/v1")


@dealership.route('/owner/<int:id>/dealerships', methods=['GET'])
def get_dealerships(id):

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


@dealership.route('s', methods=['POST'])
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
