import { motion } from "framer-motion";

// Add this to your global CSS or index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

const activities = [
  {
    title: "Sunrise Yoga",
    desc: "Begin each morning in stillness — open-air pavilion, misty rice fields, guided breathwork.",
    image: "/images/activity-yoga.avif",
  },
  {
    title: "Forest Trekking",
    desc: "Wander trails woven between ancient trees and hidden streams with our local guides.",
    image: "/images/activity-trek.webp",
  },
  {
    title: "Javanese Kitchen",
    desc: "Grind spices by hand, plate with banana leaves — tradition lives in every dish you create.",
    image: "/images/activity-cooking.jpg",
  },
  {
    title: "Infinity Pool",
    desc: "Sink into our hillside pool, cradled by tropical greenery and the hum of cicadas.",
    image: "/images/activity-pool.jpg",
  },
  {
    title: "River Meditation",
    desc: "Let the sound of flowing water carry you into a deeper, quieter version of yourself.",
    image: "/images/activity-river.jpg",
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function ResortPursuits() {
  return (
    <section className="relative overflow-hidden bg-[#EFE8DE] pt-28 pb-0 md:pt-36 md:pb-0">
      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('/images/noise.png')]" />

      {/* GLOW */}
      <div className="absolute left-[-120px] top-20 h-[260px] w-[260px] rounded-full bg-[#C6A77D]/10 blur-3xl" />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 lg:flex-row lg:gap-0">
        {/* LEFT TEXT */}
        <div className="relative z-10 w-full px-5 md:px-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:items-center lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(18px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1, ease: smoothEase }}
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#A88A63]">
              At Kembang Resort
            </p>

            <h2
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-[52px] font-[300] leading-[0.88] tracking-[0.015em] text-[#2A2118]/80 md:text-[76px] lg:text-[92px]"
            >
              What you
              <br />
              can do
              <br />
              here.
            </h2>

            <p className="mt-8 max-w-[560px] text-[16px] font-[300] leading-[2] text-[#5F564D]">
              From quiet morning rituals to immersive cultural journeys
              — every activity at Kembang is an invitation to slow
              down and truly arrive.
            </p>
          </motion.div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative w-full overflow-hidden lg:w-[58%]">
          {/* LEFT FADE */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-full w-24 bg-gradient-to-r from-[#EFE8DE] to-transparent lg:block" />

          {/* TRACK */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -1400, right: 0 }}
            whileTap={{ cursor: "grabbing" }}
            className="flex w-max cursor-grab gap-6 px-5 md:px-8 lg:px-0 lg:pr-10"
          >
            {activities.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 100, scale: 0.96, filter: "blur(18px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1, delay: index * 0.08, ease: smoothEase }}
                whileHover={{ y: -10 }}
                className="group relative h-[520px] w-[320px] flex-shrink-0 overflow-hidden rounded-[34px] md:h-[620px] md:w-[430px]"
              >
                {/* IMAGE */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.4, ease: smoothEase }}
                  className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

                {/* GOLD GLOW ON HOVER */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute bottom-[-120px] right-[-60px] h-[260px] w-[260px] rounded-full bg-[#C6A77D]/20 blur-3xl" />
                </div>

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
                  <div>
                    <motion.h3
                      style={{ fontFamily: "'Noto Serif', serif" }}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                      className="text-[40px] font-[400] leading-[0.95] tracking-[0.02em] text-[#F6E7D2] md:text-[58px]"
                    >
                      {item.title}
                    </motion.h3>

                    <p className="mt-5 max-w-[420px] text-[15px] font-[300] leading-[2] text-white/70">
                      {item.desc}
                    </p>

                    {/* EXPLORE BUTTON */}
                    <div className="mt-7">
                      <a
                        href={`/activities/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className="group/act relative inline-block overflow-hidden border border-[#C6A77D]/40 px-6 py-3"
                      >
                        <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover/act:scale-x-100" />
                        <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#D6C2A4] transition-colors duration-700 group-hover/act:text-black">
                          Explore
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}