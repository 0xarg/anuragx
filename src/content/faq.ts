export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  {
    q: "Are you available for new projects?",
    a: "Yes — I take on full-stack engineering work for international clients, remotely. The fastest way to start is an email with a short brief.",
  },
  {
    q: "How do you engage — contract or full-time?",
    a: "Primarily fixed-scope and ongoing contracts (Upwork, Top Rated) as the sole engineer. I own system design, APIs, database, testing, and deployment end-to-end.",
  },
  {
    q: "What's your core stack?",
    a: "TypeScript across the stack: Next.js and React on the frontend; Node.js, NestJS, and Express on the backend; PostgreSQL and Supabase for data; Docker and GitHub Actions for CI/CD.",
  },
  {
    q: "What are typical timelines?",
    a: "It depends on scope, but I've delivered focused builds on fixed deadlines — including rescuing and hardening a production codebase under a 40-day, 7-phase contract.",
  },
  {
    q: "Which timezone do you work in?",
    a: "I'm based in India and regularly work EST hours for US clients, with async-friendly communication and reliable overlap.",
  },
];
