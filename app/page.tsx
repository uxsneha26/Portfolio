"use client";

import { useCallback, useState, useEffect } from "react";
import { Caveat, Crimson_Text, Jost, Instrument_Serif } from "next/font/google";
import { ArchitectureLearningSection } from "@/components/architecture-learning/ArchitectureLearningSection";
import { PersonalSection } from "@/components/personal/PersonalSection";
import { ContactSection } from "@/components/ContactSection";
import { SelectedProjectsSection } from "@/components/selected-projects/SelectedProjectsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import TestimonialsSectionalt from "@/components/testimonials/TestimonialsSectionalt";
import { Navbar } from "@/components/Navbar";


  const handwrittenFont = Caveat({
    subsets: ["latin"],
    weight: ["400"],
  });

  const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400",],
  });

  const headingFont = Jost({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
  });

const editorialSerif = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const SKETCH_SRC = "/hero-portrait-sketch.png";
const COLOR_SRC = "/hero-portrait-color.png";

function InlineHeadingVisual({
  className,
  label,
  defaultSrc,
  hoverSrc,
}: {
  className?: string
  label: string
  defaultSrc: string
  hoverSrc: string
}) {
  return (
    <span
      className={`group relative inline-flex h-12 w-12 shrink-0 align-middle items-center justify-center md:h-14 md:w-14 ${className ?? ""}`}
    >
      {/* TAG */}
      <span className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#EADCD4] px-5 py-2 text-[14px] font-medium tracking-[0.08em] text-neutral-800 opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 delay-75 ease-out group-hover:-translate-y-1 group-hover:opacity-100">
        {label}
      </span>

      {/* IMAGE CONTAINER */}
      <span className="relative h-full w-full overflow-hidden rounded-lg shadow-sm transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-3">
        
        {/* DEFAULT IMAGE */}
        <img
          src={defaultSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover border-none outline-none transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />

        {/* HOVER IMAGE */}
        <img
          src={hoverSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover border-none outline-none opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        />
      </span>
    </span>
  )
}

function InteractivePortrait() {
  const [cursor, setCursor] = useState({ x: 110, y: 110 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({
      x: rect.width / 2,
      y: rect.height / 2,
    });
  }, []);

  return (
    <div className="flex w-full flex-col items-start md:w-auto md:items-start">
      <p
        className={`${handwrittenFont.className} relative z-10 mb-1 text-2xl text-neutral-600 md:-mb-2 md:mb-0`}
      >
        Hi, I am Sneha
      </p>

      <div
      data-cursor="hidden"
        className="relative group mt-3 h-[220px] w-[220px] shrink-0 overflow-hidden rounded-xl hover:cursor-none md:mt-4 md:h-[280px] md:w-[280px]"
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
      >
        <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.08]">
  
  <img
    src={SKETCH_SRC}
    alt=""
    style={{ backfaceVisibility: "hidden" }}
    className="absolute inset-0 h-full w-full object-cover border-none outline-none opacity-100 transition-opacity duration-500 ease-in-out will-change-opacity group-hover:opacity-0"
  />

  <img
    src={COLOR_SRC}
    alt=""
    style={{ backfaceVisibility: "hidden" }}
    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out will-change-opacity group-hover:opacity-100"
  />

</div>

        <div
          className="pointer-events-none absolute z-20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className={`${instrumentSerif.className} pointer-events-none flex items-center justify-center rounded-full bg-[#f4c7c3] px-4 py-2 text-[16px] tracking-[0.04em] text-center text-xs text-neutral-800 transition-transform duration-300 ease-out group-hover:scale-100`}>
            Glad you're here
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const target = sessionStorage.getItem("scroll-target");

    if (target) {
      sessionStorage.removeItem("scroll-target");

      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  return (
    <main
      className="bg-[#f2ebe3] bg-[radial-gradient(ellipse_85%_65%_at_15%_10%,rgba(232,223,212,0.55)_0%,transparent_52%),radial-gradient(ellipse_70%_50%_at_90%_85%,rgba(221,212,200,0.35)_0%,transparent_48%)]"
      data-cursor
      data-cursor-color="#8C6A6A"
    >
      
      <div
  id="hero"
  className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-16 px-6 pt-16 pb-12 md:flex-row md:items-center md:pt-20 md:pb-16"
>
      <InteractivePortrait />

        <div className="w-full max-w-xl shrink-0 text-left md:flex-1 md:min-w-0">
          <div className="space-y-10 md:space-y-2">
          
              <p className={`${instrumentSerif.className} text-xs leading-relaxed tracking-[0.1em] uppercase text-[#BEA3A0] md:text-6xl lg:text-2xl`}>
              Product Designer
              </p>
              <p className={`${handwrittenFont.className} text-balance text-5xl font-normal leading-tight tracking-tight text-neutral-800 md:text-8xl lg:text-2xl`}>
              whose work is shaped by
              </p>
            <h1
              className={`${instrumentSerif.className} text-balance text-5xl font-normal leading-tight tracking-relaxed text-neutral-800 md:text-6xl lg:text-6xl`}
            >
              <span className="block">
    spatial structure{" "}
    <InlineHeadingVisual
    label="Architect"
    defaultSrc="/arch-default.png"
    hoverSrc="/arch-hover.png"
    className="ml-2 align-baseline rotate-[-2deg]"
  />
  </span> and quiet intent of art{" "}
  <InlineHeadingVisual
    label="Artist"
    defaultSrc="/art-default.png"
    hoverSrc="/art-hover.png"
    className="ml-2 align-baseline rotate-[2deg]"
  />
            
            </h1>
            <br />
            <p
              className={`${instrumentSerif.className} max-w-xl text-base font-normal leading-relaxed text-neutral-600 md:text-lg`}
            >
              A quiet focus on rhythm, texture, and the narratives people
              carry into every interaction.
            </p>
          </div>
        </div>
      </div>

      <section id="projects">
      <SelectedProjectsSection />
      </section>


      <TestimonialsSection />
      <TestimonialsSectionalt />
      <ArchitectureLearningSection />

      <section id="personal">
      <PersonalSection />
      </section>

      <section id="contact">
      <ContactSection />
      </section>

      
    </main>
  );
}
