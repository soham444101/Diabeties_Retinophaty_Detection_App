import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key-123')
    MONGO_URI = "mongodb+srv://lavdu05:Lavdu101444@cluster0.z57nq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    WTF_CSRF_ENABLED = True