import type { Command } from '../types';
import { skillGroups } from '../data/skills';

export const skills: Command = {
  name: 'skills',
  description: 'Technical skills, grouped by category.',
  aliases: ['stack', 'tech'],
  run: () => ({
    kind: 'output',
    node: (
      <dl className="skill-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.category}>
            <dt className="skill-category">{group.category}</dt>
            <dd className="skill-list">{group.skills.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    ),
  }),
};
