import type { Command } from '../types';
import { contactLinks, resumeUrl } from '../data/contact';
import LinkList from '../components/blocks/LinkList';

export const resume: Command = {
  name: 'resume',
  description: 'Open my resume (PDF).',
  aliases: ['cv'],
  run: () => {
    // No file posted yet: say so and hand over something useful instead of
    // opening a 404.
    if (!resumeUrl) {
      return {
        kind: 'output',
        node: (
          <>
            <p>My resume isn&rsquo;t posted here yet.</p>
            <p className="muted">
              LinkedIn has the same history, and I&rsquo;ll send a PDF on request:
            </p>
            <LinkList
              links={contactLinks.filter((link) => link.label !== 'GitHub')}
            />
          </>
        ),
      };
    }

    return {
      kind: 'output',
      node: (
        <p>
          <a className="link" href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Open resume (PDF)
          </a>{' '}
          <a className="link" href={resumeUrl} download>
            Download
          </a>
        </p>
      ),
    };
  },
};
