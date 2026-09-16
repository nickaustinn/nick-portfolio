import type { ReactNode } from 'react';
import Prompt from './Prompt';

export interface Entry {
  id: number;
  /** The command as typed. Undefined for output the terminal printed itself. */
  input?: string;
  /** Rendered result, if the command produced one. */
  node?: ReactNode;
}

/**
 * One block of scrollback: the echoed command line, then its output.
 * Each block is an <article> so screen-reader users can jump between results.
 */
export default function OutputLine({ entry }: { entry: Entry }) {
  return (
    <article className="entry">
      {entry.input !== undefined && (
        <p className="entry-command">
          <Prompt />{' '}
          <span className="entry-input">{entry.input}</span>
        </p>
      )}
      {entry.node !== undefined && <div className="entry-output">{entry.node}</div>}
    </article>
  );
}
