import type { Project } from '../types';

// Newest first - /projects lists this order top to bottom.
//
// `slug` is what `/projects <slug>` matches on, and what Tab completes after
// `/projects `. Leave `github` / `demo` as null when there's no link - nothing
// renders for a null, so the site never shows a dead link.
//
// Set `draft: true` to keep an unfinished entry out of /projects.

export const projects: Project[] = [
  {
    slug: 'h2o',
    name: 'H2O Hackathon',
    date: 'May 2026',
    tech: ['Next.js', 'TypeScript', 'React', 'three.js', 'React Three Fiber', 'WebGL'],
    highlights: [
      'Engineered a WebGL 3D city scene with three.js and React Three Fiber',
      'Built a Next.js + TypeScript front-end with a live data slider and OrbitControls for interactivity',
      'Collaborated with a teammate using GitHub for version control, including branch management and merge conflict resolution, while iterating on design ideas together',
    ],
    github: null,
    demo: null,
  },
  {
    slug: 'urbanpic',
    name: 'UrbanPic',
    date: 'March 2026',
    tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel', 'API Integration'],
    highlights: [
      'Built a web application with Next.js API routes and PostgreSQL with Prisma ORM, deployed on Vercel',
      'Integrated Claude Vision and Mapbox to generate a real-time heatmap visualizing report density',
      'Implemented a database to manage user-submitted reports with category filtering',
      'Worked with users to gather requirements and iteratively improve UI/UX, reducing report submission time to under 30 seconds',
    ],
    github: null,
    demo: null,
  },
  {
    slug: 'eyerocket',
    name: 'Eye am Rocket, Look Out!',
    date: 'January 2026 - March 2026',
    tech: ['Java', 'Agile/SCRUM', 'Gazepoint Eye Tracking'],
    highlights: [
      'Collaborated with a team of three using Agile and SCRUM to develop a Java game integrating Gazepoint eye-tracking hardware',
      'Implemented gaze-controlled cursor movement by processing real-time eye-tracking data, letting players aim and navigate using only their eyes',
      'Participated in sprint planning, stand-ups, and retrospectives to coordinate feature delivery across the team',
      'Worked with customers and explained technical aspects to refine the gameplay experience',
    ],
    github: null,
    demo: null,
  },
];

/** Projects that are ready to show. */
export const publishedProjects = projects.filter((project) => !project.draft);

/** Slugs of everything /projects lists, for Tab completion and error hints. */
export const projectSlugs = publishedProjects.map((project) => project.slug);
