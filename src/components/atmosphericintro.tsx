import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function AtmosphericIntro() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EE] py-28 md:py-36">
      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('/images/noise.png')]" />

      {/* GLOW */}
      <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-[#C6A77D]/10 blur-3xl" />

      <div className="absolute bottom-20 right-20 h-[220px] w-[220px] rounded-full bg-[#C6A77D]/10 blur-3xl" />

      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        <div className="grid items-center gap-24 lg:grid-cols-12">
          {/* IMAGES */}
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.25,
            }}
            transition={{
              duration: 1.2,
              ease: smoothEase,
            }}
            className="relative flex h-[620px] items-center justify-center lg:col-span-5"
          >
            {/* IMAGE 1 */}
            <motion.div
              initial={{
                opacity: 0,
                y: 120,
                rotate: -12,
                scale: 0.9,
                filter: "blur(18px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: -6,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{
                once: false,
                amount: 0.35,
              }}
              transition={{
                duration: 1.3,
                ease: smoothEase,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  duration: 0.6,
                  ease: smoothEase,
                },
              }}
              className="absolute left-0 top-0 w-[240px] overflow-hidden rounded-[34px] shadow-[0_40px_90px_rgba(0,0,0,0.14)] md:w-[300px]"
            >
              <img
                src="/images/resort-1.webp"
                alt=""
                className="h-[420px] w-full object-cover transition-transform duration-[2500ms] hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* IMAGE 2 */}
            <motion.div
              initial={{
                opacity: 0,
                y: 140,
                rotate: 12,
                scale: 0.9,
                filter: "blur(18px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 6,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{
                once: false,
                amount: 0.35,
              }}
              transition={{
                duration: 1.5,
                delay: 0.08,
                ease: smoothEase,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  duration: 0.6,
                  ease: smoothEase,
                },
              }}
              className="absolute bottom-0 right-0 w-[240px] overflow-hidden rounded-[34px] shadow-[0_40px_90px_rgba(0,0,0,0.14)] md:w-[300px]"
            >
              <img
                src="/images/resort-2.webp"
                alt=""
                className="h-[420px] w-full object-cover transition-transform duration-[2500ms] hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* CONTENT */}
          <div className="relative lg:col-span-7">
            {/* LABEL */}
            <motion.p
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(12px)",
                letterSpacing: "0.6em",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0.45em",
              }}
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                duration: 1,
                ease: smoothEase,
              }}
              className="mb-6 text-[11px] uppercase tracking-[0.45em] text-[#A88A63]"
            >
              About Kembang
            </motion.p>

            {/* TITLE */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 100,
                filter: "blur(24px)",
                letterSpacing: "0.08em",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0.015em",
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 1.35,
                ease: smoothEase,
              }}
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-[52px] font-[400] leading-[0.88] tracking-[0.015em] text-[#2A2118]/80 md:text-[76px] lg:text-[98px]"
            >
              A sanctuary shaped
              <br />
              by silence, earth,
              <br />
              and tropical light.
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
                filter: "blur(14px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: false,
                amount: 0.35,
              }}
              transition={{
                duration: 1.15,
                delay: 0.12,
                ease: smoothEase,
              }}
              className="mt-10 space-y-6 md:ml-16"
            >
              <p className="max-w-[620px] text-[16px] font-[300] leading-[2] text-[#5F564D]">
                Hidden among the serene landscapes of Kulon Progo,
                Kembang Resort is an intimate retreat where modern
                luxury meets the timeless rhythm of nature.
              </p>

              <p className="max-w-[620px] text-[16px] font-[300] leading-[2] text-[#5F564D]">
                Inspired by tropical architecture and the warmth of
                Javanese hospitality, every space is designed to
                invite stillness, connection, and quiet wonder.
              </p>
            </motion.div>

            {/* BUTTON */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                duration: 1,
                delay: 0.18,
                ease: smoothEase,
              }}
              className="mt-14 md:ml-16"
            >
              <button className="group relative overflow-hidden border border-[#C6A77D]/30 px-8 py-4">
                <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />

                <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#A88A63] transition-colors duration-700 group-hover:text-black">
                  Discover Story
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}