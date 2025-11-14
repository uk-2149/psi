"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useInView,
} from "framer-motion";

const techStacks = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "Docker",
  "Socket.io",
  "Figma",
  "Tailwind CSS",
  "Rust",
  "Python",
  "Canva",
];

/* ------------------- SEAMLESS MARQUEE ------------------- */
const Marquee = ({
  children,
  speed,
  direction = "left",
  className,
}: {
  children: React.ReactNode;
  speed: number;
  direction?: "left" | "right";
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) setWidth(ref.current.scrollWidth / 2);
  }, [children]);

  useAnimationFrame((_, delta) => {
    if (paused || !width) return;
    const move = (speed * delta) / 1000;
    const dir = direction === "left" ? -1 : 1;
    let next = x.get() + move * dir;

    if (direction === "left" && next <= -width) next += width;
    if (direction === "right" && next >= 0) next -= width;

    x.set(next);
  });

  const xTransform = useTransform(x, (v) => `${v}px`);

  return (
    <div
      className={`overflow-hidden relative ${className || ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* top/bottom border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

      <motion.div
        ref={ref}
        style={{ x: xTransform }}
        className="flex whitespace-nowrap py-2"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

/* ------------------- BRAND ITEM ------------------- */
const Tech = ({
  name,
  isHovered,
  setHovered,
}: {
  name: string;
  isHovered: boolean;
  setHovered: (name: string | null) => void;
}) => {
  const hovered = isHovered;

  return (
    <motion.div
      className="relative mx-6 md:mx-12 inline-block cursor-pointer"
      onMouseEnter={() => setHovered(name)}
      onMouseLeave={() => setHovered(null)}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: hovered ? -6 : 0,
        opacity: hovered ? 1 : 0.4,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <motion.span
        className="block text-2xl md:text-4xl font-bold tracking-tight"
        animate={{
          color: hovered ? "hsl(50, 100%, 50%)" : "#e5e5e5",
        }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.span>

      {/* <AnimatePresence>
        {hovered && (
          <>
            <motion.div
              className="absolute left-0 top-0 h-full w-px bg-cyan-400"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "top" }}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-px bg-cyan-400"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "top" }}
            />
          </>
        )}
      </AnimatePresence> */}
    </motion.div>
  );
};

/* ------------------- MAIN SECTION ------------------- */
interface TechBarsProps {
    opp: boolean;
}
export default function TechBars({ opp }: TechBarsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const lineContent = (
    <div className="flex items-center gap-6 md:gap-8 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500 border-t border-b border-gray-500">
      <span>//////////</span>
      <span>TLC_CNU4_16297</span>
      <span>////////////////////</span>
      <span>TECH STACK & TOOLS</span>
      <span>////////////////////</span>
      <span>TLC_CNU4_16297</span>
      <span>//////////</span>
    </div>
  );

  return (
    <section
      ref={ref}
      className="relative md:min-h-screen bg-bg overflow-hidden flex flex-col justify-center py-16 md:py-24"
    >
      {/* Grain effect */}
      <div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {/* TOP BAR */}
        {inView && (
          <Marquee speed={45} direction={opp ? "right" : "left"}>
            {lineContent}
            {lineContent}
          </Marquee>
        )}

        {/* MIDDLE – TECH STACK */}
        {inView && (
          <Marquee speed={28} direction={opp ? "right" : "left"} className="py-6">
            <div className="flex items-center">
              {techStacks.concat(techStacks).map((tech, i) => (
                <Tech
                  key={`${tech}-${i}`}
                  name={tech}
                  isHovered={hoveredTech === tech}
                  setHovered={setHoveredTech}
                />
              ))}
            </div>
          </Marquee>
        )}

        {/* BOTTOM BAR */}
        {inView && (
          <Marquee speed={45} direction={opp ? "left" : "right"}>
            {lineContent}
            {lineContent}
          </Marquee>
        )}
      </div>

      {/* Subtle hover glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700"
        whileHover={{ opacity: 0.15 }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(103,232,249,0.25) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
