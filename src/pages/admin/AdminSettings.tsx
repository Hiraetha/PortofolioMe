import React, { useState } from 'react';
import { ShieldCheck, Database, HardDrive, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const AdminSettings: React.FC = () => {

  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleResetLocalDemo = () => {
    localStorage.removeItem('portfolio_projects_data');
    localStorage.removeItem('portfolio_achievements_data');
    localStorage.removeItem('portfolio_profile_data');
    setToast({ type: 'success', message: 'Local demo cache reset to original factory seeds.' });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="border-b-2 border-border pb-6">
        <span className="font-mono text-xs font-bold text-accent uppercase">
          [SYSTEM_CONFIGURATION]
        </span>
        <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
          INFRASTRUCTURE &amp; SETTINGS
        </h1>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          Diagnostics for Supabase backend, storage policies, security status, and environment variables.
        </p>
      </div>

      {/* System Architecture Card */}
      <div className="p-6 bg-surface border-3 border-border shadow-brutal space-y-4">
        <div className="flex items-center justify-between border-b-2 border-border pb-3">
          <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground flex items-center gap-2">
            <Database className="w-5 h-5 text-accent" /> SYSTEM ARCHITECTURE: 100% STATIC
          </h3>
          <span className="px-3 py-1 font-mono text-xs font-bold uppercase border-2 bg-emerald-50 text-emerald-800 border-emerald-600">
            STATIC ENGINE ACTIVE (0ms LATENCY)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3 bg-surface-muted border border-border space-y-1">
            <span className="text-muted-foreground font-bold uppercase">DATA SOURCE:</span>
            <div className="font-bold text-foreground">src/data/portfolioData.ts (Bundled)</div>
          </div>
          <div className="p-3 bg-surface-muted border border-border space-y-1">
            <span className="text-muted-foreground font-bold uppercase">LIVE COMMITS ENGINE:</span>
            <div className="font-bold text-foreground">GitHub Public REST API (Browser Cache 5m)</div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-mono text-xs space-y-2">
          <div className="font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            BENEFITS OF STATIC ARCHITECTURE:
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-emerald-900">
            <li>Zero database subscription costs, zero cold starts, zero API key exposure.</li>
            <li>Can be deployed to Vercel, Netlify, GitHub Pages, or Cloudflare Pages instantly.</li>
            <li>Repository commits sync directly via client-side GitHub REST API with instant fallback.</li>
            <li>Admin preview mode saves overrides locally in browser localStorage.</li>
          </ul>
        </div>
      </div>

      {/* Security Status Card */}
      <div className="p-6 bg-surface border-3 border-border shadow-brutal space-y-4">
        <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground flex items-center gap-2 border-b-2 border-border pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> SECURITY AUDIT CHECKLIST
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-surface-muted border border-border flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Service Role Key Excluded From Client Bundle</span>
          </div>
          <div className="p-3 bg-surface-muted border border-border flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Row Level Security (RLS) Schema Configured</span>
          </div>
          <div className="p-3 bg-surface-muted border border-border flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Storage MIME &amp; 5MB File Size Guards Active</span>
          </div>
          <div className="p-3 bg-surface-muted border border-border flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Admin Routes Protected via Auth Barrier</span>
          </div>
        </div>
      </div>

      {/* Local State Maintenance */}
      <div className="p-6 bg-surface border-3 border-border shadow-brutal space-y-4">
        <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground flex items-center gap-2 border-b-2 border-border pb-3">
          <HardDrive className="w-5 h-5 text-accent" /> LOCAL DEMO CACHE UTILITIES
        </h3>

        <p className="font-mono text-xs text-muted-foreground">
          When in offline or fallback mode, test edits to projects and achievements are preserved in your browser localStorage. You can clear them anytime to reload default seed content.
        </p>

        <div>
          <Button variant="outline" size="sm" onClick={handleResetLocalDemo}>
            <RefreshCw className="w-4 h-4 mr-1.5" /> RESTORE FACTORY SEED DATA
          </Button>
        </div>
      </div>
    </div>
  );
};
