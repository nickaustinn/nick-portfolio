# nick-portfolio

My portfolio, built as a terminal. Visitors land on a boot screen and type
commands (`/about`, `/projects`, `/contact`) to get around.

Green on black, VT323 for the banner, a blinking block cursor, light CRT
scanlines. React + TypeScript on Vite, deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # type-check, then production build to dist/
npm run preview  # serve the production build locally
```

`npm run build` runs `tsc -b` before Vite, so a type error fails the build
rather than reaching the browser.

## Layout

```
index.html              entry document, meta tags, fonts
vercel.json             build + SPA rewrite + asset caching
src/
  main.tsx              mounts the app, imports the three stylesheets
  types.ts              Command contract + every content shape
  data/                 ALL CONTENT LIVES HERE - see below
  commands/             one file per command, plus index.ts (the registry)
  components/           Terminal, banner, prompt line, user-id badge
    blocks/             reusable output pieces (project card, timeline, links)
  hooks/                history, autocomplete, typewriter, reduced-motion
  styles/               tokens.css, terminal.css, crt.css
```

## Editing content

Content is entirely separate from UI. To change what the site says, edit a
file in `src/data/`. You never need to open a component.

| File | Holds |
| --- | --- |
| `profile.ts` | Name, tagline, the `/about` paragraphs, availability line |
| `projects.ts` | Every project: slug, date, tech, highlights, links |
| `skills.ts` | Skill groups |
| `education.ts` | `/school` timeline |
| `experience.ts` | `/experience` timeline |
| `contact.ts` | Contact links and the resume URL |

Some conventions worth knowing:

- **Links are null when they don't exist.** A project with `github: null`
  renders no source link at all, so the site can never show a dead one.
- **`draft: true` hides a project** from `/projects` until it's ready.
- **`period: null` renders no dates**, rather than a visible placeholder.
- **`resumeUrl: null`** makes `/resume` explain the PDF isn't posted and offer
  the contact links instead of 404-ing. Drop a file at `public/resume.pdf` and
  set `resumeUrl` to `'/resume.pdf'` to turn it on.

## Adding a command

Adding a command is one new file plus one line in the registry.

1. Create `src/commands/hello.tsx`:

   ```tsx
   import type { Command } from '../types';

   export const hello: Command = {
     name: 'hello',
     description: 'Say hello.',
     aliases: ['hi'],          // optional, not listed in /help
     usage: '/hello [name]',   // optional, shown by /help when set
     run: ({ args }) => ({
       kind: 'output',
       node: <p>Hello, {args[0] ?? 'stranger'}.</p>,
     }),
   };
   ```

2. Import it in `src/commands/index.ts` and add it to the `commands` array.
   That array's order is the order `/help` prints.

A handler returns `{ kind: 'output', node }` to print something,
`{ kind: 'clear' }` to wipe the screen, or `{ kind: 'none' }` to print nothing.
Commands return React nodes, not strings, so output uses real markup: real
`<a>` elements that tab and open normally, real headings and lists.

Input handling is shared, so a new command automatically gets Tab completion,
command history and case-insensitivity. Commands run only when typed with a
leading slash: `/hello` works, `hello` does not.

## Accessibility

- Output is a `role="log"` / `aria-live="polite"` region, so results are
  announced as they appear.
- The prompt input has a real (visually hidden) label; links are real anchors
  in tab order.
- `#33ff33` on `#000` is 15.3:1, past WCAG AAA. The dimmest text still clears
  7:1.
- The boot typewriter is skipped by any keypress or tap, and disabled entirely
  under `prefers-reduced-motion`. CRT scanlines are static and never animate.
- Autofocus only happens where there's a real keyboard. On touch devices,
  tapping opens the keyboard instead.

## Dependencies

`react` and `react-dom` at runtime; `vite`, `typescript` and the React plugin
for the build. Nothing else. The terminal's history, autocomplete and output
buffer are a few small hooks rather than a library.

## Deployment

Vercel, from `vercel.json`: `npm run build` into `dist/`, all paths rewritten
to `index.html`, hashed assets cached for a year. Static files in `public/`
(favicon, robots, a resume PDF) are served before the rewrite applies.
