import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.slug }));
}

/** One share card per case study. Monochrome to match the site; no external
 *  font fetch so the build stays hermetic. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.caseStudy);
  const name = project?.name ?? "Case Study";
  const tag = project?.tag ?? "";
  const summary = project?.caseStudy?.summary ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f5",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#9b9ba3" }}>
          anurag.dev{tag ? ` · ${tag}` : ""}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -2 }}>
            {name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#b8b8bf",
              maxWidth: 960,
            }}
          >
            {summary}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9b9ba3" }}>
          Anurag Poonia — Full-Stack Software Engineer
        </div>
      </div>
    ),
    size,
  );
}
