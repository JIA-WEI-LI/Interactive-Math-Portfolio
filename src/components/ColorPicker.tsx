import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DropDownButton } from './DropDownButton';
import { cn } from '../utils/cn';
import {
    hexToRgba,
    rgbaToHexWithAlpha,
    rgbToHsv,
    hsvToRgb,
    rgbToHex,
    HSV,
    RGBA
} from '../utils/colorUtils';

interface ColorPickerProps {
    isOpen: boolean;
    onClose: () => void;
    color: string; // HEX or HEXA
    onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ isOpen, onClose, color, onChange }) => {
    const [rgba, setRgba] = useState<RGBA>(hexToRgba(color));
    const [hsv, setHsv] = useState<HSV>(rgbToHsv(rgba));
    const [inputMode, setInputMode] = useState<'RGB' | 'HSV'>('RGB');
    const [tooltip, setTooltip] = useState<{ show: boolean, x: number, text: string, y: number }>({ show: false, x: 0, text: '', y: 0 });
    const modalRef = useRef<HTMLDivElement>(null);

    // Sync with external color prop
    useEffect(() => {
        const newRgba = hexToRgba(color);
        setRgba(newRgba);
        setHsv(rgbToHsv(newRgba));
    }, [color]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    const handleHsvChange = (newHsv: Partial<HSV>) => {
        const updatedHsv = { ...hsv, ...newHsv };
        setHsv(updatedHsv);
        const newRgb = hsvToRgb(updatedHsv);
        const newRgba = { ...newRgb, a: rgba.a };
        setRgba(newRgba);
        onChange(rgbaToHexWithAlpha(newRgba.r, newRgba.g, newRgba.b, newRgba.a));
    };

    const handleAlphaChange = (a: number) => {
        const newRgba = { ...rgba, a };
        setRgba(newRgba);
        onChange(rgbaToHexWithAlpha(newRgba.r, newRgba.g, newRgba.b, newRgba.a));
    };

    const handleRgbaInput = (part: keyof RGBA, val: string) => {
        let n = part === 'a' ? parseFloat(val) / 100 : parseInt(val);
        if (isNaN(n)) return;
        if (part !== 'a') n = Math.max(0, Math.min(255, n));
        else n = Math.max(0, Math.min(1, n));

        const newRgba = { ...rgba, [part]: n };
        setRgba(newRgba);
        setHsv(rgbToHsv(newRgba));
        onChange(rgbaToHexWithAlpha(newRgba.r, newRgba.g, newRgba.b, newRgba.a));
    };

    const spectrumRef = useRef<HTMLDivElement>(null);

    const handleSpectrumPointerDown = (e: React.PointerEvent) => {
        if (!spectrumRef.current) return;
        const rect = spectrumRef.current.getBoundingClientRect();
        const update = (moveEvent: PointerEvent | React.PointerEvent) => {
            const x = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, (moveEvent.clientY - rect.top) / rect.height));
            handleHsvChange({ h: x * 360, s: (1 - y) * 100 });
        };
        update(e);
        const onPointerMove = (moveEvent: PointerEvent) => update(moveEvent);
        const onPointerUp = () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
    };

    const previewRgb = useMemo(() => hsvToRgb({ ...hsv, v: hsv.v }), [hsv]);
    const previewHex = useMemo(() => rgbaToHexWithAlpha(previewRgb.r, previewRgb.g, previewRgb.b, rgba.a), [previewRgb, rgba.a]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-[#202020] border border-white/10 rounded-xl shadow-[0_32px_64px_rgba(0,0,0,0.5)] w-[360px] p-6 flex flex-col gap-6 text-white"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-white/70 uppercase tracking-widest">Color Picker</span>
                    </div>

                    {/* Spectrum Box and Preview Row */}
                    <div className="flex gap-4 h-[220px] shrink-0">
                        {/* Saturation/Hue Spectrum (Combined Box) */}
                        <div
                            ref={spectrumRef}
                            className="flex-1 rounded-lg relative cursor-crosshair overflow-hidden border border-white/10 shadow-inner"
                            style={{
                                background: `
                                    linear-gradient(to bottom, transparent, #fff), 
                                    linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
                                `
                            }}
                            onPointerDown={handleSpectrumPointerDown}
                        >
                            <motion.div
                                className="absolute w-5 h-5 rounded-full border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.5)] -translate-x-2.5 -translate-y-2.5 pointer-events-none z-10"
                                style={{
                                    left: `${(hsv.h / 360) * 100}%`,
                                    top: `${100 - hsv.s}%`
                                }}
                            >
                                <div className="w-full h-full rounded-full border border-black/20" />
                            </motion.div>
                        </div>

                        {/* Current Color Preview (Vertical Box) */}
                        <div className="w-14 rounded-lg border border-white/10 overflow-hidden shadow-inner relative">
                            <div className="absolute inset-0 bg-white" style={{
                                backgroundImage: `conic-gradient(#eee 0.25turn, #fff 0.25turn 0.5turn, #eee 0.5turn 0.75turn, #fff 0.75turn)`,
                                backgroundSize: '12px 12px'
                            }} />
                            <div className="absolute inset-0" style={{ backgroundColor: previewHex }} />
                        </div>
                    </div>

                    {/* Sliders Area - Use absolute children to prevent ANY jumping */}
                    <div className="h-[80px] relative shrink-0">
                        {/* Value (Brightness) Slider */}
                        <div className="absolute top-1 left-0 right-0 h-5 flex items-center">
                            <div className="h-2.5 w-full rounded-full relative cursor-pointer border border-white/5 shadow-inner"
                                style={{ background: `linear-gradient(to right, #000, ${rgbToHex(previewRgb.r, previewRgb.g, previewRgb.b)})` }}
                                onPointerDown={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const update = (m: PointerEvent | React.PointerEvent) => {
                                        const x = Math.max(0, Math.min(1, (m.clientX - rect.left) / rect.width));
                                        handleHsvChange({ v: x * 100 });
                                        setTooltip({ show: true, x: m.clientX - rect.left, text: `${Math.round(x * 100)} brightness`, y: -25 });
                                    };
                                    update(e);
                                    const onMove = (m: PointerEvent) => update(m);
                                    const onUp = () => {
                                        setTooltip(prev => ({ ...prev, show: false }));
                                        window.removeEventListener('pointermove', onMove);
                                        window.removeEventListener('pointerup', onUp);
                                    };
                                    window.addEventListener('pointermove', onMove);
                                    window.addEventListener('pointerup', onUp);
                                }}
                            >
                                <motion.div
                                    className="absolute w-4 h-4 bg-white rounded-full shadow-lg border-2 border-[#454545] top-1/2 -translate-y-1/2 -ml-2 z-20 pointer-events-none"
                                    style={{ left: `${hsv.v}%` }}
                                />
                            </div>
                        </div>

                        {/* Alpha Slider */}
                        <div className="absolute top-12 left-0 right-0 h-5 flex items-center">
                            <div className="h-2.5 w-full rounded-full relative cursor-pointer border border-white/5 shadow-inner"
                                onPointerDown={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const update = (m: PointerEvent | React.PointerEvent) => {
                                        const x = Math.max(0, Math.min(1, (m.clientX - rect.left) / rect.width));
                                        handleAlphaChange(x);
                                        setTooltip({ show: true, x: m.clientX - rect.left, text: `${Math.round(x * 100)}% opacity`, y: 22 });
                                    };
                                    update(e);
                                    const onMove = (m: PointerEvent) => update(m);
                                    const onUp = () => {
                                        setTooltip(prev => ({ ...prev, show: false }));
                                        window.removeEventListener('pointermove', onMove);
                                        window.removeEventListener('pointerup', onUp);
                                    };
                                    window.addEventListener('pointermove', onMove);
                                    window.addEventListener('pointerup', onUp);
                                }}
                            >
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <div className="absolute inset-0" style={{ backgroundImage: 'conic-gradient(#333 0.25turn, #444 0.25turn 0.5turn, #333 0.5turn 0.75turn, #444 0.75turn)', backgroundSize: '8px 8px' }} />
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${rgbToHex(previewRgb.r, previewRgb.g, previewRgb.b)})` }} />
                                </div>
                                <motion.div
                                    className="absolute w-4 h-4 bg-white rounded-full shadow-lg border-2 border-[#454545] top-1/2 -translate-y-1/2 -ml-2 z-20 pointer-events-none"
                                    style={{ left: `${rgba.a * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Tooltip (Isolated from flex flow) */}
                        <AnimatePresence>
                            {tooltip.show && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute bg-[#2d2d2d] text-white text-[11px] px-2 py-1 rounded border border-white/10 shadow-xl pointer-events-none z-[300] whitespace-nowrap"
                                    style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px`, transform: 'translateX(-50%)' }}
                                >
                                    {tooltip.text}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Inputs Area */}
                    <div className="flex flex-col gap-4 shrink-0">
                        <div className="grid grid-cols-[110px,1fr] gap-3">
                            <DropDownButton
                                value={inputMode}
                                onChange={(val) => setInputMode(val as any)}
                                options={[
                                    { value: 'RGB', label: 'RGB' },
                                    { value: 'HSV', label: 'HSV' }
                                ]}
                                className="w-full"
                            />
                            <div className="relative group flex-1">
                                <input
                                    type="text"
                                    value={rgbaToHexWithAlpha(rgba.r, rgba.g, rgba.b, rgba.a).toUpperCase()}
                                    onChange={(e) => {
                                        if (e.target.value.match(/^#[0-9A-Fa-f]{0,8}$/)) {
                                            if (e.target.value.length >= 7) {
                                                const newRgba = hexToRgba(e.target.value);
                                                setRgba(newRgba);
                                                setHsv(rgbToHsv(newRgba));
                                                onChange(e.target.value);
                                            }
                                        }
                                    }}
                                    className="win-input w-full h-9 px-3 text-[13px] font-mono"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 pointer-events-none group-focus-within:opacity-0 transition-opacity">HEX</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {inputMode === 'RGB' ? (
                                <>
                                    <InputGroup label="Red" value={rgba.r} onChange={(val) => handleRgbaInput('r', val)} />
                                    <InputGroup label="Green" value={rgba.g} onChange={(val) => handleRgbaInput('g', val)} />
                                    <InputGroup label="Blue" value={rgba.b} onChange={(val) => handleRgbaInput('b', val)} />
                                    <InputGroup label="Opacity" value={Math.round(rgba.a * 100)} unit="%" onChange={(val) => handleRgbaInput('a', val)} />
                                </>
                            ) : (
                                <>
                                    <InputGroup label="Hue" value={Math.round(hsv.h)} onChange={(val) => handleHsvChange({ h: parseInt(val) })} />
                                    <InputGroup label="Sat" value={Math.round(hsv.s)} unit="%" onChange={(val) => handleHsvChange({ s: parseInt(val) })} />
                                    <InputGroup label="Val" value={Math.round(hsv.v)} unit="%" onChange={(val) => handleHsvChange({ v: parseInt(val) })} />
                                    <InputGroup label="Alpha" value={Math.round(rgba.a * 100)} unit="%" onChange={(val) => handleAlphaChange(parseInt(val) / 100)} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-2 pt-6 border-t border-white/5 shrink-0">
                        <button
                            onClick={onClose}
                            className="w-full win-button-primary"
                        >
                            關閉
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const InputGroup: React.FC<{ label: string; value: number; unit?: string; onChange: (val: string) => void }> = ({ label, value, unit, onChange }) => (
    <div className="flex flex-col gap-2">
        <input
            type="text"
            value={unit ? `${value}${unit}` : value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
            className="win-input h-9 px-1 text-center text-[12px]"
        />
        <span className="text-[10px] text-white/40 text-center uppercase font-medium">{label}</span>
    </div>
);
