import React from 'react';
import { Cpu, Server, Activity, ShieldCheck, Flame } from 'lucide-react';

export const FooterBar: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 px-4 py-2 text-[11px] font-mono flex flex-wrap items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-bold text-slate-200">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>SWATEA AI OS X</span>
        </span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400">Enterprise Edition v1.0</span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="text-emerald-400 hidden sm:inline flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Port 3000 Bound</span>
        </span>
      </div>

      <div className="flex items-center gap-4 text-slate-500">
        <div className="hidden md:flex items-center gap-1">
          <Cpu className="w-3 h-3 text-amber-400" />
          <span>Gemini 3.6 Flash / 3.1 Pro</span>
        </div>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>38ms Latency</span>
        </div>
        <div className="hidden lg:flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-indigo-400" />
          <span>Server-Side Secure</span>
        </div>
      </div>
    </footer>
  );
};
