export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
        Welcome to PeerLearn 🎓
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl text-center">
        Connect with peers, share knowledge, and grow together.
      </p>
      <div className="flex space-x-6">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-xl shadow-md"
        >
          Signup
        </a>
      </div>
    </div>
  );
}
