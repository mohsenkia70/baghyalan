"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Wraps a section and exposes its own scroll progress (0 → 1 as the section
 * crosses the viewport) so children can drive true scroll-linked parallax,
 * rather than a one-shot "fade in when visible" reveal.
 */
export function ScrollScene({
  children,
  className,
}: {
  children: (progress: MotionValue<number>) => React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={className}>
      {children(scrollYProgress)}
    </div>
  );
}

export function useSectionReveal(progress: MotionValue<number>) {
  const y = useTransform(progress, [0, 0.35, 0.65, 1], [80, 0, 0, -60]);
  const opacity = useTransform(progress, [0, 0.28, 0.72, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.35, 1], [0.94, 1, 1.03]);
  return { y, opacity, scale };
}

export { motion, ease };
