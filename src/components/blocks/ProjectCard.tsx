import type { Project } from '../../types';

/**
 * One project. The summary form is what /projects lists - name, date and
 * stack. The detail form adds the highlights and any links. Links render only
 * when a URL exists, so a project without a repo simply has no link rather
 * than a broken one.
 */
export default function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const links = [
    { label: 'source', href: project.github },
    { label: 'demo', href: project.demo },
  ].filter((link): link is { label: string; href: string } => link.href !== null);

  return (
    <article className="project">
      <h3 className="project-name">
        {project.name}
        <span className="project-date"> · {project.date}</span>
      </h3>

      {project.tech.length > 0 && (
        <p className="project-tech">
          <span className="project-tech-label">tech</span> {project.tech.join(' · ')}
        </p>
      )}

      {detailed && project.highlights.length > 0 && (
        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      {links.length > 0 ? (
        <p className="project-links">
          {links.map((link) => (
            <a
              key={link.label}
              className="link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </p>
      ) : (
        detailed && <p className="muted">No public link for this one yet.</p>
      )}

      {!detailed && (
        <p className="muted">
          <code>/projects {project.slug}</code> for detail
        </p>
      )}
    </article>
  );
}
