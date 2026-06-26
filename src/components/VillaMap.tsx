"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Pin {
  id: string;
  name: string;
  desc: string;
  icon: string;
  x: string; // left %
  y: string; // top %
}

const PINS: Pin[] = [
  { id: "villa-utama",   name: "Villa Utama",      desc: "Villa induk 4 kamar tidur, ruang tamu & dapur privat",        icon: "🏛️", x: "18%", y: "62%" },
  { id: "kamar-a",       name: "Villa Kamar A",      desc: "Suite 1 kamar, king bed, kamar mandi outdoor",                icon: "🛏️", x: "32%", y: "45%" },
  { id: "kamar-b",       name: "Villa Kamar B",      desc: "Suite 1 kamar, twin bed, view sawah",                         icon: "🛏️", x: "48%", y: "38%" },
  { id: "pool",          name: "Kolam Renang",        desc: "Infinity pool 18m, buka 06.00–22.00",                         icon: "🏊", x: "62%", y: "50%" },
  { id: "spa",           name: "Spa & Wellness",      desc: "Treatment room, sauna, & cold plunge",                        icon: "🌸", x: "72%", y: "32%" },
  { id: "resto",         name: "Restoran",            desc: "Open-air dining, farm-to-table menu, sarapan inklusif",       icon: "🍽️", x: "55%", y: "68%" },
  { id: "toilet",        name: "Toilet Umum",         desc: "Fasilitas toilet & wastafel bersama",                         icon: "🚻", x: "40%", y: "72%" },
  { id: "parkir",        name: "Parkir",              desc: "Area parkir tamu, kapasitas 10 kendaraan",                    icon: "🅿️", x: "25%", y: "80%" },
  { id: "yoga",          name: "Yoga Pavilion",       desc: "Kelas yoga pagi & sore, matras tersedia",                     icon: "🧘", x: "78%", y: "58%" },
  { id: "resepsionis",   name: "Resepsionis",         desc: "Check-in/out, concierge & informasi",                         icon: "ℹ️", x: "85%", y: "42%" },
  { id: "danau",         name: "Danau Alami",         desc: "Natural spring bio-filtered lake, area duduk tepi danau",     icon: "💧", x: "12%", y: "42%" },
  { id: "jungle",        name: "Jungle Trail",        desc: "Jalur trekking hutan 1.2km, guided tour tersedia",            icon: "🌿", x: "68%", y: "78%" },
];

export default function VillaMap() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handlePin = (id: string) => {
    setActivePin((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setActivePin(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTooltipPosition = (pin: Pin) => {
    const x = parseFloat(pin.x);
    const y = parseFloat(pin.y);
    const side = x > 65 ? "right" : x < 25 ? "left" : "center";
    return { side, above: y > 30 };
  };

  return (
    <section className="relative bg-[#EDE8DF]">
      <div className="mx-auto w-full max-w-[1440px] py-16 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-8">
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[10px] uppercase tracking-[0.45em] text-[#C6A77D] mb-3"
        >
          Kembang Menoreh - Kulon Progo
        </p>
        <h2
          style={{ fontFamily: "'Noto Serif', serif" }}
          className="text-[40px] md:text-[56px] font-[400] leading-[1.05] text-[#2A2118]/80 mb-6"
        >
          Discover the Estate
          <br />
          From Above
        </h2>
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: "#C6A77D" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-[10px] uppercase tracking-[0.2em] text-white"
          >
            Tap an icon to explore
          </span>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ height: "clamp(360px, 55vw, 580px)" }}
        onClick={() => setActivePin(null)}
      >
        {/* Replace src with your actual map image */}
        <img
          src="/images/villa-map.jpeg"
          alt="Denah Villa"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Pins */}
        {PINS.map((pin) => {
          const isActive = activePin === pin.id;
          const { side, above } = getTooltipPosition(pin);

          return (
            <div
              key={pin.id}
              className="absolute"
              style={{ left: pin.x, top: pin.y, zIndex: isActive ? 30 : 10 }}
              onClick={(e) => {
                e.stopPropagation();
                handlePin(pin.id);
              }}
            >
              {/* Pulse ring */}
              {!isActive && (
                <span
                  className="absolute inset-0 rounded-full border-2 border-[#C6A77D] animate-ping"
                  style={{ animationDuration: "2.5s", opacity: 0.5 }}
                />
              )}

              {/* Pin button */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer border-2"
                style={{
                  background: isActive ? "#C6A77D" : "rgba(255,255,255,0.92)",
                  borderColor: "#C6A77D",
                }}
                aria-label={pin.name}
              >
                <span className="text-[15px] leading-none">{pin.icon}</span>
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: above ? 8 : -8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: above ? 8 : -8, scale: 0.92 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute z-40 rounded-xl p-3 w-52 pointer-events-none"
                    style={{
                      background: "#2A2118",
                      bottom: above ? "calc(100% + 10px)" : "auto",
                      top: above ? "auto" : "calc(100% + 10px)",
                      left: side === "right" ? "auto" : side === "left" ? "0" : "50%",
                      right: side === "right" ? "0" : "auto",
                      transform: side === "center" ? "translateX(-50%)" : "none",
                    }}
                  >
                    {/* Arrow */}
                    <div
                      className="absolute w-3 h-3 rotate-45"
                      style={{
                        background: "#2A2118",
                        bottom: above ? "-6px" : "auto",
                        top: above ? "auto" : "-6px",
                        left: side === "center" ? "50%" : side === "left" ? "20px" : "auto",
                        right: side === "right" ? "20px" : "auto",
                        transform: side === "center" ? "translateX(-50%)" : "none",
                      }}
                    />
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-[13px] font-[500] text-white mb-1 relative z-10"
                    >
                      {pin.name}
                    </p>
                    <p
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      className="text-[11px] text-[#C6A77D] leading-[1.55] relative z-10"
                    >
                      {pin.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
        {[
          { label: "Akomodasi" },
          { label: "Fasilitas" },
          { label: "Wellness & Alam" },
          { label: "Layanan" },
        ].map(({ label }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full border-2 border-[#C6A77D]"
              style={{ background: "transparent" }}
            />
            <span
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-[11px] text-[#7A6A58] tracking-[0.06em]"
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}