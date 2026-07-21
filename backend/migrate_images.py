# backend/migrate_images.py
from database import SessionLocal
from models import Project

def migrate_images():
    db = SessionLocal()
    
    # Mapping des anciens noms vers les nouvelles URLs
    mapping = {
        "carto": "/images/carto.png",
        "chrono": "/images/chrono.png",
        "vecteur": "/images/vecteur.png",
        "ndvi": "/images/ndvi.png",
        "occup": "/images/occup.png",
        "meteo": "/images/meteo.jpg",
        "nyrc" : '/images/nyrc.jpg'

    }
    
    projects = db.query(Project).all()
    count = 0
    
    for p in projects:
        # Si l'URL actuelle est dans le mapping
        if p.image_url in mapping:
            old = p.image_url
            p.image_url = mapping[old]
            count += 1
            print(f"✅ {p.title}: {old} → {p.image_url}")
        # Si l'URL est vide ou None, mettre une image par défaut
        elif not p.image_url:
            p.image_url = "/images/default.png"
            count += 1
            print(f"🔄 {p.title}: ajout de l'image par défaut")
    
    db.commit()
    print(f"🎉 {count} projets mis à jour !")
    db.close()

if __name__ == "__main__":
    migrate_images()