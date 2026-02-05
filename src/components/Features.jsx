'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Mic2, Globe2, Sliders } from 'lucide-react';

const Features = () => {
    const { t } = useLanguage();

    const icons = [Mic2, Globe2, Sliders];

    return (
        <section id="features" className="py-24 bg-navy-900 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white animate-fade-in">{t.features.title}</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.features.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.features.items.map((item, index) => {
                        const Icon = icons[index];
                        return (
                            <div key={index} className="group p-8 rounded-2xl bg-navy-800 border border-white/5 hover:border-accent-blue/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-blue/10">
                                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-blue/20 transition-colors">
                                    <Icon className="w-7 h-7 text-accent-blue group-hover:text-accent-cyan transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default Features;
