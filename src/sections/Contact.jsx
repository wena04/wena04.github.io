export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-8">
      <h2 className="text-4xl font-bold mb-6">Contact</h2>
      <p className="mb-4">Feel free to reach out!</p>
      <div className="space-x-4">
        <a
          href="mailto:your.email@example.com"
          className="underline hover:text-blue-400"
        >
          Email
        </a>
        <a
          href="https://github.com/wena04"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-400"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/aw-programmer"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-400"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
