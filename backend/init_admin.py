from database import SessionLocal
from models import User
from security import hash_password

def create_admin():
    db = SessionLocal()
    admin = db.query(User).filter(User.username == "admin").first()
    if admin:
        print("Admin déjà existant")
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
    db.close()

if __name__ == "__main__":
    create_admin()