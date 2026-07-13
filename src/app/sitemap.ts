import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { posts } from "@/content/writing";

const BASE = "https://anuragx.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/writing"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyRoutes = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: new Date(),
    }));

  const postRoutes = posts.map((p) => ({
    url: `${BASE}/writing/${p.slug}`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...postRoutes];
}
