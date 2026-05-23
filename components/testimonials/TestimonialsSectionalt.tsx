"use client";

import { useMemo, useState } from "react";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";
import { Caveat, Crimson_Text, Jost, Instrument_Serif } from "next/font/google";

const handwrittenFont = Caveat({
  subsets: ["latin"],
  weight: ["400"],
});

const editorialSerif = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const headingFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400",],
});


export default function TestimonialsSectionalt() {
  
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
 className="relative h-[200vh] w-full bg-transparent"
  aria-label="Testimonials"
  data-cursor
  data-cursor-color="#FFFFFF"
>
  <div className="sticky top-0 flex h-screen w-full items-center">
    
  <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-24 md:py-32">
      
  <h2 className={`${instrumentSerif.className} text-center text-5xl md:text-[2.2rem] font-normal tracking-tight text-[#3d3832] max-w-3xl mx-auto`}>
        Before I designed interfaces, I designed spaces.
      </h2>
      

      <div className="mt-16 flex flex-col md:flex-row items-start justify-between gap-20 w-full">

  {/* LEFT — text */}
  <div className="md:w-[35%]">
    <p className={`${handwrittenFont.className} text-2xl md:text-2xl leading-relaxed text-neutral-700`}>
      I used to think about how light enters a room, how a wall guides movement,
      how a roof quietly shapes experience.
      <br /><br />
      That way of thinking never left. It just found a new medium.
    </p>
  </div>

  {/* RIGHT — image */}
  <div className="w-[full] md:w-[48%] lg:w-[48%] relative group">
    <Image
      src="/images/room-sketch.png"
      alt="Architectural sketch"
      width={600}
      height={400}
      className="rounded-xl transition duration-500 group-hover:opacity-0"
    />

    <Image
      src="/images/room-color.png"
      alt="Finished room"
      width={600}
      height={400}
      className="rounded-xl absolute inset-0 transition duration-500 opacity-0 group-hover:opacity-100"
    />
  </div>
  </div>
  </div>
</div>
</section>


  );
}
