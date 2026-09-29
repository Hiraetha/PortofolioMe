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
    <div className="flex flex-col bg-surface border-3 border-border shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-150 p-5 sm:p-6 justify-between">
      <div>
        {/* Certificate Image if available */}
        {achievement.image_url && (
          <div className="mb-4 aspect-video overflow-hidden border-2 border-border bg-surface-muted relative group">
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

        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent">
            <Award className="w-4 h-4 shrink-0" />
            <span className="uppercase tracking-wider truncate">{achievement.issuer || 'CREDENTIAL'}</span>
          </div>
          {formattedDate && (
            <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
              <Calendar className="w-3 h-3" /> {formattedDate}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-black font-sans tracking-tight text-foreground uppercase mb-2">
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
      <div className="pt-4 mt-4 border-t-2 border-border/30 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> OFFICIAL RECORD
        </span>
        {achievement.certificate_url && (
          <a
            href={achievement.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-accent group transition-colors"
          >
            VIEW CREDENTIAL <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
};
