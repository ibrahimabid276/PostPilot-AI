"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostCreate, Post } from "@/types";
import { apiFetch } from "@/lib/api";
import { Sparkles, Copy, Check } from "lucide-react";

interface PostEditorProps {
  onPostGenerated?: (post: Post) => void;
}

export const PostEditor = ({ onPostGenerated }: PostEditorProps) => {
  const [formData, setFormData] = useState<PostCreate>({
    idea: "",
    tone: "professional",
    hashtags: "",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "inspirational", label: "Inspirational" },
    { value: "educational", label: "Educational" },
  ];

  const handleGenerate = async () => {
    if (!formData.idea.trim()) return;

    setLoading(true);
    setGeneratedContent("");

    try {
      const res = await apiFetch("/posts/", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const post: Post = await res.json();
      setGeneratedContent(post.generated_content);
      onPostGenerated?.(post);
    } catch (err) {
      console.error("Failed to generate post", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-dark-text mb-4 flex items-center gap-2">
        <Sparkles className="text-primary" size={24} />
        Post Editor
      </h2>

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Post Idea
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm text-dark-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            rows={3}
            placeholder="What's your post about? (e.g., 'The future of remote work')"
            value={formData.idea}
            onChange={(e) =>
              setFormData({ ...formData, idea: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {toneOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, tone: option.value })}
                className={`p-2 rounded-lg border-2 transition-all text-sm ${
                  formData.tone === option.value
                    ? "border-primary bg-primary/5"
                    : "border-white/30 hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-text mb-2">
            Hashtags (optional)
          </label>
          <Input
            placeholder="#LinkedIn #Growth"
            value={formData.hashtags}
            onChange={(e) =>
              setFormData({ ...formData, hashtags: e.target.value })
            }
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !formData.idea.trim()}
          className="w-full py-3"
        >
          {loading ? "Generating..." : "Generate Post"}
        </Button>

        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <label className="block text-sm font-medium text-dark-text mb-2">
              Generated Post
            </label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/50 backdrop-blur-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                rows={8}
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
              />
              <Button
                onClick={handleCopy}
                variant="secondary"
                className="absolute top-2 right-2 px-3 py-1"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};