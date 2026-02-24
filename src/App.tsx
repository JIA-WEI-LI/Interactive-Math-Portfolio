/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { 
  Home, 
  User, 
  BookOpen, 
  Mail, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  Check,
  Plus,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  GraduationCap,
  Calendar,
  MapPin,
  Search,
  Sparkles,
  Settings,
  Moon,
  Sun,
  Palette,
  Info,
  Copy,
  Send,
  RotateCcw,
  Calculator,
  Sigma,
  Type,
  List,
  Edit3,
  Eye
} from 'lucide-react';
import { MathRenderer } from './components/MathRenderer';
import { cn } from './utils/cn';

// --- Types ---
type Page = 'home' | 'about' | 'portfolio' | 'contact' | 'ai' | 'matrix' | 'latex-symbols' | 'latex-playground';
type Category = 'all' | 'junior' | 'senior';

interface Project {
  id: number;
  title: string;
  category: Category;
  description: string;
  mathFormula: string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface LatexSymbol {
  id: string;
  name: string;
  latex: string;
  category: string;
  tags: string[];
}

// --- Data ---
const LATEX_SYMBOLS: LatexSymbol[] = [
  { id: 'alpha', name: 'Alpha', latex: '\\alpha', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'beta', name: 'Beta', latex: '\\beta', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'gamma', name: 'Gamma', latex: '\\gamma', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'delta', name: 'Delta', latex: '\\delta', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'epsilon', name: 'Epsilon', latex: '\\epsilon', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'zeta', name: 'Zeta', latex: '\\zeta', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'eta', name: 'Eta', latex: '\\eta', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'theta', name: 'Theta', latex: '\\theta', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'iota', name: 'Iota', latex: '\\iota', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'kappa', name: 'Kappa', latex: '\\kappa', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'lambda', name: 'Lambda', latex: '\\lambda', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'mu', name: 'Mu', latex: '\\mu', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'nu', name: 'Nu', latex: '\\nu', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'xi', name: 'Xi', latex: '\\xi', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'pi', name: 'Pi', latex: '\\pi', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'rho', name: 'Rho', latex: '\\rho', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'sigma', name: 'Sigma', latex: '\\sigma', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'tau', name: 'Tau', latex: '\\tau', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'phi', name: 'Phi', latex: '\\phi', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'chi', name: 'Chi', latex: '\\chi', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'psi', name: 'Psi', latex: '\\psi', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'omega', name: 'Omega', latex: '\\omega', category: 'Greek', tags: ['greek', 'lowercase'] },
  { id: 'sum', name: 'Summation', latex: '\\sum', category: 'Operator', tags: ['operator', 'big'] },
  { id: 'prod', name: 'Product', latex: '\\prod', category: 'Operator', tags: ['operator', 'big'] },
  { id: 'int', name: 'Integral', latex: '\\int', category: 'Operator', tags: ['operator', 'big'] },
  { id: 'infty', name: 'Infinity', latex: '\\infty', category: 'Symbol', tags: ['math', 'infinite'] },
  { id: 'approx', name: 'Approximate', latex: '\\approx', category: 'Relation', tags: ['relation', 'equal'] },
  { id: 'neq', name: 'Not Equal', latex: '\\neq', category: 'Relation', tags: ['relation', 'equal'] },
  { id: 'le', name: 'Less than or equal', latex: '\\le', category: 'Relation', tags: ['relation', 'inequality'] },
  { id: 'ge', name: 'Greater than or equal', latex: '\\ge', category: 'Relation', tags: ['relation', 'inequality'] },
  { id: 'rightarrow', name: 'Right Arrow', latex: '\\rightarrow', category: 'Arrow', tags: ['arrow', 'direction'] },
  { id: 'leftarrow', name: 'Left Arrow', latex: '\\leftarrow', category: 'Arrow', tags: ['arrow', 'direction'] },
  { id: 'forall', name: 'For All', latex: '\\forall', category: 'Logic', tags: ['logic', 'quantifier'] },
  { id: 'exists', name: 'Exists', latex: '\\exists', category: 'Logic', tags: ['logic', 'quantifier'] },
  { id: 'nabla', name: 'Nabla', latex: '\\nabla', category: 'Symbol', tags: ['calculus', 'vector'] },
  { id: 'partial', name: 'Partial', latex: '\\partial', category: 'Symbol', tags: ['calculus', 'derivative'] },
  { id: 'times', name: 'Times', latex: '\\times', category: 'Operator', tags: ['math', 'multiplication'] },
  { id: 'div', name: 'Divide', latex: '\\div', category: 'Operator', tags: ['math', 'division'] },
  { id: 'pm', name: 'Plus-Minus', latex: '\\pm', category: 'Operator', tags: ['math', 'plus', 'minus'] },
  { id: 'mp', name: 'Minus-Plus', latex: '\\mp', category: 'Operator', tags: ['math', 'minus', 'plus'] },
  { id: 'cdot', name: 'Center Dot', latex: '\\cdot', category: 'Operator', tags: ['math', 'multiplication'] },
  { id: 'cap', name: 'Intersection', latex: '\\cap', category: 'Set', tags: ['set', 'logic'] },
  { id: 'cup', name: 'Union', latex: '\\cup', category: 'Set', tags: ['set', 'logic'] },
  { id: 'subset', name: 'Subset', latex: '\\subset', category: 'Set', tags: ['set', 'relation'] },
  { id: 'supset', name: 'Superset', latex: '\\supset', category: 'Set', tags: ['set', 'relation'] },
  { id: 'in', name: 'Element of', latex: '\\in', category: 'Set', tags: ['set', 'membership'] },
  { id: 'notin', name: 'Not element of', latex: '\\notin', category: 'Set', tags: ['set', 'membership'] },
  { id: 'emptyset', name: 'Empty Set', latex: '\\emptyset', category: 'Set', tags: ['set', 'null'] },
  { id: 'sqrt', name: 'Square Root', latex: '\\sqrt{x}', category: 'Function', tags: ['math', 'root'] },
  { id: 'log', name: 'Logarithm', latex: '\\log', category: 'Function', tags: ['math', 'log'] },
  { id: 'sin', name: 'Sine', latex: '\\sin', category: 'Function', tags: ['math', 'trig'] },
  { id: 'cos', name: 'Cosine', latex: '\\cos', category: 'Function', tags: ['math', 'trig'] },
  { id: 'tan', name: 'Tangent', latex: '\\tan', category: 'Function', tags: ['math', 'trig'] },
  { id: 'theta_cap', name: 'Theta (Cap)', latex: '\\Theta', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'sigma_cap', name: 'Sigma (Cap)', latex: '\\Sigma', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'omega_cap', name: 'Omega (Cap)', latex: '\\Omega', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'delta_cap', name: 'Delta (Cap)', latex: '\\Delta', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'gamma_cap', name: 'Gamma (Cap)', latex: '\\Gamma', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'lambda_cap', name: 'Lambda (Cap)', latex: '\\Lambda', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'phi_cap', name: 'Phi (Cap)', latex: '\\Phi', category: 'Greek', tags: ['greek', 'uppercase'] },
  { id: 'psi_cap', name: 'Psi (Cap)', latex: '\\Psi', category: 'Greek', tags: ['greek', 'uppercase'] },
];

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "幾何證明動態圖解",
    category: "junior",
    description: "利用動態幾何軟體展示畢氏定理的視覺化證明過程。",
    mathFormula: "a^2 + b^2 = c^2",
    longDescription: "本教材旨在透過動態調整直角三角形的邊長，即時觀察三個正方形面積的變化，幫助學生直觀理解幾何關係。包含多種證明路徑的切換與互動式練習。",
    imageUrl: "https://picsum.photos/seed/math1/800/600",
    tags: ["幾何", "動態圖解", "國中數學"]
  },
  {
    id: 2,
    title: "單位圓與三角函數",
    category: "senior",
    description: "探索單位圓上的坐標與三角函數值的對應關係。",
    mathFormula: "\\sin^2 \\theta + \\cos^2 \\theta = 1",
    longDescription: "從單位圓的定義出發，將正弦、餘弦、正切函數視覺化為圓上的線段長度。支援角度滑動與週期性圖形的同步繪製。",
    imageUrl: "https://picsum.photos/seed/math2/800/600",
    tags: ["三角函數", "高中數學", "互動教學"]
  },
  {
    id: 3,
    title: "微積分基礎：極限觀念",
    category: "senior",
    description: "透過割線趨近切線的過程，建立導數的初步概念。",
    mathFormula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    longDescription: "利用極限的概念，展示函數在某一點的瞬時變化率。本教材包含豐富的函數範例，讓學生親自操作趨近過程，破除對無限小的恐懼。",
    imageUrl: "https://picsum.photos/seed/math3/800/600",
    tags: ["微積分", "極限", "高中數學"]
  },
  {
    id: 4,
    title: "二次函數拋物線特徵",
    category: "junior",
    description: "分析係數對拋物線開口、頂點與對稱軸的影響。",
    mathFormula: "y = ax^2 + bx + c",
    longDescription: "透過調整 a, b, c 三個參數，即時觀察拋物線在坐標平面上的平移與伸縮。適合國三學生進行探究式學習。",
    imageUrl: "https://picsum.photos/seed/math4/800/600",
    tags: ["代數", "二次函數", "國中數學"]
  }
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick,
  collapsed,
  isNav = true
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  collapsed: boolean,
  isNav?: boolean
}) => (
  <motion.button
    layout="position"
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-4 py-2.5 my-1 rounded-lg transition-colors duration-200 group relative border border-transparent transform-gpu",
      active 
        ? "bg-black/[0.06] dark:bg-white/10 text-[var(--win-text)] border-black/5 dark:border-white/5" 
        : "text-gray-500 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-[var(--win-text)]"
    )}
  >
    {active && isNav && (
      <motion.div 
        layoutId="active-pill"
        className="absolute left-0 w-1 h-5 bg-win-accent rounded-full"
      />
    )}
    <div className="flex items-center justify-center w-8 shrink-0">
      <Icon size={18} />
    </div>
    <motion.div
      initial={false}
      animate={{ 
        width: collapsed ? 0 : "auto",
        opacity: collapsed ? 0 : 1,
        marginLeft: collapsed ? 0 : 12
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden whitespace-nowrap text-sm font-medium transform-gpu"
    >
      {label}
    </motion.div>
    {collapsed && (
      <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#2b2b2b] text-white text-[11px] rounded-md border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </motion.button>
);

interface ComboBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ value, onChange, options, className }) => {
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

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="win-input w-full flex items-center justify-between pr-10 cursor-pointer text-left h-9"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[100] w-full min-w-[200px] bg-[#2c2c2c] border border-white/10 rounded-xl shadow-2xl p-1"
          >
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm transition-all text-left rounded-md relative mb-0.5 last:mb-0",
                    isSelected 
                      ? "bg-white/10 text-white font-medium" 
                      : "text-gray-300 hover:bg-white/5"
                  )}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="combo-indicator"
                      className="absolute left-1 w-[3px] h-4 bg-win-accent rounded-full"
                    />
                  )}
                  <span className="truncate pl-3">{option.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PageLayout = ({ title, children, id }: { title: string, children: React.ReactNode, id: string }) => (
  <motion.div
    key={id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="flex flex-col h-full w-full overflow-hidden"
  >
    <div className="win-page-header">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-3xl font-bold text-[var(--win-text)]">{title}</h2>
        <button className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 transition-colors">
          <Info size={16} />
        </button>
      </div>
      <div className="flex gap-2">
        <button className="win-button-secondary text-xs py-1 px-3 flex items-center gap-2">
          <BookOpen size={14} /> Documentation
        </button>
        <button className="win-button-secondary text-xs py-1 px-3 flex items-center gap-2">
          <Github size={14} /> Source
        </button>
      </div>
    </div>
    <div className="win-page-content">
      {children}
    </div>
  </motion.div>
);

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isMathToolsOpen, setIsMathToolsOpen] = useState(false);
  const [isLatexToolsOpen, setIsLatexToolsOpen] = useState(false);
  const [isMobileMathToolsOpen, setIsMobileMathToolsOpen] = useState(false);
  const [isMobileLatexToolsOpen, setIsMobileLatexToolsOpen] = useState(false);
  
  // LaTeX Symbols State
  const [latexSearchQuery, setLatexSearchQuery] = useState('');
  const [selectedLatexSymbol, setSelectedLatexSymbol] = useState<LatexSymbol>(LATEX_SYMBOLS[0]);

  // LaTeX Playground State
  const [playgroundLatex, setPlaygroundLatex] = useState('\\int_{a}^{b} x^2 \\, dx = \\frac{b^3 - a^3}{3}');

  // Matrix Calculator State
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
    
    // Limits +-65535
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
    
    // Limits +-65535
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
            adjRow.push(getCofactor(j, i)); // Transpose cofactors
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

  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: 'model', text: '你好！我是你的 AI 數學學習助手。你可以問我任何關於國高中數學或資訊科學的問題，我會盡力為你解答！' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isAiLoading) return;

    const userMsg = userInput.trim();
    setUserInput('');
    const newMessages: Message[] = [...chatMessages, { role: 'user', text: userMsg }];
    setChatMessages(newMessages);
    setIsAiLoading(true);

    try {
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: newMessages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `你是一位專業的國高中數學與資訊教師。你的回答應該親切、專業，並遵循以下格式規範：
1. **強調重點**：適當使用 **粗體**、*斜體* 或 ~~刪除線~~ 來強調關鍵概念或注意事項。
2. **數學公式**：使用 LaTeX 格式。行內公式用 $...$。重要的公式、定理或推導過程請務必使用獨立區塊格式 $$...$$，這會讓公式置中並有額外的上下間距。
3. **結構化內容**：使用分隔線 --- 來區分不同的章節或主題。
4. **程式碼**：撰寫程式碼時，請務必使用 Markdown 的程式碼區塊語法，並註明對應的程式語言（例如 \`\`\`python 或 \`\`\`cpp），這會啟用語法高亮。
5. **禁忌**：不要在回答的開頭說『我是李老師』或做自我介紹。
6. **範圍**：如果使用者問的問題與數學或資訊無關，請禮貌地引導回這些領域。
請使用繁體中文回答。`
        }
      });

      const response = await model;
      const aiText = response.text || "抱歉，我現在無法回答這個問題。";
      setChatMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages(prev => [...prev, { role: 'model', text: "連線發生錯誤，請稍後再試。" }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredProjects = PROJECTS.filter(p => 
    (filter === 'all' || p.category === filter) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-win-bg font-sans transition-colors duration-300">
      {/* Top Header - Unified across sidebar and content */}
      <header className="h-12 flex items-center px-2 z-50 bg-win-bg shrink-0 relative">
        {/* Left Section: Toggle + Title + Mobile Search Button */}
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
            
            {/* Mobile Search Trigger - Visible only on small screens */}
            <button 
              onClick={() => setIsMobileSearchOpen(true)}
              className="lg:hidden p-1.5 hover:bg-black/[0.03] dark:hover:bg-white/5 rounded-md text-gray-500 transition-colors ml-1"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
        
        {/* Desktop Search Bar - Fixed Center, Hidden on small screens */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-none">
          <div className="relative w-full pointer-events-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text"
              placeholder="搜尋教材或功能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="win-input w-full pl-9 pr-4 py-1.5"
            />
          </div>
        </div>

        {/* Right Spacer */}
        <div className="flex-1 lg:flex-none lg:w-64 flex justify-end px-4">
           {/* Placeholder for profile/settings in header if needed */}
        </div>

        {/* Mobile Search Dropdown */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <div className="lg:hidden">
              {/* Overlay to catch clicks outside */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSearchOpen(false)}
                className="fixed inset-0 bg-black/20 z-[120]"
              />
              {/* Search Box Dropdown */}
              <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
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
                    className="win-input w-full pl-10 pr-10 py-2 text-base"
                  />
                  <button 
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Background Glows */}
        <div className="hero-glow top-[-100px] left-[-100px] bg-win-accent/10" />
        <div className="hero-glow bottom-[-100px] right-[-100px] bg-emerald-500/5" />

        {/* Sidebar - Desktop */}
        <motion.aside 
          animate={{ width: isSidebarCollapsed ? 80 : 256 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="hidden md:flex flex-col bg-win-bg z-40 shrink-0 transform-gpu"
        >
          <nav className="flex-1 px-2 mt-2">
          <SidebarItem 
            icon={Home} 
            label="首頁" 
            active={activePage === 'home'} 
            onClick={() => setActivePage('home')}
            collapsed={isSidebarCollapsed}
          />
          <SidebarItem 
            icon={BookOpen} 
            label="作品集" 
            active={activePage === 'portfolio'} 
            onClick={() => setActivePage('portfolio')}
            collapsed={isSidebarCollapsed}
          />

          {/* LaTeX Tools Expandable */}
          <motion.div layout="position" className="relative">
            <motion.button
              layout="position"
              onClick={() => {
                if (isSidebarCollapsed) {
                  setIsSidebarCollapsed(false);
                  setIsLatexToolsOpen(true);
                } else {
                  setIsLatexToolsOpen(!isLatexToolsOpen);
                }
              }}
              className={cn(
                "flex items-center w-full px-4 py-2.5 my-1 rounded-lg transition-colors duration-200 group relative border border-transparent transform-gpu",
                (isLatexToolsOpen && !isSidebarCollapsed)
                  ? "text-[var(--win-text)]" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-[var(--win-text)]"
              )}
            >
              <div className="flex items-center justify-center w-8 shrink-0">
                <Sigma size={18} />
              </div>
              <motion.div
                initial={false}
                animate={{ 
                  width: isSidebarCollapsed ? 0 : "auto",
                  opacity: isSidebarCollapsed ? 0 : 1,
                  marginLeft: isSidebarCollapsed ? 0 : 12
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium flex-1 text-left transform-gpu"
              >
                LaTeX 工具
              </motion.div>
              {!isSidebarCollapsed && (
                <motion.div
                  animate={{ rotate: isLatexToolsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400"
                >
                  <ChevronDown size={14} />
                </motion.div>
              )}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#2b2b2b] text-white text-[11px] rounded-md border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                  LaTeX 工具
                </div>
              )}
            </motion.button>

            <AnimatePresence>
              {isLatexToolsOpen && !isSidebarCollapsed && (
                <motion.div
                  key="latex-tools-sub"
                  layout="position"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden transform-gpu"
                >
                  <motion.button
                    layout="position"
                    onClick={() => setActivePage('latex-symbols')}
                    className={cn(
                      "flex items-center w-full pl-[60px] pr-4 py-2 my-0.5 rounded-lg transition-colors duration-200 group relative border border-transparent text-xs transform-gpu",
                      activePage === 'latex-symbols'
                        ? "bg-black/[0.06] dark:bg-white/10 text-[var(--win-text)] border-black/5 dark:border-white/5" 
                        : "text-gray-500 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-[var(--win-text)]"
                    )}
                  >
                    <span className="whitespace-nowrap overflow-hidden">LaTeX 符號表</span>
                  </motion.button>
                  <motion.button
                    layout="position"
                    onClick={() => setActivePage('latex-playground')}
                    className={cn(
                      "flex items-center w-full pl-[60px] pr-4 py-2 my-0.5 rounded-lg transition-colors duration-200 group relative border border-transparent text-xs transform-gpu",
                      activePage === 'latex-playground'
                        ? "bg-black/[0.06] dark:bg-white/10 text-[var(--win-text)] border-black/5 dark:border-white/5" 
                        : "text-gray-500 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-[var(--win-text)]"
                    )}
                  >
                    <span className="whitespace-nowrap overflow-hidden">LaTeX 試算區</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Math Tools Expandable */}
          <motion.div layout="position" className="relative">
            <motion.button
              layout="position"
              onClick={() => {
                if (isSidebarCollapsed) {
                  setIsSidebarCollapsed(false);
                  setIsMathToolsOpen(true);
                } else {
                  setIsMathToolsOpen(!isMathToolsOpen);
                }
              }}
              className={cn(
                "flex items-center w-full px-4 py-2.5 my-1 rounded-lg transition-colors duration-200 group relative border border-transparent transform-gpu",
                (isMathToolsOpen && !isSidebarCollapsed)
                  ? "text-[var(--win-text)]" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-[var(--win-text)]"
              )}
            >
              <div className="flex items-center justify-center w-8 shrink-0">
                <Calculator size={18} />
              </div>
              <motion.div
                initial={false}
                animate={{ 
                  width: isSidebarCollapsed ? 0 : "auto",
                  opacity: isSidebarCollapsed ? 0 : 1,
                  marginLeft: isSidebarCollapsed ? 0 : 12
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium flex-1 text-left transform-gpu"
              >
                數學小工具
              </motion.div>
              {!isSidebarCollapsed && (
                <motion.div
                  animate={{ rotate: isMathToolsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400"
                >
                  <ChevronDown size={14} />
                </motion.div>
              )}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#2b2b2b] text-white text-[11px] rounded-md border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                  數學小工具
                </div>
              )}
            </motion.button>

            <AnimatePresence>
              {isMathToolsOpen && !isSidebarCollapsed && (
                <motion.div
                  key="math-tools-sub"
                  layout="position"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden transform-gpu"
                >
                  <motion.button
                    layout="position"
                    onClick={() => setActivePage('matrix')}
                    className={cn(
                      "flex items-center w-full pl-[60px] pr-4 py-2 my-0.5 rounded-lg transition-colors duration-200 group relative border border-transparent text-xs transform-gpu",
                      activePage === 'matrix'
                        ? "bg-black/[0.06] dark:bg-white/10 text-[var(--win-text)] border-black/5 dark:border-white/5" 
                        : "text-gray-500 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-[var(--win-text)]"
                    )}
                  >
                    <span className="whitespace-nowrap overflow-hidden">矩陣計算機</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <SidebarItem 
            icon={Mail} 
            label="聯絡資訊" 
            active={activePage === 'contact'} 
            onClick={() => setActivePage('contact')}
            collapsed={isSidebarCollapsed}
          />
        </nav>

        <div className="px-2 mb-2 space-y-1">
          <SidebarItem 
            icon={Sparkles} 
            label="AI 助手" 
            active={activePage === 'ai'} 
            onClick={() => setActivePage('ai')}
            collapsed={isSidebarCollapsed}
            isNav={false}
          />
          <SidebarItem 
            icon={Settings} 
            label="設定" 
            active={isSettingsOpen} 
            onClick={() => setIsSettingsOpen(true)}
            collapsed={isSidebarCollapsed}
            isNav={false}
          />
        </div>

        <div className="px-2 border-t border-win-border">
          <motion.button 
            layout="position"
            onClick={() => setActivePage('about')}
            className={cn(
              "flex items-center w-full px-4 py-2.5 transition-all duration-200 hover:bg-black/[0.03] dark:hover:bg-white/5 rounded-lg border border-transparent my-1 transform-gpu",
              activePage === 'about' && "bg-black/[0.06] dark:bg-white/10 border-black/5 dark:border-white/5"
            )}
          >
            <div className="flex items-center justify-center w-8 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                <img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" referrerPolicy="no-referrer" />
              </div>
            </div>
            <motion.div
              initial={false}
              animate={{ 
                width: isSidebarCollapsed ? 0 : "auto",
                opacity: isSidebarCollapsed ? 0 : 1,
                marginLeft: isSidebarCollapsed ? 0 : 12
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-start overflow-hidden whitespace-nowrap transform-gpu"
            >
              <span className="text-xs font-medium text-[var(--win-text)]">李 老師</span>
              <span className="text-[10px] text-gray-500">國高中數學/資訊教師</span>
            </motion.div>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Menu Button - Only visible on small screens */}
      {!isMobileMenuOpen && !isMobileSearchOpen && (
        <button 
          className="md:hidden fixed top-2 left-2 z-[60] p-2 bg-slate-800/80 backdrop-blur rounded-lg text-white"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Separate Overlay with Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[70] md:hidden"
            />
            {/* Sidebar with Slide */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-win-bg border-r border-win-border z-[80] md:hidden p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <span className="font-semibold text-[var(--win-text)]">MathPortfolio</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-2">
                <button 
                  onClick={() => { setActivePage('home'); setIsMobileMenuOpen(false); }}
                  className={cn("flex items-center w-full p-3 rounded-lg", activePage === 'home' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}
                >
                  <Home size={20} className="mr-3" /> 首頁
                </button>
                <button 
                  onClick={() => { setActivePage('portfolio'); setIsMobileMenuOpen(false); }}
                  className={cn("flex items-center w-full p-3 rounded-lg", activePage === 'portfolio' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}
                >
                  <BookOpen size={20} className="mr-3" /> 作品集
                </button>

                {/* Mobile LaTeX Tools */}
                <div>
                  <button 
                    onClick={() => setIsMobileLatexToolsOpen(!isMobileLatexToolsOpen)}
                    className={cn("flex items-center justify-between w-full p-3 rounded-lg", isMobileLatexToolsOpen ? "text-[var(--win-text)]" : "text-gray-400")}
                  >
                    <div className="flex items-center">
                      <Sigma size={20} className="mr-3" /> LaTeX 工具
                    </div>
                    <ChevronDown size={16} className={cn("transition-transform", isMobileLatexToolsOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {isMobileLatexToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 mt-1"
                      >
                        <button 
                          onClick={() => { setActivePage('latex-symbols'); setIsMobileMenuOpen(false); }}
                          className={cn("flex items-center w-full pl-[44px] pr-3 py-2 rounded-lg text-sm", activePage === 'latex-symbols' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}
                        >
                          LaTeX 符號表
                        </button>
                        <button 
                          onClick={() => { setActivePage('latex-playground'); setIsMobileMenuOpen(false); }}
                          className={cn("flex items-center w-full pl-[44px] pr-3 py-2 rounded-lg text-sm", activePage === 'latex-playground' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}
                        >
                          LaTeX 試算區
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Math Tools */}
                <div>
                  <button 
                    onClick={() => setIsMobileMathToolsOpen(!isMobileMathToolsOpen)}
                    className={cn("flex items-center justify-between w-full p-3 rounded-lg", isMobileMathToolsOpen ? "text-[var(--win-text)]" : "text-gray-400")}
                  >
                    <div className="flex items-center">
                      <Calculator size={20} className="mr-3" /> 數學小工具
                    </div>
                    <ChevronDown size={16} className={cn("transition-transform", isMobileMathToolsOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {isMobileMathToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 mt-1"
                      >
                        <button 
                          onClick={() => { setActivePage('matrix'); setIsMobileMenuOpen(false); }}
                          className={cn("flex items-center w-full pl-[44px] pr-3 py-2 rounded-lg text-sm", activePage === 'matrix' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}
                        >
                          矩陣計算機
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => { setActivePage('contact'); setIsMobileMenuOpen(false); }}
                  className={cn("flex items-center w-full p-3 rounded-lg", activePage === 'contact' ? "bg-win-accent/10 text-win-accent" : "text-gray-400")}
                >
                  <Mail size={20} className="mr-3" /> 聯絡資訊
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-win-bg">
        {/* Content Container with Rounded Corners */}
        <main className="flex-1 overflow-hidden relative bg-win-surface rounded-tl-2xl border-t border-l border-win-border shadow-2xl">
          <AnimatePresence mode="wait">
            {activePage === 'home' && (
              <motion.section
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full w-full overflow-hidden p-8 md:p-12 flex flex-col items-start justify-center"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-3 py-1 rounded-full bg-win-accent/10 border border-win-accent/20 text-win-accent text-xs font-semibold tracking-wider uppercase"
                  >
                    Mathematics Educator
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-[var(--win-text)]">
                    讓數學成為 <br />
                    <span className="gradient-text">探索世界的語言</span>
                  </h1>
                  <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                    我是目前任教於中山大學附中的數學老師，致力於透過數位工具與視覺化教材，將抽象的數學概念轉化為直觀的學習體驗。這裡展示了我多年的教學成果與創新教材。
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => setActivePage('portfolio')}
                      className="win-button-primary flex items-center gap-2"
                    >
                      查看作品集 <ChevronRight size={18} />
                    </button>
                    <button 
                      onClick={() => setActivePage('about')}
                      className="win-button-secondary"
                    >
                      了解更多
                    </button>
                  </div>
                </div>

                {/* Stats / Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 w-full">
                  {[
                    { label: "教學年資", value: "10+" },
                    { label: "開發教材", value: "50+" },
                    { label: "授課學生", value: "2000+" },
                    { label: "獲獎紀錄", value: "5" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="win-card p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-[var(--win-text)] mb-1">{stat.value}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {activePage === 'latex-symbols' && (
              <PageLayout title="LaTeX 符號表" id="latex-symbols">
                <div className="flex flex-col h-full overflow-hidden pr-8">
                  {/* Search Header */}
                  <div className="mb-6">
                    <div className="relative w-full max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input 
                        type="text"
                        placeholder="搜尋符號名稱、代碼或標籤..."
                        value={latexSearchQuery}
                        onChange={(e) => setLatexSearchQuery(e.target.value)}
                        className="win-input w-full pl-10 pr-4 py-2 h-10"
                      />
                    </div>
                  </div>

                  {/* Main Content Area - Split Layout */}
                  <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                    {/* Left Side: Symbol Grid (Scrollable) */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 overflow-x-hidden">
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
                        {LATEX_SYMBOLS.filter(s => 
                          s.name.toLowerCase().includes(latexSearchQuery.toLowerCase()) ||
                          s.latex.toLowerCase().includes(latexSearchQuery.toLowerCase()) ||
                          s.tags.some(t => t.toLowerCase().includes(latexSearchQuery.toLowerCase()))
                        ).map((symbol) => (
                          <button
                            key={symbol.id}
                            onClick={() => setSelectedLatexSymbol(symbol)}
                            className={cn(
                              "flex flex-col items-center justify-center aspect-square p-2 rounded-lg border transition-all duration-200 group relative",
                              selectedLatexSymbol.id === symbol.id
                                ? "bg-win-accent/10 border-win-accent ring-1 ring-win-accent/50"
                                : "bg-black/[0.02] dark:bg-white/[0.03] border-win-border hover:bg-black/[0.04] dark:hover:bg-white/10"
                            )}
                          >
                            <div className="flex-1 flex items-center justify-center">
                              <MathRenderer 
                                content={symbol.latex} 
                                className={cn(
                                  "text-2xl transition-transform duration-200 group-hover:scale-110",
                                  selectedLatexSymbol.id === symbol.id ? "text-win-accent" : "text-[var(--win-text)]"
                                )}
                              />
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium truncate w-full px-2 text-center pb-1">
                              {symbol.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Side: Symbol Details (Fixed) */}
                    <div className="w-80 shrink-0 hidden lg:flex flex-col">
                      <div className="win-card p-6 bg-win-surface/50 border border-win-border flex flex-col h-full rounded-xl">
                        <div className="flex items-center justify-center w-24 h-24 bg-black/[0.03] dark:bg-white/[0.05] rounded-xl border border-win-border mb-6 shadow-inner shrink-0">
                          <MathRenderer 
                            content={selectedLatexSymbol.latex} 
                            displayMode
                            className="text-3xl text-win-accent"
                          />
                        </div>

                        <div className="space-y-5 flex-1 overflow-y-auto custom-scrollbar pr-1">
                          {/* Symbol Name */}
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">符號名稱</label>
                            <div className="flex items-center justify-between group">
                              <div className="text-sm font-medium text-[var(--win-text)]">{selectedLatexSymbol.name}</div>
                              <button 
                                onClick={() => navigator.clipboard.writeText(selectedLatexSymbol.name)}
                                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                                title="複製名稱"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </div>

                          {/* LaTeX Code */}
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">LaTeX 代碼</label>
                            <div className="flex items-center justify-between group">
                              <div className="text-sm font-mono text-win-accent break-all">{selectedLatexSymbol.latex}</div>
                              <button 
                                onClick={() => navigator.clipboard.writeText(selectedLatexSymbol.latex)}
                                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                                title="複製代碼"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">標籤</label>
                            <div className="flex flex-wrap gap-1.5">
                              {/* Category as a primary tag */}
                              <span className="px-3 py-1 bg-[#005a9e] text-white dark:bg-[#60cdff] dark:text-black rounded-full text-[10px] font-bold shadow-sm">
                                {selectedLatexSymbol.category}
                              </span>
                              {selectedLatexSymbol.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-black/5 text-black dark:bg-white/10 dark:text-white rounded-full text-[10px] font-medium border border-black/5 dark:border-white/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 mt-auto border-t border-win-border">
                          <button 
                            onClick={() => navigator.clipboard.writeText(`$${selectedLatexSymbol.latex}$`)}
                            className="win-button-primary w-full py-3 flex items-center justify-center gap-2 text-xs font-bold"
                          >
                            <Copy size={16} /> 複製行內公式 ($...$)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PageLayout>
            )}

            {activePage === 'latex-playground' && (
              <PageLayout title="LaTeX 試算區" id="latex-playground">
                <div className="flex flex-col h-full overflow-hidden gap-6 pr-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
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
            )}

            {activePage === 'matrix' && (
              <PageLayout title="矩陣計算機" id="matrix">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-12">
                  <div className="max-w-4xl mx-auto w-full space-y-12 py-8 px-4 md:px-8">
                    {/* Matrix Input Section */}
                    <section className="flex flex-col items-center space-y-8">
                      <ComboBox 
                        value={matrixOperation}
                        onChange={(val) => {
                          const op = val as '2x2-all' | '2x2-binary' | '3x3-all' | '3x3-binary';
                          setMatrixOperation(op);
                          setMatrixResult(null);
                          
                          // Resize matrix if needed
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
                          {/* Matrix Brackets (Visual) */}
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
                                  style={{ 
                                    width: `${Math.max(3.5, (val.toString().length + 1))}rem` 
                                  }}
                                  onFocus={(e) => e.target.placeholder = ""}
                                  onBlur={(e) => e.target.placeholder = "0"}
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
                                options={[
                                  { value: '+', label: '+' },
                                  { value: '-', label: '-' }
                                ]}
                                className="w-full"
                              />
                            </div>

                            <div className="relative p-8 bg-win-surface/50 rounded-3xl border border-win-border shadow-sm">
                              {/* Matrix Brackets (Visual) */}
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
                                      style={{ 
                                        width: `${Math.max(3.5, (val.toString().length + 1))}rem` 
                                      }}
                                      onFocus={(e) => e.target.placeholder = ""}
                                      onBlur={(e) => e.target.placeholder = "0"}
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
            )}

            {activePage === 'about' && (
              <PageLayout title="關於我" id="about">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="grid md:grid-cols-3 gap-12 w-full">
                    <div className="md:col-span-1">
                    <div className="win-card p-2 aspect-square overflow-hidden mb-6">
                      <img 
                        src="https://picsum.photos/seed/teacher/400/400" 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-400">
                        <MapPin size={18} /> <span>高雄市, 台灣</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <GraduationCap size={18} /> <span>國立高雄師範大學 數學系</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <Calendar size={18} /> <span>2年 教學經驗</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                      <a href="#" className="p-2 bg-black/[0.03] dark:bg-white/5 hover:bg-win-accent/20 rounded-lg text-slate-400 hover:text-win-accent transition-all">
                        <Github size={20} />
                      </a>
                      <a href="#" className="p-2 bg-black/[0.03] dark:bg-white/5 hover:bg-win-accent/20 rounded-lg text-slate-400 hover:text-win-accent transition-all">
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-12">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--win-text)] mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-win-accent rounded-full" />
                        教育理念
                      </h3>
                      <p className="text-gray-500 dark:text-slate-400 leading-relaxed">
                        數學不應該只是枯燥的公式與計算。我深信「看見」是理解的第一步。透過動態幾何軟體與程式模擬，我致力於讓學生在操作中發現規律，在視覺化中建立直覺。我的目標是培養學生解決問題的邏輯思維，而不僅僅是應付考試的技巧。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--win-text)] mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-win-accent rounded-full" />
                        專業背景
                      </h3>
                      <div className="space-y-6">
                        {[
                          { title: "國中數學代理教師", org: "高雄市立龍肚國中", period: "2022-2023" },
                          { title: "高中數學雙語代理教師", org: "國立中山大學附屬國光高級中學", period: "2023-至今" }
                        ].map((exp, i) => (
                          <div key={i} className="relative pl-6 border-l border-black/10 dark:border-slate-800">
                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-win-accent" />
                            <div className="text-sm text-win-accent mb-1">{exp.period}</div>
                            <div className="text-[var(--win-text)] font-medium">{exp.title}</div>
                            <div className="text-sm text-slate-500">{exp.org}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--win-text)] mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-win-accent rounded-full" />
                        證書類別
                      </h3>
                      <div className="space-y-4">
                        <div className="relative pl-6 border-l border-black/10 dark:border-slate-800">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-win-accent" />
                          <div className="text-[var(--win-text)] font-medium">中等及高級中等數學領域教師證</div>
                        </div>
                        <div className="relative pl-6 border-l border-black/10 dark:border-slate-800">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-win-accent" />
                          <div className="text-[var(--win-text)] font-medium">中等及高級中等資訊領域教師證</div>
                        </div>
                        <div className="relative pl-6 border-l border-black/10 dark:border-slate-800">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-win-accent" />
                          <div className="text-[var(--win-text)] font-medium">國中學習輔助18小時研習證明</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--win-text)] mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-cyan-500 rounded-full" />
                        擅長工具
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: "GeoGebra", url: "https://www.geogebra.org/" },
                          { name: "Desmos", url: "https://www.desmos.com/calculator?lang=zh-TW" },
                          { name: "Python", url: null },
                          { name: "LaTeX ( OverLeaf )", url: "https://www.overleaf.com/" }
                        ].map(tool => (
                          tool.url ? (
                            <a 
                              key={tool.name}
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-black/[0.03] dark:bg-white/5 border border-win-border rounded-full text-xs text-slate-500 dark:text-slate-300 hover:bg-win-accent/10 hover:border-win-accent/30 transition-all"
                            >
                              {tool.name}
                            </a>
                          ) : (
                            <span key={tool.name} className="px-3 py-1 bg-black/[0.03] dark:bg-white/5 border border-win-border rounded-full text-xs text-slate-500 dark:text-slate-300">
                              {tool.name}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </PageLayout>
            )}

            {activePage === 'portfolio' && (
              <PageLayout title="作品集" id="portfolio">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 w-full">
                    <div>
                      <p className="text-gray-500 dark:text-slate-400">精選教學教材與互動式專案</p>
                    </div>
                    
                    <div className="flex bg-black/[0.03] dark:bg-slate-900/50 p-1 rounded-xl border border-win-border">
                      {(['all', 'junior', 'senior'] as Category[]).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilter(cat)}
                          className={cn(
                            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                            filter === cat 
                              ? "bg-win-accent text-win-accent-text shadow-lg shadow-win-accent/20" 
                              : "text-gray-500 dark:text-slate-400 hover:text-[var(--win-text)]"
                          )}
                        >
                          {cat === 'all' ? '全部' : cat === 'junior' ? '國中' : '高中'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {filteredProjects.map((project) => (
                      <motion.div
                        layout
                        key={project.id}
                        className="win-card group cursor-pointer overflow-hidden flex flex-col"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="aspect-video overflow-hidden relative">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                            {project.category === 'junior' ? 'Junior High' : 'Senior High'}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-[var(--win-text)] group-hover:text-win-accent transition-colors">
                              {project.title}
                            </h3>
                            <div className="p-2 bg-black/[0.03] dark:bg-white/5 rounded-lg text-slate-400 group-hover:text-win-accent transition-colors">
                              <ExternalLink size={16} />
                            </div>
                          </div>
                        <div className="mb-4 p-3 bg-black/[0.02] dark:bg-slate-900/50 rounded-lg border border-black/5 dark:border-white/5">
                          <MathRenderer 
                            content={project.mathFormula} 
                            displayMode 
                            className="text-win-accent text-lg"
                          />
                        </div>
                          <p className="text-sm text-slate-400 line-clamp-2 mb-6">
                            {project.description}
                          </p>
                          <div className="mt-auto flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                              <span key={tag} className="text-[10px] text-slate-500 uppercase tracking-wider">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              </PageLayout>
            )}

            {activePage === 'contact' && (
              <PageLayout title="聯絡資訊" id="contact">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="grid md:grid-cols-2 gap-16 w-full">
                    <div>
                    <p className="text-gray-500 dark:text-slate-400 mb-12">
                      如果您對我的教材有任何建議，或是希望進行教學合作，歡迎隨時與我聯繫。
                    </p>
                    
                    <div className="space-y-8">
                      <a 
                        href="mailto:ts08@nsysu.kksh.kh.edu.tw" 
                        className="flex items-start gap-4 group hover:no-underline"
                      >
                        <div className="w-12 h-12 rounded-xl bg-win-accent/10 border border-win-accent/20 flex items-center justify-center text-win-accent group-hover:bg-win-accent/20 transition-colors">
                          <Mail size={24} />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">Email</div>
                          <div className="text-[var(--win-text)] font-medium">ts08@nsysu.kksh.kh.edu.tw</div>
                        </div>
                      </a>
                      
                      <a 
                        href="https://github.com/JIA-WEI-LI" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 group hover:no-underline"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                          <Github size={24} />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500 uppercase tracking-widest mb-1">GitHub</div>
                          <div className="text-[var(--win-text)] font-medium">github.com/JIA-WEI-LI</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="win-card p-8 bg-win-surface">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-500 uppercase tracking-widest">您的姓名</label>
                        <input 
                          type="text" 
                          className="win-input w-full px-4 py-3"
                          placeholder="王大明"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-500 uppercase tracking-widest">電子郵件</label>
                        <input 
                          type="email" 
                          className="win-input w-full px-4 py-3"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-500 uppercase tracking-widest">訊息內容</label>
                        <textarea 
                          rows={4}
                          className="win-input w-full px-4 py-3 resize-none"
                          placeholder="請輸入您的訊息..."
                        />
                      </div>
                      <button className="win-button-primary w-full py-3">
                        發送訊息
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              </PageLayout>
            )}

            {activePage === 'ai' && (
              <PageLayout title="AI 學習機器人" id="ai">
                <div className="flex flex-col flex-1 w-full bg-win-surface/50 rounded-2xl border border-win-border overflow-hidden shadow-sm">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scrollbar-gutter-stable">
                    {chatMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex w-full",
                          msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                          msg.role === 'user' 
                            ? "bg-win-accent text-win-accent-text rounded-tr-none" 
                            : "bg-black/[0.03] dark:bg-white/5 text-[var(--win-text)] border border-win-border rounded-tl-none"
                        )}>
                          {msg.role === 'model' ? (
                            <div className="markdown-body prose dark:prose-invert prose-sm max-w-none">
                              <Markdown 
                                remarkPlugins={[remarkMath]} 
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                  code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                      <SyntaxHighlighter
                                        style={isDarkMode ? vscDarkPlus : vs}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, '')}
                                      </SyntaxHighlighter>
                                    ) : (
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    );
                                  }
                                }}
                              >
                                {msg.text}
                              </Markdown>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isAiLoading && (
                      <div className="flex justify-start">
                        <div className="bg-black/[0.03] dark:bg-white/5 p-4 rounded-2xl rounded-tl-none border border-win-border flex items-center gap-2">
                          <div className="flex gap-1">
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-win-accent rounded-full" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-win-accent rounded-full" />
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-win-accent rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-win-surface border-t border-win-border">
                    <div className="relative flex items-center gap-2">
                      <button 
                        onClick={() => setChatMessages([{ role: 'model', text: '對話已重置。有什麼我可以幫你的嗎？' }])}
                        className="p-3 text-slate-400 hover:text-win-accent hover:bg-win-accent/10 rounded-xl transition-colors"
                        title="重置對話"
                      >
                        <RotateCcw size={20} />
                      </button>
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="輸入數學問題或資訊科學相關疑問..."
                          className="win-input w-full pl-4 pr-12 py-3 bg-black/[0.02] dark:bg-white/[0.03]"
                        />
                        <button 
                          onClick={handleSendMessage}
                          disabled={!userInput.trim() || isAiLoading}
                          className={cn(
                            "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
                            userInput.trim() && !isAiLoading ? "text-win-accent hover:bg-win-accent/10" : "text-slate-400 opacity-50"
                          )}
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="text-[10px] text-center text-slate-500 mt-2">
                      AI 助手可能會產生錯誤資訊，請務必核對重要資訊。
                    </div>
                  </div>
                </div>
              </PageLayout>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>

    {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsSettingsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="win-card w-full max-w-lg bg-win-surface/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col border border-win-border transform-gpu"
            >
              <div className="p-6 border-b border-win-border flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--win-text)] flex items-center gap-2">
                  <Settings size={18} /> 設定
                </h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-1 hover:bg-black/[0.03] dark:hover:bg-white/5 rounded">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-8">
                <section className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Palette size={16} /> 個人化
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black/[0.02] dark:bg-white/[0.03] rounded-lg border border-win-border">
                      <div className="flex items-center gap-3">
                        {isDarkMode ? <Moon size={18} className="text-win-accent" /> : <Sun size={18} className="text-amber-500" />}
                        <div>
                          <div className="text-sm font-medium">深色模式</div>
                          <div className="text-xs text-slate-500">調整應用程式的外觀</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={cn(
                          "w-10 h-5 rounded-full relative transition-colors duration-200 focus:outline-none",
                          isDarkMode ? "bg-win-accent" : "bg-gray-300"
                        )}
                      >
                        <motion.div 
                          animate={{ x: isDarkMode ? 22 : 4 }}
                          className={cn(
                            "absolute top-1 w-3 h-3 rounded-full shadow-sm",
                            isDarkMode ? "bg-black" : "bg-white"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Info size={16} /> 關於
                  </h4>
                  <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-lg border border-win-border overflow-hidden">
                    <button 
                      onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                      className="w-full p-4 flex items-center gap-4 hover:bg-black/[0.03] dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold shrink-0">
                        M
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-medium">MathPortfolio</div>
                        <div className="text-[10px] text-slate-500">© 2025 Microsoft. All rights reserved.</div>
                      </div>
                      <div className="text-xs text-slate-500 mr-2">0.1.3.0</div>
                      <ChevronRight size={16} className={cn("text-slate-400 transition-transform", isAboutExpanded && "rotate-90")} />
                    </button>

                    <AnimatePresence>
                      {isAboutExpanded && (
                        <motion.div
                          key="about-expanded"
                          layout="position"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden border-t border-win-border bg-black/[0.01] dark:bg-white/[0.01] transform-gpu"
                        >
                          <div className="p-4 space-y-6 text-xs">
                            <div className="flex items-center justify-between group cursor-pointer hover:text-win-accent transition-colors">
                              <span className="text-slate-400">回報錯誤或請求新範例</span>
                              <ExternalLink size={14} className="text-slate-500" />
                            </div>

                            <div className="space-y-2">
                              <div className="font-medium text-slate-400">參考範例</div>
                              <div className="space-y-1 pl-2 border-l border-win-border text-slate-500">
                                <div>WinUI 3</div>
                                <div>WinUI 3 Gallery</div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-win-border space-y-4">
                              <p className="text-[10px] text-slate-500 leading-relaxed uppercase">
                                THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
                              </p>
                              <div className="flex gap-4">
                                <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="text-win-accent hover:underline">Gemini</a>
                                <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-win-accent hover:underline">Google AI Studio</a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </div>

              <div className="p-4 bg-black/[0.01] dark:bg-white/[0.02] border-t border-win-border flex justify-end gap-3">
                <button onClick={() => setIsSettingsOpen(false)} className="win-button-secondary text-xs">取消</button>
                <button onClick={() => setIsSettingsOpen(false)} className="win-button-primary text-xs">儲存變更</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="win-card w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative z-10 bg-win-surface/90 backdrop-blur-xl border border-win-border transform-gpu"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left/Top: Image & Math */}
              <div className="md:w-3/5 bg-black/[0.05] dark:bg-slate-900 relative flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 bg-black/[0.02] dark:bg-slate-900/90 backdrop-blur-md border-t border-win-border">
                  <div className="text-xs text-win-accent uppercase tracking-[0.2em] mb-4 font-bold">核心公式</div>
                  <MathRenderer 
                    content={selectedProject.mathFormula} 
                    displayMode 
                    className="text-3xl text-[var(--win-text)]"
                  />
                </div>
              </div>

              {/* Right/Bottom: Content */}
              <div className="md:w-2/5 p-8 md:p-10 overflow-y-auto bg-win-surface custom-scrollbar">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 bg-win-accent/10 text-win-accent text-[10px] font-bold rounded border border-win-accent/20 uppercase tracking-widest">
                      {selectedProject.category === 'junior' ? 'Junior' : 'Senior'}
                    </span>
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-slate-500">#{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--win-text)] mb-6 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="space-y-4 text-gray-500 dark:text-slate-400 leading-relaxed">
                    <p>{selectedProject.longDescription}</p>
                    <p>本教材支援跨平台使用，並針對平板電腦進行了觸控優化，適合課堂演示或學生自主學習。</p>
                  </div>
                </div>

                <div className="space-y-4 mt-auto">
                  <button className="win-button-primary w-full py-3 flex items-center justify-center gap-3">
                    <Download size={20} /> 下載教材資源
                  </button>
                  <button className="win-button-secondary w-full py-3 flex items-center justify-center gap-3">
                    <ExternalLink size={20} /> 線上預覽專案
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
