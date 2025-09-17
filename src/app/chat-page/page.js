'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "เกิดข้อผิดพลาดในการเชื่อมต่อ" },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="relative text-white flex flex-col min-h-screen"
      style={{
        backgroundImage: "url('/img/home01.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1 container mx-auto mt-6 gap-6 px-4 max-w-7xl">
        {/* Sidebar toggle (mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
          >
            {mobileSidebarOpen ? "ซ่อนเมนู" : "☰ เมนูแชท"}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`${
            mobileSidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-green-50 rounded-xl shadow-lg p-6 flex flex-col text-green-800`}
        >
          <h1 className="text-lg font-bold text-green-600 mb-6">เมนูแชท</h1>
          <nav className="flex flex-col space-y-3 text-sm">
            <button className="py-2 px-3 rounded hover:bg-green-600 hover:text-white transition-colors">
              ✉️ แชทใหม่
            </button>
            <button className="py-2 px-3 rounded hover:bg-green-600 hover:text-white transition-colors">
              🔍 ค้นหาเอกสาร
            </button>
          </nav>
          <h2 className="text-lg font-bold text-green-600 mb-6 mt-6">บทสนทนาเก่า</h2>
          <div className="flex flex-col space-y-2 overflow-y-auto flex-1">
            <button className="py-2 px-3 rounded hover:bg-green-600 hover:text-white transition-colors">
              สอบถามภาษีรายได้บุคคลธรรมดา
            </button>
            <button className="py-2 px-3 rounded hover:bg-green-600 hover:text-white transition-colors">
              คำนวณภาษีเงินได้
            </button>
            <button className="py-2 px-3 rounded hover:bg-green-600 hover:text-white transition-colors">
              วิธีใช้ลดหย่อนภาษี
            </button>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-green-50 rounded-xl shadow-lg overflow-hidden">
          {/* Chat header */}
          <div className="p-4 border-b bg-green-600 flex items-center space-x-3 text-white rounded-t-xl">
            <span className="text-2xl">💬</span>
            <h2 className="font-semibold text-lg">C-Advisor Chat</h2>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white rounded-b-xl">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 mt-10">เริ่มแชทกับเราได้เลย!</p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs text-sm break-words ${
                    msg.sender === "user"
                      ? "bg-green-600 text-white rounded-br-none shadow-lg"
                      : "bg-green-100 text-green-800 rounded-bl-none shadow"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input box */}
          <div className="p-4 border-t bg-green-50 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 rounded-b-xl">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-3 border border-green-600 rounded-full bg-white text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 w-full"
            />
            <button
              onClick={handleSend}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow"
            >
              ส่ง
            </button>
          </div>
        </main>
      </div>

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
