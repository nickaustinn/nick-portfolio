import type { Project } from '../types';

// Add a project by appending an entry. `slug` is what `/projects <slug>`
// matches on. Leave liveUrl / sourceUrl as null when there's no link —
// nothing is rendered for a null, so the site never shows a dead link.
//
// Set `draft: true` to keep an unfinished entry out of /projects.

export const projects: Project[] = [
  {
    slug: 'urbanpic',
    name: 'UrbanPic',
    description:
      'Full-stack web app for discovering and sharing urban photography, ' +
      'with interactive location-based maps powered by Mapbox.',
    tech: ['React', 'Node.js', 'Mapbox', 'REST APIs'],
    liveUrl: null, // TODO: deployed URL, if it gets one
    sourceUrl: null, // TODO: repo URL
  },
  {
    slug: 'a-way-out',
    name: 'A Way Out',
    description:
      'A 2D platformer built collaboratively in Java on a full Agile process: ' +
      'use case diagrams, user stories, and prototypes before any game code.',
    tech: ['Java', 'Agile', 'Scrum', 'OOP'],
    liveUrl: null,
    sourceUrl: null, // TODO: repo URL
  },
  {
    slug: 'earlo',
    name: 'EaRLO - Eye am Rocket Look-Out!',
    description:
      'An eye-tracking asteroid-dodging game in Java. Real eye-tracking hardware ' +
      'lets players steer the cursor with their gaze while dodging asteroids.',
    tech: ['Java', 'Eye Tracking', 'Hardware Integration', 'Game Dev'],
    liveUrl: null,
    sourceUrl: null, // TODO: repo URL
  },
  {
    // Draft — hidden from /projects until the blanks below are filled in
    // and `draft` is removed.
    slug: 'h2show',
    name: 'h2Show',
    description: '', // TODO: one or two lines on what it does
    tech: [], // TODO: tech stack
    liveUrl: null, // TODO
    sourceUrl: null, // TODO
    draft: true,
  },
];

/** Projects that are ready to show. */
export const publishedProjects = projects.filter((project) => !project.draft);
