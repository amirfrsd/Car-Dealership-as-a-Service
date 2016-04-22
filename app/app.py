from flask import Flask
from .api import auth_api, profile_api, car_api, dealership_api
from .views import default_route
from .db import Base, engine
from config import S3_BUCKET, S3_KEY, S3_LOCATION, S3_SECRET, S3_UPLOAD_DIRECTORY

app = Flask(__name__)

# Register blueprints
app.register_blueprint(auth_api)
app.register_blueprint(profile_api)
app.register_blueprint(car_api)
app.register_blueprint(dealership_api)
app.register_blueprint(default_route)

# App configuration
app.config["S3_LOCATION"] = S3_LOCATION
app.config["S3_BUCKET"] = S3_BUCKET
app.config["S3_UPLOAD_DIRECTORY"] = S3_UPLOAD_DIRECTORY
app.config["S3_KEY"] = S3_KEY
app.config["S3_SECRET"] = S3_SECRET

# Create tables
Base.metadata.create_all(engine)
