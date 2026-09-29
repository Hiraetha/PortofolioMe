import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderGit2, Trophy, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { TerminalHeroCard } from '../components/home/TerminalHeroCard';
import { TechStackSection } from '../components/home/TechStackSection';
import { ProjectCard } from '../components/projects/ProjectCard';
import { AchievementCard } from '../components/achievements/AchievementCard';
import { LoadingState } from '../components/ui/States';
import { getPublishedProjects, subscribeToProjects } from '../services/projects';
import { getAchievements } from '../services/achievements';
import { getTechnologies } from '../services/technologies';
import { getProfile } from '../services/profile';
import { Project, Achievement, Technology, Profile } from '../types';

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, projsData, achsData, techsData] = await Promise.all([
          getProfile(),
          getPublishedProjects(),
          getAchievements(),
          getTechnologies(),
        ]);
        setProfile(profData);
        setFeaturedProjects(projsData.filter((p) => p.featured).slice(0, 3));
        setAchievements(achsData.slice(0, 2));
        setTechnologies(techsData);
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to live GitHub commit updates via Supabase Realtime
    const unsubscribe = subscribeToProjects((updatedProject) => {
      setFeaturedProjects((prev) =>
        prev.map((p) => (p.id === updatedProject.id ? { ...p, ...updatedProject } : p))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingState message="BOOTING SYSTEM CORE..." />;
  }

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b-3 border-border bg-surface overflow-hidden">
        {/* Subtle decorative brutalist pattern */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-accent/5 pointer-events-none -z-10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status / Availability Badge */}
              <div className="inline-flex items-center gap-2 p-1.5 pr-3 bg-surface-muted border-2 border-border shadow-brutal-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-border" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  {profile?.availability_status || 'AVAILABLE FOR NEW MISSIONS & HIRES'}
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <p className="font-mono text-xs sm:text-sm font-bold tracking-widest text-accent uppercase">
                  &gt; {profile?.role || 'FULLSTACK DEVELOPER & SYSTEMS ARCHITECT'}
                </p>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-sans tracking-tight uppercase leading-[0.95] text-foreground">
                  {profile?.hero_title || (
                    <>
                      BUILDING DIGITAL <span className="text-accent underline decoration-4 underline-offset-4">PRODUCTS</span> WITH CODE &amp; CURIOSITY.
                    </>
                  )}
                </h1>
              </div>

              {/* Bio description */}
              <p className="font-mono text-sm sm:text-base text-foreground/85 max-w-2xl leading-relaxed border-l-3 border-accent pl-4">
                {profile?.hero_description ||
                  'Architecting scalable backend microservices, performant web applications, and resilient cross-platform mobile experiences with modern software craft.'}
              </p>

              {/* Call to Actions */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link to="/projects">
                  <Button variant="primary" size="lg">
                    EXPLORE PROJECTS <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    TRANSMIT MESSAGE
                  </Button>
                </Link>
              </div>

              {/* Quick Specs / Proof Points */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t-2 border-border/30 max-w-lg">
                <div className="p-3 bg-surface-muted border-2 border-border shadow-brutal-sm">
                  <div className="text-xl sm:text-2xl font-black font-mono">100%</div>
                  <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase">TYPE-SAFE TS</div>
                </div>
                <div className="p-3 bg-surface-muted border-2 border-border shadow-brutal-sm">
                  <div className="text-xl sm:text-2xl font-black font-mono">FAST</div>
                  <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase">EDGE VERCEL</div>
                </div>
                <div className="p-3 bg-surface-muted border-2 border-border shadow-brutal-sm">
                  <div className="text-xl sm:text-2xl font-black font-mono">STRICT</div>
                  <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase">SUPABASE RLS</div>
                </div>
              </div>
            </div>

            {/* Right Terminal Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <TerminalHeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Tech Stack Section */}
      <TechStackSection technologies={technologies} />

      {/* 3. Featured Projects Section */}
      <section className="py-16 sm:py-24 border-b-3 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-border gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-2">
                <FolderGit2 className="w-4 h-4" /> [SHOWCASE_PORTFOLIO]
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-foreground uppercase">
                FEATURED PROJECTS
              </h2>
            </div>
            <Link to="/projects">
              <Button variant="secondary" size="md">
                ALL REPOSITORIES ({featuredProjects.length}+) <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="space-y-8">
              {/* First featured project gets wide layout */}
              <ProjectCard project={featuredProjects[0]} featuredLayout={true} />

              {/* Other featured projects in 2-col grid */}
              {featuredProjects.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredProjects.slice(1).map((proj) => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-surface border-2 border-border font-mono text-sm">
              NO FEATURED PROJECTS PUBLISHED YET.
            </div>
          )}
        </div>
      </section>

      {/* 4. Credentials & Achievements Section */}
      <section className="py-16 sm:py-24 border-b-3 border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-2 border-border gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-2">
                <Trophy className="w-4 h-4" /> [VALIDATED_CREDENTIALS]
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-foreground uppercase">
                ACHIEVEMENTS &amp; HONORS
              </h2>
            </div>
            <Link to="/achievements">
              <Button variant="outline" size="sm">
                VIEW ALL RECORDS <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Philosophy / Transmission CTA */}
      <section className="py-16 sm:py-24 bg-foreground text-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-3 border-surface p-8 sm:p-12 shadow-[8px_8px_0px_#ff5500] bg-[#14161a]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff5500] text-white font-mono text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" /> READY FOR DEPLOYMENT
                </div>
                <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
                  NEED A HIGH-VELOCITY FULLSTACK ENGINEER?
                </h2>
                <p className="font-mono text-sm text-gray-300 max-w-2xl leading-relaxed">
                  Available for technical leadership, production web/mobile application architecture, backend API engineering, and consulting.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="w-full">
                    GET IN TOUCH <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="secondary" size="lg" className="w-full">
                    READ BIOGRAPHY
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
