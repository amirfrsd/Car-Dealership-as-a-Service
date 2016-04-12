from flask import Flask
from .api import auth_api, profile_api, car_api, dealership_api
from .views import default_route
from .db import Base, engine

app = Flask(__name__)

# Register blueprints
app.register_blueprint(auth_api)
app.register_blueprint(profile_api)
app.register_blueprint(car_api)
app.register_blueprint(dealership_api)
app.register_blueprint(default_route)

# Create tables
Base.metadata.create_all(engine)
