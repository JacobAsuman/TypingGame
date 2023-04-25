#store standard routes for website - where users can go
from flask import Blueprint, render_template, request
import subprocess, json, re




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
    output = subprocess.run(['python', 'website\LanguageModel.py', param], stdout=subprocess.PIPE).stdout.decode()  #retrieve output from py script
    output = re.sub(r'(?<=[^\s])([^\w\s\'\"])(?![\s.!?])|([^\w\s\'\"])(?![\s.!?])(?=[^\s\'])', r' \1\2', output)    #format spaces around certain punctuation

    print(output)
    result = output
    
    return result