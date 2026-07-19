// =============================================================================
// Site content — edit copy, projects, skills, and contact info here.
// Components read from this file; they don't hold their own content.
// =============================================================================

export const about = {
  lead: 'Senior Computer Science student at University of the Pacific',
  paragraphs: [
    "I'm a senior Computer Science student at the University of the Pacific, " +
      "with a minor in Data Science. I work across the full stack — from system " +
      "architecture down to the details of a polished user experience.",
    "I'm drawn to building real, usable things: a full-stack web app, a machine " +
      "learning model, a game you steer with your eyes. Alongside coursework I've " +
      "shipped team projects run on a full Agile process, and attended an intensive " +
      "machine-learning bootcamp (iDTech) covering neural networks and applied AI.",
  ],
};

// -----------------------------------------------------------------------------
// Projects
//   • liveUrl  — deployed site. Omit / leave null when there's no deployment.
//   • sourceUrl — repo link. Omit / leave null to hide the source link.
//   A card only renders a link when the corresponding URL is present, so
//   there are never dead links.
//
//   `draft: true` hides a project from the grid. Fill in its details and
//   remove the flag to publish it.
// -----------------------------------------------------------------------------
export const projects = [
  {
    title: 'UrbanPic',
    description:
      'Full-stack web app for discovering and sharing urban photography, ' +
      'with interactive location-based maps powered by Mapbox.',
    tech: ['React', 'Node.js', 'Mapbox', 'REST APIs'],
    liveUrl: null,   // TODO: add deployed URL when ready
    sourceUrl: null, // TODO: add repo URL if you want a source link
  },
  {
    title: 'A Way Out',
    description:
      'A 2D platformer built collaboratively in Java on a full Agile process — ' +
      'use case diagrams, user stories, and prototypes before any game code.',
    tech: ['Java', 'Agile', 'Scrum', 'OOP'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    title: 'EaRLO — Eye am Rocket Look-Out!',
    description:
      'An eye-tracking asteroid-dodging game in Java. Real eye-tracking hardware ' +
      'lets players steer the cursor with their gaze while dodging asteroids.',
    tech: ['Java', 'Eye Tracking', 'Hardware Integration', 'Game Dev'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    // --- Draft: not shown until details are filled in and `draft` removed. ---
    title: 'h2Show',
    description: '', // TODO: one-to-two-line description
    tech: [],        // TODO: tech stack
    liveUrl: null,   // TODO: add deployed URL
    sourceUrl: null,
    draft: true,
  },
];

// -----------------------------------------------------------------------------
// Skills — grouped by category.
// -----------------------------------------------------------------------------
export const skillGroups = [
  {
    category: 'Languages',
    skills: ['Java', 'C++', 'Python'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Node.js', 'NumPy', 'scikit-learn'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'VS Code', 'IntelliJ', 'Mapbox', 'REST APIs'],
  },
];

// -----------------------------------------------------------------------------
// Contact
// -----------------------------------------------------------------------------
export const contact = [
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

export const meta = {
  name: 'Nick Austin',
  navLinks: [
    { label: 'About',    href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Contact',  href: '#contact' },
  ],
};
