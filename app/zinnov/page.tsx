"use client";
import { Fragment, useState, type ReactNode } from "react";
import { Jost, Caveat, Crimson_Text, Instrument_Serif} from "next/font/google";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { Highlight } from "@/components/ui/highlight";
import { motion, AnimatePresence } from "framer-motion";

const headingFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const headingFonttwo = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const quoteFont = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

const bodyFont = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const insightCards = [
  {
    title: "Fragmented Knowledge",
    text: "Information exists, but rarely connects into a complete picture.",
    bg: "bg-[#FDF1F1]",
  },
  {
    title: "Outdated Signals",
    text: "Available insights often fail to reflect current market realities.",
    bg: "bg-[#FFFBE6]",
  },
  {
    title: "Lack of Context",
    text: "Data is presented without the ‘why’ needed for confident decisions.",
    bg: "bg-[#EAF7F6]",
  },
  {
    title: "Manual Synthesis",
    text: "Leaders spend time stitching insights instead of making decisions.",
    bg: "bg-[#FDF1F1]",
  },
  {
    title: "Validation Burden",
    text: "Every insight needs independent verification before it can be trusted.",
    bg: "bg-[#FFFBE6]",
  },
  {
    title: "Decision Uncertainty",
    text: "Even after effort, clarity remains low and risk stays high.",
    bg: "bg-[#EAF7F6]",
  },
];

const serviceFlowNodes = [
  {
    id: "entry",
    title: "Entry Point",
    text: "GCC users are notified of new research or enter the platform to explore insights based on a business need",
    bg: "bg-[#FFFBE6]",
  },
  {
    id: "exploration",
    title: "Exploration Layer",
    text: "Users search and browse reports, insights, and benchmarks relevant to their context\n• Existing research acts as the primary resolution layer\n• Search and discovery determine next steps",
    bg: "bg-[#EEF7EC]",
  },
  {
    id: "split",
    title: "Decision Path Split",
    levels: [
      "Resolved through existing research and insights on the platform",
      "Requires additional analysis and synthesis on top of existing research",
      "Escalates into a custom engagement for bespoke research",
    ],
    bg: "bg-[#EAF7F6]",
  },
  {
    id: "intervention",
    title: "Internal Intervention",
    text: "Internal teams intervene selectively:\n• Analysts support report augmentation\n• Customer Relations and Business Development engage for deeper needs",
    bg: "bg-[#FFFBE6]",
  },
  {
    id: "consumption",
    title: "Consumption",
    text: "Users consume insights, validate them externally, and contextualise findings for internal decision-making",
    bg: "bg-[#EEF7EC]",
  },
  {
    id: "loop",
    title: "Loop Back",
    text: "Insights are shared upward for leadership consumption while the platform remains a touchpoint for ongoing exploration",
    bg: "bg-[#FFFBE6]",
  },
];

const painPointNotes: Record<string, string> = {
  exploration: "Too many sources, no clear starting point",
  split: "Unclear which path applies to my context",
  intervention: "Heavy reliance on manual support",
  consumption: "Validation happens outside the platform",
  loop: "No clear continuity of insights over time",
};

const personaData = {
  name: "Asha R.",
  role: "Strategy Lead, Global Capability Centre",
  description:
    "Needs a trusted way to turn interview signals into decisions, without losing time to manual interpretation.",
  quote:
    "“The insights are there, but I need them arranged into decisions I can actually act on.”",
  expectations: [
    "See the “why” behind each insight quickly",
    "Priorities that balance value and effort",
    "A clear next step, not another search loop",
  ],
  painPoints: [
    "Too many overlapping recommendations",
    "Hard to validate insights in time",
    "Decision-making feels fragmented and slow",
  ],
  avatarSrc: "/persona-placeholder.png",
};

type MatrixQuadrant = "HH" | "HL" | "LH" | "LL";
type MatrixIdea = {
  title: string;
  detail?: string;
  quadrant: MatrixQuadrant;
};

// Source of truth for both the post-its and the 2x2 matrix.
// Quadrants: HH (high impact/high feasibility), HL (high impact/low feasibility),
// LH (low impact/high feasibility), LL (low impact/low feasibility).
const ideas: MatrixIdea[] = [
  {
    title: "Simplify onboarding flow",
    detail: "Reduce friction so users reach meaningful insights faster.",
    quadrant: "HH",
  },
  {
    title: "Guided workflows",
    detail: "Step-by-step decision support aligned to the user’s context.",
    quadrant: "HH",
  },
  {
    title: "Reduce decision steps",
    detail: "Minimize hand-offs between search, validation, and synthesis.",
    quadrant: "HH",
  },
  {
    title: "AI summary layer",
    detail: "Condense long reports into key insights and actions.",
    quadrant: "HL",
  },
  {
    title: "Insight validation layer",
    detail: "Cross-check insights across sources to lower verification burden.",
    quadrant: "HL",
  },
  {
    title: "Improve search relevance",
    detail: "Better ranking using engagement + query intent.",
    quadrant: "HL",
  },
  {
    title: "Compare insights visually",
    detail: "Side-by-side comparison of reports, assumptions, and findings.",
    quadrant: "HL",
  },
  {
    title: "Contextual recommendations",
    detail: "Surface relevant reports based on user context and goals.",
    quadrant: "HL",
  },
  {
    title: "Smart filters",
    detail: "Dynamic filtering based on use-case, not just tags.",
    quadrant: "LH",
  },
  {
    title: "Structured report formats",
    detail: "Standardized templates for readability and faster scanning.",
    quadrant: "LH",
  },
  {
    title: "Bookmark & save flows",
    detail: "Quick access to relevant insights across sessions and teams.",
    quadrant: "LH",
  },
  {
    title: "Search by intent",
    detail: "Natural-language query support for non-technical stakeholders.",
    quadrant: "LH",
  },
  {
    title: "Personalized dashboards",
    detail: "User-specific tracking of insights and decision progress.",
    quadrant: "LL",
  },
  {
    title: "Minor UI improvements",
    detail: "Small reductions in friction across common screens.",
    quadrant: "LL",
  },
];

type PersonaCardProps = {
  name: string;
  role: string;
  description: string;
  quote: string;
  expectations: string[];
  painPoints: string[];
  avatarSrc: string;
};

