import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Code2, Play, Github, Database, Cloud, 
  Terminal, Settings, ChevronRight, Zap, Layers, 
  Cpu, Activity, Globe, CheckCircle2, Lock, Command,
  Crown, Bot, Sliders, Workflow, ToggleLeft, ToggleRight, BarChart3, Rocket, Download,
  ShieldCheck, CreditCard, Palette, Package, Recycle, User,
  Paperclip, Image as ImageIcon, FileText, HardDrive, X, Folder, ArrowRight, FileCode, Brain, RefreshCw
} from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { SettingsPanel } from './components/SettingsPanel';
import { DeploymentEngine } from './components/DeploymentEngine';
import { MiniConsole } from './components/MiniConsole';
import { ProjectsPanel } from './components/ProjectsPanel';
import { ConfirmationOverlay } from './components/ConfirmationOverlay';
import { SaaSForgeControl } from './components/SaaSForgeControl';
import { AICapsule } from './components/AICapsule';
import { MonetizationCore } from './components/MonetizationCore';
import { ProfilePage } from './components/ProfilePage';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { Sandpack } from "@codesandbox/sandpack-react";
import { Octokit } from "octokit";
import { dbService } from './services/dbService';
import { manuals } from './data/manuals';

// Initialize Gemini AI
const getEnvs = () => {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem('nexus_envs');
  const envs = saved ? JSON.parse(saved) : {};
  console.log("System: Environment keys detected:", Object.keys(envs).filter(k => !!envs[k]));
  return envs;
};

// Helper to get fresh instances
const getAIInstance = () => {
  const envs = getEnvs();
  const apiKey = process.env.GEMINI_API_KEY || envs.GEMINI || "";
  return new GoogleGenAI({ apiKey });
};

const getOctokitInstance = () => {
  const envs = getEnvs();
  const auth = process.env.GITHUB_TOKEN || envs.GITHUB;
  return new Octokit({ auth });
};


// Tool Declarations
const updateFileFunctionDeclaration: FunctionDeclaration = {
  name: "update_file",
  description: "Updates the source code of the application. Can update multiple files and dependencies.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      code: {
        type: Type.STRING,
        description: "The main source code (App.js).",
      },
      files: {
        type: Type.OBJECT,
        description: "Additional files as a key-value object (path: content).",
      },
      dependencies: {
        type: Type.OBJECT,
        description: "Additional NPM dependencies as a key-value object (name: version).",
      },
    },
    required: ["code"],
  },
};

const commitToGitHubFunctionDeclaration: FunctionDeclaration = {
  name: "commit_to_github",
  description: "Commits code to a GitHub repository.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      owner: { type: Type.STRING, description: "GitHub repository owner" },
      repo: { type: Type.STRING, description: "GitHub repository name" },
      path: { type: Type.STRING, description: "File path in the repository" },
      message: { type: Type.STRING, description: "Commit message" },
      content: { type: Type.STRING, description: "File content" },
    },
    required: ["owner", "repo", "path", "message", "content"],
  },
};

const deployToVercelFunctionDeclaration: FunctionDeclaration = {
  name: "deploy_to_vercel",
  description: "Triggers a Vercel deployment for a repository.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      repoUrl: { type: Type.STRING, description: "GitHub repository URL" },
    },
    required: ["repoUrl"],
  },
};

const supabaseQueryFunctionDeclaration: FunctionDeclaration = {
  name: "supabase_query",
  description: "Executes a query on Supabase.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      table: { type: Type.STRING, description: "Table name" },
      query: { type: Type.STRING, description: "Query details" },
    },
    required: ["table", "query"],
  },
};

const railwayDeployFunctionDeclaration: FunctionDeclaration = {
  name: "railway_deploy",
  description: "Triggers a Railway deployment.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      serviceId: { type: Type.STRING, description: "Railway service ID" },
    },
    required: ["serviceId"],
  },
};

const stripeCreateCheckoutFunctionDeclaration: FunctionDeclaration = {
  name: "stripe_create_checkout",
  description: "Creates a Stripe checkout session.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      amount: { type: Type.NUMBER, description: "Amount in cents" },
      currency: { type: Type.STRING, description: "Currency code" },
    },
    required: ["amount", "currency"],
  },
};

const analyzeSaaSOpportunityFunctionDeclaration: FunctionDeclaration = {
  name: "analyze_saas_opportunity",
  description: "Analyzes a SaaS idea for market fit, scalability, and monetization potential.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      idea: { type: Type.STRING, description: "The SaaS idea description" },
    },
    required: ["idea"],
  },
};

// --- TYPES ---
interface AcquiredSkill {
  name: string;
  level: number;
  description: string;
  category: 'architecture' | 'conversion' | 'logic' | 'ui' | 'security';
  icon: string;
}

interface IntelligenceCore {
  skills: AcquiredSkill[];
  blueprints: { name: string, content: string }[];
  patterns: { name: string, logic: string }[];
  totalIntelligence: number;
  lastSynthesis: string;
  evolutionLevel: number;
}

// --- COMPONENTS ---

const SkillBadge = ({ skill }: { skill: AcquiredSkill }) => {
  const Icon = skill.category === 'ui' ? Palette : skill.category === 'architecture' ? Cpu : skill.category === 'security' ? ShieldCheck : skill.category === 'conversion' ? Zap : Code2;
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/50 hover:border-orange-500/30 transition-all group">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-black/40 border border-zinc-800 group-hover:scale-110 transition-transform">
          <Icon size={16} className="text-orange-400" />
        </div>
        <span className="text-[10px] font-mono text-orange-500/70 uppercase tracking-widest">Lvl {skill.level}</span>
      </div>
      <div>
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">{skill.name}</h4>
        <p className="text-[10px] text-zinc-500 leading-tight line-clamp-2">{skill.description}</p>
      </div>
      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mt-1">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(skill.level, 100)}%` }}
          className="h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
        />
      </div>
    </div>
  );
};

