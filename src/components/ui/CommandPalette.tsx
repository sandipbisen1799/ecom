'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export interface CommandPaletteItem {
  label: string;
  href: string;
  icon?: string;
  group?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
}

export default function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const navigable = items.filter((item) => item.href && item.href !== '#');
    if (!q) return navigable.slice(0, 8);
    return navigable.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const select = (item: CommandPaletteItem) => {
    router.push(item.href);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = results[activeIndex];
        if (item) select(item);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, activeIndex]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="modal-overlay"
      style={{ alignItems: 'flex-start', paddingTop: '12vh', background: 'rgba(15,23,42,.4)', backdropFilter: 'blur(4px)' }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box" style={{ maxWidth: 560 }} role="dialog" aria-modal="true">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--muted)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, fontFamily: 'Poppins, sans-serif', color: 'var(--text)',
            }}
          />
          <span style={{ fontSize: 11, color: 'var(--muted)', background: '#F3F4F6', padding: '3px 8px', borderRadius: 6 }}>Esc</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: 'auto', padding: 8 }}>
          {results.length === 0 && (
            <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No pages match &ldquo;{query}&rdquo;
            </div>
          )}
          {results.map((item, i) => (
            <button
              key={item.href + item.label}
              type="button"
              onClick={() => select(item)}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8, border: 'none', textAlign: 'left',
                cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: 13,
                background: i === activeIndex ? '#EFF6FF' : 'transparent',
                color: i === activeIndex ? 'var(--accent)' : 'var(--text)',
              }}
            >
              {item.icon && <i className={`fa-solid ${item.icon}`} style={{ width: 16, textAlign: 'center' }} />}
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.group && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.group}</span>}
              <i className="fa-solid fa-arrow-turn-down-left" style={{ fontSize: 11, opacity: i === activeIndex ? 0.7 : 0 }} />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
