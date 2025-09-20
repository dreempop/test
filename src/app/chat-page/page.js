'use client';
import { useState, useRef, useEffect } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const chatHistory = [
    { id: 1, title: "สอบถามภาษีรายได้บุคคลธรรมดา", message: "สอนเรื่องภาษีบุคคลธรรมดา" },
    { id: 2, title: "คำนวณภาษีเงินได้", message: "ช่วยคำนวณภาษีเงินได้ให้หน่อย" },
    { id: 3, title: "วิธีใช้ลดหย่อนภาษี", message: "บอกวิธีลดหย่อนภาษี" },
  ];

  // Scroll chat ลงล่างอัตโนมัติ
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSend = async (msg = null) => {
    const userMessage = msg ?? input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput(msg ? msg : "");
    inputRef.current?.focus();

    setIsBotTyping(true);

    setTimeout(() => {
      const botReply = `ตอบ: ${userMessage}`;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsBotTyping(false);
    }, 1200);
  };

  const handleHistoryClick = (historyMsg) => {
    setInput(historyMsg);
    handleSend(historyMsg);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
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
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row container mx-auto mt-6 px-4 gap-4 max-w-7xl">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden mb-2">
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
          } md:block w-full md:w-64 bg-green-100 rounded-xl shadow-lg p-4 flex flex-col`}
        >
          <button
            onClick={handleNewChat}
            className="mb-4 px-3 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            ➕ เริ่มแชทใหม่
          </button>

          <h2 className="font-bold mb-2">แชทเก่า</h2>
          <div className="flex flex-col space-y-2 overflow-y-auto flex-1">
            {chatHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => handleHistoryClick(item.message)}
                className="text-left py-2 px-3 rounded hover:bg-green-600 hover:text-white transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
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

            {/* Bot typing indicator */}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg max-w-xs bg-green-100 text-green-800 rounded-bl-none shadow flex space-x-1 items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-0"></span>
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-400"></span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-green-50 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 rounded-b-xl">
            <input
              type="text"
              placeholder="พิมพ์ข้อความ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              className="flex-1 px-4 py-3 border border-green-600 rounded-full bg-white text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 w-full"
            />
            <button
              onClick={() => handleSend()}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow"
            >
              ส่ง
            </button>
          </div>
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
