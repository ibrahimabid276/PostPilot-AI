export interface User {
  id: number;
  email: string;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface Profile {
  id: number;
  user_id: number;
  niche: string;
  profession: string;
  skills: string[];
  preferred_tone: string;
  updated_at: string;
}

export interface ProfileCreate {
  niche: string;
  profession: string;
  skills: string[];
  preferred_tone: string;
}

export interface Post {
  id: number;
  idea: string;
  tone: string;
  hashtags: string | null;
  research_summary: Record<string, any>;
  generated_content: string;
  created_at: string;
}

export interface PostCreate {
  idea: string;
  tone: string;
  hashtags?: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}