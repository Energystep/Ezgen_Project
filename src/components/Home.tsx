import React, { useState } from 'react';
import { Page } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Users, MessageSquare, Zap, Target, Image as ImageIcon, Sparkle } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  onNewProject: () => void;
}

export default function Home({ setCurrentPage, onNewProject }: HomeProps) {
  const [sandboxSlogan, setSandboxSlogan] = useState('ชาไทยพรีเมียม หอมกรุ่นใบชาธรรมชาติ');
  const [sandboxSub, setSandboxSub] = useState('สัมผัสความหอมเข้มข้น หวานละมุนสไตล์สูตรต้นตำรับดั้งเดิม');
  const [sandboxTheme, setSandboxTheme] = useState<'midnight' | 'rose' | 'emerald'>('midnight');
  const [sandboxEmoji, setSandboxEmoji] = useState('🍵');

  const themeStyles = {
    midnight: {
      bg: 'from-slate-950 via-slate-900 to-stone-900',
      sloganColor: 'text-amber-400',
      textColor: 'text-stone-300',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      tagline: '★ CLASSIC ROYAL SELECTION ★',
      accent: 'border-amber-500/20'
    },
    rose: {
      bg: 'from-rose-950 via-slate-900 to-pink-950',
      sloganColor: 'text-rose-200',
      textColor: 'text-pink-100',
      badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      tagline: '✦ EXQUISITE ROSE CHIC ✦',
      accent: 'border-rose-500/20'
    },
    emerald: {
      bg: 'from-emerald-950 via-slate-900 to-teal-950',
      sloganColor: 'text-emerald-300',
      textColor: 'text-emerald-100',
      badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      tagline: '☘ ORGANIC ROYAL MINT ☘',
      accent: 'border-emerald-500/20'
    }
  };

  const activeTheme = themeStyles[sandboxTheme];

  const valueProps = [
    {
      icon: SmileIcon,
      title: 'เทมเพลตพร้อมใช้งานหลากหลาย',
      desc: 'เข้าถึงมิติใหม่ของคลังภาพโฆษณาและวิดีโอ ครอบคลุมทั้ง Facebook, TikTok, Instagram และวิชั่นไบท์ พัฒนามาอย่างเป็นระเบียบ',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      icon: Zap,
      title: 'ใช้ AI ช่วยคิดคอนเทนต์ & สโลแกน',
      desc: 'หมดปัญหากับการคิดแคปชันยากๆ ให้พลังจาก Gemini AI ช่วยป้อนพาดหัวโฆษณาเด็ดๆ คอนเทนต์บาดใจใน 3 วินาทีสำหรับแบรนด์คุณ',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      icon: Target,
      title: 'ไม่ต้องมีทักษะดีไซน์',
      desc: 'ระบบสตูดิโอแบบลากวาง (Drag and Drop) ออกแบบมาให้ง่ายแสนง่าย ไม่ซับซ้อน ปรับแก้สี แก้ตัวอักษร อัปรูปสินค้า ก็ดาวน์โหลดใช้งานแอดได้เลย',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  const socialReviews = [
    {
      name: 'คุณนพดล แก้วทวี',
      role: 'เจ้าของแบรนด์กาแฟ "หอมอร่อยกาแฟสด"',
      avatar: '☕',
      text: 'ปกติจ้างทำแบนเนอร์รูปละ 500 บาท เสียเวลานานมาก พอใช้ Ezgen คิดสโลแกนประกอบแบนเนอร์เอง ยิง Facebook แอดคู่แคปชันที่ AI แต่งให้ สรุปยอดขายพุ่งถึง 120% ใน 1 เดือน!',
      achievement: 'ยอดขายเพิ่ม 120%',
    },
    {
      name: 'คุณมลฤดี เจริญทรัพย์',
      role: 'ผู้ก่อตั้งร้านเสื้อผ้าแฟนชั่น "Molly Style"',
      avatar: '👗',
      text: 'ระบบใช้งานง่ายและไม่มึนเลยค่ะ จัดหมวดหมู่ดีไซน์เรียบร้อยมาก จัดวางฟอนต์ไทยสวยๆ ได้ลงตัวมาก โดยเฉพาะฟีเจอร์ AI ช่วยเขียนแคปชันสำหรับลง TikTok แนะนำแบรนด์เล็กๆ ที่สู้กระแสการยิงแอดห้ามพลาดเลยค่ะ',
      achievement: 'ประหยัดงบดีไซน์ 15,000 บาท/ด.',
    },
    {
      name: 'คุณกิตติศักดิ์ พรหมดี',
      role: 'เจ้าของธุรกิจอสังหาแนวราบ "บ้านดีนนทบุรี"',
      avatar: '🏡',
      text: 'ระบบช่วยประเมิน ROI วิเคราะห์แคมเปญล่วงหน้าช่วยผมตัดสินใจจัดสรรงบง่ายขึ้นมาก แบนเนอร์คมชัดระดับโปรแวร์ ดูดี น่าเชื่อถือมากๆ',
      achievement: 'คลิกโฆษณาสูงขึ้น 3 เท่า',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans" id="landing-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-gray-100" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Hero text */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left space-y-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-600 animate-pulse" />
                ออกแบบสื่อโฆษณาด้วย Ezgen AI พรีเมียมและเรียบง่าย
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-none">
                สร้างโฆษณา <br />
                <span className="bg-gradient-to-r from-amber-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  ระดับโปรใน 3 คลิก
                </span> <br />
                ปรับแต่งง่ายลื่นไหล ไม่สับสน
              </h1>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
                แพลตฟอร์มช่วยคิดคอนเทนต์ สโลแกน และแต่งภาพโฆษณาสุดสวยในที่เดียว โดย Gemini AI 
                เพิ่มอัตราการคลิก (CTR) คุมสีและภาพลักษณ์อย่างเป็นระเบียบ สะท้อนความหรูหราสู่แบรนด์คุณ
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    setCurrentPage('editor');
                    onNewProject();
                  }}
                  id="hero-cta-button"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-indigo-600 text-white font-medium rounded-2xl hover:brightness-105 shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow" />
                  <span>เริ่มสร้างโฆษณาพรีเมียมฟรี</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setCurrentPage('templates')}
                  className="px-6 py-4 bg-gray-50 text-gray-700 font-medium rounded-2xl hover:bg-gray-100 transition-all flex items-center justify-center border border-gray-200"
                >
                  ดูคลังเทมเพลตสุดหรู
                </button>
              </div>

              {/* Badges / Micro proof */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-gray-400">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" />
                  ใช้งานทันที ไม่มึนงง จัดสรรหมวดหมู่อย่างเป็นระเบียบ
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-rose-500" />
                  ความหรูหราน่าเชื่อถือที่แบรนด์เลือกใช้
                </span>
              </div>
            </div>

            {/* Visual Column / Interactive Luxury Sandbox */}
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 relative">
              <div className="relative mx-auto w-full max-w-lg">
                
                {/* Background glow effects */}
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-amber-100 filter blur-3xl opacity-40 z-0"></div>
                <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-64 h-64 rounded-full bg-indigo-100 filter blur-3xl opacity-30 z-0"></div>

                <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 z-10 space-y-4">
                  {/* Decorative Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      </div>
                      <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                        Ezgen Interactive Sandbox ✨
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-100 animate-pulse">
                      • ทดลองแก้ไขหัวข้อได้เลย
                    </span>
                  </div>

                  {/* Sandbox Toolbar Component */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase mb-1">เฉดสีระดับพรีเมียม</label>
                      <div className="flex space-x-1.5 pt-0.5">
                        <button
                          onClick={() => setSandboxTheme('midnight')}
                          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                            sandboxTheme === 'midnight'
                              ? 'bg-slate-900 text-amber-300 border-amber-400 shadow-sm'
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          Midnight Gold
                        </button>
                        <button
                          onClick={() => setSandboxTheme('rose')}
                          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                            sandboxTheme === 'rose'
                              ? 'bg-rose-950 text-rose-200 border-rose-300 shadow-sm'
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          Rose Velvet
                        </button>
                        <button
                          onClick={() => setSandboxTheme('emerald')}
                          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                            sandboxTheme === 'emerald'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-sm'
                              : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                        >
                          Royal Mint
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase mb-1">รูปไอคอนสินค้าตัวอย่าง</label>
                      <div className="flex space-x-1.5 pt-0.5">
                        {['🍵', '👜', '🥐', '🌟'].map(emoji => (
                          <button
                            key={emoji}
                            onClick={() => setSandboxEmoji(emoji)}
                            className={`w-7 h-7 rounded-lg border text-sm flex items-center justify-center transition-all ${
                              sandboxEmoji === emoji
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-extrabold scale-110'
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mock live preview canvas */}
                  <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-tr ${activeTheme.bg} p-5 text-white flex flex-col justify-between border ${activeTheme.accent} transition-all duration-500 relative overflow-hidden shadow-inner`}>
                    
                    {/* Elegance visual background elements */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    
                    {/* Header elements */}
                    <div className="flex justify-between items-start z-10">
                      <span className="bg-white/10 text-white border border-white/20 text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide backdrop-blur-xs">
                        {activeTheme.tagline}
                      </span>
                      <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border shadow-sm ${activeTheme.badge}`}>
                        BEST QUALITY
                      </span>
                    </div>

                    {/* Middle element */}
                    <div className="my-auto self-center flex flex-col items-center space-y-1.5 z-10">
                      <div className="text-5xl filter drop-shadow-xl animate-bounce duration-1000">
                        {sandboxEmoji}
                      </div>
                    </div>

                    {/* Text Container */}
                    <div className="space-y-1.5 z-10 text-center">
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight leading-tight filter drop-shadow-md ${activeTheme.sloganColor}`}>
                        "{sandboxSlogan || 'พิมพ์ตัวหนาหัวข้อที่นี่'}"
                      </h3>
                      <p className={`text-[10px] leading-relaxed max-w-sm mx-auto ${activeTheme.textColor}`}>
                        {sandboxSub || 'คำอธิบายสินค้าตัวจิ๋วสุดประทับใจจะปรากฏตรงนี้'}
                      </p>
                    </div>
                  </div>

                  {/* Live Controls inputs (Simple, well organized, "ไม่มึน") */}
                  <div className="space-y-2 border-t border-gray-50 pt-3">
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 block mb-1">
                        ✍ ทดลองเขียนสโลแกน (Slogan)
                      </span>
                      <input
                        type="text"
                        value={sandboxSlogan}
                        onChange={(e) => setSandboxSlogan(e.target.value.slice(0, 50))}
                        placeholder="พิมพ์สโลแกน เช่น โกโก้พรีเมียม เข้มสะใจคนนอนดึก..."
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 block mb-1">
                        📝 คำอธิบายสินค้าเพิ่มเติม (Tagline)
                      </span>
                      <input
                        type="text"
                        value={sandboxSub}
                        onChange={(e) => setSandboxSub(e.target.value.slice(0, 80))}
                        placeholder="พิมพ์รายละเอียดประกอบโฆษณา..."
                        className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder-gray-400 text-gray-800"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white border-b border-gray-100" id="value-proposition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              ทำไมธุรกิจ SME ไทยนับหมื่นรายถึงเลือกใช้ Ezgen?
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              หมดปัญหากับความรู้ดีไซเนอร์ หรือการใช้บอร์ดออกแบบที่มึนงง แพลตฟอร์มเราจัดสรรไว้อย่างเป็นระเบียบคุมแกนหรูหรา
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-gray-100 rounded-3xl p-6 text-left space-y-4 hover:border-amber-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                  <div className={`p-3 rounded-2xl w-fit border ${prop.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{prop.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{prop.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof & Achievements */}
      <section className="py-16 bg-slate-50" id="social-proof">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              เสียงยืนยันตัวจริงจากผู้ประกอบการที่ใช้แล้วยอดขายปัง!
            </h2>
            <p className="text-sm text-gray-500">
              รีวิวและความคิดเห็นอย่างตรงไปตรงมาจากผู้ใช้งานแพลตฟอร์มที่ยกระดับธุรกิจได้จริง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialReviews.map((review, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:scale-102 transition-all">
                <div className="space-y-4">
                  {/* Rating / Avatar info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                        {review.avatar}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-800">{review.name}</h4>
                        <p className="text-[10px] text-gray-400">{review.role}</p>
                      </div>
                    </div>
                  </div>
                  {/* Review Text */}
                  <blockquote className="text-xs text-gray-600 leading-relaxed italic">
                    "{review.text}"
                  </blockquote>
                </div>
                {/* Metric Badge */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                    🎯 ความสำเร็จที่เกิดจริง
                  </span>
                  <span className="text-xs font-bold text-slate-800">{review.achievement}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA closure */}
          <div className="bg-gradient-to-tr from-gray-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl" id="final-cta">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                พร้อมปั๊มยอดขายทะลุเป้าของธุรกิจคุณหรือยัง?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                ใช้ AI ประหยัดแรงงาน สร้างสโลแกนเนื้อหาสำหรับโฆษณาใน 3 คลิก แนะนำแผนการยิงแอดในงบที่คุณต้องการได้ทันที ฟรีตลอดการเริ่มต้นใช้งาน
              </p>
              <button
                onClick={() => {
                  setCurrentPage('editor');
                  onNewProject();
                }}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10 inline-flex items-center space-x-2"
              >
                <span>เริ่มออกแบบชิ้นงานของตนเองฟรี</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// Custom simple component placeholder to comply with standard
function SmileIcon(props: any) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}
