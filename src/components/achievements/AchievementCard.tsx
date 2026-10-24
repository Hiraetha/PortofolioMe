import React from 'react';
import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { Achievement } from '../../types';
import { Badge } from '../ui/Badge';

export interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const formattedDate = achievement.date
    ? new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    : null;

  return (
    <div className="flex flex-col bg-surface border-3 border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-150 p-5 sm:p-6 justify-between overflow-hidden">
      <div className="space-y-3.5">
        {/* Certificate Image if available */}
        {achievement.image_url && (
          <div className="aspect-video overflow-hidden border-2 border-border bg-surface-muted relative group">
            <img
              src={achievement.image_url}
              alt={achievement.title}
              loading="lazy"
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
            />
            {achievement.featured && (
              <div className="absolute top-2 left-2">
                <Badge variant="accent" size="sm">
                  VERIFIED
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Metadata Top Bar: Date & Record Identifier */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-b border-border/30 pb-2">
          {formattedDate && (
            <span className="flex items-center gap-1.5 font-semibold text-foreground/90">
              <Calendar className="w-3.5 h-3.5 text-accent" /> {formattedDate}
            </span>
          )}
          <span className="font-bold uppercase tracking-widest text-[10px] ml-auto text-muted-foreground">
            ID: {achievement.id.slice(0, 10)}
          </span>
        </div>

        {/* Issuer Organization Label */}
        <div className="flex items-start gap-1.5 text-xs font-mono font-bold text-accent">
          <Award className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="uppercase tracking-wider break-words leading-tight">
            {achievement.issuer || 'CREDENTIAL'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black font-sans tracking-tight text-foreground uppercase leading-snug">
          {achievement.title}
        </h3>

        {/* Description */}
        {achievement.description && (
          <p className="text-xs font-mono text-foreground/80 leading-relaxed">
            {achievement.description}
          </p>
        )}
      </div>

      {/* Footer / Certificate Link */}
      <div className="pt-4 mt-6 border-t-2 border-border/30 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> OFFICIAL RECORD
        </span>
        {achievement.certificate_url && (
          <a
            href={achievement.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-accent group transition-colors shrink-0"
          >
            VIEW CREDENTIAL <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
};
