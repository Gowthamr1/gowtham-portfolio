import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Mail, Phone, Copy, Check, FileDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface TerminalOutput {
  id: string;
  command?: string;
  response: string | React.ReactNode;
}

export const TerminalContact: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [history, setHistory] = useState<TerminalOutput[]>([
    {
      id: 'init-1',
      response: (
        <div>
          <p className="text-cyan-300 font-bold">Gowtham R — Systems Telemetry Terminal [Version 2.4.0]</p>
          <p className="text-slate-400 text-xs">Type <span className="text-emerald-400">help</span> to view available system commands or click quick-connect cards below.</p>
        </div>
      )
    }
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = terminalBodyRef.current;
    if (body) body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    sound.playClick();

    if (!cleanCmd) return;

    let responseContent: React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        responseContent = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-semibold">Available Commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block">systems</span>: List production systems and architectures</p>
            <p><span className="text-emerald-400 w-24 inline-block">audit</span>: Display real-time concurrency findings</p>
            <p><span className="text-emerald-400 w-24 inline-block">skills</span>: Output verified skill proficiencies</p>
            <p><span className="text-emerald-400 w-24 inline-block">contact</span>: Print direct communication channels</p>
            <p><span className="text-emerald-400 w-24 inline-block">resume</span>: Initiate resume PDF download</p>
            <p><span className="text-emerald-400 w-24 inline-block">clear</span>: Clear terminal console screen</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'systems':
      case 'projects':
        responseContent = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-300 font-semibold">[01] Online Learning Management System (LMS)</p>
            <p className="text-xs text-slate-400">React 18, Django 5.2, PostgreSQL, ReportLab in-memory PDF + QR verification.</p>
            <p className="text-cyan-300 font-semibold">[02] Cinema Booking Engine (MTBS)</p>
            <p className="text-xs text-slate-400">React 19, Django Channels, Daphne ASGI, select_for_update() atomic wallet ledger.</p>
            <p className="text-cyan-300 font-semibold">[03] Travel Booking Platform</p>
            <p className="text-xs text-slate-400">Django + React multi-service booking state machines.</p>
          </div>
        );
        break;

      case 'audit':
        responseContent = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-emerald-400 font-bold">&gt; Concurrency Audit Snapshot:</p>
            <p>1. Full seat map broadcasts on change (never deltas, prevents drift).</p>
            <p>2. Commit-coupled events via transaction.on_commit.</p>
            <p>3. Atomic wallet balance with select_for_update() row locking.</p>
            <p>4. Proactive 30s token refresh interceptor in Axios.</p>
          </div>
        );
        break;

      case 'skills':
        responseContent = (
          <p className="text-xs text-slate-300">
            <strong className="text-cyan-300">Solid:</strong> Python, Django 5.2, DRF, React 18/19, REST APIs, SimpleJWT, Relational Schema Design, Git.<br />
            <strong className="text-emerald-300">Working:</strong> Django Channels, Daphne (ASGI), TypeScript, PostgreSQL, MySQL, ReportLab, Jest.
          </p>
        );
        break;

      case 'contact':
        responseContent = (
          <div className="text-xs space-y-1 text-slate-300">
            <p>Email: <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-cyan-400 underline">{PORTFOLIO_DATA.profile.email}</a></p>
            <p>Phone: <a href={`tel:${PORTFOLIO_DATA.profile.phone}`} className="text-emerald-400 underline">{PORTFOLIO_DATA.profile.phone}</a></p>
            <p>Location: {PORTFOLIO_DATA.profile.location}</p>
          </div>
        );
        break;

      case 'resume':
        responseContent = (
          <p className="text-emerald-400 text-xs">
            &gt; Downloading {PORTFOLIO_DATA.profile.resumeFile}...
          </p>
        );
        sound.playSuccess();
        window.open(`/${PORTFOLIO_DATA.profile.resumeFile}`, '_blank');
        break;

      default:
        responseContent = (
          <p className="text-rose-400 text-xs">
            Command not recognized: "{cmd}". Type <span className="text-cyan-300 font-semibold">help</span> for valid commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { id: String(Date.now()), command: cmd, response: responseContent }
    ]);
  };

  const copyEmail = async () => {
    sound.playSuccess();
    setCopyFailed(false);

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
      } else {
        const helper = document.createElement('textarea');
        helper.value = PORTFOLIO_DATA.profile.email;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        const copied = document.execCommand('copy');
        helper.remove();
        if (!copied) throw new Error('Clipboard command failed');
      }
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopyFailed(true);
      window.setTimeout(() => setCopyFailed(false), 2500);
    }
  };

  return (
    <section id="terminal" className="relative py-24 border-t border-white/5 bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Connect & Dispatch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Initiate Direct Contact
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-light leading-relaxed">
            Open for full-stack engineering roles, systems architecture positions, and internships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CLI Terminal Console */}
          <div className="lg:col-span-7 rounded-2xl border border-cyan-500/30 bg-slate-950 p-5 font-mono shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span>gowtham@command-center:~</span>
              </div>
              <span className="text-[11px] text-cyan-400">active::session</span>
            </div>

            {/* Terminal Body */}
              <div ref={terminalBodyRef} className="min-h-[260px] max-h-[360px] overflow-y-auto space-y-3 text-xs pr-2">
              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  {item.command && (
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="text-slate-500">&gt;</span>
                      <span className="font-semibold">{item.command}</span>
                    </div>
                  )}
                  <div className="pl-4">{item.response}</div>
                </div>
              ))}
              </div>

            {/* Terminal Input Line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputVal);
                setInputVal('');
              }}
              className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs"
            >
              <span className="text-emerald-400 font-bold">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  sound.playKey();
                  setInputVal(e.target.value);
                }}
                placeholder="type 'help', 'systems', 'skills', or 'contact'..."
                className="w-full bg-transparent text-slate-100 outline-none font-mono placeholder:text-slate-600"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-400 text-[11px]"
              >
                ENTER
              </button>
            </form>
          </div>

          {/* Quick-Connect Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Email Card with 1-Click Copy */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#0c1222]/90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email Channel</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Preferred
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 mt-3">
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  onClick={() => sound.playClick()}
                  className="font-mono text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors truncate"
                >
                  {PORTFOLIO_DATA.profile.email}
                </a>

                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copiedEmail && (
                <p className="text-[11px] font-mono text-emerald-400 mt-2 animate-fadeIn">
                  ✓ Email copied to clipboard!
                </p>
              )}
              {copyFailed && (
                <p className="text-[11px] font-mono text-amber-300 mt-2 animate-fadeIn">
                  Copy was blocked — select the email address manually.
                </p>
              )}
            </div>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#0c1222]/90">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct Mobile (E.164)</span>
              </span>
              <a
                href={`tel:${PORTFOLIO_DATA.profile.phone}`}
                onClick={() => sound.playClick()}
                className="font-mono text-base font-bold text-white hover:text-emerald-400 transition-colors block mt-1"
              >
                {PORTFOLIO_DATA.profile.phoneFormatted}
              </a>
              <p className="text-xs text-slate-500 font-mono mt-1">
                India (IST / UTC+5:30) · Direct Voice & WhatsApp
              </p>
            </div>

            {/* Social & Resume Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 hover:border-cyan-500/40 transition-all flex items-center gap-2.5 text-xs font-mono text-slate-200"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>GitHub Repos</span>
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-4 rounded-xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 hover:border-cyan-500/40 transition-all flex items-center gap-2.5 text-xs font-mono text-slate-200"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Download Resume Box */}
            <a
              href={`/${PORTFOLIO_DATA.profile.resumeFile}`}
              download
              onClick={() => sound.playSuccess()}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
