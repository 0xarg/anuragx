export const site = {
  name: "Anurag Poonia",
  firstName: "Anurag",
  lastName: "Poonia",
  title: "Full-Stack Software Engineer",
  positioning:
    "Full-stack software engineer from IIT Madras building and shipping production SaaS since 2024 across Next.js, TypeScript, Node.js, and React.",
  email: "anuragpoonia.ap@gmail.com",
  resume: "/Anurag_Poonia_Resume.pdf",
  photo: "/Profile-pic.jpeg",
  location: "Hisar, Haryana, India",
  /** Shown in the top-bar availability pill. */
  available: "Available for work",
  timezone: "Works EST for US clients",
  socials: {
    github: "https://github.com/0xarg",
    linkedin: "https://linkedin.com/in/anurag-poonia",
    upwork: "https://www.upwork.com/",
  },
} as const;

/** Animated numbers for the stats bento. `prefix`/`suffix` frame the count-up. */
export const stats = [
  { label: "Earned on Upwork", value: 7000, prefix: "$", suffix: "+" },
  { label: "International clients", value: 4, prefix: "", suffix: "+" },
  { label: "Repositories indexed", value: 100, prefix: "", suffix: "+" },
  { label: "Issues analyzed", value: 500, prefix: "", suffix: "+" },
] as const;
