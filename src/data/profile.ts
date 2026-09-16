// Who you are. Edit copy here; no component hardcodes any of it.

export const profile = {
  name: 'Nick Austin',
  tagline: 'Computer Science student at University of the Pacific',
  /** Shown by /about, one <p> per entry. */
  about: [
    "Hi, I'm Nick Austin, a Computer Science student with a minor in Data " +
      'Science at University of the Pacific in Stockton, CA, graduating May 2027.',
    "I build full-stack web apps and I'm looking for internships in software " +
      'engineering, IT, and data science.',
    "Type /projects to see what I've built.",
  ],
  /** What /contact leads with. */
  availability: 'Open to roles, contact me here',
} as const;
