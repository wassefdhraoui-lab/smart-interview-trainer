import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">Smart Interview Trainer</h1>
        <div className="flex gap-4">
          <Link href="/login" className="text-slate-700">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Register
          </Link>
        </div>
      </nav>

      <section className="text-center px-6 py-24">
        <h2 className="text-5xl font-bold text-slate-900">
          Practice Interviews Smarter
        </h2>
        <p className="mt-6 text-lg text-slate-600">
          Improve your interview skills with questions, feedback, and progress tracking.
        </p>
        <Link href="/register" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl">
          Get Started
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-6 px-10 pb-20">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-xl">AI Feedback</h3>
          <p className="text-slate-600 mt-2">Receive feedback on your answers.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-xl">Voice Practice</h3>
          <p className="text-slate-600 mt-2">Practice speaking answers out loud.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-xl">Progress Tracking</h3>
          <p className="text-slate-600 mt-2">See how you improve over time.</p>
        </div>
      </section>
    </main>
  );
}