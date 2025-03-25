export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/match", label: "Battle" },
  { href: "/leaderboard", label: "Leaderboard", isHidden: true },
  { href: "/about", label: "About", isHidden: true },
  { href: "/terms", label: "Terms", isHidden: true },
  { href: "/privacy", label: "Privacy", isHidden: true },
] as const;

export type NavigationLink = (typeof navigationLinks)[number];
