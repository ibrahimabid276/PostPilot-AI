"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PostEditor } from "@/components/posts/post-editor";
import { ResearchPanel } from "@/components/posts/research-panel";
import { Card } from "@/components/ui/card";
import { Profile, Post } from "@/types";
import { apiFetch } from "@/lib/api";
import { User, Briefcase, Tag, MessageSquare } from "lucide-react";

export default function NewPostPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [researchData, setResearchData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await apiFetch("/users/me/profile");
      const data: Profile = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostGenerated = (post: Post) => {
    setResearchData(Array.isArray(post.research_summary) ? post.research_summary : []);
  };

  return (
    <DashboardLayout currentPage="new-post">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          Create New Post
        </h1>
        <p className="text-gray-600">
          Generate AI-powered LinkedIn posts based on research insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Profile Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 h-fit sticky top-8">
            <h2 className="text-xl font-bold text-dark-text mb-4 flex items-center gap-2">
              <User className="text-primary" size={24} />
              Profile Summary
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : profile ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Briefcase size={14} />
                    <span>Niche</span>
                  </div>
                  <p className="font-medium text-dark-text">{profile.niche}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <User size={14} />
                    <span>Profession</span>
                  </div>
                  <p className="font-medium text-dark-text">{profile.profession}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Tag size={14} />
                    <span>Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MessageSquare size={14} />
                    <span>Preferred Tone</span>
                  </div>
                  <p className="font-medium text-dark-text capitalize">
                    {profile.preferred_tone}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Profile not found. Please complete your profile.
              </p>
            )}
          </Card>
        </div>

        {/* Center Panel - Post Editor */}
        <div className="lg:col-span-1">
          <PostEditor onPostGenerated={handlePostGenerated} />
        </div>

        {/* Right Panel - Research Insights */}
        <div className="lg:col-span-1">
          <ResearchPanel researchData={researchData} />
        </div>
      </div>
    </DashboardLayout>
  );
}