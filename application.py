from app import app

application = app

if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')
