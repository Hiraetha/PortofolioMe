import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface OutputLine {
  text: string;
  className: string;
}

export const TerminalHeroCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [visibleLinesCount, setVisibleLinesCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const command = 'npx dev-ibnu inspect --stack full --output interactive';

  const outputLines: OutputLine[] = [
    { text: '>> SYSTEM INITIALIZATION OK [STATUS 200]', className: 'text-white font-bold' },
    { text: '> ARCHITECTURE: Fullstack & Cross-Platform Native', className: 'text-gray-300' },
    { text: '> RUNTIME: Node 24 LTS | TypeScript 5.7 Strict', className: 'text-gray-300' },
    { text: '> DATABASE: Supabase PostgreSQL with Strict RLS', className: 'text-gray-300' },
    { text: '> DEPLOYMENT: Vercel Global Edge Network', className: 'text-gray-300' },
    { text: '> READY TO RECEIVE MISSIONS AND CODE COLLABORATION.', className: 'text-[#ff5500] font-bold' },
  ];

  const handleReplay = useCallback(() => {
    setTypedText('');
    setVisibleLinesCount(0);
    setIsTypingDone(false);
    setReplayKey((prev) => prev + 1);
  }, []);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(command);
      setVisibleLinesCount(outputLines.length);
      setIsTypingDone(true);
      return;
    }

    let charIndex = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let lineTimer: ReturnType<typeof setTimeout>;

    // Typing effect for command
    const typeChar = () => {
      if (charIndex <= command.length) {
        setTypedText(command.slice(0, charIndex));
        charIndex++;
        const delay = 35 + Math.random() * 30; // realistic typing rhythm
        typingTimer = setTimeout(typeChar, delay);
      } else {
        // Command finished typing, simulate enter press
        setIsTypingDone(true);
        let currentLine = 0;

        const revealLine = () => {
          if (currentLine <= outputLines.length) {
            setVisibleLinesCount(currentLine);
            currentLine++;
            lineTimer = setTimeout(revealLine, 120);
          }
        };

        lineTimer = setTimeout(revealLine, 250);
      }
    };

    typingTimer = setTimeout(typeChar, 400);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(lineTimer);
    };
  }, [replayKey, prefersReducedMotion, command]);

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#101214] text-[#f4f4f6] border-3 border-border shadow-brutal-lg select-none">
      {/* Terminal Top Bar */}
      <div className="bg-[#181a1f] px-4 py-2.5 flex items-center justify-between border-b-2 border-[#2b2f38]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-none bg-[#ff5500] border border-black" />
          <div className="w-3 h-3 rounded-none bg-[#f59e0b] border border-black" />
          <div className="w-3 h-3 rounded-none bg-[#10b981] border border-black" />
          <span className="ml-2 font-mono text-xs font-bold text-gray-400 tracking-wider">
            bash ~ dev-ibnu-session
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReplay}
            className="flex items-center gap-1.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] text-xs font-mono text-gray-300 border border-gray-700 transition-colors"
            title="Re-run terminal execution"
          >
            <RotateCcw className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] uppercase font-bold hidden sm:inline">RERUN</span>
          </button>

          <button
            onClick={copyCommand}
            className="flex items-center gap-1.5 px-2 py-0.5 bg-[#252830] hover:bg-[#323642] text-xs font-mono text-gray-300 border border-gray-700 transition-colors"
            title="Copy command"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[10px] uppercase font-bold">{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs sm:text-sm space-y-3 overflow-x-auto min-h-[220px]">
        {/* Command Line Prompt */}
        <div className="flex items-center gap-2 text-accent">
          <span className="text-emerald-400 font-bold shrink-0">visitor@developer-ibnu:~$</span>
          <span className="text-white font-semibold">
            {typedText}
            {!isTypingDone && (
              <span className="inline-block w-2.5 h-4 bg-accent align-middle ml-1 animate-pulse" />
            )}
          </span>
        </div>

        {/* Output Section */}
        {visibleLinesCount > 0 && (
          <div className="text-gray-400 text-xs space-y-1.5 pl-2 border-l-2 border-[#ff5500]/60 animate-in fade-in duration-200">
            {outputLines.slice(0, visibleLinesCount).map((line, idx) => (
              <p key={idx} className={line.className}>
                {line.text}
              </p>
            ))}
          </div>
        )}

        {/* Final Active Prompt once typing and output complete */}
        {visibleLinesCount >= outputLines.length && (
          <div className="flex items-center gap-2 text-xs pt-1 animate-in fade-in duration-150">
            <span className="text-emerald-400 font-bold">visitor@developer-ibnu:~$</span>
            <span className="inline-block w-2.5 h-4 bg-accent animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
