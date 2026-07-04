export type Project = {
  name: string;
  /** Category tag reinforcing full-stack positioning (not blockchain-first). */
  tag: string;
  /** One-line "what it does" (verbatim from resume, first bullet). */
  description: string;
  /** Second detail line (verbatim from resume, second bullet). */
  detail: string;
  stack: string[];
  live: string;
  github: string;
  /**
   * Optional screenshot for the Work card. Drop a file at /public/work/<name>.png
   * and set e.g. "/work/openscope.png". When absent, the card renders a tasteful
   * gradient backdrop instead.
   */
  image?: string;
};

/**
 * Single source of truth for the Work section. Copy is pulled verbatim from
 * Anurag_Poonia_Resume.pdf — do not paraphrase.
 * URLs confirmed: live = https://anuragx.dev/<name>, repo = github.com/0xarg/<name>.
 */
export const projects: Project[] = [
  {
    name: "OpenScope",
    tag: "SaaS",
    description:
      "Built a production SaaS that tracks GitHub issues and generates AI-powered insights, with full authentication, protected routes, and scalable backend APIs.",
    detail:
      "Seeded the analysis engine with 100+ repositories and 500+ issues scraped and indexed for on-demand AI analysis, with a normalized ingestion pipeline feeding the insight generation layer.",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude API"],
    live: "https://anuragx.dev/openscope",
    github: "https://github.com/0xarg/openscope",
  },
  {
    name: "StakeX",
    tag: "Web3",
    description:
      "Developed a production-grade Ethereum staking dApp with UUPS (ERC1967) upgradeable smart contracts, time-based reward accrual, and an ERC20 reward token.",
    detail:
      "Implemented a Web3 frontend with wagmi + viem supporting MetaMask, WalletConnect, Phantom, and Backpack, with explicit gas handling and real-time reward tracking.",
    stack: ["Solidity", "Next.js", "wagmi", "viem"],
    live: "https://anuragx.dev/stakex",
    github: "https://github.com/0xarg/stakex",
  },
  {
    name: "Watchtower",
    tag: "DevTools",
    description:
      "Engineered a production uptime-monitoring system using incident-based downtime detection, with automated HTTP health checks via secure background workers and email alerts on downtime and recovery.",
    detail:
      "Cut AI operating cost ~60% by routing tasks across models by complexity — reserving frontier models (Claude 4.8) for hard reasoning and delegating routine parsing to cheaper models (Claude 4.6, GPT-4o-mini) — plus a memory/caching layer to eliminate redundant calls without degrading output quality.",
    stack: ["Node.js", "Background workers", "SMTP", "Multi-model AI"],
    live: "https://anuragx.dev/watchtower",
    github: "https://github.com/0xarg/watchtower",
  },
];
