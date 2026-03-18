"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

/* ── Spring configs (taste-skill: spring physics, nem linear) ──────── */
const springReveal = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 1,
};

const springFast = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
  mass: 0.8,
};

/* ── Reveal — scroll-triggered spring animáció ────────────────────── */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 40,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, x: offset.x, y: offset.y, filter: "blur(6px)" }
      }
      transition={{
        ...springReveal,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container + item — taste-skill: staggerChildren 0.08-0.15 */
interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: springFast,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── FadeIn — egyszerű opacity + scale animáció ──────────────────── */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{
        ...springReveal,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
