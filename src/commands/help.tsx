import type { Command } from '../types';
import HelpTable from '../components/blocks/HelpTable';

export const help: Command = {
  name: 'help',
  description: 'List every command.',
  aliases: ['?', 'commands', 'ls'],
  run: ({ commands }) => ({
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
  }),
};
