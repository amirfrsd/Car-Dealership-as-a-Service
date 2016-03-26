from flask import Flask
from .api import owner

app = Flask(__name__)

app.register_blueprint(owner)
