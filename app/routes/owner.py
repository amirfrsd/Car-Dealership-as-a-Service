from flask import Blueprint, render_template

owner = Blueprint('owner_route', __name__, url_prefix="/owner")


@owner.route('/profile')
def profile():
    return render_template('test.html')
