export interface TimelineItem {
  /** Institution or employer. */
  title: string;
  /** Degree or role. */
  subtitle: string;
  /** Rendered only when present — a null period shows no dates at all. */
  period: string | null;
  bullets: string[];
}

/**
 * Vertical timeline shared by /school and /experience. An ordered list is
 * the right markup: these entries are sequential, and a screen reader
 * announcing "1 of 2" is useful here.
 */
export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li className="timeline-item" key={`${item.title}-${item.subtitle}`}>
          <h3 className="timeline-title">
            {item.title}
            {item.period && <span className="timeline-period"> · {item.period}</span>}
          </h3>
          <p className="timeline-subtitle">{item.subtitle}</p>
          {item.bullets.length > 0 && (
            <ul className="timeline-bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
