import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Name" />
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Email" />
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Password" type="password" />
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Confirm Password" type="password" />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Create Account
        </button>

        <p className="mt-4 text-center text-slate-600">
          Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </main>
  );
}