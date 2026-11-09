"use client";

import { useEffect } from "react";
import type confettiType from "canvas-confetti";

interface FireworksProps {
  isActive?: boolean;
  intensity?: "gentle" | "normal" | "epic";
}

// Ultra-vibrant festival color palette
const VIBRANT_CRACKER_COLORS = [
  "#ff007f", // Neon Hot Pink
  "#fee440", // Radiant Gold
  "#00f5d4", // Electric Turquoise
  "#00bbf9", // Sky Cyan
  "#f15bb5", // Vivid Magenta
  "#9b5de5", // Electric Violet
  "#ff5400", // Bright Fire Orange
  "#70e000", // Neon Lime
  "#ff0055", // Ruby Red
  "#ffffff", // Sparkling White
];

export default function Fireworks({ isActive = true, intensity = "epic" }: FireworksProps) {
  useEffect(() => {
    if (!isActive || typeof window === "undefined") return;

    let isMounted = true;
    let interval: NodeJS.Timeout | null = null;
    let crackleInterval: NodeJS.Timeout | null = null;

    import("canvas-confetti").then((module) => {
      if (!isMounted) return;
      const confetti = module.default;

      // 1. Grand Opening Fireworks & Cracker Barrage
      const count = intensity === "epic" ? 450 : 250;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio: number, opts: confettiType.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      // Layer 1: Wide High-Velocity Spark Burst
      fire(0.3, {
        spread: 35,
        startVelocity: 65,
        colors: ["#fee440", "#ff007f", "#00f5d4", "#9b5de5"],
      });

      // Layer 2: Flower Petal & Star Spread
      fire(0.25, {
        spread: 75,
        decay: 0.92,
        scalar: 1.1,
        colors: ["#ff5400", "#f15bb5", "#ffffff", "#70e000"],
      });

      // Layer 3: Giant Sky Cloud Burst
      fire(0.3, {
        spread: 120,
        decay: 0.9,
        scalar: 0.9,
        colors: VIBRANT_CRACKER_COLORS,
      });

      // Layer 4: Heavy Golden Sparklers Rain
      fire(0.15, {
        spread: 140,
        startVelocity: 40,
        decay: 0.94,
        scalar: 1.3,
        colors: ["#ffd700", "#ffb703", "#fb8500", "#ffffff"],
      });

      // 2. Continuous Multi-Stage Cracker Rockets & Aerial Explosions
      const duration = 25 * 1000;
      const animationEnd = Date.now() + duration;

      interval = setInterval(() => {
        if (!isMounted) {
          if (interval) clearInterval(interval);
          return;
        }

        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          if (interval) clearInterval(interval);
          return;
        }

        const particleCount = 50 * Math.max(0.4, timeLeft / duration);

        // Left cannon cracker burst
        confetti({
          particleCount,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.75 },
          colors: ["#ff007f", "#fee440", "#00f5d4", "#ff5400"],
          zIndex: 9999,
        });

        // Right cannon cracker burst
        confetti({
          particleCount,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.75 },
          colors: ["#9b5de5", "#00bbf9", "#70e000", "#f15bb5"],
          zIndex: 9999,
        });

        // Center Aerial Cracker Shell (Star Bomb)
        if (Math.random() > 0.3) {
          confetti({
            particleCount: 45,
            spread: 360,
            ticks: 80,
            gravity: 0.7,
            decay: 0.93,
            startVelocity: 35,
            origin: {
              x: 0.15 + Math.random() * 0.7,
              y: 0.15 + Math.random() * 0.45,
            },
            colors: VIBRANT_CRACKER_COLORS,
            zIndex: 9999,
          });
        }
      }, 380);

      // 3. Crackling Sparkles Rain (Small Rapid Cracker Sparks)
      crackleInterval = setInterval(() => {
        if (!isMounted) {
          if (crackleInterval) clearInterval(crackleInterval);
          return;
        }
        confetti({
          particleCount: 15,
          spread: 80,
          startVelocity: 20,
          ticks: 50,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.4,
          },
          colors: ["#ffffff", "#ffd700", "#ff007f"],
          zIndex: 9999,
        });
      }, 600);

      // 4. Interactive Click-to-Burst Crackers
      const handleUserClick = (e: MouseEvent) => {
        // Ignore if clicking on buttons or inputs
        const target = e.target as HTMLElement;
        if (target.closest("button") || target.closest("input") || target.closest("a")) return;

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        confetti({
          particleCount: 60,
          spread: 360,
          startVelocity: 30,
          origin: { x, y },
          colors: VIBRANT_CRACKER_COLORS,
          zIndex: 9999,
        });
      };

      window.addEventListener("click", handleUserClick);

      return () => {
        window.removeEventListener("click", handleUserClick);
      };
    });

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
      if (crackleInterval) clearInterval(crackleInterval);
    };
  }, [isActive, intensity]);

  return null;
}

/**
 * Supercharged Birthday Wish Cracker Explosion
 */
export async function triggerWishCelebration() {
  if (typeof window === "undefined") return;

  const module = await import("canvas-confetti");
  const confetti = module.default;

  const duration = 7 * 1000;
  const end = Date.now() + duration;

  // Initial Mega Flower & Cracker Blast
  confetti({
    particleCount: 220,
    spread: 120,
    origin: { y: 0.55 },
    colors: VIBRANT_CRACKER_COLORS,
    zIndex: 9999,
  });

  const interval: NodeJS.Timeout = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      startVelocity: 35,
      spread: 360,
      ticks: 90,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.5 + 0.1,
      },
      colors: VIBRANT_CRACKER_COLORS,
      zIndex: 9999,
    });
  }, 250);
}
