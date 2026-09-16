import type { Command, CommandContext, CommandResult } from '../types';
import HelpTable from '../components/blocks/HelpTable';

/** The listing itself: one row per command that isn't hidden. */
export function listCommands({ commands }: CommandContext): CommandResult {
  return {
    kind: 'output',
    node: (
      <>
        <p className="muted">Available commands: type one.</p>
        <HelpTable commands={commands.filter((c) => !c.hidden)} />
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
