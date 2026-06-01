"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  TransformInputRange,
  useMotionValue,
  useSpring,
  useMotionTemplate
} from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Rocket } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  color: string;
  techStack: string[];
  github: string;
  liveLink: string;
  scale: number;
  screenshotRatio: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Qurato",
    description:
      "Transform YouTube playlists into distraction-free courses. Track progress with GitHub-like heatmaps, organize lessons, mark completion, and share custom learning paths. Perfect for focused learning without YouTube distractions.",
    image: "/qurato.png",
    category: "Web Development",
    color: "#6366F1",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "MongoDB", "NextAuth.js", "YouTube API"],
    github: "https://github.com/uk-2149/Qurato",
    liveLink: "https://qurato.utkal.xyz/",
    scale: 80,
    screenshotRatio: "16 / 10",
  },
  {
    id: "02",
    title: "ChitChat",
    description:
      "A cutting-edge, full-stack real-time communication platform that brings people together through seamless messaging, crystal-clear video calls, and intelligent AI assistance, where I worked on the voice & video calling and some more chat features.",
    image: "/chitchat.png",
    category: "Web Development",
    color: "#FCD34D",
    techStack: ["React", "TypeScript", "Node.js", "Express", "WebRTC", "MongoDB", "Redis", "Socket.IO"],
    github: "https://github.com/uk-2149/chitchat-uk",
    liveLink: "",
    scale: 50,
    screenshotRatio: "16 / 10",
  },
  {
    id: "03",
    title: "Draw.wine",
    description:
      "A modern, real-time collaborative drawing application, allows multiple users to collaborate on digital canvases in real-time with a rich set of drawing tools and features, where I worked on the drawing tools, some customization features & real-time collaboration rooms.",
    image: "/drawine.png",
    category: "Web Development",
    color: "#818CF8",
    techStack: ["React", "TypeScript", "Node.js", "Express", "Socket.IO", "Redis", "Helmet"],
    github: "https://github.com/pandarudra/draw.wine",
    liveLink: "https://draw-wine.rudrax.me/",
    scale: 90,
    screenshotRatio: "16 / 10",
  },
  {
  id: "04",
  title: "Zan - 'Uber for GPUs'",
  description:
    "A decentralized GPU compute marketplace that connects clients needing high-performance computing with providers offering GPU resources, where I worked on building backend architecture and payment system using solana escrow contracts.",
  image: "/zan.png",
  category: "Web3 & Distributed Systems",
  color: "#14B8A6",
  techStack: [
    "Next.js",
    "Rust",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Electron",
    "Solana",
    "Prisma",
    "PostgreSQL",
    "TurboRepo",
  ],
  github: "https://github.com/uk-2149/Zan",
  liveLink: "https://zan-web.vercel.app/",
  scale: 80,
  screenshotRatio: "16 / 10",
},
  // {
  //   id: "05",
  //   title: "QuizGen",
  //   description:
  //     "QuizGen is a tool that allows users to upload documents & convert them into customizable quizzes. It supports setting the difficulty level, choosing question types & adding custom prompts to generate tailored quizzes. The quizzes can then be downloaded with answers at the end.",
  //   image: "/QuizGen.png",
  //   category: "Web Development",
  //   color: "#34D399",
  //   techStack: ["React", "TypeScript", "Node.js", "Express", "Gemini API"],
  //   github: "https://github.com/uk-2149/pdf-quiz",
  //   liveLink: "https://quizgen-xi.vercel.app/",
  //   scale: 70,
  //   screenshotRatio: "16 / 10",
  // },
  {
    id: "05",
    title: "Testimonial.io clone",
    description:
      "A platform to collect, manage, and showcase client testimonials effortlessly. Create shareable links, customize displays, and embed them seamlessly into your website.",
    image: "/testimonial.png",
    category: "Web Development",
    color: "#F472B6",
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/uk-2149/testimonial-clone",
    liveLink: "https://testimonial-uk-97.vercel.app/dashboard",
    scale: 100,
    screenshotRatio: "16 / 9",
  },
];

function ScreenshotImage({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Image
      src={project.image}
      alt={project.title}
      fill
      sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) 76vw, 1180px"
      className="h-full w-full object-cover object-center"
      priority={priority}
    />
  );
}

interface MobileCardProps {
  p: Project;
  i: number;
  progress: MotionValue<number>;
  range: TransformInputRange;
  onLiveSoon: () => void;
}

