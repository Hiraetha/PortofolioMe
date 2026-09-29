import React, { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, FolderGit2 } from 'lucide-react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { LoadingState, EmptyState, ErrorState } from '../components/ui/States';
import { getPublishedProjects, subscribeToProjects } from '../services/projects';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublishedProjects();
      setProjects(data);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load projects';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    // Subscribe to live GitHub commit updates via Supabase Realtime
    const unsubscribe = subscribeToProjects((updatedProject) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? { ...p, ...updatedProject } : p))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b-3 border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-2">
            <FolderGit2 className="w-4 h-4" /> [INDEX_OF_PROJECTS]
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-sans tracking-tight uppercase text-foreground">
            ENGINEERING WORK &amp; SYSTEMS
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground max-w-2xl">
            Complete archive of public software repositories, production web applications, and backend systems.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 bg-surface border-3 border-border shadow-brutal flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH BY TITLE OR TECH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-muted text-foreground font-mono text-xs font-bold border-2 border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="flex items-center gap-1 font-mono text-xs font-bold text-muted-foreground mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as string)}
                className={`px-3 py-1 font-mono text-xs font-bold uppercase transition-all border-2 border-border ${
                  selectedCategory === cat
                    ? 'bg-accent text-accent-foreground shadow-brutal-sm'
                    : 'bg-surface hover:bg-surface-muted shadow-brutal-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <LoadingState message="PARSING REPOSITORIES..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchProjects} />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            title="NO MATCHING PROJECTS"
            message="No projects matched your active search query or filter."
            actionLabel="RESET FILTERS"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
