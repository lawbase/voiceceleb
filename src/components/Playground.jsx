'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Mic, Video, Upload, Play, Pause, Download, Wand2, Languages, Loader2, Volume2 } from 'lucide-react';
import { generateAudio } from '@/app/actions';

const Playground = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('TTS'); // 'TTS' or 'DUBBING'
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const audioRef = useRef(null);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeVoice, setActiveVoice] = useState('bae'); // Default voice
    const [volume, setVolume] = useState(1); // Default volume 1.0 (100%)

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle audio playback ending
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
        }
    }, []);

    const handleGenerate = async () => {
        if (!inputText && activeTab === 'TTS') return; // Simple validation
        setIsGenerating(true);
        setHasGenerated(false); // Reset generated state

        try {
            const result = await generateAudio(inputText, activeVoice);
            if (result.success) {
                const audioSrc = `data:audio/mp3;base64,${result.audioContent}`;
                if (audioRef.current) {
                    audioRef.current.src = audioSrc;
                    audioRef.current.play().catch(e => console.log("Auto-play blocked:", e));
                    setIsPlaying(true);
                    setHasGenerated(true); // Set generated state on successful playback
                }
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (e) {
            console.error("Failed to generate audio:", e);
            alert("Failed to generate audio");
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleDownload = () => {
        if (audioRef.current && audioRef.current.src) {
            const link = document.createElement('a');
            link.href = audioRef.current.src;
            link.download = `voiceceleb-audio-${Date.now()}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <section className="py-24 bg-navy-800 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in opacity-0">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{t.playground.title}</h2>

                    {/* Tabs */}
                    <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => { setActiveTab('TTS'); setHasGenerated(false); setIsPlaying(false); if (audioRef.current) audioRef.current.pause(); }}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'TTS' ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/25' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Mic className="w-4 h-4" />
                            {t.playground.tab_tts}
                        </button>
                        <button
                            onClick={() => { setActiveTab('DUBBING'); setHasGenerated(false); setIsPlaying(false); if (audioRef.current) audioRef.current.pause(); }}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'DUBBING' ? 'bg-accent-violet text-white shadow-lg shadow-accent-violet/25' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Video className="w-4 h-4" />
                            {t.playground.tab_dubbing}
                        </button>
                    </div>
                </div>

                {/* Main Interface */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Left Column: Input */}
                    <div className="bg-navy-700 rounded-3xl p-8 border border-white/5 shadow-2xl animate-fade-in delay-100 opacity-0 fill-mode-forwards flex flex-col h-[500px]">
                        {activeTab === 'TTS' ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t.playground.voice_label}</label>
                                    <select
                                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-blue"
                                        value={activeVoice}
                                        onChange={(e) => setActiveVoice(e.target.value)}
                                    >
                                        {Object.entries(t.playground.voice_options).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                                <textarea
                                    className="w-full flex-1 bg-transparent border-none resize-none text-lg leading-relaxed focus:outline-none placeholder:text-white/20 text-white"
                                    placeholder={t.playground.input_placeholder}
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                                <div className="mt-6 flex justify-between items-center text-sm text-slate-400 border-t border-white/5 pt-4">
                                    <span>{inputText.length} chars</span>
                                    <button
                                        onClick={() => setInputText('')}
                                        className="hover:text-white transition-colors"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </>
                        ) : (
                            // Dubbing Input
                            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl hover:border-accent-violet hover:bg-white/5 transition-all cursor-pointer group">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-accent-violet" />
                                </div>
                                <p className="text-lg font-medium mb-2 text-white">Drag & Drop Video</p>
                                <p className="text-sm text-slate-400">{t.playground.dubbing_placeholder}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Output / Visualization */}
                    <div className="bg-[#0f1420] rounded-3xl p-8 border border-white/5 shadow-2xl animate-fade-in delay-200 opacity-0 fill-mode-forwards relative overflow-hidden flex flex-col">

                        {!hasGenerated && !isGenerating ? (
                            // Empty State
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                    <Wand2 className="w-10 h-10 opacity-50" />
                                </div>
                                <p className="text-lg">Ready to Generate</p>
                            </div>
                        ) : isGenerating ? (
                            // Loading State
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-2 h-20 bg-accent-blue rounded-full animate-bounce"></span>
                                    <span className="w-2 h-12 bg-accent-violet rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-20 bg-accent-cyan rounded-full animate-bounce delay-200"></span>
                                    <span className="w-2 h-16 bg-accent-blue rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-10 bg-accent-violet rounded-full animate-bounce delay-150"></span>
                                </div>
                                <p className="text-accent-blue font-mono animate-pulse">{t.playground.btn_generating}</p>
                            </div>
                        ) : (
                            // Result State (Waveform Visualizer)
                            <div className="flex-1 flex flex-col justify-center relative">
                                {/* Simulated Waveform Visual */}
                                <div className="h-32 flex items-center justify-center gap-1 mb-8 opacity-80">
                                    {[...Array(40)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 bg-gradient-to-t from-accent-blue to-accent-violet rounded-full"
                                            style={{
                                                height: isPlaying ? `${Math.random() * 100}% ` : '20%',
                                                transition: 'height 0.1s ease'
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center justify-between px-4 bg-white/5 rounded-2xl py-4 backdrop-blur-md">
                                    <button
                                        onClick={handlePlayPause}
                                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform text-black flex-shrink-0"
                                    >
                                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                                    </button>

                                    <div className="flex-1 mx-3 md:mx-6 flex flex-col gap-1">
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-accent-blue rounded-full transition-all duration-100 ease-linear"
                                                style={{ width: `${(currentTime / duration) * 100}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-slate-400 font-mono">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        {/* Volume Control */}
                                        <div className="hidden md:flex items-center gap-2 group relative">
                                            <Volume2 className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                                            />
                                        </div>

                                        <button
                                            onClick={handleDownload}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            <Download className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hidden Audio Element for Playback - Moved outside conditional */}
                        <audio
                            ref={audioRef}
                            className="hidden"
                            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                            onEnded={() => setIsPlaying(false)}
                        />

                        {/* Sticky Generate Button */}
                        {!hasGenerated && !isGenerating && (
                            <div className="absolute bottom-8 left-8 right-8">
                                <button
                                    onClick={handleGenerate}
                                    className="w-full btn-primary flex items-center justify-center gap-2 group"
                                >
                                    <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    {t.playground.btn_generate}
                                </button>
                            </div>
                        )}

                        {hasGenerated && (
                            <div className="absolute top-8 right-8">
                                <button
                                    onClick={() => { setHasGenerated(false); setIsPlaying(false); }}
                                    className="text-xs font-bold px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                                >
                                    RESET
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Playground;
