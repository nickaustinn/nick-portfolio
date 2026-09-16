import { useMemo } from 'react';
import { profile } from '../data/profile';
import { publishedProjects } from '../data/projects';
import { useTypewriter } from '../hooks/useTypewriter';

/**
 * The boot screen. The counts come from the data files, so the banner can't
 * drift out of sync with what /projects actually shows.
 *
 * There's deliberately no ASCII-art wordmark: fixed-width art either wraps or
 * forces horizontal scroll on a phone. A large VT323 heading gives the same
 * pixel-terminal read and scales fluidly instead.
 */
export default function Banner() {
  const lines = useMemo(
    () => [
      'booting nick-portfolio ...',
      '[ ok ] profile loaded',
      `[ ok ] ${publishedProjects.length} projects mounted`,
      '[ ok ] ready',
    ],
    [],
  );

  const { visible, done } = useTypewriter(lines);

  return (
    <header className="banner">
      <h1 className="banner-name">{profile.name}</h1>
      <p className="banner-tagline">{profile.tagline}</p>

      <div className="banner-boot" aria-hidden="true">
        {visible.map((line, index) => (
          <p className="boot-line" key={lines[index]}>
            {line}
          </p>
        ))}
      </div>

      {done && (
        <p className="banner-cta">
          Type <code>/commands</code> and press Enter to see every command
          {', '}or tap one below.
        </p>
      )}
    </header>
  );
}
