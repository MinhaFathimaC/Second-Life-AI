import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Sparkles, History as HistoryIcon, LayoutDashboard, BookOpen, Globe, Cpu, Users, Menu, X, Presentation, FileText } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Analyze', path: '/analyze', icon: Leaf },
    { name: 'History', path: '/history', icon: HistoryIcon },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Community Impact', path: '/community', icon: Users },
    { name: 'How AI Works', path: '/ai-how-it-works', icon: Cpu },
    { name: 'Learn & Act', path: '/learn', icon: BookOpen },
    { name: 'SDG Impact', path: '/sdg', icon: Globe },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                SecondLife <span className="text-emerald-600 font-extrabold">AI</span>
              </span>
              <span className="block text-[10px] uppercase font-semibold text-emerald-700 tracking-wider">
                SDG 12 Recommendation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`${import.meta.env.BASE_URL}SecondLife_AI_Presentation.pptx`}
              download="SecondLife_AI_Presentation.pptx"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all hover:-translate-y-0.5"
              title="Download PowerPoint Presentation (.pptx)"
            >
              <Presentation className="w-4 h-4 text-amber-100" />
              <span>Download PPT</span>
            </a>
            <a
              href={`${import.meta.env.BASE_URL}SecondLife_AI_Presentation.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              title="View Interactive Presentation Slides"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>View Slides</span>
            </a>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Analyze Item</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  active ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/analyze"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              Analyze Item
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
