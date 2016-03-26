from flask import Flask

app = Flask(__name__)


@app.route('/')
def show_owners():

    return "Hello World!"
