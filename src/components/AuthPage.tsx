import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Lock, User, Mail, Shield, Crown } from 'lucide-react';

export const AuthPage = ({ onComplete }: { onComplete: (userData: { name: string, email: string }) => void }) => {
  const [step, setStep] = useState(0); // 0: initial, 1: form, 2: processing, 3: success
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setStep(2);
    
    // Simulate processing and authentication
    setTimeout(() => {
      setStep(3);
      setTimeout(() => {
        onComplete({ name, email });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/20 blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.12, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-600/20 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.3)] border border-orange-300/30 mb-8">
                <Crown className="text-black w-10 h-10" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white mb-4">
                ACCESO <span className="text-orange-400">ELITE</span>
              </h1>
              <p className="text-zinc-400 text-sm mb-10 leading-relaxed">
                Estás a punto de ingresar al entorno de desarrollo más avanzado. Identifícate para inicializar tu espacio de trabajo autónomo.
              </p>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-orange-500/50 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                Comenzar Registro <ArrowRight size={16} className="text-orange-500" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top border glow */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
              
              <div className="flex items-center gap-3 mb-8">
                <Shield className="text-orange-500 w-6 h-6" />
                <h2 className="text-xl font-bold text-white tracking-tight">Verificación de Identidad</h2>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold ml-1">Nombre Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={16} className="text-zinc-600" />
                    </div>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-zinc-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="Director / Arquitecto"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold ml-1">Correo Corporativo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={16} className="text-zinc-600" />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#111] border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-zinc-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="ceo@empresa.com"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] mt-8"
                >
                  Autorizar Acceso <Lock size={16} />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-0 rounded-full border-2 border-zinc-800 border-t-orange-500" 
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                  className="absolute inset-2 rounded-full border-2 border-zinc-800 border-b-amber-500" 
                />
                <Lock className="text-orange-500 w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Encriptando Credenciales</h3>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Estableciendo conexión segura...</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center justify-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                >
                  <Shield className="text-green-400 w-10 h-10" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Acceso Concedido</h3>
              <p className="text-green-400/80 text-xs font-mono uppercase tracking-widest">Bienvenido, {name}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
