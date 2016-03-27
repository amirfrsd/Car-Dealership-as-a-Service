from flask import Blueprint

car = Blueprint('car_api', __name__, url_prefix="/api/v1/car")


@car.route('/test')
def test():
    return 'api car test'
