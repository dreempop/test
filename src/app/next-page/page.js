// app/page.tsx
'use client';

export default function Login() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/img/home01.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <img src="/logo.png" alt="C-Advisor Logo" className="h-16 mb-2" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">C-Advisor</h1>
        <span className="text-lg text-gray-700">Chatbot Advisor</span>
      </div>
      {/* Login Box */}
      <form className="bg-white bg-opacity-80 rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-gray-700 text-sm">จดจำฉันไว้</label>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-green-c transition-colors"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}
