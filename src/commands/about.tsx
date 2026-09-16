import type { Command } from '../types';
import { profile } from '../data/profile';

export const about: Command = {
  name: 'about',
  description: 'Short intro - who I am and what I build.',
  aliases: ['whoami', 'me'],
  run: () => ({
    kind: 'output',
    node: (
      <>
        <h2 className="output-heading">{profile.name}</h2>
        <p className="muted">{profile.tagline}</p>
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </>
    ),
  }),
};
