export default function LandingPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to PeerLearn 🎓
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-10">
          Connect with peers, share knowledge, and grow together in a
          collaborative learning environment.
        </p>
        <div className="flex space-x-6">
          <a
            href="/login"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all shadow-lg shadow-gray-700/30"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}
