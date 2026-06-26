import { useEffect, useState } from "react";
import clsx from "clsx";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

const navItems = [
  "Experience",
  "Suites",
  "Wellness",
  "Dining",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={clsx(
          "fixed left-0 top-0 z-50 w-full transition-all duration-700",
          scrolled
            ? "border-b border-black/10 bg-white/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-10">
          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href="/"
                className="group relative overflow-hidden"
              >
                <span
                  className={clsx(
                    "font-[500] text-[11px] uppercase tracking-[0.38em] transition-all duration-500",
                    scrolled
                      ? "text-[#8B6A46] group-hover:text-black"
                      : "text-white/90 group-hover:text-white"
                  )}
                >
                  {item}
                </span>

                <div
                  className={clsx(
                    "mt-2 h-[1px] w-0 transition-all duration-500 group-hover:w-full",
                    scrolled
                      ? "bg-[#8B6A46]"
                      : "bg-white"
                  )}
                />
              </a>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden"
          >
            <HiOutlineMenuAlt3
              className={clsx(
                "text-[28px] transition-all duration-500",
                scrolled
                  ? "text-[#8B6A46]"
                  : "text-white"
              )}
            />
          </button>

          {/* LOGO */}
          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <span
                className={clsx(
                  "font-luxury text-[26px] font-[500] tracking-[0.12em] transition-all duration-500 md:text-[34px]",
                  scrolled
                    ? "text-[#8B6A46]"
                    : "text-white"
                )}
              >
                KEMBANG MENOREH
              </span>

              <span
                className={clsx(
                  "hidden text-[9px] uppercase tracking-[0.6em] transition-all duration-500 md:block",
                  scrolled
                    ? "text-[#8B6A46]/70"
                    : "text-white/60"
                )}
              >
                Resort & Sanctuary
              </span>
            </div>
          </a>

          {/* CTA */}
          <button
            className={clsx(
              "group relative overflow-hidden border px-4 py-2 transition-all duration-500 md:px-6 md:py-3",
              scrolled
                ? "border-[#8B6A46]/30"
                : "border-white/30"
            )}
          >
            <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />

            <span
              className={clsx(
                "relative z-10 font-[500] text-[10px] uppercase tracking-[0.38em] transition-colors duration-700 md:text-[11px]",
                scrolled
                  ? "text-[#8B6A46] group-hover:text-black"
                  : "text-white group-hover:text-black"
              )}
            >
              Book Stay
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={clsx(
          "fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        {/* TOP */}
        <div className="flex h-[84px] items-center justify-between px-5">
          <span className="text-[11px] uppercase tracking-[0.35em] text-white/50">
            Menu
          </span>

          <button onClick={() => setMenuOpen(false)}>
            <HiX className="text-[30px] text-white" />
          </button>
        </div>

        {/* MOBILE LINKS */}
        <div className="flex h-[calc(100vh-84px)] flex-col items-center justify-center gap-8 px-6">
          {navItems.map((item) => (
            <a
              key={item}
              href="/"
              onClick={() => setMenuOpen(false)}
              className="group"
            >
              <span className="font-luxury text-[42px] font-[400] tracking-[0.08em] text-white transition-all duration-500 group-hover:text-[#C6A77D] md:text-[58px]">
                {item}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}