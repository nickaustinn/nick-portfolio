import useInView from '../hooks/useInView';
import { projects } from '../data/site';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView(0.08);
  const shown = projects.filter((p) => !p.draft);

  return (
    <section id="projects" className="section projects">
      <div className="section-inner" ref={ref}>
        <div className="section-head">
          <span className="section-index">02</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="section-body">
          <ul className="projects-grid">
            {shown.map((p, i) => (
              <li
                key={p.title}
                className={`project reveal ${inView ? 'in' : ''}`}
                style={{ transitionDelay: `${0.08 * i}s` }}
              >
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>

                <ul className="project-tech">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                {(p.liveUrl || p.sourceUrl) && (
                  <div className="project-links">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Visit site <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {p.sourceUrl && (
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Source <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;
