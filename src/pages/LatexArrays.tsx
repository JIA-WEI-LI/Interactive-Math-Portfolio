import React from 'react';
import { PageLayout } from '../components/PageLayout';
import { LatexExampleCard } from '../components/LatexExampleCard';

export const LatexArrays: React.FC = () => {
    const examples = [
        {
            title: "基礎矩陣 (matrix)",
            description: "最基本的矩陣形式，不帶有外框括號。使用 matrix 環境定義。",
            latex: "\\begin{matrix}\n  a & b \\\\\n  c & d\n\\end{matrix}"
        },
        {
            title: "中括號矩陣 (bmatrix)",
            description: "數學中最常用的矩陣形式，帶有方括號。使用 bmatrix 環境。",
            latex: "\\begin{bmatrix}\n  a & b \\\\\n  c & d \\\\\n\\end{bmatrix}"
        },
        {
            title: "大括號矩陣 (Bmatrix)",
            description: "數學中最常用的矩陣形式，帶有大括號。使用 Bmatrix 環境。",
            latex: "\\begin{Bmatrix}\n  a & b \\\\\n  c & d \\\\\n\\end{Bmatrix}"
        },
        {
            title: "圓括號矩陣 (Pmatrix)",
            description: "另一種常見的矩陣表示法，帶有圓括號。使用 pmatrix 環境。",
            latex: "\\begin{pmatrix}\n  a & b \\\\\n  c & d\n\\end{pmatrix}"
        },
        {
            title: "行列式 (vmatrix)",
            description: "數學中最常用的行列式形式，帶有長直線。使用 vmatrix 環境。",
            latex: "\\begin{vmatrix}\n a & b \\\\\n c & d\n\\end{vmatrix}"
        },
        {
            title: "行列式 (Vmatrix)",
            description: "數學中最常用的行列式形式，帶有雙長直線。使用 Vmatrix 環境。",
            latex: "\\begin{Vmatrix}\n a & b \\\\\n c & d\n\\end{Vmatrix}"
        },
        {
            title: "聯立方程式 (Cases)",
            description: "用於定義分段函數或聯立方程組，自動加上左側大括號。",
            latex: "f(x) = \\begin{cases}\n  x^2 & \\text{if } x > 0 \\\\\n  0 & \\text{if } x = 0 \\\\\n  -x^2 & \\text{if } x < 0\n\\end{cases}"
        },
        {
            title: "對齊環境 (Align)",
            description: "用於多行公式的精確對齊，通常使用 & 符號指定對齊位置（如等號）。",
            latex: "\\begin{align*}\n  (a+b)^2 &= a^2 + 2ab + b^2 \\\\\n  (a-b)^2 &= a^2 - 2ab + b^2 \\\\\n  a^2 - b^2 &= (a+b)(a-b)\n\\end{align*}"
        },
        {
            title: "多行公式 (Gather)",
            description: "單純將多行公式置中排列，不進行特定位置的對齊。",
            latex: "\\begin{gather*}\n  2x + y = 8 \\\\\n  x - 3y = -2\n\\end{gather*}"
        },
        {
            title: "陣列 (Array)",
            description: "透過 array 環境，可模擬出類似表格的功能。",
            latex: "\\begin{array}{|c|c||c|}\n a & b & S \\\\\n \\hline \n 0 & 0 &1 \\\\\n 0 & 1 & 1 \\\\\n 1 & 0 & 1 \\\\\n 1 & 1 & 0 \\\\\n \\end{array}"
        },
    ];

    return (
        <PageLayout title="LaTeX 陣列與方程" id="latex-arrays">
            <div className="flex flex-col h-full overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
                    {/* Example Grid */}
                    <div className="grid grid-cols-1 gap-2">
                        {examples.map((item, index) => (
                            <LatexExampleCard
                                key={index}
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
