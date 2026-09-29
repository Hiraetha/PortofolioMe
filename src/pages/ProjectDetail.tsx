import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, Layers, Share2, Check } from 'lucide-react';
import { GithubIcon } from '../components/ui/Icons';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { LoadingState, EmptyState } from '../components/ui/States';
import { getProjectBySlug, getPublishedProjects } from '../services/projects';
import { Project } from '../types';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getProjectBySlug(slug);
        setProject(data);

        // Fetch related projects
        if (data) {
          const all = await getPublishedProjects();
          setRelatedProjects(all.filter((p) => p.slug !== slug).slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to load project detail', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <LoadingState message="DECRYPTING PROJECT MANIFEST..." />;
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <EmptyState
          title="PROJECT RECORD NOT FOUND"
          message={`No active specification was found matching the slug identifier: "${slug}".`}
          actionLabel="RETURN TO ARCHIVE"
          onAction={() => window.history.back()}
        />
      </div>
    );
  }

  const formattedDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;

  return (
    <article className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-border">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO ARCHIVE
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface text-foreground font-mono text-xs font-bold border-2 border-border shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'LINK COPIED' : 'SHARE SPEC'}</span>
            </button>
          </div>
        </div>

        {/* Header Block */}
        <header className="space-y-6">
          <div className="flex flex-wrap gap-2 items-center">
            {project.featured && <Badge variant="accent">FEATURED PROJECT</Badge>}
            {project.category && <Badge variant="default">{project.category}</Badge>}
            {formattedDate && (
              <span className="font-mono text-xs text-muted-foreground flex items-center gap-1 ml-2">
                <Calendar className="w-3.5 h-3.5 text-accent" /> {formattedDate}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight uppercase text-foreground leading-[1.05]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg font-mono text-foreground/90 leading-relaxed border-l-3 border-accent pl-4">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.demo_url && (
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  LAUNCH LIVE DEMO <ExternalLink className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md">
                  VIEW REPOSITORY <GithubIcon className="w-4 h-4 ml-1.5" />
                </Button>
              </a>
            )}
          </div>
        </header>

        {/* Cover Image with Brutalist Border */}
        {project.cover_image && (
          <div className="border-3 border-border shadow-brutal-lg overflow-hidden bg-surface-muted">
            <img
              src={project.cover_image}
              alt={project.title}
              className="w-full h-auto max-h-[550px] object-cover filter contrast-110"
            />
          </div>
        )}

        {/* Technologies Grid */}
        <div className="p-6 bg-surface border-3 border-border shadow-brutal space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-accent" /> TECHNICAL STACK &amp; PROTOCOLS
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <Badge key={tech} variant="tech" size="md">
                <Tag className="w-3 h-3 mr-1 text-accent inline" />
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Detailed Narrative / Architecture Analysis */}
        {project.long_description && (
          <section className="p-6 sm:p-8 bg-surface border-3 border-border shadow-brutal space-y-4">
            <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground">
              ENGINEERING OVERVIEW &amp; SPECIFICATION
            </h3>
            <div className="font-mono text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line space-y-4">
              {project.long_description}
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-10 border-t-3 border-border space-y-6">
            <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-foreground">
              RELATED ARCHITECTURES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  className="p-5 bg-surface border-2 border-border shadow-brutal hover:shadow-brutal-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-accent">
                      {rel.category || 'PROJECT'}
                    </span>
                    <h4 className="font-sans font-black text-lg uppercase text-foreground">
                      <Link to={`/projects/${rel.slug}`} className="hover:text-accent">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/30">
                    <Link
                      to={`/projects/${rel.slug}`}
                      className="font-mono text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      READ SPEC →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
