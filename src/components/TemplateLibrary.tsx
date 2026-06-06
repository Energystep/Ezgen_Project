import React, { useState } from 'react';
import { Page, AdTemplate } from '../types';
import { Search, Filter, Facebook, Play, Instagram, Layers, Sparkles, Check, ChevronRight } from 'lucide-react';

// Hardcoded high-converting SME templates
export const SME_TEMPLATES: AdTemplate[] = [
  {
    id: 'tmpl-coffee-fb',
    title: 'กาแฟคั่วบดออร์แกนิกเกรดพรีเมียม',
    category: 'facebook',
    businessType: 'food',
    image: '☕',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1 (Square)',
    bgGradient: 'from-amber-900 via-amber-950 to-stone-900',
    elements: [
      { id: 'el-1', type: 'text', content: 'กาแฟออร์แกนิก คั่วสดใหม่', x: 50, y: 15, fontSize: 32, color: '#fef08a', fontWeight: 'bold' },
      { id: 'el-2', type: 'text', content: 'หอมกรุ่น เข้มข้น กลมกล่อม ดริปแท้ 100%', x: 50, y: 26, fontSize: 16, color: '#e7e5e4' },
      { id: 'el-3', type: 'sticker', content: '☕', x: 50, y: 55, fontSize: 64 },
      { id: 'el-4', type: 'text', content: 'โปรพิเศษ: ซื้อ 2 แถม 1 ทักแชทด่วน!', x: 50, y: 85, fontSize: 18, color: '#facc15', fontWeight: 'bold' }
    ],
    isPremium: false
  },
  {
    id: 'tmpl-fashion-ig',
    title: 'เดรสมินิมอล สไตล์เกาหลี',
    category: 'instagram',
    businessType: 'fashion',
    image: '👗',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16 (Story)',
    bgGradient: 'from-pink-100 via-rose-100 to-amber-50',
    elements: [
      { id: 'el-1', type: 'text', content: 'Molly Slim Dress', x: 50, y: 12, fontSize: 34, color: '#881337', fontWeight: 'bold' },
      { id: 'el-2', type: 'text', content: 'ผ้าฝ้ายญี่ปุ่น ใส่สบาย ระบายอากาศดีเยี่ยม', x: 50, y: 22, fontSize: 16, color: '#4c0519' },
      { id: 'el-3', type: 'sticker', content: '👗', x: 50, y: 50, fontSize: 80 },
      { id: 'el-4', type: 'text', content: 'ลดล้างสต็อก 50% วันนี้วันเดียวเท่านั้น', x: 50, y: 88, fontSize: 18, color: '#be123c', fontWeight: 'bold' }
    ],
    isPremium: true
  },
  {
    id: 'tmpl-home-banner',
    title: 'บ้านเดี่ยว นนทบุรี ใกล้รถไฟฟ้า',
    category: 'banner',
    businessType: 'realestate',
    image: '🏡',
    width: 1200,
    height: 750,
    aspectRatio: '4:3 (Banner)',
    bgGradient: 'from-slate-900 via-slate-950 to-indigo-950',
    elements: [
      { id: 'el-1', type: 'text', content: 'บ้านหรูทำเลทอง เริ่มต้น 4.9 ล้านบาท', x: 50, y: 15, fontSize: 30, color: '#ffffff', fontWeight: 'bold' },
      { id: 'el-2', type: 'text', content: 'ผ่อนเริ่มหมื่นกว่าๆ ติดรถไฟฟ้า 2 นาที', x: 50, y: 26, fontSize: 16, color: '#93c5fd' },
      { id: 'el-3', type: 'sticker', content: '🏡', x: 50, y: 55, fontSize: 72 },
      { id: 'el-4', type: 'text', content: 'จองสิทธิ์รับฟรี เฟอร์ฯ ทั้งหลัง (จำกัด 3 หลัง)', x: 50, y: 85, fontSize: 18, color: '#facc15', fontWeight: 'bold' }
    ],
    isPremium: false
  },
  {
    id: 'tmpl-buffet-fb',
    title: 'พรีเมียมหมูกระทะ ชีสยืดสะใจ',
    category: 'facebook',
    businessType: 'food',
    image: '🥩',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1 (Square)',
    bgGradient: 'from-red-800 via-red-950 to-orange-950',
    elements: [
      { id: 'el-1', type: 'text', content: 'หมูกระทะพรีเมียม อิ่มไม่อั้น', x: 50, y: 15, fontSize: 32, color: '#fef08a', fontWeight: 'bold' },
      { id: 'el-2', type: 'text', content: 'น้ำจิ้มสูตรโคตรแซ่บ + ชีสยืดไม่อั้น! หัวละ 299.-', x: 50, y: 26, fontSize: 16, color: '#fdba74' },
      { id: 'el-3', type: 'sticker', content: '🥩', x: 50, y: 55, fontSize: 64 },
      { id: 'el-4', type: 'text', content: 'เฉพาะจองผ่านเพจ: รับฟรีเป๊ปซี่ขวดบิ๊ก ทักเลย!', x: 50, y: 84, fontSize: 18, color: '#fb923c', fontWeight: 'bold' }
    ],
    isPremium: false
  },
  {
    id: 'tmpl-sport-tiktok',
    title: 'รองเท้าวิ่งสไลด์ สปอร์ตฟิตเนส',
    category: 'tiktok',
    businessType: 'fashion',
    image: '👟',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16 (Story)',
    bgGradient: 'from-stone-900 via-gray-900 to-emerald-950',
    elements: [
      { id: 'el-1', type: 'text', content: 'Ultralight Run X-20', x: 50, y: 12, fontSize: 34, color: '#10b981', fontWeight: 'bold' },
      { id: 'el-2', type: 'text', content: 'รองเท้าวิ่งซับแรงกระแทก ยืดหยุ่นสูงสุด', x: 50, y: 22, fontSize: 16, color: '#cbd5e1' },
      { id: 'el-3', type: 'sticker', content: '👟', x: 50, y: 52, fontSize: 80 },
      { id: 'el-4', type: 'text', content: 'ราคาพิเศษช่วงเปิดตัว! ส่งฟรีเก็บปลายทาง', x: 50, y: 86, fontSize: 18, color: '#34d399', fontWeight: 'bold' }
    ],
    isPremium: true
  },
  {
    id: 'tmpl-condo-banner',
    title: 'คอนโดหรูวิวแม่น้ำ ใจกลางเมือง',
    category: 'banner',
    businessType: 'realestate',
    image: '🏢',
    width: 1200,
    height: 750,
    aspectRatio: '4:3 (Banner)',
    bgGradient: 'from-teal-850 via-teal-950 to-indigo-950',
    elements: [
      { id: 'el-1', type: 'text', content: 'Riverfront Oasis Luxury', x: 50, y: 15, fontSize: 28, color: '#5eead4', fontWeight: 'bold' },
      { id: 'el-2', type: 'text', content: 'ห้องใหญ่เพดานสูง ดื่มด่ำโค้งน้ำเจ้าพระยาทุกค่ำคืน', x: 50, y: 26, fontSize: 15, color: '#e2e8f0' },
      { id: 'el-3', type: 'sticker', content: '🏢', x: 50, y: 55, fontSize: 72 },
      { id: 'el-4', type: 'text', content: 'ผ่อนสบาย 0% นาน 2 ปี รับสิทธิพิเศษด่วน', x: 50, y: 85, fontSize: 18, color: '#38bdf8', fontWeight: 'bold' }
    ],
    isPremium: true
  }
];

