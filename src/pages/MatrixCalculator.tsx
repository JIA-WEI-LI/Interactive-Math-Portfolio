import React, { useState } from 'react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { PageLayout } from '../components/PageLayout';
import { ComboBox } from '../components/ComboBox';
import { cn } from '../utils/cn';

export const MatrixCalculator: React.FC = () => {
    const [matrix, setMatrix] = useState([[0, 0], [0, 0]]);
    const [matrixB, setMatrixB] = useState([[0, 0], [0, 0]]);
    const [matrixResult, setMatrixResult] = useState<string | null>(null);
    const [matrixOperation, setMatrixOperation] = useState<'2x2-all' | '2x2-binary' | '3x3-all' | '3x3-binary'>('2x2-all');
    const [matrixOperator, setMatrixOperator] = useState<'+' | '-'>('+');

    const handleMatrixChange = (row: number, col: number, value: string) => {
        if (value === '') {
            const newMatrix = [...matrix.map(r => [...r])];
            newMatrix[row][col] = 0;
            setMatrix(newMatrix);
            return;
        }
        let numValue = parseFloat(value);
        if (isNaN(numValue)) return;
        numValue = Math.max(-65535, Math.min(65535, numValue));
        const newMatrix = [...matrix.map(r => [...r])];
        newMatrix[row][col] = numValue;
        setMatrix(newMatrix);
    };

    const handleMatrixBChange = (row: number, col: number, value: string) => {
        if (value === '') {
            const newMatrix = [...matrixB.map(r => [...r])];
            newMatrix[row][col] = 0;
            setMatrixB(newMatrix);
            return;
        }
        let numValue = parseFloat(value);
        if (isNaN(numValue)) return;
        numValue = Math.max(-65535, Math.min(65535, numValue));
        const newMatrix = [...matrixB.map(r => [...r])];
        newMatrix[row][col] = numValue;
        setMatrixB(newMatrix);
    };

    const handleCalculateMatrix = () => {
        if (matrixOperation === '2x2-all') {
            const a = matrix[0][0];
            const b = matrix[0][1];
            const c = matrix[1][0];
            const d = matrix[1][1];
            const det = a * d - b * c;
            let result = `行列式：\n$$\\det(A) = ${det}$$\n\n`;
            if (det === 0) {
                result += `反矩陣：\n此矩陣不可逆 ($\\det = 0$)`;
            } else {
                const invA = (d / det).toFixed(2);
                const invB = (-b / det).toFixed(2);
                const invC = (-c / det).toFixed(2);
                const invD = (a / det).toFixed(2);
                result += `反矩陣：\n$$A^{-1} = \\begin{bmatrix} ${invA} & ${invB} \\\\ ${invC} & ${invD} \\end{bmatrix}$$`;
            }
            setMatrixResult(result);
        } else if (matrixOperation === '2x2-binary') {
            const op = matrixOperator === '+' ? 1 : -1;
            const res = [
                [matrix[0][0] + op * matrixB[0][0], matrix[0][1] + op * matrixB[0][1]],
                [matrix[1][0] + op * matrixB[1][0], matrix[1][1] + op * matrixB[1][1]]
            ];
            const opLabel = matrixOperator === '+' ? '加法' : '減法';
            const result = `矩陣${opLabel}結果：\n$$A ${matrixOperator} B = \\begin{bmatrix} ${res[0][0]} & ${res[0][1]} \\\\ ${res[1][0]} & ${res[1][1]} \\end{bmatrix}$$`;
            setMatrixResult(result);
        } else if (matrixOperation === '3x3-all') {
            const m = matrix;
            const det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
                m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
                m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
            let result = `行列式：\n$$\\det(A) = ${det}$$\n\n`;
            if (det === 0) {
                result += `反矩陣：\n此矩陣不可逆 ($\\det = 0$)`;
            } else {
                const getCofactor = (row: number, col: number) => {
                    const sub = [];
                    for (let r = 0; r < 3; r++) {
                        if (r === row) continue;
                        const subRow = [];
                        for (let c = 0; c < 3; c++) {
                            if (c === col) continue;
                            subRow.push(m[r][c]);
                        }
                        sub.push(subRow);
                    }
                    return (sub[0][0] * sub[1][1] - sub[0][1] * sub[1][0]) * ((row + col) % 2 === 0 ? 1 : -1);
                };
                const adj = [];
                for (let i = 0; i < 3; i++) {
                    const adjRow = [];
                    for (let j = 0; j < 3; j++) {
                        adjRow.push(getCofactor(j, i));
                    }
                    adj.push(adjRow);
                }
                const inv = adj.map(row => row.map(val => (val / det).toFixed(2)));
                result += `反矩陣：\n$$A^{-1} = \\begin{bmatrix} ${inv[0][0]} & ${inv[0][1]} & ${inv[0][2]} \\\\ ${inv[1][0]} & ${inv[1][1]} & ${inv[1][2]} \\\\ ${inv[2][0]} & ${inv[2][1]} & ${inv[2][2]} \\end{bmatrix}$$`;
            }
            setMatrixResult(result);
        } else if (matrixOperation === '3x3-binary') {
            const op = matrixOperator === '+' ? 1 : -1;
            const res = matrix.map((row, i) => row.map((val, j) => val + op * matrixB[i][j]));
            const opLabel = matrixOperator === '+' ? '加法' : '減法';
            const result = `矩陣${opLabel}結果：\n$$A ${matrixOperator} B = \\begin{bmatrix} ${res[0][0]} & ${res[0][1]} & ${res[0][2]} \\\\ ${res[1][0]} & ${res[1][1]} & ${res[1][2]} \\\\ ${res[2][0]} & ${res[2][1]} & ${res[2][2]} \\end{bmatrix}$$`;
            setMatrixResult(result);
        }
    };

    return (
        <PageLayout title="矩陣計算機" id="matrix">
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-12">
                <div className="max-w-4xl mx-auto w-full space-y-12 py-8 px-4 md:px-8">
                    <section className="flex flex-col items-center space-y-8">
                        <ComboBox
                            value={matrixOperation}
                            onChange={(val) => {
                                const op = val as '2x2-all' | '2x2-binary' | '3x3-all' | '3x3-binary';
                                setMatrixOperation(op);
                                setMatrixResult(null);
                                const size = op.startsWith('3x3') ? 3 : 2;
                                const currentSize = matrix.length;
                                if (size !== currentSize) {
                                    const newM = Array(size).fill(0).map(() => Array(size).fill(0));
                                    setMatrix(newM);
                                    setMatrixB(newM.map(row => [...row]));
                                }
                            }}
                            options={[
                                { value: '2x2-all', label: '2x2 行列式/反矩陣' },
                                { value: '2x2-binary', label: '2x2 矩陣運算' },
                                { value: '3x3-all', label: '3x3 行列式/反矩陣' },
                                { value: '3x3-binary', label: '3x3 矩陣運算' }
                            ]}
                            className="w-full max-w-xs"
                        />

                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="relative p-8 bg-win-surface/50 rounded-3xl border border-win-border shadow-sm">
                                <div className="absolute left-4 top-8 bottom-8 w-3 border-l-4 border-t-4 border-b-4 border-win-accent/30 rounded-l-lg" />
                                <div className="absolute right-4 top-8 bottom-8 w-3 border-r-4 border-t-4 border-b-4 border-win-accent/30 rounded-r-lg" />
                                <div className={cn("grid gap-4", matrix.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
                                    {matrix.map((row, i) => (
                                        row.map((val, j) => (
                                            <input
                                                key={`A-${i}-${j}`}
                                                type="number"
                                                value={val === 0 ? '' : val}
                                                onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                                                className="matrix-input"
                                                placeholder="0"
                                                style={{ width: `${Math.max(3.5, (val.toString().length + 1))}rem` }}
                                            />
                                        ))
                                    ))}
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-win-accent text-white text-[10px] font-bold rounded-full uppercase tracking-widest">矩陣 A</div>
                            </div>

                            {matrixOperation.endsWith('binary') && (
                                <>
                                    <div className="w-16">
                                        <ComboBox
                                            value={matrixOperator}
                                            onChange={(val) => setMatrixOperator(val as '+' | '-')}
                                            options={[{ value: '+', label: '+' }, { value: '-', label: '-' }]}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="relative p-8 bg-win-surface/50 rounded-3xl border border-win-border shadow-sm">
                                        <div className="absolute left-4 top-8 bottom-8 w-3 border-l-4 border-t-4 border-b-4 border-win-accent/30 rounded-l-lg" />
                                        <div className="absolute right-4 top-8 bottom-8 w-3 border-r-4 border-t-4 border-b-4 border-win-accent/30 rounded-r-lg" />
                                        <div className={cn("grid gap-4", matrixB.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
                                            {matrixB.map((row, i) => (
                                                row.map((val, j) => (
                                                    <input
                                                        key={`B-${i}-${j}`}
                                                        type="number"
                                                        value={val === 0 ? '' : val}
                                                        onChange={(e) => handleMatrixBChange(i, j, e.target.value)}
                                                        className="matrix-input"
                                                        placeholder="0"
                                                        style={{ width: `${Math.max(3.5, (val.toString().length + 1))}rem` }}
                                                    />
                                                ))
                                            ))}
                                        </div>
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-win-accent text-white text-[10px] font-bold rounded-full uppercase tracking-widest">矩陣 B</div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button onClick={handleCalculateMatrix} className="win-button-primary">計算矩陣</button>
                        </div>

                        {matrixResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 bg-win-accent/5 rounded-2xl border border-win-accent/20 w-full max-w-md text-center"
                            >
                                <div className="text-xs font-semibold text-win-accent uppercase tracking-widest mb-4">運算結果</div>
                                <div className="text-[var(--win-text)] markdown-body">
                                    <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                        {matrixResult}
                                    </Markdown>
                                </div>
                            </motion.div>
                        )}
                    </section>
                </div>
            </div>
        </PageLayout>
    );
};
