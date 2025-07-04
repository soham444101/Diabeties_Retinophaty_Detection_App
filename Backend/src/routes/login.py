from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_user, current_user
from src.forms.login import LoginForm
from src.models.user import User
from src.extensions import mongo, bcrypt

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))

    form = LoginForm()

    if form.validate_on_submit():
        try:
            # 1. Find user by email
            user_data = mongo.db.users.find_one({'email': form.email.data})
            
            if not user_data:
                flash('Email not registered', 'danger')
                return redirect(url_for('login.login'))

            # 2. Verify password
            if not bcrypt.check_password_hash(user_data['password'], form.password.data):
                flash('Invalid password', 'danger')
                return redirect(url_for('login.login'))

            # 3. Create User instance and login
            user = User(user_data)
            login_user(user, remember=form.remember.data)
            flash('Login successful!', 'success')
            return redirect(url_for('main.home'))

        except Exception as e:
            print(f"Login error: {str(e)}")
            flash('Login failed. Please try again', 'danger')

    return render_template('auth/login.html', form=form)