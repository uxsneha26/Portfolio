"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { caveat, instrumentSerif } from "@/lib/fonts";
import {
  HotspotConnectorOverlay,
  type HotspotAnchorPair,
} from "./HotspotConnectorOverlay";
import { Hotspot } from "./Hotspot";
import { ARCHITECTURE_HOTSPOTS } from "./hotspots";

const IMAGE_PLACEHOLDER = "/architecture-plan.png";

export function ArchitectureLearningSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [imageContainer, setImageContainer] = useState<HTMLDivElement | null>(
    null
  );
  const [anchors, setAnchors] = useState<Record<string, HotspotAnchorPair>>({});

  const [step, setStep] = useState(-1);
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const onAnchorsChange = useCallback(
    (id: string, pair: HotspotAnchorPair) => {
      setAnchors((prev) => {
        const next = { ...prev };
        if (!pair.dot && !pair.card) {
          delete next[id];
        } else {
          next[id] = pair;
        }
        return next;
      });
    },
    []
  );

  // 🔁 Scroll → step (FIXED even distribution)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
  
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
  
      // 🧠 stable progress across section scroll
      const raw = (vh - rect.top) / (vh + rect.height);
      const progress = Math.min(Math.max(raw, 0), 1);
  
      const total = ARCHITECTURE_HOTSPOTS.length;
  
      // 🎯 small entry pause (prevents first card stuck)
      const startDelay = 0.15;
  
      if (progress < startDelay) {
        setStep(-1);
        return;
      }
  
      const effectiveProgress = (progress - startDelay) / (1 - startDelay);

    const newStep = Math.min(
      total - 1,
      Math.floor(effectiveProgress * total * 1.5)
    );
  
    
  
      setStep((prev) => (prev === newStep ? prev : newStep));
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  
  
  // 🔁 Step → stacked cards (UNCHANGED)
  useEffect(() => {
    const ids = ARCHITECTURE_HOTSPOTS.map((h) => h.id);
  
    if (step < 0) {
      setActiveIds([]);
    } else {
      setActiveIds(ids.slice(0, step + 1));
    }
  }, [step]);


  return (
    <section
      ref={sectionRef}
      id="architecture-learning-section"
      className="relative z-30 -mt-[80vh] md:-mt-[80vh] lg:-mt-[90vh] w-full"
    >
      <div className="relative h-[760vh] md:h-[620vh] w-full">

        <div
          className="sticky top-0 flex h-screen w-full flex-col"
          style={{
            backgroundImage: "url('/your-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative flex min-h-0 flex-1 flex-col px-6 pb-8 pt-10 md:px-10 md:pb-12 md:pt-14">

            {/* Header */}
            <header className="relative z-10 mx-auto w-full max-w-4xl text-center">
              <h2
                className={`${instrumentSerif.className} text-3xl md:text-4xl lg:text-[2.75rem] text-[#2f2b25]`}
              >
                what i learnt from architecture
              </h2>

              <p className={`${caveat.className} mt-3 text-xl text-[#5c564c] md:text-2xl`}>
                which helps me everyday design experiences
              </p>
            </header>

            {/* Image + Hotspots */}
<div
  ref={setImageContainer}
  className="relative mx-auto mt-6 w-full max-w-[900px] flex-1"
>

  {/* DESKTOP ONLY */}
  <div className="hidden md:block">
    <HotspotConnectorOverlay
      container={imageContainer}
      anchors={anchors}
      activeIds={activeIds}
    />
  </div>

  <img
    src={IMAGE_PLACEHOLDER}
    alt=""
    className="
      relative
      z-0
      object-contain

      w-[135%]
      max-w-none
      ml-[-18%]

      md:w-full
      md:max-w-full
      md:ml-0
    "
  />

  {/* DESKTOP HOTSPOTS ONLY */}
  <div className="hidden md:block">
    {ARCHITECTURE_HOTSPOTS.map((h, index) => (
      <Hotspot
        key={h.id}
        hotspot={h}
        isOpen={activeIds.includes(h.id)}
        onAnchorsChange={onAnchorsChange}
      />
    ))}
  </div>

  {/* MOBILE STACKED CARDS */}
<div className="absolute inset-0 md:hidden pointer-events-none z-30">

  <div className="relative h-full w-full">

  {ARCHITECTURE_HOTSPOTS.map((h, index) => {
  const isVisible = index <= step;

  return (
        <div
          key={h.id}
          className="
            sticky top-[8vh]
            mx-auto
            mb-[-60px]
            w-[88%]

            rounded-xl
            border border-[#e6ded2]
            min-h-[180px]
            bg-[#f2ebe3]
            p-5
            shadow-[0_12px_40px_rgba(0,0,0,0.08)]

            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

            will-change-transform
          "
          style={{
            zIndex: 100 + index,
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0px)"
              : "translateY(80px)",
          }}
        >
          <p
            className={`${instrumentSerif.className} text-[24px] text-[#2f2b25]`}
          >
            {h.header}
          </p>

          <p
            className={`${caveat.className} mt-3 text-[18px] leading-[1.7] text-[#5c564c]`}
          >
            {h.body}
          </p>
        </div>
      );
    })}
</div>
</div>
</div>

          </div>
        </div>

      </div>
    </section>
  );
}