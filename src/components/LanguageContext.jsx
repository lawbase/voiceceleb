'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('KR'); // Default to Korean
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleLang = () => {
        setLang((prev) => (prev === 'KR' ? 'EN' : 'KR'));
    };

    const t = translations[lang];

    // Prevent hydration mismatch by rendering children only after mount, 
    // or accept initial hydration mismatch for lang. 
    // Better strategy: Simple return.
    if (!mounted) {
        return <>{children}</>; // Render children with default server state or null? 
        // For SEO, we might want default content. Let's just return children and handle client update.
        // Actually, safest for simple migration is to return null or just handle 't' carefully.
    }

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback for server components or pre-hydration
        return {
            lang: 'KR',
            toggleLang: () => { },
            t: translations['KR']
        };
    }
    return context;
};
