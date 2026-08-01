import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatModule } from './components/ChatModule';
import { SearchModule } from './components/SearchModule';
import { CodeModule } from './components/CodeModule';
import { DocumentModule } from './components/DocumentModule';
import { VisionModule } from './components/VisionModule';
import { VoiceModule } from './components/VoiceModule';
import { WorkflowModule } from './components/WorkflowModule';
import { WorkspaceModule } from './components/WorkspaceModule';
import { AdminModule } from './components/AdminModule';
import { FooterBar } from './components/FooterBar';
import { LoginView } from './components/LoginView';
import { ModuleType, LanguageCode } from './types';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('chat');
  const [language, setLanguage] = useState<LanguageCode>('ta'); // Default Tamil for user preference
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('swatea_user_email');
    } catch {
      return null;
    }
  });

  const handleLogin = (email: string) => {
    try {
      localStorage.setItem('swatea_user_email', email);
    } catch (e) {
      console.error(e);
    }
    setCurrentUserEmail(email);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('swatea_user_email');
    } catch (e) {
      console.error(e);
    }
    setCurrentUserEmail(null);
  };

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'chat':
        return language === 'ta' ? 'AI சாட் ஹப் (Chat Hub)' : 'AI Chat Hub';
      case 'search':
        return language === 'ta' ? 'AI தேடல் எஞ்சின் (Deep Search)' : 'AI Deep Search Engine';
      case 'workspace':
        return language === 'ta' ? 'கூகுள் வொர்க்ஸ்பேஸ் AI (Google Workspace)' : 'Google Workspace AI Hub';
      case 'code':
        return language === 'ta' ? 'AI கோடிங் ஸ்டுடியோ (Coding Studio)' : 'AI Code Studio';
      case 'document':
        return language === 'ta' ? 'ஆவண நுண்ணறிவு (Document AI)' : 'Document Intelligence';
      case 'vision':
        return language === 'ta' ? 'விஷன் & படம் AI (Vision AI)' : 'Vision & Image AI';
      case 'voice':
        return language === 'ta' ? 'குரல் உதவி (Voice Assistant)' : 'Voice Assistant';
      case 'workflow':
        return language === 'ta' ? 'வொர்க்ஃப்ளோ & ஏஜென்ட்கள்' : 'Workflow & Autonomous Agents';
      case 'admin':
        return language === 'ta' ? 'நிர்வாக போர்ட்டல் (Enterprise Admin)' : 'Enterprise Admin Portal';
      default:
        return 'Swatea AI OS X';
    }
  };

  // If user is not logged in, render the Login Screen
  if (!currentUserEmail) {
    return (
      <LoginView
        language={language}
        onLogin={handleLogin}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans select-none">
      {/* OS Top Navbar */}
      <Header
        currentLanguage={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        activeModuleTitle={getModuleTitle()}
        currentUserEmail={currentUserEmail}
        onLogout={handleLogout}
      />

      {/* Main OS Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-2 sm:p-4 gap-2 sm:gap-4 max-w-[1920px] w-full mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={(mod) => setActiveModule(mod)}
          language={language}
        />

        {/* Dynamic OS Module Workspace */}
        <main className="flex-1 h-full min-w-0 overflow-hidden">
          {activeModule === 'chat' && (
            <ChatModule language={language} currentUserEmail={currentUserEmail} />
          )}
          {activeModule === 'search' && <SearchModule language={language} />}
          {activeModule === 'workspace' && <WorkspaceModule language={language} />}
          {activeModule === 'code' && <CodeModule language={language} />}
          {activeModule === 'document' && <DocumentModule language={language} />}
          {activeModule === 'vision' && <VisionModule language={language} />}
          {activeModule === 'voice' && <VoiceModule language={language} />}
          {activeModule === 'workflow' && <WorkflowModule language={language} />}
          {activeModule === 'admin' && <AdminModule language={language} />}
        </main>
      </div>

      {/* OS Bottom Status Footer */}
      <FooterBar />
    </div>
  );
}
