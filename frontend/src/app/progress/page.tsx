export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-bold mb-8">Progress Overview</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Progress Chart</h2>
        <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
          Chart Placeholder
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Interview History</h2>
        <ul className="space-y-3">
          <li>HR Interview — 85%</li>
          <li>Frontend Interview — 80%</li>
          <li>Behavioral Interview — 78%</li>
        </ul>
      </div>
    </main>
  );
}