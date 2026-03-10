import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export interface SuggestionItem {
    id: string;
    title: string;
    category?: string;
}

interface AutoSuggestBoxProps {
    items: SuggestionItem[];
    placeholder?: string;
    onSelect: (item: SuggestionItem) => void;
    className?: string;
}

export const AutoSuggestBox: React.FC<AutoSuggestBoxProps> = ({ items, placeholder, onSelect, className }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredItems = query.trim() === ''
        ? []
        : items.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.category?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredItems.length) {
                const item = filteredItems[selectedIndex];
                handleSelect(item);
            }
        } else if (e.key === 'Escape') {
            setIsFocused(false);
        }
    };

    const handleSelect = (item: SuggestionItem) => {
        onSelect(item);
        setQuery('');
        setIsFocused(false);
        setSelectedIndex(-1);
    };

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={14} />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(-1);
                        setIsFocused(true);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                    className="win-input w-full pl-9 pr-9 py-1.5 text-[13px]"
                />
                <AnimatePresence>
                    {query && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setQuery('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-win-accent transition-colors"
                        >
                            <X size={14} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isFocused && filteredItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-1 bg-[#2d2d2d] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[200] backdrop-blur-xl"
                    >
                        <div className="p-1.5 flex flex-col gap-0.5">
                            {filteredItems.map((item, index) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={cn(
                                        "w-full text-left px-3 py-1.5 flex flex-col transition-colors rounded-[4px]",
                                        index === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
                                    )}
                                >
                                    <span className="text-[13px] text-white/90">{item.title}</span>
                                    {item.category && (
                                        <span className="text-[10px] text-white/40 uppercase font-medium">{item.category}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
