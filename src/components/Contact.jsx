import useInView from '../hooks/useInView';
import { contact, meta } from '../data/site';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView(0.12);

  return (
    <section id="contact" className="section contact">
      <div className="section-inner" ref={ref}>
        <div className="section-head">
          <span className="section-index">04</span>
          <h2 className="section-title">Contact</h2>
        </div>

        <div className={`section-body reveal ${inView ? 'in' : ''}`}>
          <p className="contact-lead">
            Open to internships, new-grad roles, and interesting projects.
            The fastest way to reach me is below.
          </p>

          <ul className="contact-list">
            {contact.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                >
                  <span className="contact-label">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                  <span className="contact-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>

          <footer className="contact-footer">
            {meta.name} · {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Contact;
