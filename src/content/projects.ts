export type CaseStudySection = {
  heading: string;
  /** Body paragraphs. */
  body?: string[];
  /** Optional bullet list rendered under the paragraphs. */
  bullets?: string[];
};

export type CaseStudy = {
  /** One-sentence hero subtitle framing the project. */
  summary: string;
  role: string;
  timeline: string;
  /** Problem / context paragraphs. */
  problem: string[];
  /** Approach & key-decision sections. */
  sections: CaseStudySection[];
  /** Ordered data-flow steps, rendered as a numbered architecture pipeline. */
  architecture: string[];
  /** Headline outcomes, rendered as metric tiles. */
  outcomes: { label: string; value: string }[];
};

export type Project = {
  /** URL segment for the case study at /work/<slug>. */
  slug: string;
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
  /**
   * Long-form write-up shown at /work/<slug>. DRAFT expanded from the résumé
   * bullets — Anurag should edit for voice and add any hard numbers. Kept in TS
   * (not MDX) so it stays typed and renders through one `CaseStudyView` layout.
   */
  caseStudy?: CaseStudy;
};

/**
 * Single source of truth for the Work section. Card copy (description/detail) is
 * verbatim from Anurag_Poonia_Resume.pdf — do not paraphrase those two lines.
 * URLs confirmed: live = https://anuragx.dev/<name>, repo = github.com/0xarg/<name>.
 */
