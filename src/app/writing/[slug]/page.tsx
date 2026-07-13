import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { BlurFade } from "@/components/BlurFade";
import { Footer } from "@/components/sections/Footer";
import { posts, postLoaders, formatPostDate } from "@/content/writing";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Anurag Poonia`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/writing/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const load = postLoaders[slug];
  if (!post || !load) notFound();

  const { default: Content } = await load();

  return (
    <>
      <Nav />
      <Frame>
        <main className="px-6 pt-28 pb-16 sm:px-8 sm:pt-32">
          <BlurFade inView={false}>
            <Link
              href="/writing"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={13} /> writing
            </Link>
          </BlurFade>

          <BlurFade inView={false} delay={0.05}>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </BlurFade>

          <BlurFade inView={false} delay={0.1}>
            <h1 className="tracking-tight-heading mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              {post.title}
            </h1>
          </BlurFade>

          <BlurFade inView={false} delay={0.15}>
            <article className="mt-8">
              <Content />
            </article>
          </BlurFade>
        </main>
        <Footer />
      </Frame>
    </>
  );
}
