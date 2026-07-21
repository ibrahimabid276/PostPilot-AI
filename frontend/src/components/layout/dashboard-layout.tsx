"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Home, FileText, History, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage?: "dashboard" | "new-post" | "history" | "settings";
}

export const DashboardLayout = ({ children, currentPage = "dashboard" }: DashboardLayoutProps) => {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/auth/login");
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home, value: "dashboard" },
    { href: "/posts/new", label: "New Post", icon: FileText, value: "new-post" },
    { href: "/posts/history", label: "History", icon: History, value: "history" },
    { href: "/settings", label: "Settings", icon: Settings, value: "settings" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/20 h-screen fixed left-0 top-0 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">PostPilot</h1>
          <p className="text-sm text-gray-600">AI LinkedIn Generator</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.value;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-soft"
                      : "text-dark-text hover:bg-white/20"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-dark-text hover:text-error"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};