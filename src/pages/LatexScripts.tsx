import React, { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { LatexExampleCard } from '../components/LatexExampleCard';
import { ComboBox } from '../components/ComboBox';

export const LatexScripts: React.FC = () => {
    // State for vector interaction
    const [vectorStyle, setVectorStyle] = useState<string>('\\vec');
    const [vectorContent, setVectorContent] = useState<string>('AB');

    const examples = [
        {
            title: "基礎上下標 (Subscripts & Superscripts)",
            description: "使用 ^ 表示上標，使用 _ 表示下標。若內容超過一個字元，須使用大括號 {} 包裹；也可以同時使用上下標，或是在上下標中嵌套其他上下標。",
            latex: "{}_a^b\\!X_c^d"
        },
        {
            title: "上下括號符號 (Brackets)",
            description: "使用 \\overbrace{} 與 \\underbrace{} 定義上下括號符號。",
            latex: "\\overbrace{ 1+2+\\cdots+100 }^{5050}\\\\\n\\underbrace{ a+b+\\cdots+z }_{26}"
        },
        {
            title: "積分符號 (Integrals)",
            description: "使用 \\int 定義積分。上下限與上下標語法相同。",
            latex: "\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}"
        },
        {
            title: "總和與乘積 (Sum & Product)",
            description: "使用 \\sum 與 \\prod。在行間公式 (display mode) 中，上下限會置於符號正上下方。",
            latex: "\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2} \\quad \\And \\quad \\prod_{k=1}^{\\infty} (1 + a_k)"
        },
        {
            title: "極限 (Limits)",
            description: "使用 \\lim 並且通常會在下方標註趨近值。",
            latex: "\\lim_{x \\to \\infty} \\left( 1 + \\frac{1}{x} \\right)^x = e"
        }
    ];

    // Vector Controls component
    const VectorControls = (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-slate-400">選擇標註樣式</label>
                <ComboBox
                    value={vectorStyle}
                    onChange={(val) => setVectorStyle(val)}
                    options={[
                        { value: '\\vec', label: '標準向量 (\\vec)' },
                        { value: '\\overleftarrow', label: '左箭頭 (\\overleftarrow)' },
                        { value: '\\overrightarrow', label: '右箭頭 (\\overrightarrow)' },
                        { value: '\\overleftrightarrow', label: '雙箭頭 (\\overleftrightarrow)' },
                        { value: '\\widehat', label: '大帽子 (\\widehat)' }
                    ]}
                    className="w-full"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-slate-400">向量內容 (文字)</label>
                <input
                    type="text"
                    value={vectorContent}
                    onChange={(e) => setVectorContent(e.target.value)}
                    className="win-input w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs py-2"
                    placeholder="例如: AB"
                />
            </div>
        </div>
    );

    return (
        <PageLayout title="LaTeX 上下標與積分" id="latex-scripts">
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
                    <div className="grid grid-cols-1 gap-2">
                        {/* Static Examples (Part 1) */}
                        <LatexExampleCard
                            title={examples[0].title}
                            description={examples[0].description}
                            latex={examples[0].latex}
                        />

                        {/* Interactive Vector Example */}
                        <LatexExampleCard
                            title="向量與標註 (Vectors & Overlines)"
                            description="使用右側面板切換樣式與修改向量名稱。"
                            latex={`${vectorStyle}{${vectorContent}}`}
                            controls={VectorControls}
                        />

                        {/* Static Examples (Remaining) */}
                        {examples.slice(1).map((item, index) => (
                            <LatexExampleCard
                                key={index + 1}
                                title={item.title}
                                description={item.description}
                                latex={item.latex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};
