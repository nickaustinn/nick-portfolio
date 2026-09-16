import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Chars revealed per tick, and how long a tick lasts. ~170 chars/second. */
const CHARS_PER_TICK = 2;
const TICK_MS = 12;

/** Reveal `lines` progressively, as if typed. Counts newlines as characters. */
function sliceLines(lines: string[], budget: number): string[] {
  const visible: string[] = [];
  let left = budget;

  for (const line of lines) {
    if (left <= 0) break;
    visible.push(line.slice(0, left));
    left -= line.length + 1; // +1 for the line break
  }

  return visible;
}

/**
 * Types out a block of lines. Fast by design, skipped by any keypress or tap,
 * and switched off entirely when the visitor asks for reduced motion — in
 * which case the full text is there on first paint.
 */
export function useTypewriter(lines: string[]) {
  const reduced = usePrefersReducedMotion();
  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.length + 1, 0),
    [lines],
  );

  const [revealed, setRevealed] = useState(() => (reduced ? total : 0));
  const done = revealed >= total;

  const skip = useCallback(() => setRevealed(total), [total]);

  // Honour the setting being flipped mid-visit.
  useEffect(() => {
    if (reduced) setRevealed(total);
  }, [reduced, total]);

  useEffect(() => {
    if (done) return;
    const id = window.setInterval(
      () => setRevealed((count) => count + CHARS_PER_TICK),
      TICK_MS,
    );
    return () => window.clearInterval(id);
  }, [done]);

  // Any input skips to the end, so nobody waits on an animation.
  useEffect(() => {
    if (done) return;
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [done, skip]);

  return { visible: sliceLines(lines, revealed), done };
}
