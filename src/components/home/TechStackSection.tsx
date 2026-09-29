import React, { useState } from 'react';
import { Technology, TechCategory } from '../../types';
import { Layers, Sparkles } from 'lucide-react';
import { TechLogo } from '../ui/TechIcons';

interface TechStackSectionProps {
  technologies: Technology[];
}

const techRoleMap: Record<string, string> = {
  'React': 'Frontend Library',
  'React Native': 'Mobile Framework',
  'Expo': 'Managed Mobile Runtime',
  'TypeScript': 'Typed Language',
  'HTML': 'Structure & Markup',
  'Tailwind CSS': 'Utility Stylesheet',
  'Bootstrap': 'UI Component Kit',
  'NestJS': 'Backend Framework',
  'Laravel': 'Backend Framework',
  'PHP': 'Core Server Language',
  'Antigravity': 'Agentic Developer Tooling',
  'Antigravity IDE': 'Agentic Developer Tooling',
  'Git': 'Version Control',
  'GitHub': 'Code Repository & CI/CD',
  'Supabase': 'Backend as a Service',
  'Vercel': 'Edge Cloud Deployment',
};

export const TechStackSection: React.FC<TechStackSectionProps> = ({ technologies }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories: (TechCategory | 'ALL')[] = [
    'ALL',
    'Frontend',
    'Backend',
    'Mobile',
    'Tools / Other',
  ];

  const filteredTech = selectedCategory === 'ALL'
    ? technologies
    : technologies.filter((t) => t.category === selectedCategory);

  return (
    <section className="py-16 sm:py-24 border-b-3 border-border bg-surface select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-border gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface-muted border-2 border-border text-[11px] font-mono font-bold text-accent mb-3 shadow-brutal-sm">
              <Layers className="w-3.5 h-3.5" /> STACK &amp; TOOLS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-foreground uppercase">
              TECHNOLOGIES I USE
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed">
            A curated ecosystem of technologies, frameworks, and tools I use to craft fast, scalable, and resilient web &amp; mobile solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all border-2 border-border ${
                selectedCategory === cat
                  ? 'bg-foreground text-surface shadow-brutal-sm translate-x-0.5 translate-y-0.5'
                  : 'bg-surface-muted text-foreground hover:bg-surface shadow-brutal-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Technologies with Authentic 100% Brand Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTech.map((tech) => (
            <div
              key={tech.id}
              className="p-4 sm:p-5 bg-surface border-2 border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-150 flex items-center justify-between gap-4 group relative"
            >
              {/* Left Logo + Name + Role */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-surface-muted border-2 border-border shadow-brutal-sm flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                  <TechLogo name={tech.name} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black font-sans uppercase tracking-tight text-foreground group-hover:text-accent transition-colors truncate">
                      {tech.name}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground truncate">
                    {techRoleMap[tech.name] || tech.description || tech.category}
                  </p>
                </div>
              </div>

              {/* Right Tag / Badge */}
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-surface-muted border border-border">
                  {tech.category}
                </span>
                {(tech.name === 'Antigravity' || tech.name === 'Antigravity IDE') && (
                  <span className="text-[9px] font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> AGENTIC
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
