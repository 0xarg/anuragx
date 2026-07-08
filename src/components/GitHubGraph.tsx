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
  // Match the SSR/first-paint render (light) until mounted to avoid a
  // hydration mismatch when the persisted theme is dark.
  const colorScheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="group overflow-x-auto">
      <div className="filter-[grayscale(1)] transition-[filter] duration-500 ease-out group-hover:filter-[grayscale(0)] motion-reduce:transition-none">
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
