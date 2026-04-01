import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Zap, Shield, Cpu, Globe, Crown, BookOpen, Code2, LineChart, Layers, Terminal, Recycle, HardDrive, RefreshCw, Sparkles, Hammer, User } from 'lucide-react';
import { AICapsule } from './AICapsule';
import { VentureArchitect } from './VentureArchitect';
import { ProjectMigrator } from './ProjectMigrator';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const TechSeal = () => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="flex flex-col items-center justify-center mb-12 relative group cursor-default"
  >
    <div className="absolute inset-0 bg-orange-500/10 blur-[50px] rounded-full group-hover:bg-orange-500/20 transition-all duration-700" />
    <div className="relative w-24 h-24 rounded-full border border-orange-500/30 bg-[#050505] flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.15)]">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t-2 border-orange-500 opacity-80" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute inset-2 rounded-full border-b-2 border-amber-500/50" />
      <motion.div animate={{ rotate: 180 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border-l border-orange-400/30 border-dashed" />
      <Crown className="text-orange-400 w-8 h-8 z-10 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
    </div>
    <div className="mt-6 flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] text-orange-500/80 uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_5px_rgba(249,115,22,1)]" />
      Sello de Autenticidad • Verificado
      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_5px_rgba(249,115,22,1)]" />
    </div>
  </motion.div>
);

const ExampleCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    variants={itemVariants}
    className="flex items-start gap-4 p-5 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 hover:border-orange-500/30 transition-all group"
  >
    <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(249,115,22,0.1)]">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-zinc-200 font-bold mb-1.5 text-sm">{title}</h4>
      <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const EngineAnimation = () => (
  <div className="flex flex-col items-center justify-center my-32">
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
        className="absolute inset-0 rounded-full border-4 border-zinc-800 border-t-orange-500 border-b-orange-500 opacity-50" 
      />
      {/* Middle counter-rotating ring */}
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }} 
        className="absolute inset-4 rounded-full border-2 border-zinc-700 border-l-amber-500 border-r-amber-500 opacity-70" 
      />
      {/* Inner pulsing core */}
      <motion.div 
        animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute inset-12 rounded-full bg-orange-500/20 blur-md" 
      />
      {/* Center Icon */}
      <Cpu className="w-12 h-12 text-orange-400 z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
      
      {/* Code simulation particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [0, -60 + Math.random() * -40], 
            x: [0, (Math.random() - 0.5) * 100],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 2 + Math.random(), 
            repeat: Infinity, 
            delay: i * 0.4,
            ease: "easeOut"
          }}
          className="absolute text-orange-500/60 font-mono text-[10px] font-bold z-20"
        >
          {['{ }', '</>', '=>', '[]', '()', ';;'][i]}
        </motion.div>
      ))}
    </div>
    <div className="mt-8 text-center">
      <p className="text-orange-500/80 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
        Motor de Forja Activo
      </p>
      <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">
        Sintetizando Arquitectura
      </p>
    </div>
  </div>
);

const DedicationPlaque = () => (
  <motion.a
    href="https://www.amazon.com/author/alexwae"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.01, y: -2 }}
    className="block mt-32 relative group overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-[#111] to-[#050505] p-[1px] shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    <div className="relative h-full w-full bg-[#080808] rounded-2xl p-10 flex flex-col items-center text-center border border-white/5">
      <BookOpen className="text-orange-500 w-8 h-8 mb-6 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-6 font-mono">Principios Fundacionales del Sistema</p>
      <h3 className="text-2xl md:text-3xl font-serif italic text-zinc-300 mb-8 max-w-3xl leading-relaxed">
        Cómo decide un director: Un líder no sostiene poder. Lo controla.
      </h3>
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-orange-500/50" />
        <span className="text-orange-400 font-bold tracking-[0.2em] uppercase text-xs">Alex Wae</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-orange-500/50" />
      </div>
    </div>
  </motion.a>
);

const EliteSocioPlaque = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="my-32 relative group"
  >
    {/* Outer Glow */}
    <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
    
    <div className="relative p-10 md:p-20 rounded-[2.5rem] bg-[#050505] border border-white/5 overflow-hidden shadow-2xl">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      </div>

      {/* Animated Scanning Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent z-0"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-10 p-4 rounded-3xl bg-orange-500/10 border border-orange-500/30 text-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
        >
          <Crown size={40} />
        </motion.div>

        <h3 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic leading-[1.1] max-w-5xl">
          <span className="text-white">NEXUS ELITE</span> 
          <span className="text-zinc-500"> no es solo una herramienta;</span> 
          <br className="hidden md:block" />
          <span className="text-zinc-500">es tu </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            socio tecnológico de élite
          </span>
        </h3>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-[10px] text-orange-500 font-mono uppercase tracking-[0.5em] font-bold">Protocolo de Alianza Activo</span>
          </div>
          <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
          <p className="text-zinc-600 text-[9px] uppercase tracking-widest max-w-md">
            Arquitectura diseñada para la dominación digital y escalabilidad infinita.
          </p>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-500/30 rounded-tl-[2.5rem]" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/30 rounded-br-[2.5rem]" />
    </div>
  </motion.div>
);

export const LandingPage = ({ 
  onStart, 
  onRecycle, 
  onLogin,
  projects = [], 
  systemStrength = 15,
  intelligenceCore
}: { 
  onStart?: (plan?: string) => void, 
  onRecycle?: (input: string, isProject?: boolean) => Promise<any>,
  onLogin?: () => void,
  projects?: any[],
  systemStrength?: number,
  intelligenceCore?: any
}) => {
  const [showMigrator, setShowMigrator] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 p-6 md:p-10 font-sans relative overflow-hidden">
      {/* Header with Login */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
            <Crown className="text-orange-500" size={18} />
          </div>
          <span className="text-white font-black tracking-tighter text-xl italic">NEXUS</span>
        </div>
        
        <button 
          onClick={onLogin}
          className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
        >
          <User size={14} className="group-hover:text-orange-500 transition-colors" />
          Ingresar
        </button>
      </div>

      {/* CARBON GRID & ORBS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      {/* Floating Particles Background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: Math.random() * 1000 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: [Math.random() * 1000, Math.random() * 1000 - 500],
            x: [Math.random() * 1000, Math.random() * 1000 + (Math.random() - 0.5) * 200]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-orange-500/30 rounded-full blur-[1px] pointer-events-none"
        />
      ))}

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

      <div className="max-w-5xl mx-auto relative z-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 pt-16"
        >
          <TechSeal />

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 drop-shadow-2xl leading-[1.1]">
            DOMINIO ABSOLUTO <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">En la palma de tu mano.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            El primer entorno de desarrollo autónomo de ultra-lujo. <strong className="text-zinc-200 font-medium">NEXUS ELITE</strong> no es un simple editor; es un arquitecto digital que forja, diseña y despliega infraestructura empresarial a la velocidad del pensamiento.
          </p>
          
          <div className="mb-24">
            <VentureArchitect onPlanReady={(plan) => {
              if (onStart) {
                onStart(plan);
              }
            }} />
          </div>
        </motion.div>

        {/* PROJECT MANAGEMENT SECTION */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <HardDrive size={12} /> Gestión de Activos
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Administración de Proyectos Nivel Dios</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Control total sobre tu ecosistema digital. No solo guardamos archivos; preservamos la arquitectura genética de tus sistemas para una evolución infinita.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-zinc-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <RefreshCw size={64} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Migración Cuántica</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                ¿Tienes un proyecto legacy? Transmútalo a la infraestructura Nexus en segundos.
              </p>
              <button 
                onClick={() => setShowMigrator(true)}
                className="w-full py-3 bg-white/5 hover:bg-orange-500 hover:text-black border border-white/10 hover:border-orange-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                Muda tu proyecto y termina de construir... <ArrowRight size={14} />
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-zinc-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield size={64} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Blindaje de Código</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                Auditoría automática de seguridad en cada commit. Tu propiedad intelectual es sagrada.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500/60 uppercase tracking-widest">
                <Zap size={12} /> Protección Activa
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-zinc-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe size={64} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Despliegue Global</h3>
              <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                Lanza tu sistema a escala mundial con un solo clic. Infraestructura sin fronteras.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500/60 uppercase tracking-widest">
                <Sparkles size={12} /> Edge Computing
              </div>
            </div>
          </div>
        </div>

        {/* WHAT IT BUILDS SECTION */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">¿Qué construye este entorno?</h2>
            <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full" />
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            <ExampleCard 
              icon={Layers} 
              title="Plataformas SaaS B2B" 
              desc="Sistemas multi-tenant completos con autenticación, bases de datos relacionales (PostgreSQL), roles de usuario y pasarelas de pago integradas." 
            />
            <ExampleCard 
              icon={LineChart} 
              title="Dashboards Financieros" 
              desc="Interfaces de alta densidad de datos, gráficos en tiempo real, conexiones a APIs externas y arquitectura de microservicios." 
            />
            <ExampleCard 
              icon={Cpu} 
              title="Sistemas de IA Autónomos" 
              desc="Integración profunda con modelos LLM (Gemini, OpenAI), generación de contenido dinámico y flujos de trabajo automatizados." 
            />
            <ExampleCard 
              icon={Terminal} 
              title="Infraestructura Backend" 
              desc="APIs RESTful, WebSockets para tiempo real, CRON jobs, y despliegue global en el edge sin tocar la terminal." 
            />
          </motion.div>
        </div>

        {/* AI CAPSULE SECTION */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <Recycle size={12} /> Fuente de Inteligencia
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Depósito de Reciclaje AI</h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-sm">
              Transforma el excedente de datos y código en inteligencia pura. Nuestra cápsula Nexus sintetiza lo obsoleto en valor estratégico.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <AICapsule 
              onRecycle={onRecycle || (async () => ({}))} 
              onStart={onStart}
              projects={projects}
              systemStrength={systemStrength}
              intelligenceCore={intelligenceCore}
            />
          </div>
        </div>

        <EliteSocioPlaque />
        <EngineAnimation />
        <DedicationPlaque />
        
        {/* LEGAL & SEAL SECTION */}
        <div className="mt-32 pt-16 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-12 relative">
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
              <a href="#" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-widest font-mono">Protección Legal</a>
              <a href="#" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-widest font-mono">Términos de Uso</a>
              <a href="#" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-widest font-mono">Privacidad</a>
              <a href="#" className="text-xs text-zinc-500 hover:text-orange-400 transition-colors uppercase tracking-widest font-mono">Responsabilidad</a>
            </div>
            <p className="text-[10px] text-zinc-600 leading-relaxed max-w-2xl">
              NEXUS ELITE © 2026. Todos los derechos reservados. La plataforma opera bajo estrictos protocolos de seguridad y encriptación de grado militar. El uso de esta herramienta implica la aceptación de los términos de servicio. Las arquitecturas generadas son propiedad intelectual del usuario bajo licencia comercial.
            </p>
          </div>

          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-600/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500" />
            <div className="relative flex items-center gap-4 bg-[#0a0a0a] border border-orange-500/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-inner border border-orange-300/50">
                <Crown className="text-black w-6 h-6" />
              </div>
              <div>
                <p className="text-orange-400 font-black text-lg leading-none tracking-tighter">#1 RATED</p>
                <p className="text-[9px] text-zinc-400 uppercase tracking-[0.2em] mt-1">México & LATAM</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {showMigrator && (
          <ProjectMigrator 
            onMigrationComplete={(plan) => {
              setShowMigrator(false);
              if (onStart) onStart(plan);
            }}
            onClose={() => setShowMigrator(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
