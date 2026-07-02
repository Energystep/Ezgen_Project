import React, { useState, useRef, useEffect } from 'react';
import { Page, Project } from '../types';
import { 
  Sparkles, 
  Upload, 
  Check, 
  Copy, 
  Download, 
  Save, 
  Sliders, 
  RefreshCw, 
  HelpCircle, 
  Bell, 
  Grid, 
  User, 
  TrendingUp, 
  Printer, 
  Facebook, 
  Instagram, 
  MessageSquare,
  Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CreateAdAIProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentPage: (page: Page) => void;
  setSelectedProject: (project: Project | null) => void;
}

const SAMPLE_PRODUCTS = [
  {
    id: 'p1',
    name: 'น้ำพริกปลาร้าผัด สูตรคุณแม่ 🌶️',
    details: `รสชาติจัดจ้าน หอมกลิ่นปลาร้าแท้
ทำจากวัตถุดิบคุณภาพ สดใหม่ สะอาด
ไม่ใส่สารกันบูด เก็บได้นาน
เหมาะสำหรับทานคู่กับผักสด ข้าวเหนียว หรือข้าวสวย`,
    points: ['อร่อย', 'ทำสดใหม่', 'วัตถุดิบธรรมชาติ', 'เก็บได้นาน'],
    price: '59.-',
    unit: 'กระปุก',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', // Beautiful chili / spices jar setup
    headline: 'น้ำพริกปลาร้าผัด',
    tagline: 'สูตรคุณแม่',
    footerText: 'ทานคู่กับผักสด ข้าวเหนียว หรือข้าวสวย... อร่อยลงตัว!',
    theme: 'amber'
  },
  {
    id: 'p2',
    name: 'ชาเขียวมัทฉะเกียวโตพรีเมียม 🍵',
    details: `ผงมัทฉะออร์แกนิกแท้ 100% นำเข้าจากเกียวโต
สีเขียวมรกตสวยตามธรรมชาติ ไม่ผสมสีหรือน้ำตาล
รสชาติกลมกล่อม มีรสอูมามิลุ่มลึก
เหมาะสำหรับชงร้อน ชงเย็น และทำเบเกอรีระดับพรีเมียม`,
    points: ['อร่อย', 'ปลอดสาร', 'วัตถุดิบธรรมชาติ', 'ราคาคุ้มค่า'],
    price: '350.-',
    unit: 'ซอง',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    headline: 'มัทฉะแท้จากเกียวโต',
    tagline: 'สูตรพรีเมียม',
    footerText: 'หอมผ่อนคลายล้ำลึก สัมผัสอูมามิแท้ในทุกแก้ว!',
    theme: 'emerald'
  },
  {
    id: 'p3',
    name: 'ครัวซองต์เนยสดฝรั่งเศส 🥐',
    details: `อบสดใหม่ทุกวัน ใช้เนยแท้นำเข้าจากฝรั่งเศส 100%
เนื้อแป้งเป็นชั้นบางกรอบนอก นุ่มฉ่ำเนยด้านใน
หอมฟุ้งละมุนไปทั้งบ้าน ไร้ไขมันทรานส์
ทานคู่กับกาแฟยามเช้า อร่อยฟินสะกดใจ`,
    points: ['อร่อย', 'ทำสดใหม่', 'วัตถุดิบธรรมชาติ', 'ราคาคุ้มค่า'],
    price: '45.-',
    unit: 'ชิ้น',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    headline: 'ครัวซองต์เนยสดฝรั่งเศส',
    tagline: 'อบสดใหม่',
    footerText: 'กรอบนอก นุ่มใน หอมฟุ้งละมุนใจทุกคำ!',
    theme: 'rose'
  }
];

