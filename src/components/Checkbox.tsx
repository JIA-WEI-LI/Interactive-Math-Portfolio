import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className }) => {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={cn(
                "flex items-center gap-2.5 group/cb cursor-pointer select-none py-1.5 focus:outline-none",
                className
            )}
        >
            <div
                className={cn(
                    "w-[18px] h-[18px] rounded-[4px] border-[1px] flex items-center justify-center transition-all duration-150",
                    checked
                        ? "bg-[#60cdff] border-[#60cdff]"
                        : "bg-transparent border-white/40 group-hover/cb:border-white/60"
                )}
            >
                {checked && (
                    <motion.svg
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-3.5 h-3.5 text-black stroke-[2.5]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                )}
            </div>
            <span className="text-[14px] text-white/90 leading-none transition-colors">
                {label}
            </span>
        </button>
    );
};
