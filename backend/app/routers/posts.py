from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_current_user
from database import get_db
from schemas import PostCreate, PostOut
from crud import create_post, get_posts_by_user, get_profile_by_user_id
from services.research import search_linkedin_posts
from services.llm import generate_linkedin_post

router = APIRouter(prefix="/posts", tags=["posts"])

@router.post("/", response_model=PostOut)
async def create_new_post(
    post_data: PostCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    profile = get_profile_by_user_id(db, current_user.id)
    if not profile:
        raise HTTPException(status_code=400, detail="Complete profile first")

    research_patterns = await search_linkedin_posts(post_data.idea, profile.niche)
    generated_content = await generate_linkedin_post(
        idea=post_data.idea,
        profile_data={
            "niche": profile.niche,
            "profession": profile.profession,
            "skills": profile.skills,
            "preferred_tone": profile.preferred_tone,
        },
        tone=post_data.tone,
        hashtags=post_data.hashtags or "",
        research_patterns=research_patterns,
    )

    post = create_post(db, post_data, current_user.id, research_patterns, generated_content)
    return post

@router.get("/", response_model=list[PostOut])
def get_my_posts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_posts_by_user(db, current_user.id)