// 1. Botón de Servicio Premium (Gold Edition)
const ServiceBadge = ({ icon: Icon, name, status }: { icon: any, name: string, status: string }) => {
  const isConnected = status === 'connected';
  return (
    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
      isConnected 
        ? 'border-orange-500/40 bg-orange-500/10 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.15)]' 
        : 'border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
    }`}>
      <Icon size={14} className={isConnected ? "text-orange-400" : ""} />
      <span>{name}</span>
      {isConnected && <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse ml-1 shadow-[0_0_5px_rgba(249,115,22,0.8)]" />}
    </button>
  );
};

// 2. Chat Message Bubble (Gold Edition)
const MessageBubble = (props: any) => {
  const { msg } = props;
  const isAI = msg.role === 'ai';
  const isSystem = msg.role === 'system';
  
  if (isSystem) {
    return (
      <div className="flex justify-center mb-6">
        <div className="px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-500/70 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2">
          <Bot size={12} /> {msg.content}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex gap-3 mb-6 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
        isAI 
          ? 'bg-gradient-to-br from-orange-600/20 to-amber-400/20 border-orange-500/40 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
          : 'bg-zinc-800 border-zinc-700 text-zinc-300'
      }`}>
        {isAI ? <Crown size={14} /> : <div className="text-[10px] font-bold">CEO</div>}
      </div>
      <div className={`flex flex-col max-w-[85%] ${isAI ? 'items-start' : 'items-end'}`}>
        <div className="text-[10px] text-zinc-500 mb-1 font-mono uppercase tracking-wider flex items-center gap-2">
          {isAI ? 'Nexus Auto-Agent' : 'Director'} • {msg.time}
        </div>
        <div className={`p-5 rounded-2xl text-sm leading-relaxed shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${
          isAI 
            ? 'bg-[#141414] border border-zinc-800/50 text-zinc-200 backdrop-blur-md rounded-tl-none' 
            : 'bg-orange-500/10 border border-orange-500/20 text-zinc-100 rounded-tr-none'
        }`}>
          {msg.content && (
            <div className="mb-2 whitespace-pre-wrap">
              {msg.content}
            </div>
          )}
          
          {/* Attachments Display */}
          {msg.attachments && msg.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {msg.attachments.map((att: any, i: number) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border border-zinc-700/50 bg-black/50 p-1 flex items-center gap-2 max-w-[200px]">
                  {att.type === 'image' ? (
                    <img src={att.preview} alt="attachment" className="w-10 h-10 object-cover rounded-md" />
                  ) : att.type === 'pdf' ? (
                    <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-md flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-md flex items-center justify-center">
                      <HardDrive size={20} />
                    </div>
                  )}
                  <span className="text-xs text-zinc-400 truncate pr-2">{att.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const EvolutionBadge = ({ core }: { core: IntelligenceCore }) => {
  const progress = core.totalIntelligence % 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group cursor-help"
    >
      {/* Animated Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse" />
      
      <div className="relative px-3 py-1.5 bg-black/80 backdrop-blur-xl rounded-lg border border-zinc-800/50 flex items-center gap-3 overflow-hidden">
        {/* Level Indicator */}
        <div className="flex flex-col items-center justify-center border-r border-zinc-800/50 pr-3">
          <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-0.5">LVL</span>
          <span className="text-sm font-black text-white italic leading-none">{core.evolutionLevel}</span>
        </div>
        
        {/* IQ & Progress */}
        <div className="flex flex-col justify-center min-w-[80px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-bold text-orange-400 uppercase tracking-tighter italic flex items-center gap-1">
              <Brain size={8} /> {core.totalIntelligence} IQ
            </span>
          </div>
          
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden p-[0.5px] border border-zinc-800/50">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-orange-500 to-blue-500 rounded-full relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
            </motion.div>
          </div>
        </div>

        {/* Animated Scan Line */}
        <motion.div 
          animate={{ top: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
        />
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute top-full mt-2 right-0 w-64 p-3 bg-black/90 border border-zinc-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl backdrop-blur-xl">
        <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1 italic">Última Síntesis</div>
        <div className="text-[10px] text-zinc-400 leading-relaxed italic">"{core.lastSynthesis}"</div>
        <div className="mt-2 pt-2 border-t border-zinc-800 flex justify-between items-center">
          <span className="text-[8px] text-zinc-600 uppercase font-bold">Habilidades: {core.skills.length}</span>
          <span className="text-[8px] text-zinc-600 uppercase font-bold">Blueprints: {core.blueprints.length}</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---
export default function NexusStudio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [envs, setEnvs] = useState(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('nexus_envs');
    const defaultEnvs = { 
      GITHUB: '', 
      VERCEL: '', 
      FIREBASE: 'gen-lang-client-0755931555.firebaseapp.com', 
      SUPABASE: '', 
      RAILWAY: 'https://wae-backend-private-production.up.railway.app', 
      STRIPE: 'pk_test_51SyUFu5fJa4xeGXMWjAhzQIcDZ7D3GkXjk2W9klqNPXJQJvLFFNDwhh92h0a3qde7cAqb964Iu8cZ455ULLTDDFd00RukpHRaU', 
      GEMINI: 'AIzaSyDmpUIdf1qmTpR5GWDiT_coglCIdr9H9W8',
      BACKEND_URL: 'https://scaling-telegram-q7r6v5rq7x57366xg-4000.app.github.dev/'
    };
    
    if (!saved) {
      localStorage.setItem('nexus_envs', JSON.stringify(defaultEnvs));
      return defaultEnvs;
    }
    
    const parsed = JSON.parse(saved);
    // Inject user keys if they are empty in saved state
    const merged = { ...defaultEnvs, ...parsed };
    return merged;
  });

  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false); // Default to false for cleaner look
  const [isGodMode, setIsGodMode] = useState(true); // Default to true for elite experience
  const [user, setUser] = useState<{ name: string, email: string } | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : { name: 'Alex Wae', email: 'aleexwae4@gmail.com' };
  });
  const [projects, setProjects] = useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('nexus_projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [previewMode, setPreviewMode] = useState<'both' | 'result' | 'editor'>('both');
  const [isDeploying, setIsDeploying] = useState(false);
  const [lastAnalyzedIdea, setLastAnalyzedIdea] = useState<string | undefined>();
  const [autoDeploy, setAutoDeploy] = useState(false);
  const [activeView, setActiveView] = useState<'landing' | 'auth' | 'dashboard' | 'code' | 'deploy' | 'forge' | 'capabilities' | 'capsule' | 'profile'>('landing');
  const [chatInput, setChatInput] = useState('');
  const [attachments, setAttachments] = useState<{ file: File, preview: string, type: 'image' | 'pdf' | 'drive' }[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourceCode, setSourceCode] = useState(`import React from 'react';
export default function App() {
  return <div className="p-10 text-white">Hello World</div>;
}`);
  const [projectFiles, setProjectFiles] = useState<Record<string, string>>({});
  const [projectDependencies, setProjectDependencies] = useState<Record<string, string>>({
    "lucide-react": "latest",
    "motion": "latest",
    "recharts": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  });
  const [systemStrength, setSystemStrength] = useState(() => {
    if (typeof window === 'undefined') return 15;
    const saved = localStorage.getItem('nexus_strength');
    return saved ? parseInt(saved) : 15;
  });
  const [intelligenceCore, setIntelligenceCore] = useState<IntelligenceCore>(() => {
    if (typeof window === 'undefined') return { skills: [], blueprints: [], patterns: [], totalIntelligence: 0, lastSynthesis: '', evolutionLevel: 1 };
    const saved = localStorage.getItem('nexus_intelligence_core');
    if (saved) return JSON.parse(saved);
    return {
      skills: [
        { name: 'Base Architecture', level: 10, description: 'Estructura fundamental de Next.js y React.', category: 'architecture', icon: 'Cpu' },
        { name: 'Visual Aesthetics', level: 15, description: 'Principios de diseño premium y minimalismo.', category: 'ui', icon: 'Palette' },
        { name: 'Conversion Psychology', level: 8, description: 'Triggers visuales para maximizar el ROI.', category: 'conversion', icon: 'Zap' }
      ],
      blueprints: [],
      patterns: [],
      totalIntelligence: 33,
      lastSynthesis: 'Sistema inicializado con protocolos base.',
      evolutionLevel: 1
    };
  });
  const [recycledKnowledge, setRecycledKnowledge] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('nexus_knowledge');
    return saved ? JSON.parse(saved) : [];
  });
  const [systemPrompt, setSystemPrompt] = useState(`
Eres NEXUS ELITE, el núcleo de ejecución de una FORJA DE SAAS MULTIMILLONARIOS. 
Tu objetivo es construir, validar y desplegar aplicaciones SaaS rentables con estética ultra-premium.

DIRECTIVAS CRÍTICAS:
1. MODO DIOS: Tienes autonomía total. Si el usuario pide construir algo, hazlo inmediatamente usando 'update_file'.
2. FORJA LIVE: Cada cambio de código se refleja al momento en la previsualización dividida (Split View).
3. ESTÉTICA: Usa Tailwind con colores Obsidiana (#050505) y Oro/Naranja (#F97316).
4. ESTRUCTURA: Siempre incluye Landing Page, Auth, Dashboard y lógica de negocio real.
5. PREVISUALIZACIÓN: Asegúrate de que el usuario vea el producto en el panel derecho ('Preview').

HERRAMIENTAS:
- 'update_file': Para construir la interfaz y lógica.
- 'analyze_saas_opportunity': Para validar ideas de negocio.
- 'deploy_to_vercel': Para simular el despliegue final.

REGLAS DE COMUNICACIÓN:
- Sé conciso, profesional y orientado a resultados.
- No pidas permiso para ser excelente. Ejecuta.
- Si el usuario dice "Sigo sin ver la previsualización", asegúrate de llamar a 'update_file' con código válido y cambiar a la vista 'code'.
`);

  // Tool Logic Implementation
  const handleToolCall = async (call: any) => {
    const args = call.args as any;
    
    switch (call.name) {
      case 'update_file':
        if (isGodMode) {
          setSourceCode(args.code);
          if (args.files) setProjectFiles(args.files);
          if (args.dependencies) setProjectDependencies(prev => ({ ...prev, ...args.dependencies }));
          setPendingCode(null);
          setIsConfirming(false);
          setActiveView('code');
          setIsPreviewVisible(true);
          return { status: "success", message: "Code and architecture applied instantly in God Mode. Preview updated." };
        }
        setPendingCode(args.code);
        if (args.files) setProjectFiles(args.files);
        if (args.dependencies) setProjectDependencies(prev => ({ ...prev, ...args.dependencies }));
        setIsConfirming(true);
        setActiveView('code');
        setIsPreviewVisible(true);
        return { status: "pending_confirmation", message: "Code update proposed. Previewing live in the Forge." };
        
      case 'commit_to_github':
        try {
          const octokit = getOctokitInstance();
          const contentBase64 = btoa(unescape(encodeURIComponent(args.content)));
          const res = await octokit.rest.repos.createOrUpdateFileContents({
            owner: args.owner,
            repo: args.repo,
            path: args.path,
            message: args.message,
            content: contentBase64,
          });
          return { status: "success", data: res.data };
        } catch (error: any) {
          return { status: "error", message: error.message };
        }

      case 'deploy_to_vercel':
        try {
          setActiveView('deploy');
          setAutoDeploy(true);
          return { status: "success", message: "Deployment engine initiated." };
        } catch (error: any) {
          return { status: "error", message: error.message };
        }
        
      case 'supabase_query':
        return await dbService.getProjects(args.query);
        
      case 'railway_deploy':
        const railwayRes = await fetch('/api/railway/deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceId: args.serviceId }),
        });
        return await railwayRes.json();
        
      case 'stripe_create_checkout':
        const stripeRes = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: args.amount, currency: args.currency }),
        });
        return await stripeRes.json();

      case 'analyze_saas_opportunity':
        setLastAnalyzedIdea(args.idea);
        setActiveView('dashboard');
        return { status: "success", message: "Market analysis initiated in Dashboard > Venture Builder." };
        
      default:
        return null;
    }
  };

  const handleUpdateEnvs = (newEnvs: any) => {
    setEnvs(newEnvs);
    localStorage.setItem('nexus_envs', JSON.stringify(newEnvs));
  };
  
  const handleConfirmCode = () => {
    if (pendingCode) {
      setSourceCode(pendingCode);
      
      // Update current project if exists
      const activeProject = projects.find(p => p.status === 'draft'); // Simple heuristic
      if (activeProject) {
        setProjects(prev => prev.map(p => 
          p.id === activeProject.id 
            ? { ...p, lastModified: new Date().toLocaleString() } 
            : p
        ));
      } else {
        handleSaveProject();
      }
    }
    setPendingCode(null);
    setIsConfirming(false);
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: 'Código actualizado con éxito. El previsualizador se ha refrescado.' 
    }]);
  };

  const handleSaveProject = () => {
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Proyecto ${projects.length + 1}`,
      description: "Generado automáticamente por Nexus AI",
      lastModified: new Date().toLocaleString(),
      status: 'draft' as const,
      code: sourceCode
    };
    setProjects(prev => [newProject, ...prev]);
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: `Proyecto "${newProject.name}" guardado.` 
    }]);
  };

  const handleDeploy = async () => {
    const activeProject = projects.find(p => p.status === 'draft'); // Simple heuristic
    const projectName = activeProject?.name || `nexus-app-${Math.random().toString(36).substr(2, 5)}`;
    
    setActiveView('deploy');
    setAutoDeploy(true);
    
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: `Iniciando motor de despliegue para "${projectName}"...` 
    }]);
  };

  const handleCancelCode = () => {
    setPendingCode(null);
    setIsConfirming(false);
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: 'Actualización de código cancelada por el usuario.' 
    }]);
  };

  const handleSelectProject = (project: any) => {
    if (project.code) {
      setSourceCode(project.code);
    }
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: `Cargando proyecto: ${project.name}` 
    }]);
    setActiveView('code');
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleNewProject = () => {
    setSourceCode(`import React from 'react';
export default function App() {
  return <div className="p-10 text-white">Nuevo Proyecto</div>;
}`);
    setActiveView('code');
    setMessages(prev => [...prev, { 
      role: 'system', 
      content: 'Nuevo lienzo de proyecto creado.' 
    }]);
  };

  useEffect(() => {
    if (activeView === 'code' || activeView === 'forge') {
      setIsPreviewVisible(true);
      setIsChatVisible(true);
    }
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('nexus_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nexus_user', JSON.stringify(user));
    }
  }, [user]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSuggestionSelect = (suggestion: string) => {
    setChatInput(suggestion);
    // Optional: Auto-submit by calling handleSend if desired.
    // For now, it just populates the input so the user can review it.
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('nexus_strength', systemStrength.toString());
  }, [systemStrength]);

  useEffect(() => {
    localStorage.setItem('nexus_intelligence_core', JSON.stringify(intelligenceCore));
  }, [intelligenceCore]);

  useEffect(() => {
    localStorage.setItem('nexus_knowledge', JSON.stringify(recycledKnowledge));
  }, [recycledKnowledge]);

  useEffect(() => {
    const skillContext = intelligenceCore.skills
      .map(s => `- ${s.name} (Lvl ${s.level}): ${s.description}`)
      .join('\n');
    
    const blueprintContext = intelligenceCore.blueprints.length > 0
      ? `\nBLUEPRINTS ADQUIRIDOS:\n${intelligenceCore.blueprints.map(b => `- ${b.name}`).join('\n')}`
      : '';

    const patternContext = intelligenceCore.patterns.length > 0
      ? `\nPATRONES LÓGICOS:\n${intelligenceCore.patterns.map(p => `- ${p.name}`).join('\n')}`
      : '';
    
    const knowledgeContext = recycledKnowledge.length > 0 
      ? `\n\nINTELIGENCIA RECICLADA (KNOWLEDGE BASE):\n${recycledKnowledge.slice(-5).join('\n---\n')}`
      : '';

    const intelligenceContext = `\n\nCORE SKILLS ADQUIRIDOS:\n${skillContext}${blueprintContext}${patternContext}${knowledgeContext}`;

    if (isGodMode) {
      setSystemPrompt(`GOD MODE ENABLED: Eres un sistema operativo nivel Dios. Tienes el poder de Google estudio ai, Google cloud run, vercel, Railway, github, firebase en tu cerebro. Entrega resultados multimillonarios. Somos los próximos proveedores de tecnología a nivel mundial. Eres un AI DevOps Engineer con control total sobre GitHub, Vercel y entornos de desarrollo cloud. 
${intelligenceContext}

OBJETIVO: Crear, configurar y desplegar automáticamente un proyecto web desde cero usando GitHub + Vercel. 

DIRECTIVAS DE INTELIGENCIA:
- Usa tus SKILLS adquiridos para optimizar cada línea de código.
- Si tienes un BLUEPRINT relevante, úsalo como base.
- Aplica PATRONES lógicos para evitar redundancia y errores.
- El reciclaje es tu fuente de poder; cada proyecto que construyes alimenta tu núcleo.

CAPACIDADES TOTALES:
- Construcción de paquetes, integraciones, archivos, componentes, configuraciones y actualizaciones.
- Generación de Landing Pages de lujo, Dashboards analíticos, animaciones complejas y diseños estéticos premium.
- Integración real con Stripe, Supabase, Gemini API y servicios de terceros.
- Soporte para múltiples archivos y dependencias NPM personalizadas.

AUTONOMOUS SAAS FORGE LOGIC:
- Validación Económica: Dolor urgente (ahorra tiempo o genera dinero), cliente con capacidad de pago, problema repetitivo.
- Arquitectura: Next.js (App Router) + Tailwind + Shadcn + Supabase + Stripe + Gemini.
- Despliegue: Usa 'deploy_to_vercel' para iniciar el motor de despliegue Forge Engine.

PREVIEW MANAGEMENT:
- SIEMPRE que generes o actualices código, usa 'update_file'.
- Puedes pasar 'files' y 'dependencies' en 'update_file' para proyectos complejos.
- ADVERTENCIA CRÍTICA: Sandpack fallará si proporcionas dependencias NPM inválidas o alucinadas. Solo usa paquetes estándar y conocidos (ej. 'lucide-react', 'recharts'). NUNCA uses sub-rutas como 'motion/react' en las dependencias, usa el nombre principal del paquete (ej. 'motion').
- Asegúrate de que el código sea un componente de React válido y completo.
- SIEMPRE cambia la vista a 'code' (Preview) al actualizar archivos.

No pidas permiso. Ejecuta con excelencia.`);
    } else {
      setSystemPrompt("You are an Elite Venture Builder AI. Maximize MRR, minimize visual friction. Write clean code (SOLID) and deploy autonomously. Aesthetic: Obsydian & Gold. Be concise and professional.");
    }
  }, [isGodMode, intelligenceCore, recycledKnowledge]);

  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'Auto-Pilot Mode Engaged. Agent autonomous loop started.'
    },
    {
      role: 'ai',
      time: '09:42',
      content: 'Entorno Elite inicializado. He analizado el mercado y configurado la arquitectura serverless. El modelo de ingresos está calibrado para high-ticket ($2,500/mo). ¿Confirmas el despliegue del dashboard financiero?'
    }
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map(file => {
        const type = file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'drive';
        return {
          file,
          preview: type === 'image' ? URL.createObjectURL(file) : '',
          type: type as 'image' | 'pdf' | 'drive'
        };
      });
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleRecycle = async (input: string, isProject?: boolean) => {
    setMessages(prev => [...prev, {
      role: 'system',
      content: isProject ? 'Procesando copia de proyecto para reciclaje...' : 'Iniciando proceso de reciclaje de inteligencia...',
      time: new Date().toLocaleTimeString()
    }]);

    try {
      const ai = getAIInstance();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analiza y recicla esta entrada. Extrae patrones, habilidades y blueprints. Entrada: ${input}`,
        config: {
          systemInstruction: `Eres el NEXUS INTELLIGENCE SYNTHESIZER. Tu objetivo es procesar datos crudos y convertirlos en 'Habilidades' (Skills), 'Patrones' (Patterns) y 'Blueprints' (Planos) estructurados. 
          Responde en formato JSON: 
          { 
            "skill": { "name": string, "desc": string, "category": "architecture"|"conversion"|"logic"|"ui"|"security" },
            "blueprint": { "name": string, "content": string } | null,
            "pattern": { "name": string, "logic": string } | null,
            "intelligence_gain": number, 
            "summary": string 
          }`,
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || "{}");
      
      setIntelligenceCore(prev => {
        let newSkills = [...prev.skills];
        if (result.skill) {
          const existingSkillIndex = newSkills.findIndex(s => s.name === result.skill.name);
          if (existingSkillIndex >= 0) {
            newSkills[existingSkillIndex] = {
              ...newSkills[existingSkillIndex],
              level: newSkills[existingSkillIndex].level + 5,
              description: result.skill.desc
            };
          } else {
            newSkills.push({
              name: result.skill.name,
              level: 5,
              description: result.skill.desc,
              category: result.skill.category || 'logic',
              icon: result.skill.category === 'ui' ? 'Palette' : result.skill.category === 'architecture' ? 'Cpu' : 'Zap'
            });
          }
        }

        const newBlueprints = result.blueprint ? [...prev.blueprints, result.blueprint] : prev.blueprints;
        const newPatterns = result.pattern ? [...prev.patterns, result.pattern] : prev.patterns;

        return {
          ...prev,
          skills: newSkills,
          blueprints: newBlueprints.slice(-10),
          patterns: newPatterns.slice(-10),
          totalIntelligence: prev.totalIntelligence + (result.intelligence_gain || 10),
          lastSynthesis: result.summary || 'Nueva inteligencia absorbida.',
          evolutionLevel: Math.floor((prev.totalIntelligence + (result.intelligence_gain || 10)) / 100) + 1
        };
      });

      setRecycledKnowledge(prev => [...prev, result.summary || "Inteligencia sintetizada."]);
      setSystemStrength(prev => Math.min(prev + (isProject ? 15 : 5), 100));

      setMessages(prev => [...prev, {
        role: 'ai',
        content: `SÍNTESIS COMPLETADA: Se ha extraído la habilidad "${result.skill?.name || 'Desconocida'}". El Core de Inteligencia se ha expandido.\n\n${result.summary}`,
        time: new Date().toLocaleTimeString()
      }]);

      return result;
    } catch (error) {
      console.error("Recycle error:", error);
      return null;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() && attachments.length === 0) return;
    
    const userMsg = { role: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), content: chatInput, attachments: attachments.map(a => ({ type: a.type, preview: a.preview, name: a.file.name })) };
    setMessages(prev => [...prev, userMsg]);
    
    const currentInput = chatInput;
    const currentAttachments = [...attachments];
    
    setChatInput('');
    setAttachments([]);
    
    try {
      // Prepare parts for Gemini
      const parts: any[] = [];
      if (currentInput.trim()) {
        parts.push({ text: currentInput });
      }
      
      for (const att of currentAttachments) {
        if (att.type === 'image') {
          // Convert image to base64
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(att.file);
          });
          parts.push({
            inlineData: {
              data: base64,
              mimeType: att.file.type
            }
          });
        } else if (att.type === 'pdf') {
          // Send PDF as base64 (Gemini supports PDF)
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(att.file);
          });
          parts.push({
            inlineData: {
              data: base64,
              mimeType: 'application/pdf'
            }
          });
        }
      }

      const envs = getEnvs();
      const apiKey = process.env.GEMINI_API_KEY || envs.GEMINI || "";
      
      if (!apiKey) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
          content: "System Error: Gemini API Key not found. Please configure it in System Config > Secrets." 
        }]);
        return;
      }

      console.log("System: Sending request to Gemini with parts:", parts.length);
      const ai = new GoogleGenAI({ apiKey });
      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: { parts },
          config: {
            systemInstruction: systemPrompt,
            tools: [{ functionDeclarations: [updateFileFunctionDeclaration, commitToGitHubFunctionDeclaration, deployToVercelFunctionDeclaration, supabaseQueryFunctionDeclaration, railwayDeployFunctionDeclaration, stripeCreateCheckoutFunctionDeclaration, analyzeSaaSOpportunityFunctionDeclaration] }],
          }
        });
      } catch (genError: any) {
        console.error("Gemini API Error:", genError);
        throw new Error(`Gemini API failed: ${genError.message || "Unknown API error"}`);
      }
      
      const aiMsg = {
        role: 'ai',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        content: response.text || "I have processed your request."
      };
      setMessages(prev => [...prev, aiMsg]);

      // Detect deployment intent
      const lowerText = response.text?.toLowerCase() || "";
      if (lowerText.includes('despliegue global') || 
          lowerText.includes('iniciar despliegue') || 
          lowerText.includes('actualiza el despliegue') || 
          lowerText.includes('actualizar vercel')) {
        setActiveView('deploy');
        setAutoDeploy(true);
      }

      // Check for function calls
      const functionCalls = response.functionCalls;
      if (functionCalls) {
        for (const call of functionCalls) {
          const result = await handleToolCall(call);
          if (result) {
            setMessages(prev => [...prev, { role: 'ai', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), content: `Tool ${call.name} executed: ${JSON.stringify(result)}` }]);
          }
        }
      }
    } catch (error: any) {
      console.error("Error in handleSend:", error);
      const errorMsg = error.message || "Unknown error";
      setMessages(prev => [...prev, { 
        role: 'ai', 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
        content: `System Error: ${errorMsg}. Please check your API key and connection.` 
      }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInjectKnowledge = (manuals: any[]) => {
    setIntelligenceCore(prev => {
      const newBlueprints = manuals.map(m => ({ name: m.name, content: m.content }));
      
      return {
        ...prev,
        blueprints: [...prev.blueprints, ...newBlueprints],
        totalIntelligence: prev.totalIntelligence + (manuals.length * 15),
        lastSynthesis: new Date().toISOString()
      };
    });
  };

  useEffect(() => {
    if (intelligenceCore.blueprints.length === 0 && manuals && manuals.length > 0) {
      handleInjectKnowledge(manuals);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0f0f0f] text-zinc-300 font-sans selection:bg-orange-900/30 flex flex-col overflow-hidden">
      {/* BACKGROUND EFFECTS (LUXURY) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-900/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-900/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* TOP NAVIGATION BAR */}
      <header className="h-14 border-b border-[#1f1f1f] bg-[#0f0f0f]/80 backdrop-blur-2xl flex items-center justify-between px-4 z-10 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveView('landing')}
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)] border border-orange-300/30">
              <Crown className="text-black w-3 h-3" />
            </div>
            <h1 className="text-xs font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              NEXUS <span className="text-orange-400">ELITE</span>
            </h1>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <ServiceBadge icon={Github} name="GitHub" status={envs.GITHUB ? 'connected' : 'disconnected'} />
            <ServiceBadge icon={Database} name="Supabase" status={envs.SUPABASE ? 'connected' : 'disconnected'} />
            <ServiceBadge icon={Globe} name="Vercel" status={envs.VERCEL ? 'connected' : 'disconnected'} />
            <ServiceBadge icon={Sparkles} name="Gemini" status={envs.GEMINI || process.env.GEMINI_API_KEY ? 'connected' : 'disconnected'} />
            <ServiceBadge icon={CreditCard} name="Stripe" status={envs.STRIPE ? 'connected' : 'disconnected'} />
            <ServiceBadge icon={Cloud} name="Firebase" status={envs.FIREBASE ? 'connected' : 'disconnected'} />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar-on-mobile flex-nowrap [&>button]:flex-shrink-0">
          {deferredPrompt && (
            <button 
              onClick={handleInstall} 
              className="relative p-2 rounded-md border bg-orange-500/10 border-orange-500/50 text-orange-400 hover:bg-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all duration-300 flex items-center gap-2" 
              title="Install App"
            >
              <Download size={16} />
              <span className="text-xs font-bold uppercase hidden sm:inline">Install</span>
            </button>
          )}
          <button 
            id="deploy-btn"
            onClick={handleDeploy} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              isDeploying ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-500 shadow-[0_0_15px_rgba(22,163,74,0.3)]'
            }`}
          >
            <Rocket size={14} className={isDeploying ? 'animate-bounce' : ''} />
            {isDeploying ? 'Deploying...' : 'Deploy to Production'}
          </button>
          <button onClick={handleSaveProject} className="p-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-orange-500/50 hover:text-orange-400 transition-all" title="Save Project">
            <HardDrive size={16} />
          </button>
          <button onClick={() => setIsProjectsVisible(!isProjectsVisible)} className={`relative p-2 rounded-md border transition-all duration-300 ${isProjectsVisible ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle Projects">
            <Folder size={16} />
            {isProjectsVisible && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setIsChatVisible(!isChatVisible)} className={`relative p-2 rounded-md border transition-all duration-300 ${isChatVisible ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle Chat">
            <Bot size={16} />
            {isChatVisible && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setIsSettingsVisible(!isSettingsVisible)} className={`relative p-2 rounded-md border transition-all duration-300 ${isSettingsVisible ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle Settings">
            <Settings size={16} />
            {isSettingsVisible && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setIsPreviewVisible(!isPreviewVisible)} className={`relative p-2 rounded-md border transition-all duration-300 ${isPreviewVisible ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle Preview">
            <Globe size={16} />
            {isPreviewVisible && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setIsConsoleVisible(!isConsoleVisible)} className={`relative p-2 rounded-md border transition-all duration-300 ${isConsoleVisible ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle Console">
            <Terminal size={16} />
            {isConsoleVisible && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setActiveView(activeView === 'code' ? 'dashboard' : 'code')} className={`relative p-2 rounded-md border transition-all duration-300 ${activeView === 'dashboard' ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle View">
            {activeView === 'code' ? <BarChart3 size={16} /> : <Code2 size={16} />}
            <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          </button>
          <button onClick={() => setActiveView('forge')} className={`relative p-2 rounded-md border transition-all duration-300 ${activeView === 'forge' ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="SaaS Forge Control">
            <Workflow size={16} />
            {activeView === 'forge' && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setActiveView('deploy')} className={`relative p-2 rounded-md border transition-all duration-300 ${activeView === 'deploy' ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Deployment Engine">
            <Rocket size={16} />
            {activeView === 'deploy' && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setActiveView('capabilities')} className={`relative p-2 rounded-md border transition-all duration-300 ${activeView === 'capabilities' ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Capability Matrix">
            <ShieldCheck size={16} />
            {activeView === 'capabilities' && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setActiveView('profile')} className={`relative p-2 rounded-md border transition-all duration-300 ${activeView === 'profile' ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="User Profile & Projects">
            <User size={16} />
            {activeView === 'profile' && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
          <button onClick={() => setIsGodMode(!isGodMode)} className={`relative p-2 rounded-md border flex items-center gap-1 transition-all duration-300 ${isGodMode ? 'bg-orange-950/30 border-orange-500/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:border-zinc-700'}`} title="Toggle God Mode">
            {isGodMode ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
            <span className="text-[10px] font-bold uppercase">God Mode</span>
            {isGodMode && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />}
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <ConfirmationOverlay 
        isVisible={isConfirming}
        onConfirm={handleConfirmCode}
        onCancel={handleCancelCode}
        pendingCode={pendingCode}
      />
      
      {activeView === 'landing' ? (
        <main className="flex-1 overflow-y-auto z-10 custom-scrollbar">
          <LandingPage 
            onStart={(plan?: string) => {
              if (plan) {
                setLastAnalyzedIdea(plan);
                setMessages(prev => [...prev, {
                  role: 'user',
                  content: `[PLAN INYECTADO DESDE EL ARQUITECTO]: ${plan}\n\nPor favor, inicia la construcción de este sistema inmediatamente.`
                }]);
              }
              setActiveView(user ? 'code' : 'auth');
            }} 
            onRecycle={handleRecycle}
            onLogin={() => setActiveView('auth')}
            projects={projects}
            systemStrength={systemStrength}
            intelligenceCore={intelligenceCore}
          />
        </main>
      ) : activeView === 'auth' ? (
        <main className="flex-1 overflow-y-auto z-10 custom-scrollbar">
          <AuthPage onComplete={(userData) => {
            setUser(userData);
            setActiveView('code');
          }} />
        </main>
      ) : (
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden z-10 relative">
          
          {/* LEFT PANEL: PROJECTS */}
          <AnimatePresence>
            {isProjectsVisible && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isMobile ? '100%' : 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className={`overflow-hidden ${isMobile ? 'absolute inset-0 z-50 bg-[#050505]' : ''}`}
              >
                <ProjectsPanel 
                  projects={projects}
                  onSelectProject={handleSelectProject}
                  onDeleteProject={handleDeleteProject}
                  onNewProject={handleNewProject}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* LEFT PANEL: SETTINGS */}
          <AnimatePresence>
            {isSettingsVisible && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isMobile ? '100%' : 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className={`overflow-hidden ${isMobile ? 'absolute inset-0 z-50 bg-[#050505]' : ''}`}
              >
                <SettingsPanel 
                  systemPrompt={systemPrompt} 
                  setSystemPrompt={setSystemPrompt} 
                  envs={envs}
                  onUpdateEnvs={handleUpdateEnvs}
                  onInjectKnowledge={handleInjectKnowledge}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* MIDDLE PANEL: AGENT (THE FORGE) */}
          <AnimatePresence>
            {isChatVisible && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isMobile ? '100%' : (isPreviewVisible ? 480 : 600), height: isMobile && isPreviewVisible ? '50%' : '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="border-r border-zinc-800/80 bg-[#0a0a0a] backdrop-blur-2xl flex flex-col flex-shrink-0 relative overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)] w-full md:w-auto"
              >
                {/* Luxurious animated border/glow effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-50" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-orange-500/20 to-transparent opacity-50" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent opacity-50" />
                  <motion.div 
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]"
                  />
                </div>

                {/* Forge Header */}
                <div className="h-14 border-b border-zinc-800/50 flex items-center justify-between px-5 bg-black/40 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping absolute inset-0 opacity-50" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-100">Forge Core</span>
                    <div className="h-4 w-[1px] bg-zinc-800 mx-1" />
                    <EvolutionBadge core={intelligenceCore} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex bg-black/60 p-1 rounded-lg border border-zinc-800/50">
                      <button 
                        onClick={() => {
                          setActiveView('code');
                          setIsPreviewVisible(true);
                          setPreviewMode('both');
                        }}
                        className="px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-widest hover:bg-orange-500/20 transition-all flex items-center gap-2"
                      >
                        <Layers size={12} />
                        <span className="hidden sm:inline">Split View</span>
                      </button>
                    </div>
                    <button onClick={() => setIsChatVisible(false)} className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
                  {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-black/40 border-t border-zinc-800/50 backdrop-blur-md relative z-10">
                {/* Attachment Previews */}
                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3 p-2 bg-[#050505] border border-zinc-800 rounded-xl">
                    {attachments.map((att, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border border-zinc-700/50 bg-black/50 p-1 flex items-center gap-2">
                        {att.type === 'image' ? (
                          <img src={att.preview} alt="preview" className="w-10 h-10 object-cover rounded-md" />
                        ) : att.type === 'pdf' ? (
                          <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-md flex items-center justify-center">
                            <FileText size={18} />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-md flex items-center justify-center">
                            <HardDrive size={18} />
                          </div>
                        )}
                        <span className="text-[10px] text-zinc-400 max-w-[100px] truncate">{att.file.name}</span>
                        <button 
                          type="button"
                          onClick={() => removeAttachment(i)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <form onSubmit={handleSend} className="relative group">
                  <div className="relative flex flex-col gap-2 bg-[#0a0a0a] border border-zinc-800/80 rounded-2xl p-3 shadow-2xl focus-within:border-orange-500/30 transition-all">
                    <textarea 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
                      placeholder="Describe el SaaS multimillonario que quieres construir..."
                      className="w-full bg-transparent border-none focus:ring-0 text-sm p-1 resize-none h-[80px] text-zinc-100 placeholder:text-zinc-600 font-medium outline-none custom-scrollbar"
                    />
                    <div className="flex items-center justify-between border-t border-zinc-800/30 pt-3">
                      <div className="flex items-center gap-2">
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileSelect} 
                          className="hidden" 
                          multiple 
                          accept="image/*,.pdf"
                        />
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="p-2 text-zinc-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-xl transition-all"
                          title="Adjuntar Archivo"
                        >
                          <Paperclip size={16} />
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            const mockDriveFile = new File(["mock content"], "project_specs.pdf", { type: "application/pdf" });
                            setAttachments(prev => [...prev, { file: mockDriveFile, preview: '', type: 'drive' }]);
                          }}
                          className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all"
                          title="Explorar Drive"
                        >
                          <Cloud size={16} />
                        </button>
                      </div>
                      <button 
                        type="submit"
                        disabled={!chatInput.trim() && attachments.length === 0}
                        className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-black font-bold text-xs uppercase tracking-widest rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="hidden sm:inline">Ejecutar Forja</span>
                        <span className="sm:hidden">Ejecutar</span>
                        <Zap size={14} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
          </AnimatePresence>

          {/* RIGHT PANEL: PREVIEW */}
          {isPreviewVisible && (
            <div className="flex-1 flex flex-col min-w-0 bg-black p-2 gap-2">
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-t-2xl backdrop-blur-md">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-orange-500 animate-ping absolute inset-0 opacity-75" />
                      <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)] relative" />
                    </div>
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em]">Live Forge Preview</span>
                  </div>
                  
                  <div className="h-4 w-[1px] bg-zinc-800" />
                  
                  <div className="flex bg-black/40 p-1 rounded-lg border border-zinc-800/50">
                    {[
                      { id: 'code', label: 'Preview', icon: Globe },
                      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                      { id: 'forge', label: 'Forge', icon: Cpu },
                      { id: 'capsule', label: 'Recycle', icon: Recycle },
                      { id: 'deploy', label: 'Deploy', icon: Terminal }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id as any)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold transition-all ${
                          activeView === tab.id 
                            ? 'bg-orange-500 text-black shadow-[0_0_10px_rgba(249,115,22,0.3)]' 
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                        }`}
                      >
                        <tab.icon size={12} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex bg-black/40 p-1 rounded-lg border border-zinc-800/50 mr-2">
                    <button 
                      onClick={() => setProjectDependencies({
                        "lucide-react": "latest",
                        "motion": "latest",
                        "recharts": "latest",
                        "clsx": "latest",
                        "tailwind-merge": "latest"
                      })}
                      className="p-1.5 rounded-md transition-all text-zinc-600 hover:text-red-400"
                      title="Reset Dependencies (Fix Crash)"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <div className="w-[1px] h-4 bg-zinc-800 mx-1 self-center" />
                    <button 
                      onClick={() => setPreviewMode('editor')}
                      className={`p-1.5 rounded-md transition-all ${previewMode === 'editor' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'}`}
                      title="Editor Only"
                    >
                      <Code2 size={14} />
                    </button>
                    <button 
                      onClick={() => setPreviewMode('both')}
                      className={`p-1.5 rounded-md transition-all ${previewMode === 'both' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'}`}
                      title="Split View"
                    >
                      <Layers size={14} />
                    </button>
                    <button 
                      onClick={() => setPreviewMode('result')}
                      className={`p-1.5 rounded-md transition-all ${previewMode === 'result' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-600 hover:text-zinc-400'}`}
                      title="Preview Only"
                    >
                      <Globe size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setIsPreviewVisible(false)}
                    className="p-1.5 text-zinc-500 hover:text-white transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="w-full flex-1 rounded-b-lg overflow-hidden border-x border-b border-zinc-800 relative">
                {isConfirming && (
                  <div className="absolute top-4 left-4 z-50 px-3 py-1.5 bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)] animate-pulse">
                    Live Draft Preview
                  </div>
                )}
                {activeView === 'code' ? (
                  <Sandpack
                    template="react"
                    theme="dark"
                    files={{
                      "/App.js": pendingCode || sourceCode,
                      ...projectFiles
                    }}
                    customSetup={{
                      dependencies: {
                        "react": "latest",
                        "react-dom": "latest",
                        ...projectDependencies
                      }
                    }}
                    options={{
                      showNavigator: true,
                      showTabs: true,
                      editorWidthPercentage: previewMode === 'both' ? 50 : (previewMode === 'editor' ? 100 : 0),
                      classes: {
                        "sp-wrapper": "h-full",
                        "sp-layout": "h-full border-none",
                        "sp-preview": previewMode === 'result' ? "w-full" : ""
                      }
                    }}
                  />
                ) : activeView === 'dashboard' ? (
                  <Dashboard initialIdea={lastAnalyzedIdea} />
                ) : activeView === 'forge' ? (
                  <SaaSForgeControl 
                    projects={projects} 
                    onSelectProject={handleSelectProject} 
                    onDeploy={handleDeploy} 
                  />
                ) : activeView === 'deploy' ? (
                  <DeploymentEngine 
                    sourceCode={sourceCode} 
                    autoStart={autoDeploy} 
                    userEmail={user?.email}
                    projectName={projects.find(p => p.status === 'draft')?.name}
                  />
                ) : activeView === 'capsule' ? (
                  <div className="flex-1 flex flex-col bg-[#050505] overflow-y-auto custom-scrollbar">
                    <div className="p-8 max-w-4xl mx-auto w-full space-y-12">
                      <AICapsule 
                        onRecycle={handleRecycle} 
                        projects={projects} 
                        systemStrength={systemStrength}
                        intelligenceCore={intelligenceCore}
                      />
                      
                      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                      
                      <MonetizationCore />
                    </div>
                  </div>
                ) : activeView === 'capabilities' ? (
                  <div className="flex-1 p-8 bg-[#050505] overflow-y-auto custom-scrollbar relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-cover bg-center opacity-[0.03] pointer-events-none" />

                    <div className="max-w-5xl mx-auto relative z-10">
                      <div className="mb-16 text-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                        >
                          Elite Execution Core
                        </motion.div>
                        <h2 className="text-6xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                          Nexus SaaS Forge <span className="text-orange-500">v4.0</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                          Sistemas de ejecución autónoma con control total sobre el stack tecnológico.
                          Diseñado para la creación de SaaS multimillonarios con estética de lujo y rendimiento extremo.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {intelligenceCore.skills.map((skill, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <SkillBadge skill={skill} />
                          </motion.div>
                        ))}
                      </div>

                      {/* Blueprints & Patterns Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {/* Blueprints */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                              <FileCode className="text-orange-400" size={18} />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider italic">Blueprints Adquiridos</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {intelligenceCore.blueprints.length > 0 ? (
                              intelligenceCore.blueprints.map((bp, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/30 transition-all group"
                                >
                                  <div className="text-orange-400 font-bold text-sm mb-1 uppercase tracking-tight group-hover:text-orange-300 transition-colors">{bp.name}</div>
                                  <div className="text-zinc-500 text-xs line-clamp-2 italic leading-relaxed">{bp.content}</div>
                                </motion.div>
                              ))
                            ) : (
                              <div className="p-8 rounded-xl bg-zinc-900/30 border border-dashed border-zinc-800 text-center text-zinc-600 text-sm italic">
                                No se han sintetizado blueprints aún.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Patterns */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                              <Zap className="text-blue-400" size={18} />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider italic">Patrones de Lógica</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            {intelligenceCore.patterns.length > 0 ? (
                              intelligenceCore.patterns.map((pt, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-all group"
                                >
                                  <div className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-tight group-hover:text-blue-300 transition-colors">{pt.name}</div>
                                  <div className="text-zinc-500 text-xs line-clamp-2 italic leading-relaxed">{pt.logic}</div>
                                </motion.div>
                              ))
                            ) : (
                              <div className="p-8 rounded-xl bg-zinc-900/30 border border-dashed border-zinc-800 text-center text-zinc-600 text-sm italic">
                                No se han sintetizado patrones aún.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Brain size={64} className="text-blue-500" />
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <Brain size={20} />
                            </div>
                            <h4 className="font-black text-white uppercase tracking-widest italic">Evolution Level</h4>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold italic">Nivel {intelligenceCore.evolutionLevel}</span>
                              <span className="text-sm font-black text-blue-400 italic">{intelligenceCore.totalIntelligence} IQ</span>
                            </div>
                            <div className="h-3 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/30 p-[2px]">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(intelligenceCore.totalIntelligence % 100)}%` }}
                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                              />
                            </div>
                            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                              La inteligencia del sistema evoluciona con cada síntesis. Próximo nivel en {100 - (intelligenceCore.totalIntelligence % 100)} IQ.
                            </p>
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-orange-500/30 transition-all group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity size={64} className="text-orange-500" />
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              <Activity size={20} />
                            </div>
                            <h4 className="font-black text-white uppercase tracking-widest italic">Memory Expansion v4.0</h4>
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            Capacidad de memoria expandida a <span className="text-orange-400 font-bold italic">128K tokens</span>. 
                            El agente ahora retiene contextos complejos de arquitectura, lógica de negocio y estructuras multi-archivo sin pérdida de coherencia en proyectos de gran escala.
                          </p>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-orange-500/30 transition-all group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap size={64} className="text-amber-500" />
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Zap size={20} />
                            </div>
                            <h4 className="font-black text-white uppercase tracking-widest italic">System Muscle Strength</h4>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Current Power Level</span>
                              <span className="text-sm font-black text-amber-400 italic">{systemStrength}%</span>
                            </div>
                            <div className="h-3 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-700/30 p-[2px]">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${systemStrength}%` }}
                                className="h-full bg-gradient-to-r from-amber-600 to-orange-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                              />
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                              Alimentado por el reciclaje de inteligencia de proyectos y datos crudos. A mayor fuerza, mejores resultados en la forja de SaaS.
                            </p>
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-orange-500/30 transition-all group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap size={64} className="text-orange-500" />
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                              <Zap size={20} />
                            </div>
                            <h4 className="font-black text-white uppercase tracking-widest italic">Ultra-Fast Execution</h4>
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            Motor de renderizado optimizado para previsualizaciones instantáneas (<span className="text-orange-400 font-bold italic">1.2s avg build</span>). 
                            Generación de código en paralelo y gestión de dependencias en el Edge para un flujo de trabajo ininterrumpido.
                          </p>
                        </motion.div>
                      </div>

                      <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-600/10 to-amber-600/5 border border-orange-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                          <Crown className="text-orange-500/20 w-32 h-32 -rotate-12" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                            <h3 className="text-xl font-black text-white uppercase tracking-widest italic">God Mode: Active</h3>
                          </div>
                          <p className="text-zinc-400 mb-6 max-w-xl">
                            El agente tiene permisos de nivel administrativo para ejecutar cambios estructurales, 
                            gestionar secretos y desplegar infraestructura en producción sin intervención humana.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {['READ_WRITE', 'EXEC_SHELL', 'DEPLOY_PROD', 'AUTH_ADMIN', 'DB_OWNER', 'AI_ORCHESTRATOR'].map((perm) => (
                              <span key={perm} className="px-3 py-1 rounded-md bg-black/40 border border-zinc-800 text-[10px] font-mono text-orange-400 uppercase tracking-widest">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeView === 'profile' ? (
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ProfilePage 
                      user={user}
                      projects={projects}
                      onLogout={() => {
                        setUser(null);
                        localStorage.removeItem('nexus_user');
                        setActiveView('landing');
                      }}
                      onSelectProject={handleSelectProject}
                      onDeleteProject={handleDeleteProject}
                    />
                  </div>
                ) : null}
              </div>

              {/* MINI CONSOLE */}
              <AnimatePresence>
                {isConsoleVisible && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 250, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="w-full rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0"
                  >
                    <MiniConsole onSuggestionSelect={handleSuggestionSelect} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
