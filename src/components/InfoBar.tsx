import React from 'react';
import { AlertTriangle, Info, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '../utils/cn';

export type InfoBarSeverity = 'informative' | 'success' | 'warning' | 'error';

interface InfoBarProps {
    title?: string;
    message: string;
    severity?: InfoBarSeverity;
    onClose?: () => void;
    className?: string;
}

export const InfoBar: React.FC<InfoBarProps> = ({
    title,
    message,
    severity = 'informative',
    onClose,
    className
}) => {
    const severities = {
        informative: {
            icon: (
                <div className="bg-[#60cdff] rounded-full w-4 h-4 flex items-center justify-center">
                    <span className="text-black text-[11px] font-bold mt-[1px]">i</span>
                </div>
            ),
            bg: "bg-[#2d2d2d]",
            border: "border-white/5",
        },
        success: {
            icon: (
                <div className="bg-[#6ccb5f] rounded-full w-4 h-4 flex items-center justify-center">
                    <CheckCircle2 size={10} className="text-black stroke-[3]" />
                </div>
            ),
            bg: "bg-[#2a3928]",
            border: "border-white/5",
        },
        warning: {
            icon: (
                <div className="bg-[#ffd335] rounded-full w-4 h-4 flex items-center justify-center">
                    <svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="2" height="6" fill="black" />
                        <rect y="8" width="2" height="2" fill="black" />
                    </svg>
                </div>
            ),
            bg: "bg-[#433519]",
            border: "border-[#ffffff0a]",
        },
        error: {
            icon: (
                <div className="bg-[#ff99a4] rounded-full w-4 h-4 flex items-center justify-center">
                    <svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="2" height="6" fill="black" />
                        <rect y="8" width="2" height="2" fill="black" />
                    </svg>
                </div>
            ),
            bg: "bg-[#442726]",
            border: "border-white/5",
        }
    };

    const config = severities[severity];

    return (
        <div className={cn(
            "flex items-start md:items-center gap-3 px-4 py-3 rounded-lg border shadow-sm w-full relative",
            config.bg,
            config.border,
            className
        )}>
            <div className="flex-shrink-0 mt-0.5 md:mt-0">
                {config.icon}
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-x-2 flex-1 overflow-hidden">
                {title && <span className="text-[13px] font-bold text-white leading-none mb-1 md:mb-0">{title}</span>}
                <span className="text-[13px] text-white/90 leading-tight md:leading-none">{message}</span>
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="flex-shrink-0 ml-4 p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-all focus:outline-none"
                >
                    <X size={16} strokeWidth={1.5} />
                </button>
            )}
        </div>
    );
};
