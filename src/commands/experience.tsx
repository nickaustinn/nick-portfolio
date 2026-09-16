import type { Command } from '../types';
import { experience } from '../data/experience';
import Timeline from '../components/blocks/Timeline';

export const experienceCommand: Command = {
  name: 'experience',
  description: 'Work and contract experience.',
  aliases: ['work', 'jobs'],
  run: () => ({
    kind: 'output',
    // An empty list says so plainly and redirects, rather than pretending.
    node:
      experience.length === 0 ? (
        <>
          <p>No work experience is listed here yet.</p>
          <p className="muted">
            The build history is in <code>/projects</code> and the coursework in{' '}
            <code>/school</code>. To talk about a role, <code>/contact</code>.
          </p>
        </>
      ) : (
        <Timeline
          items={experience.map((entry) => ({
            title: entry.organization,
            subtitle: entry.role,
            period: entry.period,
            bullets: entry.bullets,
          }))}
        />
      ),
  }),
};
