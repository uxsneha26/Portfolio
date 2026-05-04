"use client";

import { useState } from "react";
import { instrumentSerif, bodySerif, caveat } from "@/lib/fonts";
import { PoemOverlay } from "./PoemOverlay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_TEASER = [
  "I wish to see the spring",
  "of a land in a different time",
  "to be woken by the sound",
  "of the nightingale’s rhyme",
] as const;

const DEFAULT_POEM = 
`I wish to see the spring
of a land in a different time
to be woken by the sound
of the nightingale’s rhyme

to feel the warmth of sunrise
against the chill of winter’s wake
to work among fields of grains
my bare hands plough and make

a simple life that would be
with less reasons to withhold
and nary a worry burdening
my weary and brittle soul

a warm heart I would feel
a freer mind to wear
in a body that is healthy
my blessed soul to share

amidst bustle of new leaves
rustles of river flows
the soothe music of the woods
wafts of wind that blows

I can almost breathe in
the freshness of new air
made a wee heavier with dew
none, a sweet fragrant affair

listening to sounds of life
and seeing the wonderful sights
calls out to my yearning heart
in for a faithful respite

my heart longs for the feeling
the home and the love
a place to call my safe haven
blessed by the stars above

where I’d sing to the heavens
mould poetry through art
and build a merry life
with resplendent love in my heart

though where may I reach
to ride the eras against the flow?
whom shall I pray magic it
skies above or ground below?

hush now...I must reflect on
the chance this fairy tale’d last
‘Is there no way of solace
for my heart in the past?’

Mayhap the heaven that I want
lies ensconced in my divine
for its happenstance seems neigh
to be in the spring of a different time`;

const DEFAULT_BACK_BG = "/images/poem-card-bg.png";


const frontImageWrapBase =
  "mx-auto mt-6 overflow-hidden rounded-lg";

export type PoemCardProps = {
  className?: string;
  frontTitle: string;
  /** Front illustration src */
  frontImage: string;
  frontImageAlt?: string;
  /** Wraps the image; use for size (e.g. painting slightly larger than musings) */
  frontImageClassName?: string;
  backTitle: string;
  /** Back face background (poem variant only; gallery uses flat bg) */
  backBackgroundImage?: string | null;
  teaserLines: readonly string[];
  cursorLabel: string;
  /** Full body for the read overlay */
  poemText?: string;
  /** Overlay heading; defaults to backTitle */
  overlayTitle?: string;
  variant?: "poem" | "gallery";
  /** Gallery back carousel image URLs */
  images?: string[];
  /** Enable image overlay for gallery variant */
  enableImageOverlay?: boolean;
  /** Disable overlay click for gallery variant */
  disableOverlayClick?: boolean;
  /** Images for the image overlay */
  overlayImages?: string[];
  /** Show image cursor for gallery variant */
  showImageCursor?: boolean;
};

/**
 * Flip bento tile: shared 3D hover flip, custom front/back copy and assets.
 * Click back → full-screen overlay (poem / long-form body).
 */
