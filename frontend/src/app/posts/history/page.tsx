"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PostHistory } from "@/components/posts/post-history";

export default function HistoryPage() {
  return (
    <DashboardLayout currentPage="history">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-text mb-2">
          Post History
        </h1>
        <p className="text-gray-600">
          View and manage your previously generated LinkedIn posts
        </p>
      </div>

      <PostHistory />
    </DashboardLayout>
  );
}