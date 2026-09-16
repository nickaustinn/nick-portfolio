import type { Command, Project } from '../types';
import { projectSlugs, publishedProjects } from '../data/projects';
import ProjectCard from '../components/blocks/ProjectCard';

/** Fold to bare letters and digits so 'A Way Out', 'a-way-out' and 'AWayOut' match. */
function fold(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Exact slug or name first, then prefix, then substring. */
function findProject(query: string): Project | undefined {
  const target = fold(query);
  if (target === '') return undefined;

  const candidates = publishedProjects.map((project) => ({
    project,
    slug: fold(project.slug),
    name: fold(project.name),
  }));

  return (
    candidates.find((c) => c.slug === target || c.name === target)?.project ??
    candidates.find((c) => c.slug.startsWith(target) || c.name.startsWith(target))?.project ??
    candidates.find((c) => c.slug.includes(target) || c.name.includes(target))?.project
  );
}

export const projects: Command = {
  name: 'projects',
  description: 'Everything I’ve built. Add a name for the detail view.',
  usage: '/projects [name]',
  aliases: ['work-samples', 'portfolio'],
  // Tab after `/projects ` offers the slugs.
  completions: () => projectSlugs,
  run: ({ args }) => {
    const query = args.join(' ').trim();

    if (query !== '') {
      const match = findProject(query);
      if (!match) {
        return {
          kind: 'output',
          node: (
            <>
              <p className="error">No project matches &ldquo;{query}&rdquo;.</p>
              <p className="muted">
                Try: {projectSlugs.join(', ')}
              </p>
            </>
          ),
        };
      }
      return { kind: 'output', node: <ProjectCard project={match} detailed /> };
    }

    return {
      kind: 'output',
      node: (
        <>
          <ul className="project-list">
            {publishedProjects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </>
      ),
    };
  },
};
