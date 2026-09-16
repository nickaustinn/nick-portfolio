export const PROMPT = 'guest_user:~$';

/** The static prompt string, echoed on history lines and shown before the input. */
export default function Prompt() {
  return (
    <span className="prompt" aria-hidden="true">
      {PROMPT}
    </span>
  );
}
