"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";

const EASE: Easing = [0.22, 1, 0.36, 1];

export interface Room {
  title: string;
  desc: string;
  specs: string[];
  id: string;
  name: string;
  category: string;
  image: string;
  size: string;
  bed: string;
  guests: string;
  view: string;
  floor: string;
  price: number;
  perks: string[];
  description: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  room: Room;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const NIGHTS_OPTIONS = [1, 2, 3, 5, 7];

/* ── Payment Methods ── */
type PaymentCategory = "ewallet" | "va" | "card" | "qris";

interface PaymentMethod {
  id: string;
  name: string;
  category: PaymentCategory;
  logo: string; // inline SVG or emoji fallback text
  fee: number; // flat fee IDR
  feePercent?: number;
  note?: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    category: "qris",
    logo: "QRIS",
    fee: 0,
    note: "Semua dompet & bank",
  },
  {
    id: "gopay",
    name: "GoPay",
    category: "ewallet",
    logo: "GP",
    fee: 0,
    note: "Cashback tersedia",
  },
  {
    id: "ovo",
    name: "OVO",
    category: "ewallet",
    logo: "OVO",
    fee: 0,
    note: "OVO Points earned",
  },
  {
    id: "dana",
    name: "DANA",
    category: "ewallet",
    logo: "DANA",
    fee: 0,
    note: "Gratis biaya admin",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    category: "ewallet",
    logo: "SPay",
    fee: 0,
    note: "Koin Shopee berlaku",
  },
  {
    id: "bca-va",
    name: "BCA Virtual Account",
    category: "va",
    logo: "BCA",
    fee: 4500,
    note: "Transfer via ATM / m-BCA",
  },
  {
    id: "bri-va",
    name: "BRI Virtual Account",
    category: "va",
    logo: "BRI",
    fee: 4000,
    note: "Transfer via ATM / BRImo",
  },
  {
    id: "mandiri-va",
    name: "Mandiri Virtual Account",
    category: "va",
    logo: "MDR",
    fee: 4000,
    note: "Transfer via ATM / Livin'",
  },
  {
    id: "bni-va",
    name: "BNI Virtual Account",
    category: "va",
    logo: "BNI",
    fee: 4000,
    note: "Transfer via ATM / BNI Mobile",
  },
  {
    id: "permata-va",
    name: "Permata Virtual Account",
    category: "va",
    logo: "PMT",
    fee: 5000,
    note: "Transfer via ATM / PermataMobile",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    category: "card",
    logo: "MC",
    fee: 0,
    feePercent: 1.5,
    note: "Debit & Credit card",
  },
  {
    id: "visa",
    name: "Visa",
    category: "card",
    logo: "VISA",
    fee: 0,
    feePercent: 1.5,
    note: "Debit & Credit card",
  },
  {
    id: "amex",
    name: "American Express",
    category: "card",
    logo: "AMEX",
    fee: 0,
    feePercent: 2.0,
    note: "Credit card only",
  },
];

const CATEGORY_LABELS: Record<PaymentCategory, string> = {
  qris: "QRIS",
  ewallet: "E-Wallet",
  va: "Virtual Account",
  card: "Kartu Kredit / Debit",
};

/* Logo colors per method */
const LOGO_STYLES: Record<string, { bg: string; color: string; text: string }> = {
  QRIS: { bg: "#E30613", color: "#fff", text: "QRIS" },
  GP: { bg: "#00AED6", color: "#fff", text: "G" },
  OVO: { bg: "#4C3494", color: "#fff", text: "OVO" },
  DANA: { bg: "#118EEA", color: "#fff", text: "DANA" },
  SPay: { bg: "#EE4D2D", color: "#fff", text: "S" },
  BCA: { bg: "#006CB7", color: "#fff", text: "BCA" },
  BRI: { bg: "#003F87", color: "#fff", text: "BRI" },
  MDR: { bg: "#003F6B", color: "#EFBC30", text: "MDR" },
  BNI: { bg: "#F16522", color: "#fff", text: "BNI" },
  PMT: { bg: "#E4002B", color: "#fff", text: "PMT" },
  MC: { bg: "#252525", color: "#EB001B", text: "MC" },
  VISA: { bg: "#1A1F71", color: "#fff", text: "VISA" },
  AMEX: { bg: "#016FD0", color: "#fff", text: "AMEX" },
};

