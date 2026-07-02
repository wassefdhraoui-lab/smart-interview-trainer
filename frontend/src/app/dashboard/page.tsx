"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/UserContext";
import Footer from "../../components/Footer";
type ProgressData = {
  summary: {
    completed_interviews: number;
    average_score: number | null;
    best_score: number | null;
  };
  categoryStats?: {
    category: string;
    average_score: number;
    completed_count: number;
  }[];
  recentSessions?: {
    id: number;
    total_score: number;
    category: string;
    difficulty: string;
    completed_at?: string;
  }[];
};

const categories = [
  { name: "Java", short: "J" },
  { name: "SQL", short: "S" },
  { name: "HR", short: "H" },
  { name: "Algorithms", short: "A" },
  { name: "Web Development", short: "W" },
];

export default function DashboardPage() {
  const { user } = useUser();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    async function loadProgress() {
      if (!user) return;

      const response = await fetch(
        `http://localhost:5000/progress?userId=${user.id}`
      );

      const data = await response.json();

      if (data.success) {
        setProgress(data);
      }
    }

    loadProgress();
  }, [user]);

  const categoryStats = progress?.categoryStats || [];
  const recentSessions = progress?.recentSessions || [];

  const bestCategory =
    categoryStats.length > 0 ? categoryStats[0].category : "-";

  const weakestCategory =
    categoryStats.length > 0
      ? categoryStats[categoryStats.length - 1].category
      : "-";

  const averageScore = progress?.summary.average_score || 0;
  const completedInterviews = progress?.summary.completed_interviews || 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-8 py-8 text-[#0F172A]">
        <div className="mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#3B82F6] px-8 py-9 text-white shadow-xl">
            <div className="absolute right-[-40px] top-[-80px] h-80 w-80 rounded-full bg-white/10" />
            <div className="absolute right-[80px] top-[-30px] h-64 w-64 rounded-full bg-white/10" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-5">
                {user?.avatar ? (
                  <img
                    src={`/${user.avatar}`}
                    alt="User avatar"
                    className="h-16 w-16 rounded-2xl border border-white/25 bg-white/15 object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-lg font-bold shadow-lg">
                    {user?.name?.[0] || "U"}
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium text-white/75">
                    Welcome back,
                  </p>

                  <h1 className="text-2xl font-extrabold tracking-[-0.02em]">
                    {user?.name || "User"}
                  </h1>

                  <p className="mt-1 text-xs text-white/80">
                    You have completed {completedInterviews} sessions · keep the
                    streak going
                  </p>
                </div>
              </div>

              <Link
                href="/interview-setup"
                className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1D4ED8] shadow-lg transition hover:bg-[#EFF6FF]"
              >
                + Start Interview
              </Link>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-4">
            <StatCard
              label="Average Score"
              value={`${averageScore}%`}
              helper="+4% this month"
            />

            <StatCard
              label="Completed Interviews"
              value={completedInterviews}
              helper="3 this week"
            />

            <StatCard
              label="Best Category"
              value={bestCategory}
              helper="Strongest performance"
              blue
            />

            <StatCard
              label="Weakest Category"
              value={weakestCategory}
              helper="Needs improvement"
              red
            />
          </section>

          <section className="mt-8">
            <h2 className="text-base font-extrabold">
              Choose a Practice Category
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href="/interview-setup"
                  className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#DBEAFE] hover:bg-[#EFF6FF]"
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-sm font-extrabold text-[#1D4ED8]">
                    {category.short}
                  </div>

                  <p className="mt-3 text-sm font-bold text-[#0F172A]">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-extrabold">Recent Interviews</h2>

              <Link
                href="/progress"
                className="text-sm font-bold text-[#1D4ED8]"
              >
                View all →
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#E6EBF2] bg-white shadow-sm">
              {recentSessions.length ? (
                recentSessions.slice(0, 3).map((session, index) => (
                  <div
                    key={session.id}
                    className={`flex items-center justify-between px-5 py-4 ${
                      index !== 0 ? "border-t border-[#E6EBF2]" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">
                        {session.category} · {session.difficulty} · Interview
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        Score {session.total_score}%
                      </p>
                    </div>

                    <Link
                      href={`/feedback?sessionId=${session.id}`}
                      className="rounded-full border border-[#E6EBF2] bg-white px-4 py-2 text-xs font-bold text-[#334155] transition hover:bg-[#EFF6FF] hover:text-[#1D4ED8]"
                    >
                      Review
                    </Link>
                  </div>
                ))
              ) : (
                <p className="px-5 py-6 text-sm text-[#64748B]">
                  No completed interviews yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer /> 
    </>
  );
}

function StatCard({
  label,
  value,
  helper,
  blue,
  red,
}: {
  label: string;
  value: string | number;
  helper: string;
  blue?: boolean;
  red?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#E6EBF2] bg-white p-6 shadow-sm">
      <p className="text-xs font-medium text-[#64748B]">{label}</p>

      <p
        className={`mt-3 text-2xl font-extrabold ${
          red ? "text-[#DC2626]" : blue ? "text-[#1D4ED8]" : "text-[#0F172A]"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs font-medium text-[#16A34A]">{helper}</p>
    </div>
  );
}