from flask import Flask  # Add this critical import
from src.config import Config
from src.extensions import mongo, bcrypt, login_manager

def create_app():
    # Initialize Flask application
    app = Flask(__name__, template_folder='../templates')
    app.config.from_object(Config)
    
    # Initialize extensions
    mongo.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    
    # Configure user loader
    @login_manager.user_loader
    def load_user(user_id):
        from src.models.user import User
        from bson import ObjectId

        
        try:
            return User.get_by_id(ObjectId(user_id))
        except:
            return None
    
    # Register blueprints
    from src.routes.auth import auth_bp
    from src.routes.main import main_bp
    
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    
    return app