interface TemplateLibraryProps {
  setCurrentPage: (page: Page) => void;
  onSelectTemplate: (template: AdTemplate) => void;
}

export default function TemplateLibrary({ setCurrentPage, onSelectTemplate }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState<string>('all');
  const [activeBusiness, setActiveBusiness] = useState<string>('all');

  const platforms = [
    { id: 'all', label: 'ทั้งหมด', icon: Layers },
    { id: 'facebook', label: 'Facebook Ads', icon: Facebook },
    { id: 'tiktok', label: 'TikTok Video', icon: Play },
    { id: 'instagram', label: 'Instagram Story', icon: Instagram },
    { id: 'banner', label: 'ป้ายไวนิล / แบนเนอร์', icon: Layers },
  ];

  const businessTypes = [
    { id: 'all', label: 'ทุกธุรกิจ' },
    { id: 'food', label: 'อาหาร & เครื่องดื่ม' },
    { id: 'fashion', label: 'เสื้อผ้า & แฟชั่น' },
    { id: 'realestate', label: 'อสังหาริมทรัพย์' },
  ];

  // Filtering Logic
  const filteredTemplates = SME_TEMPLATES.filter((tmpl) => {
    const matchesSearch = tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tmpl.elements.some(el => el.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPlatform = activePlatform === 'all' || tmpl.category === activePlatform;
    const matchesBusiness = activeBusiness === 'all' || tmpl.businessType === activeBusiness;

    return matchesSearch && matchesPlatform && matchesBusiness;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans" id="template-library-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Headers */}
        <div className="text-center space-y-3 max-w-2xl mx-auto py-4" id="library-intro">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            🎨 คัดสรรโครงร่างมาเพื่อร้านค้าออนไลน์โดยเฉพาะ
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            เลือกเทมเพลตที่โดนใจ เริ่มออกแบบได้ทันที
          </h1>
          <p className="text-sm text-gray-400">
            ไม่ต้องออกแบบจากศูนย์ เราจัดสัดส่วนและโทนสีสวยงามที่ช่วยดันยอดขาย คืนกำไรให้คุณเรียบร้อยแล้ว
          </p>
        </div>

        {/* Filters and Search controls */}
        <div className="bg-white p-6 border border-gray-150 rounded-3xl shadow-sm space-y-6" id="selectors-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อเทมเพลต, ข้อความสโลแกน เช่น 'กาแฟ'..."
                className="w-full bg-slate-50 border border-gray-200 text-sm py-3 pl-10 pr-4 rounded-xl focus:outline-none focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Business filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5" id="business-filters">
              <span className="text-xs font-semibold text-gray-400 mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1" /> ประเภท:
              </span>
              {businessTypes.map((biz) => (
                <button
                  key={biz.id}
                  onClick={() => setActiveBusiness(biz.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeBusiness === biz.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-50 text-gray-600 hover:bg-slate-100'
                  }`}
                >
                  {biz.label}
                </button>
              ))}
            </div>

          </div>

          {/* Platform category selectors */}
          <div className="border-t border-gray-100 pt-4" id="platform-tab-section">
            <div className="flex overflow-x-auto no-scrollbar pb-1 space-x-2">
              {platforms.map((plat) => {
                const Icon = plat.icon;
                const isSelected = activePlatform === plat.id;
                return (
                  <button
                    key={plat.id}
                    onClick={() => setActivePlatform(plat.id)}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border transition-all shrink-0 ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' 
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {plat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Templates Grid displaying */}
        {filteredTemplates.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3" id="no-templates-state">
            <span className="text-4xl">🔍</span>
            <h3 className="text-base font-bold text-gray-800">ไม่พบคู่เทมเพลตที่ค้นหา</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              ลองเปลี่ยนสัญญะ หมวดหมู่ หรือลบข้อมูลคำสำคัญในช่องค้นหา แล้วลองใหม่อีกครั้ง
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="template-showcase-grid">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer group flex flex-col justify-between"
              >
                
                {/* Simulated Canvas Preview Container */}
                <div className="p-4 bg-slate-50 border-b border-gray-50 flex items-center justify-center aspect-square md:aspect-5/4 relative overflow-hidden">
                  <div className={`w-full max-w-[200px] aspect-${tmpl.aspectRatio.includes('Story') ? '9/16' : tmpl.aspectRatio.includes('Square') ? '1/1' : '4/3'} rounded-xl bg-gradient-to-tr ${tmpl.bgGradient} p-4 text-white flex flex-col justify-between text-center relative shadow-md transform group-hover:scale-102 transition-all duration-300`}>
                    
                    {/* Header elements preview */}
                    <div className="text-[7px] font-bold text-white/90 line-clamp-1">
                      {tmpl.elements.find(e => e.type === 'text')?.content || 'พาดหัวโปรเด็ด'}
                    </div>

                    {/* Sticker/Icon */}
                    <div className="my-auto text-3.5xl filter drop-shadow">
                      {tmpl.image}
                    </div>

                    {/* Title element */}
                    <div className="text-[6px] text-yellow-300 font-semibold line-clamp-1">
                      {tmpl.elements.find(e => e.y > 80)?.content || 'สิทธิประโยชน์ลูกค้า'}
                    </div>

                  </div>

                  {/* Absolute Hover Action Overlay */}
                  <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>เลือกใช้งานเทมเพลตนี้</span>
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 space-y-3 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded uppercase">
                      สัดส่วน {tmpl.aspectRatio}
                    </span>
                    {tmpl.isPremium ? (
                      <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex items-center">
                        👑 PRO
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {tmpl.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      รวมสโลแกนและคำโปรย AI ภาษาไทยที่พร้อมใช้งานทันที
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
