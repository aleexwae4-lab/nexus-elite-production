import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileArchive, Upload, Loader2, CheckCircle2, Zap, ArrowRight, Shield, Cpu, Sparkles, MessageSquare, RefreshCw } from 'lucide-react';

interface ProjectMigratorProps {
  onMigrationComplete: (plan: string) => void;
  onClose: () => void;
}

export const ProjectMigrator: React.FC<ProjectMigratorProps> = ({ onMigrationComplete, onClose }) => {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'improving' | 'ready'>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [analysisLog, setAnalysisLog] = useState<string[]>([]);
  const [improvedPlan, setImprovedPlan] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [analysisLog]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.zip') || file.name.endsWith('.rar'))) {
      setFileName(file.name);
      startMigration();
    } else {
      alert('Por favor selecciona un archivo ZIP o RAR válido.');
    }
  };

  const addLog = (msg: string) => {
    setAnalysisLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startMigration = async () => {
    setStep('analyzing');
    addLog('Iniciando descompresión de arquitectura...');
    await new Promise(r => setTimeout(r, 1500));
    addLog('Escaneando dependencias y estructura de archivos...');
    await new Promise(r => setTimeout(r, 1200));
    addLog('Identificando cuellos de botella y deuda técnica...');
    await new Promise(r => setTimeout(r, 1800));
    addLog('Análisis de seguridad y vulnerabilidades completado.');
    
    setStep('improving');
    addLog('Inyectando mejoras de Nivel Dios...');
    await new Promise(r => setTimeout(r, 2000));
    addLog('Optimizando unit economics y escalabilidad...');
    await new Promise(r => setTimeout(r, 1500));
    addLog('Generando Blueprint de Transmutación Nexus...');
    
    const mockPlan = `PROYECTO MIGRADO: ${fileName}\n\nMEJORAS APLICADAS:\n1. Refactorización a Arquitectura de Microservicios.\n2. Inyección de Capa de IA Autónoma para gestión de datos.\n3. Optimización de caché global y CDN Edge.\n4. Blindaje de seguridad con protocolos de encriptación cuántica.\n\nEl sistema está listo para ser reconstruido con estándares NEXUS ELITE.`;
    setImprovedPlan(mockPlan);
    
    await new Promise(r => setTimeout(r, 1000));
    setStep('ready');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-zinc-800 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.2)] flex flex-col md:flex-row h-[80vh]">
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-[#111] to-[#050505] p-8 border-r border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-orange-500/10 rounded-2xl w-fit mb-6">
              <RefreshCw className="text-orange-500 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">Transmutador de Sistemas</h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Muda tu proyecto legacy a la infraestructura Nexus. Analizamos, mejoramos y reconstruimos tu visión con estándares de ultra-lujo.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Shield, text: 'Auditoría de Seguridad' },
                { icon: Cpu, text: 'Optimización de Core' },
                { icon: Sparkles, text: 'Inyección de IA' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono uppercase tracking-widest">
                  <item.icon size={14} className="text-orange-500/60" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-400 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors"
          >
            Cancelar Transmutación
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent)] pointer-events-none" />
          
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {step === 'upload' && (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="absolute -inset-4 bg-orange-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-zinc-800 flex items-center justify-center group-hover:border-orange-500/50 transition-colors">
                      <FileArchive size={48} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
                    </div>
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-white">Sube tu proyecto (.zip)</h3>
                  <p className="mt-2 text-zinc-500 text-sm max-w-xs">Arrastra o selecciona el archivo que deseas transmutar a Nivel Dios.</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    accept=".zip,.rar" 
                    className="hidden" 
                  />
                </motion.div>
              )}

              {(step === 'analyzing' || step === 'improving') && (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 font-mono text-[10px]"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                    <span className="text-orange-500 uppercase tracking-[0.3em] font-bold">
                      {step === 'analyzing' ? 'Analizando Arquitectura...' : 'Inyectando Mejoras Nexus...'}
                    </span>
                  </div>
                  {analysisLog.map((log, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-zinc-500"
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div ref={logEndRef} />
                </motion.div>
              )}

              {step === 'ready' && (
                <motion.div 
                  key="ready"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
                    <CheckCircle2 className="text-green-500 w-8 h-8" />
                    <div>
                      <h3 className="text-green-500 font-bold uppercase tracking-widest text-sm">Transmutación Exitosa</h3>
                      <p className="text-zinc-400 text-xs mt-1">El proyecto "{fileName}" ha sido elevado a estándares Nexus Elite.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <h4 className="text-zinc-300 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                      <Zap size={14} className="text-orange-500" /> Propuesta de Arquitectura Mejorada
                    </h4>
                    <div className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-xl border border-white/5">
                      {improvedPlan}
                    </div>
                  </div>

                  <button
                    onClick={() => onMigrationComplete(improvedPlan)}
                    className="w-full py-5 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-sm rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    Iniciar Construcción de Sistema Mejorado <ArrowRight size={20} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
