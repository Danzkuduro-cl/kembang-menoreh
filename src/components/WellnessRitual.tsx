"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function WellnessRitual() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const imgY = useTransform(smooth, [0, 1], ["0%", "-20%"]);

  const revealWidth = useTransform(smooth, [0, 1], ["48%", "100%"]);
  const revealHeight = useTransform(smooth, [0, 1], ["52%", "100%"]);

  // Radius fixed px — bentuk tidak berubah sama sekali saat membesar
  const revealRadius = "9999px 9999px 0 0";

  const textOpacity = useTransform(smooth, [0, 0.25], [1, 0]);
  const textY = useTransform(smooth, [0, 0.25], [0, -50]);

  const labelOpacity = useTransform(smooth, [0.55, 0.8], [0, 1]);
  const labelY = useTransform(smooth, [0.55, 0.8], [40, 0]);
  const overlayOpacity = useTransform(smooth, [0, 0.8], [0.55, 0.15]);

  return (
    <section ref={ref} className="relative min-h-[180vh] bg-[#F7F3EE]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── BACKGROUND SOLID ── */}
        <div className="absolute inset-0 z-0 bg-[#F7F3EE]" />

        {/* ── TEXT ATAS ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 top-[10vh] z-20 flex flex-col items-center text-center px-6 pointer-events-none"
        >
          <span className="mb-4 inline-block text-[10px] uppercase tracking-[0.55em] text-[#C6A77D]">
            Wellness Ritual
          </span>
          <h2
            style={{ fontFamily: "'Noto Serif', serif" }}
            className="text-[48px] md:text-[76px] lg:text-[96px] font-[300] leading-[0.88] tracking-[0.01em] text-[#2A2118]"
          >
            Return to
            <br />
            <em className="not-italic text-[#C6A77D]">stillness.</em>
          </h2>
          <p className="mt-6 max-w-[420px] text-[14px] font-[300] leading-[2] text-[#2A2118]/50">
            Ancient healing rituals inspired by Javanese tradition, designed to
            slow time and restore balance.
          </p>
        </motion.div>

        {/* ── ARCH WINDOW ── */}
        <motion.div
          className="absolute bottom-0 left-1/2 overflow-hidden z-10"
          style={{
            width: revealWidth,
            height: revealHeight,
            borderRadius: revealRadius,
            x: "-50%",
          }}
        >
          <motion.img
            src="/images/wellness.webp"
            alt="Wellness Ritual"
            className="h-full w-full object-cover"
            style={{ y: imgY, scale: 1.08 }}
          />
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* ── LABEL BAWAH ── */}
        <motion.div
          style={{ opacity: labelOpacity, y: labelY }}
          className="absolute inset-x-0 bottom-14 z-30 flex flex-col items-center gap-5 pointer-events-auto"
        >
          <a href="/wellness" className="group relative overflow-hidden border border-[#2A2118]/40 px-8 py-4 inline-block">
            <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />
            <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#2A2118] transition-colors duration-700 group-hover:text-black">
              Explore Wellness
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}