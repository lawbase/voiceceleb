'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';

const Team = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-navy-900 border-t border-white/5 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in opacity-0">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t.team.title}</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t.team.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.team.members.map((member, index) => (
                        <div
                            key={index}
                            className="bg-navy-800 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 animate-fade-in opacity-0 flex flex-col"
                            style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: 'forwards' }}
                        >
                            {member.image && (
                                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white/10" />
                            )}
                            <h3 className="text-xl font-bold text-white mb-4 text-center">{member.name}</h3>
                            <ul className="space-y-2 text-sm text-slate-400 flex-1">
                                {member.desc.map((line, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-2 text-accent-blue">•</span>
                                        <span className="leading-snug">{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
