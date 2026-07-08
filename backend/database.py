# database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL

# Au lieu d'une chaîne, on construit l'URL avec un dictionnaire
url_object = URL.create(
    drivername="postgresql",
    username="postgres",
    password="geoinfo",          # Mettez votre vrai mot de passe
    host="localhost",
    port=5432,
    database="portfolio_db"
)

# On peut aussi ajouter des paramètres supplémentaires
engine = create_engine(url_object, client_encoding='utf8')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()