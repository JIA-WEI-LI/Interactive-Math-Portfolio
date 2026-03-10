import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

interface ComboBoxProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}

export const ComboBox: React.FC<ComboBoxProps> = ({ value, onChange, options, className }) => {
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
