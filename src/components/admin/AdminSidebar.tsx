import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderGit2, Trophy, UserCog, Settings, LogOut, Globe, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'OVERVIEW', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'PROJECTS', path: '/admin/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'ACHIEVEMENTS', path: '/admin/achievements', icon: <Trophy className="w-4 h-4" /> },
    { label: 'PROFILE DATA', path: '/admin/profile', icon: <UserCog className="w-4 h-4" /> },
    { label: 'SYS SETTINGS', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-surface border-r-3 border-border flex flex-col justify-between h-full select-none">
      <div>
        {/* Admin Header */}
        <div className="p-4 border-b-2 border-border bg-surface-muted flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-foreground text-surface border border-border">
              <Shield className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="font-sans font-black text-sm uppercase text-foreground">ADMIN CMS</div>
              <div className="font-mono text-[10px] text-muted-foreground font-semibold truncate max-w-[130px]">
                {user?.email || 'authenticated'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all border-2 ${
                  isActive
                    ? 'bg-accent text-accent-foreground border-border shadow-brutal-sm'
                    : 'border-transparent text-foreground hover:bg-surface-muted hover:border-border/40'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Tools */}
      <div className="p-3 border-t-2 border-border space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 bg-surface-muted border border-border text-foreground hover:bg-surface text-xs font-mono font-bold uppercase transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-accent" /> VIEW LIVE SITE
          </span>
          <span className="text-[10px]">↗</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3 py-2 bg-danger/10 hover:bg-danger text-danger hover:text-white border-2 border-danger text-xs font-mono font-bold uppercase transition-colors"
        >
          <span className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" /> TERMINATE SESSION
          </span>
        </button>
      </div>
    </aside>
  );
};
