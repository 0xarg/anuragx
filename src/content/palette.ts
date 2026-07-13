/**
 * Shared muted-pastel accent palette. The site is otherwise strictly monochrome;
 * colour is confined to the hero globe and the gutter quote particles so the two
 * effects read as one restrained colour language.
 */
export const pastel = [
  "#E39AA8", // rose
  "#9FB4E6", // periwinkle
  "#9AD9B8", // mint
  "#E7C39C", // peach
  "#C3A2E4", // lilac
  "#9AD2E0", // sky
] as const;

/**
 * Terrain colours for the hero globe's dot cloud — each sampled point is
 * classified from the natural-colour Earth texture and coloured accordingly.
 * Muted to sit alongside the pastel arcs rather than shout.
 */
export const terrain = {
  ocean: "#5B8BD0", // sea — blue
  iceCap: "#DCE7F2", // snow / ice — pale blue-white
  desert: "#E3C58C", // sand — warm tan
  forest: "#7FC59A", // vegetation — green
  land: "#B7A277", // mountains / arid land — olive-khaki
} as const;
