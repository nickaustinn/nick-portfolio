import { useCallback, useRef, useState } from 'react';

/**
 * Shell-style command history.
 *
 * The cursor sits at `entries.length` when you're typing a fresh line. Up
 * walks backwards into the past, down walks forward; stepping past the newest
 * entry returns you to the empty line you started on, like bash.
 */
export function useCommandHistory() {
  const [entries, setEntries] = useState<string[]>([]);
  const cursor = useRef<number>(0);

  const push = useCallback((line: string) => {
    setEntries((prev) => {
      // Don't stack duplicates of the immediately previous command.
      const next = prev[prev.length - 1] === line ? prev : [...prev, line];
      cursor.current = next.length;
      return next;
    });
  }, []);

  /** Returns the line to show, or null when there's nothing further back. */
  const recallPrevious = useCallback((): string | null => {
    if (cursor.current === 0) return null;
    cursor.current -= 1;
    return entries[cursor.current] ?? null;
  }, [entries]);

  /** Returns the line to show; '' means "back to the fresh, empty line". */
  const recallNext = useCallback((): string | null => {
    if (cursor.current >= entries.length) return null;
    cursor.current += 1;
    return cursor.current === entries.length ? '' : (entries[cursor.current] ?? '');
  }, [entries]);

  return { entries, push, recallPrevious, recallNext };
}
