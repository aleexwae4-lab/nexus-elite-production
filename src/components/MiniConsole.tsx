import React, { useState } from 'react';
import { Terminal, Lightbulb, AlertTriangle, Activity, Zap, CheckCircle2, Info, ArrowRight, BarChart3 } from 'lucide-react';

interface MiniConsoleProps {
  onSuggestionSelect: (suggestion: string) => void;
}

export const MiniConsole: React.FC<MiniConsoleProps> = ({ onSuggestionSelect }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'suggestions' | 'analyzer' | 'report' | 'automation'>('specs');

  // Mock data for demonstration
  const specs = [
    { label: 'Architecture', value: 'Autonomous SaaS Forge v4.0' },
    { label: 'Execution Engine', value: 'Nexus God-Mode (Full Control)' },
    { label: 'AI Recycling', value: 'Nexus Capsule v1.0 (Active)' },
    { label: 'Context Memory', value: '128K Tokens (Refined)' },
    { label: 'Processing Speed', value: 'Ultra-Low Latency (Edge)' },
    { label: 'Design System', value: 'Ultra-Premium Luxury Aesthetic' },
  ];

  const automationLogs = [
    { time: '15:43:15', action: 'Initializing Autonomous SaaS Forge Core...', status: 'COMPLETED' },
    { time: '15:43:20', action: 'Syncing with GitHub & Vercel APIs.', status: 'COMPLETED' },
    { time: '15:43:25', action: 'Calibrating Luxury Design Engine.', status: 'ACTIVE' },
    { time: '15:43:30', action: 'Scanning for revenue optimization opportunities.', status: 'PENDING' },
    { time: '15:43:35', action: 'Ready for full-scale SaaS construction.', status: 'ACTIVE' },
  ];

  const suggestions = [
    "Generar Landing Page de lujo con animaciones Framer Motion.",
    "Construir Dashboard analítico con gráficos D3.js.",
    "Configurar integración completa con Stripe para cobros.",
    "Implementar sistema de autenticación con Supabase.",
    "Desplegar actualización crítica a producción vía GitHub."
  ];

  const issues = [
    { type: 'success', msg: 'Sincronización con GitHub Core establecida.' },
    { type: 'info', msg: 'Motor de crecimiento (Growth Engine) operando al 85% de capacidad.' },
    { type: 'warning', msg: 'Latencia detectada en región us-east-1. Optimizando ruteo.' },
    { type: 'success', msg: 'Build estable. Todos los sistemas nominales.' }
  ];

  const reportData = [
    { label: 'MRR Proyectado', value: '$12,450 USD', trend: '+15%' },
    { label: 'Memory Usage', value: '12% / 128K', trend: 'Optimized' },
    { label: 'Build Speed', value: '1.2s', trend: '-0.3s' },
    { label: 'System Uptime', value: '99.99%', trend: 'Stable' },
  ];

  return (
    <div className="h-full flex flex-col text-zinc-300 font-mono text-xs bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent blur-sm" />

      {/* Header / Tabs */}
      <div className="flex items-center border-b border-zinc-800/80 bg-[#0a0a0a] px-2 pt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 text-zinc-500 border-r border-zinc-800/80 mr-2">
          <Terminal size={14} className="text-orange-500/70" />
          <span className="font-bold tracking-widest text-[10px] uppercase">Nexus_Console</span>
        </div>
        
        <button 
          onClick={() => setActiveTab('specs')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300 ${activeTab === 'specs' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
        >
          <Activity size={14} />
          <span className="uppercase tracking-wider text-[10px] font-semibold">Specs</span>
        </button>
        <button 
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300 ${activeTab === 'report' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
        >
          <BarChart3 size={14} />
          <span className="uppercase tracking-wider text-[10px] font-semibold">Reporte</span>
        </button>
        <button 
          onClick={() => setActiveTab('automation')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300 ${activeTab === 'automation' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
        >
          <Zap size={14} />
          <span className="uppercase tracking-wider text-[10px] font-semibold">Automation</span>
        </button>
        <button 
          onClick={() => setActiveTab('suggestions')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300 ${activeTab === 'suggestions' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
        >
          <Lightbulb size={14} />
          <span className="uppercase tracking-wider text-[10px] font-semibold">Sugerencias</span>
        </button>
        <button 
          onClick={() => setActiveTab('analyzer')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300 ${activeTab === 'analyzer' ? 'border-orange-500 text-orange-400 bg-orange-500/10' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'}`}
        >
          <AlertTriangle size={14} />
          <span className="uppercase tracking-wider text-[10px] font-semibold">Analizador</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specs.map((spec, i) => (
              <div key={i} className="flex flex-col gap-1.5 p-3 rounded-lg border border-zinc-800/60 bg-[#0a0a0a] shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-zinc-500 text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-500/50" />
                  {spec.label}
                </span>
                <span className="text-zinc-200 font-medium text-xs">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'report' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reportData.map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5 p-3 rounded-lg border border-orange-500/10 bg-orange-500/5 shadow-inner relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-[9px] uppercase tracking-widest font-semibold">{item.label}</span>
                  <span className={`text-[9px] font-bold ${item.trend.startsWith('+') ? 'text-green-400' : 'text-zinc-400'}`}>{item.trend}</span>
                </div>
                <span className="text-orange-400 font-bold text-lg tracking-tighter">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="flex flex-col gap-2">
            {automationLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded border border-zinc-800/40 bg-[#080808] group hover:border-orange-500/20 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-[10px] font-mono">{log.time}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    log.status === 'COMPLETED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                    log.status === 'ACTIVE' ? 'bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]' :
                    'bg-zinc-600'
                  }`} />
                  <span className="text-zinc-300 text-[11px]">{log.action}</span>
                </div>
                <span className={`text-[9px] font-bold tracking-tighter ${
                  log.status === 'COMPLETED' ? 'text-green-500/70' :
                  log.status === 'ACTIVE' ? 'text-orange-500/70' :
                  'text-zinc-600'
                }`}>{log.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="flex flex-col gap-3">
            {suggestions.map((sug, i) => (
              <div key={i} className="group flex items-center justify-between gap-4 p-3 rounded-lg border border-zinc-800/60 bg-[#0a0a0a] hover:border-orange-500/40 hover:bg-orange-500/5 hover:shadow-[0_0_15px_rgba(249,115,22,0.05)] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    <Lightbulb size={12} />
                  </div>
                  <span className="text-zinc-300 leading-relaxed text-xs">{sug}</span>
                </div>
                <button 
                  onClick={() => onSuggestionSelect(sug)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 hover:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                >
                  <Zap size={12} />
                  <span className="font-bold tracking-wider text-[10px] uppercase">Implementar</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div className="flex flex-col gap-3">
            {issues.map((issue, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border relative overflow-hidden ${
                issue.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-200/90' :
                issue.type === 'success' ? 'border-green-500/30 bg-green-500/5 text-green-200/90' :
                'border-blue-500/30 bg-blue-500/5 text-blue-200/90'
              }`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  issue.type === 'warning' ? 'bg-yellow-500/50' :
                  issue.type === 'success' ? 'bg-green-500/50' :
                  'bg-blue-500/50'
                }`} />
                <div className="mt-0.5 ml-1">
                  {issue.type === 'warning' ? <AlertTriangle size={14} className="text-yellow-500" /> :
                   issue.type === 'success' ? <CheckCircle2 size={14} className="text-green-500" /> :
                   <Info size={14} className="text-blue-500" />}
                </div>
                <span className="leading-relaxed text-xs">{issue.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
