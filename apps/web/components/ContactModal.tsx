"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, heardFrom }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error?.message || "Failed to send message");
      }

      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setName("");
        setEmail("");
        setMessage("");
        setHeardFrom(null);
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
              {success ? (
                <div className="py-10 text-center flex flex-col items-center justify-center">
                  <div className="h-16 w-16 mb-4 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Message sent!</h3>
                  <p className="text-white/60">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
                          type="button"
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

                  {errorMsg && (
                    <div className="text-red-400 text-sm mt-2">{errorMsg}</div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
    mt-5
    flex
    w-full
    items-center
    justify-center
    rounded-lg
    bg-yellow-400
    py-3.5
    text-sm sm:text-base
    font-medium
    text-black
    hover:bg-yellow-300
    transition
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
                  >
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
