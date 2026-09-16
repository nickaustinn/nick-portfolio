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
 * The resume PDF's filename inside /public. Everything about the file is
 * decided by this one line: swapping in a new PDF means dropping it in
 * public/ and changing the name here, and nothing else.
 */
export const RESUME_FILE = 'NickAustinResume.pdf';

/**
 * Where the file is served. Vite copies /public to the site root verbatim, so
 * the URL is just the filename. encodeURI is there for the day the filename
 * picks up a space or a bracket, not for the current one.
 */
export const resumeUrl = `/${encodeURI(RESUME_FILE)}`;

/**
 * What the browser saves it as. Set on the download link, so the visitor gets
 * a cleanly named file whatever the file in /public is called.
 */
export const RESUME_DOWNLOAD_NAME = 'NickAustinResume.pdf';
