import React, { useEffect, useState } from 'react';
import { User, MapPin, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { getProfile } from '../services/profile';
import { Profile, TimelineItem } from '../types';
import { MOCK_TIMELINE } from '../lib/mockData';
import { LoadingState } from '../components/ui/States';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [timeline] = useState<TimelineItem[]>(MOCK_TIMELINE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingState message="FETCHING OPERATOR PROFILE..." />;
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="border-b-3 border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-2">
            <User className="w-4 h-4" /> [OPERATOR_DOSSIER]
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-sans tracking-tight uppercase text-foreground">
            ABOUT &amp; PHILOSOPHY
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Identity, core engineering convictions, and background trajectory.
          </p>
        </div>

        {/* Editorial Statement */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            {profile?.avatar_url ? (
              <div className="border-3 border-border shadow-brutal aspect-square overflow-hidden bg-surface-muted">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover filter contrast-125"
                />
              </div>
            ) : (
              <div className="aspect-square border-3 border-border bg-surface-muted flex items-center justify-center font-mono text-xs">
                [OPERATOR_PORTRAIT]
              </div>
            )}

            <div className="p-4 bg-surface border-2 border-border shadow-brutal-sm space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border/30 pb-1.5">
                <span className="text-muted-foreground uppercase font-bold">NAME:</span>
                <span className="font-bold text-foreground">{profile?.name || 'Ibnu Abi Ad-Dunya'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/30 pb-1.5">
                <span className="text-muted-foreground uppercase font-bold">EDUCATION:</span>
                <span className="font-bold text-foreground">SMKN 12 Jakarta</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/30 pb-1.5">
                <span className="text-muted-foreground uppercase font-bold">ROLE:</span>
                <span className="font-bold text-accent">{profile?.role || 'Software Engineer'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground uppercase font-bold">LOCATION:</span>
                <span className="font-bold text-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent" /> {profile?.location_label || 'Indonesia'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <blockquote className="p-6 bg-surface border-3 border-border shadow-brutal text-xl sm:text-2xl font-black font-sans uppercase tracking-tight leading-snug">
              &ldquo;Software architecture is not merely about writing lines of code; it is about crafting resilient, maintainable, and pragmatic systems that empower people.&rdquo;
            </blockquote>

            <div className="font-mono text-sm sm:text-base text-foreground/90 space-y-4 leading-relaxed">
              <p>
                {profile?.bio ||
                  'Software engineer passionate about modern system architectures, resilient distributed backends, clean interfaces, and developer tooling. Experienced across modern TypeScript, React, React Native, NestJS, and cloud infrastructure.'}
              </p>
              <p>
                I believe in high contrast, intentional design, and deep technical rigor. Rather than chasing ephemeral framework churn, I prioritize foundational computer science fundamentals, type safety, testability, and fast edge delivery.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-surface-muted border-2 border-border shadow-brutal-sm space-y-1">
                <div className="flex items-center gap-1.5 font-sans font-bold text-sm uppercase text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent" /> 01. Strict Type Safety
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  Zero room for runtime ambiguities. End-to-end contracts from PostgreSQL to UI components.
                </p>
              </div>
              <div className="p-4 bg-surface-muted border-2 border-border shadow-brutal-sm space-y-1">
                <div className="flex items-center gap-1.5 font-sans font-bold text-sm uppercase text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent" /> 02. Tactile Brutalism
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  Interfaces that feel physical, confident, accessible, and fast on every screen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Career & Learning Timeline */}
        <section className="space-y-8 pt-8 border-t-3 border-border">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent">
            <Briefcase className="w-4 h-4" /> [TRAJECTORY_CHRONICLE]
          </div>
          <h2 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
            ENGINEERING MILESTONES &amp; JOURNEY
          </h2>

          <div className="relative border-l-3 border-border ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {timeline.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Marker */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 bg-accent border-2 border-border shadow-brutal-sm group-hover:scale-125 transition-transform" />

                <div className="p-5 bg-surface border-2 border-border shadow-brutal space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-mono">
                    <span className="font-bold text-accent uppercase">{item.type || 'EVENT'}</span>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </span>
                  </div>
                  <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
