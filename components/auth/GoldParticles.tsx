"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

interface GoldParticlesProps {
  count?: number;
}

export function GoldParticles({
  count = 22,
}: GoldParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from(
      { length: count },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 60,
      })
    );

    setParticles(generatedParticles);
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-soft"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            bottom: "-10px",
          }}
          initial={{
            y: 0,
            opacity: 0,
          }}
          animate={{
            y: [0, -420],
            opacity: [0, 0.8, 0],
            x: [0, p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}