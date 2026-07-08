from sqlalchemy.orm import Session
from models import ContactMessage
from schemas import ContactMessageCreate

def create_contact_message(db: Session, message: ContactMessageCreate):
    db_message = ContactMessage(
        name=message.name,
        email=message.email,
        subject=message.subject,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_contact_messages(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ContactMessage).offset(skip).limit(limit).all()

def get_contact_message(db: Session, message_id: int):
    return db.query(ContactMessage).filter(ContactMessage.id == message_id).first()

def mark_message_read(db: Session, message_id: int):
    db_message = get_contact_message(db, message_id)
    if db_message:
        db_message.is_read = True
        db.commit()
        db.refresh(db_message)
    return db_message