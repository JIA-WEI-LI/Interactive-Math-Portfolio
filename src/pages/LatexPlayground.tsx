import React, { useState } from 'react';
import { Edit3, Eye } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { MathRenderer } from '../components/MathRenderer';

export const LatexPlayground: React.FC = () => {
    const [playgroundLatex, setPlaygroundLatex] = useState('\\int_{a}^{b} x^2 \\, dx = \\frac{b^3 - a^3}{3}');

    return (
        <PageLayout title="LaTeX 試算區" id="latex-playground">
            <div className="flex flex-col h-full overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 pb-12">
                    {/* Editor Panel */}
                    <div className="flex flex-col gap-4 min-h-0">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Edit3 size={14} /> 編輯器
                            </label>
                            <button
                                onClick={() => setPlaygroundLatex('')}
                                className="text-[10px] text-slate-400 hover:text-win-accent transition-colors"
                            >
                                清空內容
                            </button>
                        </div>
                        <div className="flex-1 win-card bg-win-surface/50 overflow-hidden flex flex-col border border-win-border rounded-xl">
                            <textarea
                                value={playgroundLatex}
                                onChange={(e) => setPlaygroundLatex(e.target.value)}
                                placeholder="在此輸入 LaTeX 代碼..."
                                className="flex-1 w-full p-6 bg-transparent outline-none resize-none font-mono text-sm text-[var(--win-text)] custom-scrollbar"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="flex flex-col gap-4 min-h-0">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Eye size={14} /> 即時預覽
                        </label>
                        <div className="flex-1 win-card bg-win-surface/50 flex items-center justify-center p-8 overflow-auto custom-scrollbar border border-win-border rounded-xl shadow-inner">
                            <div className="max-w-full">
                                {playgroundLatex.trim() ? (
                                    <MathRenderer
                                        content={playgroundLatex}
                                        displayMode
                                        className="text-4xl text-win-accent"
                                    />
                                ) : (
                                    <span className="text-slate-400 italic text-sm">預覽區域</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="win-card p-4 bg-win-accent/5 border border-win-accent/20 rounded-xl flex flex-wrap items-center gap-4">
                    <span className="text-xs font-bold text-win-accent uppercase tracking-widest">常用範例:</span>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: '分數', code: '\\frac{a}{b}' },
                            { label: '根號', code: '\\sqrt{x^2 + y^2}' },
                            { label: '矩陣', code: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
                            { label: '極限', code: '\\lim_{x \\to \\infty} f(x)' },
                            { label: '積分', code: '\\int_{0}^{\\pi} \\sin(x) \\, dx' }
                        ].map(example => (
                            <button
                                key={example.label}
                                onClick={() => setPlaygroundLatex(prev => prev + (prev ? ' ' : '') + example.code)}
                                className="px-3 py-1 bg-white dark:bg-white/5 border border-win-border rounded-md text-[10px] text-slate-500 hover:bg-win-accent/10 hover:text-win-accent hover:border-win-accent/30 transition-all"
                            >
                                {example.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
