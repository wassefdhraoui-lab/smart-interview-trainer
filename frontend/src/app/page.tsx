import Link from "next/link";
import Navbar from "../components/Navbar";


export default function LandingPage() {
  return (
    <>
      

      <main className="min-h-screen bg-[#FFFFFF] px-8 py-16 text-[#111827]">
        <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[#4F46E5]">
              Smart Interview Trainer
            </p>

            <h1 className="mt-4 text-[2.5rem] font-extrabold leading-tight tracking-[-0.02em]">
              Practice interviews smarter.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-[#6B7280]">
              Prepare for technical and HR interviews with structured questions,
              answer practice, feedback, and progress tracking.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/interview-setup"
                className="rounded-xl bg-[#4F46E5] px-6 py-3 font-semibold text-white transition hover:bg-[#6366F1]"
              >
                Start Practicing
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-[#EDEEF2] px-6 py-3 font-semibold text-[#111827] transition hover:bg-[#F5F6FA]"
              >
                How it Works
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-[#EDEEF2] bg-[#F5F6FA] p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#111827]">
              Feature Highlights
            </h2>

            <div className="mt-6 grid gap-4">
              {[
                "Practice Questions",
                "Voice + Transcript",
                "Feedback Report",
                "Progress Tracking",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-[#EDEEF2] bg-white p-5"
                >
                  <h3 className="font-bold text-[#111827]">{feature}</h3>
                  <p className="mt-2 text-[#6B7280]">
                    Improve your interview preparation step by step.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto mt-20 max-w-7xl rounded-3xl border border-[#EDEEF2] bg-[#F5F6FA] p-8 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-[#111827]">How it works</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#EDEEF2] bg-white p-6">
              1 Choose
            </div>
            <div className="rounded-2xl border border-[#EDEEF2] bg-white p-6">
              2 Answer
            </div>
            <div className="rounded-2xl border border-[#EDEEF2] bg-white p-6">
              3 Score
            </div>
          </div>

          <Link
            href="/register"
            className="mt-8 inline-block rounded-xl bg-[#4F46E5] px-6 py-3 font-semibold text-white transition hover:bg-[#6366F1]"
          >
            Create Free Account
          </Link>
        </section>

        <footer className="mx-auto mt-16 max-w-7xl text-sm text-[#6B7280]">
          Footer · About · Privacy · ©
        </footer>
      </main>
    </>
  );
}