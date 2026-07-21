import os
import httpx
from typing import Dict, List

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def generate_linkedin_post(
    idea: str,
    profile_data: Dict,
    tone: str,
    hashtags: str,
    research_patterns: List[Dict],
) -> str:
    # Build prompt using profile, idea, tone, hashtags, and research patterns
    # Never copy verbatim from research results, only use structural patterns
    prompt = f"""
You are a LinkedIn content strategist.

User profile:
- Niche: {profile_data['niche']}
- Profession: {profile_data['profession']}
- Skills: {', '.join(profile_data['skills'])}
- Preferred tone: {profile_data['preferred_tone']}

Current post:
- Idea: {idea}
- Tone for this post: {tone}
- Hashtags: {hashtags}

Research patterns from high-performing LinkedIn posts on similar topics:
{research_patterns}

Generate a LinkedIn post that:
1. Starts with a strong hook (first 2 lines should stand alone).
2. Uses the requested tone.
3. Is structured based on successful patterns (but do NOT copy any text).
4. Ends with the provided hashtags.

Return only the post text, no explanations.
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "openai/gpt-4",  # or your preferred model
        "messages": [{"role": "user", "content": prompt}],
    }

    async with httpx.AsyncClient() as client:
        resp = await client.post(OPENROUTER_API_URL, json=data, headers=headers)
        resp.raise_for_status()
        result = resp.json()
        return result["choices"][0]["message"]["content"]