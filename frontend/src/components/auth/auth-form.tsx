"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCreate, Token } from "@/types";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "signup";
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserCreate>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const res = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (mode === "signup") {
        // After signup, redirect to login
        router.push("/auth/login?registered=true");
      } else {
        const data: Token = await res.json();
        setToken(data.access_token);
        router.push("/onboarding");
      }
    } catch (err) {
      setError(mode === "login" ? "Invalid credentials" : "Email already registered");
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
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-600 mb-6">
          {mode === "login"
            ? "Sign in to continue generating LinkedIn posts"
            : "Start creating impactful LinkedIn content"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
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
            {loading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <a
            href={mode === "login" ? "/auth/signup" : "/auth/login"}
            className="text-primary font-medium hover:underline"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </a>
        </p>
      </Card>
    </motion.div>
  );
};