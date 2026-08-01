import React from 'react';
import {
  MessageSquare,
  Search,
  Code2,
  FileText,
  Eye,
  Mic,
  Workflow,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers
} from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  language: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  language,
}) => {
  const isTamil = language === 'ta';

  const MODULES: { id: ModuleType; title: string; subtitle: string; icon: React.FC<any>; badge?: string }[] = [
    {
      id: 'chat',
      title: isTamil ? 'AI சாட் ஹப்' : 'AI Chat Hub',
      subtitle: isTamil ? 'மாடல் சாட் & பதில்கள்' : 'Multimodal Conversational AI',
      icon: MessageSquare,
      badge: 'PRO',
    },
    {
      id: 'search',
      title: isTamil ? 'AI தேடல் எஞ்சின்' : 'AI Deep Search',
      subtitle: isTamil ? 'கூகுள் தகவல்களுடன் தேடல்' : 'Google Grounded Search',
      icon: Search,
    },
    {
      id: 'code',
      title: isTamil ? 'AI கோடிங் ஸ்டுடியோ' : 'AI Code Studio',
      subtitle: isTamil ? 'கோட் உருவாக்கல் & திருத்தம்' : 'Code Gen, Debug & Refactor',
      icon: Code2,
    },
    {
      id: 'document',
      title: isTamil ? 'ஆவண நுண்ணறிவு' : 'Document AI',
      subtitle: isTamil ? 'PDF & அறிக்கை சுருக்கம்' : 'PDF, Doc Summaries & Q&A',
      icon: FileText,
    },
    {
      id: 'vision',
      title: isTamil ? 'விஷன் & படம் AI' : 'Vision & Image AI',
      subtitle: isTamil ? 'பட பகுப்பாய்வு' : 'Multimodal Image Inspection',
      icon: Eye,
    },
    {
      id: 'voice',
      title: isTamil ? 'குரல் உதவி' : 'Voice Assistant',
      subtitle: isTamil ? 'டெக்ஸ்ட்-டு-ஸ்பீச் குரல்' : 'Gemini Text-to-Speech',
      icon: Mic,
      badge: 'TTS',
    },
    {
      id: 'workflow',
      title: isTamil ? 'AI வொர்க்ஃப்ளோ' : 'Workflow & Agents',
      subtitle: isTamil ? 'தானியங்கி ஏஜென்ட்கள்' : 'Autonomous Agent DAGs',
      icon: Workflow,
    },
    {
      id: 'admin',
      title: isTamil ? 'நிர்வாக போர்ட்டல்' : 'Enterprise Admin',
      subtitle: isTamil ? 'பயன்பாடு & பாதுகாப்பு' : 'Metrics, RBAC & Security',
      icon: ShieldCheck,
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-slate-950 border-r border-slate-800/80 p-3 sm:p-4 flex flex-col justify-between shrink-0">
      <div>
        <div className="flex items-center justify-between px-3 py-2 mb-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{isTamil ? 'இயக்கத் தொகுதிகள்' : 'OS Core Modules'}</span>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
            v1.0
          </span>
        </div>

        <nav className="space-y-1">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group border ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/15 to-rose-500/10 border-amber-500/40 text-white shadow-lg shadow-amber-950/20'
                    : 'bg-slate-900/30 hover:bg-slate-900/80 border-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-tr from-amber-500 to-rose-600 text-white'
                      : 'bg-slate-800/80 text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-amber-300' : 'text-slate-200'}`}>
                      {mod.title}
                    </span>
                    {mod.badge && (
                      <span className="text-[9px] font-extrabold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.2 rounded-md">
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {mod.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner */}
      <div className="mt-6 p-3 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
          <span className="text-xs font-bold text-slate-200">
            {isTamil ? 'ஸ்வாதியா ஏஐ இன்ஜின்' : 'Swatea AI Engine'}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-snug">
          {isTamil
            ? 'அனைத்து மாடல்களும் சர்வர் வழியே செயல்படுகின்றன.'
            : 'Powered by server-side Gemini 3.6 Flash & 3.1 Pro models.'}
        </p>
        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>Tenant: Org_Alpha</span>
          <span className="text-emerald-400 font-semibold">Ready</span>
        </div>
      </div>
    </aside>
  );
};
