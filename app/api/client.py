from flask import Blueprint

client = Blueprint('client_api', __name__, url_prefix="/api/v1/client")


@client.route('/test')
def test():
    return 'api client test'
