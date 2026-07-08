from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

# ---- Projects ----
class ProjectBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., min_length=10)
    tags: List[str] = []
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# ---- Messages ----
class MessageBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    subject: str = Field(..., min_length=2, max_length=100)
    content: str = Field(..., min_length=10, max_length=1000)
    project_id: Optional[int] = None

class MessageCreate(MessageBase):
    pass

class MessageResponse(MessageBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ---- Users ----
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ---- Auth ----
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class ChangePasswordRequest(BaseModel):
    old_password: str = Field(..., min_length=8)
    new_password: str = Field(..., min_length=8)