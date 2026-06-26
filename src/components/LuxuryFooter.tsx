"use client";

import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function LuxuryFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#16110D] text-[#EFE8DE]">

      {/* NOISE */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/noise.png')]" />

      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#C6A77D]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-24 md:px-8 lg:px-10">

        {/* TOP */}
        <div className="grid gap-16 border-b border-white/10 pb-16 lg:grid-cols-[1.3fr_.8fr_.8fr_.9fr]">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: smoothEase }}
          >
            <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[#C6A77D]">
              Kembang Resort
            </p>

            <h2 className="font-luxury text-[42px] leading-[0.92] md:text-[64px]">
              A retreat
              <br />
              shaped by
              <br />
              stillness.
            </h2>

            <p className="mt-7 max-w-[420px] text-[14px] leading-[2] text-white/60">
              Hidden within tropical landscapes, Kembang Resort
              invites you to reconnect with nature, silence, and
              meaningful rest.
            </p>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: smoothEase,
            }}
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Navigation
            </p>

            <div className="space-y-4">
              {[
                "Experience",
                "Rooms",
                "Wellness",
                "Destination",
                "Gallery",
              ].map((item) => (
                <a
                  key={item}
                  href="/"
                  className="group flex w-fit items-center gap-2 text-[15px] text-white/70 transition hover:text-white"
                >
                  <span>{item}</span>

                  <span className="translate-x-[-6px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: smoothEase,
            }}
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Contact
            </p>

            <div className="space-y-4 text-[14px] leading-[2] text-white/70">
              <p>
                reservations@kembangresort.com
              </p>

              <p>
                +62 812 3456 7890
              </p>

              <p>
                Kulon Progo, Yogyakarta
                <br />
                Indonesia
              </p>
            </div>
          </motion.div>

          {/* NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: smoothEase,
            }}
          >
            <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Stay Connected
            </p>

            <p className="mb-5 text-[14px] leading-[2] text-white/60">
              Receive occasional updates, seasonal offers,
              and curated experiences.
            </p>

            {/* INPUT */}
            <div className="flex items-center border-b border-white/20 pb-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-[14px] text-white placeholder:text-white/30 focus:outline-none"
              />

              <button className="text-[11px] uppercase tracking-[0.25em] text-[#C6A77D] transition hover:text-white">
                Join
              </button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: smoothEase,
          }}
          className="flex flex-col items-center justify-between gap-6 pt-8 text-center md:flex-row md:text-left"
        >
          <p className="text-[12px] tracking-[0.2em] text-white/35">
            © 2026 Kembang Resort. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Instagram", "Facebook", "Pinterest"].map((item) => (
              <a
                key={item}
                href="/"
                className="text-[12px] tracking-[0.2em] text-white/35 transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}