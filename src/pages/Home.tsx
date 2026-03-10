import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface HomeProps {
    onExplore: () => void;
    onAbout: () => void;
}

export const Home: React.FC<HomeProps> = ({ onExplore, onAbout }) => {
    return (
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
                        onClick={onExplore}
                        className="win-button-primary flex items-center gap-2"
                    >
                        探索 LaTeX 工具 <ChevronRight size={18} />
                    </button>
                    <button
                        onClick={onAbout}
                        className="win-button-secondary"
                    >
                        了解更多
                    </button>
                </div>
            </div>

            {/* Stats / Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 w-full">
                {[
                    { label: "LaTeX 符號庫", value: "200+" },
                    { label: "互動教學工具", value: "5+" },
                    { label: "100% 響應式教學介面", value: "Fluent" },
                    { label: "Open Source 開源精神", value: "MIT" }
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
    );
};
