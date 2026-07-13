import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { Footer } from "@/components/sections/Footer";
import { CaseStudyView } from "@/components/CaseStudyView";
import { projects } from "@/content/projects";

const SITE_NAME = "Anurag Poonia";

/** Only projects with a written case study get a page. */
const caseStudies = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} — Case Study · ${SITE_NAME}`;
  const description = project.caseStudy!.summary;
  const url = `/work/${project.slug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <Frame>
        <CaseStudyView project={project} />
        <Footer />
      </Frame>
    </>
  );
}
