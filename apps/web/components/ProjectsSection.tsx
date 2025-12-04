"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
  useInView
} from "framer-motion";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
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
}

const projects: Project[] = [
  {
    id: "01",
    title: "ChitChat",
    description:
      "A cutting-edge, full-stack real-time communication platform that brings people together through seamless messaging, crystal-clear video calls, and intelligent AI assistance.",
    image: "/chitchat.png",
    category: "Web Development",
    color: "#FCD34D",
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "Socket.IO"],
    github: "https://github.com/uk-2149/chitchat-uk",
    liveLink: "https://chitchat.vercel.app/",
    scale: 50,
  },
  {
    id: "02",
    title: "Draw.wine",
    description:
      "A modern, real-time collaborative drawing application, allows multiple users to collaborate on digital canvases in real-time with a rich set of drawing tools and features.",
    image: "/drawine.png",
    category: "Web Development",
    color: "#818CF8",
    techStack: ["React", "TypeScript", "Node.js", "Express", "Socket.IO", "Redis", "Helmet"],
    github: "https://github.com/uk-2149/draw.wine",
    liveLink: "https://drawine.vercel.app/",
    scale: 90,
  },
  {
    id: "03",
    title: "QuizGen",
    description:
      "QuizGen is a web-based tool that allows users to upload typed documents or PDF files and convert them into customizable quizzes. It supports setting the difficulty level, choosing question types, and adding custom prompts to generate tailored quizzes. The quizzes can then be downloaded with answers at the end.",
    image: "/QuizGen.png",
    category: "Web Development",
    color: "#34D399",
    techStack: ["React", "TypeScript", "Node.js", "Express", "Gemini API"],
    github: "https://github.com/uk-2149/pdf-quiz",
    liveLink: "https://quizgen-xi.vercel.app/",
    scale: 70,
  },
  {
    id: "04",
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
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isInView = useInView(sectionRef, { amount: 0.96 });
  const maxIndex = projects.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const goPrev = () => {
    setDirection(-1);
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  };

  const goNext = () => {
    setDirection(1);
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
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

  if (!projects[index]) return null;

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      animate={{
        // gradient stays while section is in view (mobile & desktop)
        background: isInView
          ? "linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)"
          : "hsl(0, 0%, 8%)",
      }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-45 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: projects[index].color }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-50 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: projects[(index + 1) % projects.length]?.color }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      {/* Grain texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

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
        <div className="h-[calc(100vh-64px)] overflow-y-auto snap-y snap-mandatory px-4 space-y-6 pb-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              className="snap-start rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl shadow-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
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
                <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
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
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md border border-cyan-500/50 text-cyan-300 font-mono text-sm backdrop-blur-sm"
                    aria-label="Open live demo"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* DESKTOP/TABLET */}
      <div className="relative hidden md:flex h-screen items-center justify-between px-4 md:px-8 lg:px-16">
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
          <motion.div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]" style={{ perspective: 2000 }}>
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
                className="absolute inset-0 w-full h-full"
              >
                {/* DEVELOPER CARD */}
                <motion.div
                  className="relative w-full h-full bg-gray-950/95 backdrop-blur-2xl rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 flex flex-col"
                  whileHover={{
                    scale: 1.015,
                    boxShadow: "0 0 50px rgba(34,211,238,0.25)",
                    borderColor: "rgba(34,211,238,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* HEADER – Image + Badge */}
                  <div className="relative h-[45%] md:h-[70%] overflow-hidden">
                    <motion.img
                      src={projects[index].image}
                      alt={projects[index].title}
                      className={`w-full h-full object-cover scale-${projects[index].scale}`}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-transparent" />
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-gray-900/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      {projects[index].category}
                    </motion.div>
                  </div>

                  {/* BODY */}
                  <div className="flex-1 p-5 md:p-8 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <motion.div
                        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-lg md:text-2xl font-mono font-bold tracking-tight"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
                      >
                        <span className="text-green-400">$</span>
                        {projects[index].title}
                      </motion.div>

                      <motion.p
                        className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {projects[index].description}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-2 mt-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {projects[index].techStack.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono bg-gray-800/70 backdrop-blur-sm text-cyan-200 border border-cyan-700/40 rounded-full flex items-center gap-1.5 transition-all duration-200"
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
                        href={projects[index].github}
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

                      <motion.a
                        href={projects[index].liveLink}
                        target="_blank"
                        className="px-5 py-2.5 rounded-md border border-cyan-500/50 text-cyan-300 font-mono text-sm md:text-base backdrop-blur-sm flex items-center gap-2 font-medium"
                        whileHover={{ scale: 1.06, backgroundColor: "rgba(34,211,238,0.12)", borderColor: "rgba(34,211,238,0.7)" }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="See all work"
                      >
                        <span className="text-xs">↗</span>
                      </motion.a>
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
              <div className="w-56 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
                <div className="relative h-32 overflow-hidden">
                  <Image src={p.image} alt={p.title} width={400} height={400} className="w-full h-full object-cover" />
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
    </motion.section>
  );
}
