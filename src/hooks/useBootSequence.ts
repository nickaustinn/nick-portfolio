import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/* ---- Timing ------------------------------------------------------------
   Tweak these to retune the sequence; nothing else hard-codes a duration. */

/** How long one dot frame is held, in ms. */
export const DOT_INTERVAL_MS = 400;

/** Total time the loading line is on screen before the welcome, in ms. */
export const LOADING_DURATION_MS = 5000;

/** Shorter wait when the visitor has asked for reduced motion, in ms. */
export const REDUCED_MOTION_DURATION_MS = 1000;

/** The dot frames, cycled in order: . -> .. -> ... -> . */
const DOT_FRAMES = ['.', '..', '...'];

/** What reduced motion shows instead of the cycle - static, never animated. */
const STATIC_DOTS = '...';

export interface BootSequence {
  /** True while the loading line is showing. The input is unusable until false. */
  loading: boolean;
  /** The dots to render after the word "Loading". */
  dots: string;
}

/**
 * The first-load sequence: a "Loading" line with cycling dots, then the
 * welcome message and a usable prompt.
 *
 * It runs on every full page load - deliberately not remembered in storage,
 * so the sequence is part of arriving rather than a one-time gate.
 *
 * Only a mouse press skips it. Keys are ignored (the input isn't mounted yet,
 * so nothing is swallowed mid-word) and so are touch taps, which otherwise
 * skip the sequence for every phone visitor who steadies the page with a
 * thumb. That's why this listens for pointer events and checks `pointerType`
 * rather than using `click`, which fires for taps too.
 */
export function useBootSequence(): BootSequence {
  const reduced = usePrefersReducedMotion();
  const [loading, setLoading] = useState(true);
  const [frame, setFrame] = useState(0);

  // Frozen at mount: flipping the OS setting mid-load shouldn't restart the
  // clock the visitor is already waiting out.
  const reducedAtMount = useRef(reduced);

  useEffect(() => {
    const animate = !reducedAtMount.current;
    const duration = animate ? LOADING_DURATION_MS : REDUCED_MOTION_DURATION_MS;

    let timeout = 0;
    let interval: number | undefined;

    // Stops the animation as well as ending the phase, so a skip doesn't
    // leave an interval re-rendering a line that's no longer on screen.
    const finish = () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
      setLoading(false);
    };

    timeout = window.setTimeout(finish, duration);
    if (animate) {
      interval = window.setInterval(() => setFrame((n) => n + 1), DOT_INTERVAL_MS);
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') finish();
    };
    window.addEventListener('pointerdown', onPointerDown);

    // Every timer and listener is torn down here, so StrictMode's double
    // mount in dev can't leave a second interval running behind the first.
    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return {
    loading,
    dots: reducedAtMount.current ? STATIC_DOTS : DOT_FRAMES[frame % DOT_FRAMES.length]!,
  };
}
