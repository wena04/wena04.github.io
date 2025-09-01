export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 px-8">
      <h2 className="text-4xl font-bold mb-6">Projects</h2>
      <ul className="space-y-4 max-w-2xl">
        <li className="p-4 border rounded shadow">
          GVCC App Rebuild – React, Golang, MySQL
        </li>
        <li className="p-4 border rounded shadow">
          CSE 451 OS Labs – Implemented pipes, exec, COW fork
        </li>
        <li className="p-4 border rounded shadow">
          iQuiz iOS App – Swift, Networking, Local Storage
        </li>
        <li className="p-4 border rounded shadow">
          AI/VLM Paper – Real vs Synthetic Image Benchmark
        </li>
      </ul>
    </div>
  );
}
