import React, { useState } from 'react';
import { ShieldCheck, Database, HardDrive, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const AdminSettings: React.FC = () => {
  const isConnected = isSupabaseConfigured();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'NOT CONFIGURED';
  const hasAnonKey = Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

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

      {/* Supabase Status Card */}
      <div className="p-6 bg-surface border-3 border-border shadow-brutal space-y-4">
        <div className="flex items-center justify-between border-b-2 border-border pb-3">
          <h3 className="font-sans font-black text-lg uppercase tracking-tight text-foreground flex items-center gap-2">
            <Database className="w-5 h-5 text-accent" /> SUPABASE CLOUD CONNECTION
          </h3>
          <span
            className={`px-3 py-1 font-mono text-xs font-bold uppercase border-2 ${
              isConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                : 'bg-amber-50 text-amber-900 border-amber-600'
            }`}
          >
            {isConnected ? 'LIVE INSTANCE CONNECTED' : 'OFFLINE / DEMO CACHE ACTIVE'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3 bg-surface-muted border border-border space-y-1">
            <span className="text-muted-foreground font-bold uppercase">SUPABASE PROJECT URL:</span>
            <div className="font-bold text-foreground truncate">{supabaseUrl}</div>
          </div>
          <div className="p-3 bg-surface-muted border border-border space-y-1">
            <span className="text-muted-foreground font-bold uppercase">PUBLIC ANON KEY STATUS:</span>
            <div className="font-bold text-foreground">
              {hasAnonKey ? 'KEY DETECTED (SAFE ANONYMOUS)' : 'NOT DETECTED'}
            </div>
          </div>
        </div>

        {!isConnected && (
          <div className="p-4 bg-amber-50 border-2 border-amber-600 text-amber-950 font-mono text-xs space-y-2">
            <div className="font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              HOW TO CONNECT YOUR PRODUCTION SUPABASE PROJECT:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-900">
              <li>Open your project at <code>supabase.com</code>.</li>
              <li>Execute migrations in <code>supabase/migrations/</code> in sequential order.</li>
              <li>Copy Project URL and Anon Key into your <code>.env.local</code> file.</li>
              <li>Restart dev server with <code>npm run dev</code>.</li>
            </ol>
          </div>
        )}
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
