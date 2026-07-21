"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout currentPage="settings">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account and preferences
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="text-primary" size={24} />
          <h2 className="text-xl font-bold text-dark-text">
            Account Settings
          </h2>
        </div>
        <p className="text-gray-600">
          Settings functionality coming soon. You can currently manage your profile through the onboarding flow.
        </p>
      </Card>
    </DashboardLayout>
  );
}