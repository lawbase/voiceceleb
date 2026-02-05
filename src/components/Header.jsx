'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Globe } from 'lucide-react';

const Header = () => {
    const { lang, toggleLang, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo Placeholder */}
                    <div className="w-8 h-8 bg-gradient-to-tr from-accent-blue to-accent-violet rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full opacity-80" />
                    </div>
                    <a href="#" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                        VOICE<span className="text-accent-blue">CELEB</span>
                    </a>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-white transition-colors">{t.header.nav_features}</a>
                    <a href="#pricing" className="hover:text-white transition-colors">{t.header.nav_pricing}</a>
                    <a href="#contact" className="hover:text-white transition-colors">{t.header.nav_contact}</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLang}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white"
                    >
                        <Globe className="w-4 h-4 text-accent-violet" />
                        <span>{t.header.lang_toggle === 'KR' ? 'English' : '한국어'}</span>
                    </button>

                    <button className="hidden sm:block px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                        {t.header.nav_login}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
