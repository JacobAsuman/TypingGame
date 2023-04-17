#store standard routes for website - where users can go
from flask import Blueprint, render_template, request
import subprocess, json




views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html")

@views.route('/game')
def game():
    return render_template("game.html")

@views.route('/run_script', methods=['POST'])
def run_script():
    param = request.form['combo']
    output = subprocess.run(['python', 'website\LanguageModel.py', param], stdout=subprocess.PIPE).stdout.decode()#.strip()
    #output = output.replace('.', '.')
    #output = output.replace('!', '! ')
    #output = output.replace('?', '? ')
    print(output)
    result = output
    #return json.dumps(result)
    return result