export const projects: Project[] = [
  {
    slug: "openscope",
    name: "OpenScope",
    tag: "SaaS",
    description:
      "Built a production SaaS that tracks GitHub issues and generates AI-powered insights, with full authentication, protected routes, and scalable backend APIs.",
    detail:
      "Seeded the analysis engine with 100+ repositories and 500+ issues scraped and indexed for on-demand AI analysis, with a normalized ingestion pipeline feeding the insight generation layer.",
    stack: ["Next.js", "TypeScript", "Supabase", "Claude API"],
    live: "https://anuragx.dev/openscope",
    github: "https://github.com/0xarg/openscope",
    caseStudy: {
      summary:
        "A production SaaS that turns the noise of GitHub issues into AI-powered engineering insight.",
      role: "Sole engineer — design, build, ship",
      timeline: "2025",
      problem: [
        "Maintainers and teams drown in issues. Across even a handful of active repositories, the signal — what's actually breaking, what keeps recurring, what to prioritise — is buried under hundreds of tickets, and there's no view that spans repos at once.",
        "The goal was a product that ingests issues at scale and answers the questions a human would otherwise spend hours pattern-matching for, on demand and without babysitting a pipeline.",
      ],
      sections: [
        {
          heading: "A full-stack SaaS, owned end to end",
          body: [
            "I built OpenScope as a production Next.js application with full authentication, protected routes, and a set of scalable backend APIs — the whole lifecycle from schema to deploy as sole engineer.",
          ],
        },
        {
          heading: "Ingestion pipeline",
          body: [
            "The analysis engine is seeded from 100+ repositories and 500+ issues, scraped and indexed for on-demand analysis. A normalized ingestion pipeline cleans and shapes that raw data into a consistent schema before it ever reaches the insight layer.",
          ],
        },
        {
          heading: "On-demand AI analysis",
          body: [
            "Rather than pre-computing everything, insights are generated on demand against the indexed corpus, so the AI layer works from normalized, query-ready data instead of raw API payloads — keeping analysis fast and the results consistent.",
          ],
        },
      ],
      architecture: [
        "GitHub API — issues pulled across 100+ repositories",
        "Ingestion workers — scrape, normalize, and index",
        "Postgres (Supabase) — normalized issue store + auth",
        "Insight layer — on-demand Claude analysis over the index",
        "Next.js app — authenticated, protected-route UI",
      ],
      outcomes: [
        { label: "Repositories indexed", value: "100+" },
        { label: "Issues analyzed", value: "500+" },
        { label: "Auth + protected routes", value: "Full" },
        { label: "Backend APIs", value: "Scalable" },
      ],
    },
  },
  {
    slug: "stakex",
    name: "StakeX",
    tag: "Web3",
    description:
      "Developed a production-grade Ethereum staking dApp with UUPS (ERC1967) upgradeable smart contracts, time-based reward accrual, and an ERC20 reward token.",
    detail:
      "Implemented a Web3 frontend with wagmi + viem supporting MetaMask, WalletConnect, Phantom, and Backpack, with explicit gas handling and real-time reward tracking.",
    stack: ["Solidity", "Next.js", "wagmi", "viem"],
    live: "https://anuragx.dev/stakex",
    github: "https://github.com/0xarg/stakex",
    caseStudy: {
      summary:
        "A production-grade Ethereum staking dApp — upgradeable contracts, transparent rewards, and multi-wallet support.",
      role: "Sole engineer — contracts + frontend",
      timeline: "2025",
      problem: [
        "Staking UX is fragmented: users bounce between wallets, reward accrual is opaque, and shipping a v1 contract usually means locking yourself out of ever fixing it without a risky redeploy and migration.",
        "StakeX had to be upgradeable from day one, transparent about rewards in real time, and usable from whichever wallet a user already trusts.",
      ],
      sections: [
        {
          heading: "Upgradeable smart contracts",
          body: [
            "The contracts follow the UUPS (ERC1967) upgradeable proxy pattern, so logic can evolve without abandoning state or forcing a migration. Rewards accrue on a time basis and are paid in a dedicated ERC20 reward token.",
          ],
        },
        {
          heading: "A wallet-agnostic frontend",
          body: [
            "The frontend is built on wagmi + viem for type-safe, predictable chain interaction, with explicit gas handling so users always understand what they're signing.",
          ],
          bullets: [
            "MetaMask, WalletConnect, Phantom, and Backpack support",
            "Explicit gas handling on every transaction",
            "Real-time reward tracking straight from chain state",
          ],
        },
      ],
      architecture: [
        "Solidity — UUPS proxy + logic + ERC20 reward token",
        "Ethereum — deployed upgradeable contracts",
        "viem — type-safe RPC + contract reads/writes",
        "wagmi — multi-wallet connection layer",
        "Next.js UI — real-time reward tracking + explicit gas",
      ],
      outcomes: [
        { label: "Contract pattern", value: "UUPS" },
        { label: "Wallets supported", value: "4" },
        { label: "Reward accrual", value: "Real-time" },
        { label: "Reward token", value: "ERC20" },
      ],
    },
  },
  {
    slug: "watchtower",
    name: "Watchtower",
    tag: "DevTools",
    description:
      "Engineered a production uptime-monitoring system using incident-based downtime detection, with automated HTTP health checks via secure background workers and email alerts on downtime and recovery.",
    detail:
      "Cut AI operating cost ~60% by routing tasks across models by complexity — reserving frontier models (Claude 4.8) for hard reasoning and delegating routine parsing to cheaper models (Claude 4.6, GPT-4o-mini) — plus a memory/caching layer to eliminate redundant calls without degrading output quality.",
    stack: ["Node.js", "Background workers", "SMTP", "Multi-model AI"],
    live: "https://anuragx.dev/watchtower",
    github: "https://github.com/0xarg/watchtower",
    caseStudy: {
      summary:
        "Uptime monitoring with incident-based detection and a cost-aware multi-model AI layer that cut operating cost ~60%.",
      role: "Sole engineer — design, build, ship",
      timeline: "2025",
      problem: [
        "Naive monitors alert on every failed check and bury real incidents in noise. And once you bolt AI features onto a monitoring system, cost explodes if every task hits a frontier model — most of them don't need one.",
        "Watchtower had to detect genuine incidents (not blips), alert reliably on both downtime and recovery, and keep the AI layer cheap without sacrificing quality.",
      ],
      sections: [
        {
          heading: "Incident-based monitoring engine",
          body: [
            "Automated HTTP health checks run through secure background workers. Detection is incident-based rather than per-check, so a single flaky response doesn't page anyone — and email alerts fire on both downtime and recovery so on-call always knows the current state.",
          ],
        },
        {
          heading: "Cost-aware multi-model AI routing",
          body: [
            "The AI layer routes each task by complexity: frontier models (Claude 4.8) are reserved for hard reasoning, while routine parsing is delegated to cheaper models (Claude 4.6, GPT-4o-mini). A memory/caching layer eliminates redundant calls entirely.",
            "Together these cut AI operating cost by roughly 60% with no measurable drop in output quality.",
          ],
        },
      ],
      architecture: [
        "Scheduler — enqueues health-check jobs",
        "Secure background workers — run HTTP checks",
        "Incident engine — distinguishes blips from real downtime",
        "SMTP alerts — downtime + recovery notifications",
        "AI router — complexity-based model tier + memory/cache",
      ],
      outcomes: [
        { label: "AI operating cost", value: "−60%" },
        { label: "Detection", value: "Incident-based" },
        { label: "Alerts", value: "Down + recovery" },
        { label: "Workers", value: "Secure, async" },
      ],
    },
  },
];
