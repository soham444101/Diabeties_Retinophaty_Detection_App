# from flask import Flask, render_template, redirect, url_for, flash, request, jsonify
# from flask_pymongo import PyMongo
# from flask_bcrypt import Bcrypt
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField
# from wtforms.validators import DataRequired, Email, Length, EqualTo
# import os


    
# app = Flask(__name__)
# app.config["SECRET_KEY"] = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
# app.config['WTF_CSRF_ENABLED'] = True

# # Initialize extensions
# mongo = PyMongo(app)
# bcrypt = Bcrypt(app)

# # Forms
# class LoginForm(FlaskForm):
#     email = StringField('Email', validators=[DataRequired(), Email()])
#     password = PasswordField('Password', validators=[DataRequired()])
#     submit = SubmitField('Login')

# class SignupForm(FlaskForm):
#     username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
#     email = StringField('Email', validators=[DataRequired(), Email()])
#     password = PasswordField('Password', validators=[
#         DataRequired(),
#         Length(min=8),
#         EqualTo('confirm_password', message='Passwords must match')
#     ])
#     confirm_password = PasswordField('Confirm Password')
#     submit = SubmitField('Sign Up')

# # Routes
# @app.route('/')
# def home():
#     return render_template('home.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     form = LoginForm()
#     if form.validate_on_submit():
#         user = mongo.db.users.find_one({'email': form.email.data})
        
#         if user and bcrypt.check_password_hash(user['password'], form.password.data):
#             flash('Login successful!', 'success')
#             return redirect(url_for('dashboard'))
#         else:
#             flash('Invalid email or password', 'danger')
#     return render_template('login.html', form=form)

# @app.route('/signup', methods=['GET', 'POST'])
# def signup():
#     form = SignupForm()
#     if form.validate_on_submit():
#         hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        
#         if mongo.db.users.find_one({'email': form.email.data}):
#             flash('Email already exists!', 'danger')
#             return redirect(url_for('signup'))
            
#         user_data = {
#             'username': form.username.data,
#             'email': form.email.data,
#             'password': hashed_password
#         }
#         mongo.db.users.insert_one(user_data)
        
#         flash('Account created successfully!', 'success')
#         return redirect(url_for('login'))
#     return render_template('signup.html', form=form)

# @app.route('/dashboard')
# def dashboard():
#     return "Dashboard Page - Add your content here"

# # Error Handlers
# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404

# @app.errorhandler(500)
# def internal_server_error(e):
#     return render_template('500.html'), 500

# if __name__ == '__main__':
#     app.run(debug=True)

# run.py
from src import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)