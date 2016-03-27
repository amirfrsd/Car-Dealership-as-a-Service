from flask import Flask
from .api import owner_api, client_api, car_api, dealership_api
from .routes import public_route, client_route, owner_route

app = Flask(__name__)

app.register_blueprint(public_route)
app.register_blueprint(client_route)
app.register_blueprint(owner_route)
app.register_blueprint(owner_api)
app.register_blueprint(client_api)
app.register_blueprint(car_api)
app.register_blueprint(dealership_api)
