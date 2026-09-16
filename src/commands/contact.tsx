import type { Command } from '../types';
import { contactLinks } from '../data/contact';
import { profile } from '../data/profile';
import LinkList from '../components/blocks/LinkList';

export const contact: Command = {
  name: 'contact',
  description: 'Email, GitHub, LinkedIn.',
  aliases: ['email', 'links'],
  run: () => ({
    kind: 'output',
    node: (
      <>
        <p>{profile.availability}</p>
        <LinkList links={contactLinks} />
      </>
    ),
  }),
};
