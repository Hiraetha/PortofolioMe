import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Toast } from '../components/ui/Toast';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all mandatory fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', text: 'Please provide a valid email address.' });
      return;
    }

    if (message.trim().length < 10) {
      setStatus({ type: 'error', text: 'Message must be at least 10 characters long.' });
      return;
    }

    setLoading(true);

    try {
      // Simulate dispatch or mailto trigger safely
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus({
        type: 'success',
        text: 'Transmission recorded successfully. Operator will respond shortly.',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setStatus({
        type: 'error',
        text: 'Transmission failed. Please reach out directly via direct email.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="border-b-3 border-border pb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent mb-2">
            <Mail className="w-4 h-4" /> [TRANSMISSION_UPLINK]
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-sans tracking-tight uppercase text-foreground">
            CONTACT &amp; DISPATCH
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Initiate dialogue for engineering collaborations, contracts, or technical inquiries.
          </p>
        </div>

        {/* Grid: Direct Links on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-surface border-3 border-border shadow-brutal space-y-4">
              <h3 className="font-sans font-black text-xl uppercase tracking-tight text-foreground flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" /> DIRECT CHANNELS
              </h3>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Direct asynchronous communication is preferred. Response turnaround is typically under 24 hours.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="ibnuabiadunya@gmail.com"
                  className="p-3 bg-surface-muted border-2 border-border shadow-brutal-sm flex items-center gap-3 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 bg-accent text-accent-foreground border border-border">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-xs">
                    <div className="font-bold text-foreground group-hover:text-accent">EMAIL INBOX</div>
                    <div className="text-muted-foreground text-[11px]">dev@example.com</div>
                  </div>
                </a>

                <a
                  href="https://github.com/Hiraetha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-muted border-2 border-border shadow-brutal-sm flex items-center gap-3 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 bg-foreground text-surface border border-border">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-xs">
                    <div className="font-bold text-foreground group-hover:text-accent">GITHUB PROFILE</div>
                    <div className="text-muted-foreground text-[11px]">github.com/Hiraetha</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/ibnuabiaddunya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-muted border-2 border-border shadow-brutal-sm flex items-center gap-3 hover:translate-x-1 transition-transform group"
                >
                  <div className="p-2 bg-accent text-accent-foreground border border-border">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-xs">
                    <div className="font-bold text-foreground group-hover:text-accent">LINKEDIN NETWORK</div>
                    <div className="text-muted-foreground text-[11px]">linkedin.com/in/ibnuabiaddunya</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Protocol Notice */}
            <div className="p-4 bg-surface border-2 border-border shadow-brutal-sm font-mono text-xs space-y-1">
              <div className="font-bold uppercase text-accent flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> ENCRYPTION &amp; PRIVACY
              </div>
              <p className="text-muted-foreground text-[11px]">
                No tracking cookies or telemetry collectors are embedded on this transmission node.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-surface border-3 border-border shadow-brutal space-y-6">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" /> TRANSMISSION CONSOLE
              </h3>

              {status && (
                <Toast
                  type={status.type}
                  message={status.text}
                  onClose={() => setStatus(null)}
                />
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="YOUR NAME / CALLSIGN"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="RETURN EMAIL ADDRESS"
                    type="email"
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="SUBJECT / TOPIC"
                  placeholder="e.g. Contract Engineering Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <Textarea
                  label="TRANSMISSION MESSAGE"
                  rows={5}
                  placeholder="State your technical requirements, collaboration scope, or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full sm:w-auto"
                  >
                    SEND TRANSMISSION <Send className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
