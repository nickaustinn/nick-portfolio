import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { commands, hasCommandPrefix, resolveCommand } from '../commands';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { useBootSequence } from '../hooks/useBootSequence';
import OutputLine, { type Entry } from './OutputLine';
import BootLine, { WELCOME_MESSAGE } from './BootLine';
import TerminalInput from './TerminalInput';
import UserIdBadge from './UserIdBadge';

/** Only focus on load where there is a real keyboard. Auto-focusing on a phone
 *  throws up the on-screen keyboard before the visitor has read a word; there,
 *  tapping the screen opens it. */
function hasKeyboard(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');

  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const boot = useBootSequence();
  const history = useCommandHistory();
  const complete = useAutocomplete();

  const append = useCallback((entry: Omit<Entry, 'id'>) => {
    setEntries((prev) => [...prev, { id: nextId.current++, ...entry }]);
  }, []);

  const run = useCallback(
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
              command not found: {name}.{' '}
              {!hasCommandPrefix(name) && <>Commands start with /. </>}
              Type <code>/commands</code> to see the list.
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
          run(value);
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
    [append, complete, history, run, value],
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

  // The loading line hands over to the welcome message, which is scrollback
  // like any other output — so /clear wipes it, and the live region announces
  // it. The ref keeps StrictMode's second mount from printing it twice.
  const welcomed = useRef(false);
  useEffect(() => {
    if (boot.loading || welcomed.current) return;
    welcomed.current = true;
    append({ node: <p className="boot-welcome">{WELCOME_MESSAGE}</p> });
    if (hasKeyboard()) inputRef.current?.focus();
  }, [append, boot.loading]);

  return (
    <div className="terminal" onClick={focusInput}>
      <main className="terminal-screen">
        <div className="scrollback" role="log" aria-live="polite" aria-label="Terminal output">
          {boot.loading && <BootLine dots={boot.dots} />}
          {entries.map((entry) => (
            <OutputLine key={entry.id} entry={entry} />
          ))}
        </div>

        {/* No prompt until the sequence finishes: leaving the input unmounted
            is what makes it unusable, and means stray keypresses during the
            wait land nowhere rather than being typed in and then discarded. */}
        {!boot.loading && (
          <TerminalInput
            value={value}
            onChange={setValue}
            onKeyDown={onKeyDown}
            inputRef={inputRef}
          />
        )}

        <div className="scroll-anchor" ref={bottomRef} />
      </main>

      <footer className="dock">
        <p id="terminal-hint" className="hint">
          New here? Start with <code>/about</code>, <code>/projects</code> or{' '}
          <code>/contact</code>. <code>/commands</code> lists everything.
        </p>
      </footer>

      {/* Outside the dock so the dock's own padding can't clip it, and outside
          the boot branch so it is there from the first paint. */}
      <UserIdBadge />
    </div>
  );
}
