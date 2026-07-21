"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Lightbulb, Target } from "lucide-react";

interface ResearchPanelProps {
  researchData?: Record<string, any>[];
}

export const ResearchPanel = ({ researchData = [] }: ResearchPanelProps) => {
  const insights = researchData.length > 0 ? researchData : [
    {
      hook_style: "question",
      structure: "list",
      tone: "personal",
    },
  ];

  return (
    <Card className="p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-dark-text mb-4 flex items-center gap-2">
        <TrendingUp className="text-primary" size={24} />
        Research Insights
      </h2>

      <div className="space-y-4 flex-1">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/30 rounded-lg border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="text-warning" size={16} />
              <span className="font-medium text-dark-text">Pattern {index + 1}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-primary" />
                <span className="text-gray-600">Hook Style:</span>
                <span className="font-medium text-dark-text capitalize">
                  {insight.hook_style}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Target size={14} className="text-primary" />
                <span className="text-gray-600">Structure:</span>
                <span className="font-medium text-dark-text capitalize">
                  {insight.structure}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Target size={14} className="text-primary" />
                <span className="text-gray-600">Tone:</span>
                <span className="font-medium text-dark-text capitalize">
                  {insight.tone}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {insights.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="mx-auto mb-2 opacity-50" size={32} />
            <p>Generate a post to see research insights</p>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <p className="text-sm text-gray-600">
          <strong className="text-primary">Tip:</strong> These patterns are extracted from high-performing LinkedIn posts in your niche. Use them as inspiration for your content structure.
        </p>
      </div>
    </Card>
  );
};