function PersonaCard({
  name,
  role,
  description,
  quote,
  expectations,
  painPoints,
  avatarSrc,
}: PersonaCardProps) {
  const appsUsed = [
    "Inshorts",
    "McKinsey",
    "HBR",
    "Google",
    "Internal dashboards",
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#dfe6d5] bg-[#f8faf4]/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(199,242,240,0.45), rgba(240,211,211,0.18) 55%, rgba(255,251,230,0) 72%)",
        }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8">
        <div className="space-y-4 md:pr-4 md: flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={avatarSrc}
            alt={`${name} avatar`}
            className="h-64 w-64 rounded-xl object-cover border border-[#dfe6d5] bg-white/60 shadow-sm"
          />
          <h3
            className={`${headingFont.className} text-xl font-semibold text-gray-900 mt-1`}
          >
            {name}
          </h3>
          <div className="text-sm text-gray-500 leading-snug space-y-1">
            <p>{role}</p>
            
          </div>
    
        </div>
        
        

        <div className="space-y-5 md:px-2">
          <div>
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-600 mb-2`}
            >
              Type of work
            </p>
            <p className={`${bodyFont.className} text-sm md:text-base text-gray-700 leading-snug`}>
              {description}
            </p>
          </div>
          

          <p
            className={`${quoteFont.className} text-lg leading-relaxed text-gray-900 max-w-md`}
          >
            “The insights are there, but I need faster ways to{" "}
            <Highlight color="#EEDDDD">validate insights</Highlight> and move
            toward{" "}
            <Highlight color="#E0ECC1">decision-ready direction</Highlight>.”
          </p>
          <div>
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-600 mb-2`}
            >
              Apps used
            </p>
            <div className="flex flex-wrap gap-2">
              {appsUsed.map((app) => (
                <span
                  key={app}
                  className="text-xs px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-gray-700"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
          
          

          
        </div>

        <div className="space-y-4 md:pl-4 md:">
          <div className="rounded-xl p-4 bg-[#FDECEC] border border-[#F5B5B5]">
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-700 mb-2`}
            >
              Pain points
            </p>
            <ul className="space-y-2">
              {painPoints.map((item) => (
                <li
                  key={item}
                  className={`${bodyFont.className} text-sm text-[#7F2A2A] leading-snug`}
                >
                  - <Highlight color="#FDECEC">{item}</Highlight>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-4 bg-[#EAF4EC] border border-[#cfe2d2]">
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-700 mb-2`}
            >
              Expectations
            </p>
            <ul className="space-y-2">
              {expectations.map((item) => (
                <li
                  key={item}
                  className={`${bodyFont.className} text-sm text-gray-700 leading-snug`}
                >
                  - <Highlight color="#EAF4EC">{item}</Highlight>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

type StickyNotesProps = {
  ideas: Array<{ title: string; detail?: string }>;
};

function StickyNotes({ ideas }: StickyNotesProps) {
  const pastelNotes = [
    { bgClass: "bg-[#FDF1F1]", textClass: "text-[#6B2A2A]" },
    { bgClass: "bg-[#FFFBE6]", textClass: "text-[#5A4A12]" },
    { bgClass: "bg-[#EAF7EC]", textClass: "text-[#1F4D3A]" },
    { bgClass: "bg-[#EAF7F6]", textClass: "text-[#1E4A5A]" },
    { bgClass: "bg-[#E0ECC1]", textClass: "text-[#3B4A12]" },
    { bgClass: "bg-[#F7F0FF]", textClass: "text-[#4A2C6B]" },
  ];

  const noteData = ideas.map((idea, index) => {
    const rot = Math.round(Math.sin((index + 1) * 9.73) * 3 * 10) / 10; // stable "random" rotation
    const palette = pastelNotes[index % pastelNotes.length];
    return { title: idea.title, detail: idea.detail, rotation: rot, ...palette };
  });

  return (
    <div className="rounded-2xl border border-[#dfe6d5] bg-[#f8faf4]/60 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="px-6 md:px-8 pt-8 pb-6">
        <p
          className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3 text-center`}
        >
          User interviews
        </p>
        <h3
          className={`${headingFont.className} text-2xl md:text-3xl font-semibold text-gray-900 text-center`}
        >
          Ideas surfaced from real conversations
        </h3>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
          We translated verbatim interview signals into actionable feature directions, then prioritized them visually.
        </p>
      </div>

      <div className="relative mt-2 px-4 md:px-6 pb-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40 pointer-events-none" />

        <motion.div
          className="relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center gap-3 md:gap-4 px-2">
            {noteData.map((note) => (
              <motion.div
                key={note.title}
                custom={note.rotation}
                variants={{
                  hidden: (rotation: number) => ({
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    rotate: rotation,
                  }),
                  visible: (rotation: number) => ({
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: rotation,
                    transition: {
                      duration: 0.45,
                      ease: [0.2, 0.8, 0.2, 1],
                    },
                  }),
                }}
                style={{ transformOrigin: "50% 50%" }}
                className={[
                  "relative w-full max-w-[220px] rounded-lg",
                  note.bgClass,
                  "border border-neutral-200/70 shadow-[0_10px_26px_rgba(0,0,0,0.10)]",
                ].join(" ")}
              >
                <div className="px-3 py-2">
                  <p
                    className={`${bodyFont.className} text-sm font-medium leading-snug ${note.textClass}`}
                  >
                    {note.title}
                  </p>
                  {note.detail ? (
                    <p className="mt-1 text-xs text-gray-600 leading-snug">
                      {note.detail}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

type ImpactMatrixProps = {
  ideas: MatrixIdea[];
};

function ImpactMatrix({ ideas }: ImpactMatrixProps) {
  const highlightPhrases = [
    "Reduce friction",
    "Minimize hand-offs",
    "Step-by-step decision support",
    "tracking of insights",
    "reductions in friction",
    "Natural-language",
    "relevant insights",
    "dynamic filtering",
    "Standardized templates",
    "key insights",
    "query intent",
    "comparison",
    "user context",
    "cross-check",
  ];

  const renderWithHighlights = (text: string, color: string) => {
    let parts: Array<string | { phrase: string }> = [text];

    for (const phrase of highlightPhrases) {
      parts = parts.flatMap((p) => {
        if (typeof p !== "string") return [p];
        const idx = p.toLowerCase().indexOf(phrase.toLowerCase());
        if (idx === -1) return [p];
        return [
          p.slice(0, idx),
          { phrase: p.slice(idx, idx + phrase.length) },
          p.slice(idx + phrase.length),
        ].filter((x) => (typeof x === "string" ? x.length > 0 : true));
      });
    }

    return (
      <>
        {parts.map((p, i) =>
          typeof p === "string" ? (
            <span key={i}>{p}</span>
          ) : (
            <Highlight key={i} color={color}>
              {p.phrase}
            </Highlight>
          )
        )}
      </>
    );
  };

  const quadrants: Array<{
    id: MatrixQuadrant;
    label: string;
    accentBg: string;
    ideas: MatrixIdea[];
  }> = [
    {
      id: "HL",
      label: "High Impact / Low Feasibility",
      accentBg: "bg-[#FFFFEA]",
      ideas: ideas.filter((it) => it.quadrant === "HL"),
    },
    {
      id: "HH",
      label: "High Impact / High Feasibility",
      accentBg: "bg-[#EAF4EC]/65",
      ideas: ideas.filter((it) => it.quadrant === "HH"),
    },
    {
      id: "LL",
      label: "Low Impact / Low Feasibility",
      accentBg: "bg-[#FDECEC]",
      ideas: ideas.filter((it) => it.quadrant === "LL"),
    },
    {
      id: "LH",
      label: "Low Impact / High Feasibility",
      accentBg: "bg-[#EAF0FF]/55",
      ideas: ideas.filter((it) => it.quadrant === "LH"),
    },
  ];

  return (
    <div className="rounded-2xl border border-[#dfe6d5] bg-[#f8faf4]/55 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="px-6 md:px-8 pt-8 pb-6">
        <p
          className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3 text-center`}
        >
          Prioritization model
        </p>
        <h3
          className={`${headingFont.className} text-2xl md:text-3xl font-semibold text-gray-900 text-center`}
        >
          Impact vs feasibility
        </h3>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
          We placed each idea across a 2x2 model to surface what’s most actionable first.
        </p>
      </div>

      <div className="relative px-4 md:px-6 pb-8">
        <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(circle,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10">
          <div className="relative px-2">
            {/* Axis labels (outside the grid) */}
            

            {/* Unified graph surface */}
            <div className="relative rounded-2xl border border-[#dfe6d5] bg-white/35 shadow-[0_18px_44px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* soft quadrant overlays (no hard boundaries) */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-0 top-0 h-1/2 w-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.04),transparent_60%)]" />
                <div className="absolute right-0 top-0 h-1/2 w-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(234,244,236,0.55),transparent_62%)] opacity-[0.08]" />
                <div className="absolute left-0 bottom-0 h-1/2 w-1/2 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.35),transparent_62%)] opacity-[0.06]" />
                <div className="absolute right-0 bottom-0 h-1/2 w-1/2 bg-[radial-gradient(circle_at_70%_70%,rgba(234,240,255,0.65),transparent_62%)] opacity-[0.08]" />
              </div>

              {/* Axis lines + arrows */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[7%] bottom-[7%] w-px bg-[#dfe6d5]" />
                <div className="absolute top-1/2 left-[7%] right-[7%] h-px bg-[#dfe6d5]" />
                <div className="absolute right-[6%] top-1/2 -translate-y-1/2 text-xs text-gray-700">
                  →
                </div>
                <div className="absolute left-1/2 top-[6%] -translate-x-1/2 text-xs text-gray-700">
                  ↑
                </div>
              </div>

              {/* Quadrants */}
              <div className="grid grid-cols-2 grid-rows-2 gap-0">
                {quadrants.map((q, qIndex) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: qIndex * 0.06 }}
                    className={[
                      "relative p-4 md:p-5 min-h-[220px]",
                      "bg-transparent",
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-3 h-full">
                      {/* Quadrant heading chip */}
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs",
                            "border border-[#dfe6d5] text-gray-800",
                            q.id === "HH"
                              ? "bg-[#EAF4EC]/55"
                              : q.id === "LH"
                                ? "bg-[#EAF0FF]/45"
                                : q.id === "HL"
                                  ? "bg-[#FFFFEA]"
                                  : "bg-[#FAF1F1]",
                          ].join(" ")}
                        >
                          {q.id === "HH" ? (
                            <>
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600/70" />
                              High Impact / High Feasibility
                            </>
                          ) : (
                            q.label
                          )}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 md:gap-4 pt-1">
                        {q.ideas.length === 0 ? (
                          <span className="text-xs text-gray-400">—</span>
                        ) : (
                          q.ideas.map((idea, ideaIndex) => {
                            const maxWClass =
                              ideaIndex % 3 === 0
                                ? "max-w-[190px]"
                                : ideaIndex % 3 === 1
                                  ? "max-w-[220px]"
                                  : "max-w-[175px]";
                            const offsets = [
                              { x: 0, y: 6 },
                              { x: 8, y: 0 },
                              { x: -6, y: -4 },
                              { x: 4, y: 10 },
                              { x: -10, y: 4 },
                              { x: 10, y: -6 },
                            ];
                            const o = offsets[ideaIndex % offsets.length];
                            const highlightColor =
                              q.id === "HH"
                                ? "#E0ECC1"
                                : q.id === "LH"
                                  ? "#D1E8E9"
                                  : q.id === "HL"
                                    ? "#FFF4C8"
                                    : "#EEDDDD";

                            return (
                              <motion.span
                                key={idea.title}
                                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.35,
                                  delay: qIndex * 0.12 + ideaIndex * 0.05,
                                }}
                                className="inline-block w-fit"
                              >
                                <div
                                  style={{ top: o.y, left: o.x }}
                                  className={[
                                    "relative rounded-lg p-4 border border-gray-200 bg-white/60",
                                    "text-left",
                                    q.id === "HH" ? "bg-[#EAF4EC]/55" : "",
                                    "hover:shadow-md hover:-translate-y-1 transition",
                                    maxWClass,
                                  ].join(" ")}
                                >
                                  <span className="block text-sm font-semibold text-gray-900 leading-snug">
                                    {renderWithHighlights(idea.title, highlightColor)}
                                  </span>
                                  {idea.detail ? (
                                    <span className="block text-xs text-gray-600 leading-snug mt-1 break-words">
                                      {renderWithHighlights(idea.detail, highlightColor)}
                                    </span>
                                  ) : null}
                                </div>
                              </motion.span>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DesignAnnotationData = {
  n: number;
  title: string;
  body: string;
};

type DesignDirectionBlockProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  annotations: DesignAnnotationData[];
};

const structuredAnnotationPalette = [
  { bg: "bg-[#F6E8B1]/40", circle: "bg-[#EEDB9A]/70" },
  { bg: "bg-[#EAF7EF]/50", circle: "bg-[#c8e9d8]/70" },
  { bg: "bg-[#EAF0FF]/50", circle: "bg-[#d4dcfa]/70" },
  { bg: "bg-[#FDECEC]/50", circle: "bg-[#f5c8c8]/70" },
];

function DesignDirectionBlock({
  title,
  description,
  imageSrc,
  imageAlt,
  annotations,
}: DesignDirectionBlockProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="max-w-3xl mx-auto text-left">
        
        <h3
          className={`${headingFont.className} text-2xl md:text-3xl font-semibold mb-5 leading-tight text-gray-900`}
        >
          {title}
        </h3>
        <p
          className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
        >
          {description}
        </p>
      </div>

      <div className="mt-10 md:mt-12 rounded-2xl border border-[#dfe6d5] bg-[#f8faf4] p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[2.4fr_1fr] gap-12 items-start">
          <div className="min-w-0 w-full rounded-2xl overflow-hidden border border-[#e7e5df] shadow-md bg-[#f8f7f4]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 items-start">
            {annotations.map((a, index) => {
              const palette =
                structuredAnnotationPalette[
                  index % structuredAnnotationPalette.length
                ];
              return (
                <div
                  key={a.n}
                  className={[
                    palette.bg,
                    "w-[260px] shrink-0 border border-[#dfe6d5] rounded-md shadow-sm p-3 flex gap-2 items-start",
                    "hover:scale-[1.02] transition-transform duration-200 ease-out",
                  ].join(" ")}
                >
                  <div
                    className={`h-5 w-5 shrink-0 rounded-full ${palette.circle} flex items-center justify-center text-[10px] font-medium text-gray-900`}
                  >
                    {a.n}
                  </div>
                  <div className="min-w-0">
                    <p className={`${headingFont.className} font-semibold text-sm text-gray-900`}>
                      {a.title}
                    </p>
                    <p className={`${bodyFont.className} text-xs text-gray-600 mt-1 leading-snug`}>
                      {a.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const designDirectionSections: DesignDirectionBlockProps[] = [
  {
    title: "Reimagining the Home Experience",
    description:
      "The home surface sets the tone for how leaders encounter research: it must surface what matters first, adapt to role and context, and cut interpretive work. By replacing dense catalogs with guided entry, prioritized signals, and clear next steps, we reduce cognitive overload, improve discoverability, and shorten the path from login to decision.",
    imageSrc: "/design/home.png",
    imageAlt: "Home experience design direction",
    annotations: [
      {
        n: 1,
        title: "Guided entry based on user context",
        body: "Home adapts to user role and intent, guiding users toward relevant starting points instead of a static dashboard.",
      },
      {
        n: 2,
        title: "Signal-first information hierarchy",
        body: "Key insights are prioritized upfront, reducing the need to scan through dense report lists.",
      },
      {
        n: 3,
        title: "Discovery through relevance",
        body: "Content is surfaced based on behavior, trends, and usage patterns, making exploration feel guided rather than manual.",
      },
      {
        n: 4,
        title: "Condensed insight consumption",
        body: "Summaries and previews enable quick understanding before committing to deeper exploration.",
      },
      {
        n: 5,
        title: "Navigation driven by next actions",
        body: "The interface nudges users toward meaningful next steps, shifting from passive browsing to active decision-making.",
      },
    ],
  },
  {
    title: "Building a Community Layer for GCC Leaders",
    description:
      "Leaders learn as much from peers as from documents, but only when trust, structure, and continuity are explicit. This layer makes peer learning scannable: themes over threads, credibility signals over noise, and events wired into a feedback loop so shared knowledge compounds instead of dissipating.",
    imageSrc: "/design/community.png",
    imageAlt: "Community experience design direction",
    annotations: [
      {
        n: 1,
        title: "Peer intelligence surfaced contextually",
        body: "Relevant discussions from similar GCC leaders are surfaced based on domain and interest, not chronological feeds.",
      },
      {
        n: 2,
        title: "Theme-driven knowledge organization",
        body: "Conversations are clustered around topics, enabling users to navigate ideas instead of isolated threads.",
      },
      {
        n: 3,
        title: "Trust through visible expertise",
        body: "Contributor credibility is embedded into the interface, helping users assess signal over noise.",
      },
      {
        n: 4,
        title: "Continuous knowledge feedback loops",
        body: "Insights from discussions, events, and contributions feed back into the ecosystem, strengthening collective intelligence.",
      },
      {
        n: 5,
        title: "Engagement anchored in real-world interactions",
        body: "Events, webinars, and expert sessions are integrated into the flow, bridging passive reading with active participation.",
      },
    ],
  },
  {
    title: "Making Reports Actionable, Not Overwhelming",
    description:
      "Reports fail when they read like archives. This direction treats every document as a decision interface: scannable structure, tools to compare and validate, and filters aligned to intent, so leaders spend less time decoding and more time committing, with less reliance on manual synthesis.",
    imageSrc: "/design/reports.png",
    imageAlt: "Reports experience design direction",
    annotations: [
      {
        n: 1,
        title: "Structured for scan, not reading",
        body: "Reports are broken into clear, navigable sections that support quick understanding over linear consumption.",
      },
      {
        n: 2,
        title: "Comparison as a core interaction",
        body: "Side-by-side views enable users to evaluate insights across companies, regions, or timeframes.",
      },
      {
        n: 3,
        title: "Embedded validation mechanisms",
        body: "Insights are supported by cross-referenced data, helping users verify before acting.",
      },
      {
        n: 4,
        title: "Intent-driven filtering system",
        body: "Filters align with user goals: industry, use-case, and context, rather than generic categorization.",
      },
      {
        n: 5,
        title: "Outputs designed for decisions",
        body: "Summaries and recommendations reduce interpretation effort, enabling faster commitment.",
      },
    ],
  },
];

const decisionMakingToolsAnnotations: DesignAnnotationData[] = [
  {
    n: 1,
    title: "Benchmarking for contextual evaluation",
    body: "Costs and performance are compared across regions, vendors, and industry standards to enable informed trade-offs.",
  },
  {
    n: 2,
    title: "Standardized performance scorecards",
    body: "Sites are evaluated across consistent metrics, making comparisons reliable and repeatable.",
  },
  {
    n: 3,
    title: "Automated synthesis of insights",
    body: "Raw inputs are translated into structured summaries, surfacing key signals without manual analysis.",
  },
  {
    n: 4,
    title: "Configurable inputs aligned to business context",
    body: "Users define variables like geography, scale, and priorities to generate tailored, decision-ready outputs.",
  },
];

function DecisionMakingToolsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full py-16 md:py-24 px-6 md:px-10 border-t border-[#dfe6d5]/60"
    >
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl mx-auto text-left">
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-5 leading-tight text-gray-900`}
          >
            Designing for Decision-Making Tools
          </h2>
          <p
            className={`${headingFont.className} text-lg md:text-xl text-gray-800 font-medium mb-6 leading-snug`}
          >
            Enabling GCC leaders to generate quick, context-aware reports for
            faster strategic decisions.
          </p>
          <p
            className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
          >
            Beyond exploration and reports, the platform introduces dedicated
            tools that help users generate decision-ready outputs such as cost
            benchmarking and site scorecards. These tools transform internal
            company data and external insights into structured, comparable, and
            actionable formats, reducing dependency on manual analysis.
          </p>
        </div>

        <div className="mt-10 md:mt-12 rounded-2xl border border-[#dfe6d5] bg-[#f8faf4] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[2.4fr_1fr] gap-12 items-start">
            <div className="min-w-0 w-full rounded-2xl overflow-hidden border border-[#e7e5df] shadow-md bg-[#f8f7f4]">
              <img
                src="/design/tools.png"
                alt="Decision-making tools interface"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 items-start">
              {decisionMakingToolsAnnotations.map((a, index) => {
                const palette =
                  structuredAnnotationPalette[
                    index % structuredAnnotationPalette.length
                  ];
                return (
                  <div
                    key={a.n}
                    className={[
                      palette.bg,
                      "w-[260px] shrink-0 border border-[#dfe6d5] rounded-md shadow-sm p-3 flex gap-2 items-start",
                      "hover:scale-[1.02] transition-transform duration-200 ease-out",
                    ].join(" ")}
                  >
                    <div
                      className={`h-5 w-5 shrink-0 rounded-full ${palette.circle} flex items-center justify-center text-[10px] font-medium text-gray-900`}
                    >
                      {a.n}
                    </div>
                    <div className="min-w-0">
                    <p className={`${headingFont.className} font-semibold text-sm text-gray-900`}>
                        {a.title}
                      </p>
                      <p className={`${bodyFont.className} text-xs text-gray-600 mt-1 leading-snug`}>
                        {a.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const usabilityTestingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const usabilityTestingNoteVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

type UsabilityStickyNote = {
  quote: string;
  footnote: string;
  rotate: string;
  positionClass: string;
};

const usabilityNoteBgPalette = [
  "bg-[#F2D6D6]",
  "bg-[#EFE4D6]",
  "bg-[#DDEBE3]",
  "bg-[#E6DDF2]",
  "bg-[#F1E2C9]",
];

const usabilityStickyNotes: UsabilityStickyNote[] = [
  {
    quote:
      "I expect the platform to already know what's relevant to my role and industry.",
    footnote: "— Business Ops Leader (Micron)",
    rotate: "rotate-[-2deg]",
    positionClass: "top-[3%] left-[2%] md:left-[3%]",
  },
  {
    quote:
      "Right now I still have to search a lot… it doesn't feel curated.",
    footnote: "— Sr. Manager (BMC)",
    rotate: "rotate-[1deg]",
    positionClass: "top-[5%] right-[2%] md:right-[4%] left-auto",
  },
  {
    quote:
      "If personalization was stronger, I wouldn't need to rely on search this much.",
    footnote: "— Chief of Staff (Lloyds)",
    rotate: "rotate-[2deg]",
    positionClass: "top-[20%] left-[32%] md:left-[38%]",
  },
  {
    quote:
      "I don't know if a report is useful until I actually open it.",
    footnote: "— Strategy Lead (Amadeus)",
    rotate: "rotate-[-1deg]",
    positionClass: "top-[14%] left-[2%] md:left-[4%]",
  },
  {
    quote:
      "It takes too much effort to find the exact insight I'm looking for.",
    footnote: "— Director, India Strategy (Booking Holdings)",
    rotate: "rotate-[2deg]",
    positionClass: "top-[28%] right-[2%] md:right-[5%] left-auto",
  },
  {
    quote:
      "If I could just get a quick summary first, it would save a lot of time.",
    footnote: "— VP Talent (Sony)",
    rotate: "rotate-[-2deg]",
    positionClass: "top-[38%] left-[8%] md:left-[12%]",
  },
  {
    quote:
      "I look at what peers are doing… but I still validate if it's relevant for me.",
    footnote: "— Senior Data Analyst (Walmart)",
    rotate: "rotate-[1deg]",
    positionClass: "top-[48%] right-[3%] md:right-[6%] left-auto",
  },
  {
    quote:
      "Discussions are useful only if I can quickly find something specific.",
    footnote: "— Business Ops Manager (Evolent)",
    rotate: "rotate-[-1deg]",
    positionClass: "top-[58%] left-[4%] md:left-[6%]",
  },
  {
    quote:
      "I'd want alerts for events relevant to my role… otherwise I miss them.",
    footnote: "— Site Head (LAM Research)",
    rotate: "rotate-[2deg]",
    positionClass: "top-[66%] right-[4%] md:right-[8%] left-auto",
  },
  {
    quote:
      "If events were more personalized, I'd actually engage more.",
    footnote: "— Communications Lead (Sony)",
    rotate: "rotate-[-2deg]",
    positionClass: "top-[72%] left-[28%] md:left-[34%]",
  },
  {
    quote:
      "I didn't fully understand what 'Ask Zinnov' could actually help me with.",
    footnote: "— CEO (Confidential Client)",
    rotate: "rotate-[1deg]",
    positionClass: "top-[82%] left-[2%] md:left-[4%]",
  },
  {
    quote:
      "I usually piece together insights from multiple reports… it's not very efficient.",
    footnote: "— Strategy Manager (Accenture)",
    rotate: "rotate-[-1deg]",
    positionClass: "top-[8%] left-[44%] md:left-[48%]",
  },
  {
    quote:
      "I want to quickly compare insights instead of reading everything end-to-end.",
    footnote: "— GCC Head (Bosch)",
    rotate: "rotate-[2deg]",
    positionClass: "top-[42%] left-[1%] md:left-[2%]",
  },
  {
    quote:
      "If I don't immediately see value, I move on pretty quickly.",
    footnote: "— Director (Capgemini)",
    rotate: "rotate-[-2deg]",
    positionClass: "top-[50%] md:top-[52%] right-[1%] md:right-[4%] left-auto",
  },
  {
    quote:
      "I rely a lot on external sources because internal discovery takes time.",
    footnote: "— Senior Analyst (Deloitte)",
    rotate: "rotate-[1deg]",
    positionClass: "top-[76%] left-[38%] md:left-[42%]",
  },
];

function UsabilityTestingSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full py-16 md:py-24 px-6 md:px-10 border-t border-[#dfe6d5]/60"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-left mb-10 md:mb-14">
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-5 leading-tight text-gray-900`}
          >
            Usability Testing & Key Insights
          </h2>
          <p
            className={`${headingFont.className} text-lg md:text-xl text-gray-800 font-medium mb-6 leading-snug`}
          >
            Understanding user behavior, expectations, and friction points
            across the platform.
          </p>
          <p
            className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
          >
            We conducted usability testing with GCC leaders, business
            operators, and strategy teams to understand how they interact with
            the platform across core workflows. The insights revealed <Highlight color="#EEDDDD">critical
            gaps in personalization, discoverability, and decision-making
            support, </Highlight>directly informing the final design directions.
          </p>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden border border-[#dfe6d5] shadow-[0_18px_44px_rgba(0,0,0,0.08)] bg-[#eef0e8]">
          <img
            src="/design/usability-testing.png"
            alt="Usability testing wireframe canvas"
            className="w-full min-h-[650px] object-cover opacity-90 rounded-2xl"
          />
          <motion.div
            variants={usabilityTestingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="absolute inset-0 p-3 md:p-6 lg:p-8"
          >
            {usabilityStickyNotes.map((note, index) => (
              <motion.div
                key={index}
                variants={usabilityTestingNoteVariants}
                className={[
                  "absolute w-[260px] md:w-[280px] z-[1] pointer-events-none",
                  note.positionClass,
                ].join(" ")}
              >
                <div
                  className={[
                    "pointer-events-auto p-5 rounded-md border border-black/5 backdrop-blur-[2px]",
                    "shadow-[0_8px_25px_rgba(0,0,0,0.12)]",
                    usabilityNoteBgPalette[index % usabilityNoteBgPalette.length],
                    note.rotate,
                    "hover:scale-[1.03] transition-transform duration-200",
                  ].join(" ")}
                >
                  <p className="text-[15px] md:text-base italic text-gray-800 leading-snug">
                    &ldquo;{note.quote}&rdquo;
                  </p>
                  <p className="text-sm text-gray-500 mt-2 leading-snug">
                    {note.footnote}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

const designDirectionsBentoCards = [
  {
    title: "Contextual & Personalized Discovery",
    description:
      "Surface insights based on user role, industry, and behavior to reduce search dependency and improve relevance.",
    bg: "bg-[rgba(244,222,229,0.45)]",
    imageSrc: "/design/contextual-personalized-discovery.png",
  },
  {
    title: "Scannable & Decision-Ready Insights",
    description:
      "Transform long-form reports into structured summaries with key takeaways, enabling faster understanding and action.",
    bg: "bg-[rgba(234,244,236,0.45)]",
    imageSrc: "/design/scannable-decision-ready-insights.png",
  },
  {
    title: "Integrated Validation & Comparison",
    description:
      "Enable cross-referencing, side-by-side comparisons, and validation tools to reduce manual verification effort.",
    bg: "bg-[rgba(234,240,255,0.45)]",
    imageSrc: "/design/integrated-validation-comparison.png",
  },
  {
    title: "Guided Workflows & Clear Next Steps",
    description:
      "Support users with structured pathways from discovery to action, minimizing friction in decision-making.",
    bg: "bg-[rgba(245,240,220,0.45)]",
    imageSrc: "/design/guided-workflows-clear-next-steps.png",
  },
];

function DesignDirectionsBentoSection() {
  const cardBase =
    "rounded-xl p-5 md:p-6 backdrop-blur-sm border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform duration-300 ease-out";

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full mt-16 md:mt-24 px-6 md:px-10 pb-16 md:pb-24"
    >
      <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl mx-auto text-left mb-10 md:mb-14">
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-5 leading-tight text-gray-900`}
          >
            Design Redirection
          </h2>
          <p
            className={`${bodyFont.className} text-lg text-gray-700 leading-relaxed`}
          >
            Insights from usability testing translated into actionable design
            directions. Each direction focuses on reducing cognitive load,
            improving discoverability, and enabling faster decision-making.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {designDirectionsBentoCards.map((card) => (
            <article
              key={card.title}
              className={`${cardBase} ${card.bg}`}
            >
              <div className="relative w-full h-[140px] rounded-lg bg-white/40 border border-[#dfded5] overflow-hidden flex items-center justify-center text-xs text-gray-400 shrink-0">
                {/* Replace inner content with <img src="..." alt="" className="w-full h-full object-cover" /> */}
                <img
  src={card.imageSrc}
  alt={card.title}
  className="w-full h-full object-cover"
/>
              </div>
              <div className="mt-5">
                <h3
                  className={`${bodyFont.className} text-lg md:text-xl font-semibold text-gray-900`}
                >
                  {card.title}
                </h3>
                <p
                  className={`${headingFont.className} mt-3 text-sm text-gray-600 leading-relaxed`}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const finalUiGlassContainerClass =
  "rounded-2xl border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(245,240,220,0.35),rgba(234,240,255,0.35))] backdrop-blur-md p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]";

const finalUiAnnotationBgCycle = [
  "bg-[#F6EDEB]/80",
  "bg-[#EAF4EC]/80",
  "bg-[#EAF0FF]/80",
  "bg-[#F5F0DC]/80",
] as const;

type FinalUIScreenSectionProps = {
  heading: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  annotations: DesignAnnotationData[];
};

function FinalUIScreenSection({
  heading,
  description,
  imageSrc,
  imageAlt,
  annotations,
}: FinalUIScreenSectionProps) {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="max-w-3xl mx-auto text-left">
        
        <h3
          className={`${headingFont.className} text-2xl md:text-3xl font-semibold mb-5 leading-tight text-gray-900`}
        >
          {heading}
        </h3>
        <p
          className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
        >
          {description}
        </p>
      </div>

      <div className={`mt-10 md:mt-12 ${finalUiGlassContainerClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-[2.4fr_1fr] gap-10 md:gap-12 items-start">
          <div className="min-w-0 w-full">
            <div className="w-full rounded-2xl border border-[#e7e5df] bg-white/40 p-3">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start w-full min-w-0">
            {annotations.map((a, index) => {
              const bg =
                finalUiAnnotationBgCycle[
                  index % finalUiAnnotationBgCycle.length
                ];
              return (
                <div
                  key={a.n}
                  className={[
                    "w-full max-w-full shrink-0 rounded-md border border-white/50 shadow-md backdrop-blur-sm p-3 flex gap-2 items-start",
                    bg,
                    "hover:scale-[1.02] transition-transform duration-200 ease-out",
                  ].join(" ")}
                >
                  <div
                    className={`h-5 w-5 shrink-0 rounded-full border border-white/60 bg-white/50 flex items-center justify-center text-[10px] font-medium text-gray-900 ${headingFont.className}`}
                  >
                    {a.n}
                  </div>
                  <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900">
                      {a.title}
                    </p>
                    <p
                      className={`${bodyFont.className} text-xs text-gray-600 mt-1 leading-snug`}
                    >
                      {a.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const finalExperienceScreens: FinalUIScreenSectionProps[] = [
  {
    heading: "Search as the Entry Point",
    description:(
      <>
      The home experience was reimagined as a <Highlight color="#E0ECC1">search-led interface,</Highlight> 
      transforming it from a passive dashboard into an active entry point.
      Instead of navigating through predefined structures, users can express
      intent directly and be guided toward relevant insights, tools, and actions
      tailored to their context.
      </>
    ),
    imageSrc: "/final/home.png",
    imageAlt: "Final home experience UI",
    annotations: [
      {
        n: 1,
        title: "Intent as the primary interaction",
        body: "Users start by expressing what they need, replacing navigation-heavy exploration with direct input.",
      },
      {
        n: 2,
        title: "Search as a routing layer",
        body: "Queries don’t just return results, they guide users toward relevant modules, reports, and actions.",
      },
      {
        n: 3,
        title: "Contextual understanding of user needs",
        body: "Results adapt based on role, industry, and past behavior, making outcomes more relevant.",
      },
      {
        n: 4,
        title: "Reduced dependency on platform knowledge",
        body: "Users no longer need to understand where things live, the system brings the right pathways to them.",
      },
      {
        n: 5,
        title: "Seamless transition from query to action",
        body: "From asking a question to accessing insights or tools, the experience flows without friction.",
      },
    ],
  },
  {
    heading: "Decision Surfaces, Not Just Reports",
    description:(
      <>
    Reports are structured as <Highlight color="#E0ECC1">interactive decision layers,</Highlight> where insights are
    scannable, comparable, and directly tied to action. The focus shifts from
    reading information to <Highlight color="#E0ECC1">evaluating and committing with clarity.</Highlight>
    </>
    ),
    imageSrc: "/final/reports.png",
    imageAlt: "Final reports experience UI",
    annotations: [
      {
        n: 1,
        title: "Structured for quick comprehension",
        body: "Information is organized into clear, digestible blocks that support rapid scanning.",
      },
      {
        n: 2,
        title: "AI-generated summaries",
        body: "Users can compare data points across dimensions without switching contexts.",
      },
      {
        n: 3,
        title: "Built-in validation cues",
        body: "Signals and references help users assess the reliability of insights in real time.",
      },
      {
        n: 4,
        title: "Intent-aligned filtering",
        body: "Users refine outputs based on context like industry, geography, and use-case.",
      },
      {
        n: 5,
        title: "Action-linked outputs",
        body: "Insights are paired with summaries and next steps, enabling immediate decision-making.",
      },
    ],
  },
  {
    heading: "A Live Layer of Market Intelligence",
    description:(
      <>
    GCC Pulse surfaces what is changing in real time, bringing <Highlight color="#E0ECC1">relevant signals, shifts, and </Highlight>
    <Highlight color="#E0ECC1"> emerging patterns </Highlight> into focus without requiring active tracking.
</>
    ),
imageSrc: "/final/gcc-pulse.png",
    imageAlt: "Final GCC Pulse UI",
    annotations: [
      {
        n: 1,
        title: "Real-time signal visibility",
        body: "Surfaces active trends and shifts as they emerge, not after they stabilize.",
      },
      {
        n: 2,
        title: "Context-aware filtering",
        body: "Content adapts to user domain, ensuring relevance over volume.",
      },
      {
        n: 3,
        title: "Priority-driven highlights",
        body: "Key developments are elevated based on potential impact, not recency alone.",
      },
      {
        n: 4,
        title: "Continuous awareness without effort",
        body: "Reduces the need for manual tracking across sources and platforms.",
      },
    ],
  },
  {
    heading: "Curated Signals, Not Just Content",
    description:(
      <>
      High-value insights are surfaced through deliberate curation, bringing
      the most <Highlight color="#E0ECC1"> relevant, timely, and impactful work </Highlight> into immediate view.
      </>
    ),
    imageSrc: "/final/featured.png",
    imageAlt: "Final featured insights UI",
    annotations: [
      {
        n: 1,
        title: "Editorially prioritized insights",
        body: "Content is curated based on relevance, impact, and timeliness—not just recency.",
      },
      {
        n: 2,
        title: "Strong visual hierarchy",
        body: "Layout emphasizes importance, helping users quickly identify what deserves attention.",
      },
      {
        n: 3,
        title: "Scan-friendly content grouping",
        body: "Information is chunked into clear sections for fast orientation and navigation.",
      },
      {
        n: 4,
        title: "Low-friction exploration",
        body: "Entry points are designed to encourage deeper engagement without cognitive load.",
      },
    ],
  },
  {
    heading: "Trends as Entry Points to Exploration",
    description:(
      <>
      Emerging queries surface what is gaining momentum, helping users
      discover relevant topics through the <Highlight color="#E0ECC1">questions shaping the market.</Highlight>
      </>
    ),
    imageSrc: "/final/trending.png",
    imageAlt: "Final trending queries UI",
    annotations: [
      {
        n: 1,
        title: "Momentum made visible",
        body: "Visual prominence reflects what topics are gaining traction in real time.",
      },
      {
        n: 2,
        title: "Exploration anchored in intent",
        body: "Queries act as natural entry points, connecting user curiosity to relevant content.",
      },
      {
        n: 3,
        title: "Contextual discovery paths",
        body: "Each trend leads into deeper insights, reports, and related themes.",
      },
      {
        n: 4,
        title: "Signals beyond navigation",
        body: "Surfaces emerging areas of interest that may not exist in predefined structures.",
      },
    ],
  },
];

const editorialHighlightClass = "bg-[#E6EDC8] px-1.5 py-0.5 rounded-sm";

type EditorialPageBreakerSectionProps = {
  label: string;
  heading: string;
  body: ReactNode;
  quote: string;
};

function EditorialPageBreakerSection({
  label,
  heading,
  body,
  quote,
}: EditorialPageBreakerSectionProps) {
  return (
    <section className="py-20 md:py-20 bg-[#f6f5ef]">
      <div className="max-w-3xl h-full mx-auto text-center px-6 md:px-0 space-y-12 md:space-y-20">
        <p
          className={`${headingFont.className} text-xs uppercase tracking-[0.2em] text-gray-500`}
        >
          
        </p>
        <h2
          className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 leading-tight`}
        >
          {heading}
        </h2>
        <p
          className={`${bodyFont.className} text-lg md:text-xl leading-relaxed text-gray-700`}
        >
          {body}
        </p>

        <div className="relative max-w-2xl mx-auto pt-2 pb-10 md:pb-12 px-2">
          <span
            aria-hidden
            className={`${bodyFont.className} absolute top-1 -left-0 md:left-0 text-[120px] leading-none text-[#9CAD6A] opacity-70 select-none pointer-events-none`}
          >
            &ldquo;
          </span>
          <blockquote
            className={`${bodyFont.className} relative z-10 mx-auto text-4xl text-[#9CAD6A] text-center px-8 md:px-10 leading-snug font-normal`}
          >
            {quote}
          </blockquote>
          <span
            aria-hidden
            className={`${bodyFont.className} absolute top-32 -right-1 md:right-1 text-[120px] leading-none text-[#9CAD6A] opacity-70 select-none pointer-events-none`}
          >
            &rdquo;
          </span>
        </div>
      </div>
    </section>
  );
}

const impactCardGlassShellClass =
  "relative rounded-2xl p-7 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.10)] overflow-hidden transition-all duration-300 ease-out hover:shadow-[0_18px_60px_rgba(0,0,0,0.15)] hover:-translate-y-1 isolate";

const impactCardTintLayerClasses = [
  "absolute inset-0 rounded-2xl bg-[rgba(244,222,229,0.25)] pointer-events-none",
  "absolute inset-0 rounded-2xl bg-[rgba(234,244,236,0.25)] pointer-events-none",
  "absolute inset-0 rounded-2xl bg-[rgba(234,240,255,0.25)] pointer-events-none",
] as const;

const impactMetricBaseClass = `${headingFont.className} text-5xl md:text-6xl leading-none tracking-tight`;

const impactMetricToneClasses = [
  "text-[#9C7A73]",
  "text-[#5F807A]",
  "text-[#6E7F99]",
] as const;

function CustomerImpactSection() {
  const cards = [
    {
      title: "2.5x",
      text: "faster discovery of relevant insights",
    },
    {
      title: "40%",
      text: "reduction in time spent validating reports",
    },
    {
      title: "3x",
      text: "increase in engagement with reports and trends",
    },
  ];
  return (
    <section className="w-full py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-left">
        <div className="max-w-3xl mb-12">
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 mb-4`}
          >
            <p
            className={`${headingFont.className} text-sm tracking-[0.14em] font-normal uppercase text-gray-600 mb-3`}
          >
            IMPACT
          </p>
            Improving Decision Confidence at Scale
          </h2>
          <p
            className={`${bodyFont.className} text-lg text-gray-700 leading-relaxed`}
          >
            The redesigned experience enables faster discovery, clearer
            insights, and more confident decision-making across the user journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={card.title} className={impactCardGlassShellClass}>
              <div
                className={
                  impactCardTintLayerClasses[
                    index % impactCardTintLayerClasses.length
                  ]
                }
              />
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)] pointer-events-none" />
              <div className="relative z-10">
                <h3
                  className={`${impactMetricBaseClass} ${
                    impactMetricToneClasses[
                      index % impactMetricToneClasses.length
                    ]
                  }`}
                  style={{
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  {card.title}
                </h3>
                <div className="w-8 h-[1.5px] bg-black/10 my-3 rounded-full backdrop-blur-sm" />
                <p
                  className={`${bodyFont.className} text-base text-gray-800/80 leading-relaxed mt-3 max-w-[85%]`}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdminImpactSection() {
  const cards = [
    {
      title: "35%",
      text: "reduction in manual coordination across tools",
    },
    {
      title: "2x",
      text: "faster response time to client queries",
    },
    {
      title: "50%",
      text: "improvement in visibility across workflows and requests",
    },
  ];
  return (
    <section className="w-full py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-left">
        <div className="max-w-3xl mb-12">
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 mb-4`}
          >
            <p
            className={`${headingFont.className} text-sm tracking-[0.14em] font-normal uppercase text-gray-600 mb-3`}
          >
            IMPACT
          </p>
            Strengthening Business and Operational Efficiency
          </h2>
          <p
            className={`${bodyFont.className} text-lg text-gray-700 leading-relaxed`}
          >
            The internal platform equips teams with better visibility, reduced
            coordination overhead, and faster execution across workflows.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={card.title} className={impactCardGlassShellClass}>
              <div
                className={
                  impactCardTintLayerClasses[
                    index % impactCardTintLayerClasses.length
                  ]
                }
              />
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_60%)] pointer-events-none" />
              <div className="relative z-10">
                <h3
                  className={`${impactMetricBaseClass} ${
                    impactMetricToneClasses[
                      index % impactMetricToneClasses.length
                    ]
                  }`}
                  style={{
                    textShadow:
                      "0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  {card.title}
                </h3>
                <div className="w-8 h-[1.5px] bg-black/10 my-3 rounded-full backdrop-blur-sm" />
                <p
                  className={`${bodyFont.className} text-base text-gray-800/80 leading-relaxed mt-3 max-w-[85%]`}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalExperienceSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full border-t border-[#dfe6d5]/60"
    >
      <EditorialPageBreakerSection
        label="FINAL EXPERIENCE"
        heading="Designing a Cohesive, Decision-Ready Experience"
        body={
          <>
            The final interface brings together{" "}
            <span className={editorialHighlightClass}>personalization</span>,{" "}
            <span className={editorialHighlightClass}>structured insights</span>,
            and{" "}
            <span className={editorialHighlightClass}>guided workflows</span> into
            a unified system, reducing friction, improving discoverability, and
            enabling faster, more confident decision-making.
          </>
        }
        quote="Every interaction is designed to reduce effort, surface clarity, and move users closer to confident decisions."
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-8 md:pt-12 space-y-0">
        {finalExperienceScreens.map((screen, index) => (
          <Fragment key={screen.heading}>
            <div className={index > 0 ? "mt-16 md:mt-24" : ""}>
              <FinalUIScreenSection {...screen} />
            </div>

            {screen.heading === "Trends as Entry Points to Exploration" ? (
              <CustomerImpactSection />
            ) : null}
          </Fragment>
        ))}
      </div>
    </motion.section>
  );
}

const caseStudyLessonCards = [
  {
    title: "Iteration needs boundaries",
    text: "I learned that not everything needs to be explored at once. Defining clear boundaries helped focus on what actually moves the needle.",
  },
  {
    title: "Feedback works best when it's intentional",
    text: "Early, structured feedback loops reduced rework and made decisions feel more grounded, not reactive.",
  },
  {
    title: "Ownership shapes better decisions",
    text: "Looking at the system end-to-end helped me move beyond screens and think in terms of impact, trade-offs, and long-term value.",
  },
  {
    title: "Systems over screens",
    text: "The biggest shift was thinking in systems, connecting rules, signals, and workflows instead of designing isolated interfaces.",
  },
] as const;

function CaseStudyClosingSection() {
  return (
    <section className="w-full mt-24 md:mt-32 pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 mb-10 md:mb-12 text-left`}
        >
          Lessons from this project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {caseStudyLessonCards.map((card) => (
            <div
              key={card.title}
              className="relative rounded-2xl p-6 md:p-7 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,rgba(244,222,229,0.25),rgba(234,244,236,0.25),rgba(234,240,255,0.25))] pointer-events-none" />
              <div className="relative z-10">
                <h3
                  className={`${headingFont.className} text-xl font-semibold text-gray-900 mb-3`}
                >
                  {card.title}
                </h3>
                <p
                  className={`${bodyFont.className} text-sm md:text-base text-gray-700 leading-relaxed`}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-20 md:mt-28 max-w-3xl mx-auto rounded-2xl p-8 md:p-10 bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.06)] text-center"
        >
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 mb-6 md:mb-8`}
          >
            End note
          </h2>
          <div
            className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed space-y-5`}
          >
            <p>
              Working on this project shifted how I think about design, from{" "}
              <span className="bg-[] px-1.5 py-0.5 rounded">
                assembling screens
              </span>{" "}
              to{" "}
              <span className="bg-[#E0ECC1] px-1.5 py-0.5 rounded">
                shaping systems that support real decisions
              </span>.
            </p>
            <p>
              It made me more conscious of{" "}
              <span className="bg-[] px-1.5 py-0.5 rounded">
                clarity, structure
              </span>, and the role of{" "}
              <span className="bg-[] px-1.5 py-0.5 rounded">
                context in reducing effort
              </span>{" "}
              for users. More importantly, it reinforced that{" "}
              <span className="bg-[#EEDDDD] px-1.5 py-0.5 rounded">
                good design isn&apos;t about adding more
              </span>, but about{" "}
              <span className="bg-[rgba(219, 238, 192, 0.8)] px-1.5 py-0.5 rounded">
                making the right things easier to see, understand, and act on
              </span>.
            </p>
            <p>
              These are{" "}
              <span className="bg-[#D1E8E9] px-1.5 py-0.5 rounded">
                principles I now carry into every problem I approach
              </span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<"flow" | "pain">("flow");
  const [updatedFlowView, setUpdatedFlowView] = useState<"flow" | "intervention">("flow");
  const renderServiceFlow = (withPainPoints: boolean) => (
    <div className="mt-8 rounded-2xl border border-[#dfe6d5] p-4 md:p-6 bg-[#f8faf4]">
      <div className="flex flex-col items-center gap-12">
        <div className="relative w-full">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10 hidden md:block" />
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {serviceFlowNodes.slice(0, 3).map((node, index) => (
              <div key={node.id} className="w-full md:flex-1">
                {index > 0 && (
                  <div className="hidden md:flex items-center justify-center mb-4">
                    <div className="h-px w-12 bg-gray-300" />
                    <div className="text-gray-400 text-2xl mx-2">→</div>
                  </div>
                )}
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  viewport={{ once: true }}
                  className={`relative ${node.bg} rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.07)] p-5 md:p-6 transition hover:shadow-md hover:-translate-y-1 w-full`}
                >
                  <h3
                    className={`${headingFont.className} text-lg md:text-xl font-medium text-gray-900 mb-3`}
                  >
                    {node.title}
                  </h3>
                  {Array.isArray(node.levels) ? (
                    <div className="space-y-3 border-l-2 border-dashed border-gray-300 pl-4">
                      {node.levels.map((level, levelIndex) => (
                        <div
                          key={level}
                          className="bg-white/70 border border-white/60 rounded-lg p-3"
                        >
                          <p
                            className={`${bodyFont.className} text-base md:text-lg text-gray-700 leading-snug`}
                          >
                            <span className="font-semibold">
                              Level {levelIndex + 1}:
                            </span>{" "}
                            {level}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={`${bodyFont.className} whitespace-pre-line text-base md:text-lg text-gray-700 leading-relaxed`}
                    >
                      {node.text}
                    </p>
                  )}
                  {withPainPoints && painPointNotes[node.id] && (
                    <div className="mt-4 md:mt-0 md:absolute md:-top-4 md:-right-3 rotate-[-2deg] md:rotate-1 bg-[#FDECEC] border border-dashed border-[#e4b9b9] rounded-lg px-3 py-2 shadow-sm max-w-[220px]">
                      <p
                        className={`${quoteFont.className} text-lg leading-snug text-gray-700`}
                      >
                        {painPointNotes[node.id]}
                      </p>
                    </div>
                  )}
                </motion.article>
              </div>
            ))}
          </div>
        </div>

        <div className="text-gray-400 text-2xl">↓</div>

        <div className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {serviceFlowNodes.slice(3, 5).map((node, index) => (
            <div key={node.id} className="w-full md:flex-1">
              {index > 0 && (
                <div className="hidden md:flex items-center justify-center mb-4">
                  <div className="h-px w-12 bg-gray-300" />
                  <div className="text-gray-400 text-2xl mx-2">→</div>
                </div>
              )}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true }}
                className={`relative ${node.bg} rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.07)] p-5 md:p-6 transition hover:shadow-md hover:-translate-y-1 w-full`}
              >
                <h3
                  className={`${headingFont.className} text-lg md:text-xl font-medium text-gray-900 mb-3`}
                >
                  {node.title}
                </h3>
                <p
                  className={`${bodyFont.className} whitespace-pre-line text-base md:text-lg text-gray-700 leading-relaxed`}
                >
                  {node.text}
                </p>
                {withPainPoints && painPointNotes[node.id] && (
                  <div className="mt-4 md:mt-0 md:absolute md:-top-4 md:-right-3 rotate-[-2deg] md:rotate-1 bg-[#FDECEC] border border-dashed border-[#e4b9b9] rounded-lg px-3 py-2 shadow-sm max-w-[220px]">
                    <p
                      className={`${quoteFont.className} text-lg leading-snug text-gray-700`}
                    >
                      {painPointNotes[node.id]}
                    </p>
                  </div>
                )}
              </motion.article>
            </div>
          ))}
        </div>

        <div className="text-gray-400 text-2xl">↓</div>

        <div className="w-full md:max-w-md">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
            className={`relative ${serviceFlowNodes[5].bg} rounded-xl shadow-[0_6px_18px_rgba(0,0,0,0.07)] p-5 md:p-6 transition hover:shadow-md hover:-translate-y-1 w-full`}
          >
            <h3
              className={`${headingFont.className} text-lg md:text-xl font-medium text-gray-900 mb-3`}
            >
              {serviceFlowNodes[5].title}
            </h3>
            <p
              className={`${bodyFont.className} whitespace-pre-line text-base md:text-lg text-gray-700 leading-relaxed`}
            >
              {serviceFlowNodes[5].text}
            </p>
            {withPainPoints && painPointNotes[serviceFlowNodes[5].id] && (
              <div className="mt-4 md:mt-0 md:absolute md:-top-4 md:-right-3 rotate-[-2deg] md:rotate-1 bg-[#FDECEC] border border-dashed border-[#e4b9b9] rounded-lg px-3 py-2 shadow-sm max-w-[220px]">
                <p
                  className={`${quoteFont.className} text-lg leading-snug text-gray-700`}
                >
                  {painPointNotes[serviceFlowNodes[5].id]}
                </p>
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </div>
  );
  const Card = ({ title, children, color }: any) => (
    <div
      className="relative rounded-xl px-4 py-4 w-[160px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      style={{ backgroundColor: color }}
    >
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-700 leading-snug">{children}</p>
    </div>
  );
  
  const Arrow = () => (
    <div className="flex items-center justify-center text-gray-400 text-xl">
      →
    </div>
  );
  
  const PainWrapper = ({ children, note }: any) => (
    <div className="relative">
      {children}
  
      <div className="absolute -top-6 left-6 rotate-[-6deg] bg-[#FDECEC] border border-[#F5B5B5] text-[#B23A3A] text-xs px-3 py-1 rounded-md shadow-sm whitespace-nowrap">
        {note}
      </div>
    </div>
  );
  const ImprovementWrapper = ({ children, note }: any) => (
    <div className="relative">
      {children}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -top-6 left-6 min-w-[180px] rotate-[-6deg] bg-[#EAF7EF] border border-[#BFE3C8] text-[#1F7A4D] text-xs px-3 py-1 rounded-md shadow-sm whitespace-normal break-words text-center leading-tight"
      >
        {note}
      </motion.div>
    </div>
  );
  return (
    <main className="bg-[#FBFBF2]">

      {/* HERO */}
      <div className="min-h-screen flex flex-col justify-center px-6 pt-20 md:pt-28">
        
        {/* TEXT BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >

          <GradualSpacing
            text="Designing Decision Intelligence"
            className={`${headingFont.className} text-5xl md:text-6xl font-semibold mb-8 leading-tight text-gray-900`}
          />

          <p className= {`${bodyFont.className} mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto`}>
            Think of the leaders who run{" "}
            
            <Highlight color="#EEDDDD">
              offshore strategy and innovation
            </Highlight>{" "}
            
            centres for global companies. Now imagine a platform where they don’t just read research, they{" "}
            
            <Highlight color="#FFF4C8">discuss</Highlight>{" "}
            <Highlight color="#FFF4C8">benchmark</Highlight>{" "}
            <Highlight color="#FFF4C8">and use</Highlight>{" "}
            
            it to make decisions.
          </p>

        </motion.div>

        {/* ✨ IMAGE WITH GLOW (SEPARATE BLOCK) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24 relative flex justify-center items-center"
        >
          {/* Glow */}
          <div className="absolute w-[600px] h-[600px] bg-[#E0ECC1] rounded-full blur-[140px] opacity-40 z-0"></div>

          {/* Image */}
          <img
            src="/platform-preview.png"
            alt="Zinnov Platform"
            className="relative z-10 rounded-xl shadow-2xl w-full max-w-3xl transition duration-500 ease-out hover:scale-[1.015] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          />
        </motion.div>

      </div>

      {/* PROJECT OVERVIEW */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full px-6 py-12 md:py-30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-[#dfe6d5]/70 bg-[#faf9f5] shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-8 md:p-10 lg:p-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 lg:gap-16">
              <div className="space-y-4">
                <div className="flex gap-3 items-stretch">
                  <div
                    className="w-[2px] shrink-0 rounded-full bg-[#9CC22A]"
                    aria-hidden
                  />
                  <h3
                    className={`${headingFont.className} text-base md:text-lg font-semibold text-gray-900 leading-tight`}
                  >
                    Timeline
                  </h3>
                </div>
                <p
                  className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
                >
                  Oct 2023 - Mar 2024
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 items-stretch">
                  <div
                    className="w-[3px] shrink-0 rounded-full bg-[#9CC22A]"
                    aria-hidden
                  />
                  <h3
                    className={`${headingFont.className} text-base md:text-lg font-semibold text-gray-900 leading-tight`}
                  >
                    Role
                  </h3>
                </div>
                <p
                  className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
                >
                  UX Designer + Strategist
                </p>
                <p
                  className={`${bodyFont.className} text-sm md:text-base text-gray-700 leading-relaxed`}
                >
                  Led the design of a decision-support ecosystem into structured, usable product experiences.

Worked at the intersection of strategy, research, and product thinking, to move from scattered insights to clear, actionable decisions.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 items-stretch">
                  <div
                    className="w-[3px] shrink-0 rounded-full bg-[#9CC22A]"
                    aria-hidden
                  />
                  <h3
                    className={`${headingFont.className} text-base md:text-lg font-semibold text-gray-900 leading-tight`}
                  >
                    Product Impact
                  </h3>
                </div>
                <div
                  className={`${bodyFont.className} text-sm md:text-lg text-gray-700 leading-relaxed`}
                >
                  <p>
                  Reimagined how Zinnov’s knowledge ecosystem spanning benchmarks, 
                  reports, and peer intelligence is consumed, turning it into a 
                  decision-ready digital experience for GCC leaders.
                  </p>
                  <p>
                  
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONTEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 py-20 text-left"
      >
        
        <GradualSpacing
          text="Who is Zinnov?"
          className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-6 text-gray-900`}
        />

        <p className= {`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}>
          Zinnov works closely with teams of global companies that run their strategy, innovation, and technology centers out of India. These teams, often called{" "}
          
          <Highlight color="#EEDDDD">
            Global Capability Centers
          </Highlight>{" "}
          
          play a critical role in driving{" "}
          
          <Highlight color="#FFF4C8">
            growth decisions, market expansion
          </Highlight>{" "}
          
          and long-term planning.
        </p>

      </motion.div>
      {/* ✨ QUOTE */}
      <div className="max-w-md mx-auto px-6 py-12 border-l-2 border-[#d6dccb] pl-6">
        
        <p
          className={`${quoteFont.className} text-2xl md:text-xl leading-snug text-gray-800`}
        >
          “Thus, the project explores how that{" "}
          
          <Highlight color="#E0ECC1">
            knowledge ecosystem
          </Highlight>{" "}
          
          could take shape as a{" "}
          
          <Highlight color="#D1E8E9">
            digital product
          </Highlight>{" "}
          
          built for leaders who think globally and act decisively.”
        </p>

      </div>

      {/* PROBLEM SCENARIO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-left"
      >
        {/* SECTION 1: CONTEXT INTRO */}
        <h2
          className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-6 leading-tight text-gray-900`}
        >
          Let me explain by laying down a scenario...
        </h2>

        <p className= {`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}>
          Imagine you are a strategy leader at a Global Capability Center, tasked
          with evaluating expansion opportunities and making high-stakes business
          decisions.
          <br />
          <br />
          You turn to available research, reports, and benchmarking tools to
          guide your thinking.
        </p>

        {/* SECTION 2: COMIC STRIP */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {[
            "/scenario-1.png",
            "/scenario-2.png",
            "/scenario-3.png",
            "/scenario-4.png",
            "/scenario-5.png",
            "/scenario-6.png",
          ].map((src, index) => (
            <motion.img
              key={src}
              src={src}
              alt={`Scenario panel ${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="w-full rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:scale-[1.015]"
            />
          ))}
        </div>

        {/* SECTION 3: INSIGHT AFTER SCENARIO */}
        <div className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {insightCards.map((card) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true }}
                className={`${card.bg} rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-6 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.09)] text-left`}
              >
                <h3
                  className={`${bodyFont.className} text-2xl leading-snug text-gray-900 mb-3`}
                >
                  {card.title}
                </h3>
                <p
                  className={`${quoteFont.className} text-lg md:text-xl leading-snug text-gray-700`}
                >
                  "{card.text}"
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CURRENT SERVICE FLOW */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="w-full py-16 md:py-20"
>

  {/* TEXT */}
  <div className="max-w-3xl mx-auto px-6 text-left">

    <p className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3`}>
      Discover
    </p>

    <h2 className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-6 leading-tight text-gray-900`}>
      What Zinnov&apos;s service flow looks like
    </h2>

    <p className= {`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}>
      Before reimagining the experience, we mapped how Zinnov&apos;s service
      currently operates across user journeys, research layers, and internal
      interventions.
      <br /><br />
      While the system is robust, it <Highlight color="#EEDDDD">relies heavily on user interpretation,</Highlight>
      <Highlight color="#EEDDDD">manual validation,</Highlight> and <Highlight color="#EEDDDD">fragmented pathways </Highlight> to arrive at meaningful
      decisions.
    </p>
  </div>

  {/* TOGGLE + FLOW */}
  <div className="max-w-7xl mx-auto px-6 mt-12">

    {/* Toggle */}
    <div className="flex justify-center mb-10">
      <div className="bg-white/60 backdrop-blur rounded-full p-1 flex gap-1 shadow-sm">
        <button
          onClick={() => setView("flow")}
          className= {`${bodyFont.className} px-4 py-2 rounded-full text-sm transition ${
            view === "flow" ? "bg-black text-white" : "text-gray-600"
          }`}
        >
          Service Flow
        </button>
        <button
          onClick={() => setView("pain")}
          className= {`${bodyFont.className} px-4 py-2 rounded-full text-sm transition ${
            view === "pain" ? "bg-black text-white" : "text-gray-600"
          }`}
        >
          Pain Points
        </button>
      </div>
    </div>

    <AnimatePresence mode="wait">

      {/* NORMAL FLOW */}
      {(view === "flow" || view === "pain") && (
        <motion.div
        key={view}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className= {`${bodyFont.className} w-full flex justify-center`}>
          <div className="flex items-center justify-center gap-4">

    {/* Entry Point */}
    {view === "pain" ? (
      <PainWrapper note="Unclear entry point">
        <Card color="#F6F1DE" title="Entry Point">
          GCC users enter or are notified of new research
        </Card>
      </PainWrapper>
    ) : (
      <Card color="#F6F1DE" title="Entry Point">
        GCC users enter or are notified of new research
      </Card>
    )}

    <Arrow />

    {/* Exploration */}
    {view === "pain" ? (
      <PainWrapper note="Fragmented + scattered sources">
        <Card color="#EAF4EC" title="Exploration Layer">
          Users browse reports, insights, and benchmarks
        </Card>
      </PainWrapper>
    ) : (
      <Card color="#EAF4EC" title="Exploration Layer">
        Users browse reports, insights, and benchmarks
      </Card>
    )}

    <Arrow />

    {/* Decision Split */}
    {view === "pain" ? (
      <PainWrapper note="No clear decision pathway">
        <Card color="#EAF0F6" title="Decision Split">
          Level 1 → Existing insights <br />
          Level 2 → Additional analysis <br />
          Level 3 → Custom engagement
        </Card>
      </PainWrapper>
    ) : (
      <Card color="#EAF0F6" title="Decision Split">
        Level 1 → Existing insights <br />
        Level 2 → Additional analysis <br />
        Level 3 → Custom engagement
      </Card>
    )}

    <Arrow />

    {/* Internal Intervention */}
    {view === "pain" ? (
      <PainWrapper note="Heavy dependency on manual support">
        <Card color="#F6F1DE" title="Internal Intervention">
          Analysts + business teams support deeper needs
        </Card>
      </PainWrapper>
    ) : (
      <Card color="#F6F1DE" title="Internal Intervention">
        Analysts + business teams support deeper needs
      </Card>
    )}

    <Arrow />

    {/* Consumption */}
    {view === "pain" ? (
      <PainWrapper note="Validation happens outside system">
        <Card color="#EAF4EC" title="Consumption">
          Users validate + contextualise insights
        </Card>
      </PainWrapper>
    ) : (
      <Card color="#EAF4EC" title="Consumption">
        Users validate + contextualise insights
      </Card>
    )}

    <Arrow />

    {/* Loop Back */}
    {view === "pain" ? (
      <PainWrapper note="No continuous feedback loop">
        <Card color="#F6F1DE" title="Loop Back">
          Insights feed back into ongoing exploration
        </Card>
      </PainWrapper>
    ) : (
      <Card color="#F6F1DE" title="Loop Back">
        Insights feed back into ongoing exploration
      </Card>
    )}

  </div>
</div>
        </motion.div>
      )}

    
      

    </AnimatePresence>

  </div>

</motion.section>

      

      {/* USER RESEARCH & FEATURE PRIORITIZATION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full py-16 md:py-20 px-6 md:px-10"
      >
        <div className="max-w-3xl mx-auto text-">
          <p
            className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3`}
          >
            User Research & Feature Prioritization
          </p>
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-6 leading-tight text-gray-900`}
          >
            From interviews to prioritized features
          </h2>
          <p className= {`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}>
            We captured verbatim signals, modeled priorities, and surfaced what should ship first.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-12">
          <PersonaCard {...personaData} />
        </div>

        <div className= {`${bodyFont.className} max-w-6xl mx-auto mt-16`}>
          <StickyNotes ideas={ideas} />
        </div>

        <div className= {`${bodyFont.className} max-w-6xl mx-auto mt-16`}>
          <ImpactMatrix ideas={ideas} />
        </div>
      </motion.section>

      

      {/* UPDATED SERVICE FLOW */}
      <motion.section
        id="updated-flow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full py-16 md:py-20"
      >
        <div className="max-w-3xl mx-auto px-6 text-left">
          <p
            className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3`}
          >
            UPDATED EXPERIENCE
          </p>
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-6 leading-tight text-gray-900`}
          >
            From fragmented exploration to guided decision-making
          </h2>
          <p className= {`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}>
            We redesigned the service flow to <Highlight color="#E0ECC1">introduce clarity, reduce manual effort,</Highlight> and <Highlight color="#E0ECC1"> enable faster, more confident decisions.</Highlight>
          </p>
          <p
            className={`${bodyFont.className} mt-4 text-lg md:text-lg text-gray-700 leading-relaxed`}
          >
            The updated experience introduces structured entry points, contextual discovery, and tiered pathways (L1, L2, L3), ensuring users can move from exploration to action with minimal friction.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="flex justify-center mb-10">
            <div className="bg-white/60 backdrop-blur rounded-full p-1 flex gap-1 shadow-sm">
              <button
                onClick={() => setUpdatedFlowView("flow")}
                className={`${bodyFont.className} px-4 py-2 rounded-full text-sm transition ${
                  updatedFlowView === "flow" ? "bg-black text-white" : "text-gray-600"
                }`}
              >
                New Flow
              </button>
              <button
                onClick={() => setUpdatedFlowView("intervention")}
                className={`${bodyFont.className} px-4 py-2 rounded-full text-sm transition ${
                  updatedFlowView === "intervention"
                    ? "bg-black text-white"
                    : "text-gray-600"
                }`}
              >
                Design Interventions
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={updatedFlowView}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              <div className= {`${bodyFont.className} w-full flex justify-center`}>
                <div className="flex items-center justify-center gap-4">
                  {updatedFlowView === "intervention" ? (
                    <ImprovementWrapper note="Guided and personalized entry">
                      <Card color="#F6F1DE" title="Entry Point">
                        Personalized entry with contextual recommendations based on role, industry, and past interactions
                      </Card>
                    </ImprovementWrapper>
                  ) : (
                    <Card color="#F6F1DE" title="Entry Point">
                      Personalized entry with contextual recommendations based on role, industry, and past interactions
                    </Card>
                  )}

                  <Arrow />

                  {updatedFlowView === "intervention" ? (
                    <ImprovementWrapper note="Improved discoverability + contextual recommendations">
                      <Card color="#EAF4EC" title="Exploration Layer">
                        Users explore curated insights, summaries, and relevant reports tailored to their context
                      </Card>
                    </ImprovementWrapper>
                  ) : (
                    <Card color="#EAF4EC" title="Exploration Layer">
                      Users explore curated insights, summaries, and relevant reports tailored to their context
                    </Card>
                  )}

                  <Arrow />

                  {updatedFlowView === "intervention" ? (
                    <ImprovementWrapper note="Structured pathways for L1, L2, L3 queries">
                      <Card color="#EAF0F6" title="Decision Split">
                        Level 1 → Instant answers via AI summaries (quick insights) <br />
                        Level 2 → Deeper analysis with comparisons and validation tools <br />
                        Level 3 → Custom engagement with analysts for complex needs
                      </Card>
                    </ImprovementWrapper>
                  ) : (
                    <Card color="#EAF0F6" title="Decision Split">
                      Level 1 → Instant answers via AI summaries (quick insights) <br />
                      Level 2 → Deeper analysis with comparisons and validation tools <br />
                      Level 3 → Custom engagement with analysts for complex needs
                    </Card>
                  )}

                  <Arrow />

                  {updatedFlowView === "intervention" ? (
                    <ImprovementWrapper note="Minimized manual dependency">
                      <Card color="#F6F1DE" title="Internal Intervention">
                        Reduced dependency on analysts through structured workflows and assisted analysis
                      </Card>
                    </ImprovementWrapper>
                  ) : (
                    <Card color="#F6F1DE" title="Internal Intervention">
                      Reduced dependency on analysts through structured workflows and assisted analysis
                    </Card>
                  )}

                  <Arrow />

                  {updatedFlowView === "intervention" ? (
                    <ImprovementWrapper note="Faster validation and decision clarity">
                      <Card color="#EAF4EC" title="Consumption">
                        Users validate insights through comparisons, summaries, and decision-ready outputs
                      </Card>
                    </ImprovementWrapper>
                  ) : (
                    <Card color="#EAF4EC" title="Consumption">
                      Users validate insights through comparisons, summaries, and decision-ready outputs
                    </Card>
                  )}

                  <Arrow />

                  {updatedFlowView === "intervention" ? (
                    <ImprovementWrapper note="Closed feedback loop">
                      <Card color="#F6F1DE" title="Loop Back">
                        Continuous feedback loop improves recommendations and personalization
                      </Card>
                    </ImprovementWrapper>
                  ) : (
                    <Card color="#F6F1DE" title="Loop Back">
                      Continuous feedback loop improves recommendations and personalization
                    </Card>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
      {/* DESIGN DIRECTIONS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full border-t border-[#dfe6d5]/60"
      >
        <EditorialPageBreakerSection
          label="PRODUCT SYNTHESIS"
          heading="Design Directions"
          body={
            <>
              Research insights and prioritized ideas converge into  three concrete surfaces,{" "}
              <span className={editorialHighlightClass}>calmer entry, credible peer learning, and reports built for
              decisions, </span>{" "} not generic UX polish, but product behavior aligned to
              how GCC leaders actually work.
            </>
          }
          quote="Design is not about adding features, but about structuring clarity into every interaction."
        />

        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-8 md:pt-12 space-y-20 md:space-y-28">
          {designDirectionSections.map((section) => (
            <DesignDirectionBlock key={section.title} {...section} />
          ))}
        </div>
      </motion.section>

      <DecisionMakingToolsSection />

      <UsabilityTestingSection />

      <DesignDirectionsBentoSection />

      <FinalExperienceSection />

      <AdminPlatformCaseStudySection />

      <CaseStudyClosingSection />

    </main>
  );
}

const adminPlatformWorkshopIdeas: Array<{ title: string; detail?: string }> = [
  {
    title: "Fragmented workflows",
    detail: "Work jumps across CRM, reports, and communication tools",
  },
  {
    title: "Repetitive queries",
    detail: "Same client questions handled repeatedly without reuse",
  },
  {
    title: "Manual report creation",
    detail: "Time spent compiling instead of analyzing",
  },
  {
    title: "Lack of tracking",
    detail: "No clear visibility into request status",
  },
  {
    title: "Delayed responses",
    detail: "Dependency on multiple teams slows turnaround",
  },
  {
    title: "Knowledge gaps",
    detail: "Insights exist but are not easily accessible",
  },
  {
    title: "Context switching",
    detail: "Frequent switching between tools reduces efficiency",
  },
  {
    title: "No proactive alerts",
    detail: "Teams react instead of anticipating needs",
  },
];

function AdminPlatformWorkshopStickyNotes({
  ideas,
}: {
  ideas: Array<{ title: string; detail?: string }>;
}) {
  const pastelNotes = [
    { bgClass: "bg-[#FDF1F1]", textClass: "text-[#6B2A2A]" },
    { bgClass: "bg-[#FFFBE6]", textClass: "text-[#5A4A12]" },
    { bgClass: "bg-[#EAF7EC]", textClass: "text-[#1F4D3A]" },
    { bgClass: "bg-[#EAF7F6]", textClass: "text-[#1E4A5A]" },
    { bgClass: "bg-[#E0ECC1]", textClass: "text-[#3B4A12]" },
    { bgClass: "bg-[#F7F0FF]", textClass: "text-[#4A2C6B]" },
  ];

  const noteData = ideas.map((idea, index) => {
    const rot = Math.round(Math.sin((index + 1) * 9.73) * 3 * 10) / 10;
    const palette = pastelNotes[index % pastelNotes.length];
    return { title: idea.title, detail: idea.detail, rotation: rot, ...palette };
  });

  return (
    <div className="rounded-2xl border border-[#dfe6d5] bg-[#f8faf4]/60 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="px-6 md:px-8 pt-8 pb-6">
        <p
          className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3 text-center`}
        >
          WORKSHOP INSIGHTS
        </p>
        <h3
          className={`${headingFont.className} text-2xl md:text-3xl font-semibold text-gray-900 text-center`}
        >
          Ideas from Internal Team Workshops
        </h3>
        <p className= {`${bodyFont.className} mt-4 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center`}>
          We conducted a focused workshop with Business Development and Customer
          Support teams to understand their workflows, uncover pain points, and
          identify opportunities to streamline internal operations.
        </p>
      </div>

      <div className="relative mt-2 px-4 md:px-6 pb-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40 pointer-events-none" />

        <motion.div
          className="relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center gap-3 md:gap-4 px-2">
            {noteData.map((note) => (
              <motion.div
                key={note.title}
                custom={note.rotation}
                variants={{
                  hidden: (rotation: number) => ({
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    rotate: rotation,
                  }),
                  visible: (rotation: number) => ({
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: rotation,
                    transition: {
                      duration: 0.45,
                      ease: [0.2, 0.8, 0.2, 1],
                    },
                  }),
                }}
                style={{ transformOrigin: "50% 50%" }}
                className={[
                  "relative w-full max-w-[220px] rounded-lg",
                  note.bgClass,
                  "border border-neutral-200/70 shadow-[0_10px_26px_rgba(0,0,0,0.10)]",
                ].join(" ")}
              >
                <div className="px-3 py-2">
                  <p
                    className={`${bodyFont.className} text-sm font-medium leading-snug ${note.textClass}`}
                  >
                    {note.title}
                  </p>
                  {note.detail ? (
                    <p className={`${bodyFont.className} mt-1 text-xs text-gray-600 leading-snug`}>
                      {note.detail}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AdminPlatformPersonaCardRahul() {
  const goals = [
    "- Quickly access relevant case studies and benchmarks",
    "- Build strong, data-backed proposals",
    "- sdTrack ongoing client engagements",
  ];
  const painPoints = [
    "- Information scattered across tools",
    "- Time-consuming manual  compilation of insights",
    "- Lack of visibility into request status",
  ];
  const appsUsed = ["CRM", "Slack", "Reports", "Email", "Internal dashboards"];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#dfe6d5] bg-[#f8faf4]/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(199,242,240,0.45), rgba(240,211,211,0.18) 55%, rgba(255,251,230,0) 72%)",
        }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8">
        <div className="space-y-4 md:pr-4 md: flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src="/persona-rahul.png"
            alt="Rahul Mehta avatar"
            className="h-64 w-64 rounded-xl object-cover border border-[#dfe6d5] bg-white/60 shadow-sm"
          />
          <h3
            className={`${headingFont.className} text-xl font-semibold text-gray-900 mt-1`}
          >
            Rahul Mehta
          </h3>
          <div className="text-sm text-gray-500 leading-snug space-y-1">
            <p>Business Development Manager</p>
          </div>
        </div>

        <div className="space-y-5 md:px-2">
          <div>
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-600 mb-2`}
            >
              Type of work
            </p>
            <p
              className={`${bodyFont.className} text-sm md:text-base text-gray-700 leading-snug`}
            >
              Rahul is responsible for identifying new opportunities, building
              proposals, and managing client relationships across regions.
            </p>
          </div>

          <p
            className={`${quoteFont.className} text-lg leading-relaxed text-gray-900 max-w-md`}
          >
            “I need one place to see{" "}
            <Highlight color="#EEDDDD">client context</Highlight>
            {", "}
            <Highlight color="#E0ECC1">proof points</Highlight>
            {", and "}
            <Highlight color="#D1E8E9">where each deal stands</Highlight>
            {" "}
            — without stitching spreadsheets and threads.”
          </p>
          <div>
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-600 mb-2`}
            >
              Apps used
            </p>
            <div className="flex flex-wrap gap-2">
              {appsUsed.map((app) => (
                <span
                  key={app}
                  className="text-xs px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-gray-700"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 md:pl-4 md:">
          <div className="rounded-xl p-4 bg-[#FDECEC] border border-[#F5B5B5]">
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-700 mb-2`}
            >
              Pain points
            </p>
            <ul className="space-y-2">
              {painPoints.map((item) => (
                <li
                  key={item}
                  className={`${bodyFont.className} text-sm text-[#7F2A2A] leading-snug`}
                >
                   <Highlight color="#FDECEC">{item}</Highlight>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-4 bg-[#EAF4EC] border border-[#cfe2d2]">
            <p
              className={`${headingFont.className} text-xs tracking-[0.14em] uppercase text-gray-700 mb-2`}
            >
              Goals
            </p>
            <ul className="space-y-2">
              {goals.map((item) => (
                <li
                  key={item}
                  className={`${bodyFont.className} text-sm text-gray-700 leading-snug`}
                >
                  <Highlight color="#EAF4EC">{item}</Highlight>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const adminPlatformFinalScreens: FinalUIScreenSectionProps[] = [
  {
    heading: "Main Dashboard",
    description:(
      <>
    The dashboard consolidates tasks, signals, and performance metrics into a
    <Highlight color="#E0ECC1"> single operational surface, </Highlight> enabling internal teams to monitor activity,
    identify risks, and act without switching contexts. By structuring information
    across subscriptions, usage, and tool performance, it provides a continuous view
    of both system health and business momentum.
    </>
    ),
    imageSrc: "/design/dashboard.png",
    imageAlt: "Admin main dashboard UI",
    annotations: [
      {
        n: 1,
        title: "Consolidated operational view",
        body: "Brings subscriptions, usage, and client activity into one surface, reducing the need to navigate across multiple tools.",
      },
      {
        n: 2,
        title: "Signal-driven prioritization",
        body: "Alerts, changes, and key movements are surfaced within metrics, helping teams identify what needs attention without manual tracking.",
      },
      {
        n: 3,
        title: "Layered information hierarchy",
        body: "Information is organized from high-level summaries to detailed breakdowns, enabling both quick scanning and deeper analysis.",
      },
      {
        n: 4,
        title: "Performance visibility across dimensions",
        body: "Metrics are structured across clients, regions, and usage patterns, supporting multi-dimensional understanding of platform performance.",
      },
      {
        n: 5,
        title: "Embedded analytics within workflows",
        body: "Charts and summaries are integrated directly into the interface, allowing users to interpret data without leaving their workflow.",
      },
      {
        n: 6,
        title: "Role-sensitive relevance",
        body: "Content adapts to operational priorities, ensuring that business development, support, and management teams see what matters to them.",
      },
      {
        n: 7,
        title: "Reduced context switching",
        body: "Combines monitoring, analysis, and decision cues in one place, minimizing fragmentation across tools and tabs.",
      },
    ],
  },
  {
    heading: "Account Dashboard",
    description:(
      <>
      The account dashboard brings together contract details, engagement history,
      and performance signals into a <Highlight color="#E0ECC1"> single, evolving view of each client.</Highlight> By connecting
      activity, stakeholders, and insights, it enables teams to understand account health,
      track progress over time, and act with full context, without relying on fragmented tools
      or manual follow-ups.
      </>
    ),
    imageSrc: "/design/account.png",
    imageAlt: "Admin account dashboard UI",
    annotations: [
      {
        n: 1,
        title: "Unified account snapshot",
        body: "Contracts, stakeholders, and open threads in one profile.Combines contracts, stakeholders, and key metrics into a single reference point for every client.",
      },
      {
        n: 2,
        title: "Continuous engagement tracking",
        body: "Captures meetings, queries, and platform activity to reflect the full interaction history over time.",
      },
      {
        n: 3,
        title: "Insight-linked workflows",
        body: "Relevant reports, benchmarks, and outputs are attached directly to the account for easy access and reuse.",
      },
      {
        n: 4,
        title: "Clear status visibility",
        body: "Surfaces current state across engagements—what is active, pending, or completed, reducing ambiguity.",
      },
      {
        n: 5,
        title: "Cross-team continuity",
        body: "Shared context allows teams to collaborate and transition ownership without repeated briefings.",
      },
      {
        n: 6,
        title: "Relationship health indicators",
        body: "Usage patterns and engagement signals help identify active, at-risk, or high-potential accounts.",
      },
    ],
  },
  {
    heading: "Profile Usage",
    description:(
      <>
      The profile usage view captures how individuals and teams interact with the platform
      over time, translating activity into <Highlight color="#E0ECC1">meaningful behavioral patterns.</Highlight> By connecting
      queries, content consumption, and engagement signals, it enables internal teams to
      understand user intent, identify opportunities for intervention, and support more
      informed decision-making.
      </>
    ),
    imageSrc: "/design/usage.png",
    imageAlt: "Admin profile usage analytics UI",
    annotations: [
      {
        n: 1,
        title: "Chronological activity visibility",
        body: "Tracks user actions across queries, reports, and events to provide a continuous view of engagement over time.",
      },
      {
        n: 2,
        title: "Multi-channel engagement mapping",
        body: "Captures interactions across reports, videos, podcasts, and events to reflect how users consume and respond to content.",
      },
      {
        n: 3,
        title: "Behavioral pattern recognition",
        body: "Surfaces trends such as frequency, depth, and type of engagement to distinguish active, passive, or disengaged users.",
      },
      {
        n: 4,
        title: "Content affinity signals",
        body: "Highlights which topics, formats, and themes drive interaction, informing personalization and outreach strategies.",
      },
      {
        n: 5,
        title: "Actionable engagement insights",
        body: "Transforms raw activity into signals that support follow-ups, recommendations, and targeted interventions.",
      },
      {
        n: 6,
        title: "Context for relationship management",
        body: "Provides internal teams with a clear understanding of user interests and journey without relying on manual notes.",
      },
      {
        n: 7,
        title: "Structured access and permissions view",
        body: "Displays tool access and usage alignment, helping teams identify gaps between availability and actual adoption.",
      },
    ],
  },
  {
    heading: "Task Management",
    description:(
      <>
    The task management system brings structure and visibility to internal workflows,
    ensuring that work moves clearly across teams without fragmentation. By <Highlight color="#E0ECC1">defining
    ownership, mapping </Highlight> <Highlight color="#E0ECC1">dependencies, and surfacing timelines,</Highlight> it enables teams to
    coordinate effectively, track progress in real time, and reduce delays caused by
    unclear handoffs or missing context.
    </>
    ),
    imageSrc: "/design/task.png",
    imageAlt: "Admin task management UI",
    annotations: [
      {
        n: 1,
        title: "Defined ownership at every step",
        body: "Assigns clear roles across contributors, reviewers, and stakeholders to eliminate ambiguity.",
      },
      {
        n: 2,
        title: "Standardized workflow progression",
        body: "Tasks move through clearly defined stages, creating a shared understanding of progress and status.",
      },
      {
        n: 3,
        title: "Linked system dependencies",
        body: "Connects tasks to clients, queries, and reports, ensuring traceability across the ecosystem.",
      },
      {
        n: 4,
        title: "Time-bound execution visibility",
        body: "Deadlines, SLAs, and timelines are surfaced to keep teams aligned and accountable.",
      },
      {
        n: 5,
        title: "Real-time activity tracking",
        body: "Logs actions and updates to provide a transparent view of task movement and history.",
      },
      {
        n: 6,
        title: "Reduced coordination friction",
        body: "Centralized visibility minimizes reliance on meetings, emails, and manual follow-ups.",
      },
      {
        n: 7,
        title: "Context-rich task environment",
        body: "Each task is embedded within its broader business and account context, improving decision-making during execution.",
      },
    ],
  },
  {
    heading: "Queries Inner Page",
    description:(
      <>
    The queries interface centralizes inbound questions and transforms them
    into <Highlight color="#E0ECC1"> structured, trackable conversations. </Highlight> By combining full history, <Highlight color="#E0ECC1">contextual metadata,</Highlight> and reusable responses, it enables teams to resolve
    contextual metadata, and reusable responses, it enables teams to resolve
    queries faster, maintain continuity across handoffs, and ensure that every
    interaction is informed by past context rather than repeated discovery.
    </>
    ),
    imageSrc: "/design/query.png",
    imageAlt: "Admin queries detail UI",
    annotations: [
      {
        n: 1,
        title: "Centralized query intake",
        body: "All incoming questions are routed into a single system, creating a unified queue for tracking and action.",
      },
      {
        n: 2,
        title: "Contextual conversation threads",
        body: "Each query carries associated account details, prior interactions, and metadata to provide complete context.",
      },
      {
        n: 3,
        title: "Structured response workflows",
        body: "Teams can respond using templates and references, balancing efficiency with personalization.",
      },
      {
        n: 4,
        title: "Persistent interaction history",
        body: "Every update, response, and action is recorded, ensuring transparency across teams and time.",
      },
      {
        n: 5,
        title: "Ownership and status visibility",
        body: "Clear assignment and progress indicators help track who is responsible and where resolution stands.",
      },
      {
        n: 6,
        title: "Connected system actions",
        body: "Queries can trigger downstream actions such as task creation, events, or report sharing, linking conversations to execution.",
      },
    ],
  },
];

function AdminPlatformCaseStudySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 space-y-16 md:space-y-12">
        {/* 1. Header — Who is Zinnov style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 py-8 md:py-12 text-center"
        >
          <p
            className={`${headingFont.className} text-sm tracking-[0.14em] uppercase text-gray-600 mb-3`}
          >
            ADMIN PLATFORM
          </p>
          <h2
            className={`${headingFont.className} text-3xl md:text-6xl font-semibold mb-6 leading-tight text-gray-900`}
          >
            Designing the Operational Backbone for Internal Teams
          </h2>
          <p className= {`${bodyFont.className} text-left text-lg md:text-xl text-gray-700 leading-relaxed`}>
            While the customer-facing platform enables discovery and
            decision-making, the internal platform powers the teams that keep the
            system running.
            <br />
            <br />
            </p> 
        
      <div className="max-w-md mx-auto px-6 py-12 border-l-2 border-[#d6dccb] pl-6">
        <p
          className={`${quoteFont.className} text-left text-2xl md:text-xl leading-snug text-gray-800`}
        >
          “From business development to customer support and backend operations, this layer ensures that{" "}
          
          <Highlight color="#E0ECC1">
          insights are delivered, queries are resolved 
          </Highlight>{" "}
          
          and {" "}
          
          <Highlight color="#D1E8E9">
          workflows are executed
          </Highlight>{" "}
          
          efficiently at scale.”
        </p>
        </div>
            
        </motion.div>

        {/* 2. Scenario — replicate problem scenario structure */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-left"
        >
          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold mb-6 leading-tight text-gray-900`}
          >
            Let me explain how internal teams manage operations…
          </h2>

          <p className= {`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}>
            Imagine you are part of the business development or customer support
            team, <Highlight color="#E0ECC1">handling multiple client requests, tracking ongoing engagements,
            and responding </Highlight>  <Highlight color="#E0ECC1">to queries </Highlight> that require quick, contextual insights.
            <br />
            <br />
            You rely on internal dashboards, reports, and communication loops to
            manage operations and ensure smooth delivery.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {[
            "/admin-1.png",
            "/admin-2.png",
            "/admin-3.png",
            "/admin-4.png",
            "/admin-5.png",
            "/admin-6.png",
          ].map((src, index) => (
            <motion.img
              key={src}
              src={src}
              alt={`Scenario panel ${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="w-full rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:scale-[1.015]"
            />
          ))}
        </div>
          
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 py-8 md:py-8 text-left"
        >
          <p
            className={`${headingFont.className} text-xs tracking-[0.2em] uppercase text-gray-500 mb-4`}
          >
            INTERNAL WORKFLOWS
          </p>

          <h2
            className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-6`}
          >
            Understanding the Teams Behind the Platform
          </h2>

          <p
            className={`${bodyFont.className} text-lg md:text-xl text-gray-700 leading-relaxed`}
          >
            While the platform enables strategic decision-making for users, an
            equally critical layer operates behind the scenes, and it was essential to
            understand how these teams navigate workflows, access information,
            and coordinate across tools under time pressure.
          </p>
        </motion.section>

        {/* 3. Persona — Asha R layout */}
        <div className="max-w-6xl mx-auto">
          <AdminPlatformPersonaCardRahul />
        </div>

        {/* 4. Ideation — StickyNotes structure */}
        <div className="max-w-6xl mx-auto">
          <AdminPlatformWorkshopStickyNotes ideas={adminPlatformWorkshopIdeas} />
        </div>

        <section className= "rounded-2xl relative  bg-[#F3F6ED] py-20 md:py-28">
        <div className="relative left-1/2 right-1/2 w-full -translate-x-1/2">
          <div className="max-w-3xl mx-auto text-center px-6 md:px-0 space-y-6 md:space-y-8">
            <p
              className={`${headingFont.className} text-xs tracking-[0.2em] uppercase text-gray-500`}
            >
              INTERNAL EXPERIENCE
            </p>
            <h2
              className={`${headingFont.className} text-3xl md:text-4xl font-semibold text-gray-900 leading-tight`}
            >
              Designing for Operational Clarity and Speed
            </h2>
            <p
              className={`${bodyFont.className} text-lg md:text-xl leading-relaxed text-gray-700`}
            >
              The internal platform reimagines how teams handle workflows,
              bringing together{" "}
              <span className={editorialHighlightClass}>visibility</span>,{" "}
              <span className={editorialHighlightClass}>context</span>, and{" "}
              <span className={editorialHighlightClass}>execution</span> into a
              unified system.
              <br />
              <br />
              Instead of navigating fragmented tools and reactive workflows,
              teams are now equipped with structured pathways that reduce manual
              effort and enable faster, more confident decision-making.
            </p>

            <div className="relative max-w-2xl mx-auto pt-2 pb-4">
              <span
                aria-hidden
                className={`${bodyFont.className} absolute -left-2 md:-left-6 -top-2 md:-top-4 text-[120px] leading-none text-[#9CAD6A] opacity-70 select-none pointer-events-none`}
              >
                &ldquo;
              </span>
              <blockquote
                className={`${bodyFont.className} relative z-10 mx-auto text-4xl text-[#9CAD6A] text-center px-8 md:px-10 leading-snug font-normal`}
              >
                Every internal workflow is designed to reduce coordination
                overhead, surface the right context, and move teams from request
                to resolution with clarity.
              </blockquote>
              <span
                aria-hidden
                className={`${bodyFont.className} absolute -right-0 md:-right-8 bottom-0 md:top-40 text-[120px] leading-none text-[#9CAD6A] opacity-70 select-none pointer-events-none`}
              >
                &rdquo;
              </span>
            </div>
          </div>
          </div>
        </section>

        {/* 5. Final UI — FinalUIScreenSection x5 */}
        <div className="space-y-16 md:space-y-24">
          {adminPlatformFinalScreens.map((screen) => (
            <Fragment key={screen.heading}>
              <FinalUIScreenSection {...screen} />
              {screen.heading === "Queries Inner Page" ? (
                <AdminImpactSection />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  );
}