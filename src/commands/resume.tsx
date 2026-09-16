import type { Command } from '../types';
import { RESUME_DOWNLOAD_NAME, resumeUrl } from '../data/contact';

/**
 * Opens the PDF in a new tab and prints the links as well.
 *
 * The window.open call runs inside the keydown handler that submitted the
 * command, so it counts as a user gesture and a popup blocker normally lets
 * it through. When one doesn't, the printed links are the way out: the same
 * two actions, one click away, rather than a command that silently did
 * nothing.
 */
export const resume: Command = {
  name: 'resume',
  description: 'Open my resume (PDF).',
  aliases: ['cv'],
  run: () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');

    return {
      kind: 'output',
      node: (
        <>
          <p className="muted">opening resume...</p>
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
    };
  },
};
