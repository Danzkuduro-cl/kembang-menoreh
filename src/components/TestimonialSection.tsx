import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "There are no words adequate to describe the beauty of this place. Every corner of the resort radiates true tranquility — as if time stopped just for us.",
    name: "Raffi Ahmad",
    origin: "Jakarta · Indonesia",
    stay: "3 Nights · Valley Room",
    imgLeft: "/images/testi-left-1.jpg",
    imgRight: "/images/testi-right-1.jpg",
  },
  {
    id: 2,
    quote:
      "Kembang Resort is where luxury blends seamlessly with nature. The stillness of the hills, the whisper of wind through the trees — an experience never to be forgotten.",
    name: "Amanda Rawles",
    origin: "New South Wales · Australia",
    stay: "5 Nights · Private Villa",
    imgLeft: "/images/testi-left-2.webp",
    imgRight: "/images/testi-right-2.jpg",
  },
  {
    id: 3,
    quote:
      "The service was so genuine and personal. The staff truly understand what Javanese hospitality means — warm, sincere, and deeply attentive to every detail.",
    name: "Gading Marten",
    origin: "Jakarta · Indonesia",
    stay: "4 Nights · Hillside Suite",
    imgLeft: "/images/testi-left-3.jpg",
    imgRight: "/images/testi-right-3.jpg",
  },
  {
    id: 4,
    quote:
      "From breakfast overlooking the valley to a breathtaking sunset by the pool, every moment here felt like a living painting.",
    name: "Ariel Noah",
    origin: "Bandung · Indonesia",
    stay: "7 Nights · Valley Villa",
    imgLeft: "/images/testi-left-4.jpg",
    imgRight: "/images/testi-right-4.jpg",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const t = testimonials[current];

  const goTo = (index: number, dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const prev = () =>
    goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => goTo((current + 1) % testimonials.length, 1);

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const cardLeft: Variants = {
    closed: { x: "0%", y: "0%", rotate: 0, transition: { duration: 0 } },
    open: {
      x: "-100%",
      y: "-12%",
      rotate: -15,
      transition: { duration: 1.6, ease: EASE },
    },
  };
  const cardRight: Variants = {
    closed: { x: "0%", y: "0%", rotate: 0, transition: { duration: 0 } },
    open: {
      x: "100%",
      y: "12%",
      rotate: 15,
      transition: { duration: 1.6, ease: EASE },
    },
  };

  const textReveal: Variants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, delay: 0.65, ease: EASE },
    },
  };

  const slide: Variants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 28 : -28 }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: EASE },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -28 : 28,
      transition: { duration: 0.4, ease: EASE },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0C0B09] py-28 md:py-36 lg:py-44"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #C6A77D 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-5 text-center text-[11px] uppercase tracking-[0.45em] text-[#D6C2A4]/60"
        >
          Guest Stories
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.25 }}
          style={{ fontFamily: "'Noto Serif', serif" }}
          className="mb-16 w-full text-center text-[42px] font-[400] leading-[0.9] tracking-[0.03em] text-[#F6E7D2] md:text-[60px] lg:text-[76px]"
        >
          Voices of
          <br />
          Those Who
          <br />
          Stayed
        </motion.h2>

        {/* Stage */}
        <div className="relative h-[640px] w-full md:h-[700px] lg:h-[740px]">

          {/* Text layer */}
          <motion.div
            variants={textReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center px-8 text-center"
              >
                <span
                  style={{ fontFamily: "'Noto Serif', serif" }}
                  className="mb-1 block select-none text-[100px] leading-none text-[#C6A77D]/12 md:text-[130px]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote
                  style={{ fontFamily: "'Noto Serif', serif" }}
                  className="max-w-[420px] text-[16px] font-[400] leading-[1.85] tracking-[0.01em] text-[#F6E7D2]/80 md:text-[19px] lg:text-[21px]"
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="my-6 h-[1px] w-10 bg-[#C6A77D]/40" />
                <p className="text-[13px] uppercase tracking-[0.25em] text-[#F6E7D2]">
                  {t.name}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.35em] text-[#D6C2A4]/50">
                  {t.origin}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#C6A77D]/55">
                  {t.stay}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Card Left */}
          <motion.div
            key={`cl-${current}`}
            variants={cardLeft}
            initial="closed"
            animate={isInView ? "open" : "closed"}
            className="absolute"
            style={{
              zIndex: 2,
              left: "50%",
              top: "50%",
              marginLeft: "-280px",
              marginTop: "-210px",
              width: "260px",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              transformOrigin: "bottom right",
            }}
          >
            <img
              src={t.imgLeft}
              alt={`${t.name} left`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Card Right */}
          <motion.div
            key={`cr-${current}`}
            variants={cardRight}
            initial="closed"
            animate={isInView ? "open" : "closed"}
            className="absolute"
            style={{
              zIndex: 2,
              left: "50%",
              top: "50%",
              marginLeft: "20px",
              marginTop: "-190px",
              width: "260px",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              transformOrigin: "bottom left",
            }}
          >
            <img
              src={t.imgRight}
              alt={`${t.name} right`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Nav Prev */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            onClick={prev}
            aria-label="Previous testimonial"
            className="group absolute left-3 top-1/2 z-10 -translate-y-1/2 overflow-hidden border border-[#C6A77D]/30 p-3.5 transition-all duration-500 hover:border-[#C6A77D]/70 md:left-5"
          >
            <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
              className="relative z-10 text-[#C6A77D] transition-all duration-500 group-hover:-translate-x-0.5 group-hover:text-black"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </motion.button>

          {/* Nav Next */}
          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            onClick={next}
            aria-label="Next testimonial"
            className="group absolute right-3 top-1/2 z-10 -translate-y-1/2 overflow-hidden border border-[#C6A77D]/30 p-3.5 transition-all duration-500 hover:border-[#C6A77D]/70 md:right-5"
          >
            <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
              className="relative z-10 text-[#C6A77D] transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-black"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative h-[1px] overflow-hidden bg-[#C6A77D]/15 transition-all duration-500"
                style={{ width: i === current ? "44px" : "16px" }}
              >
                <div
                  className={`absolute inset-0 origin-left bg-[#C6A77D] transition-all duration-500 ${
                    i === current ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-[11px] uppercase tracking-[0.4em] text-[#D6C2A4]/35">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 flex justify-center"
        >
          <button className="group relative overflow-hidden border border-[#C6A77D]/40 px-8 py-4">
            <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />
            <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#C6A77D] transition-colors duration-700 group-hover:text-black">
              Read All Reviews
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}