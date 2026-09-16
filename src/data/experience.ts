import type { ExperienceEntry } from '../types';

// Newest first - /experience renders this order top to bottom.
//
// `end: null` means the role is current; /experience prints it as 'Present',
// so no entry hardcodes that word. `start: null` hides the dates altogether
// rather than showing a placeholder. An empty `bullets` array renders nothing.

export const experience: ExperienceEntry[] = [
  {
    organization: "St. Mary's Community Services",
    role: 'Software Engineering Intern',
    location: 'Stockton, CA',
    start: 'June 2026',
    end: null,
    bullets: [
      // TODO: what you built and what it changed, once there's something to say
    ],
  },
];
