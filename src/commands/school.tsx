import type { Command, SchoolEntry } from '../types';
import { education } from '../data/education';
import Timeline from '../components/blocks/Timeline';

/** The credential, with the campus alongside it when there is one. */
function formatCredential({ credential, location }: SchoolEntry): string {
  return location === null ? credential : `${credential} · ${location}`;
}

export const school: Command = {
  name: 'school',
  description: 'Education - where I studied and what I studied.',
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
            subtitle: formatCredential(entry),
            period: entry.period,
            bullets: entry.highlights,
          }))}
        />
      ),
  }),
};
