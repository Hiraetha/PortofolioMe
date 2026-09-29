import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Trophy, Layers, Eye, Plus, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { getAllProjectsAdmin } from '../../services/projects';
import { getAchievements } from '../../services/achievements';
import { getTechnologies } from '../../services/technologies';
import { Project, Achievement, Technology } from '../../types';
import { LoadingState } from '../../components/ui/States';
import { Button } from '../../components/ui/Button';

export const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllProjectsAdmin(),
      getAchievements(),
      getTechnologies(),
    ])
      .then(([projs, achs, techs]) => {
        setProjects(projs);
        setAchievements(achs);
        setTechnologies(techs);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState message="COMPILING SYSTEM METRICS..." />;
  }

  const publishedCount = projects.filter((p) => p.published).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border pb-6">
        <div>
          <span className="font-mono text-xs font-bold text-accent uppercase">
            [OPERATIONS_COMMAND]
          </span>
          <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
            ADMIN DASHBOARD OVERVIEW
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/projects?create=true">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" /> NEW PROJECT
            </Button>
          </Link>
          <Link to="/admin/achievements?create=true">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" /> NEW ACHIEVEMENT
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-surface border-3 border-border shadow-brutal space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs font-bold uppercase">
            <span>TOTAL PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-sans">{projects.length}</div>
          <div className="font-mono text-[11px] text-muted-foreground">
            {publishedCount} published • {projects.length - publishedCount} draft
          </div>
        </div>

        <div className="p-5 bg-surface border-3 border-border shadow-brutal space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs font-bold uppercase">
            <span>PUBLIC VISIBILITY</span>
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-sans text-emerald-600">
            {publishedCount}
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            {featuredCount} promoted on homepage
          </div>
        </div>

        <div className="p-5 bg-surface border-3 border-border shadow-brutal space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs font-bold uppercase">
            <span>ACCREDITATIONS</span>
            <Trophy className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-sans">{achievements.length}</div>
          <div className="font-mono text-[11px] text-muted-foreground">
            Verified certifications &amp; awards
          </div>
        </div>

        <div className="p-5 bg-surface border-3 border-border shadow-brutal space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs font-bold uppercase">
            <span>REGISTERED TECH</span>
            <Layers className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-sans">{technologies.length}</div>
          <div className="font-mono text-[11px] text-muted-foreground">
            Categorized tools &amp; stacks
          </div>
        </div>
      </div>

      {/* Tables Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects (Col 8) */}
        <div className="lg:col-span-8 bg-surface border-3 border-border shadow-brutal p-6 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-border pb-3">
            <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-accent" /> RECENT SPECIFICATIONS
            </h3>
            <Link
              to="/admin/projects"
              className="font-mono text-xs font-bold text-accent hover:underline flex items-center gap-1"
            >
              VIEW FULL TABLE <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-surface-muted border-b-2 border-border text-foreground font-bold uppercase">
                <tr>
                  <th className="p-2.5">PROJECT</th>
                  <th className="p-2.5">CATEGORY</th>
                  <th className="p-2.5">STATUS</th>
                  <th className="p-2.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border/30">
                {projects.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="p-2.5 font-bold uppercase text-foreground">
                      {p.title}
                      <div className="text-[10px] text-muted-foreground font-normal">
                        /{p.slug}
                      </div>
                    </td>
                    <td className="p-2.5">{p.category || 'General'}</td>
                    <td className="p-2.5">
                      {p.published ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> PUBLISHED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <XCircle className="w-3.5 h-3.5" /> DRAFT
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-right">
                      <Link
                        to={`/admin/projects?edit=${p.id}`}
                        className="text-accent hover:underline font-bold"
                      >
                        MANAGE
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Achievements (Col 4) */}
        <div className="lg:col-span-4 bg-surface border-3 border-border shadow-brutal p-6 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-border pb-3">
            <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" /> ACCREDITATIONS
            </h3>
            <Link
              to="/admin/achievements"
              className="font-mono text-xs font-bold text-accent hover:underline flex items-center gap-1"
            >
              ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {achievements.slice(0, 4).map((a) => (
              <div key={a.id} className="p-3 bg-surface-muted border border-border space-y-1">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-accent uppercase">{a.issuer || 'CREDENTIAL'}</span>
                  <span className="text-muted-foreground">{a.date}</span>
                </div>
                <div className="font-sans font-black text-sm uppercase text-foreground truncate">
                  {a.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
