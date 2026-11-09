"use client";

import { useEffect, useRef } from "react";

interface FlowerShowerProps {
  isActive?: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  rotationX: number;
  rotationXSpeed: number;
  color: string;
  opacity: number;
  swaySpeed: number;
  swayAmount: number;
  swayOffset: number;
  type: "rose" | "marigold" | "jasmine" | "pink";
}

const PETAL_COLORS = {
  rose: ["#e11d48", "#be123c", "#f43f5e", "#9f1239", "#881337"],
  pink: ["#f472b6", "#ec4899", "#db2777", "#fda4af", "#ff69b4"],
  marigold: ["#fbbf24", "#f59e0b", "#d97706", "#fde047", "#ffaa00"],
  jasmine: ["#fff1f2", "#fdf4ff", "#fffbeb", "#fef3c7", "#ffffff"],
};

export default function FlowerShower({ isActive = true }: FlowerShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create 65 gentle tumbling petals
    const petalCount = 75;
    const petals: Petal[] = [];

    const types: ("rose" | "pink" | "marigold" | "jasmine")[] = [
      "rose",
      "rose",
      "pink",
      "pink",
      "marigold",
      "jasmine",
    ];

    for (let i = 0; i < petalCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const colorChoices = PETAL_COLORS[type];
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

      petals.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20, // Start above the screen
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.6 + 1.2,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        rotationX: Math.random() * Math.PI * 2,
        rotationXSpeed: (Math.random() - 0.5) * 0.05,
        color,
        opacity: Math.random() * 0.35 + 0.65,
        swaySpeed: Math.random() * 0.02 + 0.015,
        swayAmount: Math.random() * 2 + 1.5,
        swayOffset: Math.random() * Math.PI * 2,
        type,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      for (const p of petals) {
        // Natural fluttering movement
        p.y += p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmount + p.speedX;
        p.rotation += p.rotationSpeed;
        p.rotationX += p.rotationXSpeed;

        // Reset to top when falling past bottom
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        // Draw 3D curved flower petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(1, Math.cos(p.rotationX)); // 3D flip effect

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Draw organic teardrop/petal shape
        ctx.beginPath();
        if (p.type === "jasmine") {
          // Delicate oval blossom petal
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 0.9, 0, 0, Math.PI * 2);
        } else {
          // Curved rose/marigold petal
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(
            p.size * 0.8,
            -p.size * 0.6,
            p.size * 0.9,
            p.size * 0.4,
            0,
            p.size
          );
          ctx.bezierCurveTo(
            -p.size * 0.9,
            p.size * 0.4,
            -p.size * 0.8,
            -p.size * 0.6,
            0,
            -p.size
          );
        }
        ctx.closePath();
        ctx.fill();

        // Subtle petal highlight for 3D realism
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath();
        ctx.ellipse(
          -p.size * 0.15,
          -p.size * 0.2,
          p.size * 0.25,
          p.size * 0.4,
          -0.2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
}
