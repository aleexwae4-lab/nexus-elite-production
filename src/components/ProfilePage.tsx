import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Phone, Shield, CreditCard, 
  HardDrive, Code2, Zap, ArrowRight, 
  Camera, Settings, LogOut, CheckCircle2,
  ExternalLink, Plus, Trash2, Layout,
  Globe, Database, Lock, Smartphone
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  status: 'active' | 'building' | 'deployed';
  lastCommit: string;
  infrastructure: {
    db: string;
    hosting: string;
    auth: string;
  };
}

interface ProfilePageProps {
  user: any;
  projects: any[];
  onLogout: () => void;
  onSelectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ 
  user, 
  projects, 
  onLogout,
  onSelectProject,
  onDeleteProject
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'billing' | 'security'>('projects');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Nexus Elite User',
    email: user?.email || 'user@nexus.elite',
    phone: '+52 33 1234 5678',
    photo: 'https://picsum.photos/seed/nexus/200/200'
  });

  const [stripeConnected, setStripeConnected] = useState(false);

  // Mock technical data for projects if not present
  const enhancedProjects = projects.map(p => ({
    ...p,
    techStack: p.techStack || ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    infrastructure: p.infrastructure || {
      db: 'PostgreSQL (Supabase)',
      hosting: 'Vercel Edge',
      auth: 'Nexus Identity Core'
    },
    lastCommit: p.lastCommit || 'Hace 2 horas'
  }));

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 p-4 md:p-10 font-sans relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER / PROFILE SUMMARY */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-12 p-8 rounded-3xl bg-[#0a0a0a] border border-zinc-800 shadow-2xl"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-800">
              <img src={profileData.photo} alt="Profile" className="w-full h-full object-cover" />
              <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">{profileData.name}</h1>
              <div className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase tracking-widest">
                Elite Tier
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-zinc-500 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-orange-500/60" /> {profileData.email}
              </div>
              <div className="flex items-center gap-2">
                <Smartphone size={14} className="text-orange-500/60" /> {profileData.phone}
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-orange-500/60" /> ID: {user?.id?.slice(0, 8) || 'NXS-8821'}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={onLogout}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </motion.div>

        {/* NAVIGATION TABS */}
        <div className="flex gap-2 mb-8 p-1 rounded-2xl bg-[#0a0a0a] border border-zinc-800 w-fit">
          {[
            { id: 'projects', label: 'Proyectos', icon: HardDrive },
            { id: 'billing', label: 'Pagos y Cobros', icon: CreditCard },
            { id: 'security', label: 'Seguridad', icon: Lock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid gap-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter italic">Ecosistema de Sistemas</h2>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest">
                  <Plus size={14} /> Nuevo Proyecto
                </button>
              </div>

              {enhancedProjects.length > 0 ? (
                enhancedProjects.map((project, i) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-6 rounded-3xl bg-[#0a0a0a] border border-zinc-800 hover:border-orange-500/30 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Code2 size={80} className="text-orange-500" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 relative z-10">
                      {/* Project Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            project.status === 'deployed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-zinc-500 text-sm mb-6 leading-relaxed max-w-xl">
                          {project.description || 'Arquitectura generada por Nexus Elite. Sistema escalable con integración de IA y despliegue global.'}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div className="w-full md:w-64 p-5 rounded-2xl bg-black/40 border border-white/5">
                        <h4 className="text-[10px] font-black text-orange-500/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Database size={12} /> Especificaciones
                        </h4>
                        <div className="space-y-3">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-zinc-600 uppercase font-bold">Base de Datos</span>
                            <span className="text-xs text-zinc-400">{project.infrastructure.db}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] text-zinc-600 uppercase font-bold">Hosting</span>
                            <span className="text-xs text-zinc-400">{project.infrastructure.hosting}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] text-zinc-600 uppercase font-bold">Auth Core</span>
                            <span className="text-xs text-zinc-400">{project.infrastructure.auth}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2 justify-center">
                        <button 
                          onClick={() => onSelectProject(project.id)}
                          className="p-3 rounded-xl bg-orange-500 text-black hover:scale-105 transition-all shadow-lg shadow-orange-500/20"
                        >
                          <ArrowRight size={20} />
                        </button>
                        <button 
                          onClick={() => onDeleteProject(project.id)}
                          className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-600 hover:text-red-500 hover:border-red-500/30 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-20 text-center rounded-3xl bg-[#0a0a0a] border border-dashed border-zinc-800">
                  <div className="p-4 bg-zinc-900 rounded-full w-fit mx-auto mb-6">
                    <HardDrive size={40} className="text-zinc-700" />
                  </div>
                  <h3 className="text-zinc-400 font-bold uppercase tracking-widest">No hay proyectos activos</h3>
                  <p className="text-zinc-600 text-sm mt-2">Inicia tu primera forja desde la página principal.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div 
              key="billing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Stripe Connection */}
              <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-zinc-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl">
                    <CreditCard className="text-indigo-500 w-8 h-8" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    stripeConnected ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {stripeConnected ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase italic">Integración con Stripe</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                  Conecta tu cuenta de Stripe para gestionar cobros automáticos en tus proyectos y pagar tu suscripción Nexus Elite.
                </p>

                {!stripeConnected ? (
                  <button 
                    onClick={() => setStripeConnected(true)}
                    className="w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-3"
                  >
                    Conectar con Stripe <ArrowRight size={16} />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                        <div>
                          <p className="text-xs text-zinc-300 font-bold">•••• 4242</p>
                          <p className="text-[10px] text-zinc-600 uppercase">Exp: 12/28</p>
                        </div>
                      </div>
                      <CheckCircle2 size={16} className="text-green-500" />
                    </div>
                    <button className="w-full py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:text-white transition-all">
                      Gestionar en Stripe Dashboard
                    </button>
                  </div>
                )}
              </div>

              {/* Construction Motor Credits */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap size={100} className="text-orange-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase italic">Motor de Construcción</h3>
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                  Tu saldo de energía para forjar sistemas. Cada crédito permite una transmutación de arquitectura compleja.
                </p>

                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-4xl font-black text-white">850</span>
                    <span className="text-zinc-500 text-xs uppercase font-bold mb-1">Créditos Nexus</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-600"
                    />
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:scale-[1.02] transition-all">
                  Recargar Energía
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-2xl"
            >
              <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-zinc-800">
                <h3 className="text-2xl font-bold text-white mb-8 tracking-tighter uppercase italic">Protocolos de Seguridad</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                        <Lock size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Autenticación de Dos Factores</p>
                        <p className="text-[10px] text-zinc-500 uppercase">Protección extra para tu cuenta</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-orange-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Sesiones Activas</p>
                        <p className="text-[10px] text-zinc-500 uppercase">Guadalajara, MX • Chrome en Windows</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Cerrar</button>
                  </div>

                  <button className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-800 transition-all">
                    Cambiar Contraseña Maestra
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
