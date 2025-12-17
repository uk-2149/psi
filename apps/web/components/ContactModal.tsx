"use client";

import { useState } from "react";
import { X } from "lucide-react";

const HEAR_OPTIONS = [
  "X",
  "Github",
  "LinkedIn",
  "Instagram",
  "Word of mouth",
  "Blog",
  "Other",
];

type ContactModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContactModal({ open, setOpen }: ContactModalProps) {
  const [heardFrom, setHeardFrom] = useState<string | null>(null);

  // Lock scroll when modal is open
  //   useEffect(() => {
  //     if (open) document.body.style.overflow = "hidden";
  //     else document.body.style.overflow = "";
  //   }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark + blur background */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <div
            className="
  relative z-10
  w-[92%] sm:w-full
  max-w-lg sm:max-w-2xl
  rounded-xl
  border border-white/10
  bg-[#111]
  shadow-2xl
"
          >
            {/* Mac Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="
  w-full
  rounded-lg
  border border-white/10
  bg-black
  px-4 py-3
  text-[15px] sm:text-base
  text-white
  outline-none
  focus:border-yellow-400
"
                />

                <input
                  type="text"
                  placeholder="Your email"
                  className="
  w-full
  rounded-lg
  border border-white/10
  bg-black
  px-4 py-3
  text-[15px] sm:text-base
  text-white
  outline-none
  focus:border-yellow-400
"
                />

                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="
  w-full
  rounded-lg
  border border-white/10
  bg-black
  px-4 py-3
  text-[15px] sm:text-base
  text-white
  outline-none
  focus:border-yellow-400
"
                />

                {/* Heard About Me */}
                <div>
                  <p className="mb-3 text-sm tracking-wide text-white/70">
                    HOW DID YOU HEAR ABOUT ME?
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {HEAR_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => setHeardFrom(option)}
                        className={`rounded-full border px-4 py-2 text-xs sm:text-sm transition ${
                          heardFrom === option
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                            : "border-white/20 text-white/70 hover:border-white/40"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  className="
  mt-5
  w-full
  rounded-lg
  bg-yellow-400
  py-3.5
  text-sm sm:text-base
  font-medium
  text-black
  hover:bg-yellow-300
  transition
"
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
