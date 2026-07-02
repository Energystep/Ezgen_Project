import React, { useState } from 'react';
import { Page } from '../types';
import { 
  Sliders, 
  Key, 
  User, 
  ShoppingBag, 
  Globe, 
  HelpCircle, 
  Check, 
  Heart, 
  RefreshCw,
  Bell
} from 'lucide-react';

interface SettingsProps {
  setCurrentPage: (page: Page) => void;
}

export default function Settings({ setCurrentPage }: SettingsProps) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('CUSTOM_GEMINI_API_KEY') || '');
  const [brandName, setBrandName] = useState('แม่ค้าขายดี');
  const [phone, setPhone] = useState('089-123-4567');
  const [address, setAddress] = useState('กรุงเทพมหานคร, ประเทศไทย');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('CUSTOM_GEMINI_API_KEY', apiKey);
    } else {
      localStorage.removeItem('CUSTOM_GEMINI_API_KEY');
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 font-sans">
      <div className="flex items-center space-x-2 border-b border-gray-50 pb-4">
        <Sliders className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-gray-900">การตั้งค่าแบรนด์ & ปัญญาประดิษฐ์ (Settings)</h2>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5 text-xs sm:text-sm">
        {/* API Key Box */}
        <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100/50 space-y-3">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-amber-900 text-xs uppercase tracking-wider">
              Gemini API Key ส่วนตัว (ทางเลือกเพิ่มเติม)
            </h3>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            โดยเริ่มต้นระบบ Ezgen จะรันผ่าน API ส่วนกลางฟรี แต่หากคุณต้องการความเร็วสูงสุด หรือขยายโควตาไม่จำกัด คุณสามารถนำ API Key ของตนเองจาก Google AI Studio มาใส่ได้ที่นี่ คีย์ของคุณจะถูกจัดเก็บไว้เฉพาะใน Browser ของคุณอย่างปลอดภัย
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full text-xs font-mono px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Brand Information */}
        <div className="space-y-4 pt-1">
          <h3 className="font-bold text-gray-800 flex items-center text-xs uppercase tracking-wider">
            <User className="w-4 h-4 mr-1.5 text-indigo-600" />
            โปรไฟล์ร้านค้า / ผู้ใช้งาน
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">ชื่อแบรนด์ / ร้านค้า</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">เบอร์ติดต่อสำหรับโฆษณา</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">ที่อยู่ร้านค้า (สำหรับออกใบเสร็จ)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Notification preferences */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-gray-800 flex items-center text-xs uppercase tracking-wider">
            <Bell className="w-4 h-4 mr-1.5 text-indigo-600" />
            การแจ้งเตือนและการใช้งานคลาวด์
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs text-gray-600 font-medium">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span>เปิดใช้งานระบบตรวจจับเทมเพลตอัจฉริยะ</span>
            </label>
            <label className="flex items-center space-x-2 text-xs text-gray-600 font-medium">
              <input type="checkbox" defaultChecked className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span>แจ้งเตือนคลังบทความการตลาดอัปเดตใหม่รายวัน</span>
            </label>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center space-x-2 text-xs"
          >
            {isSaved ? <Check className="w-4 h-4 text-white" /> : null}
            <span>{isSaved ? 'บันทึกค่าสำเร็จเรียบร้อย!' : 'บันทึกการตั้งค่า'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
