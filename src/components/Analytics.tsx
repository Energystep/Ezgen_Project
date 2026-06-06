import React, { useState } from 'react';
import { Page, AdScheduleEvent, Project, ROIInputs } from '../types';
import { Calculator, Calendar, BarChart3, Clock, DollarSign, Target, Plus, Trash2, ArrowUpRight, Percent, Award, Sparkles } from 'lucide-react';

interface AnalyticsProps {
  projects: Project[];
  setCurrentPage: (page: Page) => void;
}

export default function Analytics({ projects, setCurrentPage }: AnalyticsProps) {
  // ROI Calculator inputs State
  const [roiInputs, setRoiInputs] = useState<ROIInputs>({
    budget: 5000,
    cpc: 4,
    conversionRate: 2.5,
    avgOrderValue: 850
  });

  // Scheduled ads list
  const [scheduleList, setScheduleList] = useState<AdScheduleEvent[]>([
    {
      id: 'sc-1',
      projectId: 'proj-1',
      projectTitle: 'เมนูหมูกระทะพรีเมียม ซอสหม่าล่า',
      platform: 'facebook',
      date: '2026-06-15',
      time: '18:00',
      budget: 1500,
      status: 'scheduled'
    },
    {
      id: 'sc-2',
      projectId: 'proj-2',
      projectTitle: 'คอลเลกชันมัทฉะนิวเยียร์ โชว์ชงสด',
      platform: 'tiktok',
      date: '2026-06-18',
      time: '11:30',
      budget: 2000,
      status: 'running'
    }
  ]);

  // Form states for scheduling
  const [schedProjectId, setSchedProjectId] = useState(projects[0]?.id || 'tmpl-custom');
  const [schedPlatform, setSchedPlatform] = useState<'facebook' | 'tiktok' | 'instagram' | 'google'>('facebook');
  const [schedDate, setSchedDate] = useState('2026-06-20');
  const [schedTime, setSchedTime] = useState('19:00');
  const [schedBudget, setSchedBudget] = useState(1000);

  // ROI calculation results
  const estClicks = Math.floor(roiInputs.budget / roiInputs.cpc);
  const estConversions = Math.floor(estClicks * (roiInputs.conversionRate / 100));
  const estRevenue = estConversions * roiInputs.avgOrderValue;
  const netProfit = estRevenue - roiInputs.budget;
  const roiPercentage = roiInputs.budget > 0 ? ((netProfit / roiInputs.budget) * 100).toFixed(0) : '0';

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProjectName = projects.find(p => p.id === schedProjectId)?.title || 'ชิ้นงานออกแบบที่กำหนดเอง';
    
    const newEvent: AdScheduleEvent = {
      id: 'sc-' + Date.now(),
      projectId: schedProjectId,
      projectTitle: targetProjectName,
      platform: schedPlatform,
      date: schedDate,
      time: schedTime,
      budget: schedBudget,
      status: 'scheduled'
    };

    setScheduleList(prev => [newEvent, ...prev]);
    alert('บันทึกแผนงานปล่อยเนื้อหาลงปฏิทินเรียบร้อยแล้ว!');
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('คุณต้องการยกเลิกตารางแผนโฆษณานี้ใช่หรือไม่?')) {
      setScheduleList(prev => prev.filter(sc => sc.id !== id));
    }
  };

  // Performance category benchmarks
  const insightsData = [
    { name: 'หมวดหมู่อาหาร & ของหวาน', ctr: '4.8%', conversions: 54, rating: 'ดีเยี่ยมที่สุด อัตราปิดการขายสูงสุด' },
    { name: 'หมวดหมู่เสื้อผ้า & แฟชั่น', ctr: '3.6%', conversions: 38, rating: 'ดีมาก คลิกสูงคงที่ตลอดสัปดาห์' },
    { name: 'หมวดหมู่อสังหาริมทรัพย์', ctr: '2.1%', conversions: 12, rating: 'คุ้มค่าสูงต่องานโปรโมตแบบเจาะจงกลุ่มเป้าหมาย' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans" id="analytics-module-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Module title with luxury touch */}
        <div className="text-center md:text-left space-y-2 border-b border-gray-150 pb-6">
          <span className="text-xs font-bold text-indigo-650 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full flex items-center w-fit mx-auto md:mx-0">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-500" />
            วิเคราะห์ สรุปงบ และกำหนดการเข้าคิวสื่อ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 bg-clip-text text-transparent">
            Campaign Analytics & Media Planner
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            วางแผนคำนวณอัตราผลแทนกำไร ROI และกำหนดคิวจัดเวลาปล่อยสื่อโฆษณาเพื่อให้ประหยัดเวลากว่าปรกติ
          </p>
        </div>

        {/* Outer body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main left panels */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* ROI Calculator Section */}
            <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-6 shadow-xs" id="roi-calculator">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-gray-800">เครื่องมือคำนวณยอดขายคาดการณ์ (ROI Calculator)</h2>
                  <p className="text-[10px] sm:text-xs text-gray-400">ประเมินผลกำไรสุทธิล่วงหน้าเพื่อจัดงบการยิงแอดพาดพิงตลาด</p>
                </div>
              </div>

              {/* Sliders and fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Budget Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>งบโฆษณาที่ต้องการ (บาท):</span>
                    <span className="text-indigo-600 font-mono">฿{roiInputs.budget.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={roiInputs.budget}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[9px] text-gray-400 block">เริ่มต้น 1,000 ถึงสูงสุด 100,000 ต่อแคมเปญ</span>
                </div>

                {/* CPC Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>ราคาต่อคลิกเฉลี่ย (CPC - บาท):</span>
                    <span className="text-indigo-600 font-mono">฿{roiInputs.cpc}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={roiInputs.cpc}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, cpc: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[9px] text-gray-400 block">ตลาดไทยเฉลี่ยอยู่ที่ 2.5 - 6.0 บาท</span>
                </div>

                {/* Conversion rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>อัตราการสั่งซื้อสำเร็จ (Conversion Rate %):</span>
                    <span className="text-indigo-600 font-mono">{roiInputs.conversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={roiInputs.conversionRate}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, conversionRate: parseFloat(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[9px] text-gray-400 block">ยอดมาตฐานปรกติอยู่ที่ 1.5% - 4.5%</span>
                </div>

                {/* Avg order value */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                    <span>ขนาดมูลค่าออเดอร์เฉลี่ย (ราคาขาย):</span>
                    <span className="text-indigo-600 font-mono">฿{roiInputs.avgOrderValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={roiInputs.avgOrderValue}
                    onChange={(e) => setRoiInputs(prev => ({ ...prev, avgOrderValue: parseInt(e.target.value) }))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="text-[9px] text-gray-400 block">ราคาเฉลี่ยต่อแก้ว/ชิ้น ของร้านสิค้าคุณ</span>
                </div>
              </div>

              {/* Dynamic Analytics outcomes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 bg-slate-50/50 p-4 rounded-2xl border border-dashed border-slate-150">
                
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">ยอดคลิกคาดการณ์</span>
                  <p className="text-base sm:text-lg font-mono font-bold text-gray-950">{estClicks.toLocaleString()} ครั้ง</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">ออเดอร์ปิดได้</span>
                  <p className="text-base sm:text-lg font-mono font-bold text-indigo-750">{estConversions} รายการ</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">ยอดขายคาดหวัง</span>
                  <p className="text-base sm:text-lg font-mono font-bold text-emerald-650">฿{estRevenue.toLocaleString()}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">อัตรา ROI ผลกำไร</span>
                  <p className={`text-base sm:text-lg font-mono font-bold ${netProfit > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {roiPercentage}% ({netProfit > 0 ? '+' : ''}{Math.round(netProfit / roiInputs.budget)}x)
                  </p>
                </div>

              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl text-[10px] sm:text-xs text-emerald-800 flex items-start space-x-2">
                <span className="text-sm">🌟</span>
                <p>
                  <strong>คำแนะนำอัจฉริยะ (Insights):</strong> งบประเมินชี้ว่าธุรกิจประเภทนี้สามารถกอบโกยผลตอบแทนสูงถึง <strong>{roiPercentage}%</strong> ของเงินลงทุน 
                   แนะนำให้อัปสโลแกนเร่งด่วน เช่นโปร <strong>"ซื้อ 2 แถม 1"</strong> เพื่ออัปยอดออเดอร์เฉลี่ยขึ้นไปอีก 15% ทันที
                </p>
              </div>

            </div>

            {/* Performance Insights block */}
            <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 space-y-6 shadow-xs" id="performance-insights">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><BarChart3 className="w-5 h-5 animate-pulse" /></div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">วิเคราะห์ตัวแปรยอดนิยม (Category Benchmarks)</h3>
                    <p className="text-[10px] text-gray-400">สถิติอ้างอิงจากผู้ประกอบการ SME ไทยใช้งานจริง</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {insightsData.map((data, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-800 flex items-center">
                        <span className="mr-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
                        {data.name}
                      </h4>
                      <p className="text-[10px] text-gray-400">{data.rating}</p>
                    </div>

                    <div className="flex items-center space-x-6 text-right shrink-0">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">ค่า CTR สะสม</span>
                        <span className="text-sm font-mono font-extrabold text-indigo-700">{data.ctr}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 block uppercase">ยอดสั่งซื้อดีที่สุด</span>
                        <span className="text-sm font-mono font-extrabold text-emerald-600">+{data.conversions}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar right: Scheduler Form & Events */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Create Schedule entry */}
            <div className="bg-white rounded-3xl border border-gray-150 p-6 space-y-5 shadow-xs" id="scheduler-form">
              <h2 className="text-sm font-extrabold text-gray-800 flex items-center">
                <Plus className="w-4 h-4 mr-1.5 text-blue-600 animate-bounce" />
                วางแผนคิวโฆษณา (Add Scheduler)
              </h2>

              <form onSubmit={handleCreateSchedule} className="space-y-4">
                
                {/* Select Project */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">เลือกชิ้นงานออกแบบที่ต้องการปล่อยคิว</label>
                  <select
                    value={schedProjectId}
                    onChange={(e) => setSchedProjectId(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 px-3 rounded-xl focus:border-indigo-500 focus:outline-none"
                  >
                    {projects.map((proj) => (
                      <option key={proj.id} value={proj.id}>{proj.title}</option>
                    ))}
                    {projects.length === 0 && (
                      <option value="tmpl-custom">ชิ้นงานโฆษณาจำลอง SME ทั่วไป (คลิกสร้างเพื่อเริ่มออกแบบจริง)</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Select Platform */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">ช่องทางยิงสื่อ</label>
                    <select
                      value={schedPlatform}
                      onChange={(e) => setSchedPlatform(e.target.value as any)}
                      className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 px-2 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="facebook">Facebook Ads</option>
                      <option value="tiktok">TikTok Video</option>
                      <option value="instagram">Instagram Story</option>
                      <option value="google">Google Search</option>
                    </select>
                  </div>

                  {/* Budget Allocation */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">จัดงบแคมเปญ (บาท)</label>
                    <input
                      type="number"
                      value={schedBudget}
                      onChange={(e) => setSchedBudget(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-gray-200 text-xs py-2.5 px-3 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Sched Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">วันที่ระบายเนื้อหา</label>
                    <input
                      type="date"
                      value={schedDate}
                      onChange={(e) => setSchedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 text-xs py-2 px-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* Sched Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">เวลาปล่อยสื่อดีที่สุด</label>
                    <input
                      type="time"
                      value={schedTime}
                      onChange={(e) => setSchedTime(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 text-xs py-2 px-2.5 rounded-xl focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl tracking-wide transition-all shadow"
                >
                  📥 บันทึกลงตารางปฏิทินวางแผน
                </button>

              </form>
            </div>

            {/* List of Schedules */}
            <div className="bg-white rounded-3xl border border-gray-150 p-6 space-y-4 shadow-xs" id="scheduled-list-panel">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-indigo-600" />
                คิวปล่อยแคมเปญปัจจุบัน ({scheduleList.length})
              </h3>

              <div className="space-y-3">
                {scheduleList.map((sc) => (
                  <div key={sc.id} className="p-3.5 bg-slate-50 border border-gray-100 rounded-2xl flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        <span className="text-[9px] font-extrabold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {sc.platform}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          sc.status === 'running' 
                            ? 'bg-amber-55 bg-amber-50 text-amber-700 animate-pulse' 
                            : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          {sc.status === 'running' ? '🚀 กำลังฉาย' : '⏳ รอปล่อยตัว'}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">{sc.projectTitle}</h4>
                      <div className="flex items-center space-x-2 text-[9px] text-gray-400">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-0.5" /> {sc.date} | {sc.time} น.</span>
                        <span className="font-semibold text-indigo-600">งบ: ฿{sc.budget.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSchedule(sc.id)}
                      className="p-1 hover:bg-rose-50 text-gray-400 hover:text-rose-600 rounded transition-all shrink-0"
                      title="ลบเวลางาน"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {scheduleList.length === 0 && (
                  <p className="text-center py-6 text-xs text-gray-400">
                    ไม่มีคิวปล่อยกำหนดโฆษณาในขณะนี้ เริ่มทำแบบร่างแล้วปักหมุดเพื่อไม่ให้พลาดจังหวะการดึงลูกค้า
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
