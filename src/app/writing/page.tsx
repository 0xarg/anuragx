import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { BlurFade } from "@/components/BlurFade";
import { Footer } from "@/components/sections/Footer";
import { postsByDate, formatPostDate } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing — Anurag Poonia",
  description:
    "Notes on shipping production software as a full-stack engineer — architecture, delivery, and lessons from building SaaS solo.",
  openGraph: {
    title: "Writing — Anurag Poonia",
    description:
      "Notes on shipping production software as a full-stack engineer.",
    url: "/writing",
    type: "website",
  },
};

export default function WritingPage() {
  return (
    <>
      <Nav />
      <Frame>
        <main className="px-6 pt-28 pb-16 sm:px-8 sm:pt-32">
          <BlurFade inView={false}>
            <span className="eyebrow">writing</span>
          </BlurFade>
          <BlurFade inView={false} delay={0.05}>
            <h1 className="tracking-tight-heading mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Writing
            </h1>
          </BlurFade>
          <BlurFade inView={false} delay={0.1}>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-strong">
              Notes on shipping production software — architecture, delivery, and
              what building SaaS solo actually teaches you.
            </p>
          </BlurFade>

          <ul className="mt-10 flex flex-col">
            {postsByDate.map((post, i) => (
              <BlurFade as="li" key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block border-t border-border py-6"
                >
                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-medium text-foreground transition-colors group-hover:text-muted-strong">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-foreground">
                    Read
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </BlurFade>
            ))}
          </ul>
        </main>
        <Footer />
      </Frame>
    </>
  );
}
