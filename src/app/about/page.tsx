import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { BlurFade } from "@/components/BlurFade";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/content/site";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About — Anurag Poonia",
  description:
    "Full-stack engineer from IIT Madras who takes products from an empty repo to production as sole engineer — Next.js, TypeScript, Node.js, React.",
  openGraph: {
    title: "About — Anurag Poonia",
    description:
      "Full-stack engineer who takes products from an empty repo to production as sole engineer.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <Frame>
        <main className="px-6 pt-28 pb-4 sm:px-8 sm:pt-32">
          <BlurFade inView={false}>
            <span className="eyebrow">about</span>
          </BlurFade>

          <div className="mt-4 flex items-start justify-between gap-6">
            <BlurFade inView={false} delay={0.05}>
              <h1 className="tracking-tight-heading max-w-lg text-3xl font-semibold text-foreground sm:text-4xl">
                {about.lead}
              </h1>
            </BlurFade>
            <BlurFade inView={false} delay={0.1}>
              <Image
                src={site.photo}
                alt={site.name}
                width={128}
                height={128}
                priority
                className="h-20 w-20 shrink-0 rounded-full border border-border object-cover object-top sm:h-24 sm:w-24"
              />
            </BlurFade>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {about.paragraphs.map((p, i) => (
              <BlurFade key={i} inView={false} delay={0.15 + i * 0.05}>
                <p className="text-[15px] leading-relaxed text-muted-strong sm:text-base">
                  {p}
                </p>
              </BlurFade>
            ))}
          </div>

          <div className="mt-10">
            <BlurFade>
              <span className="eyebrow">how i work</span>
            </BlurFade>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {about.howIWork.map((item, i) => (
                <BlurFade key={item.title} delay={i * 0.05}>
                  <div className="h-full rounded-[var(--radius-card)] border border-border bg-card/60 p-5">
                    <h3 className="text-sm font-medium text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </main>

        <Experience />
        <Education />
        <Contact />
        <Footer />
      </Frame>
    </>
  );
}
