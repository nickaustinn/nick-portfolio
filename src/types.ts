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

/* =========================================================================
   Content shapes. Everything below is data-only — the files in src/data
   are the single source of truth and no component holds its own copy.
   ========================================================================= */

export interface Project {
  /** URL-ish handle used by `/projects <slug>`. Lowercase, no spaces. */
  slug: string;
  name: string;
  description: string;
  tech: string[];
  /** Deployed site. null when there isn't one — no dead links get rendered. */
  liveUrl: string | null;
  /** Repository. null when private or not published. */
  sourceUrl: string | null;
  /** Hidden from /projects until the entry is filled in. */
  draft?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface SchoolEntry {
  institution: string;
  credential: string;
  /** e.g. '2022 — 2026'. null when the dates aren't recorded yet. */
  period: string | null;
  /** Coursework, honors, focus areas. Empty array renders nothing. */
  highlights: string[];
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  /** e.g. 'Stockton, CA'. null when it isn't worth showing, like remote work. */
  location: string | null;
  /** Start date, e.g. 'June 2026'. null hides the dates entirely. */
  start: string | null;
  /** End date. null means the role is current and renders as 'Present'. */
  end: string | null;
  bullets: string[];
}

export interface ContactLink {
  label: string;
  /** What's shown to the reader, e.g. 'github.com/nickaustinn'. */
  value: string;
  href: string;
  /** Opens in a new tab with rel=noopener. */
  external: boolean;
}
