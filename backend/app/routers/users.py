from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_current_user
from database import get_db
from schemas import ProfileCreate, ProfileOut
from crud import create_profile, get_profile_by_user_id

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/me/profile", response_model=ProfileOut)
def create_user_profile(
    profile_data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    existing = get_profile_by_user_id(db, current_user.id)
    if existing:
        # Update logic here
        pass
    profile = create_profile(db, profile_data, current_user.id)
    return profile

@router.get("/me/profile", response_model=ProfileOut)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    profile = get_profile_by_user_id(db, current_user.id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile