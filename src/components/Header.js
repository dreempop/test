'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // โหลด session ปัจจุบัน
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        toast.success("เข้าสู่ระบบสำเร็จ!");
      }
    };

    fetchSession();

    // ฟังการเปลี่ยน session
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === "SIGNED_IN") {
        toast.success("เข้าสู่ระบบสำเร็จ!");
      } else if (_event === "SIGNED_OUT") {
        toast.success("ออกจากระบบสำเร็จ!");
      }
    });

    return () => subscription.unsubscribe();
  }, []); // <-- ใส่ [] เพื่อให้ run ครั้งเดียวตอน mount

const handleLogout = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error("คุณยังไม่ได้เข้าสู่ระบบ");
    setSession(null);
    router.push("/");
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error.message);
    toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
  } else {
    setSession(null);
    toast.success("ออกจากระบบสำเร็จ!");
    router.push("/");
  }
};


  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000, style: { fontSize: "14px" } }}
      />

      <header className="bg-white shadow-md rounded-b-lg p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold flex items-center text-green-600">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 text-gray-900 font-medium">
            <button onClick={() => router.push("/")} className="hover:text-green-600">หน้าแรก</button>
            <button onClick={() => router.push("/chat-page")} className="hover:text-green-600">แชทบอท</button>
            <button onClick={() => router.push("/articles")} className="hover:text-green-600">บทความรู้</button>
            <button onClick={() => router.push("/calculator")} className="hover:text-green-600">คำนวณภาษี</button>
            <button onClick={() => router.push("/contact")} className="hover:text-green-600">ติดต่อเรา</button>
          </nav>

          {/* Auth buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!session ? (
              <>
                <button
                  onClick={() => router.push("/login-page")}
                  className="px-4 py-2 text-green-700 border border-green-600 rounded-full hover:bg-green-100"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/register-page")}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/profile")}
                  className="px-4 py-2 text-green-700 border border-green-600 rounded-full hover:bg-green-100"
                >
                  โปรไฟล์
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-green-700 border border-green-600 rounded-full hover:bg-green-100"
                >
                  ออกจากระบบ
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-2xl">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-gray-900 font-medium px-4">
              <button onClick={() => router.push("/")}>หน้าแรก</button>
              <button onClick={() => router.push("/chat-page")}>แชทบอท</button>
              <button onClick={() => router.push("/articles")}>บทความรู้</button>
              <button onClick={() => router.push("/calculator")}>คำนวณภาษี</button>
              <button onClick={() => router.push("/contact")}>ติดต่อเรา</button>
            </nav>
            <div className="px-4 pt-4 border-t">
              {!session ? (
                <>
                  <button
                    onClick={() => router.push("/login-page")}
                    className="block w-full text-left px-4 py-2 border border-green-600 text-green-700 rounded-full mb-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push("/register-page")}
                    className="block w-full text-left px-4 py-2 border border-green-600 text-green-700 rounded-full mb-2"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/profile")}
                    className="block w-full text-left px-4 py-2 border border-green-600 text-green-700 rounded-full mb-2"
                  >
                    โปรไฟล์
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 border border-green-600 text-green-700 rounded-full mb-2"
                  >
                    ออกจากระบบ
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
