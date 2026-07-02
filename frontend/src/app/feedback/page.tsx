"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "@/src/components/Footer";
type FeedbackAnswer = {
  question_order: number;
  question_text: string;
  sample_answer: string;
  user_answer: string;
  score: number;
  feedback: string;
  missed_keywords: string[];
  communication_score: number;
  technical_score: number;
  confidence_score: number;
  strengths: string[];
  weaknesses: string[];
  improved_answer: string;
};

type FeedbackSession = {
  id: number;
  total_score: number;
  general_feedback: string;
  question_count: number;
  category: string;
  difficulty: string;
  answer_mode: string;
};

export default function FeedbackPage() {
  const [session, setSession] = useState<FeedbackSession | null>(null);
  const [answers, setAnswers] = useState<FeedbackAnswer[]>([]);
  const [message, setMessage] = useState("Loading feedback...");

  useEffect(() => {
    async function loadFeedback() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("sessionId");

      if (!sessionId) {
        setMessage("Session not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/interview/sessions/${sessionId}/feedback`
      );

      const data = await response.json();

      if (data.success) {
        setSession(data.session);
        setAnswers(data.answers || []);
      } else {
        setMessage(data.message || "Feedback could not be loaded.");
      }
    }

    loadFeedback();
  }, []);

  if (!session) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white px-8 py-12 text-center">
          {message}
        </main>
        
      </>
    );
  }

  const allStrengths = answers.flatMap((answer) => answer.strengths || []);
  const allWeaknesses = answers.flatMap((answer) => answer.weaknesses || []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-8 py-10 text-[#0F172A]">
        <div className="mx-auto max-w-[760px]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Interview Complete
          </p>

          <h1 className="mt-2 text-2xl font-extrabold">
            {session.category} · {session.difficulty} ·{" "}
            {session.question_count} Questions
          </h1>

          <section className="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E3A8A] via-[#1D4ED8] to-[#3B82F6] p-8 text-white shadow-xl">
            <div className="absolute right-[-40px] top-[-70px] h-64 w-64 rounded-full bg-white/15" />

            <div className="relative flex items-center gap-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-white/40 bg-white/15 text-3xl font-extrabold">
                {session.total_score}%
              </div>

              <div>
                <h2 className="text-xl font-extrabold">
                  {session.total_score >= 75
                    ? "Good Performance"
                    : session.total_score >= 50
                    ? "Decent Performance"
                    : "Needs More Practice"}
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  {session.general_feedback ||
                    "Your answers have been reviewed by the AI evaluator."}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <InfoBox
              title="Strengths"
              items={allStrengths.slice(0, 4)}
              empty="No strengths found yet."
              positive
            />

            <InfoBox
              title="Areas to Improve"
              items={allWeaknesses.slice(0, 4)}
              empty="No major weaknesses found."
            />
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-extrabold">Question Feedback</h2>

            <div className="mt-4 space-y-4">
              {answers.map((answer) => (
                <div
                  key={answer.question_order}
                  className="rounded-2xl border border-[#E6EBF2] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold">
                        Question {answer.question_order}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#0F172A]">
                        {answer.question_text}
                      </p>
                    </div>

                    <p
                      className={`text-sm font-extrabold ${
                        answer.score >= 75
                          ? "text-[#16A34A]"
                          : answer.score >= 50
                          ? "text-orange-500"
                          : "text-[#DC2626]"
                      }`}
                    >
                      {answer.score}%
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#F8FAFC] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#64748B]">
                      Your Answer
                    </p>

                    <p className="mt-2 text-sm leading-6">
                      {answer.user_answer}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <ScoreMini
                      label="Communication"
                      value={answer.communication_score}
                    />
                    <ScoreMini
                      label="Technical"
                      value={answer.technical_score}
                    />
                    <ScoreMini
                      label="Confidence"
                      value={answer.confidence_score}
                    />
                  </div>

                  <p className="mt-4 text-sm text-[#64748B]">
                    {answer.feedback}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(answer.strengths || []).slice(0, 3).map((item) => (
                      <Chip key={item} text={item} positive />
                    ))}

                    {(answer.missed_keywords || []).slice(0, 3).map((item) => (
                      <Chip key={item} text={item} />
                    ))}
                  </div>

                  {answer.score < 100 && answer.improved_answer && (
                    <div className="mt-4 rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1D4ED8]">
                        Improved Answer
                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#334155]">
                        {answer.improved_answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 flex items-center justify-between rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-5">
            <div>
              <p className="text-sm font-extrabold text-[#1D4ED8]">
                Recommended Next Practice
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Practice the topics with the lowest technical score.
              </p>
            </div>

            <Link
              href="/interview-setup"
              className="rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-5 py-3 text-sm font-bold text-white shadow-lg"
            >
              Practice Again
            </Link>
          </section>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/progress"
              className="rounded-xl border border-[#E6EBF2] bg-white px-5 py-3 text-sm font-bold text-[#334155]"
            >
              View Progress
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-[#E6EBF2] bg-white px-5 py-3 text-sm font-bold text-[#334155]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer /> 
    </>
  );
}

function InfoBox({
  title,
  items,
  empty,
  positive,
}: {
  title: string;
  items: string[];
  empty: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#E6EBF2] bg-white p-5 shadow-sm">
      <h3 className="text-sm font-extrabold">{title}</h3>

      <div className="mt-3 space-y-2">
        {items.length ? (
          items.map((item) => (
            <p key={item} className="text-sm text-[#334155]">
              <span className={positive ? "text-[#16A34A]" : "text-[#DC2626]"}>
                {positive ? "✓" : "•"}
              </span>{" "}
              {item}
            </p>
          ))
        ) : (
          <p className="text-sm text-[#64748B]">{empty}</p>
        )}
      </div>
    </div>
  );
}

function ScoreMini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[#F8FAFC] p-3">
      <p className="text-xs font-bold text-[#64748B]">{label}</p>
      <p className="mt-1 text-lg font-extrabold text-[#1D4ED8]">{value}%</p>
    </div>
  );
}

function Chip({
  text,
  positive,
}: {
  text: string;
  positive?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        positive
          ? "bg-[#F0FDF4] text-[#16A34A]"
          : "bg-[#FEF2F2] text-[#DC2626]"
      }`}
    >
      {positive ? "✓" : "✗"} {text}
    </span>
  );
}