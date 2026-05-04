export type HotspotData = {
  id: string;
  step: number;
  topPct: number;
  leftPct: number;
  label: string;
  header: string;
  body: string;
  offsetX?: number;
  offsetY?: number;
};

export const ARCHITECTURE_HOTSPOTS: HotspotData[] = [
  {
    id: "entry",
    step: 1,
    topPct: 55,
    leftPct: 75,
    label: "Entry / Threshold",
    header: "Entry / Threshold",
    body: "Good design begins by helping people arrive - gently, clearly, without hesitation.",
    offsetX: 400,
    offsetY: 60,
  },
  {
    id: "living",
    step: 2,
    topPct: 25,
    leftPct: 60,
    label: "Living Space",
    header: "Living Space",
    body: "I’ve learned to design for shared moments, where interaction feels natural, not forced.",
    offsetX: -200,
    offsetY: 60,
  },
  {
    id: "courtyard",
    step: 3,
    topPct: 40,
    leftPct: 50,
    label: "Courtyard",
    header: "Courtyard",
    body: "Not everything needs to move forward, I design for pauses, where people can simply be.",
    offsetX: -300,
    offsetY: 100,
  },
  {
    id: "garden",
    step: 4,
    topPct: 60,
    leftPct: 60,
    label: "Garden / Flow",
    header: "Garden / Flow",
    body: "When something is truly intuitive, it doesn’t feel designed at all, it just feels right.",
    offsetX: -240,
    offsetY: 100,
  },
  {
    id: "structure",
    step: 5,
    topPct: 10,
    leftPct: 65,
    label: "Structure / Arches",
    header: "Structure / Arches",
    body: "Constraints aren’t limitations, they quietly shape clarity and direction.",
    offsetX: 340,
    offsetY: 100,
  },
];
