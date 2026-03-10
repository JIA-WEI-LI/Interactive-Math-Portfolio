import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import {
  Home as HomeIcon,
  BookOpen,
  Mail,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Settings,
  Moon,
  Sun,
  Palette,
  Info,
  RotateCcw,
  Calculator,
  Sigma,
  Search,
  ExternalLink,
  ChevronRight,
  Copy
} from 'lucide-react';

// --- Components ---
import { SidebarItem } from './components/SidebarItem';
import { Home } from './pages/Home';
import { MatrixCalculator } from './pages/MatrixCalculator';
import { LatexSymbols } from './pages/LatexSymbols';
import { LatexColors } from './pages/LatexColors';
import { LatexPlayground } from './pages/LatexPlayground';
import { LatexArrays } from './pages/LatexArrays';
import { LatexFonts } from './pages/LatexFonts';
import { LatexScripts } from './pages/LatexScripts';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { cn } from './utils/cn';

// --- Types ---
export type Page = 'home' | 'about' | 'contact' | 'matrix' | 'latex-symbols' | 'latex-colors' | 'latex-fonts' | 'latex-scripts' | 'latex-playground' | 'latex-arrays';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isMathToolsOpen, setIsMathToolsOpen] = useState(false);
  const [isLatexToolsOpen, setIsLatexToolsOpen] = useState(false);
  const [isMobileMathToolsOpen, setIsMobileMathToolsOpen] = useState(false);
  const [isMobileLatexToolsOpen, setIsMobileLatexToolsOpen] = useState(false);



  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home onExplore={() => setActivePage('latex-symbols')} onAbout={() => setActivePage('about')} />;
      case 'matrix':
        return <MatrixCalculator />;
      case 'latex-symbols':
        return <LatexSymbols />;
      case 'latex-colors':
        return <LatexColors />;
      case 'latex-fonts':
        return <LatexFonts />;
      case 'latex-scripts':
        return <LatexScripts />;
      case 'latex-playground':
        return <LatexPlayground />;
      case 'latex-arrays':
        return <LatexArrays />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onExplore={() => setActivePage('latex-symbols')} onAbout={() => setActivePage('about')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-win-bg font-sans transition-colors duration-300">
      {/* Top Header */}
      <header className="h-12 flex items-center px-2 z-50 bg-win-bg shrink-0 relative">
        <div className={cn("flex items-center transition-all duration-300 shrink-0 pl-12 md:pl-0 w-auto", isSidebarCollapsed ? "md:w-20" : "md:w-64")}>
          <div className="hidden md:flex w-16 items-center justify-center shrink-0">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-black/[0.03] dark:hover:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 shrink-0 overflow-hidden">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              M
            </div>
            <span className="font-semibold text-[var(--win-text)] tracking-tight text-sm whitespace-nowrap">MathPortfolio</span>
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="lg:hidden p-1.5 hover:bg-black/[0.03] dark:hover:bg-white/5 rounded-md text-gray-500 transition-colors ml-1"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-none">
          <div className="relative w-full pointer-events-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              placeholder="搜尋教材或功能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="win-input w-full pl-9 pr-9 py-1.5"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-win-accent transition-colors"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 lg:flex-none lg:w-64 flex justify-end px-4"></div>

        <AnimatePresence>
          {isMobileSearchOpen && (
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileSearchOpen(false)}
                className="fixed inset-0 bg-black/20 z-[120]"
              />
              <motion.div
                initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 right-0 h-16 bg-win-bg border-b border-win-border z-[130] flex items-center px-4 shadow-lg"
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    autoFocus
                    type="text"
                    placeholder="搜尋教材或功能..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="win-input w-full pl-10 pr-16 py-2 text-base"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setSearchQuery('')}
                          className="p-1.5 text-gray-400 hover:text-win-accent transition-colors"
                        >
                          <X size={18} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                    <button onClick={() => setIsMobileSearchOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600">
                      <ChevronRight className="rotate-90" size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="hero-glow top-[-100px] left-[-100px] bg-win-accent/10" />
        <div className="hero-glow bottom-[-100px] right-[-100px] bg-emerald-500/5" />

        <motion.aside
          animate={{ width: isSidebarCollapsed ? 80 : 256 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="hidden md:flex flex-col bg-win-bg z-40 shrink-0 transform-gpu"
        >
          <nav className="flex-1 px-2 mt-2">
            <SidebarItem icon={HomeIcon} label="首頁" active={activePage === 'home'} onClick={() => setActivePage('home')} collapsed={isSidebarCollapsed} />

            {/* LaTeX Tools */}
            <SidebarItem
              icon={Sigma}
              label="LaTeX 工具"
              active={activePage.startsWith('latex')}
              onClick={() => isSidebarCollapsed ? setIsSidebarCollapsed(false) : setIsLatexToolsOpen(!isLatexToolsOpen)}
              collapsed={isSidebarCollapsed}
              isNav={false}
              suffix={
                <motion.div animate={{ rotate: isLatexToolsOpen ? 180 : 0 }}>
                  <ChevronDown size={14} />
                </motion.div>
              }
            />
            <AnimatePresence>
              {isLatexToolsOpen && !isSidebarCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <SidebarItem
                    label="LaTeX 常用符號表"
                    active={activePage === 'latex-symbols'}
                    onClick={() => setActivePage('latex-symbols')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                  <SidebarItem
                    label="LaTeX 顏色樣式"
                    active={activePage === 'latex-colors'}
                    onClick={() => setActivePage('latex-colors')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                  <SidebarItem
                    label="LaTeX 文字與字型"
                    active={activePage === 'latex-fonts'}
                    onClick={() => setActivePage('latex-fonts')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                  <SidebarItem
                    label="LaTeX 上下標與積分"
                    active={activePage === 'latex-scripts'}
                    onClick={() => setActivePage('latex-scripts')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                  <SidebarItem
                    label="LaTeX 陣列與方程"
                    active={activePage === 'latex-arrays'}
                    onClick={() => setActivePage('latex-arrays')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                  <SidebarItem
                    label="LaTeX 試算區"
                    active={activePage === 'latex-playground'}
                    onClick={() => setActivePage('latex-playground')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Math Tools */}
            <SidebarItem
              icon={Calculator}
              label="數學小工具"
              active={activePage === 'matrix'}
              onClick={() => isSidebarCollapsed ? setIsSidebarCollapsed(false) : setIsMathToolsOpen(!isMathToolsOpen)}
              collapsed={isSidebarCollapsed}
              isNav={false}
              suffix={
                <motion.div animate={{ rotate: isMathToolsOpen ? 180 : 0 }}>
                  <ChevronDown size={14} />
                </motion.div>
              }
            />
            <AnimatePresence>
              {isMathToolsOpen && !isSidebarCollapsed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <SidebarItem
                    label="矩陣計算機"
                    active={activePage === 'matrix'}
                    onClick={() => setActivePage('matrix')}
                    collapsed={isSidebarCollapsed}
                    isSubItem
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <SidebarItem icon={Mail} label="聯絡資訊" active={activePage === 'contact'} onClick={() => setActivePage('contact')} collapsed={isSidebarCollapsed} />
          </nav>

          <div className="px-2 mb-2 space-y-1">

            <SidebarItem icon={Settings} label="設定" active={isSettingsOpen} onClick={() => setIsSettingsOpen(true)} collapsed={isSidebarCollapsed} isNav={false} />
          </div>

          <div className="px-2 border-t border-win-border">
            <SidebarItem
              icon={<div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden"><img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" /></div>}
              label={
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-xs font-medium text-[var(--win-text)]">李 老師</span>
                  <span className="text-[10px] text-gray-500">國高中數學/資訊教師</span>
                </div>
              }
              active={activePage === 'about'}
              onClick={() => setActivePage('about')}
              collapsed={isSidebarCollapsed}
              isNav={false}
            />
          </div>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-[70] md:hidden" />
              <motion.div
                initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-64 bg-win-bg border-r border-win-border z-[80] md:hidden p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">M</div><span className="font-semibold text-[var(--win-text)]">MathPortfolio</span></div>
                  <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                </div>
                <nav className="space-y-2">
                  <button onClick={() => { setActivePage('home'); setIsMobileMenuOpen(false); }} className={cn("flex items-center w-full p-3 rounded-lg", activePage === 'home' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}><HomeIcon size={20} className="mr-3" /> 首頁</button>

                  {/* Mobile LaTeX Tools */}
                  <div>
                    <button onClick={() => setIsMobileLatexToolsOpen(!isMobileLatexToolsOpen)} className="flex items-center justify-between w-full p-3 rounded-lg text-gray-400"><div className="flex items-center"><Sigma size={20} className="mr-3" /> LaTeX 工具</div><ChevronDown size={16} /></button>
                    {isMobileLatexToolsOpen && (
                      <div className="mt-1 space-y-1">
                        <button onClick={() => { setActivePage('latex-symbols'); setIsMobileMenuOpen(false); }} className="flex items-center w-full pl-12 py-2 text-sm text-gray-400">常用符號表</button>
                        <button onClick={() => { setActivePage('latex-colors'); setIsMobileMenuOpen(false); }} className="flex items-center w-full pl-12 py-2 text-sm text-gray-400">顏色樣式</button>
                        <button onClick={() => { setActivePage('latex-fonts'); setIsMobileMenuOpen(false); }} className="flex items-center w-full pl-12 py-2 text-sm text-gray-400">文字與字型</button>
                        <button onClick={() => { setActivePage('latex-scripts'); setIsMobileMenuOpen(false); }} className="flex items-center w-full pl-12 py-2 text-sm text-gray-400">上下標與積分</button>
                        <button onClick={() => { setActivePage('latex-arrays'); setIsMobileMenuOpen(false); }} className="flex items-center w-full pl-12 py-2 text-sm text-gray-400">陣列與方程</button>
                        <button onClick={() => { setActivePage('latex-playground'); setIsMobileMenuOpen(false); }} className="flex items-center w-full pl-12 py-2 text-sm text-gray-400">試算區</button>
                      </div>
                    )}
                  </div>

                  <button onClick={() => { setActivePage('contact'); setIsMobileMenuOpen(false); }} className={cn("flex items-center w-full p-3 rounded-lg", activePage === 'contact' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}><Mail size={20} className="mr-3" /> 聯絡資訊</button>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-hidden relative bg-win-surface rounded-tl-2xl border-t border-l border-win-border shadow-2xl">
          <AnimatePresence mode="wait">
            {renderActivePage()}
          </AnimatePresence>
        </main>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setIsSettingsOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="win-card w-full max-w-lg bg-win-surface/90 backdrop-blur-xl border border-win-border flex flex-col">
              <div className="p-6 border-b border-win-border flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Settings size={18} /> 設定</h3>
                <button onClick={() => setIsSettingsOpen(false)}><X size={20} /></button>
              </div>
              <div className="p-6 space-y-8">
                <section className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2"><Palette size={16} /> 個人化</h4>
                  <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-win-border">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Moon size={18} className="text-win-accent" /> : <Sun size={18} className="text-amber-500" />}
                      <div><div className="text-sm font-medium">深色模式</div><div className="text-xs text-slate-500">調整應用程式外觀</div></div>
                    </div>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className={cn("w-10 h-5 rounded-full relative transition-colors", isDarkMode ? "bg-win-accent" : "bg-gray-300")}>
                      <motion.div animate={{ x: isDarkMode ? 22 : 4 }} className={cn("absolute top-1 w-3 h-3 rounded-full", isDarkMode ? "bg-black" : "bg-white")} />
                    </button>
                  </div>
                </section>
                <section className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2"><Info size={16} /> 關於</h4>
                  <div className="flex flex-col">
                    <button onClick={() => setIsAboutExpanded(!isAboutExpanded)} className={cn("w-full p-4 flex items-center gap-4 bg-black/5 dark:bg-white/5 rounded-t-lg transition-colors border border-win-border", isAboutExpanded ? "rounded-b-none border-b-transparent" : "rounded-lg")}>
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">M</div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">MathPortfolio</div>
                        <div className="text-[10px] text-slate-500">© 2025 Microsoft. All rights reserved.</div>
                      </div>
                      <span className="text-[13px] text-white font-normal mr-1">1.1.0.0</span>
                      <ChevronDown size={16} className={cn("transition-transform duration-300", isAboutExpanded && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {isAboutExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-black/5 dark:bg-white/[0.03] border-x border-b border-win-border rounded-b-lg"
                        >
                          <div className="flex flex-col text-[13px]">
                            {/* GitHub Clone Section */}
                            <div className="p-4 border-t border-win-border flex items-center justify-between group">
                              <span className="text-slate-400">To clone this repository</span>
                              <div className="flex items-center gap-2 bg-black/20 dark:bg-black/40 px-3 py-1.5 rounded border border-win-border">
                                <code className="text-[11px] font-mono text-slate-300">git clone https://github.com/microsoft/WinUI-Gallery</code>
                                <button
                                  onClick={() => navigator.clipboard.writeText("git clone https://github.com/microsoft/WinUI-Gallery")}
                                  className="p-1 hover:bg-white/10 rounded transition-colors"
                                >
                                  <Copy size={12} className="text-slate-400" />
                                </button>
                              </div>
                            </div>

                            {/* Bug Report Section */}
                            <button className="p-4 border-t border-win-border flex items-center justify-between hover:bg-white/5 transition-colors group text-left">
                              <span className="text-slate-400">File a bug or request new sample</span>
                              <ExternalLink size={14} className="text-slate-500 group-hover:text-win-accent transition-colors" />
                            </button>

                            {/* Dependencies Section */}
                            <div className="p-4 border-t border-win-border bg-black/10 dark:bg-black/20 pb-6">
                              <div className="text-slate-400 font-medium mb-3">Dependencies & references</div>
                              <div className="space-y-2.5 flex flex-col items-start px-2">
                                <a href="#" className="text-sky-400 hover:underline leading-none">WinUI 3</a>
                              </div>
                            </div>

                            {/* Legal Section */}
                            <div className="p-4 border-t border-win-border bg-black/5 dark:bg-white/[0.01]">
                              <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-tighter opacity-80">
                                THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </div>
              <div className="p-4 border-t border-win-border flex justify-end gap-3">
                <button onClick={() => setIsSettingsOpen(false)} className="win-button-primary text-xs">關閉</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
