import React, { useState } from 'react';
import { Search, Copy, X, ArrowUpAz, ArrowDownAz, Palette } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { LATEX_COLORS, LatexColor } from '../data/latexColors';
import { cn } from '../utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { ColorPicker } from '../components/ColorPicker';
import { DropDownButton } from '../components/DropDownButton';

export const LatexColors: React.FC = () => {
    const [colorSearchQuery, setColorSearchQuery] = useState('');
    const [selectedColor, setSelectedColor] = useState<LatexColor>(LATEX_COLORS[0]);
    const [sortPrinciple, setSortPrinciple] = useState<'default' | 'name' | 'brightness'>('default');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [customHex, setCustomHex] = useState('#FFFFFF');
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const customColorItem: LatexColor = {
        id: 'custom-color',
        name: '自定義顏色',
        latex: `\\color[HTML]{${customHex.replace('#', '').slice(0, 6)}}`,
        hex: customHex.length > 7 ? customHex.slice(0, 7) : customHex, // Use 6-digit hex for normal display if needed, but let's keep full for CSS
    };

    const filteredColors = LATEX_COLORS
        .map((c, index) => ({ ...c, originalIndex: index }))
        .filter(c =>
            c.name.toLowerCase().includes(colorSearchQuery.toLowerCase()) ||
            c.latex.toLowerCase().includes(colorSearchQuery.toLowerCase()) ||
            c.hex.toLowerCase().includes(colorSearchQuery.toLowerCase())
        );

    // Sort results
    filteredColors.sort((a, b) => {
        let valA: any, valB: any;
        if (sortPrinciple === 'name') {
            valA = a.name;
            valB = b.name;
        } else {
            valA = a.originalIndex;
            valB = b.originalIndex;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Always append custom color at the end
    const finalColors = [...filteredColors, customColorItem];

    const currentColor = selectedColor.id === 'custom-color' ? customColorItem : selectedColor;

    const SearchAction = null;

    const hexToRgb = (hex: string) => {
        const h = hex.startsWith('#') ? hex : `#${hex}`;
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return { r, g, b };
    };

    const rgbToCmyk = (r: number, g: number, b: number) => {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, Math.min(m, y));

        if (k === 1) return `0%, 0%, 0%, 100%`;

        c = Math.round(((c - k) / (1 - k)) * 100) || 0;
        m = Math.round(((m - k) / (1 - k)) * 100) || 0;
        y = Math.round(((y - k) / (1 - k)) * 100) || 0;
        k = Math.round(k * 100);

        return `${c}%, ${m}%, ${y}%, ${k}%`;
    };

    const rgb = hexToRgb(currentColor.hex);

    return (
        <PageLayout title="LaTeX 顏色樣式" id="latex-colors" action={SearchAction}>
            <div className="flex flex-col h-full overflow-hidden pt-2">
                {/* Controls Row: Search + Sorting */}
                <div className="flex items-center justify-between gap-4 mb-2 pr-1">
                    {/* Left side: Search box merged into the controls row */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-win-text/40" size={14} />
                        <input
                            type="text"
                            placeholder="搜尋顏色..."
                            value={colorSearchQuery}
                            onChange={(e) => setColorSearchQuery(e.target.value)}
                            className="win-input w-full pl-9 pr-9 py-1.5 h-[32px] text-xs transition-all duration-200"
                        />
                        <AnimatePresence>
                            {colorSearchQuery && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setColorSearchQuery('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-win-accent transition-colors"
                                >
                                    <X size={12} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right side: Sorting controls */}
                    <div className="flex items-center gap-2">
                        <DropDownButton
                            value={sortPrinciple}
                            variant="ghost"
                            onChange={(val) => setSortPrinciple(val as any)}
                            options={[
                                { value: 'default', label: '預設排列' },
                                { value: 'name', label: '名稱 (A-Z)' }
                            ]}
                        />
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-1.5 h-[32px] rounded-md hover:bg-white/10 text-white/50 hover:text-white/90 transition-all flex items-center gap-1"
                            title={sortOrder === 'asc' ? '正序' : '倒序'}
                        >
                            {sortOrder === 'asc' ? <ArrowUpAz size={14} /> : <ArrowDownAz size={14} />}
                        </button>
                    </div>
                </div>

                {/* Main Content Area - Integrated Layout */}
                <div className="flex-1 flex flex-col w-full group/card overflow-hidden">
                    <div className="win-card border border-win-border rounded-xl shadow-2xl bg-win-surface/30 flex flex-col relative overflow-hidden flex-1">
                        <div className="flex flex-1 min-h-0 overflow-hidden">
                            {/* Left Side: Color Grid */}
                            <div className="flex-1 p-8 flex flex-col bg-[#202020] relative">
                                <div className="absolute top-3 left-4 text-[10px] text-white/20 font-mono uppercase tracking-widest pointer-events-none">
                                    Color Library
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mt-4 scroll-smooth">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2">
                                        {finalColors.map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => setSelectedColor(color)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center aspect-square p-[2px] rounded-lg border transition-all duration-150 group relative",
                                                    selectedColor.id === color.id
                                                        ? "bg-white/[0.08] border-win-accent shadow-[0_0_0_0.5px_var(--win-accent)]"
                                                        : "bg-[#2b2b2b] border-transparent hover:bg-[#373737]"
                                                )}
                                            >
                                                <div className="flex-1 flex items-center justify-center w-full p-0">
                                                    {color.id === 'custom-color' ? (
                                                        <div className="w-full h-full flex items-center justify-center rounded-[2px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border border-white/10">
                                                            <Palette size={24} className="text-white drop-shadow-md" />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="w-full h-full rounded-[2px] shadow-sm border border-white/10"
                                                            style={{ backgroundColor: color.hex }}
                                                        />
                                                    )}
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-normal truncate w-full px-1 text-center mt-0.5 pb-[1px]">
                                                    {color.name}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Color Details (Integrated) */}
                            <div className="w-80 bg-[#2b2b2b] border-l border-win-border p-6 flex flex-col hidden lg:flex relative z-10 box-border">
                                <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4">
                                    Color Details
                                </div>
                                <div className="flex items-center justify-center w-full aspect-square max-h-[140px] bg-white/[0.02] rounded-xl border border-white/5 mb-4 shadow-inner shrink-0 group p-4">
                                    {currentColor.id === 'custom-color' ? (
                                        <button
                                            onClick={() => setIsPickerOpen(true)}
                                            className="w-full h-full rounded-lg shadow-lg border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-win-accent/20 flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                                            style={{ backgroundColor: currentColor.hex }}
                                        >
                                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                                            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white z-10 transition-all group-hover:scale-110">
                                                <Palette size={24} />
                                            </div>
                                        </button>
                                    ) : (
                                        <div
                                            className="w-full h-full rounded-lg shadow-lg border border-white/10 transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundColor: currentColor.hex }}
                                        />
                                    )}
                                </div>

                                <div className="space-y-2.5 flex-1 overflow-y-auto custom-scrollbar pr-1">
                                    <div className="space-y-0.5">
                                        <label className="text-[11px] text-slate-400 font-medium">顏色名稱 (Name)</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[14px] font-semibold text-white/90">{currentColor.name}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(currentColor.name)}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製名稱"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <label className="text-[11px] text-slate-400 font-medium">LaTeX 代碼 (Latex)</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[12px] font-mono text-win-accent break-all">{currentColor.latex}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(currentColor.latex)}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製代碼"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <label className="text-[11px] text-slate-400 font-medium">HEX 色碼</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[12px] font-mono text-white/80">{currentColor.hex}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(currentColor.hex)}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製色碼"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <label className="text-[11px] text-slate-400 font-medium">RGB 值</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[12px] font-mono text-white/80">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(`${rgb.r}, ${rgb.g}, ${rgb.b}`)}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製 RGB"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <label className="text-[11px] text-slate-400 font-medium">CMYK 值</label>
                                        <div className="flex items-center justify-between group">
                                            <div className="text-[12px] font-mono text-white/80">{rgbToCmyk(rgb.r, rgb.g, rgb.b)}</div>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(rgbToCmyk(rgb.r, rgb.g, rgb.b))}
                                                className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                title="複製 CMYK"
                                            >
                                                <Copy size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    {currentColor.package && (
                                        <div className="space-y-0.5">
                                            <label className="text-[11px] text-slate-400 font-medium">額外資料包 (Package)</label>
                                            <div className="flex items-center justify-between group">
                                                <div className="text-[12px] font-mono text-win-accent">{`\\usepackage{${currentColor.package}}`}</div>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`\\usepackage{${currentColor.package}}`)}
                                                    className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/90 transition-all"
                                                    title="複製 Package 指令"
                                                >
                                                    <Copy size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 mt-auto border-t border-white/5">
                                    <button
                                        onClick={() => navigator.clipboard.writeText(currentColor.latex)}
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

            <ColorPicker
                isOpen={isPickerOpen}
                onClose={() => setIsPickerOpen(false)}
                color={customHex}
                onChange={(newHex) => {
                    setCustomHex(newHex);
                }}
            />
        </PageLayout>
    );
};

