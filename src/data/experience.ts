import type { ExperienceEntry } from '../types';

// TODO: nothing here yet — the previous site had no work-history section, and
// none is invented. Add entries and /experience picks them up automatically;
// while the list is empty the command says so honestly and points at
// /projects and /school instead.
//
// Shape of an entry:
//   {
//     organization: 'Company',
//     role: 'Software Engineering Intern',
//     period: 'Summer 2025',
//     bullets: ['What you built', 'What it changed'],
//   }

export const experience: ExperienceEntry[] = [];
