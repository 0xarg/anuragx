export type Experience = {
  role: string;
  company: string;
  context: string;
  period: string;
  /** Sorted newest-first for display. */
  href?: string;
};

/**
 * Experience rows — verbatim from Anurag_Poonia_Resume.pdf. Do not paraphrase
 * titles/dates. Rendered as hover-reveal rows (reference "Experiences" list).
 */
export const experiences: Experience[] = [
  {
    role: "Founding Software Engineer",
    company: "Facile",
    context: "Digital Identity / Smart-NFC Platform",
    period: "Jun 2026 — Present",
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Independent",
    context: "International Clients · Upwork, Top Rated",
    period: "Jan 2026 — Present",
  },
  {
    role: "Full-Stack Software Engineer",
    company: "Antspace",
    context: "US-based SaaS Startup",
    period: "Nov 2025 — Jul 2026",
  },
];

/** Big word-reveal intro paragraph above the experience list. */
export const experienceIntro =
  "I own the full lifecycle as sole engineer for international clients — system design, REST APIs, database schema, testing, and CI/CD deployment — with a focus on scalable architecture, security hardening, and reliable zero-to-one delivery.";
