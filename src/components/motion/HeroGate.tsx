'use client';

import { useState, type ReactNode } from 'react';
import { HeroSequence } from './HeroSequence';

/**
 * Gates the hero sequence overlay in front of the real hero markup.
 *
 * The real hero (children) is always rendered underneath — the sequence
 * overlay sits on top and simply fades away via HeroSequence's own opacity
 * animation, then unmounts. This means there is no content flash or layout
 * shift between "sequence playing" and "sequence done": the final frame of
 * the sequence and the actual hero are visually the same composition, per
 * the brief's requirement that a returning (sessionStorage-skipped) visitor
 * sees the identical page with no discontinuity.
 */
export function HeroGate({ children }: { children: ReactNode }) {
  const [sequenceDone, setSequenceDone] = useState(false);

  return (
    <>
      {children}
      {!sequenceDone && <HeroSequence onDone={() => setSequenceDone(true)} />}
    </>
  );
}
