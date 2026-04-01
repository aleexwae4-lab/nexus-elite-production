import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, TrendingUp, DollarSign, Zap, ArrowRight, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

interface VentureBuilderProps {
  initialIdea?: string;
}

export const VentureBuilder: React.FC<VentureBuilderProps> = ({ initialIdea }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [idea, setIdea] = useState(initialIdea || '');

  useEffect(() => {
    if (initialIdea) {
      setIdea(initialIdea);
      handleAnalyze();
    }
  }, [initialIdea]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate deep analysis
    await new Promise(res => setTimeout(res, 3000));
    
    setReport({
      marketFit: 94,
      scalability: 98,
      valuation: '$2.5M - $5.0M',
      monetization: [
        { strategy: 'Enterprise SaaS (High-Ticket)', potential: 'Extreme', mrr: '$50k - $150k' },
        { strategy: 'AI-as-a-Service API', potential: 'High', mrr: '$15k - $40k' },
        { strategy: 'Strategic Data Licensing', potential: 'Very High', mrr: '$100k+' },
      ],
      roadmap: [
        { phase: 'Phase 1: Domination', goal: 'Capture 15% of the B2B SaaS market in LATAM.' },
        { phase: 'Phase 2: Expansion', goal: 'Global rollout with localized AI models.' },
        { phase: 'Phase 3: Exit/IPO', goal: 'Strategic acquisition by big tech or IPO.' }
      ],
      pivots: [
        'Pivotar hacia un modelo "AI-First" donde la interfaz es secundaria a la automatización.',
        'Integrar con sistemas ERP legacy para modernización instantánea.',
        'Lanzar un fondo de inversión interno para startups que usen nuestra tecnología.'
      ],
      growthHack: 'Viral Loop: Cada usuario que despliega una app genera un "Powered by Nexus" que otorga créditos de cómputo al referente.'
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full w-full bg-[#050505] text-zinc-200 p-6 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Brain className="text-orange-500" size={24} />
              VENTURE BUILDER AI
            </h2>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Strategic Growth & Monetization Engine</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Billionaire Mode Active</span>
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-6 py-2 rounded-full bg-orange-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing Market...' : 'Run Strategic Analysis'}
            </button>
          </div>
        </div>

        {!report && !isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
            <Sparkles size={48} className="text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-sm font-medium">Ready to optimize your business model?</p>
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-2">Click the button above to start the engine</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800" />
            ))}
          </div>
        )}

        <AnimatePresence>
          {report && !isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pb-10"
            >
              {/* Score Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Market Fit</p>
                    <h3 className="text-3xl font-bold text-orange-500">{report.marketFit}%</h3>
                  </div>
                  <Target size={24} className="text-zinc-700" />
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Scalability</p>
                    <h3 className="text-3xl font-bold text-green-500">{report.scalability}%</h3>
                  </div>
                  <TrendingUp size={24} className="text-zinc-700" />
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Valuation</p>
                    <h3 className="text-2xl font-bold text-white tracking-tighter">{report.valuation}</h3>
                  </div>
                  <DollarSign size={24} className="text-zinc-700" />
                </div>
              </div>

              {/* Strategic Roadmap */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <ArrowRight size={16} className="text-orange-500" />
                  Strategic Roadmap
                </h3>
                <div className="space-y-4">
                  {report.roadmap.map((step: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover:border-orange-500/50 group-hover:text-orange-400 transition-colors">
                        0{i+1}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{step.phase}</p>
                        <p className="text-xs text-zinc-300">{step.goal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monetization Strategies */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign size={16} className="text-orange-500" />
                  Monetization Strategies
                </h3>
                <div className="space-y-3">
                  {report.monetization.map((m: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-zinc-800/50 group hover:border-orange-500/30 transition-colors">
                      <div>
                        <p className="text-xs font-bold text-zinc-200">{m.strategy}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Potential: {m.potential}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-orange-400">{m.mrr}</p>
                        <p className="text-[9px] text-zinc-600 uppercase">Est. MRR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Pivots */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-orange-500" />
                  Strategic Pivots
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {report.pivots.map((pivot: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-zinc-800/50">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      <p className="text-xs text-zinc-400 leading-relaxed">{pivot}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Hack */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={80} />
                </div>
                <h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">
                  <Sparkles size={16} />
                  Growth Hack of the Week
                </h3>
                <p className="text-zinc-200 text-sm font-medium relative z-10">{report.growthHack}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
