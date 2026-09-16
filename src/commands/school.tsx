import type { Command } from '../types';
import { education } from '../data/education';
import Timeline from '../components/blocks/Timeline';

export const school: Command = {
  name: 'school',
  description: 'Education — where I studied and what I studied.',
  aliases: ['education', 'edu'],
  run: () => ({
    kind: 'output',
    node:
      education.length === 0 ? (
        <p className="muted">Nothing listed here yet.</p>
      ) : (
        <Timeline
          items={education.map((entry) => ({
            title: entry.institution,
            subtitle: entry.credential,
            period: entry.period,
            bullets: entry.highlights,
          }))}
        />
      ),
  }),
};
