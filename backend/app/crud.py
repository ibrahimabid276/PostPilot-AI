from sqlalchemy.orm import Session
from models import User, Profile, Post
from auth import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user_data):
    hashed_password = get_password_hash(user_data.password)
    db_user = User(email=user_data.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_profile(db: Session, profile_data, user_id: int):
    db_profile = Profile(**profile_data.dict(), user_id=user_id)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def get_profile_by_user_id(db: Session, user_id: int):
    return db.query(Profile).filter(Profile.user_id == user_id).first()

def create_post(db: Session, post_data, user_id: int, research_summary: dict, generated_content: str):
    db_post = Post(
        user_id=user_id,
        idea=post_data.idea,
        tone=post_data.tone,
        hashtags=post_data.hashtags,
        research_summary=research_summary,
        generated_content=generated_content,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts_by_user(db: Session, user_id: int):
    return db.query(Post).filter(Post.user_id == user_id).order_by(Post.created_at.desc()).all()