import React, { useState } from 'react';
import { 
  Sparkles, 
  Coins, 
  Image as ImageIcon, 
  MessageSquare, 
  Cloud, 
  Check, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  X, 
  ShieldCheck, 
  Info,
  DollarSign
} from 'lucide-react';

interface CostStructureProps {
  isPremium: boolean;
  setIsPremium: (status: boolean) => void;
}

export default function CostStructure({ isPremium, setIsPremium }: CostStructureProps) {
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [credits, setCredits] = useState<number>(() => {
    return parseInt(localStorage.getItem('EZGEN_CREDITS') || '0', 10);
  });

  // Billing form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const plans = {
    sub1: {
      id: 'sub1',
      name: 'Subscription - 199 บาท / เดือน',
      price: '199',
      type: 'sub',
      desc: 'ใช้งานได้ 30 โพสต์ (เฉลี่ยโพสต์ละ 6 บาท)'
    },
    sub2: {
      id: 'sub2',
      name: 'Subscription - 399 บาท / เดือน',
      price: '399',
      type: 'sub',
      desc: 'ใช้งานได้ไม่จำกัด (Unlimited)'
    },
    pay1: {
      id: 'pay1',
      name: 'Pay-per-use - 50 บาท',
      price: '50',
      type: 'pay',
      desc: 'ได้รับ 25 เครดิต (เฉลี่ยโพสต์ละ 2 บาท)'
    }
  };

  const handleOpenCheckout = (plan: any) => {
    setSelectedPlan(plan);
    setIsSuccess(false);
    setIsProcessing(false);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (selectedPlan.type === 'sub') {
        setIsPremium(true);
      } else {
        const newCredits = credits + 25;
        setCredits(newCredits);
        localStorage.setItem('EZGEN_CREDITS', String(newCredits));
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans text-gray-800" id="cost-structure-view">
      
      {/* Title Header matches the exact layout & structure from the image */}
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>## 💰 โครงสร้างต้นทุนและการตั้งราคา (Financial & Cost Structure)</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
          เนื่องจากระบบ Ezgen เพิ่งเริ่มต้นและเลือกใช้ API ของ Gemini และ ChatGPT (OpenAI) เป็นหลัก เราจึงสามารถควบคุมต้นทุนให้ผันแปรตามการใช้งานจริง (Pay-per-use) ได้ ซึ่งประมาณการต้นทุนและการตั้งราคาระหว่าง ๆ มีดังนี้:
        </p>
      </div>

      {/* Main Column Grid (2 Columns Layout matches image) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: 1. ต้นทุนการทำระบบ (Cost Estimation) - Span 6 */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-3xl border border-gray-150/70 shadow-xs flex flex-col justify-between space-y-6">
          
          <div className="space-y-5">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
              ### 1. ต้นทุนการทำระบบ (Cost Estimation)
            </h2>

            {/* List of 3 cost items with beautiful rounded icons */}
            <div className="space-y-4">
              
              {/* Item 1: DALL-E 3 Image generation cost */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-3 flex items-center justify-center shrink-0 shadow-sm">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs sm:text-sm leading-relaxed text-gray-700">
                  <p className="font-semibold text-slate-900">
                    <span className="text-indigo-600 font-extrabold">• ต้นทุน AI เจนภาพ (ChatGPT / DALL-E 3 API):</span> ประมาณ 1.40 บาท ($0.040) ต่อภาพพรีเมียม 1 ภาพ
                  </p>
                </div>
              </div>

              {/* Item 2: Gemini 1.5 Flash copywriting cost */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-400 via-blue-500 to-teal-400 p-3 flex items-center justify-center shrink-0 shadow-sm">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs sm:text-sm leading-relaxed text-gray-700">
                  <p className="font-semibold text-slate-900">
                    <span className="text-indigo-600 font-extrabold">• ต้นทุน AI คิดแคปชั่น (Gemini 1.5 Flash API):</span> เฉลี่ยไม่ถึง 0.01 บาทต่อแคปชั่นและสโลแกน (ประหยัดและประมวลผลเร็วมาก)
                  </p>
                </div>
              </div>

              {/* Item 3: Cloud & Hosting cost */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-400 via-pink-400 to-purple-500 p-3 flex items-center justify-center shrink-0 shadow-sm">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs sm:text-sm leading-relaxed text-gray-700">
                  <p className="font-semibold text-slate-900">
                    <span className="text-indigo-600 font-extrabold">• ต้นทุนระบบ Cloud & Hosting (เช่น Vercel, Supabase):</span> ในช่วงเริ่มต้นสามารถใช้แพ็กเกจฟรี (Free Tier) ได้ หากขยายตัวจะมีค่าใช้จ่ายตามขยายตัวจะมีค่าใช้จ่ายเริ่มต้นประมาณ 700 บาท ($20) ต่อเดือน
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Summary stat card (Variable Cost: 1.50) */}
          <div className="bg-[#EEF2F6] border border-gray-200/60 rounded-2xl p-5 flex items-center gap-5 mt-4">
            <div className="text-left shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">1.50</span>
              <span className="text-xs font-bold text-gray-500 block">บาท</span>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed font-semibold border-l border-gray-300 pl-4">
              <span className="text-slate-900 font-extrabold">• รวมต้นทุนผันแปร (Variable Cost):</span> เฉลี่ยประมาณ 1.50 บาท ต่อการกดใช้งาน 1 ครั้ง (โพสต์พร้อมขาย 1 โพสต์)
            </div>
          </div>

        </div>

        {/* Right Column: 2. การตั้งราคาขาย/ให้บริการ (Pricing Strategy) - Span 6 */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-3xl border border-gray-150/70 shadow-xs space-y-6">
          
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
            ### 2. การตั้งราคาขาย/ให้บริการ (Pricing Strategy)
          </h2>

          {/* Type 1: Subscription Model */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="text-indigo-600 text-lg">•</span>
              <span>แบบที่ 1: Subscription Model (รายเดือนสุดคุ้ม)</span>
            </h3>

            {/* Two Side-by-side Subscription Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option A: 199 Baht */}
              <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/25 flex flex-col justify-between h-48 hover:shadow-md transition-all">
                <div className="space-y-2">
                  <div className="bg-indigo-100 text-indigo-800 font-black text-center py-2.5 rounded-xl text-xs sm:text-sm tracking-wide">
                    199 บาท / เดือน
                  </div>
                  <ul className="text-[11px] text-gray-600 space-y-1.5 font-medium leading-normal pl-1 list-disc list-inside">
                    <li>ใช้งานได้ 30 โพสต์ (เฉลี่ยโพสต์ละ 6 บาท)</li>
                    <li>เหมาะสำหรับร้านค้าขนาดเล็กที่เน้นโพสต์</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleOpenCheckout(plans.sub1)}
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 via-[#5c3df5] to-indigo-700 text-white font-bold rounded-xl text-[10px] sm:text-xs transition-all shadow-sm hover:brightness-105"
                >
                  สมัครสมาชิก
                </button>
              </div>

              {/* Option B: 399 Baht */}
              <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/25 flex flex-col justify-between h-48 hover:shadow-md transition-all">
                <div className="space-y-2">
                  <div className="bg-indigo-100 text-indigo-800 font-black text-center py-2.5 rounded-xl text-xs sm:text-sm tracking-wide">
                    399 บาท / เดือน
                  </div>
                  <ul className="text-[11px] text-gray-600 space-y-1.5 font-medium leading-normal pl-1 list-disc list-inside">
                    <li>ใช้งานได้ไม่จำกัด (Unlimited)</li>
                    <li>เหมาะสำหรับร้านค้าที่โพสต์บ่อย</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleOpenCheckout(plans.sub2)}
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 via-[#5c3df5] to-indigo-700 text-white font-bold rounded-xl text-[10px] sm:text-xs transition-all shadow-sm hover:brightness-105"
                >
                  สมัครสมาชิก
                </button>
              </div>

            </div>
          </div>

          {/* Type 2: Pay-per-use Model */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="text-indigo-600 text-lg">•</span>
              <span>แบบที่ 2: Pay-per-use (เติมเงินตามการใช้งานจริง)</span>
            </h3>

            {/* Pay-per-use Card */}
            <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-left w-full sm:w-2/3">
                <div className="bg-indigo-100 text-indigo-800 font-black px-4 py-2 rounded-xl text-xs sm:text-sm tracking-wide inline-block">
                  50 บาท
                </div>
                <ul className="text-[11px] text-gray-600 space-y-1 font-medium leading-normal pl-1 list-disc list-inside">
                  <li>ได้รับ 25 เครดิต (เฉลี่ยโพสต์ละ 2 บาท)</li>
                  <li>ไม่มีวันหมดอายุ</li>
                  <li>เหมาะสำหรับผู้ทดลองใช้และร้านค้าขนาดเล็ก</li>
                </ul>
              </div>
              <button
                onClick={() => handleOpenCheckout(plans.pay1)}
                className="w-full sm:w-1/3 py-3 bg-gradient-to-r from-indigo-600 via-[#5c3df5] to-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm hover:brightness-105 h-fit self-center"
              >
                เติมเงิน
              </button>
            </div>
          </div>

          {/* Display current status inside the card for high engagement */}
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-xs">
            <div className="text-gray-400 font-bold">บัญชีของคุณปัจจุบัน:</div>
            <div className="flex items-center gap-2">
              {isPremium ? (
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-black text-[10px]">👑 PRO UNLIMITED ACTIVATED</span>
              ) : (
                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold text-[10px]">SME FREE MEMBER (ใช้ฟรี 5 ครั้ง/วัน)</span>
              )}
              {credits > 0 && (
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-black text-[10px]">🪙 {credits} เครดิต</span>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Modal Payment Dialog (Same UI context as interactive pricing module) */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-gray-100 shadow-2xl space-y-0 relative animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="bg-slate-950 p-5 text-white flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-widest flex items-center">
                  ✦ ปลดล็อกฟีเจอร์ระดับโกลด์
                </span>
                <h3 className="text-base font-bold">ยืนยันยอดชำระและสแกน / กรอกบัตร</h3>
              </div>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success display */}
            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                  🎉
                </div>
                <h4 className="text-base font-bold text-slate-950">ทำรายการสำเร็จเรียบร้อยค่ะ!</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  {selectedPlan.type === 'sub' 
                    ? `ระบบอัปเกรดบัญชีของคุณเป็นแบบไม่จำกัดเรียบร้อยแล้ว!` 
                    : `ระบบได้เพิ่มเครดิตจำนวน 25 เครดิต เข้าสู่แค็ตตาล็อกโปรไฟล์คุณเรียบร้อยแล้ว!`
                  }
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                      setIsSuccess(false);
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-105 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    เริ่มลุยทำโฆษณาต่อเลย
                  </button>
                </div>
              </div>
            ) : (
              /* Payment choice */
              <form onSubmit={handleSimulatePayment} className="p-5 sm:p-6 space-y-5 text-xs">
                
                {/* Total box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-500 block">รายการ: {selectedPlan.name}</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">{selectedPlan.desc}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-950 font-mono">฿{selectedPlan.price}</span>
                    <span className="text-[9px] text-gray-400 font-bold block">ยอดสุทธิ (ไม่มีบวกเพิ่ม)</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">เลือกวิธีการชำระเงิน</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qr')}
                      className={`py-3 px-3 rounded-xl border font-bold flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'qr'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-600'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-indigo-600" />
                      <span>สแกน Thai QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 px-3 rounded-xl border font-bold flex items-center justify-center space-x-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-600'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      <span>บัตรเครดิต</span>
                    </button>
                  </div>
                </div>

                {/* Body Content QR vs Card */}
                {paymentMethod === 'qr' ? (
                  <div className="p-4 bg-slate-50 border border-gray-150 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-xs">
                      <div className="w-36 h-36 bg-slate-50 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg relative overflow-hidden">
                        <span className="text-slate-300 text-[10px] font-bold mb-1 block">PROMPTPAY QR</span>
                        <div className="grid grid-cols-5 gap-0.5 p-2 bg-indigo-900 w-24 h-24 rounded-sm">
                          {[...Array(25)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`rounded-xs ${
                                (i * 3 + 11) % 2 === 0 ? 'bg-white' : 'bg-slate-950'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1.5 py-0.5 rounded-xs border border-indigo-200 text-[7px] font-black text-indigo-800 tracking-wider uppercase">
                          Thai QR
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">สแกนชำระผ่านพร้อมเพย์ได้ทันที</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">ระบบจะอนุมัติเครดิตและสถานะเข้าบัญชีคุณทันที</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 p-4 bg-slate-50 border border-gray-150 rounded-2xl">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">เลขบัตรเครดิต</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4234 5678 1234 5678"
                        className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">EXP DATE</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">ชื่อบนบัตร</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="SOMCHAI MANEE"
                        className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Simulate Trigger Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <span className="flex items-center space-x-1.5">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>กำลังเชื่อมต่อธนาคารและประมวลผล...</span>
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>ยืนยันการชำระเงินเรียบร้อย</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
