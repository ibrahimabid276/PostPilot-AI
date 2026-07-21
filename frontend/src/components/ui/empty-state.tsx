import { FileText, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "posts" | "insights" | "profile";
  action?: React.ReactNode;
}

export function EmptyState({ type, action }: EmptyStateProps) {
  const configs = {
    posts: {
      icon: FileText,
      title: "No posts yet",
      description: "Create your first post to get started with AI-powered content generation.",
    },
    insights: {
      icon: TrendingUp,
      title: "No research insights yet",
      description: "Research insights appear after generating posts with AI research.",
    },
    profile: {
      icon: Sparkles,
      title: "Profile not complete",
      description: "Complete your profile to personalize your LinkedIn posts.",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="glass rounded-xl p-8 text-center shadow-soft">
      <Icon className="mx-auto h-12 w-12 text-primary-light mb-4" />
      <h3 className="text-lg font-medium text-dark-text mb-2">{config.title}</h3>
      <p className="text-dark-text/70 mb-4">{config.description}</p>
      {action}
    </div>
  );
}
