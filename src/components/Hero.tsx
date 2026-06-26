import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/resort.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/15" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-[1440px] items-end px-5 pb-20 md:px-8 md:pb-24 lg:px-10">
          <div className="max-w-[760px]">
            {/* SMALL TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#D6C2A4]/80"
            >
              Kulon Progo · Yogyakarta
            </motion.p>

            {/* BIG TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4 }}
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-[48px] font-[400] leading-[0.9] tracking-[0.03em] text-[#F6E7D2] md:text-[78px] lg:text-[100px]"
            >
              Keramahaan Alam
              <br />
              Sisi Barat Jogja
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="mt-6 max-w-[520px] text-[15px] leading-[1.9] text-white/70 md:text-[17px]"
            >
              Hidden among lush tropical valleys and misty hills,
              Kembang Resort invites you into a slower rhythm of
              luxury, serenity, and timeless Javanese beauty.
            </motion.p>

            {/* BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-10"
            >
              <button className="group relative overflow-hidden border border-[#C6A77D]/40 px-8 py-4">
                <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />

                <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#C6A77D] transition-colors duration-700 group-hover:text-black">
                  Explore Resort
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.5 }}
        className="absolute bottom-8 right-5 hidden items-center gap-4 md:right-8 lg:right-10 xl:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">
          Scroll
        </span>

        <div className="h-[60px] w-[1px] overflow-hidden bg-white/10">
          <div className="animate-[scrollLine_2s_ease-in-out_infinite] h-[30px] w-full bg-[#C6A77D]" />
        </div>
      </motion.div>
    </section>
  );
}