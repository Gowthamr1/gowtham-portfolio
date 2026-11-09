import React, { useEffect } from 'react';
import { X, Award, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn overflow-y-auto"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span id="certificate-title">Dynamic In-Memory PDF Certificate Architecture</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Generated via Python ReportLab + qrcode · Zero Disk I/O Bottlenecks
            </p>
          </div>
        </div>

        {/* Certificate Mockup Canvas */}
        <div className="relative p-6 sm:p-8 rounded-xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-inner text-center overflow-hidden mb-6">
          {/* Certificate Corner Ornaments */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Digital Credential</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif text-slate-100 font-bold mb-1">
            Certificate of Completion
          </h2>
          <p className="text-xs text-slate-400 mb-4">This certifies that</p>

          <p className="text-lg sm:text-xl font-bold text-cyan-300 tracking-wide mb-2 font-mono">
            Gowtham R
          </p>

          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6">
            has successfully completed the full-stack system curriculum with verified lesson mastery, interactive quiz pass criteria, and automated graduation audit.
          </p>

          {/* Certificate Footer with QR and UUID */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-left">
            <div className="flex items-center gap-3">
              {/* QR Mockup */}
              <div className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center shadow-lg">
                <QrCode className="w-full h-full text-slate-950" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Public QR Verification</span>
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  UUID: <span className="text-slate-300">d8b5c92e-4178-43e8-8a02</span>
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Endpoint: /verify-certificate/&lt;uuid&gt; (No Auth Required)
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-serif text-amber-200/80 italic">Verified by LMS Core</p>
              <p className="text-[10px] font-mono text-slate-400">Digital Signature Valid</p>
            </div>
          </div>
        </div>

        {/* Architectural Insight Callout */}
        <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2.5 mb-4">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-cyan-100">Why this matters:</strong> Unlike static screenshots or generic certificates that can be photoshopped, this certificate is compiled on-the-fly in RAM using ReportLab, stamping a verifiable cryptographic UUID and public verification URL that prospective employers can check without creating an account.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
