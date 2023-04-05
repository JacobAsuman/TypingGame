#store standard routes for website - where users can go
from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/game')
def game():
    return render_template("game.html")

@views.route('/game2')
def game2():
    return render_template("game2.html")