import type { Command } from '../types';
import { help } from './help';
import { clear } from './clear';

/**
 * The registry. Adding a command = importing it and dropping it in this list.
 * Order here is the order /help prints.
 */
export const commands: Command[] = [help, clear];

/** Name -> command, including aliases. Built once at module load. */
const byName = new Map<string, Command>();
for (const command of commands) {
  byName.set(command.name, command);
  for (const alias of command.aliases ?? []) byName.set(alias, command);
}

/** Strip an optional leading slash and lowercase, so `/HELP` === `help`. */
export function normalizeName(name: string): string {
  return name.replace(/^\/+/, '').toLowerCase();
}

export function resolveCommand(name: string): Command | undefined {
  return byName.get(normalizeName(name));
}

/** Canonical names, used for Tab completion and the shortcut row. */
export function completionNames(): string[] {
  return commands.filter((c) => !c.hidden).map((c) => c.name);
}
