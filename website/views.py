#store standard routes for website - where users can go
from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/play')
def play():
    return render_template("game.html")