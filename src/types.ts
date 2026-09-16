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
  /** The full registry, so a command like /commands can describe its siblings. */
  commands: Command[];
}

/**
 * One command = one module exporting one of these. Adding a command means
 * adding a file and listing it in `commands/index.ts`; nothing else changes.
 */
export interface Command {
  /** Canonical name, lowercase, no leading slash. */
  name: string;
  /** One line, shown by /commands. */
  description: string;
  /** Shown by /commands when the command takes arguments, e.g. '/projects <name>'. */
  usage?: string;
  /** Alternate names that resolve here. Not listed in /commands. */
  aliases?: string[];
  /** Kept out of the /commands listing. */
  hidden?: boolean;
  /**
   * Values Tab completes for this command's first argument, e.g. project
   * slugs for `/projects <slug>`. Omitted when the argument is free text.
   */
  completions?: () => string[];
  run(ctx: CommandContext): CommandResult;
}

/* =========================================================================
   Content shapes. Everything below is data-only - the files in src/data
   are the single source of truth and no component holds its own copy.
   ========================================================================= */

export interface Project {
  /** URL-ish handle used by `/projects <slug>`. Lowercase, no spaces. */
  slug: string;
  name: string;
  /** e.g. 'May 2026' or 'January 2026 - March 2026'. Shown in both views. */
  date: string;
  tech: string[];
  /** What the project amounted to. Shown by the detail view only. */
  highlights: string[];
  /** Repository. null when private or not published - no dead link renders. */
  github: string | null;
  /** Deployed site or demo. null when there isn't one. */
  demo: string | null;
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
  /** e.g. 'Stockton, CA'. null when it isn't worth showing. */
  location: string | null;
  /** e.g. 'Aug 2024 - May 2027 (expected)'. null when dates aren't recorded. */
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
  /**
   * End date. null means the role is current and renders as 'Present'. Equal
   * to `start` for something that ran a single month, which prints once.
   */
  end: string | null;
  /** What the role amounted to. Omitted or empty renders nothing. */
  bullets?: string[];
  /**
   * Grouped under an 'additional experience' heading rather than listed as a
   * role in the main timeline. Camps, bootcamps, short programmes.
   */
  additional?: boolean;
}

export interface ContactLink {
  label: string;
  /** What's shown to the reader, e.g. 'github.com/nickaustinn'. */
  value: string;
  href: string;
  /** Opens in a new tab with rel=noopener. */
  external: boolean;
}
