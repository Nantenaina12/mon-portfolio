# backend/init_admin.py
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import User
from security import hash_password
from config import settings

def create_admin():
    db = SessionLocal()
    try:
        # Vérifier si l'admin existe déjà
        admin = db.query(User).filter(User.username == settings.ADMIN_USERNAME).first()
        if admin:
            print(f"✅ Admin '{settings.ADMIN_USERNAME}' déjà existant")
            return

        # Créer l'admin avec les variables d'environnement
        admin = User(
            username=settings.ADMIN_USERNAME,
            email=settings.ADMIN_EMAIL,
            hashed_password=hash_password(settings.ADMIN_PASSWORD),
            is_admin=True,
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("✅ Admin créé avec succès")
        print(f"🔑 Identifiants : {settings.ADMIN_USERNAME} / {settings.ADMIN_PASSWORD}")
        print("⚠️  Changez ce mot de passe immédiatement via la route /change-admin-password")
    except Exception as e:
        print(f"❌ Erreur : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()