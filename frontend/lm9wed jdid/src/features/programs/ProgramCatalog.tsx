import React from 'react';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { PROGRAMS } from '../../types/program';
import type { School, DegreeLevel } from '../../types/program';
import { ProgramCard } from './ProgramCard';
import { Button } from '../../components/ui/Button';
import { cn } from '../../lib/utils';

export const ProgramCatalog: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [layout, setLayout] = React.useState<'grid' | 'list'>('grid');
  const [selectedSchool, setSelectedSchool] = React.useState<School | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = React.useState<DegreeLevel | 'all'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const filteredPrograms = PROGRAMS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesSchool = selectedSchool === 'all' || p.school === selectedSchool;
    const matchesLevel = selectedLevel === 'all' || p.level === selectedLevel;
    return matchesSearch && matchesSchool && matchesLevel;
  });

  const schools: School[] = ['Management & IT', 'Hôtellerie & Tourisme'];
  const levels: DegreeLevel[] = ['Téchnicien', 'Téchnicien Spécialisé', 'Bachelor', 'Master', 'Doctorat'];

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-primary-900 mb-2">Catalogue des Programmes</h1>
              <p className="text-neutral-500">Trouvez la formation qui propulsera votre carrière.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-neutral-100 p-1 rounded-lg">
                <button 
                  onClick={() => setLayout('grid')}
                  className={cn("p-2 rounded-md transition-all", layout === 'grid' ? "bg-white shadow-sm text-primary-500" : "text-neutral-400")}
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setLayout('list')}
                  className={cn("p-2 rounded-md transition-all", layout === 'list' ? "bg-white shadow-sm text-primary-500" : "text-neutral-400")}
                >
                  <List size={20} />
                </button>
              </div>
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Filter size={18} className="mr-2" /> Filtres
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-72 shrink-0 space-y-10">
            <div>
              <h3 className="font-bold text-primary-900 mb-6 flex items-center gap-2">
                <SlidersHorizontal size={18} />
                Filtres avancés
              </h3>
              
              <div className="space-y-8">
                {/* School Filter */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">École</label>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedSchool('all')}
                      className={cn("w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all", 
                        selectedSchool === 'all' ? "bg-primary-50 text-primary-600 ring-1 ring-primary-500/20" : "text-neutral-600 hover:bg-white")}
                    >
                      Toutes les écoles
                    </button>
                    {schools.map(school => (
                      <button 
                        key={school}
                        onClick={() => setSelectedSchool(school)}
                        className={cn("w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all", 
                          selectedSchool === school ? "bg-primary-50 text-primary-600 ring-1 ring-primary-500/20" : "text-neutral-600 hover:bg-white")}
                      >
                        {school}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Niveau d'études</label>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setSelectedLevel('all')}
                      className={cn("w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all", 
                        selectedLevel === 'all' ? "bg-primary-50 text-primary-600 ring-1 ring-primary-500/20" : "text-neutral-600 hover:bg-white")}
                    >
                      Tous les niveaux
                    </button>
                    {levels.map(level => (
                      <button 
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={cn("w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all", 
                          selectedLevel === level ? "bg-primary-50 text-primary-600 ring-1 ring-primary-500/20" : "text-neutral-600 hover:bg-white")}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher une formation (ex: Marketing, IT, RH...)"
                className="w-full bg-white border border-neutral-200 rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Results */}
            {filteredPrograms.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                layout === 'grid' ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"
              )}>
                {filteredPrograms.map(program => (
                  <ProgramCard key={program.id} program={program} layout={layout} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-20 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-primary-900 mb-2">Aucun programme trouvé</h3>
                <p className="text-neutral-500 mb-8">Essayez de modifier vos filtres ou votre recherche.</p>
                <Button variant="outline" onClick={() => { setSearch(''); setSelectedSchool('all'); setSelectedLevel('all'); }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-primary-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl p-6 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-primary-900">Filtres</h3>
              <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
            </div>
            {/* Mobile Filter content replicates sidebar for now */}
            <div className="space-y-8">
              {/* ... filters ... */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
