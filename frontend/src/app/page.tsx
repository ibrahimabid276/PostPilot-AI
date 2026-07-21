"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FileText, TrendingUp, Sparkles, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Profile, Post } from "@/types";
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, postsRes] = await Promise.all([
        apiFetch("/users/me/profile").catch(() => null),
        apiFetch("/posts/").catch(() => null),
      ]);

      if (profileRes) {
        const profileData: Profile = await profileRes.json();
        setProfile(profileData);
      }

      if (postsRes) {
        const postsData: Post[] = await postsRes.json();
        setPosts(postsData);
      }
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = profile && profile.niche && profile.profession && profile.skills.length > 0;

  const stats = [
    {
      label: "Posts Generated",
      value: posts.length.toString(),
      icon: FileText,
      color: "text-primary",
      empty: posts.length === 0,
    },
    {
      label: "Research Insights",
      value: posts.length.toString(),
      icon: TrendingUp,
      color: "text-success",
      empty: posts.length === 0,
    },
    {
      label: isProfileComplete ? "Profile: Complete" : "Profile: Incomplete",
      value: isProfileComplete ? "✅" : "⚠️",
      icon: Sparkles,
      color: isProfileComplete ? "text-success" : "text-warning",
    },
  ];

  if (loading) {
    return (
      <DashboardLayout currentPage="dashboard">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPage="dashboard">
      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-lg text-error">
          {error}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          Welcome to PostPilot
        </h1>
        <p className="text-gray-600">
          Your AI-powered LinkedIn content generation assistant
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-dark-text">{stat.value}</p>
                </div>
                <Icon className={stat.color} size={32} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty States */}
      {posts.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <EmptyState
            type="posts"
            action={
              <Button onClick={() => router.push("/posts/new")}>
                Create New Post
              </Button>
            }
          />
          <EmptyState type="insights" />
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-dark-text mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => router.push("/posts/new")}
            className="py-4 text-lg"
          >
            <Sparkles className="mr-2" size={20} />
            Create New Post
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            onClick={() => router.push("/posts/history")}
            variant="secondary"
            className="py-4 text-lg"
          >
            <FileText className="mr-2" size={20} />
            View History
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </Card>

      {/* Getting Started */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-dark-text mb-4">
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className={`flex items-start gap-4 ${isProfileComplete ? "opacity-50" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
              isProfileComplete ? "bg-success text-white" : "bg-primary/10 text-primary"
            }`}>
              {isProfileComplete ? <Check size={16} /> : "1"}
            </div>
            <div>
              <h3 className="font-medium text-dark-text">Complete Your Profile</h3>
              <p className="text-sm text-gray-600">
                Add your niche, profession, and skills to personalize your posts
              </p>
              {!isProfileComplete && (
                <Button
                  onClick={() => router.push("/onboarding")}
                  variant="secondary"
                  className="mt-2 text-sm"
                >
                  Complete Profile
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-medium text-dark-text">Create Your First Post</h3>
              <p className="text-sm text-gray-600">
                Enter your post idea and let AI generate content based on research
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-medium text-dark-text">Review & Publish</h3>
              <p className="text-sm text-gray-600">
                Edit the generated content and copy it to LinkedIn
              </p>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}