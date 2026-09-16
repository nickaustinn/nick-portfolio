import type { ExperienceEntry } from '../types';

// Newest first - /experience renders this order top to bottom.
//
// `end: null` means the role is current; /experience prints it as 'Present',
// so no entry hardcodes that word. `start: null` hides the dates altogether
// rather than showing a placeholder. Omitting `bullets` renders nothing.

export const experience: ExperienceEntry[] = [
  {
    organization: "St. Mary's Community Services",
    role: 'Software Engineering Intern',
    location: 'Stockton, CA',
    start: 'June 2026',
    end: null,
    bullets: [
      'Oversaw the entire engineering lifecycle end-to-end, including design, development, and deployment',
      'Designed, built, and deployed a React web application on Vercel using Supabase for authentication and database management, implementing Row-Level Security for secure user logins',
      "Integrated Yodeck to display web content across screens throughout the St. Mary's campus",
      "Managed and updated content on WordPress, the platform powering the nonprofit's official website",
      'Translated technical concepts for stakeholders in meetings, gathering requirements and aligning deliverables with organizational needs',
    ],
  },
];
