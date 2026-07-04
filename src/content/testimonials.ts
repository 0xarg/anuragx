/**
 * Testimonials — SCAFFOLD ONLY, intentionally NOT rendered on the live site.
 *
 * Per brief §5: real content is pending (2–3 curated 5-star Upwork reviews +
 * possibly 1 video testimonial). Do NOT populate with placeholder text and do
 * NOT flip the flag until verified content lands. When it does, this becomes a
 * ~5-minute update: set SHOW_TESTIMONIALS = true, add the nav link, and fill in
 * the array below. The <Testimonials /> component already matches the reference
 * card style.
 */
export const SHOW_TESTIMONIALS = false;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  /** Link to the verifiable source (e.g. Upwork review). */
  source?: string;
};

export const testimonials: Testimonial[] = [];
