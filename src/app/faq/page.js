'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KnowledgePage() {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // -------------------
  // Chatbot State
  // -------------------
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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

  // -------------------
  // Tabs State
  // -------------------
  const [activeTab, setActiveTab] = useState("articles");

  // -------------------
  // Articles Data
  // -------------------
  const articles = [
    {
      title: "ความรู้พื้นฐานเกี่ยวกับภาษีเงินได้บุคคลธรรมดา",
      content: "บทความนี้อธิบายเรื่องภาษีเงินได้บุคคลธรรมดาเบื้องต้น...",
    },
    {
      title: "วิธีลดหย่อนภาษีอย่างถูกต้อง",
      content: "คุณสามารถใช้สิทธิ์ลดหย่อนภาษีได้ตามเงื่อนไขที่กฎหมายกำหนด...",
    },
  ];

  // -------------------
  // FAQ Data
  // -------------------
  const faqs = [
    {
      question: "C-Advisor คืออะไร?",
      answer: "C-Advisor เป็นเว็บแอปพลิเคชันช่วยให้คำปรึกษาเกี่ยวกับภาษีบุคคลธรรมดาและเครื่องมือคำนวณภาษีออนไลน์.",
    },
    {
      question: "ฉันสามารถถามคำถามเกี่ยวกับภาษีได้ฟรีหรือไม่?",
      answer: "ใช่! คุณสามารถถามคำถามทั่วไปเกี่ยวกับภาษีได้ฟรีผ่านแชทบอทของเรา.",
    },
    {
      question: "ข้อมูลของฉันปลอดภัยหรือไม่?",
      answer: "ข้อมูลของคุณจะถูกเก็บอย่างปลอดภัยและใช้เฉพาะเพื่อปรับปรุงการให้บริการเท่านั้น.",
    },
  ];

  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
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

      {/* Tabs */}
      <div className="container mx-auto px-4 mt-6 max-w-7xl">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-6 py-2 rounded-t-lg font-medium ${activeTab === "articles" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
            onClick={() => setActiveTab("articles")}
          >
            บทความ
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-medium ${activeTab === "faq" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-medium ${activeTab === "chat" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
            onClick={() => setActiveTab("chat")}
          >
            แชทบอท
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-lg p-6">
          {/* Articles Tab */}
          {activeTab === "articles" && (
            <div className="flex flex-col space-y-4">
              {articles.map((article, i) => (
                <div key={i} className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
                  <h2 className="font-bold text-green-600 mb-2">{article.title}</h2>
                  <p className="text-green-800">{article.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="flex flex-col space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-green-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-4 bg-green-50 text-green-800 font-medium flex justify-between items-center hover:bg-green-100 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span>{openFAQIndex === index ? "−" : "+"}</span>
                  </button>
                  {openFAQIndex === index && (
                    <div className="px-6 py-4 bg-white text-green-900">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Chatbot Tab */}
          {activeTab === "chat" && (
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50 rounded-lg mb-4">
                {messages.length === 0 && <p className="text-gray-400 text-center mt-10">เริ่มแชทกับเราได้เลย!</p>}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`px-4 py-2 rounded-lg max-w-xs text-sm break-words ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white rounded-br-none shadow-lg"
                        : "bg-green-100 text-green-800 rounded-bl-none shadow"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="พิมพ์ข้อความ..."
                  className="flex-1 px-4 py-3 border border-green-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
                >
                  ส่ง
                </button>
              </div>
            </div>
          )}
        </div>
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