/* ── Small reusable components ── */

function LogoBadge({ logo }: { logo: string }) {
  const s = LOGO_STYLES[logo] ?? { bg: "#ccc", color: "#333", text: logo };
  return (
    <div
      style={{
        width: 44,
        height: 30,
        borderRadius: 6,
        background: s.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          color: s.color,
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        {s.text}
      </span>
    </div>
  );
}

/* ── STEP: payment selection ── */
function PaymentStep({
  grand,
  onSelect,
  onBack,
}: {
  grand: number;
  onSelect: (method: PaymentMethod) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const categories: PaymentCategory[] = ["qris", "ewallet", "va", "card"];

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === selected);
  const fee = selectedMethod
    ? selectedMethod.fee + Math.round(grand * ((selectedMethod.feePercent ?? 0) / 100))
    : 0;

  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: "92vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "28px 36px 20px",
          borderBottom: "1px solid rgba(180,140,80,0.15)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#A08060",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Kembali
        </button>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#1a1208",
            margin: 0,
          }}
        >
          Pilih Metode Pembayaran
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#A08060", margin: "6px 0 0" }}>
          Total tagihan: <strong style={{ color: "#1a1208" }}>{fmt(grand)}</strong>
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {/* Left: Method list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 36px 20px 36px" }}>
          {categories.map((cat) => {
            const methods = PAYMENT_METHODS.filter((m) => m.category === cat);
            return (
              <div key={cat} style={{ marginBottom: 24 }}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#B8956A",
                    marginBottom: 8,
                    marginTop: 0,
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {methods.map((m) => {
                    const isActive = selected === m.id;
                    const methodFee =
                      m.fee + Math.round(grand * ((m.feePercent ?? 0) / 100));
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelected(m.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 16px",
                          borderRadius: 14,
                          border: isActive
                            ? "1.5px solid #B8945A"
                            : "1px solid rgba(180,140,80,0.2)",
                          background: isActive
                            ? "rgba(184,148,90,0.08)"
                            : "rgba(255,255,255,0.6)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.18s ease",
                          width: "100%",
                        }}
                      >
                        <LogoBadge logo={m.logo} />
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 13,
                              fontWeight: 500,
                              color: "#1a1208",
                            }}
                          >
                            {m.name}
                          </p>
                          {m.note && (
                            <p
                              style={{
                                margin: "2px 0 0",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11,
                                color: "#A08060",
                              }}
                            >
                              {m.note}
                            </p>
                          )}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {methodFee === 0 ? (
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11,
                                fontWeight: 600,
                                color: "#5A9E6A",
                              }}
                            >
                              Gratis
                            </span>
                          ) : (
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11,
                                color: "#A08060",
                              }}
                            >
                              +{fmt(methodFee)}
                            </span>
                          )}
                        </div>
                        {/* Radio dot */}
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            border: isActive ? "5px solid #B8945A" : "1.5px solid rgba(180,140,80,0.4)",
                            background: isActive ? "#FAF7F2" : "transparent",
                            flexShrink: 0,
                            transition: "all 0.15s ease",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Order summary sticky */}
        <div
          style={{
            width: 280,
            flexShrink: 0,
            padding: "20px 28px",
            borderLeft: "1px solid rgba(180,140,80,0.12)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#B8956A",
              margin: 0,
            }}
          >
            Ringkasan Pesanan
          </p>

          {/* Summary rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["Subtotal", fmt(grand)],
              ["Biaya admin", selectedMethod ? (fee > 0 ? fmt(fee) : "Gratis") : "—"],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#A08060" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#1a1208" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(180,140,80,0.18)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#7A5C3A",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                color: "#1a1208",
              }}
            >
              {fmt(grand + fee)}
            </span>
          </div>

          {/* Security badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {["256-bit SSL Encryption", "PCI DSS Compliant", "Pembayaran Aman"].map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5A9E6A" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#A08060" }}>
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            disabled={!selected}
            onClick={() => selectedMethod && onSelect(selectedMethod)}
            style={{
              marginTop: "auto",
              padding: "14px",
              borderRadius: 14,
              border: "none",
              background: selected ? "#1a1208" : "rgba(180,140,80,0.15)",
              color: selected ? "#D6C2A4" : "rgba(122,92,58,0.4)",
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: selected ? "pointer" : "not-allowed",
              transition: "all 0.25s ease",
              width: "100%",
            }}
          >
            {selected ? "Bayar Sekarang" : "Pilih Metode"}
          </button>
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: "rgba(160,128,96,0.55)",
              margin: 0,
            }}
          >
            Batalkan gratis hingga 48 jam sebelum check-in
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── STEP: Processing & Success ── */
function PaymentProcessStep({
  method,
  grand,
  roomName,
  nights,
  guests,
  checkIn,
  onClose,
}: {
  method: PaymentMethod;
  grand: number;
  roomName: string;
  nights: number;
  guests: number;
  checkIn: string;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"processing" | "success">("processing");
  const fee =
    method.fee + Math.round(grand * ((method.feePercent ?? 0) / 100));
  const total = grand + fee;

  // Simulate processing
  useState(() => {
    const t = setTimeout(() => setPhase("success"), 2200);
    return () => clearTimeout(t);
  });

  const bookingCode =
    "LUX-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    "-" +
    Math.random().toString(36).substring(2, 5).toUpperCase();

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 520,
        padding: "clamp(40px, 6vw, 72px)",
        textAlign: "center",
      }}
    >
      <AnimatePresence mode="wait">
        {phase === "processing" ? (
          <motion.div
            key="proc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
          >
            {/* Spinner */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "2px solid rgba(180,140,80,0.15)",
                borderTop: "2px solid #B8945A",
                animation: "spin 0.9s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#1a1208",
                  margin: "0 0 6px",
                }}
              >
                Memproses Pembayaran
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#A08060",
                  margin: 0,
                }}
              >
                Menghubungi {method.name}…
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="succ"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "100%", maxWidth: 460 }}
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(90,158,106,0.1)",
                border: "1px solid rgba(90,158,106,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5A9E6A" strokeWidth="1.8" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5A9E6A",
                margin: "0 0 8px",
              }}
            >
              Pembayaran Berhasil
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 400,
                color: "#1a1208",
                margin: "0 0 6px",
              }}
            >
              {roomName}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#A08060",
                margin: "0 0 28px",
              }}
            >
              {nights} malam · {guests} tamu · {checkIn || "—"}
            </p>

            {/* Booking detail card */}
            <div
              style={{
                width: "100%",
                background: "rgba(180,140,80,0.05)",
                border: "1px solid rgba(180,140,80,0.18)",
                borderRadius: 18,
                padding: "20px 24px",
                marginBottom: 24,
              }}
            >
              {[
                ["Kode Booking", bookingCode],
                ["Metode Bayar", method.name],
                ["Total Dibayar", fmt(total)],
                ["Status", "Terkonfirmasi ✓"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(180,140,80,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#A08060",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: label === "Kode Booking" ? "'Inter', sans-serif" : "'Inter', sans-serif",
                      fontSize: label === "Kode Booking" ? 13 : 13,
                      fontWeight: label === "Kode Booking" ? 700 : 400,
                      color: label === "Status" ? "#5A9E6A" : "#1a1208",
                      letterSpacing: label === "Kode Booking" ? "0.08em" : 0,
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "#A08060",
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              E-voucher telah dikirim ke email Anda. Tunjukkan kode booking saat check-in.
            </p>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 14,
                border: "none",
                background: "#1a1208",
                color: "#D6C2A4",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
            >
              Selesai
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function RoomCheckoutPopup({ open, onClose, room }: Props) {
  const [nights, setNights] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState<"detail" | "confirm" | "payment" | "processing">("detail");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const total = room.price * nights;
  const tax = Math.round(total * 0.11);
  const grand = total + tax;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("detail");
      setSelectedPayment(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          style={{ background: "rgba(15, 10, 5, 0.65)", backdropFilter: "blur(6px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={handleClose}
        >
          <motion.div
            key="popup"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: step === "payment" ? "1100px" : "1440px",
              maxHeight: "92vh",
              borderRadius: "28px",
              background: "#FAF7F2",
              boxShadow: "0 60px 160px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              transition: "max-width 0.4s ease",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 z-20 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                width: 36, height: 36,
                background: "rgba(26,18,8,0.06)",
                border: "1px solid rgba(26,18,8,0.08)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" stroke="#4a3728" strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {/* ── STEP: Detail ── */}
              {step === "detail" && (
                <motion.div
                  key="detail"
                  className="flex flex-col lg:flex-row overflow-auto"
                  style={{ maxHeight: "92vh" }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {/* LEFT — Photo */}
                  <div className="relative lg:w-[52%] shrink-0" style={{ minHeight: "320px" }}>
                    <img
                      src={room.image}
                      alt={room.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ borderRadius: "28px 0 0 28px" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, rgba(15,10,5,0.7) 0%, transparent 55%)",
                        borderRadius: "28px 0 0 28px",
                      }}
                    />
                    <div
                      className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.35em]"
                      style={{
                        background: "rgba(250,247,242,0.15)",
                        border: "1px solid rgba(250,247,242,0.28)",
                        backdropFilter: "blur(10px)",
                        color: "#FAF7F2",
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {room.category}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: "#C8A97E" }}>
                        {room.id}
                      </p>
                      <h2
                        className="leading-none mb-4"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(32px, 4vw, 52px)",
                          fontWeight: 400,
                          color: "#FAF7F2",
                        }}
                      >
                        {room.name}
                      </h2>
                      <div className="flex flex-wrap gap-x-5 gap-y-1">
                        {[room.size, room.bed, room.view, room.floor].map((s) => (
                          <span key={s} className="text-[11px] uppercase tracking-[0.25em]" style={{ color: "rgba(250,247,242,0.65)" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — Detail & Form */}
                  <div className="flex-1 overflow-y-auto flex flex-col" style={{ padding: "clamp(28px, 4vw, 52px)" }}>
                    <p
                      className="leading-relaxed mb-8"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(15px, 1.4vw, 17px)",
                        color: "#6B5744",
                        fontStyle: "italic",
                        maxWidth: "480px",
                      }}
                    >
                      {room.description}
                    </p>

                    <div className="h-[1px] mb-8" style={{ background: "rgba(180,155,120,0.2)" }} />

                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.4em", marginBottom: 16, color: "#A08060" }}>
                      What's Included
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.perks.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1.5 rounded-full"
                          style={{
                            background: "rgba(180,140,80,0.08)",
                            border: "1px solid rgba(180,140,80,0.2)",
                            color: "#7A5C3A",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="h-[1px] mb-8" style={{ background: "rgba(180,155,120,0.2)" }} />

                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.4em", marginBottom: 20, color: "#A08060" }}>
                      Reservation Details
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 8, color: "#A08060" }}>
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{
                            background: "rgba(180,140,80,0.06)",
                            border: "1px solid rgba(180,140,80,0.18)",
                            color: "#3a2a1a",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 8, color: "#A08060" }}>
                          Guests
                        </label>
                        <div
                          className="flex items-center justify-between px-4 py-3 rounded-xl"
                          style={{ background: "rgba(180,140,80,0.06)", border: "1px solid rgba(180,140,80,0.18)" }}
                        >
                          <button onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(180,140,80,0.15)" }}>
                            <span style={{ color: "#7A5C3A", fontSize: "16px", lineHeight: 1 }}>−</span>
                          </button>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#3a2a1a" }}>
                            {guests} {guests === 1 ? "Guest" : "Guests"}
                          </span>
                          <button onClick={() => setGuests(Math.min(4, guests + 1))}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "rgba(180,140,80,0.15)" }}>
                            <span style={{ color: "#7A5C3A", fontSize: "16px", lineHeight: 1 }}>+</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 12, color: "#A08060" }}>
                        Duration
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {NIGHTS_OPTIONS.map((n) => (
                          <button
                            key={n}
                            onClick={() => setNights(n)}
                            className="px-4 py-2 rounded-full transition-all duration-200"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              fontWeight: 500,
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                              background: nights === n ? "#1a1208" : "rgba(180,140,80,0.06)",
                              border: nights === n ? "1px solid #1a1208" : "1px solid rgba(180,140,80,0.18)",
                              color: nights === n ? "#D6C2A4" : "#7A5C3A",
                            }}
                          >
                            {n} {n === 1 ? "Night" : "Nights"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className="rounded-2xl p-5 mb-6"
                      style={{ background: "rgba(180,140,80,0.06)", border: "1px solid rgba(180,140,80,0.14)" }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#A08060" }}>
                          {fmt(room.price)} × {nights} {nights === 1 ? "night" : "nights"}
                        </span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#3a2a1a" }}>
                          {fmt(total)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "#A08060" }}>
                          Tax &amp; Service (11%)
                        </span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#3a2a1a" }}>
                          {fmt(tax)}
                        </span>
                      </div>
                      <div className="h-[1px] mb-4" style={{ background: "rgba(180,140,80,0.2)" }} />
                      <div className="flex justify-between items-center">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "#7A5C3A" }}>Total</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 600, color: "#1a1208" }}>
                          {fmt(grand)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("confirm")}
                      className="w-full py-4 rounded-2xl transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        background: "#1a1208",
                        color: "#D6C2A4",
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        border: "none",
                      }}
                    >
                      Proceed to Payment
                    </button>
                    <p style={{ textAlign: "center", marginTop: 12, fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(160,128,96,0.6)" }}>
                      Free cancellation up to 48 hours before check-in
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Confirm ── */}
              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  className="flex flex-col items-center justify-center text-center overflow-auto"
                  style={{ minHeight: "480px", padding: "clamp(40px, 6vw, 80px)" }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div
                    className="flex items-center justify-center rounded-full mb-8"
                    style={{ width: 72, height: 72, background: "rgba(180,140,80,0.1)", border: "1px solid rgba(180,140,80,0.25)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B8945A" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.35em", marginBottom: 12, color: "#A08060" }}>
                    Reservation Summary
                  </p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#1a1208", marginBottom: 8 }}>
                    {room.name}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6B5744", marginBottom: 32 }}>
                    {nights} nights · {guests} guests · {checkIn || "—"}
                  </p>
                  <div className="w-full max-w-md rounded-2xl p-6 mb-8 text-left" style={{ background: "rgba(180,140,80,0.06)", border: "1px solid rgba(180,140,80,0.16)" }}>
                    {[["Room", room.name], ["Duration", `${nights} nights`], ["Guests", `${guests}`], ["Check-in", checkIn || "—"], ["Total", fmt(grand)]].map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center py-2.5 border-b last:border-b-0" style={{ borderColor: "rgba(180,140,80,0.12)" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em", color: "#A08060" }}>{label}</span>
                        <span style={{ fontFamily: value === fmt(grand) ? "'Cormorant Garamond', serif" : "'Inter', sans-serif", fontSize: 14, color: "#1a1208" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <button onClick={() => setStep("detail")}
                      className="flex-1 py-4 rounded-2xl transition-all duration-200"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", background: "transparent", border: "1px solid rgba(180,140,80,0.3)", color: "#7A5C3A" }}>
                      Back
                    </button>
                    <button
                      onClick={() => setStep("payment")}
                      className="flex-1 py-4 rounded-2xl transition-all duration-300 hover:opacity-90"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: "#1a1208", color: "#D6C2A4", border: "none" }}>
                      Pilih Pembayaran →
                    </button>
                  </div>
                  <p style={{ marginTop: 16, fontFamily: "'Inter', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(160,128,96,0.55)" }}>
                    Secure payment · 256-bit SSL
                  </p>
                </motion.div>
              )}

              {/* ── STEP: Payment ── */}
              {step === "payment" && (
                <PaymentStep
                  key="payment"
                  grand={grand}
                  onSelect={(method) => {
                    setSelectedPayment(method);
                    setStep("processing");
                  }}
                  onBack={() => setStep("confirm")}
                />
              )}

              {/* ── STEP: Processing / Success ── */}
              {step === "processing" && selectedPayment && (
                <PaymentProcessStep
                  key="processing"
                  method={selectedPayment}
                  grand={grand}
                  roomName={room.name}
                  nights={nights}
                  guests={guests}
                  checkIn={checkIn}
                  onClose={handleClose}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}