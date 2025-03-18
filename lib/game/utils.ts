export function getRank(rankLevel: number): string {
  const ranks = {
    1: "NPC",
    2: "Street Pharmacist",
    3: "Beat Collector",
    4: "Rhythm Analyst",
    5: "Melody Hunter",
    6: "Harmony Specialist",
    7: "Mix Master",
    8: "Sonic Sage",
    9: "Music Oracle",
    10: "Taste God",
  } as const;

  return ranks[rankLevel as keyof typeof ranks] || "NPC";
}

export function addParamsToURL(
  params: Record<string, string>,
  slug: string,
  pathName: string = "/match"
) {
  const searchParams = new URLSearchParams(Object.entries(params));
  return `${pathName}/${slug}?${searchParams.toString()}`;
}
