import type { Command } from '../../types';

/**
 * The /commands listing: one row per command, name on the left, description on
 * the right. A description list is the honest markup for name/definition
 * pairs, so screen readers announce the pairing rather than a wall of text.
 */
export default function HelpTable({ commands }: { commands: Command[] }) {
  return (
    <dl className="help-table">
      {commands.map((command) => (
        <div className="help-row" key={command.name}>
          <dt className="help-name">{command.usage ?? `/${command.name}`}</dt>
          <dd className="help-desc">{command.description}</dd>
        </div>
      ))}
    </dl>
  );
}
