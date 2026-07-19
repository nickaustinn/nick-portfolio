import useInView from '../hooks/useInView';
import { about } from '../data/site';
import './About.css';

const About = () => {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section about">
      <div className="section-inner" ref={ref}>
        <div className="section-head">
          <span className="section-index">01</span>
          <h2 className="section-title">About</h2>
        </div>

        <div className={`section-body reveal ${inView ? 'in' : ''}`}>
          <p className="about-lead">
            Senior Computer Science student at{' '}
            <span className="about-mark">University of the Pacific</span>.
          </p>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="about-para">{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
