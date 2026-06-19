export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Add Question</h2>

        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Question" />
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Category" />
        <input className="w-full border p-3 rounded-lg mb-4" placeholder="Difficulty" />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Add Question
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Question Table</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Question</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">Tell me about yourself.</td>
              <td>Behavioral</td>
              <td>Easy</td>
              <td>
                <button className="text-blue-600 mr-4">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}