export type CategorySlug =
  | "warm-up"
  | "skating"
  | "shooting"
  | "passing"
  | "small-area-games"
  | "breakouts"
  | "regroups"
  | "defensive-zone"
  | "offensive-zone"
  | "forecheck"
  | "face-offs"
  | "special-teams"
  | "battles";

export const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "warm-up", label: "Warm-up" },
  { slug: "skating", label: "Skating" },
  { slug: "shooting", label: "Shooting" },
  { slug: "passing", label: "Passing" },
  { slug: "small-area-games", label: "Small Area Game" },
  { slug: "breakouts", label: "Breakout" },
  { slug: "regroups", label: "Regroup" },
  { slug: "defensive-zone", label: "Defensive Zone" },
  { slug: "offensive-zone", label: "Offensive Zone" },
  { slug: "forecheck", label: "Forecheck" },
  { slug: "face-offs", label: "Face-offs" },
  { slug: "special-teams", label: "Special Teams" },
  { slug: "battles", label: "Battle" },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);
export const categoryLabel = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
