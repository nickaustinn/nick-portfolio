import type { SchoolEntry } from '../types';

// Newest first — /school renders this order top to bottom.
//
// `period: null` renders no dates at all rather than a placeholder, so an
// unfinished entry never leaks a TODO to a visitor.

export const education: SchoolEntry[] = [
  {
    institution: 'University of the Pacific',
    credential: 'B.S. Computer Science, minor in Data Science',
    period: null, // TODO: start year — expected graduation, e.g. '2022 — 2026'
    highlights: [
      // TODO: relevant coursework, honors, GPA, clubs — whatever you want shown
    ],
  },
  // TODO: earlier schooling, if you want it listed
];
