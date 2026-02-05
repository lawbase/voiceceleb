'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Mail, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { sendEmail } from '@/app/actions';

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus('success');
      e.currentTarget.reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong.');
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-navy-900 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in opacity-0">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t.contact.title}</h2>
              <p className="text-slate-400 text-lg">{t.contact.subtitle}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Office</h4>
                  <p className="text-slate-400">{t.contact.info.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent-violet" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <p className="text-slate-400">{t.contact.info.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-navy-800 p-8 rounded-3xl border border-white/5 shadow-2xl animate-fade-in delay-100 opacity-0 fill-mode-forwards space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t.contact.form.name}</label>
              <input 
                name="name" 
                type="text" 
                required 
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t.contact.form.email}</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">{t.contact.form.message}</label>
              <textarea 
                name="message" 
                rows="4" 
                required 
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none" 
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                Message sent successfully!
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                t.contact.form.submit
              )}
            </button>
          </form>

        </div>
      </div>
      
      {/* Footer separator line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Contact;
