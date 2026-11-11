'use client';

import { useEffect, useState } from 'react';
import { useBuild } from './BuildContext';

type Guide = { orientation: 'vertical' | 'horizontal'; position: number; label: string };

export default function AlignmentGuides() {
  const { selection, drag, stage } = useBuild();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [measure, setMeasure] = useState('');
  const visible = drag.active || stage === 'alignment';

  useEffect(() => {
    if (!visible || !selection) {
      setGuides([]);
      setMeasure('');
      return;
    }
    const update = () => {
      const element = document.getElementById(selection.element);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const parent = element.closest('section')?.getBoundingClientRect();
      const next: Guide[] = [
        { orientation: 'vertical', position: rect.left, label: 'LEFT EDGE' },
        { orientation: 'vertical', position: rect.left + rect.width / 2, label: 'CENTER' },
        { orientation: 'vertical', position: rect.right, label: 'RIGHT EDGE' },
        { orientation: 'horizontal', position: rect.top, label: 'TOP EDGE' },
        { orientation: 'horizontal', position: rect.top + rect.height / 2, label: 'CENTER' },
        { orientation: 'horizontal', position: rect.bottom, label: 'BASELINE' },
      ];
      if (parent && parent.width > 0) {
        next.push({ orientation: 'vertical', position: parent.left + parent.width / 2, label: 'SECTION AXIS' });
      }
      setGuides(next.filter((guide) => guide.position >= 0 && guide.position <= (guide.orientation === 'vertical' ? window.innerWidth : window.innerHeight)));
      setMeasure(`${Math.round(rect.width)} × ${Math.round(rect.height)} PX`);
    };
    update();
    const timer = window.setInterval(update, 120);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [visible, selection]);

  if (!visible || !selection) return null;

  return (
    <div className="alignment-guides" aria-hidden="true">
      {guides.map((guide, index) => (
        <div
          key={`${guide.orientation}-${guide.position}-${index}`}
          className={`alignment-guide alignment-guide--${guide.orientation}${guide.label === 'SECTION AXIS' ? ' is-axis' : ''}`}
          style={guide.orientation === 'vertical' ? { left: guide.position } : { top: guide.position }}
        >
          <span>{guide.label}</span>
        </div>
      ))}
      <div className="alignment-guides__measure">{measure} · SNAP</div>
    </div>
  );
}
