import React, { useState } from 'react';
import { Search, Copy, X } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { MathRenderer } from '../components/MathRenderer';
import { LATEX_SYMBOLS, LatexSymbol } from '../data/latexSymbols';
import { cn } from '../utils/cn';
import { AnimatePresence, motion } from 'motion/react';

export const LatexSymbols: React.FC = () => {
    const [latexSearchQuery, setLatexSearchQuery] = useState('');
    const [selectedLatexSymbol, setSelectedLatexSymbol] = useState<LatexSymbol>(LATEX_SYMBOLS[0]);

    const filteredSymbols = LATEX_SYMBOLS.filter(s =>
        s.name.toLowerCase().includes(latexSearchQuery.toLowerCase()) ||
        s.latex.toLowerCase().includes(latexSearchQuery.toLowerCase()) ||
        s.tags.some(t => t.toLowerCase().includes(latexSearchQuery.toLowerCase()))
    );

    const SearchAction = null;

    return (
        <PageLayout title="LaTeX 常用符號表" id="latex-symbols" action={SearchAction}>
            <div className="flex flex-col h-full overflow-hidden pt-2">
                {/* Controls Row: Search */}
                <div className="flex items-center justify-between gap-4 mb-2 pr-1">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-win-text/40" size={14} />
                        <input
                            type="text"
                            placeholder="搜尋符號..."
                            value={latexSearchQuery}
                            onChange={(e) => setLatexSearchQuery(e.target.value)}
                            className="win-input w-full pl-9 pr-9 py-1.5 h-[32px] text-xs transition-all duration-200"
                        />
                        <AnimatePresence>
                            {latexSearchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setLatexSearchQuery('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-win-accent transition-colors"
                                >
                                    <X size={12} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Main Content Area - Integrated Layout */}
                <div className="flex-1 flex flex-col w-full group/card overflow-hidden">
                    <div className="win-card border border-win-border rounded-xl shadow-2xl bg-win-surface/30 flex flex-col relative overflow-hidden flex-1">
                        <div className="flex flex-1 min-h-0 overflow-hidden">
                            {/* Left Side: Symbol Grid */}
                            <div className="flex-1 p-8 flex flex-col bg-[#202020] relative">
                                <div className="absolute top-3 left-4 text-[10px] text-white/20 font-mono uppercase tracking-widest pointer-events-none">
                                    Symbol Library — {filteredSymbols.length}
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mt-4 scroll-smooth">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2">
                                        {filteredSymbols.map((symbol) => (
                                            <button
                                                key={symbol.id}
                                                onClick={() => setSelectedLatexSymbol(symbol)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center aspect-square p-2 rounded-lg border transition-all duration-150 group relative",
                                                    selectedLatexSymbol.id === symbol.id
                                                        ? "bg-white/[0.08] dark:bg-white/[0.08] border-win-accent shadow-[0_0_0_0.5px_var(--win-accent)]"
                                                        : "bg-[#2b2b2b] border-transparent hover:bg-[#373737]"
                                                )}
                                            >
                                                <div className="flex-1 flex items-center justify-center">
                                                    <MathRenderer
                                                        content={symbol.latex}
                                                        className={cn(
                                                            "text-2xl transition-transform duration-200 group-hover:scale-110",
                                                            "text-white"
                                                        )}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-normal truncate w-full px-2 text-center pb-1">
                                                    {symbol.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Symbol Details (Integrated) */}
                            <div className="w-80 bg-[#2b2b2b] border-l border-win-border p-6 flex flex-col hidden lg:flex relative z-10 box-border">
                                <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4">
                                    Selection Details
                                </div>
                                <div className="flex items-center justify-center w-full aspect-square max-h-[140px] bg-white/[0.02] rounded-xl border border-white/5 mb-6 shadow-inner shrink-0 group">
                                    <MathRenderer
                                        content={selectedLatexSymbol.latex}
                                        displayMode
                                        className="text-4xl text-white transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-1">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] text-slate-400 font-medium">符號名稱 (Name)</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[14px] font-semibold text-white/90">{selectedLatexSymbol.name}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(selectedLatexSymbol.name)}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製名稱"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] text-slate-400 font-medium">LaTeX 代碼 (Latex)</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[12px] font-mono text-win-accent break-all">{selectedLatexSymbol.latex}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(selectedLatexSymbol.latex)}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製代碼"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    {selectedLatexSymbol.antonym && (
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-slate-400 font-medium">反義符號 (Antonym)</label>
                                            <div className="flex items-center justify-between group">
                                                <div className="text-[12px] font-mono text-win-accent break-all">
                                                    {selectedLatexSymbol.antonym}
                                                </div>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(selectedLatexSymbol.antonym!)}
                                                    className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                    title="複製反義符號"
                                                >
                                                    <Copy size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {selectedLatexSymbol.package && (
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] text-slate-400 font-medium">額外資料包 (Package)</label>
                                            <div className="flex items-center justify-between group">
                                                <div className="text-[12px] font-mono text-win-accent">{`\\usepackage{${selectedLatexSymbol.package}}`}</div>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`\\usepackage{${selectedLatexSymbol.package}}`)}
                                                    className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                    title="複製 Package 指令"
                                                >
                                                    <Copy size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <label className="text-[11px] text-slate-400 font-medium">標籤 (Tags)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedLatexSymbol.tags.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setLatexSearchQuery(tag)}
                                                    className="px-2.5 py-0.5 bg-white/[0.05] text-slate-400 rounded hover:bg-white/10 border border-white/5 transition-colors text-[10px]"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 mt-auto border-t border-white/5">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(selectedLatexSymbol.latex)}
                                        className="win-button-primary w-full py-2.5 flex items-center justify-center gap-2 text-[12px] font-medium"
                                    >
                                        <Copy size={15} /> 複製 LaTeX 代碼
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
