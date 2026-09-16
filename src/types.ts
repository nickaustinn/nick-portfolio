import type { ReactNode } from 'react';

/**
 * What a command hands back to the terminal.
 *  - 'output' prints a node beneath the echoed prompt line
 *  - 'clear'  wipes the scrollback
 *  - 'none'   prints nothing (the echoed prompt line still shows)
 */
export type CommandResult =
  | { kind: 'output'; node: ReactNode }
  | { kind: 'clear' }
  | { kind: 'none' };

/** Everything a handler is given about the invocation. */
export interface CommandContext {
  /** Arguments after the command name, e.g. `/projects urbanpic` -> ['urbanpic'] */
  args: string[];
  /** The line exactly as typed, for echoing or error messages. */
  raw: string;
  /** The full registry, so a command like /help can describe its siblings. */
  commands: Command[];
}

/**
 * One command = one module exporting one of these. Adding a command means
 * adding a file and listing it in `commands/index.ts`; nothing else changes.
 */
export interface Command {
  /** Canonical name, lowercase, no leading slash. */
  name: string;
  /** One line, shown by /help. */
  description: string;
  /** Shown by /help when the command takes arguments, e.g. '/projects <name>'. */
  usage?: string;
  /** Alternate names that resolve here. Not listed in /help. */
  aliases?: string[];
  /** Kept out of the /help listing. */
  hidden?: boolean;
  run(ctx: CommandContext): CommandResult;
}
