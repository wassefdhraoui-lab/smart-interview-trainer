"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (data.success) {
       localStorage.setItem("userId", data.user.id);
       window.location.href = "/dashboard";
    } else {
      setError(data.message);
  }
  }

  return (
    <>
      

      <main className="min-h-screen bg-[#FFFFFF] px-8 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-[#EDEEF2] bg-[#F5F6FA] p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#111827]">Log In</h1>

          <div className="mt-8 space-y-4">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-[#EDEEF2] bg-white px-4 py-3 text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5]"
              placeholder="Email"
              type="email"
            />

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#EDEEF2] bg-white px-4 py-3 text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5]"
              placeholder="Password"
              type="password"
            />
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="block w-full rounded-xl bg-[#4F46E5] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#6366F1]"
            >
              Log In
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-[#4F46E5]">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}