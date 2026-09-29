import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Calendar, Tag, GitCommit } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';

export interface ProjectCardProps {
  project: Project;
  featuredLayout?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featuredLayout = false }) => {
  const formattedDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : null;

  return (
    <article
      className={`group relative flex flex-col bg-surface border-3 border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-150 ${
        featuredLayout ? 'lg:grid lg:grid-cols-12 lg:gap-0' : ''
      }`}
    >
      {/* Cover Image */}
      <div
        className={`relative overflow-hidden border-b-3 border-border bg-surface-muted ${
          featuredLayout ? 'lg:col-span-7 lg:border-b-0 lg:border-r-3' : 'aspect-video'
        }`}
      >
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale contrast-125 group-hover:grayscale-0"
          />
        ) : (
          <div className="w-full h-48 sm:h-64 flex items-center justify-center font-mono text-xs font-bold text-muted-foreground bg-dot-pattern">
            [NO_COVER_IMAGE]
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {project.featured && (
            <Badge variant="accent" size="sm">
              FEATURED
            </Badge>
          )}
          {project.category && (
            <Badge variant="default" size="sm">
              {project.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 flex flex-col justify-between p-5 sm:p-6 ${
          featuredLayout ? 'lg:col-span-5' : ''
        }`}
      >
        <div className="space-y-3">
          {/* Metadata Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-b border-border/30 pb-2">
            {formattedDate && (
              <span className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-accent" /> {formattedDate}
              </span>
            )}
            <span className="font-bold uppercase tracking-widest text-[10px]">
              ID: {project.slug.slice(0, 14)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-foreground uppercase group-hover:text-accent transition-colors">
            <Link to={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm font-mono text-foreground/80 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies?.map((tech) => (
              <Badge key={tech} variant="tech">
                <Tag className="w-2.5 h-2.5 mr-1 text-accent inline" />
                {tech}
              </Badge>
            ))}
          </div>

          {/* Realtime GitHub Commit Sync Badge (Method 2 Webhook) */}
          {project.last_commit_message && (
            <div className="flex items-center gap-1.5 p-2 bg-surface-muted border-2 border-border text-[11px] font-mono text-foreground shadow-brutal-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <GitCommit className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate font-semibold max-w-[200px]" title={project.last_commit_message}>
                {project.last_commit_message}
              </span>
              {project.last_commit_sha && (
                <span className="text-[10px] text-muted-foreground ml-auto uppercase font-bold">
                  #{project.last_commit_sha}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="pt-6 mt-6 border-t-2 border-border/30 flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-foreground hover:text-accent group/link transition-colors"
          >
            EXPLORE SPEC <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-surface hover:bg-surface-muted border-2 border-border shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-foreground"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-accent text-accent-foreground border-2 border-border shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
