import type { Project } from '../../types';

/**
 * One project. The summary form is what /projects lists; the detail form is
 * what /projects <name> shows. Links render only when a URL exists, so a
 * project without a repo simply has no link rather than a broken one.
 */
export default function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project;
  detailed?: boolean;
}) {
  const hasLinks = Boolean(project.liveUrl ?? project.sourceUrl);

  return (
    <article className="project">
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.description}</p>

      {project.tech.length > 0 && (
        <p className="project-tech">
          <span className="project-tech-label">tech</span>{' '}
          {project.tech.join(' · ')}
        </p>
      )}

      {hasLinks ? (
        <p className="project-links">
          {project.liveUrl && (
            <a className="link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              live site
            </a>
          )}
          {project.sourceUrl && (
            <a className="link" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
              source
            </a>
          )}
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
