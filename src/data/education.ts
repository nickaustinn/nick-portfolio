import type { SchoolEntry } from '../types';

// Newest first - /school renders this order top to bottom.
//
// `period: null` renders no dates at all rather than a placeholder, and
// `location: null` drops the location from the subtitle line.

export const education: SchoolEntry[] = [
  {
    institution: 'University of the Pacific',
    credential: 'Bachelor of Science in Computer Science, Minor in Data Science',
    location: 'Stockton, CA',
    period: 'Aug 2024 - May 2027 (expected)',
    highlights: [],
  },
];
