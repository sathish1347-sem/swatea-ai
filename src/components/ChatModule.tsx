import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Code2,
  FileSpreadsheet,
  Zap,
  Globe,
  Trash2,
  Paperclip,
  Wand2,
  X,
  Download,
  Mic,
  MicOff,
  Cpu,
  Compass,
  Plus,
  Volume2
} from 'lucide-react';
import { ChatMessage, LanguageCode } from '../types';

interface ChatModuleProps {
  language: LanguageCode;
  currentUserEmail?: string;
}

export const ChatModule: React.FC<ChatModuleProps> = ({ language, currentUserEmail = 'guest@swatea.ai' }) => {
  const isTamil = language === 'ta';
  const storageKey = `swatea_chats_${currentUserEmail.toLowerCase().trim()}`;

  const defaultWelcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content: isTamil
      ? `வணக்கம்! நான் **ஸ்வாதியா ஏஐ (Swatea AI)**, ChatGPT, Gemini & Claude வகுப்பிலான உங்கள் Unified Flagship AI Assistant.

நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?
- 💬 **நுண்ணறிவு சாட் & தமிழ் உரையாடல்**
- 💻 **முழுமையான கோடிங் & டீபக்கிங் (Full-Stack Coding)**
- 📄 **ஆவண ஆய்வு & சுருக்கம்**
- 🌐 **நேரலை இணையத் தேடல் (Real-time Grounded Search)**`
      : `Welcome! I am **Swatea AI**, your unified enterprise AI platform (ChatGPT, Gemini & Claude class assistant).

How can I empower your workflow today?
- 💬 **Strategic AI Reasoning & Conversational Chat**
- 💻 **Full-Stack Code Generation, Refactoring & Debugging**
- 📄 **Document Intelligence & Contract Analysis**
- 🌐 **Real-time Web Search & Synthesis**`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading stored chats:', err);
    }
    return [defaultWelcomeMessage];
  });

  // Re-load chats whenever user email changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (err) {
      console.error('Error loading stored chats:', err);
    }
    setMessages([defaultWelcomeMessage]);
  }, [currentUserEmail, storageKey]);

  // Auto-save messages to localStorage whenever messages change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }
    } catch (err) {
      console.error('Error saving chats to localStorage:', err);
    }
  }, [messages, storageKey]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<'general' | 'coder' | 'analyst' | 'workflow'>('general');
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.6-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = isTamil ? 'ta-IN' : 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [isTamil]);

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      alert(
        isTamil
          ? 'உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.'
          : 'Voice dictation is not supported in this browser.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  const starterPrompts = [
    {
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      title: isTamil ? 'REST API கோடிங்' : 'Express REST API',
      prompt: isTamil ? 'ஒரு Express + TypeScript REST API உருவாக்கு' : 'Create an Express + TypeScript REST API microservice',
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-400" />,
      title: isTamil ? 'ஆவண ஆய்வு' : 'Analyze Document',
      prompt: isTamil ? 'நிறுவன ஒப்பந்த விதிகளைப் பகுப்பாய்வு செய்க' : 'Analyze key clauses in enterprise service level agreement',
    },
    {
      icon: <Globe className="w-5 h-5 text-amber-400" />,
      title: isTamil ? 'ஆழமான தேடல்' : 'Deep Web Search',
      prompt: isTamil ? '2026 ஏஐ தொழில்நுட்ப மாற்றங்களை தேடித் தருக' : 'Summarize key enterprise AI architectural trends in 2026',
    },
    {
      icon: <Zap className="w-5 h-5 text-rose-400" />,
      title: isTamil ? 'தானியங்கி வொர்க்ஃப்ளோ' : 'Agent Workflow',
      prompt: isTamil ? 'வாடிக்கையாளர் ஆதரவு தானியங்கி ஏஜென்ட் திட்டம் அமை' : 'Design an automated customer support agent workflow',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      setAttachedFile({ name: file.name, content });
    };
    reader.readAsText(file);
  };

  const handleSend = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim() || loading) return;

    let fullPrompt = promptToSend;
    if (attachedFile) {
      fullPrompt = `[Attached File: ${attachedFile.name}]\n\nFile Content:\n${attachedFile.content}\n\nUser Question: ${promptToSend}`;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptToSend + (attachedFile ? ` 📎 [Attached: ${attachedFile.name}]` : ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachedFile(null);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: fullPrompt,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          persona,
          model: selectedModel,
          language: isTamil ? 'Tamil' : 'English',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chat request failed');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        persona,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Error:** ${err?.message || 'Failed to connect to Swatea AI Server.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (err) {
      console.error('Error clearing chat:', err);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert(isTamil ? 'உங்கள் உலாவி குரல் வெளியீட்டை ஆதரிக்கவில்லை.' : 'Text to Speech not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const startNewChat = () => {
    setMessages([defaultWelcomeMessage]);
    try {
      localStorage.setItem(storageKey, JSON.stringify([defaultWelcomeMessage]));
    } catch (err) {
      console.error('Error starting new chat:', err);
    }
  };

  const exportChat = () => {
    const textContent = messages
      .map((m) => `### ${m.role === 'user' ? 'User' : 'Swatea AI'} (${m.timestamp})\n\n${m.content}\n`)
      .join('\n---\n\n');
    const blob = new Blob([textContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swatea-chat-export-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const magicEnhancePrompt = () => {
    if (!input.trim()) {
      setInput(
        isTamil
          ? 'நிறுவனத் தேவைகளுக்கான பாதுகாப்பான TypeScript மைக்ரோசர்வீஸ் ஆர்கிடெக்ச்சர் தயாரித்து தா.'
          : 'Provide a detailed, enterprise-grade microservice architecture with complete TypeScript types, error bounds, and caching strategy.'
      );
      return;
    }
    const enhanced = isTamil
      ? `${input.trim()} - தயவுசெய்து இதை நிறுவன பயன்பாட்டிற்கு ஏற்றவாறு, தெளிவான படிகள், டைப்-சேஃபிட்டி (TypeScript) மற்றும் செயல்பாட்டு விரிவுரையுடன் விளக்கு.`
      : `Comprehensive Enterprise Request: ${input.trim()}. Please provide an in-depth analysis, structured step-by-step framework, production-ready code blocks with type safety, and potential operational risk considerations.`;
    setInput(enhanced);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl relative">
      {/* Top Header / Gemini Model Picker Bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-amber-100" />
            </div>
            <span className="font-extrabold text-sm text-white tracking-wide">
              {isTamil ? 'ஸ்வாதியா ஜெமினி ஸ்டுடியோ' : 'Swatea Gemini AI Studio'}
            </span>
          </div>

          {/* Model Switcher */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-amber-300 font-mono text-[11px] rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer shadow-inner"
          >
            <option value="gemini-3.6-flash">Gemini 3.6 Flash (Ultra Fast)</option>
            <option value="gemini-3.1-pro">Gemini 3.1 Pro (DeepReasoning)</option>
            <option value="swatea-core-v1">Swatea Core Agent v1</option>
          </select>
        </div>

        {/* Persona Selectors */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-xs">
          <button
            onClick={() => setPersona('general')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              persona === 'general' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setPersona('coder')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              persona === 'coder' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Coder
          </button>
          <button
            onClick={() => setPersona('analyst')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              persona === 'analyst' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Analyst
          </button>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={startNewChat}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all flex items-center gap-1 text-xs shadow-md"
            title={isTamil ? 'புதிய உரையாடல்' : 'Start New Chat'}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">{isTamil ? 'புதிய சாட்' : 'New Chat'}</span>
          </button>
          <button
            onClick={exportChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-mono"
            title="Export Chat as Markdown"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Stream Area (Scrollable Messages Container) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome Greeting on clean start */}
          {messages.length <= 1 && (
            <div className="py-6 text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isTamil ? 'ஜெமினி 3.6 ஃபிளாஷ் இயங்கும் சாட்' : 'Powered by Gemini 3.6 Flash & Swatea Core'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-indigo-200 tracking-tight">
                {isTamil ? 'வணக்கம், ஸ்வாதியா பயனரே' : 'Hello, Creator'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                {isTamil
                  ? 'உங்களின் ஆக்கபூர்வமான சந்தேகங்கள், கோடிங், ஆவண சுருக்கங்கள் மற்றும் நிகழ்நேரத் தகவல்களுக்கு நான் தயார்.'
                  : 'How can I assist your coding, reasoning, research, or enterprise strategy today?'}
              </p>

              {/* Starter Prompt Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
                {starterPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(undefined, p.prompt)}
                    className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 p-4 rounded-2xl transition-all flex items-start justify-between group shadow-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {p.icon}
                        <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                          {p.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {p.prompt}
                      </p>
                    </div>
                    <Wand2 className="w-4 h-4 text-slate-600 group-hover:text-amber-400 shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Stream */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'ml-auto flex-row-reverse max-w-xl' : 'max-w-3xl'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-md ${
                    isUser
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-amber-200" />}
                </div>

                {/* Message Box */}
                <div
                  className={`group relative rounded-2xl p-4 text-xs sm:text-sm leading-relaxed border ${
                    isUser
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-50 rounded-tr-none'
                      : 'bg-slate-900/90 border-slate-800/90 text-slate-200 rounded-tl-none shadow-xl'
                  }`}
                >
                  {/* Message Meta */}
                  <div className="flex items-center justify-between gap-4 mb-1.5 text-[10px] text-slate-400 border-b border-slate-800/60 pb-1">
                    <span className="font-bold text-slate-300 font-mono">
                      {isUser ? (isTamil ? 'நீங்கள்' : 'You') : 'Swatea Gemini Core'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div className="whitespace-pre-wrap font-sans text-slate-200 space-y-2">
                    {msg.content}
                  </div>

                  {/* Copy & Speak buttons */}
                  {!isUser && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700/80 shadow">
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="p-1 text-slate-400 hover:text-amber-400 transition-all rounded"
                        title={isTamil ? 'குரலில் கேட்க (Read Aloud)' : 'Read response aloud'}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="p-1 text-slate-400 hover:text-amber-400 transition-all rounded"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Animation */}
          {loading && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-amber-300 flex items-center gap-2 shadow-xl">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></div>
                <span className="font-mono text-[11px] text-slate-400 ml-2">
                  {isTamil ? 'ஸ்வாதியா ஏஐ சிந்திக்கிறது...' : 'Gemini AI generating synthesis...'}
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* FIXED / STICKY GEMINI-STYLE BOTTOM TYPING DASHBOARD */}
      <div className="shrink-0 sticky bottom-0 left-0 right-0 p-3 sm:p-4 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-md z-20">
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Attached File Preview Badge */}
          {attachedFile && (
            <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="truncate max-w-[300px]">📎 {attachedFile.name}</span>
              <button
                type="button"
                onClick={() => setAttachedFile(null)}
                className="text-slate-400 hover:text-rose-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Gemini Capsule Form */}
          <form
            onSubmit={handleSend}
            className="bg-slate-900/90 border border-slate-800 focus-within:border-amber-500/80 rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-2xl transition-all"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".txt,.js,.ts,.json,.md,.py,.doc,.csv"
            />

            {/* Input Field */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder={
                isTamil
                  ? 'ஸ்வாதியா ஜெமினியிடம் ஏதேனும் கேளுங்கள் (उदा. "ஒரு REST API உருவாக்கு")...'
                  : 'Ask Swatea Gemini anything (e.g. "Draft an enterprise REST API")...'
              }
              className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none px-3 py-1.5 resize-none max-h-32 min-h-[40px]"
            />

            {/* Bottom Controls Bar inside Capsule */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-1 px-1">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1 text-xs"
                  title="Attach File"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={magicEnhancePrompt}
                  className="p-2 text-amber-400 hover:text-amber-300 hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1 text-xs font-mono"
                  title={isTamil ? 'வினவலை மேம்படுத்து' : 'Magic Prompt Enhancer'}
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px] font-bold">Enhance</span>
                </button>

                <button
                  type="button"
                  onClick={toggleVoiceListening}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1 text-xs ${
                    isListening
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
                      : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                  }`}
                  title={isTamil ? 'குரல் உள்ளீடு' : 'Voice Dictation'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening && <span className="text-[10px] font-bold">Listening...</span>}
                </button>
              </div>

              {/* Right Send Capsule Button */}
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-slate-950 font-extrabold rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2 text-xs"
              >
                <span>{isTamil ? 'அனுப்பு' : 'Send'}</span>
                <Send className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </form>

          {/* Gemini Disclaimer */}
          <div className="text-center text-[10px] text-slate-500 font-mono">
            {isTamil
              ? 'ஸ்வாதியா ஏஐ தவறான தகவல்களைத் தரக்கூடும். முக்கியமான விபரங்களைச் சரிபார்க்கவும்.'
              : 'Swatea AI may display inaccurate info. Double-check responses.'}
          </div>
        </div>
      </div>
    </div>
  );
};


