"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileCreate, Profile } from "@/types";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export const ProfileForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileCreate>({
    niche: "",
    profession: "",
    skills: [],
    preferred_tone: "professional",
  });
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "inspirational", label: "Inspirational" },
    { value: "educational", label: "Educational" },
  ];

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch("/users/me/profile", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      router.push("/posts/new");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen p-4"
    >
      <Card className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          Complete Your Profile
        </h1>
        <p className="text-gray-600 mb-6">
          Tell us about yourself so we can generate personalized LinkedIn posts
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Niche / Industry
            </label>
            <Input
              placeholder="e.g., Tech, Marketing, Finance"
              value={formData.niche}
              onChange={(e) =>
                setFormData({ ...formData, niche: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Profession / Role
            </label>
            <Input
              placeholder="e.g., Software Engineer, Product Manager"
              value={formData.profession}
              onChange={(e) =>
                setFormData({ ...formData, profession: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Skills
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add a skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} variant="secondary">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-primary-light"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Preferred Tone
            </label>
            <div className="grid grid-cols-2 gap-3">
              {toneOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, preferred_tone: option.value })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.preferred_tone === option.value
                      ? "border-primary bg-primary/5"
                      : "border-white/30 hover:border-primary/50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-error text-sm"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className="w-full py-3"
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};