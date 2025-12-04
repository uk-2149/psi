"use client";

import { motion, type Variants } from "framer-motion";

// Pure Tailwind + Framer Motion. Scroll-reveal word-by-word.

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

// Word-by-word reveal component
function RevealText({ text, className }: { text: string; className?: string }) {
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.03 },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: EASE },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20%" }}
      className={className}
    >
      {text.split(" ").map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block will-change-transform">
          {w}
          {i !== text.split(" ").length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function AboutMeSection() {
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section className="relative w-full overflow-hidden bg-bg text-neutral-100">
      {/* Subtle grid texture */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[24px_24px]"
      /> */}

      <div className="mx-auto w-[85vw] px-0 pt-0 pb-4 lg:pb-8 border-r border-neutral-800">
        {/* Header Row */}
        <div className="grid grid-cols-1 items-end md:grid-cols-12 text-center h-[35vh]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="md:col-span-7 border-r border-neutral-800 h-full flex items-end justify-center"
          >
            <h2 className="text-[2.7rem] md:text-[3.2rem] lg:text-[5.8rem] leading-[0.95] font-bold tracking-tighter text-neutral-100 py-1">
              <span className="italic text-neutral-300">WHY</span> PARTNER
              <br />
              <span className="italic">WITH</span> ME?
            </h2>
          </motion.div>

          {/* Divider + hashmarks */}
          <div className="md:col-span-5 flex w-full items-center gap-4 px-2 justify-end">
            <div className="hidden h-px bg-neutral-300 md:block w-50" />
            <div className="text-[1rem] tracking-widest text-textPrimary select-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i}>/</span>
              ))}
              <span className="ml-3 text-[0.5rem] align-middle">ABT_ME</span>
            </div>
          </div>
        </div>

        {/* Content Panel (only short about text) */}
        <div className="mt-0">
          <div className="relative p-px">
            <div className="p-6 sm:px-20 sm:py-15 border-l border-t border-b border-neutral-800 flex items-center justify-center">
              <RevealText
                text={
                  "I love building things that feel smooth, look clean, and work fast. I pick up new stuff quickly, experiment a lot, and ship even faster. I’m all about solving problems, breaking things (sometimes on purpose), and learning from the chaos."
                }
                className="max-w-4xl text-2xl lg:text-4xl leading-tight text-neutral-200 sm:text-xl mask-[linear-gradient(180deg,rgba(0,0,0,1),rgba(0,0,0,0.75)_75%,transparent)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}