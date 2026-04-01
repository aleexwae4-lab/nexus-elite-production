import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, Zap, Database, Send, LayoutPanelLeft, Brain, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VentureBuilder } from './VentureBuilder';

const data = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 9800, users: 2000 },
  { name: 'Apr', revenue: 3908, users: 2780 },
  { name: 'May', revenue: 4800, users: 1890 },
  { name: 'Jun', revenue: 13800, users: 4390 },
];

const initialLeads = [
  { id: 1, name: 'Carlos Mendoza', email: 'carlos@techcorp.mx', status: 'New', source: 'Cold DM Instagram' },
  { id: 2, name: 'Ana Silva', email: 'ana@creative.co', status: 'Contacted', source: 'LinkedIn Outreach' },
  { id: 3, name: 'Roberto Gómez', email: 'roberto@startup.io', status: 'Follow-up', source: 'Cold DM Instagram' },
  { id: 4, name: 'Laura Torres', email: 'laura@agency.net', status: 'Closed', source: 'Referral' },
];

const GrowthEngine = ({ onNewLead }: { onNewLead: (lead: any) => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            const names = ['Sofia Ruiz', 'Miguel Angel', 'Elena P.', 'David L.'];
            const domains = ['gmail.com', 'outlook.com', 'company.mx', 'startup.io'];
            const sources = ['Twitter Ads', 'Google Search', 'FB Group', 'Direct'];
            
            onNewLead({
              id: Date.now(),
              name: names[Math.floor(Math.random() * names.length)],
              email: `user${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`,
              status: 'New',
              source: sources[Math.floor(Math.random() * sources.length)]
            });
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isActive, onNewLead]);

  return (
    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-orange-500/20 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={18} className={isActive ? "text-orange-500 animate-pulse" : "text-zinc-600"} />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">AI Growth Engine</h3>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
            isActive ? 'bg-red-500/10 text-red-500 border border-red-500/30' : 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]'
          }`}
        >
          {isActive ? 'Stop Engine' : 'Start Autonomous Growth'}
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] text-zinc-500 uppercase font-bold tracking-widest">
          <span>{isActive ? 'Scanning Market...' : 'Engine Idle'}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-[#1a1a1a] border border-[#1f1f1f] p-6 rounded-2xl shadow-xl flex items-center justify-between">
    <div>
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-zinc-100">{value}</h3>
      <p className="text-orange-500 text-xs mt-1">{trend}</p>
    </div>
    <div className="p-3 bg-orange-500/10 rounded-xl">
      <Icon className="text-orange-500" size={24} />
    </div>
  </div>
);

const SystemHealth = () => (
  <div className="bg-[#1a1a1a] border border-[#1f1f1f] p-6 rounded-2xl shadow-xl">
    <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
      <ShieldCheck size={20} className="text-green-500" />
      System Health & AI Integrity
    </h2>
    <div className="space-y-4">
      {[
        { label: 'AI Accuracy', value: '99.4%', icon: Brain, color: 'text-blue-400' },
        { label: 'Server Load', value: '12%', icon: Activity, color: 'text-green-400' },
        { label: 'Neural Throughput', value: '8.4 GB/s', icon: Cpu, color: 'text-purple-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800 ${item.color}`}>
              <item.icon size={16} />
            </div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.label}</span>
          </div>
          <span className="text-sm font-bold text-zinc-200">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Dashboard = ({ initialIdea }: { initialIdea?: string }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'venture'>(initialIdea ? 'venture' : 'metrics');
  const [leads, setLeads] = useState(initialLeads);
  const [isFollowingUp, setIsFollowingUp] = useState(false);

  useEffect(() => {
    if (initialIdea) {
      setActiveTab('venture');
    }
  }, [initialIdea]);

  const handleAutoFollowUp = () => {
    setIsFollowingUp(true);
    setTimeout(() => {
      setLeads(leads.map(lead => 
        lead.status === 'New' || lead.status === 'Contacted' ? { ...lead, status: 'Follow-up' } : lead
      ));
      setIsFollowingUp(false);
    }, 2000);
  };

  const handleNewLead = (lead: any) => {
    setLeads(prev => [lead, ...prev].slice(0, 15));
  };

  return (
    <div className="h-full flex flex-col bg-[#050505]">
      {/* Dashboard Tabs */}
      <div className="flex items-center gap-1 p-2 border-b border-zinc-800/80 bg-[#0a0a0a]">
        <button 
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === 'metrics' ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <LayoutPanelLeft size={14} />
          Performance Metrics
        </button>
        <button 
          onClick={() => setActiveTab('venture')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === 'venture' ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Brain size={14} />
          Venture Builder AI
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'metrics' ? (
            <motion.div 
              key="metrics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full p-6 space-y-6 overflow-y-auto custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Revenue" value="$128,430" icon={DollarSign} trend="+12.5% vs last month" />
                <KpiCard title="Active Users" value="24,892" icon={Users} trend="+8.2% vs last month" />
                <KpiCard title="Conversion Rate" value="4.8%" icon={TrendingUp} trend="+1.1% vs last month" />
                <KpiCard title="Avg. Response Time" value="120ms" icon={Zap} trend="-5ms vs last month" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-[#1a1a1a] border border-[#1f1f1f] p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-bold text-zinc-100 mb-6">Revenue Growth</h2>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="name" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }} />
                          <Area type="monotone" dataKey="revenue" stroke="#f97316" fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <GrowthEngine onNewLead={handleNewLead} />
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <SystemHealth />
                  
                  <div className="bg-[#1a1a1a] border border-[#1f1f1f] p-6 rounded-2xl shadow-xl flex flex-col h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                        <Database size={20} className="text-orange-500" />
                        Lead Database
                      </h2>
                      <button 
                        onClick={handleAutoFollowUp}
                        disabled={isFollowingUp}
                        className="px-3 py-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isFollowingUp ? <Zap size={14} className="animate-pulse" /> : <Send size={14} />}
                        Auto Follow-up
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                      <div className="space-y-3">
                        {leads.map(lead => (
                          <div key={lead.id} className="p-3 bg-[#0a0a0a] border border-zinc-800/50 rounded-xl hover:border-orange-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-zinc-200 text-sm">{lead.name}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                                lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                lead.status === 'Follow-up' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                'bg-green-500/10 text-green-400 border border-green-500/20'
                              }`}>
                                {lead.status}
                              </span>
                            </div>
                            <div className="text-xs text-zinc-500 mb-2">{lead.email}</div>
                            <div className="text-[10px] text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                              {lead.source}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="venture"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <VentureBuilder initialIdea={initialIdea} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
