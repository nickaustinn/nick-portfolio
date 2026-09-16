// Who you are. Edit copy here; no component hardcodes any of it.

export const profile = {
  name: 'Nick Austin',
  tagline: 'Senior Computer Science student at University of the Pacific',
  /** Shown by /about, one <p> per entry. */
  about: [
    "I'm a senior Computer Science student at the University of the Pacific, " +
      'with a minor in Data Science. I work across the full stack, from system ' +
      'architecture down to the details of a polished user experience.',
    "I'm drawn to building real, usable things: a full-stack web app, a machine " +
      'learning model, a game you steer with your eyes. Alongside coursework ' +
      "I've shipped team projects run on a full Agile process, and attended an " +
      'intensive machine-learning bootcamp (iDTech) covering neural networks and ' +
      'applied AI.',
  ],
  /** What /contact leads with. */
  availability: 'Open to roles, contact me here',
} as const;
