import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

/** Body / UI type — clean neutral grotesque. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Monospace for eyebrows, labels, dates, and tech tags. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const positioning =
  "Full-stack software engineer from IIT Madras building and shipping production SaaS since 2024 across Next.js, TypeScript, Node.js, and React.";

export const metadata: Metadata = {
  metadataBase: new URL("https://anuragx.dev"),
  title: "Anurag Poonia — Full-Stack Software Engineer",
  description: positioning,
  openGraph: {
    title: "Anurag Poonia — Full-Stack Software Engineer",
    description: positioning,
    url: "https://anuragx.dev",
    siteName: "Anurag Poonia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anurag Poonia — Full-Stack Software Engineer",
    description: positioning,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
