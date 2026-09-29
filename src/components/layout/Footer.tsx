import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t-3 border-border mt-20 select-none">
      {/* Top Banner / Ticker */}
      <div className="bg-foreground text-surface py-2.5 px-4 overflow-hidden border-b-2 border-border">
        <div className="flex items-center justify-between max-w-7xl mx-auto font-mono text-xs font-bold tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SYSTEM STATUS: ALL SERVICES OPERATIONAL
          </span>
          <span className="hidden sm:inline text-surface/70">
            DEPLOYED VIA VERCEL EDGE & SUPABASE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-accent text-accent-foreground flex items-center justify-center border-2 border-border shadow-brutal-sm">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-sans font-black text-xl tracking-tighter uppercase text-foreground">
                IBNU<span className="text-accent">.DEV</span>
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-md leading-relaxed">
              Personal engineering workspace built with React, TypeScript, Tailwind CSS, Supabase, and Vercel. Embracing high-contrast brutalist aesthetics with pragmatic architecture.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 bg-surface-muted border border-border">REACT 18</span>
              <span className="px-2 py-1 bg-surface-muted border border-border">TYPESCRIPT</span>
              <span className="px-2 py-1 bg-surface-muted border border-border">SUPABASE</span>
              <span className="px-2 py-1 bg-surface-muted border border-border">TAILWIND</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              [INDEX NAVIGATION]
            </h4>
            <ul className="space-y-2 font-mono text-sm font-semibold">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">/ HOME</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-accent transition-colors">/ PROJECTS</Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-accent transition-colors">/ ACHIEVEMENTS</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">/ ABOUT</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">/ CONTACT</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Socials & Terminal Action */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              [TRANSMISSION]
            </h4>
            <div className="flex flex-col gap-2 font-mono text-xs font-bold">
              <a
                href="https://github.com/Hiraetha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-surface-muted border-2 border-border shadow-brutal-sm hover:translate-x-1 hover:shadow-brutal transition-all"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-accent" /> GITHUB
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ibnuabiaddunya/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 bg-surface-muted border-2 border-border shadow-brutal-sm hover:translate-x-1 hover:shadow-brutal transition-all"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-accent" /> LINKEDIN
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="ibnuabiadunya@gmail.com"
                className="flex items-center justify-between p-2 bg-surface-muted border-2 border-border shadow-brutal-sm hover:translate-x-1 hover:shadow-brutal transition-all"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" /> EMAIL
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} IBNU.DEV. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-foreground underline">
              ADMIN CMS
            </Link>
            <span>•</span>
            <span>NEO-BRUTALIST TECH DESIGN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
