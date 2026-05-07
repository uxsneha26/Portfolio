import { instrumentSerif } from "@/lib/fonts";
import { BentoCard } from "@/components/ui/BentoCard";
import Image from "next/image";
import { Caveat } from "next/font/google";
import {
  PoemCard,
  artCardProps,
  musingsCardProps,
  paintingCardProps,
} from "@/components/personal/PoemCard";
import { MusicCard } from "./MusicCard";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

/**
 * Stacked-scroll “takeover” after Architecture:
 * negative margin pulls this block up so it overlaps the previous sticky section,
 * while the tall inner track keeps one viewport pinned until scroll completes.
 */
export function PersonalSection() {
  return (
    <section
      id="personal-section"
      className="relative z-40 -mt-[100vh] w-full"
      aria-labelledby="personal-section-heading"
      data-cursor
  data-cursor-color="#C49C9C"
    >
      {/*
        Scroll runway: sticky child stays fixed for this distance, so the panel
        appears to slide over the section below without shifting prior layout
        (overlap is handled by margin + paint order, not by changing flow above).
      */}
      {/* Background Image */}
      
      
      <div className="relative z-30 -mt-[90vh] md:-mt-[80vh] lg:-mt-[90vh] w-full min-h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
        <Image
          src="/images/BG2.png" // replace with your file
          alt="Background"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
</div>
          {/* Full-viewport panel: sits above Architecture (z-30) while user scrolls this track */}
          <div className="relative h-full w-full">
            {/* Background layer — placeholder until real photography/texture */}
            <div className="absolute inset-0 backdrop-blur-sm" />
            {/* replace with image later */}
            <div
              className="absolute inset-0 z-0"
              aria-hidden
            />


            

            {/* Foreground: heading in flow with bento row (shared top baseline) */}
            <div className="relative z-10 flex h-[95vh] w-full flex-col justify-center px-12 pb-14 pt-20 md:px-20 md:pb-18 md:pt-24 lg:px-24">
            <div className="flex w-full min-w-0 items-center gap-12 flex-1">
                {/* A: intro copy + Card 1 */}
                <div className="flex min-w-0 flex-[1] flex-col gap-6 h-full">
  <div className="shrink-0">
    <h2
      id="personal-section-heading"
      className={`${instrumentSerif.className} max-w-3xl text-balance text-4xl font-normal leading-[1.15] tracking-tight text-[#412F2F] md:text-5xl lg:text-6xl`}
    >
      Some personal stuff
    </h2>
    <p
      className={`${caveat.className} mt-3 text-2xl text-[#412F2F] md:text-4xl`}
    >
      that shapes who I am
    </p>
  </div>


  <PoemCard
    {...musingsCardProps}
    className="mt-auto h-[300px] md:h-[320px]"
  />
</div>

                {/* Center: Card 2 */}
                <PoemCard
  variant="gallery"
  images={[
    "/images/gallery/painting-1.png",
    "/images/gallery/painting-2.png",
    "/images/gallery/painting-3.png",
    "/images/gallery/painting-4.png",
    "/images/gallery/painting-5.png",
    "/images/gallery/painting-6.png",
    "/images/gallery/painting-7.png",
    "/images/gallery/painting-8.png",
    "/images/gallery/painting-9.png",
    "/images/gallery/painting-10.png",
    "/images/gallery/painting-11.png",
    "/images/gallery/painting-12.png",
    "/images/gallery/painting-13.png",
    "/images/gallery/painting-14.png",
    "/images/gallery/painting-15.png",
  ]}
  className="h-[320px] min-w-0 flex-[1]"
  frontTitle="painting"
  frontImage="/images/painting.png"
  backTitle="Making art"
  cursorLabel="View work"
  disableOverlayClick={true}
enableImageOverlay={false}
  teaserLines={[
    "Colour spills before thought forms,",
    "hands move faster than doubt,",
    "and something honest appears.",
  ]}
  
/>

                {/* B: Cards 3 & 4 */}
                <div className="flex min-w-0 flex-[1] flex-col gap-12 h-full">
                  
                  <MusicCard className="h-[240px]"
  title="Brooklyn by The Midnight"
  artist="You're listening to"
  coverImage="/images/music-cover.png"
  audioSrc="/audio/song.mp3"
  backImage="/images/music-back.png"

/>
                  

<PoemCard
  {...artCardProps}
className="h-full"
/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
