import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, AlertCircle, Terminal, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { isSupabaseConfigured } from '../../lib/supabase';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(signInError.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch {
      setError('An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-blueprint-grid flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center border-3 border-border shadow-brutal">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-black font-sans uppercase tracking-tight text-foreground">
          ADMIN GATEWAY
        </h2>
        <p className="mt-1 text-center font-mono text-xs text-muted-foreground uppercase">
          SECURE OPERATOR AUTHENTICATION
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-surface border-3 border-border shadow-brutal-lg p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3 bg-danger/10 border-2 border-danger text-danger font-mono text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isSupabaseConfigured() && (
            <div className="p-3 bg-amber-50 border-2 border-amber-600 text-amber-950 font-mono text-xs space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-accent" /> DEMO / LOCAL MODE DETECTED
              </div>
              <p className="text-[11px] text-amber-900">
                You can sign in with any valid email and 6+ character password (e.g. <code>admin@portfolio.local</code> / <code>admin123</code>).
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="OPERATOR EMAIL"
              type="email"
              placeholder="operator@portfolio.local"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <Input
              label="ACCESS KEY / PASSWORD"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              AUTHENTICATE ACCESS <KeyRound className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          <div className="pt-4 border-t-2 border-border text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> RETURN TO PUBLIC SITE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
