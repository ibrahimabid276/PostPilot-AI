from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

class ProfileCreate(BaseModel):
    niche: str
    profession: str
    skills: List[str]
    preferred_tone: str

class ProfileOut(ProfileCreate):
    id: int
    user_id: int
    updated_at: str

class PostCreate(BaseModel):
    idea: str
    tone: str
    hashtags: Optional[str] = None

class PostOut(BaseModel):
    id: int
    idea: str
    tone: str
    hashtags: Optional[str]
    research_summary: dict
    generated_content: str
    created_at: str

class Token(BaseModel):
    access_token: str
    token_type: str