export function PoemCard({
  className = "",
  frontTitle,
  frontImage,
  frontImageAlt = "",
  frontImageClassName = `${frontImageWrapBase} h-80 w-40`,
  backTitle,
  backBackgroundImage,
  teaserLines,
  cursorLabel,
  poemText = DEFAULT_POEM,
  overlayTitle,
  showImageCursor = false,
  disableOverlayClick = false,
  variant = "poem",
  
  enableImageOverlay = false,
images,
overlayImages,
}: PoemCardProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [imageOverlayOpen, setImageOverlayOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const overlayHeading = overlayTitle ?? backTitle;
  const isPoem = variant === "poem";
  const isGallery = variant === "gallery";
  const showCarousel =
    isGallery && images && images.length > 0;

  const next = () => {
    if (!images?.length) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
const prev = () => {
    if (!images?.length) return;
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const bgSrc = backBackgroundImage ?? DEFAULT_BACK_BG;
  const overlayImageList = overlayImages ?? (images || []);

  return (
    <>
      <div
        className={`group h-full w-full min-h-0 [perspective:1000px] ${className}`}
      >
        <div className="relative h-full min-h-[12rem] w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none group-hover:[transform:rotateY(180deg)] motion-reduce:group-hover:[transform:rotateY(0deg)]">
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-start gap-8 rounded-xl border border-neutral-200/70 bg-[#faf8f6]/70 p-4 pt-12 shadow-sm backdrop-blur-sm [backface-visibility:hidden]">
            <div>
              <p
                className={`${caveat.className} mt-6 text-center text-4xl text-[#412F2F]/80`}
              >
                {frontTitle}
              </p>
            </div>
            <div className={frontImageClassName}>
              <img
                src={frontImage}
                alt={frontImageAlt || `${frontTitle} illustration`}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Back — div wrapper so carousel chevrons can be real <button>s (no nesting) */}
          <div
            role="button"
            data-cursor={isPoem ? "hidden" : undefined}
            tabIndex={0}
            aria-label={`${cursorLabel}: ${backTitle}`}
            onClick={() => {
              if (enableImageOverlay) {
                setImageOverlayOpen(true);
              } else if (!disableOverlayClick) {
                setOverlayOpen(true);
              }
            }}

            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
            
                if (enableImageOverlay) {
                  setImageOverlayOpen(true);
                } else if (!disableOverlayClick) {
                  setOverlayOpen(true);
                }
              }
            }}
            onMouseEnter={(e) => {
              if (!isPoem) return;
            
              const rect = e.currentTarget.getBoundingClientRect();
            
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
            
              setCursorPos({ x, y });
              setHovering(true);
            }}
            
            onMouseMove={(e) => {
              if (!isPoem) return;
            
              const rect = e.currentTarget.getBoundingClientRect();
            
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
            
              setCursorPos({ x, y });

            
              // ✅ Always active while inside
              
            }}
            
            onMouseLeave={() => {
              setHovering(false);
            }}

// Hide cursor when hovering over poem or gallery image overlay
            className={`absolute inset-0 overflow-hidden rounded-xl shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] ${
              (isPoem || showImageCursor) ? "cursor-none" : "cursor-default"
            }`}
          >
            {isGallery ? (
              <div className="absolute inset-0 rounded-xl bg-[#faf8f6]" />
            ) : (
              <div
                className="absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${bgSrc}')` }}
              >
                <div className="absolute inset-0 rounded-xl bg-[#faf8f6]/30" />
              </div>
            )}

            {!isGallery && (
              <div className="absolute inset-0 bg-[#F8F3E0]/60" />
            )}

            <div className="relative z-10 flex h-full flex-col justify-start p-5 text-white">
              
                {showCarousel && (
                  <div
                  className="relative flex-1 w-full shadow-[inset_0_-40px_60px_rgba(0,0,0,0.12),inset_0_20px_40px_rgba(0,0,0,0.01)] overflow-hidden rounded-lg"
                
                  onMouseEnter={(e) => {
                    if (!showImageCursor) return;
                
                    const rect = e.currentTarget.getBoundingClientRect();
                
                    setCursorPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                
                    setHovering(true);
                  }}
                
                  onMouseMove={(e) => {
                    if (!showImageCursor) return;
                
                    const rect = e.currentTarget.getBoundingClientRect();
                
                    setCursorPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                
                  onMouseLeave={() => {
                    if (isGallery) setHovering(false);
                  }}
                >
                  
                  <img
  data-cursor={showImageCursor ? "hidden" : undefined}
  src={images[currentIndex]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
{/* Previous image button */}
<button
                  type="button"
                      aria-label="Previous image"
                      onMouseEnter={() => setHovering(false)}
                      onMouseLeave={() => setHovering(true)}
                      data-cursor="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full text-lg text-[#815555] bg-white/60 p-2 shadow-sm hover:bg-white"
                    >
                     <ChevronLeft size={18} strokeWidth={1.5} />
                    </button>

{/* Next image button */}
              <button
                      type="button"
                      aria-label="Next image"
                      onMouseEnter={() => setHovering(false)}
                      onMouseLeave={() => setHovering(true)}
                      data-cursor="default"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-lg text-[#815555] bg-white/60 p-2 shadow-sm hover:bg-white"
                    >
                     <ChevronRight size={18} strokeWidth={1.5} />
                    </button>                    
                  </div>
                )}

<div className="pt-4">
  {isPoem && (
    <p className={`${bodySerif.className} text-2xl md:text-3xl text-[#2F2323]`}>
      {backTitle}
    </p>
  )}

  <div className="mt-3 space-y-2">
                <div
                  className={`${bodySerif.className} mt-4 space-y-1 text-base leading-snug text-[#2F2323]/90 md:text-md`}
                >
                  {teaserLines.slice(0, 3).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                </div>
                </div>

{/* GALLERY CURSOR (painting + art) */}
              
            </div>

            {hovering && (isPoem || (showImageCursor && showCarousel)) && (
  <div
    className="pointer-events-none absolute z-[999] transition-transform duration-150 ease-out"
    style={{
      left: cursorPos.x,
      top: cursorPos.y,
      transform: "translate(-50%, -50%)",
    }}
  >
    <div className={`${instrumentSerif.className} flex h-20 w-20 items-center justify-center rounded-full border border-[#987D7D] bg-[#815555]/70 text-white text-sm backdrop-blur-md`}>
      {cursorLabel}
    </div>
  </div>
)}                
</div>   
          </div>
        </div>
      
      
{!disableOverlayClick && (
    <PoemOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        title={overlayHeading}
        poemText={poemText}
      />
      )}

{enableImageOverlay && imageOverlayOpen && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-[#faf8f6]/30 backdrop-blur-[2px]"
    onClick={() => setImageOverlayOpen(false)}
  >
    <div
  className="relative h-[80vh] aspect-square rounded-xl bg-white/10 backdrop-blur-md shadow-2xl p-4 flex items-center justify-center"
  onClick={(e) => e.stopPropagation()}
>
<img
  src={overlayImageList[currentIndex] || ""}
  alt=""
  className="max-h-full max-w-full object-contain rounded-md"
/>
{/* LEFT CHEVRON */}
<button
  onClick={(e) => {
    e.stopPropagation();
    prev();
  }}
  className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 text-lg text-[#815555] rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:bg-white transition"
>
<ChevronLeft size={18} strokeWidth={1.5} />
</button>

{/* RIGHT CHEVRON */}
<button
  onClick={(e) => {
    e.stopPropagation();
    next();
  }}
  className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 text-lg text-[#815555] rounded-full bg-white/70 backdrop-blur-sm shadow-md hover:bg-white transition"
>
<ChevronRight size={18} strokeWidth={1.5} />
</button>
</div>
  </div>
)}
    </>
  );
}

/** Musings / poem — default copy and assets */
export const musingsCardProps = {
  variant: "poem" as const,
  frontTitle: "musings",
  frontImage: "/images/musings-icon.png",
  frontImageAlt: "Musings illustration",
  frontImageClassName: `${frontImageWrapBase} h-80 w-40`,
  backTitle: "The Spring of Time",
  backBackgroundImage: DEFAULT_BACK_BG,
  teaserLines: DEFAULT_TEASER,
  cursorLabel: "Read poem",
  poemText: DEFAULT_POEM,
} as const satisfies PoemCardProps;

/** Painting — slightly larger front illustration */
export const paintingCardProps = {
  variant: "gallery" as const,
  images: [
    "/images/gallery/painting-1.png",
    "/images/gallery/painting-2.png",
    "/images/gallery/painting-3.png",
  ],
  frontTitle: "painting",
  frontImage: "/images/paint-palette.png",
  frontImageAlt: "Paint palette and brush",
  frontImageClassName: `${frontImageWrapBase} h-96 w-48`,
  backTitle: "Making art",
  disableOverlayClick: true,
  enableImageOverlay: false,
  teaserLines: [
    "Layers of color where silence used to sit—",
],
  cursorLabel: "View work",
poemText: `Making art`,
} as const satisfies PoemCardProps;

/** Art / creative explorations */
export const artCardProps = {
  variant: "gallery" as const,
  /** Images for the carousel */
  images: [
    "/images/gallery/art-1-zoom.png",
    "/images/gallery/art-2-zoom.png",
    "/images/gallery/art-3-zoom.png",
  ],
  /** Images for the image overlay */
  overlayImages: [
    "/images/gallery/art-1.png",
    "/images/gallery/art-2.png",
    "/images/gallery/art-3.png",
  ],

  frontTitle: "art",
  frontImage: "/images/art.png",
  frontImageAlt: "Abstract creative illustration",
  frontImageClassName: `${frontImageWrapBase} h-80 w-44`,
  backTitle: "Creative explorations",
  teaserLines: [
  "Shapes lean toward each other like a quiet conversation,",
  ],
  cursorLabel: "View Artwork",
  enableImageOverlay: true,
  disableOverlayClick: false,
  showImageCursor: true,
  poemText: `Creative explorations`,
} as const satisfies PoemCardProps;
