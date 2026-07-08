from sqlalchemy.orm import Session
from models import Project, Message, User
from schemas import ProjectCreate, ProjectUpdate, MessageCreate, UserCreate
from security import hash_password, verify_password
import json
import datetime

# ---- Projects ----
def get_project(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()

def get_projects(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Project).offset(skip).limit(limit).all()

def create_project(db: Session, project: ProjectCreate):
    tags_json = json.dumps(project.tags)
    db_project = Project(
        title=project.title,
        description=project.description,
        tags=tags_json,
        image_url=project.image_url,
        github_url=project.github_url,
        live_url=project.live_url
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def update_project(db: Session, project_id: int, project: ProjectUpdate):
    db_project = get_project(db, project_id)
    if db_project:
        db_project.title = project.title
        db_project.description = project.description
        db_project.tags = json.dumps(project.tags)
        db_project.image_url = project.image_url
        db_project.github_url = project.github_url
        db_project.live_url = project.live_url
        db_project.updated_at = datetime.now()
        db.commit()
        db.refresh(db_project)
    return db_project

def delete_project(db: Session, project_id: int):
    db_project = get_project(db, project_id)
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project

# ---- Messages ----
def create_message(db: Session, message: MessageCreate):
    db_message = Message(
        name=message.name,
        email=message.email,
        subject=message.subject,
        content=message.content,
        project_id=message.project_id
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_messages(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Message).offset(skip).limit(limit).all()

def get_unread_messages(db: Session):
    return db.query(Message).filter(Message.is_read == False).all()

def mark_message_as_read(db: Session, message_id: int):
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if db_message:
        db_message.is_read = True
        db.commit()
        db.refresh(db_message)
    return db_message

# ---- Users ----
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate):
    hashed = hash_password(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def update_refresh_token(db: Session, user_id: int, refresh_token: str = None):
    user = get_user_by_id(db, user_id)
    if user:
        user.refresh_token = refresh_token
        db.commit()
        db.refresh(user)
    return user

def change_password(db: Session, user_id: int, old_password: str, new_password: str):
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    if not verify_password(old_password, user.hashed_password):
        return None
    user.hashed_password = hash_password(new_password)
    db.commit()
    db.refresh(user)
    return user