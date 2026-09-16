import type { Command } from '../types';

export const clear: Command = {
  name: 'clear',
  description: 'Clear the screen.',
  aliases: ['cls'],
  run: () => ({ kind: 'clear' }),
};
