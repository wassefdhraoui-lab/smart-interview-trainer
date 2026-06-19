import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Email" />
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Password" type="password" />

        <Link href="/dashboard" className="block text-center w-full bg-blue-600 text-white py-3 rounded-lg">
          Login
        </Link>

        <p className="mt-4 text-center text-slate-600">
          No account? <Link href="/register" className="text-blue-600">Register</Link>
        </p>
      </div>
    </main>
  );
}
