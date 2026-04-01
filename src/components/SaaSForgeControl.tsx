import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, ShieldCheck, Zap, BarChart3, Users, 
  DollarSign, Globe, Github, Database, Cpu, 
  Activity, LayoutPanelLeft, Layers, Workflow,
  CheckCircle2, AlertCircle, Terminal, Play,
  Settings, Crown, Sparkles, TrendingUp, Target
} from 'lucide-react';

interface SaaSForgeControlProps {
  projects: any[];
  onSelectProject: (project: any) => void;
  onDeploy: () => void;
}

export const SaaSForgeControl: React.FC<SaaSForgeControlProps> = ({ projects, onSelectProject, onDeploy }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'forge' | 'security'>('overview');
  const [forgeStatus, setForgeStatus] = useState<'idle' | 'analyzing' | 'building' | 'deploying'>('idle');
  const [progress, setProgress] = useState(0);

  // Simulated metrics
  const metrics = {
    totalMrr: '$12,450',
    activeSaaS: projects.filter(p => p.status === 'deployed').length,
    totalLeads: 1240,
    conversionRate: '4.2%'
  };

  return (
    <div className="h-full w-full bg-[#050505] text-zinc-200 flex flex-col overflow-hidden">
      {/* HEADER / TABS */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-[#0a0a0a]/50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Crown className="text-orange-500" size={20} />
            <h2 className="text-lg font-bold text-white tracking-tighter uppercase">Nexus Command Center</h2>
          </div>
          
          <nav className="flex items-center gap-1">
            {[
              { id: 'overview', name: 'Overview', icon: LayoutPanelLeft },
              { id: 'forge', name: 'SaaS Forge', icon: Rocket },
              { id: 'security', name: 'Security & RLS', icon: ShieldCheck },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <tab.icon size={14} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">Autonomous Core Online</span>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* KPI GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Portfolio MRR', value: metrics.totalMrr, icon: DollarSign, color: 'text-green-500' },
                  { label: 'Active SaaS', value: metrics.activeSaaS, icon: Rocket, color: 'text-orange-500' },
                  { label: 'Total Leads', value: metrics.totalLeads, icon: Users, color: 'text-blue-500' },
                  { label: 'Avg. Conversion', value: metrics.conversionRate, icon: TrendingUp, color: 'text-purple-500' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{kpi.label}</span>
                      <kpi.icon size={16} className={kpi.color} />
                    </div>
                    <div className="text-2xl font-bold text-white">{kpi.value}</div>
                  </div>
                ))}
              </div>

              {/* ACTIVE PROJECTS & FORGE STATUS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Layers size={16} className="text-orange-500" />
                        Active SaaS Portfolio
                      </h3>
                      <button className="text-[10px] font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest">View All</button>
                    </div>
                    
                    <div className="space-y-3">
                      {projects.length === 0 ? (
                        <div className="py-10 text-center text-zinc-600 text-xs uppercase tracking-widest">No active projects in portfolio</div>
                      ) : (
                        projects.map(p => (
                          <div key={p.id} className="p-4 bg-black/40 border border-zinc-800/50 rounded-xl flex items-center justify-between group hover:border-orange-500/30 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                                p.status === 'deployed' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-orange-500/10 border-orange-500/30 text-orange-500'
                              }`}>
                                <Globe size={20} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-zinc-200">{p.name}</h4>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{p.status === 'deployed' ? 'Live & Generating Revenue' : 'Drafting Architecture'}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right mr-4">
                                <p className="text-xs font-bold text-white">$1,200</p>
                                <p className="text-[9px] text-zinc-600 uppercase">Est. MRR</p>
                              </div>
                              <button 
                                onClick={() => onSelectProject(p)}
                                className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-black transition-all"
                              >
                                <Settings size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* FORGE ENGINE STATUS */}
                  <div className="bg-gradient-to-br from-zinc-900 to-black border border-orange-500/20 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                      <Workflow size={120} />
                    </div>
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                          <Zap size={16} className="text-orange-500" />
                          Autonomous SaaS Forge
                        </h3>
                        <p className="text-[10px] text-zinc-500 mt-1">Status: {forgeStatus.toUpperCase()}</p>
                      </div>
                      <button 
                        onClick={onDeploy}
                        className="px-6 py-2 rounded-full bg-orange-500 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                      >
                        Trigger New Forge
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 relative z-10">
                      {[
                        { label: 'Market Validation', icon: BarChart3, status: 'completed' },
                        { label: 'Architecture', icon: Layers, status: 'completed' },
                        { label: 'Code Generation', icon: Cpu, status: 'active' },
                        { label: 'Global Deploy', icon: Globe, status: 'pending' },
                      ].map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                            step.status === 'completed' ? 'bg-green-500/10 border-green-500/50 text-green-500' :
                            step.status === 'active' ? 'bg-orange-500/10 border-orange-500/50 text-orange-500 animate-pulse' :
                            'bg-zinc-800/50 border-zinc-700 text-zinc-600'
                          }`}>
                            <step.icon size={18} />
                          </div>
                          <span className={`text-[9px] font-bold uppercase tracking-tighter text-center ${
                            step.status === 'active' ? 'text-orange-400' : 'text-zinc-500'
                          }`}>{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  {/* SYSTEM HEALTH */}
                  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Activity size={16} className="text-green-500" />
                      Forge Integrity
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'AI Accuracy', value: '99.8%', progress: 99 },
                        { label: 'Deploy Success', value: '100%', progress: 100 },
                        { label: 'Security RLS', value: 'Verified', progress: 100 },
                        { label: 'MRR Potential', value: '$250k+', progress: 85 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                            <span className="text-zinc-500">{item.label}</span>
                            <span className="text-zinc-300">{item.value}</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]" 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RECENT ACTIVITY LOG */}
                  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col h-[350px]">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal size={16} className="text-zinc-500" />
                      Forge Logs
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                      {[
                        { time: '14:22', msg: 'Market validation for "LeadDM AI" completed.', type: 'success' },
                        { time: '14:21', msg: 'Analyzing pain points in Instagram DMs...', type: 'info' },
                        { time: '14:15', msg: 'New SaaS Forge initiated by CEO.', type: 'info' },
                        { time: '13:50', msg: 'Security audit for "Nexus Core" passed.', type: 'success' },
                        { time: '13:45', msg: 'Vercel deployment successful.', type: 'success' },
                      ].map((log, i) => (
                        <div key={i} className="text-[10px] font-mono leading-tight flex gap-2">
                          <span className="text-zinc-600">[{log.time}]</span>
                          <span className={log.type === 'success' ? 'text-green-500' : 'text-zinc-400'}>{log.msg}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'forge' && (
            <motion.div
              key="forge"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full space-y-6"
            >
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl text-center space-y-6">
                <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                  <Sparkles className="text-orange-500" size={40} />
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-white tracking-tighter">Autonomous SaaS Forge v2</h3>
                  <p className="text-zinc-500 text-sm mt-2">
                    Our AI engine is ready to build your next multi-million dollar venture. 
                    Just describe the pain point, and we'll handle the rest.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                  {[
                    { title: 'Pain Criteria', desc: 'Saves time or generates money.', icon: Target },
                    { title: 'Unit Economics', desc: 'Targeting $19-$99/mo per user.', icon: DollarSign },
                    { title: 'Distribution', icon: Globe, desc: 'Automated Cold Outreach.' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-black/40 border border-zinc-800 rounded-2xl text-left">
                      <item.icon size={20} className="text-orange-500 mb-2" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onDeploy}
                  className="px-10 py-4 rounded-2xl bg-orange-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-orange-400 transition-all shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center gap-3 mx-auto"
                >
                  <Rocket size={18} />
                  Launch Autonomous Forge
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-500" />
                    Row Level Security (RLS)
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    All SaaS projects deployed via Nexus Forge are automatically protected with Supabase RLS. 
                    Users can only access their own data, ensuring total multi-tenant security.
                  </p>
                  <div className="p-4 bg-black/60 rounded-xl border border-zinc-800 font-mono text-[10px] text-zinc-400">
                    <code>
                      create policy "user owns data" on leads <br/>
                      for all using (auth.uid() = user_id);
                    </code>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Zap size={16} className="text-orange-500" />
                    Rate Limiting & Sanitization
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Integrated Zod schemas and IP-based rate limiting prevent API abuse and ensure data integrity.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">Zod Validation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">Middleware Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
