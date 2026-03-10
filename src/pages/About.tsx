import React from 'react';
import { MapPin, GraduationCap, Calendar, Github, Linkedin } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';

export const About: React.FC = () => {
    return (
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
    );
};
