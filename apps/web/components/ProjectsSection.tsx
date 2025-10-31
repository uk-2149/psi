"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  color: string;
  techStack: string[];
}

const projects: Project[] = [
  {
    id: "01",
    title: "ChitChat",
    description:
      "A cutting-edge, full-stack real-time communication platform that brings people together through seamless messaging, crystal-clear video calls, and intelligent AI assistance. Built with modern web technologies including React, TypeScript, Express, MongoDB, and Redis, ChitChat delivers enterprise-grade performance with a consumer-friendly experience.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    category: "Web Development",
    color: "#FCD34D",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Socket.IO",
    ],
  },
  {
    id: "02",
    title: "Draw.wine",
    description:
      "A modern, real-time collaborative drawing application built with React, TypeScript, Node.js, and Socket.IO. Draw.Wine allows multiple users to collaborate on digital canvases in real-time with a rich set of drawing tools and features.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Web Development",
    color: "#818CF8",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.IO",
      "Redis",
      "Helmet",
    ],
  },
  {
    id: "03",
    title: "JournAI",
    description:
      "An AI-powered journaling companion that tracks your mood, helps you reflect through smart conversations, and uplifts you with personalized motivational quotes.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    category: "Web Development",
    color: "#34D399",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Gemini API",
      "MongoDB",
    ],
  },
  {
    id: "04",
    title: "Testimonial.io clone",
    description:
      "A full-stack application that lets users collect, manage, and display client testimonials with ease. It allows you to create shareable links to gather testimonials from clients, which can then be organized and showcased through a clean dashboard.The platform also supports website integration, enabling users to embed testimonials directly into their own websites with simple scripts",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    category: "Web Development",
    color: "#F472B6",
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const maxIndex = projects.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 0.9, 1],
    [
      "hsl(0, 0%, 8%)",
      "hsl(0, 0%, 8%)",
      "hsl(0, 0%, 8%)",
      "linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)",
      "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    ]
  );

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

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: bg }}
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-45 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: projects[index].color,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: projects[(index + 1) % projects.length].color,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      {/* Grain texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative flex h-screen items-center justify-between px-4 md:px-8 lg:px-16">
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
                  index === i
                    ? "bg-white/10 backdrop-blur-md"
                    : "hover:bg-white/5"
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
        <div className="flex-1 flex items-center justify-center px-4 md:px-12 lg:px-20">
          <motion.div
            className="relative w-full max-w-5xl h-[70vh] md:h-[80vh]"
            style={{ perspective: 2000 }}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
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
                  className="
            relative w-full h-full
            bg-gray-950/95 backdrop-blur-2xl
            rounded-xl overflow-hidden
            border border-cyan-500/30
            shadow-2xl shadow-cyan-500/10
            flex flex-col
          "
                  whileHover={{
                    scale: 1.015,
                    boxShadow: "0 0 50px rgba(34,211,238,0.25)",
                    borderColor: "rgba(34,211,238,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* HEADER – Image + Badge */}
                  <div className="relative h-[45%] md:h-[55%] overflow-hidden">
                    <motion.img
                      src={projects[index].image}
                      alt={projects[index].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-transparent" />

                    {/* Terminal Badge */}
                    <motion.div
                      className="
                absolute top-4 right-4
                px-3 py-1.5 rounded-md
                bg-gray-900/90 border border-cyan-400/50
                text-cyan-300 text-xs font-mono uppercase tracking-wider
                flex items-center gap-2
              "
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
                    {/* Title */}
                    <div className="space-y-3">
                      <motion.div
                        className="
                  inline-flex items-center gap-2.5
                  px-4 py-2 rounded-md
                  bg-cyan-500/10 border border-cyan-500/40
                  text-cyan-300 text-lg md:text-2xl font-mono font-bold
                  tracking-tight
                "
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 220,
                        }}
                      >
                        <span className="text-green-400">$</span>
                        {projects[index].title}
                      </motion.div>

                      {/* Description */}
                      <motion.p
                        className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {projects[index].description}
                      </motion.p>

                      {/* TECH STACK CHIPS */}
                      <motion.div
                        className="flex flex-wrap gap-2 mt-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {projects[index].techStack.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="
                      px-3 py-1 text-xs font-mono
                      bg-gray-800/70 backdrop-blur-sm
                      text-cyan-200 border border-cyan-700/40
                      rounded-full
                      flex items-center gap-1.5
                      transition-all duration-200
                    "
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.45 + i * 0.05 }}
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

                    {/* ACTIONS */}
                    <motion.div
                      className="flex flex-wrap gap-3 mt-6"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        className="
                  px-5 py-2.5 rounded-md
                  bg-cyan-500 text-gray-950 font-mono text-sm md:text-base
                  shadow-lg shadow-cyan-500/30
                  flex items-center gap-2
                  font-medium
                "
                        whileHover={{
                          scale: 1.06,
                          boxShadow: "0 0 25px rgba(34,211,238,0.5)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View case study"
                      >
                        <span className="text-xs">➜</span>
                        View More
                      </motion.button>

                      <motion.button
                        className="
                  px-5 py-2.5 rounded-md border border-cyan-500/50
                  text-cyan-300 font-mono text-sm md:text-base
                  backdrop-blur-sm
                  flex items-center gap-2
                  font-medium
                "
                        whileHover={{
                          scale: 1.06,
                          backgroundColor: "rgba(34,211,238,0.12)",
                          borderColor: "rgba(34,211,238,0.7)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="See all work"
                      >
                        <span className="text-xs">↗</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
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
          <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
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
              whileHover={{
                scale: 1.1,
                opacity: 1,
                x: -10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-56 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  {index === i && (
                    <motion.div
                      className="absolute inset-0 border-4 rounded-t-xl"
                      style={{ borderColor: p.color }}
                      layoutId="activeBorder"
                    />
                  )}
                </div>
                <div className="p-3 bg-slate-900/90 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">
                      [{p.id}] {p.title.split(" ")[0]}
                    </p>
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

              {/* Active project glow */}
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

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
            <div
              className={`w-12 md:w-16 h-1 rounded-full transition-all ${
                index === i ? "bg-white" : "bg-white/30"
              }`}
            >
              {index === i && (
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: projects[i].color }}
                  layoutId="activeProgress"
                />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
