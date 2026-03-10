import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, BookOpen, Github, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '../utils/cn';

interface MenuSection {
    title: string;
    items: { label: string; href?: string }[];
}

interface HeaderMenuButtonProps {
    label: string;
    icon: React.ReactNode;
    sections: MenuSection[];
    disabled?: boolean;
}

const HeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({ label, icon, sections, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-[12px] transition-all duration-200 border",
                    disabled
                        ? "bg-white/[0.02] border-white/[0.02] text-white/30 cursor-default"
                        : isOpen
                            ? "bg-white/[0.08] border-white/10 text-white"
                            : "bg-white/[0.04] border-white/[0.05] text-white/90 hover:bg-white/[0.08] hover:border-white/10"
                )}
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <span>{label}</span>
                </div>
                <ChevronDown size={12} className={cn("ml-1 opacity-60 transition-transform duration-200", isOpen && "rotate-180", disabled && "opacity-20")} />
            </button>

            <AnimatePresence>
                {isOpen && !disabled && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 w-64 z-[100] bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl overflow-hidden backdrop-blur-lg"
                    >
                        <div className="py-2">
                            {sections.map((section, sIdx) => (
                                <div key={sIdx}>
                                    <div className="px-4 py-2 flex items-center justify-between">
                                        <span className="text-[11px] font-medium text-white/50 tracking-wide">{section.title}</span>
                                        <Info size={13} className="text-white/30" />
                                    </div>
                                    <div className="flex flex-col">
                                        {section.items.map((item, iIdx) => (
                                            <a
                                                key={iIdx}
                                                href={item.href || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 text-left text-[14px] text-[#60cdff] hover:bg-white/5 transition-colors flex items-center justify-between group"
                                            >
                                                {item.label}
                                                <ExternalLink size={12} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                                            </a>
                                        ))}
                                    </div>
                                    {sIdx < sections.length - 1 && <div className="my-1 border-t border-white/5" />}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
    id: string;
    action?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children, id, action }) => {
    const sourceSections: MenuSection[] = [];

    // Only add data source section for specific pages
    if (id === 'latex-symbols') {
        sourceSections.push({
            title: "控制項原始碼",
            items: [{ label: "latexSymbols.ts", href: "https://github.com/JIA-WEI-LI/Interactive-Math-Portfolio/blob/main/src/data/latexSymbols.ts" }]
        });
    } else if (id === 'latex-colors') {
        sourceSections.push({
            title: "控制項原始碼",
            items: [{ label: "latexColors.ts", href: "https://github.com/JIA-WEI-LI/Interactive-Math-Portfolio/blob/main/src/data/latexColors.ts" }]
        });
    }

    // Always add the page source section
    sourceSections.push({
        title: "頁面原始碼",
        items: [
            { label: "Typescript (TSX)", href: `https://github.com/JIA-WEI-LI/Interactive-Math-Portfolio/blob/main/src/pages/${id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}.tsx` }
        ]
    });

    const documentationSections: MenuSection[] = id === 'matrix' ? [] : [
        {
            title: "線上參考資源",
            items: id === 'latex-symbols'
                ? [
                    { label: "LaTeX/Mathematics", href: "https://en.wikibooks.org/wiki/LaTeX/Mathematics" },
                    { label: "KaTeX Supported Functions", href: "https://katex.org/docs/supported.html" }
                ]
                : [
                    { label: "KaTeX Supported Functions", href: "https://katex.org/docs/supported.html" }
                ]
        }
    ];

    return (
        <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full w-full overflow-hidden"
        >
            <div className="win-page-header">
                <div className="flex items-end justify-between w-full pr-8">
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-semibold tracking-tight text-[var(--win-text)]">{title}</h2>
                            <button className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 transition-colors">
                                <Info size={16} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <HeaderMenuButton
                                label="Documentation"
                                icon={<BookOpen size={14} />}
                                sections={documentationSections}
                                disabled={id === 'matrix'}
                            />
                            <HeaderMenuButton
                                label="Source"
                                icon={<Github size={14} />}
                                sections={sourceSections}
                            />
                        </div>
                    </div>
                    {action && (
                        <div className="flex-1 max-w-sm ml-8 mb-0.5">
                            {action}
                        </div>
                    )}
                </div>
            </div>
            <div className="win-page-content">
                {children}
            </div>
        </motion.div>
    );
};
