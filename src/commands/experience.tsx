import type { Command, ExperienceEntry } from '../types';
import { additionalExperience, experience, roles } from '../data/experience';
import Timeline from '../components/blocks/Timeline';

/**
 * 'June 2026 - Present' for an ongoing role, 'June 2020' for something that
 * ran a single month, null when there are no dates.
 */
function formatPeriod({ start, end }: ExperienceEntry): string | null {
  if (start === null) return null;
  if (end === start) return start;
  return `${start} - ${end ?? 'Present'}`;
}

/** The role, with the location alongside it when there is one. */
function formatRole({ role, location }: ExperienceEntry): string {
  return location === null ? role : `${role} · ${location}`;
}

/** Entries to timeline items. Shared by the roles and the additional list. */
function toItems(entries: ExperienceEntry[]) {
  return entries.map((entry) => ({
    title: entry.organization,
    subtitle: formatRole(entry),
    period: formatPeriod(entry),
    bullets: entry.bullets,
  }));
}

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
        <>
          {roles.length > 0 && <Timeline items={toItems(roles)} />}
          {additionalExperience.length > 0 && (
            <>
              <h3 className="output-subheading">additional experience</h3>
              <Timeline items={toItems(additionalExperience)} />
            </>
          )}
        </>
      ),
  }),
};
