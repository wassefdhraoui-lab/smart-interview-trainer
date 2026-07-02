"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/UserContext";
import Footer from "../../components/Footer";
type Option = {
  id: number;
  name: string;
};

export default function InterviewSetupPage() {
  const { user } = useUser();

  const [categories, setCategories] = useState<Option[]>([]);
  const [difficulties, setDifficulties] = useState<Option[]>([]);
  const [answerModes, setAnswerModes] = useState<Option[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [difficultyId, setDifficultyId] = useState<number | null>(null);
  const [answerModeId, setAnswerModeId] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(5);

  useEffect(() => {
    async function loadOptions() {
      const response = await fetch("http://localhost:5000/interview/options");
      const data = await response.json();

      if (data.success) {
        setCategories(data.categories);
        setDifficulties(data.difficulties);
        setAnswerModes(data.answerModes);

        setCategoryId(data.categories[0]?.id);
        setDifficultyId(data.difficulties[0]?.id);
        setAnswerModeId(data.answerModes[0]?.id);
      }
    }

    loadOptions();
  }, []);

  async function startInterview() {
    const response = await fetch("http://localhost:5000/interview/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.id,
        category_id: categoryId,
        difficulty_id: difficultyId,
        question_count: questionCount,
        answer_mode_id: answerModeId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = `/interview?sessionId=${data.session.id}`;
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-8 py-10 text-[#0F172A]">
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-[#64748B]"
          >
            ← Cancel
          </Link>

          <section className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
              New Session
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em]">
              Set up your interview
            </h1>

            <p className="mt-2 text-sm text-[#64748B]">
              Choose a category, difficulty, and how you&apos;d like to answer.
            </p>
          </section>

          <section className="mt-8 space-y-7">
            <OptionGroup
              title="Interview Category"
              items={categories}
              selectedId={categoryId}
              setSelectedId={setCategoryId}
            />

            <SegmentGroup
              title="Difficulty"
              items={difficulties}
              selectedId={difficultyId}
              setSelectedId={setDifficultyId}
            />

            <div>
              <h2 className="mb-3 text-sm font-extrabold text-[#0F172A]">
                Number of Questions
              </h2>

              <div className="inline-flex rounded-xl bg-[#F4F7FC] p-1">
                {[3, 5, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-lg px-5 py-2 text-sm font-bold transition ${
                      questionCount === count
                        ? "bg-white text-[#1D4ED8] shadow-sm"
                        : "text-[#94A3B8]"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-extrabold text-[#0F172A]">
                Answer Mode
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {answerModes.map((mode) => {
                  const isVoice = mode.name.toLowerCase().includes("voice");

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setAnswerModeId(mode.id)}
                      className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                        answerModeId === mode.id
                          ? "border-[#3B82F6] bg-[#EFF6FF]"
                          : "border-[#E6EBF2] bg-white hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-lg">
                        {isVoice ? "🎤" : "✍️"}
                      </div>

                      <div>
                        <p className="font-extrabold text-[#0F172A]">
                          {mode.name}
                        </p>

                        <p className="mt-1 text-xs text-[#64748B]">
                          {isVoice
                            ? "Speak, then review the text"
                            : "Type your answers"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-[#E6EBF2]" />

            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex-1 rounded-xl border border-[#E6EBF2] bg-white px-6 py-3 text-center text-sm font-bold text-[#334155] transition hover:bg-[#F8FAFC]"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={startInterview}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/30"
              >
                Start Interview
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer /> 
    </>
  );
}

function OptionGroup({
  title,
  items,
  selectedId,
  setSelectedId,
}: {
  title: string;
  items: Option[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-extrabold text-[#0F172A]">{title}</h2>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${
              selectedId === item.id
                ? "border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]"
                : "border-[#E6EBF2] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function SegmentGroup({
  title,
  items,
  selectedId,
  setSelectedId,
}: {
  title: string;
  items: Option[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-extrabold text-[#0F172A]">{title}</h2>

      <div className="inline-flex rounded-xl bg-[#F4F7FC] p-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            className={`rounded-lg px-6 py-2 text-sm font-bold transition ${
              selectedId === item.id
                ? "bg-white text-[#1D4ED8] shadow-sm"
                : "text-[#94A3B8]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}