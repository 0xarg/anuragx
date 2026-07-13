"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { useMounted } from "@/hooks/useMounted";

/**
 * GitHub contribution calendar. Rendered grayscale at rest and revealed in
 * GitHub-green on hover (see the grayscale→color filter on the wrapper). We
 * pass an explicit `colorScheme` from next-themes because our theme is
 * class-based with system detection disabled — relying on prefers-color-scheme
 * would desync the calendar from the toggle.
 */

// GitHub's 5-stop green scales (empty → most active), one per color scheme.
const greenTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function GitHubGraph() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  // The calendar fetches its data on the client and renders a different
  // (loading) tree during SSR, which tripped a hydration mismatch. It has no
  // SSR/SEO value anyway, so render a same-height placeholder until mounted and
  // only mount the real calendar on the client.
  if (!mounted) {
    return (
      <div
        aria-hidden
        className="h-[118px] w-full animate-pulse rounded-[var(--radius-lg)] bg-card"
      />
    );
  }

  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="group overflow-x-auto">
      {/* Grayscale at rest; on hover it desaturates to full GitHub-green and
          lifts a touch — "hover to bring it to life". */}
      <div className="origin-left transition-[filter,transform] duration-500 ease-out filter-[grayscale(1)] group-hover:scale-[1.01] group-hover:filter-[grayscale(0)] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <GitHubCalendar
          username={site.githubUsername}
          colorScheme={colorScheme}
          theme={greenTheme}
          blockSize={11}
          blockMargin={3}
          fontSize={12}
          showColorLegend={false}
        />
      </div>
    </div>
  );
}
