import Link from "next/link";

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Interview Feedback</h1>

        <div className="mb-6">
          <p className="text-slate-500">Overall Score</p>
          <h2 className="text-5xl font-bold text-blue-600">82%</h2>
        </div>

        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">Strengths</h3>
          <p className="text-slate-700">
            Your answer was clear, structured, and relevant to the question.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-bold mb-2">Improvement Suggestions</h3>
          <p className="text-slate-700">
            Try to include more concrete examples and explain the result of your actions.
          </p>
        </section>

        <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}