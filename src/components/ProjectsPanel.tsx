import React from 'react';
import { motion } from 'motion/react';
import { Folder, Plus, Trash2, ExternalLink, Clock, Code2, Rocket } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  status: 'draft' | 'deployed' | 'error';
  url?: string;
}

interface ProjectsPanelProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ 
  projects, 
  onSelectProject, 
  onDeleteProject, 
  onNewProject 
}) => {
  return (
    <div className="h-full flex flex-col bg-zinc-950 border-r border-zinc-800/50 w-full">
      <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder className="text-orange-500" size={18} />
          <h2 className="text-sm font-bold tracking-widest text-zinc-100 uppercase">Proyectos</h2>
        </div>
        <button 
          onClick={onNewProject}
          className="p-1.5 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-all"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-zinc-600 text-center p-4">
            <Code2 size={32} className="mb-2 opacity-20" />
            <p className="text-xs">No hay proyectos activos.</p>
            <p className="text-[10px] mt-1">Usa el chat para empezar a construir.</p>
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/30 transition-all cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col">
                  <h3 className="text-xs font-bold text-zinc-200 group-hover:text-orange-400 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {project.lastModified}
                  </span>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  project.status === 'deployed' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                  project.status === 'error' ? 'bg-red-500' : 'bg-zinc-600'
                }`} />
              </div>

              <p className="text-[10px] text-zinc-500 line-clamp-2 mb-3 leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-center gap-2">
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-orange-400 hover:bg-zinc-700 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
                {project.status === 'draft' && (
                  <button 
                    className="p-1.5 rounded-md bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(project);
                      // Trigger deploy flow
                      const deployBtn = document.getElementById('deploy-btn');
                      if (deployBtn) deployBtn.click();
                    }}
                  >
                    <Rocket size={12} />
                  </button>
                )}
                <button 
                  className="p-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all ml-auto opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProject(project.id);
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-zinc-800/50 bg-black/20">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
          <span>Capacidad de Almacenamiento</span>
          <span>{projects.length}/10</span>
        </div>
        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500" 
            style={{ width: `${(projects.length / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
