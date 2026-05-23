"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bodySerif, caveat } from "@/lib/fonts";

const DEFAULT_RESUME_HREF =
  "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view?usp=sharing";

  const linkBase =
  "text-[18px] md:text-[20px] tracking-wide text-[#3d3832] transition-colors duration-300 hover:text-[#a8a29e]";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar({ resumeHref = DEFAULT_RESUME_HREF }: { resumeHref?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lastY = useRef(0)
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
  
      // show nav at top
      if (y < 10) {
        setVisible(true);
      } 
      // scrolling down → hide
      else if (delta > 2) {
        setVisible(false);
      } 
      // scrolling up → show
      else if (delta < -1) {
        setVisible(true);
      }
  
      lastY.current = y;
  
      // ACTIVE SECTION LOGIC (keep)
      const sections = ["hero", "projects", "personal", "contact"];
  
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
  
        const rect = el.getBoundingClientRect();
  
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActive(id);
          break;
        }
      }
    };
  
    lastY.current = window.scrollY;
  
    window.addEventListener("scroll", onScroll, { passive: true });
  
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
    
  

  useLayoutEffect(() => {
    if (!isHome) return;
  
    const scrollNow = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
  
      const el = document.getElementById(hash);
      if (!el) return;
  
      const y = el.getBoundingClientRect().top + window.pageYOffset;
  
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    };
  
    scrollNow();
  
    window.addEventListener("hashchange", scrollNow);
    return () => window.removeEventListener("hashchange", scrollNow);
  }, [isHome, pathname]);

  return (
    <nav
  style={{ overflowX: "clip" }}
    className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-out ${
      visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}
      aria-label="Primary"
    >
      {/* FULL WIDTH BLUR BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>

{/* gradient layer */}
<div
  className={`absolute inset-0 transition-all duration-300 ${
    visible
      ? "bg-gradient-to-b from-[#f2ebe3]/95 via-[#f2ebe3]/70 to-transparent"
      : "bg-gradient-to-b from-[#f2ebe3]/80 via-[#f2ebe3]/40 to-transparent"
  }`}
/>

{/* blur layer */}
<div
  className={`absolute inset-0 transition-all duration-300 ${
    visible ? "backdrop-blur-2xl" : "backdrop-blur-md"
  } [mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.65)_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,rgba(0,0,0,0.65)_45%,transparent_100%)]`}
/>

</div>

{/* CONTENT CONTAINER */}
<div className="relative mx-auto max-w-6xl px-6 py-5 md:py-6">
<div className="relative flex h-full items-center justify-center gap-x-4 md:gap-x-8 px-2 md:px-0">

        
          <Link
            href="/"
            scroll={false}
            className={`${bodySerif.className} ${linkBase} ${active === "projects" ? "text-[#a8a29e]" : ""}`}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToSection("projects");
              } else {
                sessionStorage.setItem("scroll-target", "projects");
              }
            }}
          >
            Works
          </Link>
          <Link
            href="/"
            scroll={false}
            className={`${bodySerif.className} ${linkBase} ${active === "personal" ? "text-[#a8a29e]" : ""}`}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToSection("personal");
              } else {
                sessionStorage.setItem("scroll-target", "personal");
              }
            }}
          >
            Gallery
          </Link>
          <Link
            href="/"
            scroll={false}
            className={`${caveat.className} text-[18px] md:text-[28px] leading-none transition-colors duration-300 ${
              active === "hero"
                ? "text-[#a8a29e]"
                : "text-[#3d3832] hover:text-[#a8a29e]"
            }`}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToSection("hero");
              } else {
                sessionStorage.setItem("scroll-target", "hero");
              }
            }}
          >
            SS
          </Link>
          <Link
            href="/"
            scroll={false}
            className={`${bodySerif.className} ${linkBase} ${active === "contact" ? "text-[#a8a29e]" : ""}`}
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollToSection("contact");
              } else {
                sessionStorage.setItem("scroll-target", "contact");
              }
            }}
          >
            Contact
          </Link>
          <Link
  href="/about"
  className={`${bodySerif.className} ${linkBase} ${active === "about" ? "text-[#a8a29e]" : ""}`}
>
  About
</Link>
</div>
        </div>
    </nav>
  );
}
