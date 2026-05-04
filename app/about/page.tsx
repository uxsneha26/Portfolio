"use client";

import { useEffect } from "react";
import { bodySerif, caveat, instrumentSerif, labelSans } from "@/lib/fonts";

const pageBg =
  "bg-[#f2ebe3] bg-[radial-gradient(ellipse_85%_65%_at_15%_10%,rgba(232,223,212,0.55)_0%,transparent_52%),radial-gradient(ellipse_70%_50%_at_90%_85%,rgba(221,212,200,0.35)_0%,transparent_48%)]";

const h1Class = `${instrumentSerif.className} tracking-[0.06em] text-neutral-800`;
const h2Class = `${instrumentSerif.className} tracking-[0.08em] text-neutral-800`;
const h3Class = `${instrumentSerif.className} tracking-[0.04em] text-neutral-800`;
const metaClass = `${labelSans.className} text-xs font-medium uppercase tracking-[0.14em] text-neutral-500`;
const bodyClass = `${bodySerif.className} text-neutral-700`;
const labelClass = `${labelSans.className} text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500`;

const ctaClass = `${instrumentSerif.className} no-print inline-flex items-center justify-center rounded-full border border-neutral-300/80 bg-white/70 px-8 py-3 text-base text-neutral-800 shadow-sm backdrop-blur-sm transition duration-300 ease-out hover:scale-[1.02] hover:border-[#BEA3A0]/50 hover:bg-[#EADCD4]/45`;

function DownloadResumeButton() {
  return (
    <a
  href="/resume/Sneha_Sharma_Resume.pdf"
  download
  className={`${ctaClass} hover:scale-[1.02] transition-all duration-300`}
>
  Download Resume
</a>
  );
}

const projectCardClass =
  "rounded-2xl border border-neutral-200/50 bg-[#e8dfd6]/55 p-4 md:p-5 transition-all duration-300 ease-out hover:scale-[1.015] hover:border-[#BEA3A0]/40 hover:shadow-lg";

