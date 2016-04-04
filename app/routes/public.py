from flask import Blueprint, render_template


public = Blueprint('public_route', __name__, url_prefix="")


@public.route('/')
def index():
    return render_template('index.html')


@public.route('/login')
def login():
    return render_template('login.html')


@public.route('/register')
def register():
    return render_template('register.html')
