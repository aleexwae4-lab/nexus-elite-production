import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, AlertTriangle, Code2, Eye } from 'lucide-react';

interface ConfirmationOverlayProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  pendingCode: string | null;
}

export const ConfirmationOverlay: React.FC<ConfirmationOverlayProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  pendingCode,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-zinc-900 border border-orange-500/30 rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.15)] overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-orange-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/40 text-orange-400">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Confirmar Actualización de Código</h2>
                  <p className="text-xs text-zinc-500">El Agente Nexus ha generado cambios. Por favor, revísalos antes de aplicar.</p>
                </div>
              </div>
              <button 
                onClick={onCancel}
                className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Code Diff / Preview Area */}
            <div className="flex-1 overflow-hidden p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-1.5 text-orange-400">
                  <Code2 size={12} /> Nuevo Código Propuesto
                </span>
              </div>
              
              <div className="flex-1 rounded-xl bg-black border border-zinc-800 overflow-hidden relative group">
                <pre className="p-4 text-[11px] font-mono text-zinc-400 leading-relaxed overflow-auto h-full custom-scrollbar">
                  <code>{pendingCode}</code>
                </pre>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[9px] text-zinc-400">
                     READ ONLY PREVIEW
                   </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-6 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-all text-sm font-medium"
              >
                Descartar Cambios
              </button>
              <button
                onClick={onConfirm}
                className="px-8 py-2.5 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition-all text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                <Check size={18} />
                Aplicar y Actualizar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