export default function CreateAdAI({ projects, setProjects, setCurrentPage, setSelectedProject }: CreateAdAIProps) {
  // Active product input states
  const [productName, setProductName] = useState(SAMPLE_PRODUCTS[0].name);
  const [productDetails, setProductDetails] = useState(SAMPLE_PRODUCTS[0].details);
  const [uploadedImage, setUploadedImage] = useState<string | null>(SAMPLE_PRODUCTS[0].image);
  
  // Custom states for the interactive template canvas
  const [headline, setHeadline] = useState(SAMPLE_PRODUCTS[0].headline);
  const [tagline, setTagline] = useState(SAMPLE_PRODUCTS[0].tagline);
  const [footerText, setFooterText] = useState(SAMPLE_PRODUCTS[0].footerText);
  const [priceText, setPriceText] = useState(SAMPLE_PRODUCTS[0].price);
  const [unitText, setUnitText] = useState(SAMPLE_PRODUCTS[0].unit);
  const [activeTheme, setActiveTheme] = useState<'amber' | 'emerald' | 'rose' | 'slate'>('amber');

  // Multi-select points
  const [selectedPoints, setSelectedPoints] = useState<string[]>(['อร่อย', 'ทำสดใหม่', 'วัตถุดิบธรรมชาติ', 'เก็บได้นาน']);

  const pointsList = [
    { label: 'อร่อย', icon: '😋' },
    { label: 'ปลอดสาร', icon: '🌿' },
    { label: 'ทำจากวัตถุดิบธรรมชาติ', icon: '🌾' },
    { label: 'ทำสดใหม่', icon: '✨' },
    { label: 'เก็บได้นาน', icon: '📅' },
    { label: 'ราคาคุ้มค่า', icon: '💰' }
  ];

  // Selected media platform
  const [selectedMediaType, setSelectedMediaType] = useState<'poster' | 'facebook' | 'instagram' | 'tiktok'>('facebook');

  // AI copywriting outputs
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiCaption, setAiCaption] = useState<string>(`🌶️ น้ำพริกปลาร้าผัด สูตรคุณแม่ 🌶️

รสจัดจ้าน หอมกลิ่นปลาร้าแท้!
ทำจากวัตถุดิบคุณภาพ สดใหม่ สะอาด
ไม่ใส่สารกันบูด เก็บได้นานสุดคุ้ม

ทานคู่กับผักสด ข้าวเหนียว หรือข้าวสวยร้อนๆ อร่อยลงตัว ถูกใจแน่นอน! 😋

👉 อร่อย สะอาด ปลอดภัย
👉 แม่ค้าขายดีการันตีความอร่อย
👉 สั่งเลย! รับรองไม่ผิดหวัง`);

  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);

  // Reference to file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Swap sample products
  const handleSelectSample = (sample: typeof SAMPLE_PRODUCTS[0]) => {
    setProductName(sample.name);
    setProductDetails(sample.details);
    setUploadedImage(sample.image);
    setSelectedPoints(sample.points);
    setHeadline(sample.headline);
    setTagline(sample.tagline);
    setFooterText(sample.footerText);
    setPriceText(sample.price);
    setUnitText(sample.unit);
    setActiveTheme(sample.theme as any);
  };

  const handlePointToggle = (point: string) => {
    setSelectedPoints(prev => 
      prev.includes(point) ? prev.filter(p => p !== point) : [...prev, point]
    );
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Call the real Gemini API on the server to generate content!
  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: productName,
          productDescription: productDetails,
          tone: 'น่าเชื่อถือและดึงดูดใจ มีความสุขและพรีเมียม',
          platform: selectedMediaType === 'tiktok' ? 'TikTok Ads' : 'Facebook Ads',
          keywords: selectedPoints.join(', ')
        })
      });

      if (response.ok) {
        const data = await response.json();
        setHeadline(data.headline || productName);
        setTagline(data.subheading || 'สูตรพรีเมียม');
        setAiCaption(`${data.headline ? `✨ ${data.headline} ✨\n\n` : ''}${data.body}\n\n👉 ${data.callToAction}`);
      } else {
        // Fallback simulation in case API is not configured or fails
        simulateAIGeneration();
      }
    } catch (e) {
      simulateAIGeneration();
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateAIGeneration = () => {
    setTimeout(() => {
      // Create intelligent output based on inputs
      const rawName = productName.replace(/🌶️|🍵|🥐|🌟/g, '').trim();
      const capHeadline = rawName;
      setHeadline(capHeadline);
      setTagline(selectedPoints[0] ? `${selectedPoints[0]}สุดพิเศษ` : 'สูตรเด็ด');
      
      const bulletsStr = selectedPoints.map(p => `• ${p}พรีเมียม`).join('\n');
      const mockCaption = `⭐️ ${rawName} ⭐️

ยกระดับความอร่อยและสุขภาพดีเพื่อคุณโดยเฉพาะ!
${productDetails.split('\n').slice(0, 2).join('\n')}

คุณสมบัติพิเศษเด่นชัด:
${bulletsStr}

สัมผัสรสชาติอันสมบูรณ์แบบได้แล้ววันนี้ เหมาะสำหรับมอบเป็นของขวัญและรับประทานเองในครอบครัว! ❤️

👉 รับประกันคุณภาพชั้นยอด
👉 โปรโมชั่นเปิดตัวสุดคุ้ม ราคาเพียง ${priceText} เท่านั้น!
👉 สั่งซื้อคลิกเลยที่ Inbox ของเพจ!`;

      setAiCaption(mockCaption);
    }, 1000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(aiCaption);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Save project
  const handleSaveProject = () => {
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      title: productName || 'สื่อประชาสัมพันธ์ชิ้นใหม่',
      templateId: 'tmpl-custom',
      lastModified: new Date().toISOString().split('T')[0],
      width: selectedMediaType === 'tiktok' ? 1080 : 1200,
      height: selectedMediaType === 'tiktok' ? 1920 : 1200,
      bgGradient: activeTheme === 'amber' ? 'from-amber-950 via-slate-900 to-stone-900' :
                  activeTheme === 'emerald' ? 'from-emerald-950 via-slate-900 to-teal-950' :
                  activeTheme === 'rose' ? 'from-rose-950 via-slate-900 to-pink-950' : 'from-slate-950 via-slate-900 to-zinc-900',
      playsCount: Math.floor(Math.random() * 500) + 100,
      clicksCount: Math.floor(Math.random() * 50) + 10,
      conversionsCount: Math.floor(Math.random() * 5),
      elements: [
        { id: '1', type: 'text', content: headline, x: 50, y: 15 },
        { id: '2', type: 'text', content: tagline, x: 50, y: 30 }
      ]
    };
    setProjects(prev => [newProj, ...prev]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Mock download trigger
  const handleDownloadImage = () => {
    alert('🎨 กำลังส่งออกรูปภาพดีไซน์ความละเอียดสูงระดับ HD... ระบบประมวลผลเลเยอร์และเซฟไฟล์ลงในเครื่องของคุณสำเร็จเรียบร้อย!');
  };

  // Get CSS classes based on active theme
  const getThemeClasses = () => {
    switch (activeTheme) {
      case 'amber':
        return {
          bannerBg: 'from-amber-950 via-slate-900 to-stone-900',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/30',
          accentColor: 'bg-amber-500',
          subText: 'text-stone-300',
          badgeBg: 'bg-amber-600 text-white'
        };
      case 'emerald':
        return {
          bannerBg: 'from-emerald-950 via-slate-900 to-teal-950',
          textColor: 'text-emerald-300',
          borderColor: 'border-emerald-500/30',
          accentColor: 'bg-emerald-500',
          subText: 'text-emerald-100',
          badgeBg: 'bg-emerald-600 text-white'
        };
      case 'rose':
        return {
          bannerBg: 'from-rose-950 via-slate-900 to-pink-950',
          textColor: 'text-rose-300',
          borderColor: 'border-rose-500/30',
          accentColor: 'bg-rose-500',
          subText: 'text-pink-100',
          badgeBg: 'bg-rose-600 text-white'
        };
      case 'slate':
      default:
        return {
          bannerBg: 'from-slate-950 via-slate-900 to-stone-900',
          textColor: 'text-blue-400',
          borderColor: 'border-slate-500/30',
          accentColor: 'bg-indigo-500',
          subText: 'text-stone-300',
          badgeBg: 'bg-indigo-600 text-white'
        };
    }
  };

  const themeConfig = getThemeClasses();

  return (
    <div className="space-y-6 font-sans">
      
      {/* Sample products shortcut bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
        <span className="text-xs font-bold text-gray-400 flex items-center shrink-0">
          <Grid className="w-4 h-4 mr-1 text-indigo-500" />
          คลิกเลือกแบรนด์ตัวอย่าง เพื่อทดสอบความสะดวกแบบรวดเร็ว:
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRODUCTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className="text-xs bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-gray-200 px-3 py-1.5 rounded-xl transition-all font-medium flex items-center space-x-1"
            >
              <span>{sample.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 3 Column Layout from Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Column 1: Input & Upload (Span 4) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-5" id="product-input-card">
          <div className="flex items-center space-x-2 border-b border-gray-50 pb-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">
              1
            </span>
            <h2 className="text-sm sm:text-base font-bold text-gray-900">
              ระบุข้อมูลสินค้า <span className="text-gray-400 text-xs font-normal">(Input & Upload)</span>
            </h2>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                ชื่อสินค้า
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="เช่น น้ำพริกปลาร้าผัด สูตรคุณแม่"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none focus:bg-white transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                รายละเอียดสินค้า
              </label>
              <textarea
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                rows={4}
                placeholder="เช่น รสชาติจัดจ้าน หอมกลิ่นปลาร้าแท้ ไม่ใส่วัตถุกันเสีย ทานคู่กับผักสดและข้าวสวยร้อนๆ..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none focus:bg-white transition-all text-gray-800 resize-none leading-relaxed"
              />
            </div>

            {/* Upload Area */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                อัปโหลดรูปภาพสินค้า <span className="text-gray-400 font-normal">(ก่อนสร้าง)</span>
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                {uploadedImage && (
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img 
                      src={uploadedImage} 
                      alt="Original product" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-1.5 right-1.5 bg-black/60 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-black transition-all"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-500 bg-gray-50/50 hover:bg-indigo-50/10 cursor-pointer transition-all flex flex-col items-center justify-center p-3 text-center ${
                    uploadedImage ? '' : 'col-span-2 aspect-[2/1]'
                  }`}
                >
                  <Upload className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-[10px] font-bold text-indigo-600 block">คลิกหรือลากไฟล์ภาพสินค้า</span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">รองรับ JPG, PNG (สูงสุด 10MB)</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Selling Points Multi-Select */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                จุดเด่นสินค้า <span className="text-gray-400 font-normal">(เลือกได้หลายข้อ)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {pointsList.map((point) => {
                  const isActive = selectedPoints.includes(point.label);
                  return (
                    <button
                      key={point.label}
                      onClick={() => handlePointToggle(point.label)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-full border transition-all flex items-center space-x-1 font-medium ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span>{point.icon}</span>
                      <span>{point.label}</span>
                      {isActive && <Check className="w-3 h-3 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Type Selection */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                2. เลือกประเภทสื่อที่ต้องการ
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'poster', title: 'โปสเตอร์', desc: 'สำหรับป้ายประกาศ', size: '1080 x 1350 px', icon: '🖼️' },
                  { id: 'facebook', title: 'โพสต์ Facebook', desc: 'ขนาดมาตรฐาน', size: '1200 x 1200 px', icon: '👥' },
                  { id: 'instagram', title: 'โพสต์ Instagram', desc: 'รูปจัตุรัสลงฟีด', size: '1080 x 1080 px', icon: '📸' },
                  { id: 'tiktok', title: 'วิดีโอสั้น (TikTok)', desc: 'ขนาดแนวตั้งสมาร์ตโฟน', size: '1080 x 1920 px', icon: '🎵' }
                ].map((media) => {
                  const isActive = selectedMediaType === media.id;
                  return (
                    <button
                      key={media.id}
                      onClick={() => setSelectedMediaType(media.id as any)}
                      className={`p-2.5 rounded-2xl text-left border transition-all flex flex-col justify-between h-20 ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-600'
                          : 'border-gray-100 hover:bg-gray-50 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-sm">{media.icon}</span>
                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                        )}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-800 leading-none">{media.title}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5 leading-none">{media.size}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAIGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:brightness-105 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : 'animate-pulse'}`} />
              <span>{isGenerating ? 'กำลังประมวลผลด้วย AI...' : 'สร้างสื่อด้วย AI (Generate)'}</span>
            </button>
          </div>
        </div>

        {/* Column 2: Output & Result (Span 5) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-5" id="output-result-card">
          <div className="flex items-center justify-between border-b border-gray-50 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                2
              </span>
              <h2 className="text-sm sm:text-base font-bold text-gray-900">
                ผลลัพธ์ที่ AI สร้าง <span className="text-gray-400 text-xs font-normal">(Output & Result)</span>
              </h2>
            </div>

            <div className="flex space-x-1.5">
              <button 
                onClick={handleAIGenerate}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all text-xs flex items-center space-x-1"
                title="รีเฟรชการสร้างใหม่"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold">รีเฟรช</span>
              </button>
              <button 
                onClick={simulateAIGeneration}
                className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-all text-xs flex items-center space-x-1"
                title="สุ่มดีไซน์อื่นๆ"
              >
                <Sparkle className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold">สร้างใหม่</span>
              </button>
            </div>
          </div>

          {/* Sizing Indicator & Active Editing */}
          <div className="flex justify-between items-center text-[10px] bg-indigo-50/50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100/50">
            <span className="font-medium">📐 รูปแบบ: {selectedMediaType.toUpperCase()}</span>
            <button 
              onClick={() => setShowEditPanel(!showEditPanel)}
              className="font-bold flex items-center space-x-1 hover:underline"
            >
              <Sliders className="w-3 h-3" />
              <span>{showEditPanel ? 'ปิดเครื่องมือปรับแต่ง' : '🔧 ปรับแต่งข้อความด่วน'}</span>
            </button>
          </div>

          {/* Quick Edit Panel Overlay */}
          <AnimatePresence>
            {showEditPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-50 p-3 rounded-2xl border border-gray-100 space-y-3 overflow-hidden text-xs"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 mb-0.5">พาดหัวหลักบนรูปภาพ</label>
                    <input 
                      type="text" 
                      value={headline} 
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 mb-0.5">สโลแกนประกอบ (แท็กไลน์)</label>
                    <input 
                      type="text" 
                      value={tagline} 
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 mb-0.5">ราคาขาย</label>
                    <input 
                      type="text" 
                      value={priceText} 
                      onChange={(e) => setPriceText(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 mb-0.5">หน่วยสินค้า</label>
                    <input 
                      type="text" 
                      value={unitText} 
                      onChange={(e) => setUnitText(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-500 mb-0.5">เฉดสีธีมโฆษณา</label>
                    <select 
                      value={activeTheme} 
                      onChange={(e: any) => setActiveTheme(e.target.value)}
                      className="w-full bg-white p-2 rounded-lg border border-gray-200"
                    >
                      <option value="amber">Amber Gold</option>
                      <option value="emerald">Royal Emerald</option>
                      <option value="rose">Velvet Rose</option>
                      <option value="slate">Classic Dark</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-500 mb-0.5">แบนเนอร์ด้านล่างสุด</label>
                  <input 
                    type="text" 
                    value={footerText} 
                    onChange={(e) => setFooterText(e.target.value)}
                    className="w-full bg-white p-2 rounded-lg border border-gray-200"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comparison Container */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-2 items-center">
            
            {/* Before */}
            <div className="md:col-span-5 space-y-1">
              <span className="text-[10px] text-gray-400 font-bold block text-center">ก่อนสร้าง (รูปสินค้าเดิม)</span>
              <div className="aspect-[4/3] rounded-2xl border border-gray-100 bg-slate-50 overflow-hidden relative">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Original" 
                    className="w-full h-full object-cover grayscale opacity-80"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    ไม่มีรูปภาพ
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-slate-900/70 text-slate-200 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                  Original Image
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="md:col-span-1 flex justify-center text-indigo-500 transform rotate-90 md:rotate-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* After (The Gorgeous AI Built Canvas) */}
            <div className="md:col-span-5 space-y-1">
              <span className="text-[10px] text-gray-400 font-bold block text-center">หลังสร้าง (สื่อที่ AI สร้าง)</span>
              <div 
                id="exportable-ai-canvas"
                className={`aspect-[4/3] rounded-2xl bg-gradient-to-tr ${themeConfig.bannerBg} p-3.5 text-white flex flex-col justify-between border ${themeConfig.borderColor} relative overflow-hidden shadow-xl transition-all duration-500`}
              >
                
                {/* Backlighting effect */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                
                {/* 1. Header label banner */}
                <div className="flex justify-between items-start z-10">
                  <span className="bg-white/10 text-white border border-white/20 text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-xs">
                    ★ {tagline || 'BEST SELLER'} ★
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="bg-amber-400 text-slate-950 text-[7px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                      Premium
                    </span>
                  </div>
                </div>

                {/* 2. Middle area with masked product image and checklists */}
                <div className="my-auto self-center flex items-center justify-between w-full gap-2 z-10">
                  {/* Photo with beautiful ring border */}
                  <div className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-md overflow-hidden bg-white/10 shrink-0 relative">
                    {uploadedImage ? (
                      <img 
                        src={uploadedImage} 
                        alt="Product visual" 
                        className="w-full h-full object-cover scale-110 hover:scale-125 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-white/50">
                        🛍️
                      </div>
                    )}
                    <div className={`absolute bottom-0 inset-x-0 h-4 ${themeConfig.accentColor}/80 text-[8px] text-center font-bold flex items-center justify-center`}>
                      อร่อยชัวร์
                    </div>
                  </div>

                  {/* Checklist on the right side of picture */}
                  <div className="flex-grow space-y-1 text-left pl-1">
                    {selectedPoints.slice(0, 4).map((pt, i) => (
                      <div key={i} className="flex items-center space-x-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/10 w-fit">
                        <span className="text-emerald-400 text-[8px]">✓</span>
                        <span className="text-[9px] font-semibold text-white/90 leading-tight truncate max-w-[80px]">
                          {pt}
                        </span>
                      </div>
                    ))}
                    {selectedPoints.length === 0 && (
                      <div className="text-[9px] text-white/60 italic">เลือกจุดเด่นสินค้า...</div>
                    )}
                  </div>

                  {/* Red/Yellow Badge circle */}
                  {priceText && (
                    <div className="w-12 h-12 rounded-full bg-rose-600 border border-white/30 flex flex-col items-center justify-center text-center shadow-lg transform rotate-3 shrink-0">
                      <span className="text-[7px] text-rose-100 font-bold uppercase leading-none">ราคาเพียง</span>
                      <span className="text-xs font-black text-yellow-300 leading-none my-0.5">{priceText}</span>
                      <span className="text-[7px] text-white leading-none font-medium">{unitText}</span>
                    </div>
                  )}
                </div>

                {/* 3. Footer slogan display */}
                <div className="space-y-1 text-center z-10 pt-1 border-t border-white/5">
                  <h3 className={`text-xs font-bold leading-tight filter drop-shadow-md tracking-tight ${themeConfig.textColor}`}>
                    "{headline || productName.replace(/🌶️|🍵|🥐|🌟/g, '').trim()}"
                  </h3>
                  <p className="text-[8px] text-white/70 truncate px-1 bg-black/20 py-0.5 rounded-full max-w-[200px] mx-auto">
                    {footerText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Big Action buttons under canvas */}
          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <button
              onClick={handleDownloadImage}
              className="py-3 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold rounded-2xl transition-all flex items-center justify-center space-x-1.5"
            >
              <Download className="w-4 h-4 text-gray-500" />
              <span>ดาวน์โหลด</span>
            </button>
            <button
              onClick={handleSaveProject}
              className="py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-2xl transition-all flex items-center justify-center space-x-1.5 border border-indigo-100"
            >
              <Save className="w-4 h-4 text-indigo-600" />
              <span>{saveSuccess ? 'บันทึกแล้ว!' : 'บันทึกผลงาน'}</span>
            </button>
            <button
              onClick={() => {
                setShowEditPanel(true);
                // Scroll up slightly to show edit panel
                document.getElementById('output-result-card')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold rounded-2xl transition-all flex items-center justify-center space-x-1.5"
            >
              <Sliders className="w-4 h-4 text-gray-500" />
              <span>แก้ไขเพิ่มเติม</span>
            </button>
          </div>

          {/* Share on platforms bar */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
              แชร์ไปยังแพลตฟอร์ม
            </span>
            <div className="grid grid-cols-4 gap-2">
              <button 
                onClick={() => alert('🔗 ลิงก์เชื่อมบัญชี Facebook เรียบร้อย! ดำเนินการโพสต์คอนเทนต์ลงกลุ่มสำเร็จ')}
                className="py-2 px-1 bg-blue-50 hover:bg-blue-100/70 border border-blue-100 rounded-xl text-[11px] font-semibold text-blue-800 transition-all flex items-center justify-center space-x-1"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button 
                onClick={() => alert('🔗 อัปโหลดรูปแบบสื่อโฆษณาขึ้นฟีด Instagram ของร้านค้าสำเร็จ')}
                className="py-2 px-1 bg-pink-50 hover:bg-pink-100/70 border border-pink-100 rounded-xl text-[11px] font-semibold text-pink-800 transition-all flex items-center justify-center space-x-1"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span className="hidden sm:inline">Instagram</span>
              </button>
              <button 
                onClick={() => alert('🔗 นำเข้าเทมเพลตและคลิปเข้าสตูดิโอสร้างคอนเทนต์สำหรับ TikTok สำเร็จ')}
                className="py-2 px-1 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl text-[11px] font-semibold text-stone-800 transition-all flex items-center justify-center space-x-1"
              >
                <span>🎵</span>
                <span className="hidden sm:inline">TikTok</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(aiCaption + '\n\n' + headline);
                  alert('🔗 คัดลอกข้อความและลิงก์ดีไซน์สำหรับแชร์สำเร็จ!');
                }}
                className="py-2 px-1 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl text-[11px] font-semibold text-indigo-800 transition-all flex items-center justify-center space-x-1"
              >
                <span>•••</span>
                <span className="hidden sm:inline">อื่นๆ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: AI PR Copywriting (Span 3) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex flex-col justify-between h-full min-h-[580px]" id="ai-pr-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-indigo-600 animate-pulse" />
                ข้อความประชาสัมพันธ์ <span className="text-indigo-600 font-bold ml-1 text-xs">(AI)</span>
              </h2>

              <button
                onClick={handleCopyCaption}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-1.5 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg"
              >
                {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copySuccess ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
              </button>
            </div>

            {/* Simulated Live Output Container */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-gray-100/70 text-xs text-gray-700 leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-line font-medium">
              {aiCaption}
            </div>

            {/* Recommended size specifications */}
            <div className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100 text-[11px] space-y-2">
              <span className="font-bold text-gray-500 block uppercase tracking-wider text-[10px]">
                ขนาดที่แนะนำสำหรับช่องทางต่างๆ
              </span>
              <div className="grid grid-cols-1 gap-1 font-medium text-gray-600">
                <div className="flex justify-between">
                  <span>🖼️ โปสเตอร์:</span>
                  <span className="font-bold text-gray-800">1080 x 1350 px (แนวตั้ง)</span>
                </div>
                <div className="flex justify-between">
                  <span>👥 Facebook:</span>
                  <span className="font-bold text-gray-800">1200 x 1200 px (1:1)</span>
                </div>
                <div className="flex justify-between">
                  <span>📸 Instagram:</span>
                  <span className="font-bold text-gray-800">1080 x 1080 px (1:1)</span>
                </div>
                <div className="flex justify-between">
                  <span>🎵 วิดีโอสั้น (TikTok):</span>
                  <span className="font-bold text-gray-800">1080 x 1920 px (9:16)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase / Production Button */}
          <div className="pt-4 border-t border-gray-50 mt-4">
            <button
              onClick={() => alert('🖨️ กำลังพาคุณไปยัง Ezgen Print Studio! เลือกกระดาษ/กล่องบรรจุภัณฑ์ หรือสติ๊กเกอร์แบรนด์เพื่อสั่งผลิตสิ่งพิมพ์คุณภาพเยี่ม')}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-105 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 transition-all flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>พิมพ์ / สั่งผลิต</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer hint message from image */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-100 rounded-2xl p-3 flex items-center space-x-2.5 text-xs text-indigo-800">
        <span className="text-base">💡</span>
        <p className="font-medium">
          <strong>เคล็ดลับ:</strong> ข้อมูลสินค้าที่ละเอียด จะช่วยให้ AI สร้างสื่อได้ตรงใจและน่าสนใจมากยิ่งขึ้น รวมถึงเลือกเฉดสีแบรนด์ได้ดีที่สุด!
        </p>
      </div>

    </div>
  );
}
