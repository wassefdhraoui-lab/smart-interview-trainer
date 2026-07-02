import Navbar from "../../components/Navbar";

export default function AdminPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-100">Admin</p>

            <h1 className="mt-2 text-5xl font-bold">Admin Panel</h1>

            <p className="mt-3 text-lg text-blue-100">
              Manage interview questions, categories, and difficulty levels.
            </p>
          </div>

          <section className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-bold">Add Question</h2>

              <div className="mt-6 space-y-4">
                <input
                  className="w-full rounded-xl bg-white px-4 py-3 text-slate-900 outline-none"
                  placeholder="Question"
                />

                <input
                  className="w-full rounded-xl bg-white px-4 py-3 text-slate-900 outline-none"
                  placeholder="Category"
                />

                <input
                  className="w-full rounded-xl bg-white px-4 py-3 text-slate-900 outline-none"
                  placeholder="Difficulty"
                />

                <button className="w-full rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50">
                  Add Question
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white p-8 text-slate-950 shadow-2xl lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Question Table</h2>

                <input
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Search questions..."
                />
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-3">Question</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 font-medium text-slate-800">
                      Tell me about yourself.
                    </td>
                    <td className="text-slate-600">Behavioral</td>
                    <td className="text-slate-600">Easy</td>
                    <td>
                      <button className="mr-4 font-semibold text-blue-600">
                        Edit
                      </button>
                      <button className="font-semibold text-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 font-medium text-slate-800">
                      Explain the difference between SQL JOIN types.
                    </td>
                    <td className="text-slate-600">SQL</td>
                    <td className="text-slate-600">Medium</td>
                    <td>
                      <button className="mr-4 font-semibold text-blue-600">
                        Edit
                      </button>
                      <button className="font-semibold text-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}