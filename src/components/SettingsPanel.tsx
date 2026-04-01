import React, { useState } from 'react';
import { Settings, Lock, Cpu, Bot, X, Rocket, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { manuals } from '../data/manuals';

export const SettingsPanel = ({ 
  systemPrompt, 
  setSystemPrompt, 
  envs, 
  onUpdateEnvs,
  onInjectKnowledge
}: { 
  systemPrompt: string, 
  setSystemPrompt: (s: string) => void,
  envs: any,
  onUpdateEnvs: (envs: any) => void,
  onInjectKnowledge?: (manuals: any[]) => void
}) => {
  const [activeTab, setActiveTab] = useState<'secrets' | 'agents' | 'billing' | 'knowledge'>('secrets');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, type: string}[]>([]);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSave = () => {
    onUpdateEnvs(envs);
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleAddEnv = () => {
    if (!newKey) return;
    onUpdateEnvs({ ...envs, [newKey.toUpperCase()]: newValue });
    setNewKey('');
    setNewValue('');
  };

  const handleRemoveEnv = (key: string) => {
    const { [key]: _, ...rest } = envs;
    onUpdateEnvs(rest);
  };

  const handleEnvChange = (key: string, value: string) => {
    onUpdateEnvs({ ...envs, [key]: value });
  };
  
  const handleInjectManuals = () => {
    setIsUploading(true);
    
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, ...manuals]);
      setIsUploading(false);
      
      if (onInjectKnowledge) {
        onInjectKnowledge(manuals);
      }
    }, 2500);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate parsing and absorbing knowledge
    setTimeout(() => {
      const newFiles = Array.from(files).map(f => ({ name: f.name, type: f.type }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      
      // Here we would ideally trigger an update to the intelligenceCore
      // For now, we just simulate the UI feedback
    }, 2500);
  };
  
  return (
    <div className="h-full w-full border-r border-orange-500/20 bg-[#050505]/80 backdrop-blur-3xl flex flex-col p-5 space-y-6 shadow-[0_0_30px_rgba(249,115,22,0.05)] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between text-orange-400">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Settings size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]">System Config</h2>
        </div>
        {activeTab === 'secrets' && (
          <button 
            onClick={handleSave}
            className="p-2 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-all"
            title="Save All Secrets"
          >
            <Rocket size={14} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800/50 pb-2">
        <button 
          onClick={() => setActiveTab('secrets')}
          className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md transition-all ${activeTab === 'secrets' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Secrets
        </button>
        <button 
          onClick={() => setActiveTab('agents')}
          className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md transition-all ${activeTab === 'agents' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Agents
        </button>
        <button 
          onClick={() => setActiveTab('knowledge')}
          className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md transition-all ${activeTab === 'knowledge' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Knowledge Gate
        </button>
        <button 
          onClick={() => setActiveTab('billing')}
          className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-md transition-all ${activeTab === 'billing' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Billing
        </button>
      </div>

      {activeTab === 'secrets' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={10} className="text-orange-500" /> Environment Secrets
            </div>
            {isSaving && <span className="text-green-500 animate-pulse">SAVED</span>}
          </h3>
          <div className="space-y-3">
            {Object.keys(envs).map(key => (
              <div key={key} className="flex items-center gap-3 group">
                <label className="text-[9px] text-zinc-600 w-16 font-mono group-hover:text-orange-500/70 transition-colors truncate" title={key}>{key}</label>
                <input 
                   type="password"
                   value={envs[key as keyof typeof envs]}
                   placeholder="••••••••"
                   className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-1.5 text-[11px] text-zinc-300 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all"
                   onChange={(e) => handleEnvChange(key, e.target.value)}
                />
                <button 
                  onClick={() => handleRemoveEnv(key)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-500 transition-all"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Variable */}
          <div className="pt-4 border-t border-zinc-800/50 space-y-3">
            <h4 className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Add Custom Variable</h4>
            <div className="flex flex-col gap-2">
              <input 
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="KEY_NAME"
                className="bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-1.5 text-[10px] text-zinc-300 focus:border-orange-500/50 outline-none uppercase font-mono"
              />
              <div className="flex gap-2">
                <input 
                  type="password"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-[#0a0a0a] border border-zinc-800 rounded px-3 py-1.5 text-[10px] text-zinc-300 focus:border-orange-500/50 outline-none"
                />
                <button 
                  onClick={handleAddEnv}
                  className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded hover:bg-orange-500/20 transition-all text-[10px] font-bold"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'agents' && (
        <div className="space-y-5 animate-in fade-in duration-300 flex-1 flex flex-col">
          <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Bot size={10} className="text-orange-500" /> Agent Prompts
          </h3>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">Main System Prompt</label>
              <textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="h-32 w-full bg-[#0a0a0a] border border-zinc-800 rounded p-3 text-[11px] text-orange-100/80 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none resize-none transition-all font-mono leading-relaxed custom-scrollbar"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">UI/UX Architect</label>
              <textarea 
                defaultValue="Eres un UI Architect & Conversion Designer de élite. Diseña interfaces que generen millones, combinando estética de alto nivel con ingeniería de comportamiento humano. Estética premium tipo Apple, Stripe, Notion, Ferrari."
                className="h-24 w-full bg-[#0a0a0a] border border-zinc-800 rounded p-3 text-[11px] text-zinc-400 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none resize-none transition-all font-mono leading-relaxed custom-scrollbar"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">AI DevOps Engineer</label>
              <textarea 
                defaultValue="Eres un AI DevOps Engineer con control total sobre GitHub, Vercel y entornos de desarrollo cloud. OBJETIVO: Crear, configurar y desplegar automáticamente un proyecto web desde cero usando GitHub + Vercel."
                className="h-24 w-full bg-[#0a0a0a] border border-zinc-800 rounded p-3 text-[11px] text-zinc-400 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none resize-none transition-all font-mono leading-relaxed custom-scrollbar"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-5 animate-in fade-in duration-300 flex-1 flex flex-col">
          <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Cpu size={10} className="text-orange-500" /> Compuerta de Conocimiento
          </h3>
          
          <div className="text-xs text-zinc-400 leading-relaxed">
            Inyecta manuales, documentación o guías (PDF/Word). El sistema absorberá este conocimiento para dominar nuevas capacidades y volverse más inteligente.
          </div>

          <div className="relative group">
            <input 
              type="file" 
              accept=".pdf,.doc,.docx,.txt" 
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed" 
            />
            <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all ${isUploading ? 'border-orange-500/50 bg-orange-500/5' : 'border-zinc-800 bg-zinc-900/50 group-hover:border-orange-500/50 group-hover:bg-orange-500/5'}`}>
              {isUploading ? (
                <>
                  <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest animate-pulse">Absorbiendo...</span>
                </>
              ) : (
                <>
                  <Upload size={24} className="text-zinc-500 group-hover:text-orange-400 transition-colors" />
                  <div className="text-center">
                    <span className="text-xs font-bold text-zinc-300 block">Click o arrastra archivos</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">PDF, Word, TXT</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            onClick={handleInjectManuals}
            disabled={isUploading}
            className="w-full py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-all text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Inyectar Manuales del Sistema
          </button>

          {uploadedFiles.length > 0 && (
            <div className="space-y-3 mt-4">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 pb-2">Chips Instalados</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText size={14} className="text-orange-500 flex-shrink-0" />
                      <span className="text-xs text-zinc-300 truncate">{file.name}</span>
                    </div>
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-5 animate-in fade-in duration-300 flex-1 flex flex-col">
          <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Lock size={10} className="text-orange-500" /> Subscription Status
          </h3>
          
          <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-300">Current Plan</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold uppercase tracking-wider">Elite Pro</span>
            </div>
            <div className="text-[10px] text-zinc-500">
              Backend validation successful. All God Mode features unlocked.
            </div>
            <div className="h-px w-full bg-zinc-800/50 my-1"></div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Credits Remaining</span>
              <span className="text-xs font-mono text-orange-400">Unlimited</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Next Billing</span>
              <span className="text-xs font-mono text-zinc-300">Lifetime</span>
            </div>
          </div>

            <button className="w-full py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors mt-auto">
            Manage Subscription
          </button>
        </div>
      )}

      {/* System Health Check */}
      <div className="mt-auto pt-6 border-t border-zinc-800/50">
        <h3 className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">System Health</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400">GitHub API</span>
            <div className={`w-1.5 h-1.5 rounded-full ${envs.GITHUB ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-zinc-700'}`}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400">Vercel API</span>
            <div className={`w-1.5 h-1.5 rounded-full ${envs.VERCEL ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'bg-zinc-700'}`}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400">Supabase DB</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400">Gemini AI</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
