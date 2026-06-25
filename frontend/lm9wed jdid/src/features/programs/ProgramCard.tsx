import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { Program } from '../../types/program';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

interface ProgramCardProps {
  program: Program;
  layout?: 'grid' | 'list';
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, layout = 'grid' }) => {
  const isManagement = program.school === 'Management & IT';

  if (layout === 'list') {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all group">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
            <img 
              src={program.image} 
              alt={program.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white",
                isManagement ? "bg-primary-500" : "bg-school-hospitality"
              )}>
                {program.level}
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                {program.school}
              </span>
              {program.accredited && (
                <div className="flex items-center gap-1 text-success-500 text-[10px] font-bold uppercase">
                  <CheckCircle2 size={14} />
                  Accrédité État
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-display font-bold text-primary-900 mb-3 group-hover:text-primary-500 transition-colors">
              {program.title}
            </h3>
            
            <p className="text-neutral-500 text-sm line-clamp-2 mb-6">
              {program.description}
            </p>
            
            <div className="mt-auto flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={16} />
                <span>{program.language}</span>
              </div>
              <div className="ml-auto">
                <Button variant="ghost" size="sm" asChild className="gap-2">
                  <Link to={`/programs/${program.slug}`}>
                    Voir détails <ChevronRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/5 transition-all group flex flex-col h-full">
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg",
            isManagement ? "bg-primary-500" : "bg-school-hospitality"
          )}>
            {program.level}
          </span>
          {program.featured && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-primary-900 shadow-lg">
              Populaire
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3 flex justify-between items-center">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            {program.school}
          </span>
          {program.accredited && <CheckCircle2 size={16} className="text-success-500" />}
        </div>
        
        <h3 className="text-lg font-display font-bold text-primary-900 mb-4 group-hover:text-primary-500 transition-colors line-clamp-2 min-h-[3.5rem]">
          {program.title}
        </h3>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-sm text-neutral-400 py-4 border-t border-neutral-50">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{program.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe size={16} />
              <span>{program.language}</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full group/btn" asChild>
            <Link to={`/programs/${program.slug}`}>
              Détails du programme
              <ChevronRight size={18} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
