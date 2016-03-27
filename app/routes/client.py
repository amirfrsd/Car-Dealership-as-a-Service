from flask import Blueprint, render_template

client = Blueprint('client_route', __name__, url_prefix="/client")

@client.route('/profile')
def profile():
    return render_template('test.html')
