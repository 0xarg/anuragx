import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hydration-safe "is this running on the client yet?" flag. Returns `false`
 * during SSR and the initial client hydration pass (so the markup matches),
 * then `true` on the subsequent render. Uses `useSyncExternalStore` instead of
 * a `useEffect`/`setState`, so it avoids hydration mismatches without tripping
 * the set-state-in-effect lint rule.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
