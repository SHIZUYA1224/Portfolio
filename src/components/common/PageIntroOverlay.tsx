'use client';

import { useEffect, useMemo, useState } from 'react';

type PageIntroOverlayProps = {
  storageKey: string;
  title: string;
  body: string;
  tech: string;
  delayMs?: number;
  onDone?: () => void;
};

export default function PageIntroOverlay({
  storageKey,
  title,
  body,
  tech,
  delayMs = 420,
  onDone,
}: PageIntroOverlayProps) {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem(storageKey) === '1';
    if (seen) {
      onDone?.();
      return;
    }

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs, onDone, storageKey]);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const shouldRender = useMemo(() => open, [open]);

  if (!shouldRender) return null;

  const handleClose = () => {
    window.localStorage.setItem(storageKey, '1');
    onDone?.();
    setEntered(false);
    window.setTimeout(() => setOpen(false), 180);
  };

  return (
    <div
      className={`absolute inset-0 z-50 grid place-items-center bg-slate-950/80 backdrop-blur-sm transition-opacity duration-200 ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`w-[min(92vw,560px)] rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl transition-all duration-250 ${
          entered ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0'
        }`}
      >
        <p className="text-lg font-semibold">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-100">{body}</p>
        <p className="mt-3 rounded-lg border border-cyan-300/30 bg-cyan-400/15 px-3 py-2 text-xs text-cyan-100">
          技術: {tech}
        </p>
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm hover:bg-white/15"
          >
            はじめる
          </button>
        </div>
      </div>
    </div>
  );
}
