import React from 'react';
import {
  Sparkles,
  Globe,
  Shield,
  Activity,
  Cpu,
  UserCheck,
  ChevronDown,
  Command,
  Flame,
  LogOut,
  Mail
} from 'lucide-react';
import { LanguageCode, LanguageOption } from '../types';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeModuleTitle: string;
  currentUserEmail?: string;
  onLogout?: () => void;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ் 🇮🇳', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English 🇺🇸', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español 🇪🇸', flag: '🇪🇸' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語 🇯🇵', flag: '🇯🇵' },
  { code: 'de', name: 'German', nativeName: 'Deutsch 🇩🇪', flag: '🇩🇪' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeModuleTitle,
  currentUserEmail,
  onLogout,
}) => {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);

  const selectedLang = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[1];
  const isTamil = currentLanguage === 'ta';
  const initial = currentUserEmail ? currentUserEmail.charAt(0).toUpperCase() : 'S';

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-slate-100 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 p-[1.5px] shadow-lg shadow-rose-950/40">
            <div className="w-full h-full bg-slate-950 rounded-[10.5px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-white font-mono">
                SWATEA <span className="text-amber-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider font-mono bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30 rounded-full uppercase">
                OS X Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {activeModuleTitle} • <span className="text-emerald-400">Cloud Engine Active</span>
            </p>
          </div>
        </div>

        {/* Global OS Search bar mock */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
          <div className="relative w-full">
            <Command className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              readOnly
              placeholder="Quick Search or Cmd + K..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 cursor-pointer hover:border-slate-700 transition-colors"
            />
          </div>
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* System Status Pill */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-2.5 py-1 rounded-lg text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-mono text-[11px]">Server 3000 OK</span>
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedLang.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                  Select OS Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 ${
                      currentLanguage === lang.code ? 'text-amber-400 font-semibold bg-amber-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    {currentLanguage === lang.code && <Sparkles className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile & Enterprise Tag */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              {initial}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-200 truncate max-w-[130px]">
                {currentUserEmail || 'Swatea Admin'}
              </div>
              <div className="text-[10px] text-amber-400 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Enterprise Session
              </div>
            </div>

            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 ml-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1 text-xs font-mono"
                title={isTamil ? 'வெளியேறு (Log Out)' : 'Log Out'}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{isTamil ? 'வெளியேறு' : 'Logout'}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
