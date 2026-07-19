import useInView from '../hooks/useInView';
import { skillGroups } from '../data/site';
import './Skills.css';

const Skills = () => {
  const [ref, inView] = useInView(0.12);

  return (
    <section id="skills" className="section skills">
      <div className="section-inner" ref={ref}>
        <div className="section-head">
          <span className="section-index">03</span>
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="section-body">
          <dl className="skills-groups">
            {skillGroups.map((g, i) => (
              <div
                key={g.category}
                className={`skill-group reveal ${inView ? 'in' : ''}`}
                style={{ transitionDelay: `${0.08 * i}s` }}
              >
                <dt className="skill-category">{g.category}</dt>
                <dd>
                  <ul className="skill-list">
                    {g.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Skills;
