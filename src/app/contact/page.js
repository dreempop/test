'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตัวอย่าง: ส่งข้อมูลไป API หรือแสดง alert
    console.log({ name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/img/home01.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
{/* Header */}
      <header className="bg-white shadow-md rounded-b-lg p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold flex items-center text-green-600">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden text-2xl text-green-600"
          >
            {mobileNavOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-gray-900 font-medium">
            <button onClick={() => router.push("/")} className="hover:text-green-c">หน้าแรก</button>
            <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">แชทบอท</button>
            <button onClick={() => router.push("/articles")} className="hover:text-green-c">บทความรู้</button>
            <button onClick={() => router.push("/calculator")} className="hover:text-green-c">คำนวณภาษี</button>
            <button onClick={() => router.push("/faq")} className="hover:text-green-c">FAQ</button>
            <button onClick={() => router.push("/contact")} className="hover:text-green-c">ติดต่อเรา</button>
          </nav>

          {/* Auth Buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => router.push("/login-page")}
              className="px-4 py-2 text-green-700 rounded-full font-medium border border-green-600 hover:bg-green-100"
            >
              Sign In
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700">
              Register
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileNavOpen && (
          <div className="md:hidden mt-4 space-y-4 px-4">
            <nav className="flex flex-col space-y-2 text-gray-900 font-medium">
              <button onClick={() => router.push("/")} className="hover:text-green-c">หน้าแรก</button>
              <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">แชทบอท</button>
              <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">บทความรู้</button>
              <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">คำนวณภาษี</button>
              <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">FAQ</button>
              <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">ติดต่อเรา</button>
            </nav>
            <div className="flex flex-col space-y-2 pt-2 border-t border-green-100">
              <button
                onClick={() => router.push("/login-page")}
                className="px-4 py-2 text-green-700 rounded-full border border-green-600 hover:bg-green-100"
              >
                Sign In
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                Register
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
          <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">ติดต่อเรา</h1>
          <p className="text-green-800 text-center mb-6">
            มีข้อสงสัยหรือคำถามเกี่ยวกับภาษี? ส่งข้อความมาหาเราได้เลย!
          </p>

          {submitted && (
            <p className="text-center text-green-700 mb-4 font-medium">
              ขอบคุณ! เราได้รับข้อความของคุณแล้ว 🎉
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="ชื่อของคุณ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 border border-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 w-full"
            />
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border border-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 w-full"
            />
            <textarea
              placeholder="ข้อความของคุณ"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="px-4 py-3 border border-green-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 w-full resize-none"
              rows={5}
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
            >
              ส่งข้อความ
            </button>
          </form>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-green-50 text-green-800 py-8 rounded-t-2xl mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center max-w-7xl space-y-4 md:space-y-0 text-center">
          <div className="text-2xl font-bold flex items-center text-green-600">
            <span className="mr-1">C</span>
            <span>Advisor</span>
          </div>
          <p className="text-green-600 text-sm">© 2025 Tax Advisor WebApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
