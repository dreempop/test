"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ArticlesPage() {

  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const articles = [
    {
      title: "ความรู้พื้นฐานเกี่ยวกับภาษีเงินได้บุคคลธรรมดา",
      excerpt:
        "ภาษีเงินได้บุคคลธรรมดา คือภาษีที่ผู้มีรายได้ต้องชำระตามกฎหมาย โดยคิดจากรายได้สุทธิหลังหักค่าใช้จ่ายและค่าลดหย่อน...",
      link: "#",
    },
    {
      title: "สิทธิประโยชน์จากค่าลดหย่อนภาษี",
      excerpt:
        "ค่าลดหย่อนช่วยลดฐานภาษี เช่น ค่าลดหย่อนส่วนตัว 60,000 บาท เบี้ยประกันชีวิต บิดามารดา และเงินบริจาค...",
      link: "#",
    },
    {
      title: "กำหนดการยื่นภาษีประจำปี",
      excerpt:
        "ผู้มีรายได้ต้องยื่นแบบแสดงรายการภาษี (ภ.ง.ด.90/91) ตั้งแต่เดือนมกราคมถึงมีนาคมของปีถัดไป...",
      link: "#",
    },
    {
      title: "วิธีคำนวณภาษีขั้นบันได",
      excerpt:
        "อัตราภาษีบุคคลธรรมดาจะถูกคำนวณตามขั้นบันได เช่น รายได้สุทธิ 0-150,000 บาท ได้รับการยกเว้น 150,001-300,000 บาท เสียภาษี 5% เป็นต้น...",
      link: "#",
    },
  ];

  return (
    <div
      className="relative text-green-900 flex flex-col min-h-screen"
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
            <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">FAQ</button>
            <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">ติดต่อเรา</button>
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
      <main className="flex-1 container mx-auto max-w-5xl mt-6 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">บทความความรู้เรื่องภาษี</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-lg font-bold text-green-700">{article.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{article.excerpt}</p>
              <button className="mt-4 text-green-600 font-medium hover:underline">
                อ่านต่อ →
              </button>
            </div>
          ))}
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
