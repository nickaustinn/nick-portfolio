/** Shown once the loading phase ends, in place of the loading line. */
export const WELCOME_MESSAGE =
  "Welcome to Nick Austin's Portfolio, type /commands to see the list of commands.";

/**
 * The single "Loading..." line. It updates in place - the dots are the only
 * thing that changes, so nothing new is ever printed beneath it.
 *
 * The animated dots are hidden from assistive tech and a static "..." stands
 * in for them: a live region that re-announced itself every 400ms would talk
 * over the visitor for the whole five seconds.
 */
export default function BootLine({ dots }: { dots: string }) {
  return (
    <p className="boot-loading">
      Loading
      <span aria-hidden="true">{dots}</span>
      <span className="visually-hidden">...</span>
    </p>
  );
}
