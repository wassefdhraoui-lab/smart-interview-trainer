"use client";

import { useState } from "react";
import Link from "next/link";

const avatars = ["/hacker.png", "A", "S", "M", "L"];

export default function Navbar() {
  const [selectedAvatar, setSelectedAvatar] = useState("/hacker.png");

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Smart Interview Trainer
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/progress">Progress</Link>
          <Link href="/admin">Admin</Link>

          {/* Avatar menu wrapper */}
          <div className="group relative">
            {/* Current selected avatar */}
            <button className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-blue-600 font-bold text-white shadow-sm">
              {selectedAvatar.endsWith(".png") ? (
                <img
                  src={selectedAvatar}
                  alt="Selected avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                selectedAvatar
              )}
            </button>

            {/* Invisible bridge: prevents dropdown from disappearing while moving mouse */}
            <div className="absolute right-0 top-11 hidden h-4 w-56 group-hover:block" />

            {/* Avatar dropdown */}
            <div className="absolute right-0 top-14 z-50 hidden w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl group-hover:block">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Choose Avatar
              </p>

              <div className="flex gap-3">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 font-bold text-slate-700 transition hover:ring-2 hover:ring-blue-500"
                  >
                    {avatar.endsWith(".png") ? (
                      <img
                        src={avatar}
                        alt="hacker"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      avatar
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}