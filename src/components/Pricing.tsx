import React, { useState } from 'react';
import { CreditCard, Check, Sparkles, HelpCircle, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const plans = [
    {
      name: 'SME Free',
      desc: 'เหมาะสำหรับร้านค้าที่เริ่มต้นทำเพจทดลองใช้เบื้องต้น',
      priceMonthly: 0,
      priceAnnual: 0,
      btnText: 'เริ่มต้นใช้งานฟรี',
      isPopular: false,
      color: 'border-gray-200',
      badgeColor: 'bg-slate-100 text-slate-800',
      features: [
        'ใช้คลังเทมเพลตทั่วไปฟรีมากกว่า 15+ แบบ',
        'จำกัดการดาวน์โหลดรูปภาพ 5 ครั้ง/เดือน',
        'เครื่องมือลากวางแก้ไขสโลแคนขั้นพื้นฐาน',
        'ระบบคิดสโลแกนด้วย AI ของร้านคุณเอง'
      ]
    },
    {
      name: 'SME Pro',
      desc: 'เหมาะสำหรับแบรนด์ที่กำลังปั้นยอดขาย ยิงแอดจริงจัง',
      priceMonthly: 390,
      priceAnnual: 290,
      btnText: 'ปลดล็อกเครื่องมือ PRO',
      isPopular: true,
      color: 'border-indigo-500 ring-4 ring-indigo-50 shadow-xl',
      badgeColor: 'bg-indigo-650 bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      features: [
        'ปลดล็อกคลังเทมเพลตพรีเมียม (Premium) ทุกชิ้นงาน',
        'ดาวน์โหลดไฟล์ภาพคุณภาพสูง HD ไม่จำกัดครั้ง',
        'เรียกใช้งาน AI ลบพื้นหลังรูปภาพสินค้าได้ไม่จำกัด',
        'คิดสโลแกนคำแปลกใหม่ผ่าน Gemini AI สูงลับเฉพาะ',
        'ระดมสมองคำนวณและเก็บคิวแคนเปญ Analytics พอดคาสต์',
        'มีบริการสอนเทรนเทคนิคการทำการตลาดเพิ่มโดยตรง'
      ]
    },
    {
      name: 'SME Enterprise',
      desc: 'สำหรับบริษัทแบรนด์ใหญ่ที่ต้องการการซัปพอร์ตส่วนตัว',
      priceMonthly: 1590,
      priceAnnual: 1290,
      btnText: 'ติดต่อทีมงานดูแลพิเศษ',
      isPopular: false,
      color: 'border-slate-800 shadow-md',
      badgeColor: 'bg-slate-900 text-white',
      features: [
        'ทีมงานนักเขียน และดีไซเนอร์ร่วมวางแผนสโลแกนแบบ Custom',
        'ปลดเครื่องสแกนบุกเบิกรูปสินค้าตัดฉับไวแบบ 4K',
        'สรุปแคมเปญ ROI เชิงลึกแชร์บอร์ดกับผู้ร่วมร่วมงานได้',
        'สิทธิประโยชน์ API เชื่อมต่อส่งต่อข้อมูลแคมเปญรวดเร็ว',
        'ความเร็วแรงแบรนดิ้งส่วนตัวเต็มขีดความสามารถพร้อมเซิร์ฟเวอร์แยก'
      ]
    }
  ];

  const faqs = [
    {
      q: 'สามารถยกเลิกแพ็กเกจได้ตอนไหน มีสัญญาผูกมัดหรือไม่?',
      a: 'ลูกค้าสามารถกดยกเลิกแพ็กเกจทางบัญชีส่วนตัวได้ตลอดเวลาทันที โดยไม่มีสัญญาผูกมัดใดๆ ทั้งสิ้น และหากสมัครแบบรายปีคุณก็จะได้รับสิทธิ์ส่วนลดคุ้มค่าสูงสุดประหยัดงบประมูลร้านค้าขึ้นไปอีก 25% สดๆ ร้อนๆ'
    },
    {
      q: 'สามารถออกใบกำกับภาษีฉบับเต็มเพื่อนำไปลดหย่อนได้ไหม?',
      a: 'แน่นอนครับ! แพลตฟอร์ม Ezgen ดำเนินงานโดยบริษัทจดทะเบียนประเทศไทยที่ถูกต้องตามกฎหมาย และสามารถออกใบกำกับภาษีบริการอิเล็กทรอนิกส์ (e-Tax Invoice) ส่งตรงถึงอีเมลของคุณได้โดยตรงหลังชำระเงินเรียบร้อย'
    },
    {
      q: 'รูปภาพที่ดาวน์โหลดไป ลิขสิทธิ์เป็นของใคร?',
      a: 'ชิ้นงานออกแบบรวมถึงสโลแกนประกอบทั้งหมดที่คุณบันทึกและปรับโครงร่างจากสตูดิโอนั้น ถือลิขสิทธิ์เป็นของคุณโดยสมบูรณ์เต็ม 100% สามารถนำไปใช้ในเชิงพาณิชย์ ยิงแอด Facebook, TikTok, หน้าร้าน ได้ทุกมิติอย่างอิสระไร้กังวล'
    },
    {
      q: 'มีวิธีชำระเงินช่องทางใดบ้าง?',
      a: 'ระบบชำระเงินของเรารองรับ บัตรเครดิต/เดบิต, บริการสแกนจ่ายผ่าน Thai QR Code โอนเงินตรงธนาคารทุกสี และ TrueMoney Wallet รวดเร็ว ปลอดภัยตามเกณฑ์การดูแลเงินของธนาคารพัฒนาประเทศไทยครับ'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans" id="pricing-module-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Introductions */}
        <div className="text-center space-y-4 max-w-2xl mx-auto" id="pricing-headline">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-10 rounded-full py-1.5 flex items-center w-fit mx-auto">
            👑 สมัครวันนี้พร้อมแถมคอร์สสอนยิงแอด SME ฟรี!
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            แพ็กเกจอัตราค่าบริการ คอนเฟิร์มเติบโต
          </h1>
          <p className="text-sm text-gray-400">
            ไม่มีค่าใช้จ่ายแอบแฝง เลือกแรนจ์เพื่อปลดล็อกฟีเจอร์ AI ช่วยเขียนสโลแกนและลบรูปภาพสินค้าไม่จำกัดครั้ง
          </p>

          {/* Toggle Switch Annual / Monthly */}
          <div className="flex items-center justify-center space-x-3 pt-3">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-indigo-600' : 'text-gray-400'}`}>จ่ายรายเดือน</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 bg-indigo-600 rounded-full relative p-0.5 focus:outline-none transition-colors"
              title="สลับโหมด"
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-all ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-bold flex items-center ${isAnnual ? 'text-indigo-600' : 'text-gray-400'}`}>
              จ่ายรายปี (ลด 25%) 
              <span className="ml-1.5 text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-md animate-pulse">Save!</span>
            </span>
          </div>
        </div>

        {/* Pricing Grid cards style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="pricing-tier-grid">
          {plans.map((p, idx) => {
            const price = isAnnual ? p.priceAnnual : p.priceMonthly;
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between hover:translate-y-1 hover:shadow-2xl transition-all duration-300 relative ${p.color}`}
              >
                
                {/* Popular Badge float */}
                {p.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 text-[10px] font-extrabold tracking-widest bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full shadow-md border border-indigo-200">
                    🔥 ยอดนิยม แนะนำสำหรับ SME ไทย
                  </span>
                )}

                {/* Header elements tier info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900">{p.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-1">{p.desc}</p>
                    </div>
                  </div>

                  {/* Pricing dynamic digits */}
                  <div className="py-4 border-b border-gray-100 flex items-baseline">
                    <span className="text-4xl font-extrabold font-mono text-gray-950">฿{price}</span>
                    <span className="text-gray-400 text-xs ml-1.5">/ เดือน {isAnnual ? '(ชำระรายปี)' : ''}</span>
                  </div>

                  {/* Features listing check */}
                  <ul className="space-y-3 pt-2">
                    {p.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start text-xs text-gray-600 leading-normal">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 mr-2" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button subscription */}
                <div className="pt-8">
                  <button
                    onClick={() => alert(`จำลองการสมัครบริการแพ็กเกจ ${p.name} เรียบร้อย! ขอให้สนุกกับทำโฆษณาด้วยพลัง AI`)}
                    className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow flex items-center justify-center space-x-1.5 ${
                      p.isPopular 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{p.btnText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Security / Proof badges */}
        <div className="bg-white border border-gray-150 rounded-3xl p-6 flex flex-wrap justify-center items-center gap-6 sm:gap-12" id="security-assurance-badges">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span>ความปลอดภัยการจ่ายเงินเกรด PCI-DSS 3D Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
            <span className="text-xl">⚡</span>
            <span>เปิดระดมสมองและเข้าคิวแคนเปญทันใจใน 3 วินาที</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
            <span className="text-xl">💳</span>
            <span>ยินดีต้อนรับบัตรเครดิต, พร้อมเพย์โอนเงินธนาคารสะดวก</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 space-y-6 max-w-4xl mx-auto" id="pricing-faqs-accordion">
          
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 mr-1.5 text-blue-600" />
              คำถามที่พบบ่อย (FAQs)
            </h2>
            <p className="text-xs text-gray-400">ไขข้อข้องใจเพิ่มเติมเรื่องการสมัครแพ็คเกจและฟีเจอร์การแต่งลายน้ำ</p>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="flex justify-between items-center w-full text-left font-semibold text-xs sm:text-sm text-gray-800 hover:text-blue-600 transition-all focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <p className="mt-2 text-xs leading-relaxed text-gray-500 bg-slate-50 p-4 rounded-xl border border-gray-100 border-dashed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
