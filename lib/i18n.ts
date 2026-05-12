// Minimal i18n layer: single-language (English) dictionary keyed by dot-path.
// Consumers read via `useLanguage().t()` which resolves the path.

export type Lang = "en";

export const LANGUAGES: Lang[] = ["en"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).en === "string";
}

export const DICT = {
  picker: {
    season: { en: "Season" },
    language: { en: "Language" },
  },
  seasons: {
    spring: { en: "Spring" },
    summer: { en: "Summer" },
    autumn: { en: "Autumn" },
    winter: { en: "Winter" },
  },
  nav: {
    aria: { en: "Sections" },
    home: { en: "Home" },
    stack: { en: "Stack" },
    experience: { en: "Experience" },
    project: { en: "Project" },
    contact: { en: "Contact" },
  },
  header: {
    availability: { en: "Open to opportunities" },
  },
  hero: {
    greeting: { en: "Hi, I'm" },
    roleLine: { en: "Frontend Developer & Creative Coder." },
    tagline: { en: "Building modern web experiences with React and Next.js." },
    cv: { en: "Download CV" },
    hire: { en: "Contact me" },
    scroll: { en: "Scroll to explore" },
    keysHint: { en: "· hover over the keys" },
  },
  stack: {
    title: { en: "Tech Stack" },
    hint: { en: "(hint: hover over a key)" },
  },
  experience: {
    title: { en: "Experience" },
    subtitle: { en: "My professional journey." },
  },
  projects: {
    kicker: { en: "project" },
    viewMore: { en: "View more" },
    openSite: { en: "Visit site" },
    viewCode: { en: "View code" },
    close: { en: "Close" },
    stackLabel: { en: "Stack" },
    overview: { en: "Overview" },
  },
  contact: {
    kicker: { en: "contact" },
    title: { en: "Let's talk?" },
    body: { en: "If what you've seen interests you, the keyboard is ready for the first message." },
    copyEmail: { en: "Copy email" },
    openMail: { en: "Open mailto" },
    github: { en: "GitHub" },
    linkedin: { en: "LinkedIn" },
    emailToast: { en: "Email copied" },
    footer: { en: "© 2026 Your Name. All rights reserved." },
  },
  keyboard: {
    taglines: {
      javascript: { en: "Where it all started. Still here, still in charge." },
      typescript: { en: "Same JS, with a seatbelt." },
      html5: { en: "The bones of any page." },
      css: { en: "What separates good from beautiful." },
      tailwindcss: { en: "Utility-first. Design inside the HTML." },
      python: { en: "Reads like English, scales like a rocket." },
      react: { en: "Components, components, components." },
      nextdotjs: { en: "React all grown up: routing, SSR, edge." },
      vuedotjs: { en: "The most relaxed frontend." },
      nodedotjs: { en: "JavaScript on the server." },
      php: { en: "Runs more of the web than you think." },
      odoo: { en: "ERP that doesn't make you cry." },
      postgresql: { en: "The boring database that always works." },
      docker: { en: "Same on my machine, same in production." },
      git: { en: "History and a time machine for your code." },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for the active language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? path;
  return path;
}