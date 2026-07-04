export type Step = {
  step: string;
  title: string;
  description: string;
  /** lucide-react icon name resolved in the Process section. */
  icon: "Search" | "PenTool" | "Code2" | "Rocket";
};

/** Work-process steps (reference stacking "Work Process" cards). */
export const processSteps: Step[] = [
  {
    step: "Step 1",
    title: "Discovery",
    description: "Understand the goals, constraints, and the shape of a scalable system.",
    icon: "Search",
  },
  {
    step: "Step 2",
    title: "System Design",
    description: "Architect services, REST APIs, and the database schema before writing features.",
    icon: "PenTool",
  },
  {
    step: "Step 3",
    title: "Build",
    description: "Ship end-to-end features with tests, code review, and security hardening.",
    icon: "Code2",
  },
  {
    step: "Step 4",
    title: "Ship (CI/CD)",
    description: "Automate deploys with Docker, GitHub Actions, and push-to-production pipelines.",
    icon: "Rocket",
  },
];
