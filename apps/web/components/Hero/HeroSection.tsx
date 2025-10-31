"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Mail, ArrowRight, X } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-bg text-textPrimary overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-106 h-106 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        {/* <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div> */}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-12 md:py-20 max-w-7xl mx-auto">
        {/* LEFT IMAGE BLOCK */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full md:w-1/2 flex justify-center md:justify-start mb-12 md:mb-0"
        >
          <div className="relative group">
            {/* Image Container */}
            <div className="relative w-[280px] h-80 md:w-[360px] md:h-[440px] lg:w-[400px] lg:h-[480px] rounded-tr-3xl overflow-hidden border border-neutral-700/50 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-accent/20">
              <Image
                src="/dP.jpeg"
                alt="Utkal - Creative Web Developer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Video Play Indicator */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </motion.div>

              {/* Corner Photo Label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute left-0 bottom-0 -rotate-90 origin-bottom-left text-xs tracking-widest text-textSecondary/80 bg-bg/80 backdrop-blur-sm px-3 py-1.5 border-r border-t border-neutral-700"
              >
                PHOTO 4:59
              </motion.span>
            </div>

            {/* Creator Tag - Floating Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-12 top-1/2 -translate-y-1/2 bg-bg/90 backdrop-blur-md border border-neutral-700/50 text-textPrimary text-xs md:text-sm px-4 py-1.5 -rotate-90 font-medium tracking-wider shadow-lg"
            >
              Creator
            </motion.div>

            {/* "w." Badge - Floating Top-Left */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="absolute -left-24 top-0 bg-linear-to-br from-accent to-yellow-400 text-black text-lg md:text-xl font-bold px-3 py-1.5 rounded-sm shadow-xl border border-neutral-700"
            >
              U.
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT BLOCK */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 max-w-xl text-center md:text-left space-y-6"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-base text-textSecondary font-light tracking-wider"
          >
            Hi, I&apos;m{" "}
            <span className="text-textPrimary font-semibold text-accent">Utkal</span>
          </motion.p>

          {/* Main Headline */}
          <h1 className="text-[2.8rem] md:text-[4rem] lg:text-[4.8rem] leading-[0.95] font-bold tracking-tighter bg-linear-to-br from-textPrimary via-textPrimary to-accent bg-clip-text text-transparent">
            CREATIVE
            <br />
            FULL-STACK DEVELOPER
          </h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs md:text-sm tracking-widest text-textSecondary uppercase flex items-center justify-center md:justify-start gap-3"
          >
            <span className="w-12 h-px bg-linear-to-br from-accent to-transparent"></span>
            WEB DEVELOPER &amp; TECH ENTHUSIAST
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-textSecondary/80 leading-relaxed text-sm md:text-base max-w-lg mx-auto md:mx-0"
          >
            I craft <span className="text-textPrimary font-medium">immersive, high-performance</span> digital experiences — where{" "}
            <span className="text-accent">speed, scalability, and conversion</span> meet stunning aesthetics.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4"
          >
            <button className="group relative overflow-hidden bg-accent text-black px-7 py-3 font-semibold rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Get in touch
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>

            <button className="group relative border border-neutral-600 px-7 py-3 font-semibold rounded-sm transition-all duration-300 hover:bg-neutral-800 hover:border-accent hover:text-accent flex items-center justify-center gap-2">
              See work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Optional Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-neutral-700 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 bg-neutral-600 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}