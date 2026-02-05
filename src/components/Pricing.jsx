'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Check } from 'lucide-react';

const Pricing = () => {
    const { t } = useLanguage();

    return (
        <section id="pricing" className="py-24 bg-navy-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t.pricing.title}</h2>
                    <p className="text-slate-400 text-lg">{t.pricing.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {t.pricing.plans.map((plan, index) => {
                        const isPro = index === 1;
                        return (
                            <div
                                key={index}
                                className={`relative p-8 rounded-3xl border transition-all duration-300 ${isPro
                                        ? 'bg-navy-900 border-accent-blue shadow-2xl shadow-accent-blue/20 scale-105 z-10'
                                        : 'bg-navy-900/50 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                {isPro && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-blue to-accent-violet text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {plan.popular}
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-500">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                            <Check className={`w-4 h-4 ${isPro ? 'text-accent-blue' : 'text-slate-500'}`} />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-full font-bold text-sm transition-transform hover:-translate-y-1 ${isPro
                                        ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}>
                                    {plan.cta}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
