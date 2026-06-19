import Link from "next/link";

export default function InterviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
            Behavioral
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg">
            Medium
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-6">
          Tell me about yourself.
        </h1>

        <textarea
          className="w-full border rounded-lg p-4 h-40 mb-4"
          placeholder="Write your answer here..."
        />

        <div className="flex gap-4 mb-6">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Start Voice
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Stop Voice
          </button>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg mb-6">
          Transcript will appear here...
        </div>

        <Link href="/feedback" className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Submit Answer
        </Link>
      </div>
    </main>
  );
}