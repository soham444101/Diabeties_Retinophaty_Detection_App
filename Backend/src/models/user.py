from datetime import datetime
from flask_login import UserMixin  # Add this import
from bson import ObjectId
from src.extensions import mongo

class User(UserMixin):  # Inherit from UserMixin
    def __init__(self, user_data):
        self.id = str(user_data['_id'])  # Convert ObjectId to string
        self.username = user_data['username']
        self.email = user_data['email']
        self.password = user_data['password']
        self.created_at = user_data['created_at']

    @staticmethod
    def get_by_id(user_id):
        try:
            user_data = mongo.db.users.find_one({'_id': ObjectId(user_id)})
            return User(user_data) if user_data else None
        except:
            return None

    @staticmethod
    def create_user(username, email, password_hash):
        return mongo.db.users.insert_one({
            'username': username,
            'email': email,
            'password': password_hash,
            'created_at': datetime.utcnow()
        })