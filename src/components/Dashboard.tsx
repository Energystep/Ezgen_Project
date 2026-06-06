import React from 'react';
import { Page, Project } from '../types';
import { Sparkles, Plus, Image as ImageIcon, Trash2, Edit2, Play, BookOpen, AlertCircle, RefreshCw, BarChart2, Eye, MousePointerClick, Heart } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCurrentPage: (page: Page) => void;
  setSelectedProject: (project: Project | null) => void;
  onNewProject: () => void;
}

export default function Dashboard({ projects, setProjects, setCurrentPage, setSelectedProject, onNewProject }: DashboardProps) {
  
  // Calculate simulated dashboard statistics
  const totalProjects = projects.length;
  const totalImpressions = projects.reduce((acc, p) => acc + (p.playsCount || 0), 12850);
  const totalClicks = projects.reduce((acc, p) => acc + (p.clicksCount || 0), 1430);
  const totalConversions = projects.reduce((acc, p) => acc + (p.conversionsCount || 0), 54);

  const ctr = ((totalClicks / totalImpressions) * 100).toFixed(1);

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('คุณต้องการลบชิ้นงานโฆษณานี้ใช่หรือไม่?')) {
      setProjects(prev => prev.filter(proj => proj.id !== id));
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('editor');
  };

  const trends = [
    {
      title: 'เทรนคู่สีและฟอนต์โฆษณาเดือนนี้',
      category: 'ดีไซน์ยอดนิยม',
      reads: '2.5k',
      benefit: 'เพิ่ม CTR ถึง 15%'
    },
    {
      title: 'สูตรเขียนแคปชันปิดการขายแบรนด์ชาบู/หมูกระทะ',
      category: 'แคปชันเงินล้าน',
      reads: '1.8k',
      benefit: 'มีอัตราคลิกพุ่งสูง'
    },
    {
      title: 'ตั้งงบวิเคราะห์ ROI อย่างไรไม่ให้จมทุนใน TikTok',
      category: 'การตลาด SME',
      reads: '3.1k',
      benefit: 'เทคนิคประหยัดงบ'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 font-sans" id="user-dashboard-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6" id="welcome-banner">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center">
              สวัสดีผู้ประกอบการ SME ยินดีต้อนรับกลับมา! 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              สร้างภาพแบนเนอร์ คิดคำโฆษณา และวางแผนงบการตลาด ครบครันในแผงข้อมูลส่วนตัวของคุณ
            </p>
          </div>
          
          <button
            onClick={() => {
              onNewProject();
              setCurrentPage('editor');
            }}
            id="quick-new-project-btn"
            className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-blue-100 transition-all transform hover:-translate-y-0.5 flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>สร้างชิ้นงานโฆษณาใหม่</span>
          </button>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="dashboard-statistics">
          
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase">ชิ้นงานโฆษณาของคุณ</span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ImageIcon className="w-4 h-4" /></span>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 font-mono">{totalProjects}</h2>
              <p className="text-[10px] text-gray-400 flex items-center">
                <span className="text-emerald-500 font-bold mr-1 font-mono">+100%</span> ในสัปดาห์นี้
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase">ยอดเข้าชมสะสม (จำลอง)</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Eye className="w-4 h-4" /></span>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 font-mono">{totalImpressions.toLocaleString()}</h2>
              <p className="text-[10px] text-gray-400 flex items-center">
                <span className="text-emerald-500 font-bold mr-1 font-mono">+14.2%</span> ยอดทราฟฟิกสูงคงที่
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase">ยอดคลิกโฆษณา (CTR)</span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-lg"><MousePointerClick className="w-4 h-4" /></span>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 font-mono">
                {totalClicks.toLocaleString()} <span className="text-sm font-normal text-amber-600">({ctr}%)</span>
              </h2>
              <p className="text-[10px] text-gray-400 flex items-center">
                <span className="text-amber-500 font-bold mr-1 font-mono">แรนจ์ที่ดีมาก</span> สูงกว่าค่าเฉลี่ยตลาด
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase">ปิดการสมัคร/สั่งซื้อ</span>
              <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Heart className="w-4 h-4" /></span>
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900 font-mono">{totalConversions}</h2>
              <p className="text-[10px] text-gray-400 flex items-center">
                <span className="text-purple-500 font-bold mr-1 font-mono">ยอด ROI เฉลี่ย 3.4x</span> สูงเด่น
              </p>
            </div>
          </div>

        </div>

        {/* Projects Listing and Tips/Tutorials Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Projects Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <ImageIcon className="w-5 h-5 mr-1.5 text-blue-600" />
                โฆษณาที่คุณทำการออกแบบค้างไว้ ({projects.length})
              </h3>
              {projects.length > 0 && (
                <button 
                  onClick={() => setCurrentPage('templates')} 
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  เลือกใช้เทมเพลตเพิ่ม
                </button>
              )}
            </div>

            {projects.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-gray-200 text-center space-y-4" id="empty-projects-state">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-800">ยังไม่มีชิ้นงานโฆษณาตอนนี้</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    เริ่มสร้างโฆษณาชิ้นแรกของคุณด้วยพลัง AI ช่วยเขียนสโลแกนภาษาไทย มอบความมั่นใจในการขาย
                  </p>
                </div>
                <button
                  onClick={() => {
                    onNewProject();
                    setCurrentPage('editor');
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  คลิกทำสื่อโฆษณาฟรีเลย
                </button>
              </div>
            ) : (
              // Grid of Projects
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="projects-grid">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => handleEditProject(project)}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    {/* Visual Preview */}
                    <div className="aspect-video bg-gradient-to-tr from-slate-900 to-indigo-950 p-4 text-white flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,white,transparent_70%)]"></div>
                      
                      {/* Badge Platform */}
                      <span className="text-[9px] bg-white/20 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-medium">
                        ขนาด {project.width} x {project.height} px
                      </span>

                      {/* Headline preview */}
                      <div className="my-auto text-center z-10 px-2 line-clamp-2">
                        <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                          {project.elements.find(e => e.type === 'text')?.content || 'คำพาดหัวแบนเนอร์เปล่า'}
                        </p>
                      </div>

                      {/* Indicators */}
                      <div className="flex justify-between items-center text-[8px] text-indigo-200 z-10">
                        <span>คลิกสะสม {project.clicksCount || 0} ครั้ง</span>
                        <span>แก้ไขล่าสุด: {new Date(project.lastModified).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>

                    {/* Bottom Info & Action Panel */}
                    <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-white">
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600">
                          {project.title}
                        </h4>
                        <p className="text-[10px] text-gray-400">
                          องค์ประกอบภาพ {project.elements?.length || 0} ส่วน
                        </p>
                      </div>

                      {/* Inline Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProject(project);
                          }}
                          className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded text-gray-400 transition-all"
                          title="แก้ไข"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteProject(project.id, e)}
                          className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded text-gray-400 transition-all"
                          title="ลบ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips Col */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-1.5 text-indigo-600" />
              เทรนด์ตลาดและเคล็ดลับทำเงิน
            </h3>
            
            <div className="bg-white p-6 border border-gray-100 rounded-3xl space-y-6" id="dashboard-tips">
              
              {/* Trends Loop */}
              <div className="space-y-4">
                {trends.map((t, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setCurrentPage('blog')} 
                    className="p-3.5 bg-slate-50 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/20 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-semibold text-blue-600">{t.category}</span>
                      <span className="text-gray-400 flex items-center">
                        <BarChart2 className="w-3 h-3 mr-0.5" />{t.reads} วิว
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{t.title}</h4>
                    <span className="inline-block text-[9px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-1 py-0.5 rounded">
                      {t.benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Box Info */}
              <div className="p-4 bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white rounded-2xl flex space-x-3 items-start shadow-sm">
                <AlertCircle className="w-5 h-5 text-indigo-200 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-indigo-100">โปรดทราบ! แคมเปญวันหยุด</h4>
                  <p className="text-[10px] text-indigo-300 leading-relaxed">
                    อัปเดตเทมเพลตวันสำคัญประจำเดือนแล้ว แนะนำให้ใช้หมวดหมู่ "อาหาร" และ "แฟชั่น" เพื่อเพิ่มอัตราการคลิกเป็นเท่าตัว!
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
