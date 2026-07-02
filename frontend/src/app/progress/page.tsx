"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/UserContext";
import Footer from "../../components/Footer";
type ProgressData = {
  skillStats: {
  communication_score: number;
  technical_score: number;
  confidence_score: number;
};
  summary: {
    completed_interviews: number;
    average_score: number;
    best_score: number;
  };
  categoryStats: {
    category: string;
    average_score: number;
    completed_count: number;
  }[];
  scoreHistory: {
    id: number;
    total_score: number;
    completed_at: string;
  }[];
  recentSessions: {
    id: number;
    total_score: number;
    completed_at: string;
    category: string;
    difficulty: string;
  }[];
};

export default function ProgressPage() {
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
  const scoreHistory = progress?.scoreHistory || [];
  const recentSessions = progress?.recentSessions || [];

  const weakestCategory =
    categoryStats.length > 0
      ? categoryStats[categoryStats.length - 1].category
      : "-";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-8 py-10 text-[#0F172A]">
        <div className="mx-auto max-w-[900px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
                Analytics
              </p>

              <h1 className="mt-2 text-3xl font-extrabold">Your Progress</h1>
            </div>

            <div className="flex gap-3">
              <select className="rounded-xl border border-[#E6EBF2] bg-white px-4 py-2 text-sm font-bold">
                <option>All Categories</option>
              </select>

              <select className="rounded-xl border border-[#E6EBF2] bg-white px-4 py-2 text-sm font-bold">
                <option>Last 30 days</option>
              </select>
            </div>
          </div>

          <section className="mt-8 rounded-2xl border border-[#E6EBF2] bg-white p-6 shadow-sm">
            <h2 className="text-base font-extrabold">Score Over Time</h2>

            <div className="mt-5">
              {scoreHistory.length ? (
                <LineChart data={scoreHistory} />
              ) : (
                <div className="flex h-64 items-center justify-center text-[#64748B]">
                  No score history yet.
                </div>
              )}
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-[#E6EBF2] bg-white p-6 shadow-sm">
  <h2 className="text-base font-extrabold">AI Skill Breakdown</h2>

  <p className="mt-1 text-sm text-[#64748B]">
    Average scores across all your completed answers.
  </p>

  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
    <CircularSkill
      title="Communication"
      value={progress?.skillStats?.communication_score || 0}
    />

    <CircularSkill
      title="Technical"
      value={progress?.skillStats?.technical_score || 0}
    />

    <CircularSkill
      title="Confidence"
      value={progress?.skillStats?.confidence_score || 0}
    />
  </div>
</section>
  
          <section className="mt-5 flex items-center justify-between rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] px-6 py-5">
            <div>
              <p className="text-sm font-extrabold text-[#1D4ED8]">
                Recommended next
              </p>

              <p className="mt-1 text-sm text-[#64748B]">
                {weakestCategory === "-"
                  ? "Complete more interviews to get a recommendation."
                  : `${weakestCategory} is your weakest area.`}
              </p>
            </div>

            <Link
              href="/interview-setup"
              className="rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-5 py-3 text-sm font-bold text-white shadow-lg"
            >
              Practice →
            </Link>
          </section>

          <section className="mt-8">
            <h2 className="text-base font-extrabold">Interview History</h2>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#E6EBF2] bg-white shadow-sm">
              {recentSessions.length ? (
                recentSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className={`flex items-center justify-between px-5 py-4 ${
                      index !== 0 ? "border-t border-[#E6EBF2]" : ""
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold">
                        {session.category} · {session.difficulty}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {new Date(session.completed_at).toLocaleString()} ·
                        Score {session.total_score}%
                      </p>
                    </div>

                    <Link
                      href={`/feedback?sessionId=${session.id}`}
                      className="rounded-full border border-[#E6EBF2] px-4 py-2 text-xs font-bold text-[#334155] hover:bg-[#EFF6FF]"
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
function CircularSkill({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[#E6EBF2] bg-[#F8FAFC] p-5 text-center">
      <div className="mx-auto flex h-32 w-32 items-center justify-center">
        <svg className="h-32 w-32 -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#DBEAFE"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#2563EB"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>

        <div className="absolute text-center">
          <p className="text-2xl font-extrabold text-[#1D4ED8]">
            {value}%
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm font-extrabold text-[#0F172A]">
        {title}
      </p>
    </div>
  );
}
function LineChart({
  data,
}: {
  data: {
    id: number;
    total_score: number;
    completed_at: string;
  }[];
}) {
  const width = 820;
  const height = 260;
  const padding = 45;

  const points = data.map((item, index) => {
    const x =
      data.length === 1
        ? width / 2
        : padding + (index * (width - padding * 2)) / (data.length - 1);

    const y =
      height -
      padding -
      (item.total_score / 100) * (height - padding * 2);

    return {
      x,
      y,
      score: item.total_score,
    };
  });

  const path = points
    .map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath =
    path +
    ` L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${
      height - padding
    } Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 25, 50, 75, 100].map((value) => {
        const y =
          height -
          padding -
          (value / 100) * (height - padding * 2);

        return (
          <g key={value}>
            <line
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#E6EBF2"
            />

            <text
              x={8}
              y={y + 4}
              fontSize="11"
              fill="#64748B"
              fontWeight="600"
            >
              {value}%
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#area)" />

      <path
        d={path}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map((point, index) => (
        <g key={index}>
          <circle cx={point.x} cy={point.y} r="6" fill="#1D4ED8" />

          <text
            x={point.x}
            y={point.y - 12}
            textAnchor="middle"
            fontSize="12"
            fill="#0F172A"
            fontWeight="700"
          >
            {point.score}%
          </text>
        </g>
      ))}
    </svg>
  );
  
}