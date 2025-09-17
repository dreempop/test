"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CalculatePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState({
    personal: 60000, // ค่าลดหย่อนส่วนตัว
    insurance: 0,
    parents: 0,
    donations: 0,
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const totalDeductions =
    deductions.personal +
    deductions.insurance +
    deductions.parents +
    deductions.donations;

  const taxableIncome = Math.max(Number(income) - totalDeductions, 0);

  // ตารางอัตราภาษีแบบขั้นบันได
  const taxBrackets = [
    { limit: 150000, rate: 0 },
    { limit: 300000, rate: 0.05 },
    { limit: 500000, rate: 0.1 },
    { limit: 750000, rate: 0.15 },
    { limit: 1000000, rate: 0.2 },
    { limit: 2000000, rate: 0.25 },
    { limit: 5000000, rate: 0.3 },
    { limit: Infinity, rate: 0.35 },
  ];

  // ฟังก์ชันคำนวณภาษีแบบขั้นบันได
const calculateTaxSteps = (income) => {
  let remaining = income;
  let lastLimit = 0;
  const breakdown = [];
  let totalTax = 0;


    for (const bracket of taxBrackets) {
      if (remaining <= 0) break;

      const taxableAmount = Math.min(bracket.limit - lastLimit, remaining);
      const tax = taxableAmount * bracket.rate;

      breakdown.push({
        range:
          bracket.limit === Infinity
            ? `เกิน ${lastLimit.toLocaleString()}`
            : `${lastLimit.toLocaleString()} - ${bracket.limit.toLocaleString()}`,
        rate: bracket.rate * 100,
        amount: tax,
      });

      totalTax += tax;
      remaining -= taxableAmount;
      lastLimit = bracket.limit;
    }

    return { breakdown, totalTax };
  };

  const { breakdown, totalTax } = calculateTaxSteps(taxableIncome);

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
            <button onClick={() => router.push("/chat-page")} className="hover:text-green-c">คำนวณภาษี</button>
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
      <main className="flex-1 container mx-auto max-w-2xl mt-6 p-6 bg-white rounded-xl shadow-lg">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              ขั้นตอนที่ 1: กรอกรายได้
            </h2>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="กรอกรายได้รวม (บาท)"
            />
            <div className="flex justify-between">
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              ขั้นตอนที่ 2: ค่าลดหย่อนเบื้องต้น
            </h2>
            <p className="mb-2">
              ค่าลดหย่อนส่วนตัว: 60,000 บาท (ระบบใส่อัตโนมัติ)
            </p>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
              >
                ← ย้อนกลับ
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              ขั้นตอนที่ 3: ค่าลดหย่อนประกันชีวิต
            </h2>
            <input
              type="number"
              value={deductions.insurance}
              onChange={(e) =>
                setDeductions({
                  ...deductions,
                  insurance: Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="จำนวนเบี้ยประกันชีวิต (สูงสุด 100,000)"
            />
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
              >
                ← ย้อนกลับ
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              ขั้นตอนที่ 4: ค่าลดหย่อนบิดามารดา
            </h2>
            <input
              type="number"
              value={deductions.parents}
              onChange={(e) =>
                setDeductions({ ...deductions, parents: Number(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="จำนวนลดหย่อนบิดามารดา"
            />
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
              >
                ← ย้อนกลับ
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              ขั้นตอนที่ 5: ค่าลดหย่อนเงินบริจาค
            </h2>
            <input
              type="number"
              value={deductions.donations}
              onChange={(e) =>
                setDeductions({
                  ...deductions,
                  donations: Number(e.target.value),
                })
              }
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="จำนวนเงินบริจาค"
            />
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
              >
                ← ย้อนกลับ
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                คำนวณ →
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">ผลการคำนวณ</h2>
            <p>รายได้รวม: {Number(income).toLocaleString()} บาท</p>
            <p>รวมค่าลดหย่อน: {totalDeductions.toLocaleString()} บาท</p>
            <p className="font-bold text-green-700 mt-2">
              รายได้สุทธิที่ต้องเสียภาษี: {taxableIncome.toLocaleString()} บาท
            </p>

            {/* ตารางคำนวณภาษี */}
            <table className="w-full mt-6 border border-gray-300 text-sm">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="p-2 border">ช่วงรายได้</th>
                  <th className="p-2 border">อัตราภาษี</th>
                  <th className="p-2 border">ภาษี (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{row.range}</td>
                    <td className="p-2 border">{row.rate}%</td>
                    <td className="p-2 border">{row.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-green-200 font-bold">
                  <td className="p-2 border text-center" colSpan={2}>
                    รวมภาษีที่ต้องชำระ
                  </td>
                  <td className="p-2 border">
                    {totalTax.toLocaleString()} บาท
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
              >
                เริ่มใหม่
              </button>
            </div>
          </div>
        )}
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
