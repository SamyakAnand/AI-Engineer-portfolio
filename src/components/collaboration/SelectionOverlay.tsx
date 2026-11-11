'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useBuild } from './BuildContext';

type Box = { left: number; top: number; width: number; height: number };
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

export default function SelectionOverlay() {
  const { selection, drag } = useBuild();
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    if (!selection) {
      setBox(null);
      return;
    }
    const measure = () => {
      const target = document.getElementById(selection.element);
      if (!target) {
        setBox(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      setBox({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    };
    measure();
    const timer = window.setInterval(measure, 90);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [selection]);

  if (!selection || !box || box.width < 1 || box.height < 1) return null;

  return (
    <div
      className={`selection-overlay${drag.active ? ' is-dragging' : ''}`}
      aria-hidden="true"
      style={{ left: box.left, top: box.top, width: box.width, height: box.height, borderColor: selection.color, '--selection-color': selection.color } as CSSProperties}
      data-selected-element={selection.element}
    >
      <span className="selection-overlay__label">{selection.label}</span>
      <span className="selection-overlay__agent">{selection.agent.toUpperCase()}{drag.active ? ` · ${drag.kind || 'MOVE'}` : ' · SELECTED'}</span>
      {HANDLES.map((handle) => <span key={handle} className={`selection-overlay__handle selection-overlay__handle--${handle}`} />)}
    </div>
  );
}
