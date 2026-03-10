import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { LatexExampleCard } from '../components/LatexExampleCard';
import { ComboBox } from '../components/ComboBox';
import { Checkbox } from '../components/Checkbox';
import { InfoBar } from '../components/InfoBar';

export const LatexFonts: React.FC = () => {
    // State for font selection
    const [selectedMathFont, setSelectedMathFont] = useState<'mathbb' | 'mathrm' | 'mathsf' | 'mathfrak' | 'mathtt'>('mathbb');

    // State for interactive font styles
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isSmallCaps, setIsSmallCaps] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [textContent, setTextContent] = useState('LaTeX Styling');

    const generateFontStyleLatex = () => {
        let result = textContent;
        if (isBold) result = `\\textbf{${result}}`;
        if (isItalic) result = `\\textit{${result}}`;
        if (isUnderline) result = `\\underline{${result}}`;
        if (isSmallCaps) result = `\\textsc{${result}}`;
        if (isStrikethrough) result = `\\sout{${result}}`;
        return result;
    };

    const mathFontLatexUpper = `\\${selectedMathFont}{ABCDEFGHIJKLMNOPQRSTUVWXYZ}`;
    const mathFontLatexLower = `\\${selectedMathFont}{abcdefghijklmnopqrstuvwxyz}`;
    const mathFontLatexNumber = `\\${selectedMathFont}{0123456789}`;
    const mathFontLatexGreekUpper = `\\${selectedMathFont}{ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣＴΥΦΧΨΩ}`;
    const mathFontLatexGreekLower = `\\${selectedMathFont}{αβγδεζηθικλμνξοπρστυφχψω}`;

    // Font Style Controls Component
    const FontStyleControls = (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-slate-400">要套用的文字</label>
                <input
                    type="text"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="win-input w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs py-2 px-3"
                    placeholder="請輸入內容..."
                />
            </div>

            <div className="flex flex-col gap-1 pt-1">
                <label className="text-[11px] font-medium text-slate-400 mb-1">樣式選取</label>
                <Checkbox label="粗體 (\textbf)" checked={isBold} onChange={setIsBold} />
                <Checkbox label="斜體 (\textit)" checked={isItalic} onChange={setIsItalic} />
                <Checkbox label="下底線 (\underline)" checked={isUnderline} onChange={setIsUnderline} />
                <Checkbox label="小型大寫 (\textsc)" checked={isSmallCaps} onChange={setIsSmallCaps} />
                <Checkbox label="刪除線 (\sout)" checked={isStrikethrough} onChange={setIsStrikethrough} />
            </div>
        </div>
    );

    // Math Font Controls Component
    const MathFontControls = (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-slate-400">選擇字體樣式</label>
                <ComboBox
                    value={selectedMathFont}
                    onChange={(val) => setSelectedMathFont(val as any)}
                    options={[
                        { value: 'mathbb', label: '黑板報粗體 (Blackboard Bold)' },
                        { value: 'mathrm', label: '羅馬體 (Roman)' },
                        { value: 'mathsf', label: '無襯線體 (Sans Serif)' },
                        { value: 'mathfrak', label: '哥德體 (Fraktur)' },
                        { value: 'mathtt', label: '打字機體 (Typewriter)' }
                    ]}
                    className="w-full"
                />
            </div>
        </div>
    );

    return (
        <PageLayout title="LaTeX 文字與字型" id="latex-fonts">
            <div className="flex flex-col h-full overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
                    {/* Example Grid */}
                    <div className="grid grid-cols-1 gap-2">
                        {/* Interactive Font Style Example */}
                        <LatexExampleCard
                            title="字體樣式 (Font Styles)"
                            description="粗體、斜體、下底線、小型大寫、刪除線。使用右側面板切換樣式。"
                            latex={generateFontStyleLatex()}
                            controls={FontStyleControls}
                            extra={
                                <InfoBar
                                    severity="warning"
                                    title="注意"
                                    message="\textsc 在部分網站無法支援顯示，可能會顯示錯誤"
                                />
                            }
                        />

                        {/* Static Example */}
                        <LatexExampleCard
                            title="字體大小 (Font Sizes)"
                            description="從 tiny 到 Huge 的各種大小設定。"
                            latex="{\tiny tiny}\quad{\small small}\quad{\normalsize normal}\quad{\large large}\quad{\huge huge}\quad{\Huge Huge}"
                        />

                        {/* Interactive Math Font Example */}
                        <LatexExampleCard
                            title="數學模式字體 (Math Mode Fonts)"
                            description="在數學公式中使用的特殊字體。使用右側面板切換樣式。"
                            latex={mathFontLatexUpper + "\\\\" + mathFontLatexLower + "\\\\" + mathFontLatexNumber + "\\\\" + mathFontLatexGreekUpper + "\\\\" + mathFontLatexGreekLower}
                            controls={MathFontControls}
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
