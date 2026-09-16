/**
 * Tappable command chips. Present at every width: on a phone they spare
 * visitors the on-screen keyboard, and on desktop they give a non-technical
 * visitor something to click instead of a blank prompt.
 */
export default function MobileShortcuts({
  names,
  onRun,
}: {
  names: string[];
  onRun: (name: string) => void;
}) {
  return (
    <nav className="shortcuts" aria-label="Command shortcuts">
      <ul className="shortcut-list">
        {names.map((name) => (
          <li key={name}>
            <button type="button" className="shortcut" onClick={() => onRun(name)}>
              /{name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
