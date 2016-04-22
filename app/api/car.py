from flask import Blueprint, jsonify, request
from ..models import Dealership, Owner, Car
from ..db import session
from ..amazon import s3_upload
import base64

car = Blueprint('car_api', __name__, url_prefix="/api/v1")


@car.route('/car/<int:id>', methods=['GET'])
def get_car(id):
    car = session.query(Car).get(id)

    if not car:
        return jsonify({
            'success': False
        })

    dealerships = []

    for dealership in car.dealership:
        dealerships.append(
            {
                'id': dealership.id,
                'name': dealership.name,
                'location': dealership.location,
                'contact': dealership.contact
            }
        )

    return jsonify({
        'success': True,
        'id': car.id,
        'img': car.img,
        'brand': car.brand,
        'model': car.model,
        'license': car.license_plate,
        'color': car.color,
        'mileage': car.mileage,
        'fuel': car.fuel,
        'price': car.price,
        'year': car.year,
        'location': car.location,
        'owner_id': car.owner_id,
        'dealerships': dealerships
    })


@car.route('/car/<int:id>', methods=['DELETE'])
def delete_car(id):

    json_data = request.json

    owner = session.query(Owner).get(json_data['owner'])

    if not owner or not owner.check_password(json_data['password']):
        return jsonify({
            'success': False
        })

    car = session.query(Car).get(id)

    if not car or (car.owner_id != owner.id):
        return jsonify({
            'success': False
        })

    session.delete(car)
    session.commit()

    return jsonify({
        'success': True
    })


@car.route('/car/<int:id>', methods=['PUT'])
def edit_car(id):
    json_data = request.json

    car = session.query(Car).get(id)

    if not car:
        return jsonify({
            'success': False
        })

    dealerships = []

    for index in json_data['dealerships']:
        newDealership = session.query(Dealership).get(index)
        if newDealership:
            dealerships.append(newDealership)

    if(json_data['data_uri']):
        data = json_data['data_uri'].split(',')[1]
        data = base64.b64decode(data)
        data_extension = json_data['data_extension']

        img = s3_upload(data, data_extension)
        car.img = img

    car.brand = json_data['brand']
    car.model = json_data['model']
    car.license_plate = json_data['license']
    car.color = json_data['color']
    car.mileage = json_data['mileage']
    car.fuel = json_data['fuel']
    car.price = json_data['price']
    car.year = json_data['year']
    car.location = json_data['location']
    car.dealership = dealerships
    session.commit()

    return jsonify({
        'success': True
    })


@car.route('/owner/<int:id>/cars', methods=['GET'])
def get_cars(id):

    cars = session.query(Car).filter(Car.owner_id == id)

    response = []

    if not cars:
        return jsonify({
            'success': False
        })

    for car in cars:
        response.append(
            {
                'id': car.id,
                'img': car.img,
                'brand': car.brand,
                'model': car.model,
                'license': car.license_plate,
                'color': car.color,
                'mileage': car.mileage,
                'fuel': car.fuel,
                'price': car.price,
                'location': car.location,
                'owner_id': car.owner_id,
                'year': car.year
            }
        )

    return jsonify({
        'success': True,
        'cars': response
    })


@car.route('/cars', methods=['GET'])
def get_all_cars():

    cars = session.query(Car)
    response = []

    for car in cars:
        dealerships = []
        for dealership in car.dealership:
            dealerships.append(
                {
                    'id': dealership.id,
                    'name': dealership.name,
                    'location': dealership.location,
                    'contact': dealership.contact
                }
            )

        response.append(
            {
                'id': car.id,
                'img': car.img,
                'brand': car.brand,
                'model': car.model,
                'license': car.license_plate,
                'color': car.color,
                'mileage': car.mileage,
                'fuel': car.fuel,
                'price': car.price,
                'year': car.year,
                'location': car.location,
                'owner_id': car.owner_id,
                'dealerships': dealerships
            }
        )

    return jsonify({
        'success': True,
        'cars': response
    })


@car.route('/cars', methods=['POST'])
def add_car():

    json_data = request.json

    if(json_data['data_uri']):
        data = json_data['data_uri'].split(',')[1]
        data = base64.b64decode(data)
        data_extension = json_data['data_extension']

        img = s3_upload(data, data_extension)
    else:
        img = 'https://s3-eu-west-1.amazonaws.com/cardealershipasaservice/car_placeholder.png'

    owner = session.query(Owner).get(json_data['owner_id'])

    if not owner:
        return jsonify({
            'success': False
        })

    dealerships = []

    for index in json_data['dealerships']:
        newDealership = session.query(Dealership).get(index)
        if newDealership:
            dealerships.append(newDealership)

    newCar = Car(
        img=img,
        brand=json_data['brand'],
        model=json_data['model'],
        license_plate=json_data['license'],
        color=json_data['color'],
        mileage=json_data['mileage'],
        fuel=json_data['fuel'],
        price=json_data['price'],
        year=json_data['year'],
        location=json_data['location'],
        owner=owner,
        dealership=dealerships)

    session.add(newCar)
    session.commit()

    return jsonify({
        'success': True
    })
