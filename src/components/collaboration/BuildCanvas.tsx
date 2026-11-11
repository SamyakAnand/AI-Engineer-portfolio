'use client';

import { useBuild } from './BuildContext';

export default function BuildCanvas() {
  const { progress, status, skip } = useBuild();
  const percent = Math.round(progress * 100);

  return (
    <div id="build-canvas" className="build-canvas" aria-label="Unfinished portfolio design canvas">
      <div className="build-canvas__grid" aria-hidden="true" />
      <div className="build-canvas__frame" aria-hidden="true">
        <span className="build-canvas__corner build-canvas__corner--tl" />
        <span className="build-canvas__corner build-canvas__corner--tr" />
        <span className="build-canvas__corner build-canvas__corner--bl" />
        <span className="build-canvas__corner build-canvas__corner--br" />
        <span className="build-canvas__frame-label">SAMYAK / PORTFOLIO CANVAS</span>
      </div>
      <div className="build-canvas__status" id="workspace-status" data-build-layer="Workspace status">
        <span className="build-canvas__status-dot" />
        <span>{status}</span>
        <span className="build-canvas__status-count">ANIME DUEL / HERO × VILLAIN</span>
      </div>
      <button className="build-canvas__skip" type="button" onClick={skip}>Skip build <span aria-hidden="true">↗</span></button>
      <div className="build-canvas__footer" aria-hidden="true">
        <span>REAL DOM ASSEMBLY</span>
        <div className="build-canvas__progress"><span style={{ width: `${percent}%` }} /></div>
        <span>{String(percent).padStart(2, '0')}%</span>
      </div>
      <div className="build-canvas__ghost" aria-hidden="true">
        <span className="build-canvas__ghost-line build-canvas__ghost-line--short" />
        <span className="build-canvas__ghost-line" />
        <span className="build-canvas__ghost-line build-canvas__ghost-line--long" />
        <span className="build-canvas__ghost-caption">Waiting for the first component</span>
      </div>
    </div>
  );
}
