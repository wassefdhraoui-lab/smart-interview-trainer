import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  return (
    <>
      

      <main className="min-h-screen bg-[#FFFFFF] px-8 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-[#EDEEF2] bg-[#F5F6FA] p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#111827]">
            Create your free account
          </h1>

          <div className="mt-8 space-y-4">
            <input className="w-full rounded-xl border border-[#EDEEF2] bg-white px-4 py-3 text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5]" placeholder="Full Name" />
            <input className="w-full rounded-xl border border-[#EDEEF2] bg-white px-4 py-3 text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5]" placeholder="Email" type="email" />
            <input className="w-full rounded-xl border border-[#EDEEF2] bg-white px-4 py-3 text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5]" placeholder="Password 👁" type="password" />
            <input className="w-full rounded-xl border border-[#EDEEF2] bg-white px-4 py-3 text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5]" placeholder="Confirm Password" type="password" />

            <Link
              href="/dashboard"
              className="block w-full rounded-xl bg-[#4F46E5] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#6366F1]"
            >
              Create Account
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#4F46E5]">
              Back to Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}