"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type Question = {
  id: number;
  question_text: string;
  user_answer: string;
};

type Session = {
  category: string;
  difficulty: string;
  answer_mode: string;
};

export default function InterviewPage() {
  const canLeave = useRef(false);

  const [sessionId, setSessionId] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("sessionId");

      if (!id) {
        setMessage("Session not found.");
        return;
      }

      setSessionId(id);

      const response = await fetch(
        `http://localhost:5000/interview/sessions/${id}/questions`
      );

      const data = await response.json();

      if (!data.success) {
        setMessage(data.message);
        return;
      }

      setSession(data.session);
      setQuestions(data.questions);
      setAnswer(data.questions[0]?.user_answer || "");
    }

    loadQuestions();
  }, []);

  async function saveAnswerToDatabase(completeInterview: boolean) {
    if (!answer.trim()) {
      setMessage("Please enter an answer.");
      return null;
    }

    const question = questions[currentQuestion];

    const response = await fetch("http://localhost:5000/interview/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
        question_id: question.id,
        question_order: currentQuestion + 1,
        user_answer: answer,
        complete_interview: completeInterview,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      setMessage(data.message);
      return null;
    }

    const updatedQuestions = [...questions];

    updatedQuestions[currentQuestion] = {
      ...question,
      user_answer: answer,
    };

    setQuestions(updatedQuestions);
    setMessage("");

    return { data, updatedQuestions };
  }

  async function showPreviousQuestion() {
    const result = await saveAnswerToDatabase(false);
    if (!result) return;

    const previousQuestion = currentQuestion - 1;

    setCurrentQuestion(previousQuestion);
    setAnswer(result.updatedQuestions[previousQuestion].user_answer);
  }

  async function saveCurrentAnswer() {
    const lastQuestion = currentQuestion === questions.length - 1;

    const result = await saveAnswerToDatabase(lastQuestion);
    if (!result) return;

    if (result.data.completed) {
      canLeave.current = true;
      window.location.href = `/feedback?sessionId=${sessionId}`;
      return;
    }

    const nextQuestion = currentQuestion + 1;

    setCurrentQuestion(nextQuestion);
    setAnswer(result.updatedQuestions[nextQuestion].user_answer);
  }

  if (!session || questions.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white px-8 py-12 text-center">
          <p>{message || "Loading questions..."}</p>
        </main>
      </>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-8 py-8 text-[#0F172A]">
        <div className="mx-auto max-w-[760px]">
          <div className="flex items-center justify-between text-sm">
            <Link href="/dashboard" className="font-semibold text-[#64748B]">
              ← Exit
            </Link>

            <p className="font-bold">
              {session.category} · {session.difficulty}
            </p>

            <p className="font-semibold text-[#64748B]">
              Question {currentQuestion + 1} / {questions.length}
            </p>
          </div>

          <div className="mt-7 h-2 rounded-full bg-[#DBEAFE]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <section className="mt-12 rounded-2xl border border-[#E6EBF2] bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
              Question
            </p>

            <h1 className="mt-3 text-xl font-extrabold leading-8">
              {question.question_text}
            </h1>
          </section>

          <section className="mt-7">
            <label className="text-sm font-extrabold">Your Answer</label>

            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer here..."
              className="mt-3 h-40 w-full rounded-xl border border-[#3B82F6] bg-white p-4 text-sm leading-6 outline-none shadow-sm focus:ring-2 focus:ring-blue-500/20"
            />

            {message && (
              <p className="mt-3 text-sm font-semibold text-red-600">
                {message}
              </p>
            )}
          </section>

          <div className="mt-5 flex items-center gap-3">
            <button className="rounded-full border border-[#E6EBF2] bg-white px-4 py-2 text-xs font-bold text-[#334155]">
              🎤 Start Voice
            </button>

            <button className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold text-red-600">
              ■ Stop Recording
            </button>

            <span className="text-xs font-semibold text-[#64748B]">00:14</span>
          </div>

          <section className="mt-5">
            <p className="text-xs font-extrabold">Transcript</p>

            <div className="mt-2 rounded-xl border border-[#E6EBF2] bg-white p-4 text-sm italic text-[#64748B]">
              Transcript will appear here when voice mode is added.
            </div>
          </section>

          <div className="mt-10 flex items-center justify-between border-t border-[#E6EBF2] pt-6">
            <button
              type="button"
              onClick={showPreviousQuestion}
              disabled={currentQuestion === 0}
              className="text-sm font-bold text-[#64748B] disabled:opacity-40"
            >
              Back
            </button>

            <button
              type="button"
              onClick={saveCurrentAnswer}
              className="rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20"
            >
              {currentQuestion === questions.length - 1
                ? "Finish Interview"
                : "Submit Answer"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}