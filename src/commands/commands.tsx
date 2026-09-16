import type { Command, CommandContext, CommandResult } from '../types';
import HelpTable from '../components/blocks/HelpTable';

/**
 * The listing itself, shared so `/commands` and its alias `/help` can't drift
 * apart. Both names are registered as commands rather than one being a plain
 * alias, so both complete on Tab.
 */
export function listCommands({ commands }: CommandContext): CommandResult {
  return {
    kind: 'output',
    node: (
      <>
        <p className="muted">Available commands — type one.</p>
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
