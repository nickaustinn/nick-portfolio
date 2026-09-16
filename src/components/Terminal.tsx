import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { commands, resolveCommand } from '../commands';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useAutocomplete } from '../hooks/useAutocomplete';
import OutputLine, { type Entry } from './OutputLine';
import Prompt from './Prompt';

const WELCOME: ReactNode = (
  <>
    <p>
      <strong>Nick Austin</strong> — portfolio, as a terminal.
    </p>
    <p className="muted">
      Type <code>/help</code> and press Enter to see what you can do.
    </p>
  </>
);

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, node: WELCOME }]);
  const [value, setValue] = useState('');

  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const history = useCommandHistory();
  const complete = useAutocomplete();

  const append = useCallback((entry: Omit<Entry, 'id'>) => {
    setEntries((prev) => [...prev, { id: nextId.current++, ...entry }]);
  }, []);

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      setValue('');

      // Bare Enter just moves the prompt down a line, like a real shell.
      if (trimmed === '') {
        append({ input: '' });
        return;
      }

      history.push(trimmed);

      const [name = '', ...args] = trimmed.split(/\s+/);
      const command = resolveCommand(name);

      if (!command) {
        append({
          input: trimmed,
          node: (
            <p className="error">
              command not found: {name}. Type <code>/help</code>
            </p>
          ),
        });
        return;
      }

      const result = command.run({ args, raw: trimmed, commands });

      switch (result.kind) {
        case 'clear':
          setEntries([]);
          return;
        case 'output':
          append({ input: trimmed, node: result.node });
          return;
        case 'none':
          append({ input: trimmed });
          return;
      }
    },
    [append, history],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          submit(value);
          return;

        case 'ArrowUp': {
          event.preventDefault();
          const recalled = history.recallPrevious();
          if (recalled !== null) setValue(recalled);
          return;
        }

        case 'ArrowDown': {
          event.preventDefault();
          const recalled = history.recallNext();
          if (recalled !== null) setValue(recalled);
          return;
        }

        case 'Tab': {
          event.preventDefault();
          const { value: completed, matches } = complete(value);
          setValue(completed);
          // Ambiguous prefix: print the candidates, as a shell would.
          if (matches.length > 1) {
            append({
              input: value,
              node: <p className="muted">{matches.map((m) => `/${m}`).join('   ')}</p>,
            });
          }
          return;
        }

        default:
          return;
      }
    },
    [append, complete, history, submit, value],
  );

  // Clicking the page focuses the input — except when the click was meant for
  // a link or button, or the visitor is selecting text to copy.
  const focusInput = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button')) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [entries]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal" onClick={focusInput}>
      <main
        className="terminal-screen"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {entries.map((entry) => (
          <OutputLine key={entry.id} entry={entry} />
        ))}

        <div className="input-line">
          <label className="visually-hidden" htmlFor="terminal-input">
            Enter a command
          </label>
          <Prompt />
          <input
            id="terminal-input"
            ref={inputRef}
            className="input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="go"
            aria-describedby="terminal-hint"
          />
        </div>

        <div ref={bottomRef} />
      </main>

      <p id="terminal-hint" className="hint">
        Try <code>/help</code> to list commands.
      </p>
    </div>
  );
}
