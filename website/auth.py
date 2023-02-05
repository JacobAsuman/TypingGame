from flask import Blueprint, render_template, request, flash

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.form #gets all the data from the login form's information sent through the post request
    return render_template("login.html")

@auth.route('/logout')
def logout():
    return "<p>Logout</p>"


@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        firstName = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        if len(email) < 8:
            flash('Email must be greater than 8 characters', category='fail')
        elif len(firstName) < 2:
            flash('Name must be greater than 2 characters', category='fail')
        elif password1 != password2:
            flash('Passwords do not match', category='fail')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters', category='fail')
        else:
            #add user to db
            flash('Account created!', category='success')

    return render_template("register.html")