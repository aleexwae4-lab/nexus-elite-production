import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Crown, Rocket, Check, MessageSquare, Send, Sparkles, DollarSign, ShieldCheck } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  color: string;
  icon: any;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Forge',
    price: '$19',
    description: 'Para emprendedores iniciando su primer SaaS.',
    features: [
      '1 Proyecto Activo',
      'Soporte AI Estándar',
      'Exportación de Código',
      'Despliegue en Vercel'
    ],
    color: 'zinc',
    icon: Rocket
  },
  {
    id: 'ultra',
    name: 'Ultra Nexus',
    price: '$49',
    description: 'Potencia máxima para startups en crecimiento.',
    features: [
      'Proyectos Ilimitados',
      'Prioridad en la Forja',
      'Integración Supabase/Stripe',
      'Soporte 24/7 Elite',
      'Modo Dios Avanzado'
    ],
    color: 'orange',
    icon: Zap,
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro Empire',
    price: '$199',
    description: 'Infraestructura empresarial para escala masiva.',
    features: [
      'Todo en Ultra',
      'White Labeling',
      'Arquitectura Multi-Tenant',
      'Consultoría de Negocios AI',
      'SLA de Ejecución 99.9%'
    ],
    color: 'amber',
    icon: Crown
  }
];

export const MonetizationCore: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Bienvenido al Centro de Monetización. Soy tu estratega de negocios. ¿Qué plan se alinea con tu visión multimillonaria?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = "Interesante visión. Para ejecutar esa estrategia a escala, recomiendo el plan Ultra Nexus por su capacidad de integración con Stripe.";
      if (input.toLowerCase().includes('empresa') || input.toLowerCase().includes('escala')) {
        response = "Para una operación de ese calibre, el plan Pro Empire es el único que garantiza la infraestructura necesaria.";
      }
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-[#050505] min-h-full custom-scrollbar">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2"
        >
          Monetization & Strategy
        </motion.div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          Escala tu <span className="text-orange-500">Imperio SaaS</span>
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-sm">
          Selecciona el combustible para tu forja. Cada plan está diseñado para maximizar tu ROI y velocidad de mercado.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -5 }}
            className={`relative p-6 rounded-3xl border transition-all duration-500 ${
              plan.popular 
                ? 'bg-orange-500/5 border-orange-500/40 shadow-[0_20px_50px_rgba(249,115,22,0.1)]' 
                : 'bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                Más Popular
              </div>
            )}
            
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl ${plan.color === 'orange' ? 'bg-orange-500/20 text-orange-400' : plan.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-400'}`}>
                <plan.icon size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">{plan.price}</div>
                <div className="text-[10px] text-zinc-500 uppercase font-bold">/ mes</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight italic">{plan.name}</h3>
            <p className="text-xs text-zinc-500 mb-6 leading-relaxed">{plan.description}</p>

            <div className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <Check size={14} className="text-orange-500" />
                  {feature}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                plan.popular 
                  ? 'bg-orange-500 text-black hover:bg-orange-400 shadow-[0_10px_20px_rgba(249,115,22,0.2)]' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              Seleccionar Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* Strategy Chat */}
      <div className="flex-1 flex flex-col bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-zinc-800/50 bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Business Strategist AI</span>
          </div>
          <ShieldCheck size={16} className="text-zinc-600" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'ai' 
                  ? 'bg-zinc-800/50 border border-zinc-800 text-zinc-300 rounded-tl-none' 
                  : 'bg-orange-500/10 border border-orange-500/20 text-zinc-100 rounded-tr-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-zinc-800/50">
          <div className="relative flex items-center gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre estrategias de monetización o planes..."
              className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-all"
            />
            <button 
              type="submit"
              className="p-3 bg-orange-500 text-black rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-8 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <DollarSign size={14} /> Secure Payments by Stripe
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <Sparkles size={14} /> AI Powered by Gemini
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <Crown size={14} /> Enterprise Ready
        </div>
      </div>
    </div>
  );
};
