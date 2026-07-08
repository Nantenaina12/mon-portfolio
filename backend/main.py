from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from database import engine, get_db
from models import Base
import crud
from schemas import (
    ProjectCreate, ProjectUpdate, ProjectResponse,
    MessageCreate, MessageResponse,
    UserCreate, UserResponse, TokenResponse,
    RefreshTokenRequest, ChangePasswordRequest
)
from security import create_access_token, create_refresh_token, decode_token
from config import settings

# Créer les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ------------------ Dépendances ------------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = decode_token(token)
    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=401, detail="Token invalide")
    user = crud.get_user_by_username(db, username)
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Utilisateur non trouvé ou inactif")
    return user

def get_current_admin_user(current_user=Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Accès admin requis")
    return current_user

# ------------------ Routes publiques ------------------
@app.get("/")
def root():
    return {"message": "Portfolio API avec PostgreSQL", "docs": "/docs"}

@app.post("/register", response_model=UserResponse, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(400, "Nom d'utilisateur déjà utilisé")
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(400, "Email déjà utilisé")
    return crud.create_user(db, user)

@app.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(401, detail="Identifiants incorrects")
    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})
    crud.update_refresh_token(db, user.id, refresh_token)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": user
    }

@app.post("/refresh", response_model=TokenResponse)
def refresh(request: RefreshTokenRequest, db: Session = Depends(get_db)):
    payload = decode_token(request.refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(401, "Token invalide")
    username = payload.get("sub")
    user = crud.get_user_by_username(db, username)
    if not user or user.refresh_token != request.refresh_token:
        raise HTTPException(401, "Token invalide")
    new_access = create_access_token(data={"sub": user.username})
    new_refresh = create_refresh_token(data={"sub": user.username})
    crud.update_refresh_token(db, user.id, new_refresh)
    return {
        "access_token": new_access,
        "refresh_token": new_refresh,
        "token_type": "bearer",
        "user": user
    }

@app.post("/logout")
def logout(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    crud.update_refresh_token(db, current_user.id, None)
    return {"message": "Déconnecté"}

@app.post("/change-password")
def change_password(req: ChangePasswordRequest, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    user = crud.change_password(db, current_user.id, req.old_password, req.new_password)
    if not user:
        raise HTTPException(400, "Ancien mot de passe incorrect")
    crud.update_refresh_token(db, user.id, None)
    return {"message": "Mot de passe changé"}

@app.get("/me", response_model=UserResponse)
def me(current_user=Depends(get_current_user)):
    return current_user

# ------------------ Projets (protégés) ------------------
@app.post("/projects", response_model=ProjectResponse, status_code=201)
def create_project(project: ProjectCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_project(db, project)

@app.get("/projects", response_model=List[ProjectResponse])
def get_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip, limit)
    for p in projects:
        if p.tags:
            import json
            p.tags = json.loads(p.tags)
    return projects

@app.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = crud.get_project(db, project_id)
    if not project:
        raise HTTPException(404, "Projet non trouvé")
    if project.tags:
        import json
        project.tags = json.loads(project.tags)
    return project

@app.put("/projects/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    db_project = crud.update_project(db, project_id, project)
    if not db_project:
        raise HTTPException(404, "Projet non trouvé")
    return db_project

@app.delete("/projects/{project_id}")
def delete_project(project_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    db_project = crud.delete_project(db, project_id)
    if not db_project:
        raise HTTPException(404, "Projet non trouvé")
    return {"message": f"Projet {project_id} supprimé"}

# ------------------ Messages (public pour POST, protégé pour lecture) ------------------
@app.post("/messages", response_model=MessageResponse, status_code=201)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    return crud.create_message(db, message)

@app.get("/messages", response_model=List[MessageResponse])
def get_messages(skip: int = 0, limit: int = 10, admin=Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return crud.get_messages(db, skip, limit)

@app.get("/messages/unread", response_model=List[MessageResponse])
def get_unread(admin=Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return crud.get_unread_messages(db)

@app.put("/messages/{message_id}/read", response_model=MessageResponse)
def mark_read(message_id: int, admin=Depends(get_current_admin_user), db: Session = Depends(get_db)):
    msg = crud.mark_message_as_read(db, message_id)
    if not msg:
        raise HTTPException(404, "Message non trouvé")
    return msg

# ------------------ Tags ------------------
@app.get("/tags")
def get_all_tags(db: Session = Depends(get_db)):
    projects = crud.get_projects(db)
    all_tags = set()
    for p in projects:
        if p.tags:
            import json
            all_tags.update(json.loads(p.tags))
    return {"tags": sorted(list(all_tags))}

@app.get("/search")
def search(q: str = "", db: Session = Depends(get_db)):
    projects = crud.get_projects(db)
    results = []
    for p in projects:
        if q.lower() in p.title.lower() or q.lower() in p.description.lower():
            if p.tags:
                import json
                p.tags = json.loads(p.tags)
            results.append(p)
    return {"query": q, "results": results, "total": len(results)}

# ------------------ Admin ------------------
@app.get("/admin/messages", response_model=List[MessageResponse])
def admin_messages(admin=Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return crud.get_messages(db)