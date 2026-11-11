'use client';

import React, { forwardRef } from 'react';
import type { CharacterDef } from './CharacterRegistry';

import NarutoCursor from './NarutoCursor';
import SasukeCursor from './SasukeCursor';
import LuffyCursor from './LuffyCursor';
import ZoroCursor from './ZoroCursor';
import SanjiCursor from './SanjiCursor';
import IchigoCursor from './IchigoCursor';
import GonCursor from './GonCursor';
import KilluaCursor from './KilluaCursor';
import TanjiroCursor from './TanjiroCursor';
import ZenitsuCursor from './ZenitsuCursor';
import InosukeCursor from './InosukeCursor';

interface CharacterCursorProps {
  def: CharacterDef;
  isMoving?: boolean;
  facingLeft?: boolean;
  inShowdown?: boolean;
  statusText?: string;
  speechText?: string | null;
  onSelect?: () => void;
}

const CharacterCursor = forwardRef<HTMLDivElement, CharacterCursorProps>(function CharacterCursor(
  { def, isMoving = false, facingLeft = false, inShowdown = false, statusText, speechText, onSelect },
  ref
) {
  const renderArtwork = () => {
    switch (def.id) {
      case 'naruto':
        return <NarutoCursor isMoving={isMoving} inShowdown={inShowdown} />;
      case 'sasuke':
        return <SasukeCursor isMoving={isMoving} inShowdown={inShowdown} />;
      case 'luffy':
        return <LuffyCursor isMoving={isMoving} />;
      case 'zoro':
        return <ZoroCursor isMoving={isMoving} />;
      case 'sanji':
        return <SanjiCursor isMoving={isMoving} />;
      case 'ichigo':
        return <IchigoCursor isMoving={isMoving} />;
      case 'gon':
        return <GonCursor isMoving={isMoving} />;
      case 'killua':
        return <KilluaCursor isMoving={isMoving} />;
      case 'tanjiro':
        return <TanjiroCursor isMoving={isMoving} />;
      case 'zenitsu':
        return <ZenitsuCursor isMoving={isMoving} />;
      case 'inosuke':
        return <InosukeCursor isMoving={isMoving} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className="fixed z-[8500] pointer-events-none select-none transition-opacity duration-300 will-change-transform"
      style={{
        left: 0,
        top: 0,
        transform: 'translate3d(-50%, -50%, 0)',
      }}
      data-character={def.id}
      aria-hidden="true"
    >
      <div
        className="relative flex flex-col items-center group cursor-pointer"
        style={{
          transform: `scaleX(${facingLeft ? -1 : 1})`,
          transition: 'transform 0.18s ease-out',
        }}
      >
        {/* Speech / Action Bubble */}
        {(speechText || (inShowdown && def.actionMove)) && (
          <div
            className="absolute -top-9 z-20 px-2.5 py-1 rounded bg-black/90 border border-white/20 text-white font-mono text-[9px] tracking-wide whitespace-nowrap shadow-lg animate-bounce"
            style={{
              transform: `scaleX(${facingLeft ? -1 : 1})`,
              borderColor: def.color,
            }}
          >
            <span style={{ color: def.color }}>▶ </span>
            {speechText || def.actionMove}
          </div>
        )}

        {/* Character Vector SVG Artwork */}
        <div className="relative">
          {renderArtwork()}

          {/* Showdown Clash Sparks */}
          {inShowdown && (
            <div
              className="absolute -inset-2 rounded-full border border-dashed animate-spin pointer-events-none"
              style={{
                borderColor: def.accentColor,
                animationDuration: '2.5s',
              }}
            />
          )}
        </div>

        {/* Character Identification Label */}
        <div
          className="mt-0.5 flex flex-col items-center pointer-events-none"
          style={{ transform: `scaleX(${facingLeft ? -1 : 1})` }}
        >
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-neutral-950/85 border border-white/10 text-[8px] font-mono uppercase tracking-wider backdrop-blur-sm shadow-md"
            style={{ borderLeftColor: def.color, borderLeftWidth: '2.5px' }}
          >
            <span style={{ color: def.color }} className="font-bold">
              {def.name.split(' ')[0]}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-white/80">{def.universeName.split(' ')[0]}</span>
          </div>

          {/* Action / Personality Tag */}
          <span
            className="mt-0.5 px-1.5 py-0.2 text-[7px] font-mono font-semibold rounded bg-black/75 tracking-wider uppercase"
            style={{ color: def.accentColor }}
          >
            {inShowdown ? def.actionMove : statusText || def.role.split('·')[0].trim()}
          </span>
        </div>
      </div>
    </div>
  );
});

export default CharacterCursor;
