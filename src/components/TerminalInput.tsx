import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import Prompt from './Prompt';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

/**
 * The prompt line.
 *
 * A real <input> handles typing, selection and mobile keyboards; its own text
 * and caret are transparent, and a mirrored copy underneath draws the blinking
 * block cursor. The mirror tracks `selectionStart`, so the block sits where
 * the caret actually is — including after arrow keys or a click mid-string.
 *
 * Both layers use `white-space: pre` and never wrap, and the mirror is
 * translated by the input's own scrollLeft, so the two can't drift apart on a
 * long line and the page never scrolls sideways.
 */
export default function TerminalInput({ value, onChange, onKeyDown, inputRef }: Props) {
  const [caret, setCaret] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [focused, setFocused] = useState(false);

  const sync = useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    setCaret(input.selectionStart ?? input.value.length);
    setScrollLeft(input.scrollLeft);
  }, [inputRef]);

  // The value can change from outside (history recall, Tab completion), so
  // re-measure whenever it does rather than only on user events.
  useEffect(() => {
    sync();
  }, [value, sync]);

  return (
    <div className="input-line">
      <label className="visually-hidden" htmlFor="terminal-input">
        Enter a command
      </label>
      <Prompt />

      <div className="input-wrap">
        <input
          id="terminal-input"
          ref={inputRef}
          className="input"
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            sync();
          }}
          onKeyDown={onKeyDown}
          onKeyUp={sync}
          onClick={sync}
          onSelect={sync}
          onScroll={sync}
          onFocus={() => {
            setFocused(true);
            sync();
          }}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          enterKeyHint="go"
          aria-describedby="terminal-hint"
        />

        <div
          className="input-mirror"
          style={{ transform: `translateX(${-scrollLeft}px)` }}
          aria-hidden="true"
        >
          <span>{value.slice(0, caret)}</span>
          <span className={focused ? 'cursor' : 'cursor cursor--idle'}>
            {value[caret] ?? ' '}
          </span>
          <span>{value.slice(caret + 1)}</span>
        </div>
      </div>
    </div>
  );
}
