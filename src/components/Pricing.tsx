import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  X, 
  QrCode, 
  Receipt, 
  Award, 
  TrendingUp, 
  Percent, 
  Building, 
  Mail, 
  FileText, 
  Smile, 
  CheckCircle2, 
  Sparkle
} from 'lucide-react';

interface PricingProps {
  isPremium: boolean;
  setIsPremium: (status: boolean) => void;
}

export default function Pricing({ isPremium, setIsPremium }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  
  // Checkout states
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [needTaxInvoice, setNeedTaxInvoice] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [email, setEmail] = useState('');

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
        'จำกัดการดาวน์โหลดรูปภาพ 5 ครั้ง/วัน',
        'เครื่องมือแก้ไขสโลแกนขั้นพื้นฐาน',
        'ระบบคิดสโลแกนและแคปชันด้วย AI ของร้านคุณเอง'
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
      badgeColor: 'bg-indigo-600 bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      features: [
        'ปลดล็อกคลังเทมเพลตพรีเมียม (Premium) ทุกชิ้นงาน',
        'ดาวน์โหลดไฟล์ภาพคุณภาพสูง HD ไม่จำกัดครั้ง',
        'เรียกใช้งาน AI ออกแบบสไลด์โชว์ และสติกเกอร์ขายดี',
        'คิดสโลแกนคำแปลกใหม่ผ่าน Gemini AI ตัวเต็มประสิทธิภาพสูง',
        'เข้าถึงเครื่องมือลบพื้นหลัง (Background Remover) อัจฉริยะ',
        'แถมฟรี! สิทธิ์เข้าเรียน Ezgen Academy คอร์สยิงแอดพรีเมียม'
      ]
    },
    {
      name: 'SME Enterprise',
      desc: 'สำหรับบริษัทแบรนด์ใหญ่ที่ต้องการการซัปพอร์ตส่วนตัว',
      priceMonthly: 1590,
      priceAnnual: 1290,
      btnText: 'ติดต่อทีมงานดูแลพิเศษ',
      isPopular: false,
      color: 'border-slate-850 shadow-md',
      badgeColor: 'bg-slate-900 text-white',
      features: [
        'ทีมงานครีเอทีฟวางแผนแคมเปญสโลแกนแบบ Custom',
        'สิทธิ์การลบภาพถ่ายและยกระดับภาพโฆษณาแบบ 4K Ultra HD',
        'ระบบเก็บบันทึกสถิติ CTR และ ROI ของเพจแชร์บอร์ดกับผู้ร่วมงานได้',
        'ความเร็วเซิร์ฟเวอร์ระบบ AI จัดส่งสเปกสูงพิเศษ',
        'สนับสนุนการออกใบกำกับภาษีและการเชื่อมต่อ API รายบุคคล'
      ]
    }
  ];

  const faqs = [
    {
      q: 'สามารถยกเลิกแพ็กเกจได้ตอนไหน มีสัญญาผูกมัดหรือไม่?',
      a: 'ลูกค้าสามารถกดยกเลิกแพ็กเกจได้ตลอดเวลาทันทีผ่านระบบหน้าจอนี้ โดยไม่มีสัญญาผูกมัดใดๆ ทั้งสิ้น และหากเลือกแบบรายปี จะได้รับสิทธิ์ส่วนลดประหยัดเพิ่มขึ้นถึง 25% สดๆ ร้อนๆ'
    },
    {
      q: 'สามารถออกใบกำกับภาษีฉบับเต็มเพื่อนำไปลดหย่อนได้ไหม?',
      a: 'แน่นอนครับ! แพลตฟอร์ม Ezgen ดำเนินงานโดยบริษัทจดทะเบียนประเทศไทยที่ถูกต้องตามกฎหมาย และสามารถออกใบกำกับภาษีบริการอิเล็กทรอนิกส์ (e-Tax Invoice) ส่งตรงถึงอีเมลของคุณได้ทันทีหลังจากชำระเงินเรียบร้อย'
    },
    {
      q: 'รูปภาพที่ดาวน์โหลดไป ลิขสิทธิ์เป็นของใคร?',
      a: 'ชิ้นงานออกแบบรวมถึงสโลแกนประกอบทั้งหมดที่คุณบันทึกและปรับโครงร่างจากสตูดิโอนั้น ถือเป็นสิทธิ์ขาดของคุณโดยสมบูรณ์เต็ม 100% สามารถนำไปใช้ในเชิงพาณิชย์ ยิงแอด Facebook, TikTok, หน้าร้าน ได้ทุกมิติอย่างอิสระไร้กังวล'
    },
    {
      q: 'มีวิธีชำระเงินช่องทางใดบ้าง?',
      a: 'ระบบชำระเงินของเรารองรับการจ่ายเงินสะดวกรวดเร็ว ผ่าน Thai QR PromptPay สแกนจ่ายด้วยแอปพลิเคชันธนาคารทุกแห่ง หรือบัตรเครดิต/เดบิตหลัก (Visa, Mastercard, JCB)'
    }
  ];

  const handleOpenCheckout = (plan: any) => {
    if (plan.priceMonthly === 0) {
      alert('คุณกำลังใช้งานแพ็กเกจเริ่มต้นฟรีอยู่แล้ว สรรค์สร้างสื่อด้วย AI ได้ทันทีครับ!');
      return;
    }
    setSelectedPlan(plan);
    setIsSuccess(false);
    setIsProcessing(false);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate standard credit card or QR API response delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setIsPremium(true);
    }, 1500);
  };

  const handleCancelSubscription = () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการสมัครแพ็กเกจพรีเมียม? บัญชีของคุณจะกลับสู่เวอร์ชันใช้งานฟรีทันที')) {
      setIsPremium(false);
      setSelectedPlan(null);
      setIsSuccess(false);
      alert('ยกเลิกแพ็กเกจพรีเมียมเรียบร้อย บัญชีของคุณกลับสู่การใช้งานระดับเริ่มต้นฟรีแล้ว');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 font-sans" id="pricing-module-container">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic header display depending on subscription status */}
        {isPremium ? (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-amber-300/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <span className="bg-white/20 text-yellow-200 border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  👑 VIP Premium Member
                </span>
                <h1 className="text-2xl sm:text-3xl font-black">คุณได้รับการปลดล็อกระดับ Pro เรียบร้อยแล้ว!</h1>
                <p className="text-xs sm:text-sm text-amber-50 max-w-xl leading-relaxed font-medium">
                  สนุกกับคลังเทมเพลตพรีเมียมทั้งหมด, ฟีเจอร์ลบพื้นหลังสินค้าขั้นเทพ, และระบบเขียนสโลแกนด้วย AI อัจฉริยะที่ไม่มีจำกัดโควตารายวันอีกต่อไป ยินดีต้อนรับสู่โลกแห่งความสุขในการขายของดีครับ!
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={handleCancelSubscription}
                  className="px-5 py-3 bg-red-600/20 hover:bg-red-600/30 text-white font-semibold rounded-2xl border border-red-500/20 transition-all text-xs"
                >
                  ยกเลิกแพ็กเกจ
                </button>
                <div className="bg-white text-indigo-700 font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center space-x-1 shadow-md">
                  <span>สถานะการชำระเงิน: สำเร็จ</span>
                  <span className="text-emerald-500">●</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Unsubscribed Hero Section */
          <div className="text-center space-y-4 max-w-2xl mx-auto" id="pricing-headline">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full flex items-center w-fit mx-auto animate-pulse">
              👑 สมัครวันนี้พร้อมแถมคู่มือสอนยิงแอดให้ยอดขายปังฟรี!
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              แพ็กเกจและบริการยกระดับความสำเร็จ
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
              ออกแบบโฆษณาด้วย AI เขียนแคปชันและพาดหัวแบรนด์คุณภาพสูงอย่างไร้ข้อจำกัด เพื่อก้าวข้ามโควตาใช้ฟรี 5 ครั้งต่อวันไปแบบมืออาชีพ!
            </p>

            {/* Switch Monthly/Annual */}
            <div className="flex items-center justify-center space-x-3 pt-4">
              <span className={`text-xs font-bold ${!isAnnual ? 'text-indigo-600' : 'text-gray-400'}`}>จ่ายรายเดือน</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-12 h-6 bg-indigo-600 rounded-full relative p-0.5 focus:outline-none transition-colors"
                title="สลับโหมด"
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-all ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-bold flex items-center ${isAnnual ? 'text-indigo-600' : 'text-gray-400'}`}>
                จ่ายรายปี (ลดพิเศษ 25%) 
                <span className="ml-1.5 text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-md">Save!</span>
              </span>
            </div>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" id="pricing-tier-grid">
          {plans.map((p, idx) => {
            const price = isAnnual ? p.priceAnnual : p.priceMonthly;
            const isCurrentPlan = (isPremium && p.name === 'SME Pro') || (!isPremium && p.name === 'SME Free');
            
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between hover:translate-y-1 hover:shadow-xl transition-all duration-300 relative ${p.color}`}
              >
                {p.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 text-[9px] font-extrabold tracking-wider bg-gradient-to-r from-indigo-600 via-pink-600 to-indigo-600 text-white px-4 py-1.5 rounded-full shadow-md border border-indigo-200 uppercase">
                    🔥 แนะนำสำหรับผู้ค้าออนไลน์ / SME
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                      {isCurrentPlan && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">
                          ใช้อยู่ปัจจุบัน
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{p.desc}</p>
                  </div>

                  {/* Pricing dynamic digits */}
                  <div className="py-4 border-b border-gray-100 flex items-baseline">
                    <span className="text-3xl font-black font-mono text-gray-950">฿{price}</span>
                    <span className="text-gray-400 text-[10px] ml-1.5 font-bold">/ เดือน {isAnnual && price > 0 ? '(ชำระรายปี)' : ''}</span>
                  </div>

                  {/* Features listing check */}
                  <ul className="space-y-3 pt-2">
                    {p.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start text-xs text-gray-600 leading-normal">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 mr-2" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button subscription */}
                <div className="pt-8">
                  <button
                    disabled={isCurrentPlan}
                    onClick={() => handleOpenCheckout(p)}
                    className={`w-full py-3 rounded-2xl text-xs font-bold tracking-wide transition-all flex items-center justify-center space-x-1.5 ${
                      isCurrentPlan
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : p.isPopular
                          ? 'bg-[#5c3df5] hover:brightness-105 text-white shadow-lg shadow-indigo-100'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{isCurrentPlan ? 'กำลังเปิดใช้งาน' : p.btnText}</span>
                    {!isCurrentPlan && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Quality Assurance */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-wrap justify-center items-center gap-6 sm:gap-12" id="security-assurance-badges">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
            <ShieldCheck className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
            <span>ความปลอดภัยระดับสากล PCI-DSS Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
            <Percent className="w-4.5 h-4.5 text-indigo-500" />
            <span>ไม่มีข้อผูกมัดระยะยาว ยกเลิกได้ตลอดเวลา</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-400">
            <Receipt className="w-4.5 h-4.5 text-indigo-500" />
            <span>ออกเอกสารใบเสร็จ/ใบกำกับภาษีครบถ้วน</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 space-y-6 max-w-4xl mx-auto" id="pricing-faqs-accordion">
          <div className="text-center space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center justify-center">
              <HelpCircle className="w-4.5 h-4.5 mr-1.5 text-indigo-600" />
              คำถามที่พบบ่อย (FAQs)
            </h2>
            <p className="text-[11px] text-gray-400 font-semibold uppercase">ไขข้อข้องใจเรื่องระบบพรีเมียมลิขสิทธิ์โฆษณา</p>
          </div>

          <div className="divide-y divide-gray-100">
            {faqs.map((faq, idx) => {
              const isOpen = openFAQ === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : idx)}
                    className="flex justify-between items-center w-full text-left font-bold text-xs sm:text-sm text-gray-800 hover:text-indigo-600 transition-all focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <p className="mt-2 text-xs leading-relaxed text-gray-500 bg-slate-50/50 p-4 rounded-xl border border-gray-100">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Interactive Checkout Dialog / Bottom sheet */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-gray-100 shadow-2xl space-y-0 relative animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="bg-slate-950 p-5 text-white flex justify-between items-center relative">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-widest flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1" /> ปลดล็อกระดับ {selectedPlan.name}
                </span>
                <h3 className="text-base font-bold">สรุปยอดชำระและเลือกวิธีชำระเงิน</h3>
              </div>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success screen inside modal */}
            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                  🎉
                </div>
                <h4 className="text-base font-bold text-slate-950">ยินดีด้วยค่ะ! อัปเกรดระบบพรีเมียมเรียบร้อยแล้ว</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                  บัญชี <strong>{selectedPlan.name}</strong> ของคุณพร้อมใช้งานแล้ววันนี้ สนุกสนานไปกับการดาวน์โหลดชิ้นงาน HD แบบไม่มีโฆษณาหรือลิขสิทธิ์กวนใจ!
                </p>

                {needTaxInvoice && (
                  <div className="p-3 bg-indigo-50 border border-indigo-100 text-left rounded-xl space-y-1 text-[11px] text-indigo-800">
                    <p className="font-bold flex items-center"><FileText className="w-3.5 h-3.5 mr-1 text-indigo-600" /> ระบบได้ทำการส่ง e-Tax Invoice ไปที่เมลเรียบร้อยแล้ว:</p>
                    <p className="opacity-80">ผู้รับ: {companyName || 'ร้านค้าออนไลน์'}</p>
                    <p className="opacity-80">อีเมลส่งตรง: {email || 'merchant@example.com'}</p>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedPlan(null);
                      setIsSuccess(false);
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-105 text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    เริ่มออกโฆษณาเด็ดๆ เลย!
                  </button>
                </div>
              </div>
            ) : (
              /* Normal payment form */
              <form onSubmit={handleSimulatePayment} className="p-5 sm:p-6 space-y-5 text-xs">
                
                {/* Total Summary */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-500 block">แพ็กเกจ: {selectedPlan.name}</span>
                    <span className="text-[10px] text-indigo-600 font-semibold">{isAnnual ? 'ชำระรายปี ประหยัด 25%' : 'ชำระรายเดือน'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-950 font-mono">฿{isAnnual ? selectedPlan.priceAnnual : selectedPlan.priceMonthly}</span>
                    <span className="text-[9px] text-gray-400 font-bold block">/ เดือน (ก่อนภาษี)</span>
                  </div>
                </div>

                {/* Choose Method Tabs */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">ช่องทางการชำระเงิน</label>
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
                      <span>สแกน Thai QR PromptPay</span>
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
                      <span>บัตรเครดิต / เดบิต</span>
                    </button>
                  </div>
                </div>

                {/* Method details view */}
                {paymentMethod === 'qr' ? (
                  <div className="p-4 bg-slate-50 border border-gray-150 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-xs relative">
                      {/* Styled PromptPay vector graphic representation */}
                      <div className="w-36 h-36 bg-slate-50 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg relative overflow-hidden">
                        <span className="text-slate-300 text-[10px] font-bold mb-1 block">PROMPTPAY QR</span>
                        {/* Beautiful generated mock QR */}
                        <div className="grid grid-cols-5 gap-0.5 p-2 bg-indigo-900 w-24 h-24 rounded-sm">
                          {[...Array(25)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`rounded-xs ${
                                (i * 7 + 13) % 3 === 0 || i % 6 === 0 ? 'bg-white' : 'bg-slate-950'
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
                      <p className="font-bold text-slate-800 text-[11px]">สแกนจ่ายด้วยแอปพลิเคชันธนาคารทุกแห่ง</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">ยอดแปรปรวนอัตโนมัติ ยืนยันสเตตัสใน 1 วินาทีหลังจากสแกน</p>
                    </div>
                  </div>
                ) : (
                  /* Credit card inputs */
                  <div className="space-y-3 p-4 bg-slate-50 border border-gray-150 rounded-2xl">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">เลขหน้าบัตร (Card Number)</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4234 5678 1234 5678"
                        className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">วันหมดอายุ (EXP DATE)</label>
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
                        <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">รหัสหลังบัตร (CVV)</label>
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
                      <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase">ชื่อผู้ถือบัตร (Cardholder Name)</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="SOMCHAI DEEDEE"
                        className="w-full bg-white px-3 py-2 rounded-lg border border-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Expandable e-Tax Invoice option */}
                <div className="border border-dashed border-gray-200 p-3 rounded-xl space-y-3 bg-slate-50/50">
                  <label className="flex items-center space-x-2 cursor-pointer font-bold text-slate-800 text-[11px]">
                    <input
                      type="checkbox"
                      checked={needTaxInvoice}
                      onChange={(e) => setNeedTaxInvoice(e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Building className="w-3.5 h-3.5 text-gray-400" />
                    <span>ต้องการขอใบกำกับภาษีอิเล็กทรอนิกส์ (e-Tax Invoice)</span>
                  </label>

                  {needTaxInvoice && (
                    <div className="space-y-2 pt-1 animate-fade-in text-slate-700">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-bold text-gray-400 mb-0.5">ชื่อจดทะเบียนบริษัท / นามบุคคล</label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="บริษัท สมมุติ จำกัด (มหาชน)"
                            className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-gray-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-gray-400 mb-0.5">เลขประจำตัวผู้เสียภาษี (13 หลัก)</label>
                          <input
                            type="text"
                            required
                            maxLength={13}
                            value={taxId}
                            onChange={(e) => setTaxId(e.target.value.replace(/\D/g, ''))}
                            placeholder="0105565000000"
                            className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-gray-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-gray-400 mb-0.5">ที่อยู่ออกใบเสร็จรับเงิน</label>
                        <input
                          type="text"
                          required
                          value={companyAddress}
                          onChange={(e) => setCompanyAddress(e.target.value)}
                          placeholder="เลขที่ 1/2 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110"
                          className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-gray-400 mb-0.5">อีเมลสำหรับจัดส่ง e-Tax Invoice PDF</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="merchant@example.com"
                          className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-gray-200"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit simulated action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <span className="flex items-center space-x-1.5">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>กำลังยืนยันยอดเงินผ่าน Secure Gateway...</span>
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>ชำระเงินและอัปเกรด Premium Pro</span>
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-gray-400 text-center mt-2">
                    เมื่อชำระเงินเสร็จสิ้น ถือว่าคุณยอมรับเงื่อนไขการให้บริการของ Ezgen Thailand แล้ว
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
