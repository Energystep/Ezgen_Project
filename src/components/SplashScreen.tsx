import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Zap, Star, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export default function SplashScreen({ onDismiss }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // Fills up in about 2.5 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(() => {
        onDismiss();
      }, 400); // Small delay for smooth exit feel
      return () => clearTimeout(delay);
    }
  }, [progress, onDismiss]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 text-white font-sans overflow-hidden select-none"
      id="ezgen-splash-screen"
    >
      {/* Abstract Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5c3df5]/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6 space-y-8">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-400/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>EZgen AI • โฆษณาอัจฉริยะ</span>
        </div>

        {/* Master Logo Icon & Glow */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5c3df5] to-blue-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
          <div className="relative bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl flex items-center justify-center">
            <span className="text-5xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              EZgen
            </span>
            <span className="text-3xl text-indigo-400 absolute -top-1 -right-1 animate-pulse">✦</span>
          </div>
        </div>

        {/* Slogan Text and Descriptions */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            สร้างสื่อโฆษณาให้ง่าย แค่บอกเรา
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
            เครื่องมือช่วยแม่ค้าและร้านค้าออนไลน์คิดคอนเทนต์ ปรับแต่งภาพ และสร้างแคปชันด้วยพลังปัญญาประดิษฐ์ใน 3 วินาที
          </p>
        </div>

        {/* Dynamic Premium Feature Badges */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs pt-2">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-2.5 flex flex-col items-center space-y-1">
            <span className="text-lg">🖼️</span>
            <span className="text-[9px] font-bold text-slate-300">เจนภาพ HD</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-2.5 flex flex-col items-center space-y-1">
            <span className="text-lg">🎬</span>
            <span className="text-[9px] font-bold text-slate-300">วิดีโอพรีเมียม</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-2.5 flex flex-col items-center space-y-1">
            <span className="text-lg">🤖</span>
            <span className="text-[9px] font-bold text-slate-300">บอทคิดพร้อมท์</span>
          </div>
        </div>

        {/* Progress Bar & Loader */}
        <div className="w-full max-w-xs space-y-2 pt-4">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#5c3df5] to-blue-500 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-wider">
            <span>กำลังบูตระบบปัญญาประดิษฐ์...</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Enter Button (Allows users to skip/click and enter immediately) */}
        <div className="pt-2">
          <button
            onClick={onDismiss}
            className="group flex items-center space-x-2 bg-gradient-to-r from-[#5c3df5] to-blue-600 hover:from-[#6c4ef7] hover:to-blue-500 text-white font-extrabold px-6 py-3 rounded-2xl text-xs transition-all duration-300 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60"
          >
            <span>เข้าสู่แอปพลิเคชันทันที</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Safety and Security assurance notice */}
      <div className="absolute bottom-6 flex items-center space-x-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>EZgen Secure System v2.5 Verified</span>
      </div>
    </div>
  );
}
