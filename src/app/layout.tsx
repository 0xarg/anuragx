import type { Metadata } from "next";
import { Inter, Oswald, Sacramento } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/Cursor";

/** Body / UI type — variable, wide range. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Condensed grotesque for the big statement headings (matches the reference). */
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** Script signature for the hero first-name flourish. */
const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
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
      className={`${inter.variable} ${oswald.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
