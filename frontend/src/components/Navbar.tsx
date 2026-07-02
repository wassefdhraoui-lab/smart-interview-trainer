"use client";

import Link from "next/link";
import NavbarAvatar from "./NavbarAvatar";

type NavbarProps = {
  avatar?: string;
};

export default function Navbar({ avatar = "" }: NavbarProps) {
  return (
    <>
      <nav className="fixed left-0 top-0 z-50 h-[72px] w-full border-b border-[#E6EBF2] bg-white">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[420px]">
          <svg
            viewBox="0 0 420 72"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M120 72 C190 30 260 115 420 20"
              fill="none"
              stroke="#DBEAFE"
              strokeWidth="2"
            />
            <path
              d="M90 72 C170 20 250 105 420 8"
              fill="none"
              stroke="#BFDBFE"
              strokeWidth="2"
            />
            <path
              d="M150 72 C220 45 290 100 420 35"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="1.5"
            />
            <path
              d="M180 72 C250 50 320 95 420 50"
              fill="none"
              stroke="#DBEAFE"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-8">
          <Link href="/dashboard" className="font-bold text-[#0F172A]">
            Smart Interview Trainer
          </Link>

          <div className="flex items-center gap-7">
            <Link href="/dashboard" className="font-semibold text-[#64748B]">
              Dashboard
            </Link>

            <Link
              href="/interview-setup"
              className="font-semibold text-[#64748B]"
            >
              Practice
            </Link>

            <Link href="/progress" className="font-semibold text-[#64748B]">
              Progress
            </Link>
            
            <Link href="/profile" className="font-semibold text-[#64748B]">
              Profil
            </Link>

            <span>🔔</span>

            <NavbarAvatar />
          </div>
        </div>
      </nav>

      <div className="h-[72px]" />
    </>
  );
}