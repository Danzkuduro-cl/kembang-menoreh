import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.22, 1, 0.36, 1];

export default function VideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Top text: starts from far LEFT → moves to RIGHT
  const topX = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);
  // Bottom text: starts from far RIGHT → moves to LEFT
  const bottomX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsHovering(false);
    setTimeout(() => videoRef.current?.play(), 650);
  };

  const handleClose = () => {
    setIsOpen(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  // Track cursor position globally
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-20"
      style={{ background: "#F7F4EE" }}
    >
      {/* ── CUSTOM CURSOR CAPSULE ── */}
      {isHovering && !isOpen && (
        <motion.div
          className="fixed z-[9999] pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            translate: "16px -50%",
            background: "rgba(26, 18, 8, 0.88)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(198,167,125,0.25)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 22,
              height: 22,
              background: "rgba(198,167,125,0.15)",
              border: "1px solid rgba(198,167,125,0.35)",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="#C6A77D">
              <path d="M6 4l14 8-14 8V4z" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "#D6C2A4",
              whiteSpace: "nowrap",
            }}
          >
            Play Video
          </span>
        </motion.div>
      )}

      {/* ── SCROLLING BACKGROUND TEXT ── */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 select-none overflow-hidden"
        aria-hidden
      >
        <motion.p
          style={{
            x: topX,
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(80px, 13vw, 180px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "#C8B99A",
            opacity: 0.22,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Kembang Menoreh
        </motion.p>

        <motion.p
          style={{
            x: bottomX,
            fontFamily: "'Noto Serif', serif",
            fontSize: "clamp(80px, 13vw, 180px)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "#C8B99A",
            opacity: 0.18,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Hotel &amp; Resort
        </motion.p>
      </div>

      {/* ── CARD ── */}
      <div className="relative z-10 flex items-center justify-center px-5">
        <motion.div
          onClick={isOpen ? undefined : handleOpen}
          onMouseEnter={() => !isOpen && setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          animate={
            isOpen
              ? {
                  width: "min(1440px, 96vw)",
                  height: "min(810px, 54vw)",
                  borderRadius: "20px",
                }
              : {
                  width: "min(620px, 88vw)",
                  height: "90vh",
                  borderRadius: "9999px 9999px 24px 24px",
                }
          }
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden"
          style={{
            cursor: isOpen ? "default" : "none",
            background: "#1a1208",
            boxShadow: isOpen
              ? "0 40px 120px rgba(0,0,0,0.28)"
              : "0 28px 80px rgba(0,0,0,0.18)",
          }}
        >
          {/* VIDEO */}
          <video
            ref={videoRef}
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.5s ease 0.3s",
            }}
          >
            <source src="/videos/resort.mp4" type="video/mp4" />
          </video>

          {/* POSTER / THUMBNAIL — with photo */}
          <div
            className="absolute inset-0 h-full w-full"
            style={{
              opacity: isOpen ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* Foto thumbnail — ganti src sesuai path foto kamu */}
            <img
              src="/images/resort-thumbnail.jpg"
              alt="Kembang Menoreh"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center" }}
            />
            {/* Overlay gelap supaya card tetap moody */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,18,8,0.18) 0%, rgba(26,18,8,0.55) 100%)",
              }}
            />
          </div>

          {/* CLOSE BUTTON */}
          {isOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
              style={{ width: 40, height: 40 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </motion.div>
      </div>

      {/* ── BOTTOM LABEL ── */}
      <motion.div
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 10 : 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <p
          style={{ fontFamily: "'Noto Serif', serif" }}
          className="text-[13px] uppercase tracking-[0.35em] text-[#8B7355]"
        >
          Kembang Menoreh
        </p>
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#8B7355]/60">
          A short film
        </p>
      </motion.div>
    </section>
  );
}