import type { Command } from '../types';
import { listCommands } from './commands';

/** An alias in everything but registration — it is listed separately so that
 *  visitors who reach for `/help` first find it in Tab completion. */
export const help: Command = {
  name: 'help',
  description: 'Same as /commands.',
  run: listCommands,
};
