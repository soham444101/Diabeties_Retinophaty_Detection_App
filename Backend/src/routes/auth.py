from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, current_user
from src.forms.login import LoginForm
from src.forms.signup import SignupForm
from src.models.user import User
from src.extensions import mongo, bcrypt

# Initialize Blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    form = LoginForm()
    
    if form.validate_on_submit():
        try:
            user_data = mongo.db.users.find_one({'email': form.email.data})
            
            if user_data and bcrypt.check_password_hash(user_data['password'], form.password.data):
                user = User(user_data)
                login_user(user, remember=form.remember.data)
                flash('Login successful!', 'success')
                return redirect(url_for('main.home'))
            
            flash('Invalid email or password', 'danger')
        except Exception as e:
            flash('Login failed. Please try again', 'danger')
            print(f"Error: {str(e)}")
    
    return render_template('auth/login.html', form=form)

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    form = SignupForm()
    
    if form.validate_on_submit():
        try:
            existing_user = mongo.db.users.find_one({'email': form.email.data})
            if existing_user:
                flash('Email already exists!', 'danger')
                return redirect(url_for('auth.signup'))
            
            hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
            User.create_user(
                username=form.username.data,
                email=form.email.data,
                password_hash=hashed_pw
            )
            flash('Account created! Please login', 'success')
            return redirect(url_for('auth.login'))
        
        except Exception as e:
            flash('Registration failed. Please try again', 'danger')
            print(f"Error: {str(e)}")
    
    return render_template('auth/signup.html', form=form)

@auth_bp.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out', 'info')
    return redirect(url_for('main.home'))