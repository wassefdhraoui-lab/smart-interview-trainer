"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[#E6EBF2] bg-white">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-[520px]">
        <svg viewBox="0 0 520 112" preserveAspectRatio="none" className="h-full w-full">
          <path d="M120 20 C230 90 350 -10 520 45" fill="none" stroke="#DBEAFE" strokeWidth="2" />
          <path d="M80 45 C210 110 350 10 520 70" fill="none" stroke="#BFDBFE" strokeWidth="2" />
          <path d="M160 0 C280 80 390 5 520 30" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-sm font-extrabold text-[#0F172A]">
              Smart Interview Trainer
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#64748B]">
              AI interview practice platform for technical preparation,
              feedback, and progress tracking.
            </p>

            <p className="mt-4 text-sm font-bold text-[#0F172A]">
              Wassef Dhraoui
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-[#64748B]">
              <Link href="/dashboard" className="hover:text-[#1D4ED8]">Dashboard</Link>
              <Link href="/interview-setup" className="hover:text-[#1D4ED8]">Practice</Link>
              <Link href="/progress" className="hover:text-[#1D4ED8]">Progress</Link>
              <Link href="/profile" className="hover:text-[#1D4ED8]">Profile</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              Built With
            </h3>

            <div className="mt-4 space-y-3 text-sm text-[#64748B]">
              <p>Next.js</p>
              <p>Express.js</p>
              <p>PostgreSQL</p>
              <p>AI Feedback API</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              Project
            </h3>

            <div className="mt-4 space-y-3 text-sm text-[#64748B]">
              <p>Student project</p>
              <p>Interview preparation</p>
              <p>Progress analytics</p>
              <p>Designed & developed by Wassef</p>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-extrabold text-[#0F172A]">
  Smart Interview Trainer
</h2>

<img
  src="/favicon.ico"
  alt="Smart Interview Trainer Logo"
  className="mt-16 h-16 w-auto"
/>

        <div className="mt-4 flex flex-col justify-between gap-3 border-t border-[#E6EBF2] pt-5 text-xs text-[#94A3B8] md:flex-row">
          <p>© {year} Smart Interview Trainer. All rights reserved.</p>
          <p>Designed & Developed by Wassef Dhraoui</p>
        </div>
      </div>
    </footer>
  );
}