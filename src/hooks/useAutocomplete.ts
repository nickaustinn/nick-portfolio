import { useCallback } from 'react';
import { COMMAND_PREFIX, completionNames, hasCommandPrefix, normalizeName } from '../commands';

export interface Completion {
  /** The input value after completing. Unchanged when there's nothing to do. */
  value: string;
  /** Every candidate, when the prefix is ambiguous. Empty otherwise. */
  matches: string[];
}

/** Longest string that every candidate starts with. */
function commonPrefix(values: string[]): string {
  if (values.length === 0) return '';
  let prefix = values[0]!;
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/**
 * Tab completion over command names. Only the command word completes; once
 * there's a space, the argument is the user's business. Nothing completes
 * without the leading slash, since nothing runs without it either.
 */
export function useAutocomplete() {
  return useCallback((input: string): Completion => {
    if (/\s/.test(input.trimStart())) return { value: input, matches: [] };
    if (!hasCommandPrefix(input.trim())) return { value: input, matches: [] };

    const typed = normalizeName(input.trim());
    if (typed === '') return { value: input, matches: [] };

    const matches = completionNames().filter((name) => name.startsWith(typed));
    if (matches.length === 0) return { value: input, matches: [] };

    if (matches.length === 1) return { value: `${COMMAND_PREFIX}${matches[0]} `, matches: [] };

    // Ambiguous: fill in as far as everything agrees, then show the options.
    return { value: `${COMMAND_PREFIX}${commonPrefix(matches)}`, matches };
  }, []);
}
