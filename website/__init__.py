from flask import Flask
from pymongo import MongoClient
from .extensions import mongo


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'haosidc ofomai cs' #secret key for the app

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    client = MongoClient('localhost', 27017, username='jacob447', password='JustOneTime4421!2001%3F')

    db = client.flask_db
    todos = db.todos
    return app