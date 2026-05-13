"use client";

import { useMemo, useState } from "react";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import { testimonials } from "@/data/testimonials";
import { instrumentSerif } from "@/lib/fonts";

export function TestimonialsSection() {
  
  const items = useMemo(
    () =>
      testimonials.map((t) => ({
        quote: t.text,
        name: t.name,
        designation: t.company
          ? `${t.designation} · ${t.company}`
          : t.designation,
        src: t.image,
      })),
    []
  );

  return (
    <section
 className="relative h-[115vh] md:h-[200vh] w-full bg-transparent"
  aria-label="Testimonials"
  data-cursor
  data-cursor-color="#FFFFFF"
>
<div className="sticky top-0 flex h-screen w-full items-start md:items-center pt-16 md:pt-0">
    
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4 md:py-32">
      
      <h2
        className={`${instrumentSerif.className} text-center text-5xl md:text-[2.2rem] font-normal tracking-tight text-[#3d3832]`}
      >
        Kind words from collaborators
      </h2>

      <div className="relative mt-10 md:mt-20 h-[300px] md:h-[460px]">
  <CircularTestimonials testimonials={items} autoplay={false} />
</div>

    </div>

  </div>
</section>


  );
}
