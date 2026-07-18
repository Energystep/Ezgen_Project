import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Sparkles, 
  Layers, 
  Grid, 
  Package, 
  Sliders, 
  HelpCircle, 
  Bell, 
  User, 
  Star, 
  ArrowRight, 
  TrendingUp, 
  Sparkle,
  Image as ImageIcon,
  BookOpen,
  Printer,
  ChevronRight
} from 'lucide-react';
import CreateAdAI from './components/CreateAdAI';
import MyProducts from './components/MyProducts';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import TemplateLibrary from './components/TemplateLibrary';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import CostStructure from './components/CostStructure';
import PromptChatbot from './components/PromptChatbot';
import { Page, Project, AdTemplate } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('editor'); // Default to AI Creator like in the user's uploaded image!
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Premium subscription state connected to localStorage
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem('EZGEN_IS_PREMIUM') === 'true';
  });

  const handleUpgradePremium = (status: boolean) => {
    setIsPremium(status);
    localStorage.setItem('EZGEN_IS_PREMIUM', String(status));
  };

  // High-value pre-populated projects with real statistics
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj-1',
      title: 'น้ำพริกปลาร้าผัด สูตรคุณแม่ 🌶️',
      templateId: 'tmpl-custom',
      lastModified: '2026-07-01',
      width: 1200,
      height: 1200,
      bgGradient: 'from-amber-950 via-slate-900 to-stone-900',
      playsCount: 15400,
      clicksCount: 680,
      conversionsCount: 42,
      elements: []
    },
    {
      id: 'proj-2',
      title: 'ชาเขียวมัทฉะเกียวโตพรีเมียม 🍵',
      templateId: 'tmpl-custom',
      lastModified: '2026-06-28',
      width: 1200,
      height: 1200,
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      playsCount: 9800,
      clicksCount: 410,
      conversionsCount: 28,
      elements: []
    }
  ]);

  // Product selection buffer from My Products -> Creator
  const [productBuffer, setProductBuffer] = useState<{
    name: string;
    details: string;
    image: string;
    price: string;
    unit: string;
  } | null>(null);

  const handleSelectProductToCreate = (prod: { name: string; details: string; image: string; price: string; unit: string }) => {
    setProductBuffer(prod);
    setCurrentPage('editor');
  };

  const handleNewProject = () => {
    setSelectedProject(null);
    setProductBuffer(null);
    setCurrentPage('editor');
  };

  const handleSelectTemplate = (template: AdTemplate) => {
    const newProject: Project = {
      id: 'proj-' + Date.now(),
      title: `ชิ้นงานออกแบบ: ${template.title}`,
      templateId: template.id,
      lastModified: new Date().toISOString().split('T')[0],
      width: template.width,
      height: template.height,
      bgGradient: template.bgGradient,
      elements: JSON.parse(JSON.stringify(template.elements)),
      playsCount: 0,
      clicksCount: 0,
      conversionsCount: 0
    };

    setProjects(prev => [newProject, ...prev]);
    setSelectedProject(newProject);
    setCurrentPage('editor');
  };

  // Modern Navigation Sidebar Items
  const sidebarItems = [
    { id: 'home', label: 'หน้าหลัก', icon: HomeIcon },
    { id: 'editor', label: 'สร้างสื่อด้วย AI', icon: Sparkles },
    { id: 'chatbot', label: 'แชทบอทคิดพร้อมท์', icon: HelpCircle },
    { id: 'dashboard', label: 'จัดการโพสต์ & แดชบอร์ด', icon: Layers },
    { id: 'templates', label: 'ประวัติผลงาน', icon: Grid },
    { id: 'products', label: 'สินค้าของฉัน', icon: Package },
    { id: 'settings', label: 'ตั้งค่า', icon: Sliders },
  ] as const;

  // Custom high-converting merchant home dashboard (satisfies "หน้าหลัก" and keeps it clean/non-confusing)
  const renderHomeDashboard = () => {
    const totalImpressions = projects.reduce((acc, p) => acc + (p.playsCount || 0), 25200);
    const totalClicks = projects.reduce((acc, p) => acc + (p.clicksCount || 0), 1090);
    const totalConversions = projects.reduce((acc, p) => acc + (p.conversionsCount || 0), 70);
    const ctr = ((totalClicks / totalImpressions) * 100).toFixed(1);

    return (
      <div className="space-y-6 font-sans">
        
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-indigo-500/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              ✦ คลื่นลูกใหม่ในการโฆษณา ✦
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              ปลดล็อกยอดขายให้ปัง ด้วยโฆษณาระดับมือโปร
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-lg leading-relaxed">
              ยินดีต้อนรับกลับมา! ออกแบบรูปแบนเนอร์สินค้าและสร้างสโลแกนเด็ดๆ ทันใจด้วยระบบ AI อัจฉริยะที่ง่ายที่สุด จัดสรรหมวดหมู่อย่างเป็นระเบียบ คุมสีสวยสะกดใจแน่นอน
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('editor')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold px-6 py-3 rounded-2xl hover:brightness-105 transition-all text-xs flex items-center space-x-1.5 shadow-lg shadow-orange-500/10"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>ไปที่เมนูสร้างสื่อทันที</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">ยอดผู้เข้าชมสื่อ (Impressions)</span>
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs">👁️</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 font-mono">{totalImpressions.toLocaleString()}</h3>
            <p className="text-[10px] text-emerald-600 font-bold">▲ +12% สัปดาห์นี้</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">จำนวนการคลิกแอด (Clicks)</span>
              <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs">🖱️</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 font-mono">{totalClicks.toLocaleString()}</h3>
            <p className="text-[10px] text-emerald-600 font-bold">▲ +8% จากเมื่อวาน</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">อัตราการคลิกโฆษณา (CTR)</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs">📈</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 font-mono">{ctr}%</h3>
            <p className="text-[10px] text-indigo-600 font-bold">★ มาตรฐานสากลระดับพรีเมียม</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-bold uppercase tracking-wider">ออเดอร์ปิดการขาย (Conversions)</span>
              <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs">🛒</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 font-mono">{totalConversions}</h3>
            <p className="text-[10px] text-rose-600 font-bold">▲ มีความคุ้มค่า ROI สูงสุด</p>
          </div>
        </div>

        {/* Quick Launch & Helpful tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent saved projects */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center justify-between">
              <span>📂 ผลงานล่าสุดของคุณ</span>
              <button onClick={() => setCurrentPage('dashboard')} className="text-xs text-indigo-600 hover:underline">ดูทั้งหมด</button>
            </h3>
            <div className="space-y-3">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-100 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg">
                      {proj.title.includes('พริก') ? '🌶️' : proj.title.includes('ชา') ? '🍵' : '🛍️'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 truncate max-w-[150px] sm:max-w-xs">{proj.title}</h4>
                      <p className="text-[9px] text-gray-400">แก้ไขล่าสุด: {proj.lastModified}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="p-1 text-gray-400 hover:text-indigo-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Educational tips */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center justify-between">
              <span>💡 แหล่งเรียนรู้ระดับพรีเมียม (Ezgen Academy)</span>
              <button onClick={() => setCurrentPage('blog')} className="text-xs text-indigo-600 hover:underline">อ่านบทความ</button>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/30 rounded-2xl border border-amber-100/50 flex space-x-2.5">
                <span className="text-lg">📈</span>
                <div>
                  <h4 className="font-bold text-gray-800">5 วิธีถ่ายรูปสินค้าด้วยมือถือให้หรูหรา</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">คุมแสงธรรมชาติและวางมุมให้มีคลาสแบบไม่ต้องจ้างตากล้อง</p>
                </div>
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-2xl border border-emerald-100/50 flex space-x-2.5">
                <span className="text-lg">✍️</span>
                <div>
                  <h4 className="font-bold text-gray-800">สูตรการเขียนพาดหัว (Headline) ให้คนกดไลก์</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">กระตุ้นความสนใจใน 3 วินาทีแรกด้วยหลักจิตวิทยา</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  // Switch between other pages
  const renderActiveTabContent = () => {
    switch (currentPage) {
      case 'home':
        return renderHomeDashboard();
      case 'editor':
        return (
          <CreateAdAI 
            projects={projects}
            setProjects={setProjects}
            setCurrentPage={setCurrentPage}
            setSelectedProject={setSelectedProject}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            projects={projects}
            setProjects={setProjects}
            setCurrentPage={setCurrentPage}
            setSelectedProject={setSelectedProject}
            onNewProject={handleNewProject}
          />
        );
      case 'templates':
        return (
          <TemplateLibrary 
            onSelectTemplate={handleSelectTemplate} 
            setCurrentPage={setCurrentPage} 
          />
        );
      case 'products':
        return (
          <MyProducts 
            setCurrentPage={setCurrentPage}
            onSelectProductToCreate={handleSelectProductToCreate}
          />
        );
      case 'settings':
        return (
          <Settings setCurrentPage={setCurrentPage} />
        );
      case 'chatbot':
        return (
          <PromptChatbot setCurrentPage={setCurrentPage} />
        );
      case 'pricing':
      case 'cost':
        return (
          <CostStructure isPremium={isPremium} setIsPremium={handleUpgradePremium} />
        );
      case 'blog':
        return (
          <Blog />
        );
      default:
        return renderHomeDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EBF1F6] text-gray-800 selection:bg-indigo-600 selection:text-white font-sans" id="applet-viewport-root">
      
      {/* 1. Left Sidebar - Recreated to look exactly like the uploaded image */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 hidden md:flex" id="left-sidebar-navigation">
        <div className="p-5 space-y-6">
          {/* Logo & Brand title */}
          <div className="space-y-1 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                EZgen
              </span>
              <span className="text-xl text-indigo-600 animate-pulse">✦</span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold leading-none tracking-wide">
              AI สร้างสื่อประชาสัมพันธ์ให้ง่าย แค่บอกเรา
            </p>
          </div>

          {/* Nav items list */}
          <nav className="space-y-1.5 pt-2" id="sidebar-nav-container">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (item.id === 'editor') handleNewProject();
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#5c3df5] text-white shadow-md shadow-indigo-100'
                      : 'text-gray-500 hover:bg-slate-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white font-bold' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Lower Sidebar components */}
        <div className="p-4 space-y-4">
          
          {/* Premium Package Promotion Panel */}
          {isPremium ? (
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-indigo-500/10 border-2 border-amber-400/40 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-xs">
              <div className="absolute -right-2 -top-2 w-12 h-12 bg-amber-400/20 rounded-full blur-xl"></div>
              <div className="flex items-center space-x-1.5 relative z-10">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span className="text-xs font-black text-amber-950 uppercase tracking-tight">SME Pro Active 👑</span>
              </div>
              <div className="text-[10px] text-slate-700 leading-normal font-medium space-y-1 relative z-10">
                <p className="font-bold flex items-center text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping"></span>
                  เปิดใช้งานโหมดไม่จำกัด
                </p>
                <p className="text-gray-500 font-normal">ระบบลบภาพ & AI สโลแกนพร้อม!</p>
              </div>
              <button
                onClick={() => setCurrentPage('cost')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] transition-all relative z-10 shadow-xs"
              >
                จัดการแพ็กเกจพรีเมียม
              </button>
            </div>
          ) : (
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 space-y-3">
              <div className="flex items-center space-x-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-900 uppercase">แพ็กเกจพรีเมียม</span>
              </div>
              <div className="text-[10px] text-amber-800 leading-normal font-medium space-y-0.5">
                <p>ใช้ฟรี 5 ครั้ง / วัน</p>
                <p className="text-gray-400 font-normal">อัปเกรดเพื่อสร้างได้ไม่จำกัด</p>
              </div>
              <button
                onClick={() => setCurrentPage('cost')}
                className="w-full py-2 bg-gradient-to-r from-[#5c3df5] to-indigo-700 hover:brightness-105 text-white font-bold rounded-xl text-[10px] shadow-sm shadow-indigo-100 transition-all"
              >
                รับเทมเพลตพิเศษ
              </button>
            </div>
          )}

          {/* Cute robot assistant illustration */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl shadow-inner shrink-0 animate-bounce">
              🤖
            </div>
            <p className="text-[9px] text-gray-500 leading-normal font-bold">
              EZgen ช่วยให้การทำสื่อ เป็นเรื่องง่ายสำหรับคุณ ✨
            </p>
          </div>
        </div>
      </aside>

      {/* 2. Right Content Block */}
      <div className="flex-grow flex flex-col min-w-0" id="right-content-wrapper">
        
        {/* Top Header - Matches the layout in the image exactly */}
        <header className="bg-white border-b border-gray-100 py-3 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 shadow-xs">
          
          {/* Welcome block */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shadow-xs">
              🍊
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                สวัสดี แม่ค้าขายดี! 👋
              </h2>
              <p className="text-[10px] text-gray-400 font-bold leading-normal mt-0.5">
                EZgen AI ช่วยคุณสร้างสื่อประชาสัมพันธ์ที่สวยปัง ดึงดูดลูกค้า เพิ่มยอดขาย
              </p>
            </div>
          </div>

          {/* Right action controls */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            
            {/* Minimal Mobile Navigation Switcher (for small screens) */}
            <div className="md:hidden">
              <select 
                value={currentPage} 
                onChange={(e) => setCurrentPage(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 p-2 rounded-xl text-xs font-bold focus:outline-none"
              >
                {sidebarItems.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => alert('📞 ฝ่ายสนับสนุนทางเทคนิค Ezgen ยินดีให้บริการ! ติดต่อได้ที่ support@ezgen.ai')}
                className="text-xs text-gray-400 hover:text-indigo-600 transition-all flex items-center space-x-1 font-semibold"
              >
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <span className="hidden sm:inline">ช่วยเหลือ</span>
              </button>

              {/* Notification bell */}
              <button 
                onClick={() => alert('🔔 ไม่มีแจ้งเตือนใหม่ในระบบตอนนี้')}
                className="relative p-1 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-all"
              >
                <Bell className="w-4.5 h-4.5 text-gray-400" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              </button>

              {/* User Avatar & name */}
              <div 
                onClick={() => setCurrentPage('settings')}
                className="flex items-center space-x-2 pl-3 border-l border-gray-100 cursor-pointer hover:opacity-85 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-300 flex items-center justify-center text-sm shadow-inner relative">
                  👩‍💼
                  {isPremium && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold border border-white">
                      ⭐
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="flex items-center space-x-1.5">
                    <p className="text-[10px] font-bold text-gray-800 leading-none">แม่ค้าขายดี ▾</p>
                    {isPremium && (
                      <span className="text-[8px] bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-1.5 py-0.5 rounded-sm">
                        PRO
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* View Templates shortcut button from image */}
              <button
                onClick={() => setCurrentPage('templates')}
                className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold transition-all text-xs flex items-center space-x-1.5"
              >
                <Grid className="w-3.5 h-3.5 text-indigo-600" />
                <span>ดูตัวอย่างเทมเพลต</span>
              </button>
            </div>

          </div>

        </header>

        {/* Dynamic page router body */}
        <main className="flex-grow p-6 overflow-y-auto max-w-[1400px] w-full mx-auto" id="main-scrollable-content">
          {renderActiveTabContent()}
        </main>

      </div>

    </div>
  );
}
