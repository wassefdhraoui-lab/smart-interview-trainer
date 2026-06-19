"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import PageContainer from "../../components/PageContainer";

const categories = [
  "Frontend",
  "HR",
  "Behavioral",
  "Technical",
  "Communication",
];

const interviews = [
  { title: "Frontend Interview", score: 80, category: "Frontend" },
  { title: "HR Interview", score: 85, category: "HR" },
  { title: "Behavioral Interview", score: 78, category: "Behavioral" },
];

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");

 const avatar = "/hacker.png";;

  return (
    <>
      <Navbar />

      <PageContainer>
        {/* Hero section at the top of the dashboard */}
      <section className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between gap-10">

          {/* Left side: welcome text and actions */}
          <div>
            <p className="text-sm font-semibold text-blue-100">Dashboard</p>

            <h1 className="mt-2 text-5xl font-bold">
              Welcome back, Wassef
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-blue-100">
              Choose a category, continue practicing, and track your interview
              improvement.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/interview"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                Start Interview
              </Link>

              <Link
                href="/progress"
                className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                View Progress
              </Link>
            </div>
          </div>

          {/* Right side: user avatar. 
              If avatar is null, nothing will be shown. */}
          {avatar && (
            <div className="hidden shrink-0 items-center justify-center md:flex">
              <img
                src={avatar}
                alt="User avatar"
                className="h-32 w-32 rounded-full border-4 border-white/40 object-cover shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>

        <section className="mb-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <p className="text-sm text-slate-500">Average Score</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950">82%</h2>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[82%] rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <p className="text-sm text-slate-500">Completed Interviews</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950">5</h2>
            <p className="mt-3 text-sm text-green-600">+2 this week</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <p className="text-sm text-slate-500">Best Category</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Communication
            </h2>
            <p className="mt-3 text-sm text-blue-600">92% average</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
            <p className="text-sm text-slate-500">Weakest Category</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Technical
            </h2>
            <p className="mt-3 text-sm text-red-600">Needs practice</p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Choose Practice Category
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-5 py-3 font-semibold transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-6">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Selected Category
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-950">
                {selectedCategory} Interview Practice
              </h3>

              <p className="mt-2 text-slate-600">
                Start a practice session focused on {selectedCategory} questions.
              </p>
            </div>

            <Link
              href="/interview"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start {selectedCategory} Practice
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">
              Recent Interviews
            </h2>

            <div className="mt-6 space-y-4">
              {interviews.map((interview) => (
                <Link
                  key={interview.title}
                  href="/feedback"
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4 hover:bg-blue-50"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {interview.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {interview.category}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-4 py-2 font-bold text-blue-700">
                    {interview.score}%
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Weekly Goal</h2>

            <p className="mt-3 text-slate-600">
              Complete 3 interview sessions this week.
            </p>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">Progress</span>
                <span className="font-bold text-blue-600">2 / 3</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[66%] rounded-full bg-blue-600" />
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-blue-50 p-5">
              <p className="font-semibold text-blue-700">Suggestion</p>
              <p className="mt-2 text-slate-700">
                Practice one technical interview today to improve your weakest
                category.
              </p>
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  );
}