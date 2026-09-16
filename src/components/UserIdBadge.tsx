/** Inclusive bounds for the generated ID. Widen these to change the range. */
export const USER_ID_MIN = 100;
export const USER_ID_MAX = 999;

function randomUserId(): number {
  return USER_ID_MIN + Math.floor(Math.random() * (USER_ID_MAX - USER_ID_MIN + 1));
}

/**
 * Drawn once, when the module is first evaluated - so the number is fixed for
 * the whole visit and only a full reload changes it. Module scope rather than
 * component state because StrictMode mounts twice in development, and state
 * from the discarded first mount is thrown away: the visitor would watch the
 * ID change on its own. Nothing is persisted, so a new visit gets a new one.
 */
const USER_ID = randomUserId();

/** Decorative session marker in the corner; purely set dressing, so it is
 *  hidden from assistive tech rather than read out on every page. */
export default function UserIdBadge() {
  return (
    <p className="user-id" aria-hidden="true">
      user_id: {USER_ID}
    </p>
  );
}
