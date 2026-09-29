import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Terminal, Shield, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: 'INDEX', path: '/' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'ACHIEVEMENTS', path: '/achievements' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface border-b-2 border-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group py-1"
            aria-label="ibnu.dev Homepage"
          >
            <div className="w-8 h-8 bg-accent text-accent-foreground flex items-center justify-center border-2 border-border shadow-brutal-sm group-hover:-translate-y-0.5 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-base tracking-tighter uppercase text-foreground leading-none">
                IBNU<span className="text-accent">.DEV</span>
              </span>
              <span className="font-mono text-[10px] text-muted-foreground font-semibold tracking-wider">
                SYS.PORTFOLIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-accent text-accent-foreground border-2 border-border shadow-brutal-sm'
                      : 'text-foreground hover:bg-surface-muted hover:border-2 hover:border-border/40 border-2 border-transparent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Admin Login shortcut */}
            <Link
              to={user ? '/admin' : '/admin/login'}
              className="ml-3 pl-3 border-l-2 border-border/40 flex items-center gap-1.5 text-xs font-mono font-bold text-muted-foreground hover:text-foreground group transition-colors"
              title={user ? 'Admin Dashboard' : 'Owner Login'}
            >
              <Shield className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
              <span className="hidden lg:inline">{user ? 'DASHBOARD' : 'CMS'}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              to={user ? '/admin' : '/admin/login'}
              className="p-2 border-2 border-border bg-surface-muted shadow-brutal-sm text-foreground"
              aria-label="Admin Access"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-border bg-surface shadow-brutal-sm text-foreground hover:bg-surface-muted focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-border bg-surface px-4 pt-3 pb-6 space-y-2 shadow-brutal">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider border-2 ${
                  isActive
                    ? 'bg-accent text-accent-foreground border-border shadow-brutal-sm'
                    : 'bg-surface-muted text-foreground border-border/40 hover:border-border'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t-2 border-border/20">
            <Link
              to={user ? '/admin' : '/admin/login'}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 font-mono text-xs font-bold text-foreground bg-surface border-2 border-border shadow-brutal-sm"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                {user ? 'ADMIN DASHBOARD' : 'ADMIN LOGIN'}
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
