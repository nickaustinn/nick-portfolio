import { useCallback } from 'react';
import {
  COMMAND_PREFIX,
  argumentCompletions,
  completionNames,
  hasCommandPrefix,
  normalizeName,
} from '../commands';

export interface Completion {
  /** The input value after completing. Unchanged when there's nothing to do. */
  value: string;
  /** Every candidate, printed as-is, when the prefix is ambiguous. */
  matches: string[];
}

const NOTHING = (input: string): Completion => ({ value: input, matches: [] });

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
 * Completes the command word, and then the first argument for a command that
 * lists candidates - so `/projects u<Tab>` fills in `urbanpic`. Nothing
 * completes without the leading slash, since nothing runs without it either.
 */
export function useAutocomplete() {
  return useCallback((input: string): Completion => {
    if (!hasCommandPrefix(input.trimStart())) return NOTHING(input);

    const [word = '', ...rest] = input.trimStart().split(/\s+/);

    // Past the first space: the argument is what's being completed.
    if (/\s/.test(input.trimStart())) {
      // Only the first argument completes; beyond that it's free text.
      if (rest.length > 1) return NOTHING(input);

      const typed = (rest[0] ?? '').toLowerCase();
      const matches = argumentCompletions(word).filter((slug) => slug.startsWith(typed));
      if (matches.length === 0) return NOTHING(input);
      if (matches.length === 1) return { value: `${word} ${matches[0]}`, matches: [] };
      return { value: `${word} ${commonPrefix(matches)}`, matches };
    }

    const typed = normalizeName(word);
    if (typed === '') return NOTHING(input);

    const matches = completionNames().filter((name) => name.startsWith(typed));
    if (matches.length === 0) return NOTHING(input);
    if (matches.length === 1) return { value: `${COMMAND_PREFIX}${matches[0]} `, matches: [] };

    // Ambiguous: fill in as far as everything agrees, then show the options.
    return {
      value: `${COMMAND_PREFIX}${commonPrefix(matches)}`,
      matches: matches.map((name) => `${COMMAND_PREFIX}${name}`),
    };
  }, []);
}
