import os

base = r'C:\Users\samya\Downloads\samyak-anand-ai-scientist-portfolio\src\components\collaboration'

# Fix 1: AnimatedCursor - remove unused imports and variables
p = os.path.join(base, 'AnimatedCursor.tsx')
s = open(p).read()
s = s.replace("import { useRef, useEffect, useState, useCallback } from 'react';", "import { useRef, useEffect, useState } from 'react';")
s = s.replace("  const { stage, activeAgent, selections, selection, drag, progress, skipRequested } = useBuild();", "  const { stage, skipRequested } = useBuild();")
s = s.replace("""function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
""", "")
s = s.replace("const dt = (now - lastTimeRef.current) / 16.667;", "const dt = 1;")
open(p, 'w').write(s)
print('AnimatedCursor fixed')

# Fix 2: AlignmentGuides - remove unused variables
p = os.path.join(base, 'AlignmentGuides.tsx')
s = open(p).read()
s = s.replace("const { selection, drag, stage, activeAgent, skipRequested } = useBuild();", "const { selection, drag, stage, skipRequested } = useBuild();")
# Remove half and ch variables
s = s.replace("""    const half = r.width / 2;
    const cx = winW / 2;
    const candidates = [
      { pos: r.left - 8, label: 'left' },
      { pos: r.right + 8, label: 'right' },
      { pos: cx, label: 'centre' },
    ];

    for (const g of candidates) {
      if (g.pos < 0 || g.pos > winW) continue;
      guidesList.push({ type: 'v', pos: g.pos, label: g.label });
      meas.push({ type: 'v', pos: g.pos, label: '•' });
    }

    // Horizontal guides: top/bottom edges + centre
    const ch = r.height / 2;
    const cy = winH / 2;
    const hCandidates = [
      { pos: r.top - 8, label: 'top' },
      { pos: r.bottom + 8, label: 'bottom' },
      { pos: cy, label: 'centre' },
    ];
    for (const g of hCandidates) {
      if (g.pos < 0 || g.pos > winH) continue;
      guidesList.push({ type: 'h', pos: g.pos, label: g.label });
      meas.push({ type: 'h', pos: g.pos, label: '•' });
    }""", """    const candidates = [
      { pos: r.left - 8, label: 'left' },
      { pos: r.right + 8, label: 'right' },
      { pos: winW / 2, label: 'centre' },
    ];

    for (const g of candidates) {
      if (g.pos < 0 || g.pos > winW) continue;
      guidesList.push({ type: 'v', pos: g.pos, label: g.label });
      meas.push({ type: 'v', pos: g.pos, label: '•' });
    }

    // Horizontal guides: top/bottom edges + centre
    const hCandidates = [
      { pos: r.top - 8, label: 'top' },
      { pos: r.bottom + 8, label: 'bottom' },
      { pos: winH / 2, label: 'centre' },
    ];
    for (const g of hCandidates) {
      if (g.pos < 0 || g.pos > winH) continue;
      guidesList.push({ type: 'h', pos: g.pos, label: g.label });
      meas.push({ type: 'h', pos: g.pos, label: '•' });
    }""")
open(p, 'w').write(s)
print('AlignmentGuides fixed')

# Fix 3: BuildOrchestrator - remove unused useCallback
p = os.path.join(base, 'BuildOrchestrator.tsx')
s = open(p).read()
s = s.replace("import { useEffect, useRef, useCallback } from 'react';", "import { useEffect, useRef } from 'react';")
open(p, 'w').write(s)
print('BuildOrchestrator fixed')
