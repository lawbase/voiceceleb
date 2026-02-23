'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section
            className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat bg-navy-900/40 bg-blend-overlay"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent-blue opacity-10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                <div className="animate-fade-in opacity-0">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-accent-cyan mb-6">
                        ✨ Voice Cloning Technology V2.0
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white whitespace-pre-line">
                        {t.hero.title_start} <br className="hidden md:block" />
                        <span className="text-gradient hover:scale-105 transition-transform inline-block">{t.hero.title_end}</span>
                    </h1>
                </div>

                <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-400 animate-fade-in delay-100 opacity-0 fill-mode-forwards">
                    {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200 opacity-0 fill-mode-forwards">
                    <a href="#features" className="btn-primary flex items-center gap-2 group">
                        {t.hero.cta}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <button className="btn-secondary flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current" />
                        Watch Demo
                    </button>
                </div>
            </div>

            {/* Decorative Waveform or Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none h-32 bottom-0" />
        </section>
    );
};

export default Hero;
