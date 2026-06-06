import React from 'react';
import { Page } from '../types';
import { Sparkles, Mail, Phone, MapPin, Globe, CreditCard, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800" id="global-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="p-1.5 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-lg text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Ezgen</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              ช่วยผู้ประกอบการไทย ปลดล็อกศักยภาพงานโฆษณาออนไลน์ระดับพรีเมียมใน 3 คลิก ไม่ต้องง้อดีไซเนอร์ ยอดขายเติบโตอย่างมั่นคงและหรูหรา
            </p>
            <div className="flex space-x-3 text-xs pt-1">
              <span className="bg-gray-800 text-gray-400 px-2 py-1 rounded">v1.1.0 Stable</span>
              <span className="bg-green-950 text-green-400 px-2 py-1 rounded flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span>
                AI Active
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">บริการและผลงาน</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('templates')} className="hover:text-blue-400 transition-colors">
                  คลังเทมเพลตโฆษณา
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('editor')} className="hover:text-blue-400 transition-colors">
                  ระบบสตูดิโอออกแบบ
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('analytics')} className="hover:text-blue-400 transition-colors">
                  ระบวิเคราะห์แคมเปญ ROI
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pricing')} className="hover:text-blue-400 transition-colors">
                  อัตราค่าบริการและโปรโมชัน
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">เรียนรู้ & พัฒนา</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('blog')} className="hover:text-blue-400 transition-colors">
                  บล็อกอัปเดตเทรนด์การตลาด
                </button>
              </li>
              <li>
                <a href="#academy" onClick={(e) => { e.preventDefault(); setCurrentPage('blog'); }} className="hover:text-blue-400 transition-colors">
                  แนวทางการเพิ่มยอดขาย
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); setCurrentPage('pricing'); }} className="hover:text-blue-400 transition-colors font-medium">
                  คำถามที่พบบ่อย (FAQs)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">ช่องทางติดต่อ</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>support@ezgen.ai</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span>02-123-4567 (จันทร์-ศุกร์)</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                <span>อาคารนวัตกรรมดิจิทัลพัฒนา ชั้น 12 กรุงเทพฯ ประเทศไทย</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Ezgen. สงวนสิทธิ์ทุกประการ พัฒนาขึ้นมาเพื่อผู้ประกอบการและร้านค้ายุคใหม่</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">นโยบายความเป็นส่วนตัว</span>
            <span className="hover:text-gray-400 cursor-pointer">เงื่อนไขการใช้งาน</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