function MobileCard ({p, i, progress, range, onLiveSoon}: MobileCardProps) {
  const isLast = i === projects.length - 1;
  const targetScale = isLast ? 1 : 0.90;
  const targetOpacity = isLast ? 1 : 0.8;
  const targetBrightness = isLast ? "brightness(100%)" : "brightness(75%)";
  const filter = useTransform(progress, range, ["brightness(100%)", targetBrightness]); 
  const opacity = useTransform(progress, range, [1, targetOpacity]); 
  const scale = useTransform(progress, range, [1, targetScale]);
  const topOffset = `calc(120px + ${i * 50}px)`;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <section id="projects" className="flex justify-center sticky" style={{ top: topOffset }}>
      <motion.article
              key={p.id}
              className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl shadow-2xl origin-top perspective-1000"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{ filter, opacity, scale, zIndex: i }} 
            >
              {/* Image */}
              <div className="relative p-3" onMouseMove={handleMouseMove}>
                <div
                  className="relative overflow-hidden rounded-xl border border-cyan-300/35 bg-slate-950 shadow-2xl shadow-cyan-500/10"
                  style={{ aspectRatio: p.screenshotRatio }}
                >
                  <ScreenshotImage project={p} priority={i < 2} />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                  <motion.div className="absolute inset-0" style={{ background: spotlight }} />
                </div>
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border"
                  style={{ borderColor: `${p.color}80`, color: p.color, background: "#0b1220cc" }}
                >
                  {p.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-base font-mono font-bold">
                  <span className="text-green-400">$</span>
                  {p.title}
                </div>

                <p className="text-gray-300/90 text-sm leading-relaxed">
                  {p.description}
                </p>

                {/* Tech chips – horizontal scroll if overflow */}
                <div className="flex gap-2 flex-wrap pt-1">
                  {p.techStack.map((t) => (
                    <span
                      key={t}
                      className="shrink-0 px-2.5 py-1 text-[11px] font-mono bg-slate-900/70 border border-cyan-700/30 text-cyan-200 rounded-full"
                    >
                      ◆ {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500 text-slate-950 font-mono text-sm shadow-lg shadow-cyan-500/30"
                    aria-label="View source code on GitHub"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  {p.liveLink ? (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-md border border-cyan-500/50 text-cyan-300 font-mono text-sm backdrop-blur-sm"
                      aria-label={`Open ${p.title} live demo`}
                    >
                      ↗
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={onLiveSoon}
                      className="px-4 py-2 rounded-md border border-cyan-500/50 text-cyan-300 font-mono text-sm backdrop-blur-sm"
                      aria-label={`${p.title} live demo will be live soon`}
                    >
                      ↗
                    </button>
                  )}
                </div>
              </div>
            </motion.article>

    </section>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [liveSoonToast, setLiveSoonToast] = useState(0);
  const [isProjectPinned, setIsProjectPinned] = useState(false);
  const maxIndex = projects.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const showLiveSoonToast = () => {
    setLiveSoonToast((count) => count + 1);
  };

  const currentProject = projects[index];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const nextIndex = Math.min(maxIndex, Math.floor(latest * projects.length));
    setIndex((currentIndex) => {
      if (currentIndex === nextIndex) return currentIndex;
      setDirection(nextIndex > currentIndex ? 1 : -1);
      return nextIndex;
    });
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (!liveSoonToast) return;

    const timeout = window.setTimeout(() => {
      setLiveSoonToast(0);
    }, 2600);

    return () => window.clearTimeout(timeout);
  }, [liveSoonToast]);

  useEffect(() => {
    const updatePinnedState = () => {
      const section = sectionRef.current;
      if (!section || window.innerWidth < 768) {
        setIsProjectPinned(false);
        return;
      }

      const rect = section.getBoundingClientRect();
      setIsProjectPinned(rect.top <= 1 && rect.bottom > window.innerHeight);
    };

    updatePinnedState();
    window.addEventListener("scroll", updatePinnedState, { passive: true });
    window.addEventListener("resize", updatePinnedState);

    return () => {
      window.removeEventListener("scroll", updatePinnedState);
      window.removeEventListener("resize", updatePinnedState);
    };
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  if (!currentProject) return null;

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-visible bg-bg md:h-[var(--projects-scroll-height)] md:overflow-visible w-screen"
      style={{ "--projects-scroll-height": `${projects.length * 100}vh` } as React.CSSProperties}
    >
      {/* MOBILE-ONLY LAYOUT */}
      <div className="md:hidden relative z-20">
        {/* Title strip */}
        <div className="px-4 pt-10 pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white/80 text-xs uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Web Development
          </div>
        </div>

        {/* Snap scroller: one polished card per viewport */}
        <div className="px-4 relative space-y-6 pb-10" style={{ height: `${projects.length * 80}dvh` }}>
          {projects.map((p, i) => {
            const rangeStart = i * (1 / (projects.length - 1));
          const rangeEnd = (i + 1) * (1 / (projects.length - 1));
          return (
            <MobileCard key={p.id} p={p} i={i} progress={scrollYProgress} range={[rangeStart, rangeEnd]} onLiveSoon={showLiveSoonToast} />
          )
          })}
        </div>
      </div>

      {/* DESKTOP/TABLET */}
      <div
        className="sticky top-0 hidden h-screen items-center justify-between overflow-hidden px-4 md:flex md:px-8 lg:px-16"
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#312E81_0%,#1E1B4B_100%)] transition-opacity duration-500 ${
            isProjectPinned ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
            isProjectPinned ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            className="absolute left-[-3rem] top-[32%] h-[30rem] w-[30rem] rounded-full bg-sky-300/45 blur-[78px] mix-blend-screen"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.68, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-[-3rem] top-[38%] h-[29rem] w-[29rem] rounded-full bg-pink-400/45 blur-[78px] mix-blend-screen"
            animate={{ scale: [1.08, 1, 1.08], opacity: [0.66, 0.46, 0.66] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />

          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay overflow-hidden">
            <svg className="h-full w-full">
              <filter id="projects-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
              </filter>
              <rect width="100%" height="100%" filter="url(#projects-noise)" />
            </svg>
          </div>
        </div>

        {/* LEFT SIDEBAR */}
        <motion.div
          className="hidden md:flex flex-col items-start space-y-8 z-20"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="text-5xl lg:text-6xl font-black text-white/90"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            W.
          </motion.div>

          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Featured Work
            </div>
            <div className="h-1 w-12 rounded-full bg-linear-to-r from-yellow-400 to-orange-500" />
          </div>

          <div className="space-y-2">
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  index === i ? "bg-white/10 backdrop-blur-md" : "hover:bg-white/5"
                }`}
                whileHover={{ x: 5 }}
              >
                <span
                  className={`text-sm font-mono ${
                    index === i ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  {p.id}
                </span>
                {index === i && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-8 h-0.5 rounded-full"
                    style={{ background: p.color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* MAIN CAROUSEL */}
        <div className="flex-1 md:flex items-center justify-center px-4 md:px-12 lg:px-20">
          <motion.div
            className="relative grid w-full max-w-[min(76vw,1180px)]"
            style={{ perspective: 2000 }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 40 },
                  opacity: { duration: 0.5 },
                  rotateY: { type: "spring", stiffness: 200, damping: 30 },
                  scale: { duration: 0.5 },
                }}
                className="[grid-area:1/1] w-full"
              >
                {/* DEVELOPER CARD */}
                <motion.div
                  className="relative w-full bg-gray-950/95 backdrop-blur-2xl rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 flex flex-col"
                  whileHover={{
                    boxShadow: "0 0 50px rgba(34,211,238,0.25)",
                    borderColor: "rgba(34,211,238,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* HEADER - Screenshot */}
                  <div className="relative overflow-hidden bg-slate-950">
                    <motion.div
                      className="relative w-full overflow-hidden border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/15"
                      style={{ aspectRatio: currentProject.screenshotRatio }}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      <ScreenshotImage project={currentProject} />
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-white/5" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </motion.div>
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-gray-900/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      {currentProject.category}
                    </motion.div>
                  </div>

                  {/* BODY */}
                  <div className="p-5 md:p-7 text-left bg-[linear-gradient(180deg,rgba(2,6,23,0.72),rgba(2,6,23,0.98))]">
                    <div className="space-y-3">
                      <motion.div
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-lg md:text-xl font-mono font-bold tracking-tight shadow-lg shadow-cyan-500/10"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
                      >
                        <span className="text-green-400">$</span>
                        {currentProject.title}
                      </motion.div>

                      <motion.p
                        className="w-full text-gray-300/80 text-sm md:text-base leading-relaxed font-light"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentProject.description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-2 mt-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentProject.techStack.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono bg-cyan-950/40 backdrop-blur-sm text-cyan-100 border border-cyan-500/30 rounded-full flex items-center gap-1.5 transition-all duration-200"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(34,211,238,0.15)",
                              borderColor: "rgba(34,211,238,0.6)",
                              color: "#67e8f9",
                            }}
                          >
                            <span className="text-cyan-400 text-[10px]">◆</span>
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    <motion.div
                      className="flex flex-wrap gap-3 mt-6"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-md bg-cyan-500 text-gray-950 font-mono text-sm md:text-base shadow-lg shadow-cyan-500/30 flex items-center gap-2 font-medium"
                        whileHover={{ scale: 1.06, boxShadow: "0 0 25px rgba(34,211,238,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View source code on GitHub"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </motion.a>

                      {currentProject.liveLink ? (
                        <motion.a
                          href={currentProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-md border border-cyan-500/50 text-cyan-300 font-mono text-sm md:text-base backdrop-blur-sm flex items-center gap-2 font-medium"
                          whileHover={{ scale: 1.06, backgroundColor: "rgba(34,211,238,0.12)", borderColor: "rgba(34,211,238,0.7)" }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Open ${currentProject.title} live demo`}
                        >
                          <span className="text-xs">↗</span>
                        </motion.a>
                      ) : (
                        <motion.button
                          type="button"
                          onClick={showLiveSoonToast}
                          className="px-5 py-2.5 rounded-md border border-cyan-500/50 text-cyan-300 font-mono text-sm md:text-base backdrop-blur-sm flex items-center gap-2 font-medium"
                          whileHover={{ scale: 1.06, backgroundColor: "rgba(34,211,238,0.12)", borderColor: "rgba(34,211,238,0.7)" }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`${currentProject.title} live demo will be live soon`}
                        >
                          <span className="text-xs">↗</span>
                        </motion.button>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows – keep for md+ only */}
            <motion.button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 z-30 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT SIDEBAR - Preview Stack */}
        <motion.div
          className="hidden lg:flex flex-col items-end space-y-4 z-20"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">
            Projects
          </div>

          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className="relative cursor-pointer"
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: index === i ? 1 : 0.4,
                scale: index === i ? 1.05 : 0.85,
                x: index === i ? 0 : 20,
                y: (i - index) * 10,
              }}
              whileHover={{ scale: 1.1, opacity: 1, x: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-56 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-950/90">
                <div className="relative overflow-hidden bg-slate-950" style={{ aspectRatio: p.screenshotRatio }}>
                  <ScreenshotImage project={p} />
                  {index === i && (
                    <motion.div className="absolute inset-0 border-4 rounded-t-xl" style={{ borderColor: p.color }} layoutId="activeBorder" />
                  )}
                </div>
                <div className="p-3 bg-slate-900/90 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">[{p.id}] {p.title.split(" ")[0]}</p>
                    {index === i && (
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: p.color }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {index === i && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 -z-10 rounded-xl blur-2xl"
                  style={{ background: p.color, opacity: 0.4 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicator – desktop only now */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-20">
        {projects.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className="group relative"
            whileHover={{ scale: 1.2 }}
          >
            <div className={`w-12 md:w-16 h-1 rounded-full transition-all ${index === i ? "bg-white" : "bg-white/30"}`}>
              {index === i && (
                <motion.div className="h-full rounded-full" style={{ background: projects[i]!.color }} layoutId="activeProgress" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {liveSoonToast > 0 && (
          <motion.div
            key={liveSoonToast}
            role="status"
            aria-live="polite"
            className="fixed right-4 top-6 z-50 w-[min(calc(100vw-32px),390px)] overflow-hidden rounded-xl border border-cyan-300/50 bg-slate-950/90 p-1 shadow-2xl shadow-cyan-500/25 backdrop-blur-2xl md:right-8"
            initial={{ opacity: 0, x: 28, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, scale: 0.96, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-linear-to-r from-cyan-500/15 via-slate-950 to-fuchsia-500/15 px-4 py-3">
              <motion.div
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["0%", "420%"] }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
              <div className="relative flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan-300/50 bg-cyan-300/10 text-cyan-200 shadow-lg shadow-cyan-500/20">
                  <Rocket className="h-5 w-5" />
                </div>
                <div className="min-w-0 font-mono">
                  <p className="text-[10px] uppercase tracking-widest text-cyan-200/70">deploy queued</p>
                  <p className="truncate text-sm font-bold text-white">will be live soon</p>
                </div>
                <div className="ml-auto flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
