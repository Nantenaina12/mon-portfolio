# backend/config.py
from dotenv import load_dotenv
import os

load_dotenv(encoding='utf-8')

class Settings:
    # Base de données
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    # JWT
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))
    
    # Admin
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
    
    # CORS
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:8001",
        "https://nantenaina12.github.io",
    ]

settings = Settings()