"use client";

import { motion } from "framer-motion";

const drawEase = [0.65, 0, 0.35, 1] as const;

export function RotundaSignature() {
  const columns = [-140, -95, -50, 50, 95, 140];

  return (
    <svg viewBox="0 0 400 260" className="h-full w-full overflow-visible" fill="none">
      {/* outer arc */}
      <motion.path
        d="M 60 190 A 140 140 0 0 1 340 190"
        stroke="url(#archGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: drawEase, delay: 0.2 }}
      />
      {/* inner arc */}
      <motion.path
        d="M 90 190 A 110 110 0 0 1 310 190"
        stroke="url(#archGold)"
        strokeWidth="1"
        strokeOpacity={0.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: drawEase, delay: 0.5 }}
      />
      {/* columns */}
      {columns.map((x, i) => (
        <motion.line
          key={x}
          x1={200 + x}
          y1={190}
          x2={200 + x}
          y2={230}
          stroke="url(#archGold)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: drawEase, delay: 1.1 + i * 0.08 }}
        />
      ))}
      {/* chandelier center — glows in after the arch is drawn */}
      <motion.circle
        cx={200}
        cy={150}
        r={4}
        fill="#DCC79A"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2, ease: "easeOut" }}
      />
      <motion.circle
        cx={200}
        cy={150}
        r={4}
        fill="#DCC79A"
        initial={{ opacity: 0.9, scale: 1 }}
        animate={{ opacity: 0, scale: 9 }}
        transition={{ duration: 2, delay: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 2.5 }}
      />

      <defs>
        <linearGradient id="archGold" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#AC8A52" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#DCC79A" />
          <stop offset="100%" stopColor="#AC8A52" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
