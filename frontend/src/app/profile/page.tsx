"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/UserContext";
import Footer from "../../components/Footer";
export default function ProfilePage() {
  const { user, updateAccount } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

 async function saveChanges() {
  const cleanCurrentPassword = currentPassword.trim();
  const cleanNewPassword = newPassword.trim();

  const data = await updateAccount(
    name.trim(),
    email.trim(),
    cleanCurrentPassword,
    cleanNewPassword
  );

  if (data?.success) {
    setCurrentPassword("");
    setNewPassword("");
    window.location.href = "/dashboard";
  } else {
    setCurrentPassword("");
    setNewPassword("");
    setMessage(data?.message || "Something went wrong");
  }
}
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-8 py-10 text-[#0F172A]">
        <div className="mx-auto max-w-[900px]">
          <p className="text-sm font-bold text-[#1D4ED8]">Profile</p>

          <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.03em]">
            Account Settings
          </h1>

          <p className="mt-6 text-xl text-[#64748B]">
            Manage your personal information, password, and interview
            preferences.
          </p>

          <section className="mt-10 rounded-3xl border border-[#E6EBF2] bg-[#F5F7FB] p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold">
              Personal Information
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20"
              />

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            
          </section>

          <section className="mt-8 rounded-3xl border border-[#E6EBF2] bg-[#F5F7FB] p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold">Change Password</h2>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
              <input
                type="password"
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(event.target.value)
                }
                placeholder="Current Password"
                className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20"
              />

              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New Password"
                className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            
          </section>

          <section className="mt-8 rounded-3xl border border-[#E6EBF2] bg-[#F5F7FB] p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold">
              Interview Preferences
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
              <select className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20">
                <option>Default Difficulty: Beginner</option>
                <option>Default Difficulty: Intermediate</option>
                <option>Default Difficulty: Advanced</option>
              </select>

              <select className="rounded-2xl border border-[#E6EBF2] bg-white px-5 py-4 text-lg outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20">
                <option>Default Questions: 5</option>
                <option>Default Questions: 3</option>
                <option>Default Questions: 10</option>
              </select>
            </div>
          </section>
          <button
            type="button"
            onClick={saveChanges}
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20"
          >
            Save Changes
          </button>

          {message && (
            <p className="mt-6 rounded-xl bg-[#EFF6FF] px-5 py-4 text-sm font-bold text-[#1D4ED8]">
              {message}
            </p>
          )}
        </div>
      </main>
      <Footer /> 
    </>
  );
}