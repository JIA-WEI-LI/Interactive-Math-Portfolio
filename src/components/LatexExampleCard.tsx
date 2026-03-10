import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MathRenderer } from './MathRenderer';
import { cn } from '../utils/cn';

interface LatexExampleCardProps {
    title: string;
    description?: string;
    latex: string;
    controls?: React.ReactNode;
    extra?: React.ReactNode;
}

export const LatexExampleCard: React.FC<LatexExampleCardProps> = ({ title, description, latex, controls, extra }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(latex);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="flex flex-col mb-10 w-full group/card">
            {/* Context Title */}
            <h4 className="text-base font-bold text-[var(--win-text)] mb-2 px-1">{title}</h4>

            {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed px-1">
                    {description}
                </p>
            )}

            {extra && (
                <div className="mb-5 px-1">
                    {extra}
                </div>
            )}

            <div className="win-card border border-win-border rounded-xl shadow-sm bg-win-surface/30 flex flex-col relative z-0 hover:z-10 transition-[z-index] duration-0">
                {/* Upper Section: Preview + Controls */}
                <div className="flex flex-col lg:flex-row min-h-[160px] border-b border-win-border rounded-t-xl overflow-visible">
                    {/* Left Half: Preview Section */}
                    <div className="flex-1 p-12 flex items-center justify-center bg-[#202020] relative overflow-auto custom-scrollbar rounded-tl-xl lg:rounded-none">
                        <div className="max-w-full">
                            <MathRenderer
                                content={latex}
                                displayMode
                                className="text-3xl text-white"
                            />
                        </div>
                        <div className="absolute top-3 left-4 text-[10px] text-white/20 font-mono uppercase tracking-widest pointer-events-none">
                            Preview Output
                        </div>
                    </div>

                    {/* Right Half: Control Panel (Visible only if controls are provided) */}
                    {controls && (
                        <div className="lg:w-72 bg-[#2b2b2b] border-l border-win-border p-6 flex flex-col gap-4 lg:rounded-tr-xl relative z-30">
                            <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-2">
                                Controls
                            </div>
                            {controls}
                        </div>
                    )}
                </div>

                {/* Lower Section: Toggle Bar */}
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "flex items-center justify-between px-5 h-10 cursor-pointer transition-colors group select-none relative z-20",
                        "bg-[#303338] hover:bg-[#383b42]",
                        !isExpanded && "rounded-b-xl"
                    )}
                >
                    <span className="text-xs font-medium text-slate-300">
                        顯示代碼
                    </span>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-slate-400 group-hover:text-slate-200 transition-colors"
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </div>

                {/* Collapsible Code Section */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden bg-[#2d2e32] border-t border-win-border relative group/code rounded-b-xl"
                        >
                            <div className="p-6 pr-14">
                                <SyntaxHighlighter
                                    language="tex"
                                    style={vscDarkPlus}
                                    customStyle={{
                                        margin: 0,
                                        padding: 0,
                                        background: 'transparent',
                                        fontSize: '14px',
                                        lineHeight: '1.6'
                                    }}
                                    PreTag="div"
                                >
                                    {latex}
                                </SyntaxHighlighter>
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy();
                                }}
                                className="absolute top-4 right-4 p-2.5 rounded-md bg-transparent text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                                title="複製 LaTeX 代碼"
                            >
                                {isCopied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
