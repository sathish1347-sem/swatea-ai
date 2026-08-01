import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Flame,
  CheckCircle2,
  Bot
} from 'lucide-react';
import { LanguageCode } from '../types';

interface LoginViewProps {
  language: LanguageCode;
  onLogin: (email: string) => void;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  language,
  onLogin,
  onLanguageChange,
}) => {
  const isTamil = language === 'ta';
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const sampleEmails = [
    'user@gmail.com',
    'developer@swatea.ai',
    'enterprise@swatea.com',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError(isTamil ? 'மின்னஞ்சல் முகவரியை உள்ளிடவும்.' : 'Please enter your email address.');
      return;
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError(
        isTamil
          ? 'செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள்ளிடவும் (उदा: user@gmail.com).'
          : 'Please enter a valid email address (e.g. user@gmail.com).'
      );
      return;
    }
    setError('');
    onLogin(cleanEmail);
  };

  const handleQuickSelect = (sampleEmail: string) => {
    setEmail(sampleEmail);
    setError('');
    onLogin(sampleEmail);
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Radial Glowing Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Language Bar Top Right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1.5 rounded-2xl backdrop-blur-md">
        <Globe className="w-4 h-4 text-amber-400 ml-2" />
        <button
          onClick={() => onLanguageChange('ta')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
            language === 'ta'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          தமிழ் 🇮🇳
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
            language === 'en'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          English 🇺🇸
        </button>
      </div>

      {/* Main Login Glass Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 p-[2px] shadow-xl shadow-rose-950/50 mb-1">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Flame className="w-7 h-7 text-amber-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            SWATEA <span className="text-amber-400">AI OS</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isTamil
              ? 'உங்கள் மின்னஞ்சல் ஐடியை உள்ளிட்டு உடனடி ஏஐ உரையாடல் மற்றும் சேமிக்கப்பட்ட சாட்களை அணுகவும்.'
              : 'Enter your email ID to access ChatGPT, Gemini & Claude models with persistent chat history.'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{isTamil ? 'மின்னஞ்சல் முகவரி (Email Address)' : 'Email Address'}</span>
            </label>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner font-mono"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-[11px] font-semibold text-rose-400 mt-1 pl-1">
                ⚠️ {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-slate-950 font-black rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            <span>{isTamil ? 'உள்நுழைக (Sign In)' : 'Sign In to Swatea AI'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </form>

        {/* Quick Demo Emails */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
            {isTamil ? 'மாதிரி ஐடி (Quick Email Select):' : 'Instant Demo Accounts:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleEmails.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickSelect(sample)}
                className="px-2.5 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 text-[11px] font-mono transition-all"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{isTamil ? 'தானியங்கி சாட் சேமிப்பு' : 'Auto Chat Saved'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{isTamil ? 'ஜெமினி 3.6 ஃபிளாஷ்' : 'Gemini 3.6 Flash'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{isTamil ? 'முழுமையான கோடிங்' : 'Full-Stack Code'}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>{isTamil ? 'தமிழ் ஆதரவு' : 'Tamil Native AI'}</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-600 font-mono pt-2">
          Swatea Enterprise AI OS • Security Encrypted Session
        </div>
      </div>
    </div>
  );
};
