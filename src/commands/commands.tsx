import type { Command, CommandContext, CommandResult } from '../types';
import HelpTable from '../components/blocks/HelpTable';

/**
 * The listing itself, shared so `/commands` and its alias `/help` can't drift
 * apart. Both names are registered as commands rather than one being a plain
 * alias, so both complete on Tab and both appear in the shortcut row.
 */
export function listCommands({ commands }: CommandContext): CommandResult {
  return {
    kind: 'output',
    node: (
      <>
        <p className="muted">Available commands — type one, or click it.</p>
        <HelpTable commands={commands.filter((c) => !c.hidden)} />
        <p className="muted">
          The leading slash is optional and case doesn&apos;t matter. Tab completes,
          up and down arrows walk your history.
        </p>
      </>
    ),
  };
}

export const commandsCommand: Command = {
  name: 'commands',
  description: 'List every command.',
  aliases: ['?', 'ls'],
  run: listCommands,
};
