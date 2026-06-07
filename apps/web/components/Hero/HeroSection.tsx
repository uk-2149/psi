"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowRight, Code, Zap, Layers } from "lucide-react";
import { useState } from "react";
import ContactModal from "../ContactModal";
import MouseGlow from "./MouseGlow";

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  // Staggered text animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-[100dvh] bg-bg text-textPrimary overflow-hidden flex flex-col justify-center pt-24 pb-12 lg:pt-0 lg:pb-0">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] pointer-events-none"></div>
      <MouseGlow />

      <div className="relative z-10 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-8 lg:gap-16">
        
        {/* LEFT CONTENT: Typography & CTAs */}
        <div className="w-full lg:w-3/5 flex flex-col z-20">
          
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-4 lg:mb-8"
          >
            <span className="h-px w-8 bg-accent/60"></span>
            <span className="text-xs tracking-[0.2em] text-accent font-medium uppercase">Utkal Kumar Das</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-4xl lg:text-[3.25rem] leading-[1.2] font-medium tracking-tight mb-4 lg:mb-8 max-w-2xl"
          >
            {/* Split text for staggered reveal */}
            <div className="overflow-hidden pb-1">
              <motion.span variants={child} className="block text-textPrimary">I build scalable software,</motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span variants={child} className="block text-textSecondary">beautiful products, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-500 font-semibold">and systems</span></motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span variants={child} className="block text-textPrimary">that solve real problems.</motion.span>
            </div>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-textSecondary/80 max-w-lg mb-6 lg:mb-12 font-light leading-relaxed"
          >
            Engineering high-performance applications with an obsessive focus on user experience, architecture, and design.
          </motion.p>

          {/* CTAs */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <button 
              onClick={() => setShowModal(true)}
              className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-textPrimary text-bg px-8 py-4 font-medium transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-black">
                <Mail className="w-4 h-4" /> Let&apos;s talk
              </span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 font-medium text-textPrimary flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm transition-all hover:bg-neutral-800/80 hover:border-neutral-600">
              View projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div> */}
        </div>

        {/* RIGHT CONTENT: Abstract Identity & Metrics */}
        <div className="w-full lg:w-2/5 relative flex justify-center lg:justify-end items-center mt-2 lg:mt-0 min-h-[280px] sm:min-h-[400px]">
          
          {/* Abstract Wireframe Sphere / Geometric Element */}
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96">
            {/* Glowing Orb Backdrop */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-[80px] animate-pulse"></div>
            
            {/* Rotating Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-neutral-800/60 [mask-image:linear-gradient(transparent,black_20%,black_80%,transparent)]"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-accent/20 [mask-image:linear-gradient(black_20%,transparent,black_80%)]"
            ></motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-neutral-700/30 [mask-image:radial-gradient(black,transparent)]"
            ></motion.div>
            
            {/* Center Profile Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1, type: "spring" }}
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl flex items-center justify-center shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
                <Image
                  src="/dP.jpeg"
                  alt="Utkal Kumar Das"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </motion.div>
            </div>

            {/* Floating Metrics */}
            <motion.div 
              className="absolute top-2 right-2 sm:-top-6 sm:-right-6 md:-right-12 z-20 animate-float"
            >
              <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-textSecondary uppercase tracking-wider font-medium">Commits</div>
                  <div className="text-xs sm:text-sm font-bold text-textPrimary">800+</div>
                </div>
              </div>
            </motion.div>

            {/* <motion.div 
              className="absolute hidden sm:flex -bottom-10 -left-6 md:-left-12 z-20 animate-float-reverse"
            >
              <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-textSecondary uppercase tracking-wider font-medium">Performance</div>
                  <div className="text-xs sm:text-sm font-bold text-textPrimary">99/100</div>
                </div>
              </div>
            </motion.div> */}

            <motion.div 
              className="absolute bottom-2 left-2 sm:top-1/2 sm:-translate-y-1/2 sm:-left-12 md:-left-20 z-20 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 shadow-xl">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] text-textSecondary uppercase tracking-wider font-medium">Projects</div>
                  <div className="text-xs sm:text-sm font-bold text-textPrimary">15+ Delivered</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="w-[26px] h-[42px] border-2 border-neutral-600/50 rounded-full flex justify-center p-1 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-3 bg-neutral-400/80 rounded-full"
          />
        </div>
      </motion.div>

      {showModal && <ContactModal setOpen={setShowModal} open={showModal}/>}
    </section>
  );
}
