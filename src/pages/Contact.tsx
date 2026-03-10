import React from 'react';
import { Mail, Github } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';

export const Contact: React.FC = () => {
    return (
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
    );
};
