import type { ContactLink } from '../types';

// No phone number here on purpose. `external: true` renders the anchor with
// target="_blank" and rel="noopener noreferrer"; mailto stays in place.

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    value: 'nickdev1232@gmail.com',
    href: 'mailto:nickdev1232@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/nickaustinn',
    href: 'https://github.com/nickaustinn',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/nickaustinn',
    href: 'https://www.linkedin.com/in/nickaustinn',
    external: true,
  },
  {
    label: 'Website',
    value: 'nickaustinn.dev',
    href: 'https://nickaustinn.dev',
    external: true,
  },
];

/**
 * Path to the resume PDF, served from /public. While it's null, /resume says
 * the resume isn't posted yet and offers the contact links instead of 404-ing.
 * Set it to '/resume.pdf' once the file is dropped at public/resume.pdf.
 */
export const resumeUrl: string | null = null;
