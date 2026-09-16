import type { ContactLink } from '../types';

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
    href: 'https://www.linkedin.com/in/nickaustinn/',
    external: true,
  },
];

/**
 * Path to the resume PDF, served from /public.
 * TODO: drop the file at public/resume.pdf and set this to '/resume.pdf'.
 * While it's null, /resume says the resume isn't posted yet and offers the
 * contact links instead of 404-ing.
 */
export const resumeUrl: string | null = null;
