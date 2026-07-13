import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let `.mdx` files compile as imports (blog posts live in src/content/writing).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    // Enables the browser View Transitions API for client navigations. Paired
    // with matching `viewTransitionName` CSS on a project card title and its
    // case-study heading so the title morphs across the navigation. Degrades
    // gracefully — navigation works normally where transitions aren't applied.
    viewTransition: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
