from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, get_db
from models import Base
import crud
from schemas import ContactMessageCreate, ContactMessageResponse

# Créer les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

# Configuration CORS (autoriser ton frontend React)
origins = [
    "http://localhost:5173",   # Vite dev
    "http://localhost:3000",   # Autre port
    "https://ton-site.com",    # En production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes de base
@app.get("/")
def root():
    return {"message": "Portfolio API - backend avec PostgreSQL"}

# Route pour envoyer un message de contact (public)
@app.post("/contact", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def send_contact_message(
    message: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """
    Enregistre un message de contact dans la base de données.
    """
    return crud.create_contact_message(db, message)

# Route pour récupérer tous les messages (admin, si tu mets une auth plus tard)
@app.get("/admin/messages", response_model=List[ContactMessageResponse])
def get_all_messages(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Récupère tous les messages (pour admin). 
    Tu peux ajouter une authentification plus tard.
    """
    return crud.get_contact_messages(db, skip=skip, limit=limit)

# Route pour marquer un message comme lu (admin)
@app.put("/admin/messages/{message_id}/read", response_model=ContactMessageResponse)
def mark_message_read(
    message_id: int,
    db: Session = Depends(get_db)
):
    db_message = crud.mark_message_read(db, message_id)
    if not db_message:
        raise HTTPException(status_code=404, detail="Message non trouvé")
    return db_message

# Pour lancer le serveur directement
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)