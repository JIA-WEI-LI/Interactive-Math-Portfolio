import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface SidebarItemProps {
    icon?: any;
    label: React.ReactNode;
    active: boolean;
    onClick: () => void;
    collapsed: boolean;
    isNav?: boolean;
    isSubItem?: boolean;
    suffix?: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    onClick,
    collapsed,
    isNav = true,
    isSubItem = false,
    suffix
}) => (
    <motion.button
        layout="position"
        onClick={onClick}
        className={cn(
            "flex items-center w-full rounded-lg transition-colors duration-200 group relative border border-transparent transform-gpu",
            isSubItem ? "px-4 py-2 my-0.5" : "px-4 py-2.5 my-1",
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
        <div className={cn("flex items-center justify-center shrink-0 w-8")}>
            {Icon && (React.isValidElement(Icon) ? Icon : React.createElement(Icon, { size: isSubItem ? 14 : 18 }))}
        </div>
        <motion.div
            initial={false}
            animate={{
                width: collapsed ? 0 : "auto",
                opacity: collapsed ? 0 : 1,
                marginLeft: collapsed ? 0 : 12
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "overflow-hidden whitespace-nowrap transform-gpu flex-1 text-left",
                isSubItem ? "text-xs" : "text-sm font-medium"
            )}
        >
            {label}
        </motion.div>
        {!collapsed && suffix && (
            <div className="ml-auto">
                {suffix}
            </div>
        )}
        {collapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#2b2b2b] text-white text-[11px] rounded-md border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                {typeof label === 'string' ? label : '詳細資訊'}
            </div>
        )}
    </motion.button>
);
