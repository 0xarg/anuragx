export const site = {
  name: "Anurag Poonia",
  firstName: "Anurag",
  lastName: "Poonia",
  title: "Full-Stack Software Engineer",
  positioning:
    "Full-stack software engineer from IIT Madras building and shipping production SaaS since 2024 across Next.js, TypeScript, Node.js, and React.",
  email: "anuragpoonia.ap@gmail.com",
  resume: "/Anurag_Poonia_Resume.pdf",
  photo: "/Profile2.png",
  location: "Hisar, Haryana, India",
  /** Shown in the top-bar availability pill. */
  available: "Available for work",
  /** Catchline for the vertical gutter marquees — trailing separator keeps the
   *  repeated loop evenly spaced. */
  marquee:
    "Building production SaaS · Shipping since 2024 · Full-stack engineering · Next.js · TypeScript · Node.js · ",
  timezone: "Works EST for US clients",
  /** GitHub handle — single source of truth for the contribution graph. */
  githubUsername: "0xarg",
  socials: {
    github: "https://github.com/0xarg",
    linkedin: "https://www.linkedin.com/in/anurag-poonia-665075295/",
    x: "https://x.com/0xanrg",
    upwork: "https://www.upwork.com/freelancers/anuragp50?mp_source=share",
  },
} as const;

/** Animated numbers for the stats bento. `prefix`/`suffix` frame the count-up. */
export const stats = [
  { label: "Earned on Upwork", value: 7000, prefix: "$", suffix: "+" },
  { label: "International clients", value: 4, prefix: "", suffix: "+" },
  { label: "Repositories indexed", value: 100, prefix: "", suffix: "+" },
  { label: "Issues analyzed", value: 500, prefix: "", suffix: "+" },
] as const;
