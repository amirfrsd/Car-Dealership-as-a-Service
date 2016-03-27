from flask import Blueprint

dealership = Blueprint('dealership_api', __name__, url_prefix="/api/v1/dealership")


@dealership.route('/test')
def test():
    return 'api dealership test'
