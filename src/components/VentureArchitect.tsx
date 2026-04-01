import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Zap, Loader2, ArrowRight } from 'lucide-react';

export const VentureArchitect = ({ onPlanReady }: { onPlanReady: (plan: string) => void }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Dame tu problema, necesidad, negocio, proyecto o sistema a detalle.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Sintetizando Arquitectura');
  const [loadingLog, setLoadingLog] = useState('Nexus_Core_Active');
  const [planReady, setPlanReady] = useState(false);
  const [finalPlan, setFinalPlan] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    'Sintetizando Arquitectura',
    'Construyendo Estructuras de Élite',
    'Instruyendo Protocolos Nexus',
    'Atendiendo Necesidades del Director',
    'Analizando Viabilidad Multimillonaria',
    'Optimizando Capas de Conversión',
    'Alineando Visión Empresarial'
  ];

  const loadingLogs = [
    'Nexus_Core_Active',
    'Decrypting_Vision_Stream',
    'Allocating_Quantum_Resources',
    'Mapping_Market_Dynamics',
    'Synthesizing_SaaS_Blueprint',
    'Validating_Economic_Pain',
    'Scaling_Architecture_v4',
    'Finalizing_Elite_Protocol'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let logInterval: NodeJS.Timeout;
    if (isLoading) {
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[i]);
      }, 2500);

      let j = 0;
      logInterval = setInterval(() => {
        j = (j + 1) % loadingLogs.length;
        setLoadingLog(loadingLogs[j]);
      }, 1200);
    }
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          systemPrompt: `Eres el Arquitecto de Sistemas Nexus Elite (Nivel Dios). 
Tu objetivo es extraer la idea de negocio o sistema del usuario. 
Haz preguntas incisivas (1 o 2 máximo) sobre el modelo de negocio, la monetización o el público objetivo si la idea es vaga. 
Si la idea ya está clara o después de un par de interacciones, elabora un plan técnico y de negocio estructurado.
CUANDO EL PLAN ESTÉ LISTO, debes terminar tu mensaje EXACTAMENTE con esta frase: "Tengo tu plan elaborado. ¿Deseas ingresar al constructor? [INICIAR_FORJA]"`
        })
      });

      const data = await response.json();
      if (data.success) {
        const aiResponse = data.output;
        setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
        
        if (aiResponse.includes('[INICIAR_FORJA]')) {
          setPlanReady(true);
          setFinalPlan(aiResponse.replace('[INICIAR_FORJA]', '').trim());
        }
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'Error de conexión con el núcleo. Reintentando...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative group">
      {/* Ultra Neon Aura */}
      <div className="absolute -inset-4 bg-gradient-to-r from-orange-600/10 via-amber-500/5 to-orange-600/10 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[2.2rem] blur-md opacity-0 group-hover:opacity-100 transition duration-700"></div>
      
      <div className="relative bg-[#030303] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

        {/* Header: Command Center Style */}
        <div className="p-6 bg-gradient-to-b from-[#0a0a0a] to-transparent border-b border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-3 bg-orange-500/20 rounded-full blur-xl"
              />
              <div className="relative p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Bot size={24} className="drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-black tracking-[0.25em] uppercase text-sm italic flex items-center gap-2">
                Venture Architect
                <motion.span 
                  animate={{ 
                    opacity: isLoading ? [1, 0.4, 1] : [1, 0.4, 1],
                    backgroundColor: isLoading ? ['rgba(249,115,22,0.2)', 'rgba(249,115,22,0.6)', 'rgba(249,115,22,0.2)'] : 'rgba(249,115,22,0.2)'
                  }}
                  transition={{ duration: isLoading ? 0.5 : 0.1, repeat: Infinity, repeatDelay: isLoading ? 0 : 3 }}
                  className="text-[8px] bg-orange-500/20 text-orange-500 px-1.5 py-0.5 rounded border border-orange-500/30"
                >
                  {isLoading ? 'PROCESSING' : 'LIVE'}
                </motion.span>
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-0.5 bg-orange-500/60 rounded-full"
                    />
                  ))}
                </div>
                <p className="text-orange-500/60 text-[9px] uppercase tracking-[0.3em] font-bold">Sincronización Neuronal</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-zinc-600 text-[8px] uppercase tracking-widest mb-1 font-mono">Core_Temp: 32°C</p>
              <div className="w-24 h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  animate={{ width: ['40%', '95%', '70%', '100%', '80%'] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-orange-600 to-amber-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Body with Background Pattern */}
        <div className="h-[480px] overflow-y-auto p-8 space-y-8 custom-scrollbar relative">
          {/* Neural Network Background Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <radialGradient id="neural-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.1)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#neural-grad)" />
              {[...Array(15)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={Math.random() * 100}
                  cy={Math.random() * 100}
                  r="0.2"
                  fill="rgba(249,115,22,0.5)"
                  animate={{ 
                    opacity: isLoading ? [0.4, 1, 0.4] : [0.2, 0.8, 0.2],
                    scale: isLoading ? [1, 2, 1] : [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: isLoading ? 1 : 2 + Math.random() * 3, 
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </svg>
          </div>
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none" />

          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 30 : -30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`relative group/msg max-w-[85%] p-6 rounded-3xl text-sm leading-relaxed transition-all duration-500 ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 text-orange-50 shadow-[0_0_30px_rgba(249,115,22,0.1)] rounded-tr-none' 
                  : 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 text-zinc-200 rounded-tl-none shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="absolute -top-3 -left-3 p-2 bg-[#050505] border border-orange-500/30 rounded-xl text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                    <Zap size={12} className="fill-current" />
                  </div>
                )}
                
                <div className={msg.role === 'assistant' ? 'drop-shadow-[0_0_1px_rgba(255,255,255,0.3)]' : ''}>
                  {msg.content.replace('[INICIAR_FORJA]', '')}
                </div>
                
                {/* Message Timestamp/Status */}
                <div className={`mt-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] opacity-40 font-mono ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="w-1 h-1 rounded-full bg-orange-500/50" />
                  {msg.role === 'user' ? 'Uplink_Secure • 256bit' : 'Nexus_Response • Verified'}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-orange-500/0 group-hover/msg:bg-orange-500/[0.02] transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-orange-500/20 p-6 rounded-3xl rounded-tl-none flex items-center gap-5 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                <div className="relative">
                  <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-orange-500/40 blur-lg rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={loadingText}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-orange-500 text-[11px] font-black uppercase tracking-[0.4em] italic"
                    >
                      {loadingText}
                    </motion.span>
                  </AnimatePresence>
                  <div className="flex items-center gap-2 mt-1.5">
                    <motion.div 
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-[1px] w-12 bg-orange-500/30"
                    />
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={loadingLog}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-zinc-600 text-[8px] uppercase tracking-widest font-mono"
                      >
                        {loadingLog}...
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer / Input Area */}
        <div className="p-8 bg-gradient-to-t from-[#050505] to-transparent border-t border-white/5 relative z-10">
          {planReady ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-green-500/50" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[11px] text-green-500 font-black uppercase tracking-[0.4em]">Arquitectura Validada</span>
                </div>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-green-500/50" />
              </div>
              
              <button
                onClick={() => onPlanReady(finalPlan)}
                className="group relative w-full py-6 bg-orange-500 text-black font-black uppercase tracking-[0.4em] text-sm rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_50px_rgba(249,115,22,0.4)] flex items-center justify-center gap-5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Zap size={24} className="fill-current" />
                Ingresar al Constructor de Élite
                <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative group/input">
              {/* Ultra Input Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 to-amber-500/20 rounded-[1.5rem] blur opacity-0 group-focus-within/input:opacity-100 transition duration-700"></div>
              
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe tu visión empresarial..."
                  className="w-full bg-[#080808] border border-white/10 rounded-2xl py-6 pl-8 pr-20 text-white placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/50 transition-all text-sm font-light tracking-widest shadow-inner"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-4 p-4 bg-orange-500 text-black rounded-xl hover:bg-orange-400 disabled:opacity-20 disabled:grayscale transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] active:scale-90"
                >
                  <Send size={22} />
                </button>
              </div>
              
              <div className="mt-5 flex items-center justify-between px-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,1)]" />
                    <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-bold">Protocolo_Nexus_v4.2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    <span className="text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-bold">Encrypted_Uplink</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] text-orange-500/60 font-mono uppercase tracking-widest"
                  >
                    System_Ready
                  </motion.div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Scanning Line Effect (Subtle) */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent z-0 pointer-events-none"
        />
      </div>
    </div>
  );
};