function ExperienceProjectCard({
  title,
  tags,
  description,
  revealClassName = "about-reveal about-delay-2",
}: {
  title: string;
  tags: string[];
  description: string;
  revealClassName?: string;
}) {
  return (
    <div className={`${projectCardClass} ${revealClassName}`}>
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h4
          className={`${instrumentSerif.className} text-lg font-semibold tracking-[0.04em] text-neutral-800 md:text-xl`}
        >
          {title}
        </h4>
        <ul className="flex flex-wrap gap-1.5 sm:max-w-[58%] sm:justify-end">
          {tags.map((t) => (
            <li
              key={t}
              className={`${labelSans.className} rounded-full bg-white/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-neutral-500`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
      <p className={`${bodyClass} text-[0.95rem] leading-relaxed text-neutral-700 md:text-base`}>
        {description}
      </p>
    </div>
  );
}

function ArchivePostCard({
  title,
  description,
  image,
  link,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
}) {
  return (
    <article
      className={`${projectCardClass} flex flex-col gap-5 md:flex-row md:items-stretch md:gap-6 hover:scale-[1.01] hover:shadow-md`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className={`${h3Class} text-xl font-normal leading-snug md:text-2xl`}>{title}</h3>
        <p className={`${bodyClass} mt-3 text-[0.95rem] leading-relaxed md:text-base`}>{description}</p>
        <p className={`${metaClass} mt-4 normal-case tracking-[0.08em] text-neutral-500`}> May 1, 2026</p>
        <a
  href={link}
  target="_blank"
  rel="noopener noreferrer"
          className={`${labelSans.className} mt-5 inline-flex w-fit text-sm font-medium tracking-wide text-neutral-700 transition-all duration-300 ease-out hover:underline hover:opacity-80`}
        >
          Read on Medium →
        </a>
      </div>
      <div className="w-full md:w-[36%]">
        {image ? (
          <img
            src={image}
            alt={`${title} cover image`}
            className="h-44 w-full rounded-xl border border-neutral-200/50 bg-[#ece4db]/65 object-cover md:h-full md:min-h-[10.5rem]"
          />
        ) : (
          <div
            role="img"
            aria-label={`${title} image placeholder`}
            className="h-44 w-full rounded-xl border border-neutral-200/50 bg-[#ece4db]/65 md:h-full md:min-h-[10.5rem]"
          />
        )}
      </div>
    </article>
  );
}

export default function AboutPage() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".about-reveal");
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className={`${pageBg} min-h-screen px-6 py-20 pb-32 md:px-10 md:py-28`}
      data-cursor
      data-cursor-color="#8C6A6A"
    >
      <div className="about-reveal-parent mx-auto flex max-w-5xl flex-col">
        {/* SECTION 1 — HERO (unchanged) */}
        <section className="about-reveal about-delay-0 mb-8 md:mb-10">
          <h1 className={`${h1Class} mb-6 text-4xl font-normal text-center leading-tight md:text-5xl`}>About me</h1>
          <p
            className={`${caveat.className} mx-auto mb-10 max-w-lg text-2xl leading-snug text-neutral-600 md:text-3xl`}
          >
            A designer shaped by spatial thinking and quiet intent.
          </p>
        </section>

        {/* SECTION 2 — STORY (web only, editorial 2-col + pull quote) */}
        <section
          className="no-print about-reveal about-delay-60ms mb-20 md:mb-28"
          aria-label="Story"
        >
          <div className="mx-auto max-w-5xl border-b border-neutral-300/35 pb-20 md:pb-28">
            <div className="grid gap-12 md:grid-cols-2 md:gap-x-14 md:gap-y-14">
              <div
                className={`${bodyClass} space-y-10 text-lg leading-loose md:text-[1.05rem] md:leading-loose [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:-mt-0.5 [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:font-serif [&>p:first-child]:first-letter:text-[2.85rem] [&>p:first-child]:first-letter:leading-[0.85] [&>p:first-child]:first-letter:text-[#5c534c]`}
              >
                <p>
                I spent my childhood in the colourful (mostly Pink) city of Jaipur. 
                As the city would seem on the outside, so it was from within - it drew me
                toward a need to express myself without saying a lot and inadvertently opened
                doors of creative aspirations in my over imaginative mind. 
                Thus, brushes and quills became my constant companions.
                </p>
                <p>
                Every sight of the city was a frame etched in my memory which I believe got me 
                to pursue a career path that may land me a role where I could contribute to 
                eventually designing cities myself - Architecture.
                </p>
                <p>
                Throughout my journey of a 5 year Degree course and 4 years of field experience,
                I realised two things - one - I am too sensitive in my design approach that was
                looked down upon by most people I worked with who didn’t value sustainable building
                practices (mud bricks, living roofs and such), two - I was too organised in my
                execution to have anyone appreciate my obsession with it.
                </p>
                <p>
                Well ... off to bigger and scarier adventures! I now empathize with my sensitivity
                and strategize due to my OCD. My paintings and poems too have taken a profound turn
                as now I am less stressed about the above traits becoming a liability (pun intended) ;)
                </p>
              </div>

              <div className={`${bodyClass} space-y-10 text-lg leading-loose md:pt-16 md:text-[1.05rem] md:leading-loose`}>
              <blockquote
                className={`${instrumentSerif.className} relative z-10 -my-4 text-center md:col-span-2 md:-my-10`}
              >
                <p className="mx-auto max-w-[22rem] text-balance text-3xl font-light italic leading-snug text-[#6b5f56] md:max-w-[26rem] md:text-4xl md:leading-snug">
                  &ldquo;I am a designer skilled at creating meaningful experiences in digital as well
                  as real world.&rdquo;
                </p>
              </blockquote>
              <div className={`${bodyClass} space-y-10 text-lg leading-loose md:pt-16 md:text-[1.05rem] md:leading-loose`}></div>
                <p>
                My work involves problem solving for the larger part which I go about by having design
                thinking included in every step of the journey, not because it’s supposed to be a standard
                practice but also because that is how I have taught myself to look for creative solutions
                that tell a story people can relate to.
                </p>
                <p>
                I ask myself - “How can I contribute to making this person’s lives easier?” or “How can 
                I make them realise they need this but might not know it?” - while I ideate.
                </p>
                <p>
                From clear communication during Steer Co presentations, to thoroughly organised design
                process, I believe I have figured all (or enough) out to move to a new milestone in my career.
                </p>
                <p>
                My art has evolved to more tactile mediums of clay and resin, as I am more confident
                to allow myself to explore and express freely. My poems are now written mostly in Hindi
                as it makes me be more aware.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-reveal w-full max-w-3xl mx-auto about-delay-100ms mb-20 md:mb-24" aria-label="From my archive">
          <h2 className={`${h2Class} mb-8 text-2xl font-normal md:text-3xl`}>From my archive</h2>
          <ArchivePostCard
            title="Before We Know, We Feel: On Spatial Intelligence in Experience Design"
            description="A reflection on how architecture taught me to see digital spaces as places people live in, even briefly."
            image="images/blog-cover.png"
            link="https://medium.com/@design.snehasharma/before-we-know-we-feel-on-spatial-intelligence-in-experience-design-945d5a2a4198"
          />
        </section>

        <div className="mx-auto my-4 md:my-8 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent" />

        {/* Resume (excludes story; section 1 remains on screen before this block) */}
        <div
          id="resume"
          className="resume-page about-reveal mb-16 md:mb-20 about-delay-140ms mx-auto w-full max-w-3xl"
        >
          {/* SECTION 3 — IDENTITY */}
<section className="about-reveal about-delay-180ms mb-16 md:mb-20">
  <div className="relative flex flex-col md:flex-row items-start gap-6 md:gap-7">

    {/* TEXT BLOCK */}
    <div className="min-w-0 flex-1 text-left space-y-2">
      <p className={`${metaClass} mb-3`}>Profile</p>

      <h2 className={`${h2Class} mb-2 text-3xl font-normal tracking-[0.05em] md:text-4xl`}>
        Sneha Sharma
      </h2>

      <p className={`${labelSans.className} mb-6 text-sm font-medium tracking-wide text-neutral-600`}>
        Product Designer
      </p>

      <p className={`${labelClass} mb-6 text-neutral-500`}>
        Lollypop Design Studio
      </p>

      <p className={`${bodyClass} max-w-xl text-lg leading-loose text-neutral-700`}>
        I design systems and experiences shaped by spatial thinking, structure and human
        behavior.
      </p>
    </div>

    {/* IMAGE */}
    <img
  src="/images/profile.jpeg"   // 👈 your image path
  alt="Sneha Sharma"
  className="mx-auto md:mx-0
  h-28 w-28 md:h-44 md:w-44
  rounded-full object-cover
  border border-neutral-200/80 shadow-inner"
/>
</div>
</section>

<div className="flex justify-center mb-20 md:mb-24">
            <DownloadResumeButton />
          </div>

          {/* SECTION 4 — EXPERIENCE (project-oriented) */}
          <section className="about-reveal about-delay-220ms space-y-24 mb-20 md:mb-24">
          <h2 className={`${h2Class} mb-8 text-2xl font-normal md:text-3xl`}>
            Experience
          </h2>
            <article className="mb-20 md:mb-24">
              <header>
                <h3 className={`${h3Class} text-xl font-normal md:text-2xl`}>Lollypop Design Studio</h3>
                <p className={`${labelSans.className} mt-2 text-sm font-medium text-neutral-600`}>
                  Associate Senior UX Designer
                </p>
                <p className={`${labelSans.className} mt-1 text-xs tracking-wide text-neutral-500`}>
                  Aug 2023 – Present
                </p>
              </header>
              <div className="my-8 h-px w-full bg-neutral-300/40" aria-hidden />
              <p className={`${metaClass} mb-6 text-left`}>Selected Work within Experience</p>
              <div className="flex flex-col gap-6 md:gap-8">
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-260ms"
                  title="Green SM"
                  tags={["User Research", "Competitive Analysis", "Insight Mapping"]}
                  description="Conducted primary research across Bangalore and Chennai, conducting 30+ in-depth interviews to uncover behavioral patterns in ride-hailing usage. Benchmarked 6 competitor platforms end-to-end and translated fragmented user concerns into structured insights, informing actionable design directions for improved decision-making."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-280ms"
                  title="Zivame"
                  tags={["E-commerce", "Personalization", "Dashboard Design"]}
                  description="Designed an insights-driven platform with custom report generation and personalized dashboards to support decision-making."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-300ms"
                  title="ACT Smart WiFi"
                  tags={["Product Design", "Systems Thinking", "UX Strategy"]}
                  description="Led the design of a smart WiFi ecosystem enabling users to manage devices, usage, and network security seamlessly. Simplified complex backend systems into intuitive user controls, improving accessibility and reducing friction in everyday network interactions."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-320ms"
                  title="Sleep Number"
                  tags={["Proof of Concept", "Systems Thinking", "Product Strategy"]}
                  description="Designed a connected experience integrating IoT devices to create a personalized sleep ecosystem. Structured interactions around behavioral patterns and real-time data, enabling users to understand and improve their sleep quality through tailored insights and adaptive recommendations."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-340ms"
                  title="Surya Lighting"
                  tags={["Proof of Concept", "Digital Experience", "Conversion Design"]}
                  description="Designed a connected experience integrating IoT devices to create a personalized sleep ecosystem. Structured interactions around behavioral patterns and real-time data, enabling users to understand and improve their sleep quality through tailored insights and adaptive recommendations."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-360ms"
                  title="Zinnov (Decision Intelligence Platform)"
                  tags={["B2B Platform", "Usability Testing", "Business Strategy"]}
                  description="Designed a decision intelligence platform for global capability leaders, structuring complex research data into intuitive discovery and validation flows. Improved information architecture and navigation, enabling faster synthesis of insights and more confident decision-making."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-380ms"
                  title="Leading Cement Manufacturing & Supply Chain"
                  tags={["Enterprise UX", "Platform Thinking"]}
                  description="Led experience design for a unified enterprise platform consolidating 9 disparate applications across sales, finance, and supply chain. Established scalable interaction patterns and workflows, reducing fragmentation and aligning cross-functional business operations."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-400ms"
                  title="Peak XV (Sequoia Capital)"
                  tags={["Proof of Concept", "Community Platforms"]}
                  description="Designed a proof-of-concept to strengthen community-driven learning for early-stage founders. Structured discovery and engagement flows to simplify access to insights, peer knowledge, and curated content. Translated abstract ecosystem needs into a scalable product direction that improves participation and knowledge exchange."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-420ms"
                  title="Mordor Intelligence"
                  tags={["E-commerce", "Personalization"]}
                  description="Designed a research-driven e-commerce platform with custom reporting and personalized dashboards. Structured content and interactions to support efficient data consumption, enabling users to move from discovery to insight generation with reduced cognitive load."
                />
              </div>
            </article>

            <article>
              <header>
                <h3 className={`${h3Class} text-xl font-normal md:text-2xl`}>Studio Ardete</h3>
                <p className={`${labelSans.className} mt-2 text-sm font-medium text-neutral-600`}>
                  Architect
                </p>
                <p className={`${labelSans.className} mt-1 text-xs tracking-wide text-neutral-500`}>
                  Nov 2021 – Jul 2023
                </p>
              </header>
              <div className="my-8 h-px w-full bg-neutral-300/40" aria-hidden />
              <p className={`${metaClass} mb-6 text-left`}>Selected Work within Experience</p>
              <div className="flex flex-col gap-6 md:gap-8">
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-440ms"
                  title="Purwa Village"
                  tags={["Spatial Design", "Sustainability", "Research"]}
                  description="Led design and on-ground execution for a community development project focused on biodiversity, organic farming, and natural building practices. Managed stakeholder coordination and translated research insights into implementable spatial strategies."
                />
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-460ms"
                  title="Design Communication & Publications"
                  tags={["Graphic Design", "Content Writing"]}
                  description="Developed architectural representation and storytelling assets for publications across platforms like ArchDaily. Bridged design thinking with communication, crafting narratives that translated complex ideas into accessible visual formats."
                />
              </div>
            </article>

            <article>
              <header>
                <h3 className={`${h3Class} text-xl font-normal md:text-2xl`}>Hunnarshala</h3>
                <p className={`${labelSans.className} mt-2 text-sm font-medium text-neutral-600`}>
                  Fellow Architect & Researcher
                </p>
                <p className={`${labelSans.className} mt-1 text-xs tracking-wide text-neutral-500`}>
                  May 2021 – Sep 2021
                </p>
              </header>
              <div className="my-8 h-px w-full bg-neutral-300/40" aria-hidden />
              <p className={`${metaClass} mb-6 text-left`}>Community Development Centre</p>
              <div className="flex flex-col gap-6 md:gap-8">
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-480ms"
                  title="Purwa Village"
                  tags={["Field Research", "Sustainability", "Research", "Community Development"]}
                  description="Collaborated on the design of a community and skill development centre in Bhuj. Conducted field research across 6 villages, analyzing construction practices and lifestyle patterns to inform sustainable design interventions."
                />
              </div>
            </article>

            <article>
              <header>
                <h3 className={`${h3Class} text-xl font-normal md:text-2xl`}>FM Garden Infrastructure</h3>
                <p className={`${labelSans.className} mt-2 text-sm font-medium text-neutral-600`}>
                  Architect
                </p>
                <p className={`${labelSans.className} mt-1 text-xs tracking-wide text-neutral-500`}>
                  Feb 2021 – July 2021
                </p>
              </header>
              <div className="my-8 h-px w-full bg-neutral-300/40" aria-hidden />
              <div className="flex flex-col gap-6 md:gap-8">
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-500ms"
                  title="FM Garden City"
                  tags={["Urban Planning", "Design Execution", "Site Coordination"]}
                  description="Designed residential units and contributed to township planning, including villas, apartments, and market spaces. Worked across concept development, execution drawings, and on-site coordination."
                />
              </div>
            </article>

            <article>
              <header>
                <h3 className={`${h3Class} text-xl font-normal md:text-2xl`}>MO:FA | SD Architects | The Traditionals | Hafeez Contractor</h3>
                <p className={`${labelSans.className} mt-2 text-sm font-medium text-neutral-600`}>
                  Junior Architect
                </p>
                <p className={`${labelSans.className} mt-1 text-xs tracking-wide text-neutral-500`}>
                  July 20019 – Feb 2021
                </p>
              </header>
              <div className="my-8 h-px w-full bg-neutral-300/40" aria-hidden />
              <div className="flex flex-col gap-6 md:gap-8">
                <ExperienceProjectCard
                  revealClassName="about-reveal about-delay-520ms"
                  title="Residential, Hospitality, Commercial & Institutional Projects"
                  tags={["Design", "Design Execution", "Interior"]}
                  description="Worked across architectural and interior design firms contributing to large-scale projects, including institutional and commercial developments. Gained experience in execution, stakeholder coordination, and presentation design."
                />
              </div>
            </article>


          </section>

          {/* SECTION 5 — EDUCATION */}
          <section className="about-reveal about-delay-540ms mb-16 md:mb-20">
            <h2 className={`${h2Class} mb-12 text-2xl font-normal md:text-3xl`}>Education</h2>
            <dl className="space-y-3">
              {[
                ["Interaction Design Certification", "IISc Bangalore"],
                ["UX Design Certification", "Carvaan"],
                ["B.Arch", "Aayojan School of Architecture, Jaipur"],
              ].map(([title, place]) => (
                <div key={title}>
                  <dt className={`${bodySerif.className} text-lg font-semibold text-neutral-800`}>
                    {title}
                  </dt>
                  <dd className={`${labelSans.className} mt-1 text-sm text-neutral-500`}>{place}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* SECTION 6 — CORE CAPABILITIES */}
          <section className="about-reveal space-y-4 about-delay-560ms mb-20 md:mb-24">
            <h2 className={`${h2Class} mb-10 text-2xl font-normal md:text-3xl`}>Core Capabilities</h2>
            <ul
              className={`${labelSans.className} flex flex-wrap gap-x-2 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-neutral-600`}
            >
              {[
                "UX Strategy",
                "Research & Synthesis",
                "Design Systems",
                "Business Strategy",
                "UX Writing",
                "Systems Thinking",
                "Conversion Design",
                "User Research",
                "Competitive Analysis",
                "Insight Mapping",
              ].map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-neutral-300/60 bg-white/50 px-3 py-2 text-[11px] tracking-[0.14em] text-neutral-600 backdrop-blur-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <ul
              className={`${labelSans.className} flex flex-wrap gap-x-2 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-neutral-700`}
            >
              {[
                "Spatial Thinking",
                "Critical Thinking",
                "Storytelling",
                "Decision Facilitation",
                "Structured Communication",
                "Stakeholder Coordination",
                "Expectation Management",
                "Proactiveness",
                "Designed-Up Leadership",
              ].map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#F3EAEA] border border-[#D4C4B8] px-3 py-2 text-[11px] tracking-[0.14em] text-neutral-600 backdrop-blur-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          {/* Bottom CTA */}
            <section className="about-reveal about-delay-580ms border-t border-neutral-300/30 pt-12 text-center md:pt-16">
            <p
              className={`${instrumentSerif.className} mx-auto mb-10 max-w-md text-lg leading-loose text-neutral-700 md:text-xl`}
            >
              If something here resonated, take a closer look.
            </p>
            <DownloadResumeButton />
          </section>
        </div>
      </div>
    </main>
  );
}
