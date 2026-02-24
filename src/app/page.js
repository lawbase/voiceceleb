import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Playground from "@/components/Playground";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-white/10 py-12 text-center text-slate-400 text-sm bg-navy-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-center gap-6 mb-8">
        {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
          <a key={i} href="#" className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <p>&copy; 2026 VoiceCeleb AI. All rights reserved.</p>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Contact />
        <Playground />
        <Features />
        <Pricing />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
