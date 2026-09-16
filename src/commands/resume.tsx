import type { Command } from '../types';
import { RESUME_DOWNLOAD_NAME, resumeUrl } from '../data/contact';

/**
 * Prints the two actions and opens nothing on its own. Typing a command is
 * not the same as asking for a new tab, and a command that hijacks the tab
 * stack is the kind of thing a popup blocker exists to stop anyway. The
 * visitor decides: view it, or save it.
 */
export const resume: Command = {
  name: 'resume',
  description: 'Open my resume (PDF).',
  aliases: ['cv'],
  run: () => ({
    kind: 'output',
    node: (
      <>
        <p className="muted">resume (PDF)</p>
        <p className="resume-actions">
          <a className="link" href={resumeUrl} target="_blank" rel="noopener noreferrer">
            [view resume]
          </a>
          <a className="link" href={resumeUrl} download={RESUME_DOWNLOAD_NAME}>
            [download]
          </a>
        </p>
      </>
    ),
  }),
};
