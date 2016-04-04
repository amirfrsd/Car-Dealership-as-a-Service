from flask import Flask
from .api import auth_api, client_api, car_api, dealership_api
from .routes import public_route, client_route, owner_route
from .db import Base, engine

app = Flask(__name__)

# Register blueprints
app.register_blueprint(public_route)
app.register_blueprint(client_route)
app.register_blueprint(owner_route)
app.register_blueprint(auth_api)
app.register_blueprint(client_api)
app.register_blueprint(car_api)
app.register_blueprint(dealership_api)

# Create tables
Base.metadata.create_all(engine)
