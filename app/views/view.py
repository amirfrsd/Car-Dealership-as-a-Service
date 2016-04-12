from flask import Blueprint, render_template


default = Blueprint('default_route', __name__, url_prefix="")


@default.route('/', defaults={'path': ''})
@default.route('/<path:path>')
def index(path):
    return render_template('index.html')
