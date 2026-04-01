import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Recycle, Zap, Sparkles, Brain, ArrowRight, RefreshCw, Folder, Check, BarChart, Hammer } from 'lucide-react';

interface AICapsuleProps {
  onRecycle: (input: string, isProject?: boolean) => Promise<any>;
  onStart?: (plan?: string) => void;
  projects?: any[];
  systemStrength?: number;
  intelligenceCore?: any;
}

export const AICapsule: React.FC<AICapsuleProps> = ({ onRecycle, onStart, projects = [], systemStrength = 0, intelligenceCore }) => {
  const [input, setInput] = useState('');
  const [isRecycling, setIsRecycling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [recycledEssence, setRecycledEssence] = useState<any>(null);

  const handleRecycle = async () => {
    if (!input.trim() && !selectedProject) return;
    setIsRecycling(true);
    setRecycledEssence(null);
    
    const recycleContent = selectedProject 
      ? `PROJECT_DATA: ${JSON.stringify(selectedProject)}` 
      : input;

    const result = await onRecycle(recycleContent, !!selectedProject);
    
    setIsRecycling(false);
    if (result) {
      setRecycledEssence(result);
      setShowResult(true);
      setInput('');
      setSelectedProject(null);
    }
  };

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-[#0a0a0a] border border-zinc-800/50 rounded-3xl p-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="flex flex-col items-center text-center space-y-6">
          {/* System Strength Bar */}
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span className="flex items-center gap-1"><BarChart size={12} /> System Muscle Strength</span>
              <span className="text-orange-500">{systemStrength}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${systemStrength}%` }}
                className="h-full bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              />
            </div>
          </div>

          <div className="relative">
            <motion.div 
              animate={isRecycling ? { rotate: 360 } : {}}
              transition={isRecycling ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
              className={`w-24 h-24 rounded-full flex items-center justify-center border-2 ${isRecycling ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)]' : 'border-zinc-800'} transition-all duration-500`}
            >
              {isRecycling ? (
                <RefreshCw size={40} className="text-orange-500" />
              ) : (
                <Recycle size={40} className="text-zinc-600 group-hover:text-orange-500 transition-colors" />
              )}
            </motion.div>
            
            <AnimatePresence>
              {isRecycling && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute -top-2 -right-2 bg-orange-500 text-black p-1.5 rounded-full shadow-lg"
                >
                  <Sparkles size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">AI Nexus Capsule</h3>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto">
              Deposita proyectos, código o ideas. Nuestra IA los reciclará para alimentar los músculos del sistema.
            </p>
          </div>

          {intelligenceCore && (
            <div className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
              <div className="flex flex-col items-center px-4 border-r border-zinc-800/50">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nivel</span>
                <span className="text-xl font-black text-orange-500">{intelligenceCore.evolutionLevel}</span>
              </div>
              <div className="flex flex-col items-center px-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">IQ Total</span>
                <span className="text-xl font-black text-white">{intelligenceCore.totalIntelligence}</span>
              </div>
            </div>
          )}

          {/* Project Selector */}
          {projects.length > 0 && (
            <div className="w-full space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 text-left">Reciclar Proyecto Existente:</div>
              <div className="flex flex-wrap gap-2">
                {projects.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedProject(selectedProject?.id === p.id ? null : p)}
                    className={`px-3 py-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      selectedProject?.id === p.id 
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                        : 'border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700'
                    }`}
                  >
                    <Folder size={12} />
                    {p.name}
                    {selectedProject?.id === p.id && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="w-full relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedProject ? "Proyecto seleccionado para reciclaje..." : "Pega aquí lo que deseas reciclar..."}
              className={`w-full bg-black/50 border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all resize-none h-32 custom-scrollbar ${selectedProject ? 'opacity-50 pointer-events-none' : ''}`}
              disabled={isRecycling || !!selectedProject}
            />
            
            <AnimatePresence>
              {isRecycling && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center space-y-3"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-2 h-2 rounded-full bg-orange-500"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-500">Sintetizando Inteligencia...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleRecycle}
            disabled={isRecycling || (!input.trim() && !selectedProject)}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest italic flex items-center justify-center gap-3 transition-all duration-500 ${
              isRecycling || (!input.trim() && !selectedProject)
                ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed' 
                : 'bg-orange-500 text-black hover:bg-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]'
            }`}
          >
            {isRecycling ? 'Procesando...' : (
              <>
                <span>{selectedProject ? 'Reciclar Proyecto' : 'Iniciar Reciclaje AI'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <AnimatePresence>
            {showResult && recycledEssence && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-col items-center gap-4 w-full mt-4 bg-zinc-900/80 p-4 rounded-2xl border border-orange-500/30"
              >
                <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                  <Brain size={14} />
                  <span>Inteligencia Absorbida por el Núcleo</span>
                </div>
                
                <div className="text-left w-full space-y-2">
                  <div className="text-xs text-zinc-300">
                    <strong className="text-orange-400">Habilidad:</strong> {recycledEssence.skill?.name || 'Desconocida'}
                  </div>
                  <div className="text-xs text-zinc-400 italic">
                    {recycledEssence.summary}
                  </div>
                </div>

                {onStart && (
                  <button
                    onClick={() => onStart(`Construye un sistema basado en esta esencia reciclada: ${recycledEssence.summary}. Aplica la habilidad: ${recycledEssence.skill?.name}.`)}
                    className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                  >
                    <Hammer size={14} />
                    Construir desde Esencia
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100],
              x: [0, (i - 2) * 20],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-orange-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};
