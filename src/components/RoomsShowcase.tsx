"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import RoomCheckoutPopup, { type Room } from "../components/RoomCheckoutPopup";

/* ── Data kamar — sesuaikan dengan data asli kamu ── */
const rooms: Room[] = [
  {
    id: "KM-01",
    title: "Jungle Villa",        // ← field title tetap untuk card display
    name: "Jungle Villa",
    category: "Private Villa",
    desc: "Private villa surrounded by dense tropical canopy.",
    description: "Private villa surrounded by dense tropical canopy.",
    image: "/images/room-1.webp",
    specs: ["2 Guests", "1 Bedroom", "Jungle View", "120 m²"],
    size: "120 m²",
    bed: "1 Bedroom",
    guests: "2 Guests",
    view: "Jungle View",
    floor: "Ground Floor",
    price: 4_200_000,
    perks: ["Breakfast for Two", "Private Pool", "Welcome Drink", "Late Check-out"],
  },
  {
    id: "KM-02",
    title: "Riverfront Suite",
    name: "Riverfront Suite",
    category: "Signature Suite",
    desc: "Wake up to flowing river sounds and soft light.",
    description: "Wake up to flowing river sounds and soft light.",
    image: "/images/room-2.webp",
    specs: ["2 Guests", "King Bed", "River View", "95 m²"],
    size: "95 m²",
    bed: "King Bed",
    guests: "2 Guests",
    view: "River View",
    floor: "2nd Floor",
    price: 2_800_000,
    perks: ["Breakfast for Two", "Welcome Drink", "Free Minibar"],
  },
  {
    id: "KM-03",
    title: "Cliffside Retreat",
    name: "Cliffside Retreat",
    category: "Retreat Room",
    desc: "Suspended escape overlooking endless valleys.",
    description: "Suspended escape overlooking endless valleys.",
    image: "/images/room-3.webp",
    specs: ["2 Guests", "Private Deck", "Valley View", "140 m²"],
    size: "140 m²",
    bed: "King Bed",
    guests: "2 Guests",
    view: "Valley View",
    floor: "3rd Floor",
    price: 1_200_000,
    perks: ["Breakfast for Two", "Private Terrace", "Welcome Drink"],
  },
  {
    id: "KM-04",
    title: "Forest Residence",
    name: "Forest Residence",
    category: "Family Residence",
    desc: "Minimalist living immersed in untouched nature.",
    description: "Minimalist living immersed in untouched nature.",
    image: "/images/room-4.webp",
    specs: ["4 Guests", "2 Bedrooms", "Forest View", "180 m²"],
    size: "180 m²",
    bed: "2 Bedrooms",
    guests: "4 Guests",
    view: "Forest View",
    floor: "1st Floor",
    price: 5_200_000,
    perks: ["Breakfast for Four", "Private Garden", "Welcome Drink", "Late Check-out", "Free Minibar"],
  },
];

const smoothEase: Easing = [0.22, 1, 0.36, 1];

export default function RoomsBooking() {
  // ── State untuk popup ──
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setPopupOpen(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#EFE8DE] pt-20 pb-20 md:pt-24 md:pb-24">
        {/* noise */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')]" />

        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
          {/* HEADER */}
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.45em] text-[#A88A63]">
              Residences
            </p>
            <h2
              style={{ fontFamily: "'Noto Serif', serif" }}
              className="text-[52px] md:text-[82px] leading-[0.95] text-[#2A2118]/80"
            >
              Stay in comfort,
              <br />
              designed for stillness
            </h2>
          </div>

          {/* CAROUSEL */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#EFE8DE] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#EFE8DE] to-transparent" />

            <motion.div
              drag="x"
              dragConstraints={{ left: -1200, right: 0 }}
              whileTap={{ cursor: "grabbing" }}
              className="flex w-max cursor-grab gap-6 px-5 md:px-0"
            >
              {rooms.map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: smoothEase }}
                  whileHover={{ y: -12 }}
                  className="group relative w-[320px] md:w-[420px] flex-shrink-0 overflow-hidden rounded-[34px] bg-white/40 backdrop-blur-xl"
                >
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.2 }}
                    className="h-[380px] w-full object-cover md:h-[420px]"
                  />

                  <div className="p-6 md:p-8">
                    <motion.h3
                      whileHover={{ x: 6 }}
                      style={{ fontFamily: "'Noto Serif', serif" }}
                      className="text-[34px] md:text-[44px] text-[#2A2118]"
                    >
                      {room.name}
                    </motion.h3>

                    <p className="mt-2 text-[14px] leading-[1.8] text-[#5F564D]">
                      {room.desc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {room.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full border border-[#C6A77D]/40 px-3 py-1 text-[11px] text-[#5F564D]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center justify-between">
                      <span className="text-[14px] text-[#2A2118]">
                        IDR{room.price.toLocaleString("id-ID")} / night
                      </span>

                      {/* ── BOOK NOW — trigger popup ── */}
                      <button
                        onClick={() => handleBookNow(room)}
                        className="group/btn relative overflow-hidden border border-[#C6A77D]/40 px-6 py-3"
                      >
                        <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover/btn:scale-x-100" />
                        <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#A88A63] transition-colors duration-700 group-hover/btn:text-black">
                          Book Now
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* EXPLORE ALL ROOMS */}
          <div className="mt-12 flex justify-center">
            <a href="/rooms" className="group relative overflow-hidden border border-[#2A2118]/40 px-8 py-4 inline-block">
              <div className="absolute inset-0 origin-left scale-x-0 bg-[#C6A77D] transition-transform duration-700 group-hover:scale-x-100" />
              <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] text-[#2A2118] transition-colors duration-700 group-hover:text-black">
                Explore All Rooms
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── POPUP — render di luar section supaya z-index bebas ── */}
      {selectedRoom && (
        <RoomCheckoutPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          room={selectedRoom}
        />
      )}
    </>
  );
}