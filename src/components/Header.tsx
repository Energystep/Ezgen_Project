import React, { useState } from 'react';
import { Page } from '../types';
import { Sparkles, Layout, Layers, CalendarRange, CreditCard, BookOpen, Menu, X, User } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onNewProject: () => void;
}

export default function Header({ currentPage, setCurrentPage, onNewProject }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'หน้าแรก', icon: Layers },
    { id: 'dashboard', label: 'แดชบอร์ด', icon: Layout },
    { id: 'templates', label: 'คลังเทมเพลต', icon: Layout },
    { id: 'editor', label: 'สตูดิโอออกแบบ', icon: Sparkles },
    { id: 'analytics', label: 'วิเคราะห์ & วางแผน', icon: CalendarRange },
    { id: 'pricing', label: 'อัตราค่าบริการ', icon: CreditCard },
    { id: 'blog', label: 'บล็อก & แหล่งเรียนรู้', icon: BookOpen },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="header-logo"
          >
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white transform group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
                Ezgen
              </span>
              <span className="ml-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-sm border border-amber-100">
                LUX
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" id="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (item.id === 'editor') {
                      onNewProject();
                    }
                  }}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Call to Action Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => {
                setCurrentPage('editor');
                onNewProject();
              }}
              id="cta-editor-header"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>ด่วน! สร้างโฆษณาฟรี</span>
            </button>
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-100">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs border border-indigo-200">
                SME
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
              id="mobile-menu-toggle"
            >
              <span className="sr-only">เปิดเมนู</span>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 shadow-lg" id="mobile-nav-panel">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                    if (item.id === 'editor') {
                      onNewProject();
                    }
                  }}
                  className={`flex items-center w-full px-3 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-2 border-t border-gray-100 px-3">
              <button
                onClick={() => {
                  setCurrentPage('editor');
                  onNewProject();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-sm"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                เริ่มสร้างโฆษณาฟรี
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
