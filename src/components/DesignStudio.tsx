import React, { useState } from 'react';
import { Page, Project, AdTemplate, AdElement } from '../types';
import { Sparkles, Save, Download, Upload, Type, ArrowLeft, Trash2, Sliders, ChevronDown, Check, RefreshCw, Layers, Copy, HelpCircle } from 'lucide-react';

interface DesignStudioProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentPage: (page: Page) => void;
}

export default function DesignStudio({ 
  selectedProject, 
  setSelectedProject, 
  projects, 
  setProjects, 
  setCurrentPage 
}: DesignStudioProps) {
  
  // Choose initial background or element states
  const defaultBg = 'from-indigo-600 via-blue-600 to-indigo-800';
  const defaultElements: AdElement[] = [
    { id: 'tx-1', type: 'text', content: 'สโลแกนโฆษณาของคุณที่นี่', x: 50, y: 15, fontSize: 32, color: '#ffffff', fontWeight: 'bold' },
    { id: 'tx-2', type: 'text', content: 'คำบรรยายเพิ่มเติมเกี่ยวกับสินค้า', x: 50, y: 30, fontSize: 16, color: '#e2e8f0' },
    { id: 'img-1', type: 'sticker', content: '🛍️', x: 50, y: 55, fontSize: 64 },
    { id: 'tx-3', type: 'text', content: 'ทักแชทสอบถามสิทธิพิเศษจำกัดด่วน!', x: 50, y: 85, fontSize: 18, color: '#facc15', fontWeight: 'bold' }
  ];

  // Initialize editor states based on active selected project
  const [projectId, setProjectId] = useState(selectedProject?.id || 'proj-' + Date.now());
  const [projectTitle, setProjectTitle] = useState(selectedProject?.title || 'แคมเปญโฆษณาขายดีประจำสัปดาห์');
  const [canvasBg, setCanvasBg] = useState(selectedProject?.bgGradient || defaultBg);
  const [elements, setElements] = useState<AdElement[]>(selectedProject?.elements || defaultElements);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(elements[0]?.id || null);

  // Editor Sidebar tabs
  const [activeTab, setActiveTab] = useState<'ai' | 'text' | 'upload' | 'bg'>('ai');

  // AI Assistant states
  const [businessName, setBusinessName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedTone, setSelectedTone] = useState('สนุกสนานสะดุดตาเป็นกันเอง');
  const [selectedPlatform, setSelectedPlatform] = useState('Facebook Ads');
  const [keywords, setKeywords] = useState('');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [aiGeneratedCaption, setAiGeneratedCaption] = useState<any | null>(null);

  // Copy success feedback
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgRemoveOutcome, setBgRemoveOutcome] = useState('');

  // Sizing indicators
  const [aspectW, setAspectW] = useState(selectedProject?.width || 1080);
  const [aspectH, setAspectH] = useState(selectedProject?.height || 1080);

  // Palette array to style background easily
  const bgPalettes = [
    { label: 'Indigo Horizon', grad: 'from-indigo-600 via-blue-600 to-indigo-800' },
    { label: 'Deep Amber', grad: 'from-amber-900 via-amber-950 to-stone-900' },
    { label: 'Velvet Rose', grad: 'from-rose-500 via-pink-600 to-rose-800' },
    { label: 'Forest Mint', grad: 'from-emerald-800 via-teal-900 to-slate-900' },
    { label: 'Midnight Ocean', grad: 'from-slate-900 via-zinc-900 to-slate-950' },
    { label: 'Neon Cyber', grad: 'from-violet-800 via-purple-900 to-zinc-950' },
    { label: 'Lemon Sunshine', grad: 'from-pink-100 via-rose-100 to-amber-50' }
  ];

  // Colors available for individual text layers
  const textColors = ['#ffffff', '#000000', '#fef08a', '#fb923c', '#fdba74', '#93c5fd', '#34d399', '#f87171'];

  // Handle Gemini Copy Generator Call
  const handleAIGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !productDescription.trim()) {
      alert('โปรดกรอกชื่อธุรกิจและรายละเอียดสินค้า เพื่อให้ AI ประมวณผลได้แม่นยำที่สุด');
      return;
    }

    setIsGeneratingCopy(true);
    setAiGeneratedCaption(null);

    try {
      const response = await fetch('/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          productDescription,
          tone: selectedTone,
          platform: selectedPlatform,
          keywords
        })
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการเรียกโครงข่าย AI ปล่อยภัย');
      }

      const data = await response.json();
      setAiGeneratedCaption(data);
    } catch (err: any) {
      console.error(err);
      alert('ไม่สามารถประมวลผลคำโฆษณาได้ในขณะนี้ โปรดตรวจสอบการตั้งค่าคีย์หรือลองอีกครั้ง');
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  // Click handler to apply AI slogan directly onto canvas
  const handleApplyAISlogan = () => {
    if (!aiGeneratedCaption) return;

    setElements(prev => {
      return prev.map(el => {
        // Apply Headline to element 1 (assuming it represents the slogan)
        if (el.id === 'tx-1') {
          return { ...el, content: aiGeneratedCaption.headline };
        }
        // Apply subheading to element 2
        if (el.id === 'tx-2') {
          return { ...el, content: aiGeneratedCaption.subheading };
        }
        // Apply call to action
        if (el.id === 'tx-3') {
          return { ...el, content: aiGeneratedCaption.callToAction };
        }
        return el;
      });
    });

    alert('ประยุกต์ใช้ข้อความพาดหัวโฆษณา AI ลงสู่แบนเนอร์เรียบร้อยแล้ว');
  };

  // Copy Full Post Caption text
  const handleCopyCaption = () => {
    if (!aiGeneratedCaption?.body) return;
    navigator.clipboard.writeText(aiGeneratedCaption.body);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Upload Photo action
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const newImgElement: AdElement = {
        id: 'user-img-' + Date.now(),
        type: 'image',
        content: base64Data,
        x: 50,
        y: 60,
        width: 120,
        height: 120
      };
      setElements(prev => [...prev, newImgElement]);
      setSelectedElementId(newImgElement.id);
    };
    reader.readAsDataURL(file);
  };

  // Simulated AI Background remover
  const handleMockBgRemoval = () => {
    const userImg = elements.find(el => el.type === 'image');
    if (!userImg) {
      alert('โปรดอัปโหลดรูปภาพสินค้าเพื่อดำเนินการลบพื้นหลังด้วย AI');
      return;
    }

    setIsRemovingBg(true);
    setBgRemoveOutcome('');
    
    setTimeout(() => {
      setIsRemovingBg(false);
      setBgRemoveOutcome('ลบพื้นหลัง (Background Removal) เสร็จสมบูรณ์ คืนค่าขอบรอบสินค้าเรียบร้อย!');
    }, 2500);
  };

  // Text modification helpers
  const handleUpdateTextValue = (val: string) => {
    setElements(prev => prev.map(el => el.id === selectedElementId ? { ...el, content: val } : el));
  };

  const handleUpdateTextSize = (size: number) => {
    setElements(prev => prev.map(el => el.id === selectedElementId ? { ...el, fontSize: size } : el));
  };

  const handleUpdateTextColor = (color: string) => {
    setElements(prev => prev.map(el => el.id === selectedElementId ? { ...el, color: color } : el));
  };

  const handleUpdateCoodinate = (axis: 'x' | 'y', val: number) => {
    setElements(prev => prev.map(el => el.id === selectedElementId ? { ...el, [axis]: val } : el));
  };

  const handleDeleteElement = (id: string) => {
    if (elements.length <= 1) {
      alert('ไม่สามารถลบทั้งหมดได้ ต้องมีองค์ประกอบแบนเนอร์อย่างน้อย 1 ชิ้น');
      return;
    }
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElementId(elements.find(el => el.id !== id)?.id || null);
  };

  const handleAddNewText = () => {
    const newEl: AdElement = {
      id: 'tx-new-' + Date.now(),
      type: 'text',
      content: 'ข้อความใหม่ที่คุณใส่',
      x: 50,
      y: 50,
      fontSize: 20,
      color: '#ffffff'
    };
    setElements(prev => [...prev, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Save changes to database state
  const handleSaveProject = () => {
    const currentProjectData: Project = {
      id: projectId,
      title: projectTitle,
      templateId: selectedProject?.templateId || 'tmpl-custom',
      lastModified: new Date().toISOString(),
      width: aspectW,
      height: aspectH,
      bgGradient: canvasBg,
      elements: elements,
      playsCount: selectedProject?.playsCount || Math.floor(Math.random() * 2000) + 100,
      clicksCount: selectedProject?.clicksCount || Math.floor(Math.random() * 200) + 10,
      conversionsCount: selectedProject?.conversionsCount || Math.floor(Math.random() * 20) + 1,
    };

    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === projectId);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = currentProjectData;
        return copy;
      } else {
        return [currentProjectData, ...prev];
      }
    });

    alert('บันทึกคำแก้ไของค์ประกอบสื่อโฆษณาเรียบร้อยแล้ว! สามารถดาวน์โหลดหรือวางแผนงบแคมเปญต่อได้เลย');
  };

  // Simulate HD Download
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownloadTrigger = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('ดาวน์โหลดไฟล์จัดทำแบนเนอร์ HD โทรโฟลเดอร์เสร็จสิ้น! บันทึกในพอร์ตของคุณเรียบร้อย');
    }, 2000);
  };

  const activeElementObj = elements.find(el => el.id === selectedElementId);

  return (
    <div className="bg-slate-50 min-h-screen py-6 font-sans" id="design-studio-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Controls bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-3xl border border-gray-150 shadow-xs" id="top-control-bar">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setSelectedProject(null);
                setCurrentPage('dashboard');
              }}
              className="p-2 sm:p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-gray-150"
              title="กลับแผงควบคุม"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="space-y-1">
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="text-base sm:text-lg font-bold text-gray-800 focus:outline-none focus:border-b focus:border-blue-500 bg-transparent py-0.5 border-b border-transparent"
                title="ชื่อแคมเปญ"
              />
              <p className="text-[10px] text-gray-400">
                ขนาดการออกแบบ: {aspectW} x {aspectH} pixels • สัดสเกลเรียลไทม์
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={handleSaveProject}
              id="save-studio-btn"
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-semibold rounded-xl border border-emerald-100 transition-all flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกความคืบหน้า</span>
            </button>
            <button
              onClick={handleDownloadTrigger}
              id="download-studio-btn"
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-all flex items-center space-x-1.5 hover:from-blue-700"
              disabled={isDownloading}
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'กำลังสกัดไฟล์...' : 'ดาวน์โหลดแบนเนอร์ HD'}</span>
            </button>
          </div>
        </div>

        {/* Editor main split layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Tools Sidebar Controls */}
          <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-xs" id="editor-tools-sidebar">
            
            {/* Sidebar tab menu options */}
            <div className="flex border-b border-gray-100 text-center text-xs font-semibold justify-between bg-slate-50">
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex-1 py-3 px-1.5 flex flex-col items-center gap-1 border-b-2 transition-all ${
                  activeTab === 'ai' 
                    ? 'border-blue-600 text-blue-600 bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI ช่วยคิด</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 px-1.5 flex flex-col items-center gap-1 border-b-2 transition-all ${
                  activeTab === 'text' 
                    ? 'border-blue-600 text-blue-600 bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>ปรับข้อความ</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-3 px-1.5 flex flex-col items-center gap-1 border-b-2 transition-all ${
                  activeTab === 'upload' 
                    ? 'border-blue-600 text-blue-600 bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>รูปภาพสินค้า</span>
              </button>
              <button
                onClick={() => setActiveTab('bg')}
                className={`flex-1 py-3 px-1.5 flex flex-col items-center gap-1 border-b-2 transition-all ${
                  activeTab === 'bg' 
                    ? 'border-blue-600 text-blue-600 bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>พื้นหลังภาพ</span>
              </button>
            </div>

            {/* Sidebar body components */}
            <div className="p-6">
              
              {/* TAB 1: AI Helper */}
              {activeTab === 'ai' && (
                <div className="space-y-5" id="ai-helper-panel">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 text-indigo-600" />
                      Gemini Copywriter AI ภาษาไทย
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      เขียนข้อมูลธุรกิจของคุณ เพื่อส่งคำสั่งให้ AI ช่วยพัฒนาทั้งแคปชันโพสต์เฟซบุ๊ก และสโลแกนหลักเพื่อประยุกต์เข้าสู่ตัวแบนเนอร์โดยตรง
                    </p>
                  </div>

                  <form onSubmit={handleAIGenerate} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500">ชื่อแบรนด์ / ร้านค้าของคุณ</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="เช่น มอลลี่สวีทคราฟท์ กาแฟสด"
                        className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 px-3 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500">รายละเอียดสินค้า คีย์เวิร์ด และจุดขายที่ต้องการนำเสนอ</label>
                      <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="เช่น ชาเขียวมัทฉะเกรดพิธีชงจากญี่ปุ่นแท้ โฟมนมนุ่มละมุนไขมันต่ำ หวานน้อย ครีมมี่ ไม่ใส่น้ำตาลทรายขาว"
                        rows={3}
                        className="w-full bg-slate-50 border border-gray-200 text-xs py-2 px-3 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-0 leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500">โทนเสียงเขียนโฆษณา</label>
                        <select
                          value={selectedTone}
                          onChange={(e) => setSelectedTone(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 text-xs py-2 px-2.5 rounded-lg focus:border-indigo-500 focus:outline-none"
                        >
                          <option>สนุกสนานสะดุดตาเป็นกันเอง</option>
                          <option>หรูหรา น่าเชื่อถือ มีภูมิฐาน</option>
                          <option>กระตุ้นอารมณ์อยากคุ้มค่า เร่งด่วน</option>
                          <option>เรียบง่าย สบาย อารมณ์รื่นรมย์</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500">แพลตฟอร์มปลายทาง</label>
                        <select
                          value={selectedPlatform}
                          onChange={(e) => setSelectedPlatform(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 text-xs py-2 px-2.5 rounded-lg focus:border-indigo-500 focus:outline-none"
                        >
                          <option>Facebook Ads</option>
                          <option>TikTok Video Story</option>
                          <option>Instagram Feed/Story</option>
                          <option>Line OA Broadcast</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500">คำสำคัญอื่นๆ (คั่นด้วยจุลภาค - ไม่บังคับ)</label>
                      <input
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="เช่น ส่งฟรี, รับประกัน, ซื้อ2แถม1"
                        className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 px-3 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isGeneratingCopy}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-xl hover:from-indigo-700 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
                      <span>{isGeneratingCopy ? 'AI กำลังประดิษฐ์ชุดข้อความ...' : 'วิเคราะห์แล้วสร้างแพ็กเกจโฆษณาเด็ด'}</span>
                    </button>
                  </form>

                  {/* AI Generated Outcome displayer */}
                  {aiGeneratedCaption && (
                    <div className="space-y-4 border-t border-gray-100 pt-4" id="ai-output-box">
                      
                      {/* Section banner */}
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl space-y-1">
                        <h4 className="text-xs font-bold text-indigo-900">✨ ข้อเสนอแนะพาดหัวแบนเนอร์ (Headline) สำหรับคุณ:</h4>
                        <p className="text-xs text-indigo-700 italic font-semibold">"{aiGeneratedCaption.headline}"</p>
                        <p className="text-[10px] text-indigo-400 italic">คำโปรยขยาย: {aiGeneratedCaption.subheading}</p>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">ปิดการขาย: {aiGeneratedCaption.callToAction}</p>

                        <button
                          onClick={handleApplyAISlogan}
                          className="mt-2 text-[10px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 w-full py-1.5 rounded-lg transition-colors flex items-center justify-center"
                        >
                          📥 ประยุกต์สโลแกนนี้ลงลงในหน้าจอออกแบบทันที
                        </button>
                      </div>

                      {/* Post Copy text */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-bold text-gray-500">
                          <span>แคปชันโพสต์ (สำหรับใช้ยิงแอดเพจ):</span>
                          <button
                            onClick={handleCopyCaption}
                            className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 font-semibold"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copyFeedback ? 'คัดลอกแล้ว!' : 'คัดลอกแคปชัน'}</span>
                          </button>
                        </div>
                        <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl max-h-48 overflow-y-auto font-mono text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                          {aiGeneratedCaption.body}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: Text Adjustment */}
              {activeTab === 'text' && (
                <div className="space-y-6" id="text-modifier-panel">
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-800">จัดการเลเยอร์ตัวอักษร</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      แก้ไขคำ ปรับขนาดตัวอักษร หรือเปลี่ยนสีของกล่องตัวหนังสือที่เลือกอยู่บนหน้าจอจำลอง
                    </p>
                  </div>

                  {activeElementObj && activeElementObj.type === 'text' ? (
                    <div className="space-y-4">
                      
                      {/* Active Input content */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500">ข้อความพาดหัว</label>
                        <input
                          type="text"
                          value={activeElementObj.content}
                          onChange={(e) => handleUpdateTextValue(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 px-3 rounded-lg focus:border-indigo-500 focus:outline-none font-medium"
                        />
                      </div>

                      {/* Font Size slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[11px] font-bold text-gray-500">
                          <span>ขนาดอักษร (Size)</span>
                          <span className="text-[10px] text-gray-400 font-mono">{(activeElementObj.fontSize || 16)} px</span>
                        </div>
                        <input
                          type="range"
                          min="12"
                          max="80"
                          value={activeElementObj.fontSize || 16}
                          onChange={(e) => handleUpdateTextSize(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>

                      {/* Positioning X/Y coordinates sliders */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 flex justify-between">
                            <span>ตำแหน่งแนวนอน</span>
                            <span className="font-mono text-gray-400">{activeElementObj.x}%</span>
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="95"
                            value={activeElementObj.x}
                            onChange={(e) => handleUpdateCoodinate('x', parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded appearance-none accent-indigo-600"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-gray-500 flex justify-between">
                            <span>ตำแหน่งแนวตั้ง</span>
                            <span className="font-mono text-gray-400">{activeElementObj.y}%</span>
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="95"
                            value={activeElementObj.y}
                            onChange={(e) => handleUpdateCoodinate('y', parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded appearance-none accent-indigo-600"
                          />
                        </div>
                      </div>

                      {/* Color Palette selectors */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500">เลือกสีอักษรไทยพรีเมียม</label>
                        <div className="flex flex-wrap gap-2">
                          {textColors.map((col) => {
                            const isSelected = activeElementObj.color === col;
                            return (
                              <button
                                key={col}
                                onClick={() => handleUpdateTextColor(col)}
                                style={{ backgroundColor: col }}
                                className={`w-7 h-7 rounded-lg border focus:outline-none transition-transform ${
                                  isSelected ? 'border-indigo-600 scale-110 shadow-sm' : 'border-gray-200 hover:scale-105'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Action delete specific text element */}
                      <div className="pt-3 flex space-x-3">
                        <button
                          onClick={() => handleDeleteElement(activeElementObj.id)}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>ลบเลเยอร์ข้อความนี้</span>
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-2xl p-6 text-center border border-gray-100">
                      <p className="text-xs text-gray-400">
                        โปรดคลิกเลือกเลเยอร์ข้อความบนแบนเนอร์ด้านขวาเพื่อเริ่มทำการปรับแต่งคุณลักษณะตัวอักษร
                      </p>
                    </div>
                  )}

                  {/* Add New Elements action */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={handleAddNewText}
                      className="w-full py-2 border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/20 text-blue-600 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1"
                    >
                      <Type className="w-4 h-4" />
                      <span>+ เพิ่มกล่องข้อความใหม่ลงแบนเนอร์</span>
                    </button>
                  </div>

                </div>
              )}

              {/* TAB 3: Image Upload & Background Remover */}
              {activeTab === 'upload' && (
                <div className="space-y-5" id="image-upload-panel">
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-800">รูปภาพสินค้าของคุณ</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      อัปโหลดรูปถ่ายสินค้าจริงจากคลัง แล้วนำเข้าไปจัดวางในตัวโฆษณา รวมทั้งประมวณผลปรับพื้นหลังได้อย่างโปรแวร์
                    </p>
                  </div>

                  {/* Drag-Drop / Select Manual Upload Button */}
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/10 transition-all relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="studio-file-picker"
                    />
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">คลิกเพื่ออัปโหลดชิ้นภาพสินค้า</p>
                        <p className="text-[10px] text-gray-400 mt-1">รองรับ JPEG, PNG (แนะนำแบบโปร่งใส)</p>
                      </div>
                    </div>
                  </div>

                  {/* Base64 Images Showcase & Background Remover tool trigger */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-gray-500">ฟังก์ชัน AI จัดชิ้นรูปภาพ:</span>
                    </div>

                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      หากรูปสินค้าของคุณมีพื้นแบล็กกราวด์ที่ไม่ต้องการ สามารถคลิกเลือกเครื่องมือลบพื้นหลังอัจฉริยะได้ที่นี่เฉือนภาพให้เรียบ
                    </p>

                    <button
                      onClick={handleMockBgRemoval}
                      disabled={isRemovingBg}
                      className="w-full py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs border border-blue-100 rounded-xl transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>{isRemovingBg ? 'AI กำลังดำเนินการตัดขอบเฉือนภาพ...' : 'ลบพื้นหลังรูปสินค้าเด็ดด้วย AI'}</span>
                    </button>

                    {bgRemoveOutcome && (
                      <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">
                        ✅ {bgRemoveOutcome}
                      </p>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 4: Canvas Background gradients */}
              {activeTab === 'bg' && (
                <div className="space-y-5" id="background-selector-panel">
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-gray-800">โทนสีและเทมเพลตพื้นหลัง</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      ปรับเปลี่ยนอารมณ์และคู่สีกราเดียนท์ (Gradients) เพื่อเพิ่มมิติความโดดเด่นและสร้างคอนทราสต์อายคัตชิ่งสะดุดฟีด
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-500">จานสีกราเดียนท์แนะนำ (Thai SMEs Favorites)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {bgPalettes.map((pal, idx) => {
                        const isSelected = canvasBg === pal.grad;
                        return (
                          <button
                            key={idx}
                            onClick={() => setCanvasBg(pal.grad)}
                            className={`p-2 bg-white border rounded-xl text-left hover:border-indigo-400 transition-all flex flex-col space-y-2 ${
                              isSelected ? 'border-indigo-600 ring-2 ring-indigo-50 shadow-sm' : 'border-gray-200'
                            }`}
                          >
                            <div className={`w-full h-8 rounded-lg bg-gradient-to-tr ${pal.grad}`} />
                            <span className="text-[10px] font-bold text-gray-700 truncate w-full">{pal.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* RIGHT: Real-time Mockup Canvas Workspace (ตรงกลาง) */}
          <div className="lg:col-span-7 flex flex-col space-y-4" id="design-workspace-area">
            
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-extrabold text-gray-400 tracking-wider uppercase flex items-center">
                <Layers className="w-4 h-4 mr-1.5 text-blue-600" />
                หน้าจอจำลองแก้ไขแบบ Real-time
              </span>
              <div className="flex space-x-1">
                {elements.map((el) => (
                  <button
                    key={el.id}
                    onClick={() => setSelectedElementId(el.id)}
                    className={`px-3 py-1 text-[10px] font-semibold border rounded-lg transition-all ${
                      selectedElementId === el.id 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-slate-50'
                    }`}
                  >
                    {el.type === 'image' ? '🖼️ รูปถ่าย' : el.type === 'sticker' ? '⭐ สติกเกอร์' : `📝 ${(el.content?.slice(0, 5) || 'ตัวหนังสือ')}...`}
                  </button>
                ))}
              </div>
            </div>

            {/* Design stage bordered workspace */}
            <div className="workspace-grid-bg border border-gray-200 rounded-3xl p-6 sm:p-12 flex items-center justify-center min-h-[480px] shadow-inner relative">
              
              {/* Outer bounds scale placeholder */}
              <div 
                style={{ aspectRatio: aspectW / aspectH }}
                className={`w-full max-w-[420px] rounded-2xl bg-gradient-to-tr ${canvasBg} p-6 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300`}
                id="live-ad-canvas"
              >
                
                {/* Decorative mesh vector background details */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"></div>

                {/* Render canvas elements dynamically depending on percent coordinate inputs */}
                {elements.map((el) => {
                  const isSelected = selectedElementId === el.id;
                  
                  return (
                    <div
                      key={el.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElementId(el.id);
                      }}
                      style={{
                        position: 'absolute',
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        transform: 'translate(-50%, -50%)',
                        cursor: 'move',
                        zIndex: isSelected ? 30 : 10
                      }}
                      className={`select-none text-center transition-shadow min-w-[120px] max-w-[320px] ${
                        isSelected ? 'outline border-dashed outline-2 outline-yellow-400 p-1.5 bg-slate-950/20 rounded-md shadow-lg scale-102' : 'border border-transparent hover:border-white/30 p-1'
                      }`}
                    >
                      {el.type === 'text' && (
                        <h4 
                          style={{ 
                            fontSize: `${(el.fontSize || 16) * 0.85}px`, 
                            color: el.color || '#ffffff',
                            fontWeight: el.fontWeight || 'normal'
                          }} 
                          className="font-bold tracking-tight filter drop-shadow-md break-words"
                        >
                          {el.content}
                        </h4>
                      )}

                      {el.type === 'sticker' && (
                        <span style={{ fontSize: `${el.fontSize || 48}px` }} className="filter drop-shadow-lg inline-block">
                          {el.content}
                        </span>
                      )}

                      {el.type === 'image' && (
                        <div className="flex flex-col items-center">
                          <img 
                            src={el.content} 
                            alt="SME Product" 
                            style={{ 
                              width: el.width ? `${el.width}px` : '100px', 
                              height: el.height ? `${el.height}px` : '100px',
                              objectFit: 'contain'
                            }} 
                            referrerPolicy="no-referrer"
                            className="rounded-lg shadow-md max-w-full inline-block"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Simulated floating grid indicators */}
                <span className="absolute bottom-3 left-4 text-[7px] text-white/30 font-mono tracking-wider">
                  SCALE ADPREVIEW HD • AspectRatio: 1:1 Square
                </span>

              </div>

            </div>

            {/* Hint Box */}
            <div className="bg-slate-100 rounded-2xl p-4 flex space-x-3 text-xs text-gray-500 items-start">
              <span>💡</span>
              <p>
                <strong>คำแนะนำการออกแบบ:</strong> คุณสามารถแก้ไขจุดพิกัด ข้อความขนาดต่างๆ และสโลแกนได้ในกล่องควบคุมทางซีกซ้าย 
                 หากต้องการทดสอบฟังก์ชันคิดสด พลิกปุ่ม <strong>"AI ช่วยคิด"</strong> เพื่อปลดเสพด้วยพลัง Gemini ล่าสุด
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
