"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";
import { apiFetch } from "@/lib/api";
import { Calendar, Copy, Check, Trash2 } from "lucide-react";

export const PostHistory = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await apiFetch("/posts/");
      const data: Post[] = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-dark-text mb-4 flex items-center gap-2">
        <Calendar className="text-primary" size={24} />
        Post History
      </h2>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="mx-auto mb-2 opacity-50" size={48} />
          <p>No posts generated yet</p>
          <p className="text-sm mt-1">Create your first post to see it here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-white/30 rounded-lg border border-white/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    {formatDate(post.created_at)}
                  </p>
                  <p className="font-medium text-dark-text mb-1">
                    {post.idea}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                      {post.tone}
                    </span>
                    {post.hashtags && (
                      <span className="text-gray-500">{post.hashtags}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleCopy(post.generated_content, post.id)}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {copiedId === post.id ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-white/50 rounded-lg text-sm text-dark-text max-h-32 overflow-y-auto">
                {post.generated_content}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
};