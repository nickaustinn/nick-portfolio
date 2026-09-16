import type { ContactLink } from '../../types';

/**
 * Real anchors, so they're keyboard-tabbable and open in a normal way.
 * External links get rel="noopener noreferrer".
 */
export default function LinkList({ links }: { links: ContactLink[] }) {
  return (
    <ul className="link-list">
      {links.map((link) => (
        <li key={link.label}>
          <span className="link-label">{link.label}</span>
          <a
            className="link"
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
          >
            {link.value}
          </a>
        </li>
      ))}
    </ul>
  );
}
