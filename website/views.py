#store standard routes for website - where users can go
from flask import Blueprint, render_template, request
import subprocess

from .LanguageModel import my_value


views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/game')
def game():
    return render_template("game.html")

@views.route('/game2')
def game2():
    data = my_value()
    return render_template("game2.html", data=data)

@views.route('/run_script', methods=['POST'])
def run_script():
    param = request.form['param_name']
    subprocess.run(['python', 'website\LanguageModel.py', param])
    return 'Success'