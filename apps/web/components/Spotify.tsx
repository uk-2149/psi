"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import Image from "next/image";

type Track = {
  title: string;
  artist: string;
  albumArt: string;
  url: string;
};

export default function SpotifyMini() {
  const [track, setTrack] = useState<Track | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/spotify")
      .then(res => res.json())
      .then(setTrack)
      .catch(() => {});
  }, []);

  if (!track) return null;

  // Safely extract track ID with proper null checks
  const trackId = track.url?.split("/track/")?.[1]?.split("?")?.[0] || null;

  return (
    <div className="relative">
      {/* Pill */}
      <div
        className="flex items-center gap-2 rounded-full bg-neutral-800/70
                   px-2 py-1.5 hover:bg-neutral-700/80 transition-colors"
      >
        {/* Album Art */}
        <Image
          src={track.albumArt}
          alt={track.title}
          className="h-6 w-6 rounded-full"
          width={8}
          height={8}
        />

        {/* Info */}
        <div className="flex flex-col max-w-[120px] overflow-hidden">
          <span className="text-[10px] text-gray-400 leading-none">
            Now playing
          </span>
          <span className="text-xs text-white truncate">
            {track.title}
          </span>
        </div>

        {/* Play / Pause Toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          className="ml-1 flex h-6 w-6 items-center justify-center
                     rounded-full bg-accent text-black
                     hover:scale-105 transition"
        >
          {open ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5 ml-0.5" />
          )}
        </button>
      </div>

      {/* Spotify Embed */}
      <AnimatePresence>
        {open && trackId && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 mt-3 w-[300px]"
          >
            <iframe
              src={`https://open.spotify.com/embed/track/${trackId}?autoplay=1`}
              width="100%"
              height="80"
              allow="autoplay; encrypted-media"
              className="rounded-xl border border-neutral-800"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
