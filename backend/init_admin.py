# backend/init_admin.py
import sys
import os

# Ajouter le dossier courant au chemin Python
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importer directement (sans "app.")
from database import SessionLocal
from models import User
from security import hash_password

def create_admin():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.username == "admin").first()
        if admin:
            print("✅ Admin déjà existant")
            return

        admin = User(
            username="admin",
            email="admin@portfolio.com",
            hashed_password=hash_password("Admin123!"),
            is_admin=True,
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("✅ Admin créé avec succès")
        print("🔑 Identifiants : admin / Admin123!")
    except Exception as e:
        print(f"❌ Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()