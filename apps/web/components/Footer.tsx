export default function Footer() {
  return (
    <footer id="footer" className="relative mt-0">
      {/* Polygon Border Layer */}
      <div
        className="absolute inset-0 top-0 bg-neutral-800"
        style={{
          clipPath:
            "polygon(0 25%, 6% 0, 94% 0, 100% 25%, 100% 100%, 0 100%)",
        }}
      />

      {/* Main Footer */}
      <div
        className="relative bg-bg text-gray-300 px-6 py-16"
        style={{
          clipPath:
            "polygon(0 26%, 6% 0.5%, 94% 0.5%, 100% 26%, 100% 100%, 0 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto grid gap-12 grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div className="text-center md:text-left col-span-2 md:col-span-1">
            <h2 className="text-2xl font-semibold text-white tracking-wide">
              Utkal
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Building performant, clean and scalable web experiences.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a className="hover:text-white transition" href="#projects">
                  Projects
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500">
              Connect
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  className="hover:text-white transition"
                  href="https://github.com/uk-2149"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="https://www.linkedin.com/in/ukd9721/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white transition"
                  href="mailto:utkal2149@mail.com"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Utkal — Crafted with intent.
        </div>
      </div>
    </footer>
  );
}
