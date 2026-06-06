import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TemplateLibrary from './components/TemplateLibrary';
import DesignStudio from './components/DesignStudio';
import Analytics from './components/Analytics';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import { Page, Project, AdTemplate } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // High-value pre-populated projects with real statistics to look stunning, luxurious and alive!
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj-1',
      title: 'เมนูหมูกระทะพรีเมียม ซอสหม่าล่า',
      templateId: 'tmpl-coffee-fb',
      lastModified: '2026-06-06',
      width: 1080,
      height: 1080,
      bgGradient: 'from-amber-950 via-slate-900 to-stone-950',
      playsCount: 15400,
      clicksCount: 680,
      conversionsCount: 42,
      elements: [
        { id: 'el-1', type: 'text', content: 'หมูกระทะพรีเมียม ซอสหม่าล่า', x: 50, y: 15, fontSize: 32, color: '#fef08a', fontWeight: 'bold' },
        { id: 'el-2', type: 'text', content: 'คัดเนื้อเกรดเอลายหิมะ เสริ์ฟร้อนฟินจุกๆ อร่อยนุ่มลิ้นคู่ซอสพิเศษ', x: 50, y: 28, fontSize: 15, color: '#e2e8f0' },
        { id: 'el-3', type: 'sticker', content: '🥓', x: 50, y: 55, fontSize: 68 },
        { id: 'el-4', type: 'text', content: 'คุ้มค่าสมฐานะ คิวยาวเหยียด ทักด่วนลด 10%!', x: 50, y: 84, fontSize: 18, color: '#facc15', fontWeight: 'bold' }
      ]
    },
    {
      id: 'proj-2',
      title: 'คอลเลกชันมัทฉะนิวเยียร์ โชว์ชงสด',
      templateId: 'tmpl-fashion-ig',
      lastModified: '2026-06-04',
      width: 1080,
      height: 1080,
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      playsCount: 9800,
      clicksCount: 410,
      conversionsCount: 28,
      elements: [
        { id: 'el-1', type: 'text', content: 'มัทฉะพิธีการ คัดยอดออร์แกนิก', x: 50, y: 15, fontSize: 32, color: '#fef08a', fontWeight: 'bold' },
        { id: 'el-2', type: 'text', content: 'นำเข้าตรงจากเกียวโต นุ่มหอมผ่อนคลายล้ำลึกอย่างมีเสน่ห์', x: 50, y: 28, fontSize: 15, color: '#e2e8f0' },
        { id: 'el-3', type: 'sticker', content: '🍵', x: 50, y: 55, fontSize: 68 },
        { id: 'el-4', type: 'text', content: 'รับชุดแก้วพิธีชงชาฟรี เฉพาะในไลฟ์นี้เท่านั้น', x: 50, y: 84, fontSize: 18, color: '#facc15', fontWeight: 'bold' }
      ]
    }
  ]);

  // Instantiate new design project cleanly
  const handleNewProject = () => {
    setSelectedProject(null);
    setCurrentPage('editor');
  };

  // Turn pre-designed template from community into active customizing project
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

    // Prepend to list or replace selected state
    setProjects(prev => [newProject, ...prev]);
    setSelectedProject(newProject);
    setCurrentPage('editor');
  };

  // Rendering matching sub-module pages
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            onNewProject={handleNewProject} 
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
      case 'editor':
        return (
          <DesignStudio 
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            projects={projects}
            setProjects={setProjects}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'analytics':
        return (
          <Analytics 
            projects={projects}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'pricing':
        return (
          <Pricing />
        );
      case 'blog':
        return (
          <Blog />
        );
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            onNewProject={handleNewProject} 
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-indigo-600 selection:text-white" id="main-global-app-container">
      {/* Universal Sticky Luxurious Navigation */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onNewProject={handleNewProject}
      />

      {/* Primary Dynamic Screen Viewport Router */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Fine-Tuned Luxury Page Footer */}
      <Footer />
    </div>
  );
}
