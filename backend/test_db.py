import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()
url = os.getenv("DATABASE_URL")
print("URL lue :", repr(url))  # affiche la chaîne brute

try:
    conn = psycopg2.connect(url)
    print("✅ Connexion réussie !")
    conn.close()
except Exception as e:
    print("❌ Erreur :", e)