import type { ExperienceEntry } from '../types';

// Newest first - /experience renders this order top to bottom.
//
// `end: null` means the role is current; /experience prints it as 'Present',
// so no entry hardcodes that word. An `end` equal to `start` is printed once
// rather than as a range. `start: null` hides the dates altogether.
//
// `additional: true` moves an entry under the 'additional experience' heading,
// below the roles, rather than listing it as a job.

export const experience: ExperienceEntry[] = [
  {
    organization: "St. Mary's Community Services",
    role: 'Software Engineering Intern',
    location: 'Stockton, CA',
    start: 'June 2026',
    end: null,
    bullets: [
      'Designed, built, and deployed a React web application on Vercel using Supabase for authentication and database management, implementing Row-Level Security for secure user logins',
      "Integrated Yodeck to display web content across screens throughout the St. Mary's campus",
      "Managed and updated content on WordPress, the platform powering the nonprofit's official website",
      'Translated technical concepts for non-technical stakeholders in meetings, gathering requirements and aligning deliverables with organizational needs',
      'Owned the full engineering lifecycle end-to-end, including design, development, and deployment',
    ],
  },
  {
    organization: 'iD Tech - Intro to Machine Learning',
    role: 'Machine Learning & Python Development In-Person Camp',
    location: null,
    start: 'June 2020',
    end: 'June 2020',
    additional: true,
    bullets: [
      'Built and trained machine learning models for image recognition and classification using supervised learning workflows',
      'Explored core ML concepts including neural networks, data collection pipelines, and model evaluation techniques',
      'Developed Python applications incorporating logic-driven design and computational thinking principles',
    ],
  },
];

/** Roles, in order. */
export const roles = experience.filter((entry) => !entry.additional);

/** Camps, bootcamps and short programmes, listed under their own heading. */
export const additionalExperience = experience.filter((entry) => entry.additional);
