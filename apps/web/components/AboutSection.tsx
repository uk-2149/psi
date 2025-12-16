"use client";

import { motion, type Variants } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import Github from "./Github";
import Image from "next/image";
import { useEffect, useState } from "react";

// Pure Tailwind + Framer Motion. Scroll-reveal word-by-word.

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 5l7 7-7 7"
      />
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
        <motion.span
          key={i}
          variants={word}
          className="inline-block will-change-transform"
        >
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

      <div className="mx-auto w-[85vw] px-0 pt-0 pb-0">
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
          <div className="md:col-span-5 flex w-full items-end gap-4 px-2 justify-end border-r border-neutral-800 h-full">
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
        <div className="mt-0 border-r border-neutral-800">
          <div className="relative">
            <div className="p-6 sm:px-20 sm:py-15 border-l border-t border-b border-r border-neutral-800 flex items-center justify-center">
              <RevealText
                text={
                  "I love building things that feel smooth, look clean, and work fast. I pick up new stuff quickly, experiment a lot, and ship even faster. I’m all about solving problems, breaking things (sometimes on purpose), and learning from the chaos."
                }
                className="max-w-4xl text-2xl lg:text-4xl leading-tight text-neutral-200 sm:text-xl mask-[linear-gradient(180deg,rgba(0,0,0,1),rgba(0,0,0,0.75)_75%,transparent)]"
              />
            </div>
          </div>
        </div>

        {/* Github Calender */}
        <div className="mt-0">
          <div className="relative">
            <div className="p-6 sm:px-20 py-20 sm:py-15 border-l border-t border-b border-neutral-800 flex items-center justify-center relative">
              <Github />

              <div className="absolute flex justify-end items-end bottom-0 right-2 text-[1rem] tracking-widest text-textPrimary select-none">
                <div className="hidden h-px bg-neutral-300 md:block w-50 mr-3" />
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i}>/</span>
                ))}
                <span className="ml-3 text-[0.5rem] align-middle self-center">
                  ABT_ME
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* send msg section */}
        <div className="mt-0 border-r border-neutral-800">
          <div className="relative">
            <div className="border-t border-b border-r border-neutral-800 flex flex-col md:flex-row items-center justify-center">
              <div className="w-full h-120 md:h-150 p-6 sm:px-20 py-20 sm:py-15 border-b md:border-r border-neutral-800 flex items-center justify-center">
                <div className="relative h-full w-fit">
                  {/* White shadow layer */}
                  <div className="absolute top-3 left-3 h-full w-full bg-white rounded-tr-4xl" />

                  {/* Image */}
                  <Image
                    src="/dP.jpeg"
                    alt="Utkal - Creative Web Developer"
                    height={90}
                    width={90}
                    className="relative h-full w-fit object-cover rounded-tr-4xl"
                    priority
                  />

                  {/* Send Message Button */}
                  <button
                    className="
                      absolute 
                      bottom-4 
                      right-4 
                      bg-accent
                      text-black 
                      text-sm 
                      font-normal 
                      px-5 
                      py-3 
                      rounded-sm
                      transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5
                      shadow-md
                    "
                  >
                    Send a message
                  </button>
                </div>
              </div>

              <div className="w-full h-100 flex items-center justify-center">
                <ChatIntro />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Container component

function useTypingEffect(text: string, speed = 50) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

type Mode = "idle" | "build" | "geek";

function ChatIntro() {
  const [mode, setMode] = useState<Mode>("idle");

  const myText =
    mode == "build"
      ? "Awesome! Let's get started. Ready?"
      : "Let's dive in! Network, code, philosophy & more, you're in the right place.";

  const myTextDisplayed = useTypingEffect(myText);

  return (
    <div className="mx-auto w-full max-w-[95%] sm:max-w-xl rounded-2xl border border-white/10 bg-[#0b0b0e] px-4 py-5 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.6)]">
      {/* Mac Window Buttons */}
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
      </div>

      <div className="my-4 h-px bg-white/10" />

      {/* Bjorn Question */}
      <div className="mb-6 flex items-center gap-3">
        <Image
          src="/dP.jpeg"
          alt="Utkal - Creative Web Developer"
          width={36}
          height={36}
          className="rounded-full"
        />
        <div>
          <p className="text-xs sm:text-sm text-white/60">Bjorn Encutescu</p>
          <h2
            className={`font-mono ${mode === "build" ? "text-xs sm:text-base" : "text-base sm:text-lg"} text-white`}
          >
            What brings you here today?
          </h2>
        </div>
      </div>

      {/* Action Buttons */}
      {mode === "idle" && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setMode("build")}
            className="w-full sm:w-auto rounded-lg border border-white/15 px-5 py-3 font-mono text-sm sm:text-base text-white transition-all hover:bg-white/5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            Build something amazing!
          </button>

          <button
            onClick={() => setMode("geek")}
            className="w-full sm:w-auto rounded-lg border border-white/15 px-5 py-3 font-mono text-sm sm:text-base text-white transition-all hover:bg-white/5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          >
            Geek out with you!
          </button>
        </div>
      )}

      {/* Chat Replies */}
      {mode !== "idle" && (
        <div className="mt-8 space-y-5 sm:space-y-6 animate-fade-in">
          {/* User Message */}
          <div className="flex justify-end gap-2 sm:gap-3">
            <div className="max-w-[85%] sm:max-w-md rounded-lg bg-[#12121a] px-4 py-3 font-mono text-xs sm:text-base text-white">
              {mode === "build"
                ? "I’m ready to collaborate on something incredible with you!"
                : "I’m here for all the creative and nerdy goodness!"}
            </div>

            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-indigo-500 font-semibold text-sm text-white">
              U
            </div>
          </div>

          {/* Bjorn Reply */}
          <div className="flex items-start gap-2 sm:gap-3">
            <Image
              src="/dP.jpeg"
              alt="Utkal - Creative Web Developer"
              width={36}
              height={36}
              className="rounded-full"
            />

            <div className="max-w-[85%] sm:max-w-md rounded-lg bg-[#0f0f14] px-4 py-3 font-mono text-xs sm:text-base text-white">
              {myTextDisplayed}
              {myTextDisplayed.length < myText.length && (
                <span className="ml-0.5 animate-pulse">▍</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
