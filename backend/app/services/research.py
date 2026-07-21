import httpx
import os
from typing import List, Dict

SERPER_API_URL = "https://google.serper.dev/search"
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

async def search_linkedin_posts(topic: str, niche: str) -> List[Dict]:
    query = f"site:linkedin.com {topic} {niche} post"
    headers = {"X-API-KEY": SERPER_API_KEY}
    data = {"q": query, "num": 10}

    async with httpx.AsyncClient() as client:
        resp = await client.post(SERPER_API_URL, json=data, headers=headers)
        resp.raise_for_status()
        results = resp.json()

    # Extract titles/snippets and analyze patterns
    items = results.get("organic", [])
    patterns = []
    for item in items:
        title = item.get("title", "")
        snippet = item.get("snippet", "")
        # Analyze hooks, structure, tone (no verbatim copying)
        patterns.append({
            "hook_style": infer_hook_style(title, snippet),
            "structure": infer_structure(snippet),
            "tone": infer_tone(snippet),
        })
    return patterns

def infer_hook_style(title: str, snippet: str) -> str:
    # Very simplified example
    if "?" in title:
        return "question"
    if "how" in title.lower():
        return "how-to"
    if "why" in title.lower():
        return "why-style"
    return "statement"

def infer_structure(snippet: str) -> str:
    if "\n" in snippet or "•" in snippet:
        return "list"
    if len(snippet.split(".")) > 3:
        return "paragraphs"
    return "short"

def infer_tone(snippet: str) -> str:
    if "I" in snippet and "my" in snippet:
        return "personal"
    if "you" in snippet:
        return "direct"
    return "professional"