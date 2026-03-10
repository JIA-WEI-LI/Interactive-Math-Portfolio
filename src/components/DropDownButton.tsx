import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const DropDownButton: React.FC<{
    value: string;
    options: { value: string; label: string }[];
    onChange: (val: string) => void;
    className?: string;
    variant?: 'default' | 'ghost';
}> = ({ value, options, onChange, className, variant = 'default' }) => {
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

    const selectedLabel = options.find(o => o.value === value)?.label || value;

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-3 px-3 py-1.5 text-white/90 text-[12px] rounded-[4px] transition-all duration-150 min-w-[100px] justify-between h-9",
                    variant === 'default'
                        ? "bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/5"
                        : "bg-transparent border-transparent hover:bg-white/5 active:bg-transparent"
                )}
            >
                <span className={cn(variant === 'ghost' && "text-win-accent font-medium")}>{selectedLabel}</span>
                <ChevronDown size={12} className={cn("transition-transform duration-200", isOpen && "rotate-180", variant === 'ghost' && "text-win-accent")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full mt-1 left-0 w-36 p-1 bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl z-[210] backdrop-blur-md"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full text-left px-3 py-1.5 text-[13px] rounded-[4px] transition-colors",
                                    value === opt.value
                                        ? "text-win-accent bg-white/5"
                                        : "text-white/80 hover:bg-white/10"
                                )}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
