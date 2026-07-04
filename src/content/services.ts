export type Service = {
  title: string;
  /** Supporting sub-items revealed on hover (reference "My Services"). */
  items: string[];
};

export const services: Service[] = [
  {
    title: "Full-Stack Builds",
    items: ["Next.js + TypeScript", "End-to-end features", "Zero-to-one delivery"],
  },
  {
    title: "Backend & APIs",
    items: ["NestJS · Express", "REST API design", "PostgreSQL data modeling"],
  },
  {
    title: "DevOps & CI/CD",
    items: ["Docker · GitHub Actions", "Nginx · PM2 · VPS", "Staging → production"],
  },
  {
    title: "AI Integration",
    items: ["Claude API workflows", "Automated content pipelines", "Multi-model routing"],
  },
];
