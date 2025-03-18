// export function getRank(rankLevel: number): string {
//   const ranks = {
//     1: "NPC",
//     2: "Street Pharmacist",
//     3: "Beat Collector",
//     4: "Rhythm Analyst",
//     5: "Melody Hunter",
//     6: "Harmony Specialist",
//     7: "Mix Master",
//     8: "Sonic Sage",
//     9: "Music Oracle",
//     10: "Taste God",
//   };
// }

export function addParamsToURL(
  data: Record<string, string>,
  id: string,
  pathName: string = "/match"
) {
  const searchParams = new URLSearchParams(Object.entries(data));
  return `${pathName}/${id}?${searchParams.toString()}`;
}
