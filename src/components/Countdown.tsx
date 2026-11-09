"use client";

import { motion } from "framer-motion";
import { BirthdayConfig, CountdownTimeRemaining } from "@/types/birthday";
import { padZero } from "@/lib/dateUtils";
import { Sparkles, Heart, Clock, Stars } from "lucide-react";
import { useMemo } from "react";

interface CountdownProps {
  config: BirthdayConfig;
  timeRemaining: CountdownTimeRemaining;
}

export default function Countdown({ config, timeRemaining }: CountdownProps) {
  const { countdown, birthdayPerson } = config;

  // Background floating stars / particles
  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: (i * 29) % 100,
      y: (i * 47) % 100,
      size: (i % 3) + 2,
      duration: 3 + (i % 5) * 1.5,
      delay: (i % 4) * 0.7,
    }));
  }, []);

  const timeUnits = [
    {
      label: "Days",
      value: padZero(timeRemaining.days),
      show: countdown.showDays,
    },
    {
      label: "Hours",
      value: padZero(timeRemaining.hours),
      show: countdown.showHours,
    },
    {
      label: "Minutes",
      value: padZero(timeRemaining.minutes),
      show: countdown.showMinutes,
    },
    {
      label: "Seconds",
      value: padZero(timeRemaining.seconds),
      show: countdown.showSeconds,
    },
  ].filter((u) => u.show);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#06030c] via-[#120726] to-[#090214] text-white px-4 py-12 select-none">
      {/* Radial soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/30 via-pink-600/20 to-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-[350px] h-[350px] bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Animated Particles / Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/70 shadow-[0_0_8px_#ffffff]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
              y: ["0px", "-15px", "0px"],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-rose-500/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          >
            <Heart size={20 + i * 4} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-purple-950/40 backdrop-blur-md text-pink-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(244,63,94,0.15)] mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>A Magical Celebration Awaits</span>
          <Stars className="w-4 h-4 text-pink-400" />
        </motion.div>

        {/* Main Heading & Mysterious Teasers */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-5xl font-extralight tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)] mb-3"
        >
          Something Special Is Waiting For You...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg sm:text-2xl font-light text-pink-300/90 mb-12 flex items-center justify-center gap-2"
        >
          <span>Your Special Day Is Almost Here</span>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline animate-bounce" />
        </motion.p>

        {/* Countdown Timer Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl px-2"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              whileHover={{ scale: 1.04, translateY: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
            >
              {/* Outer Glow Ring */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 opacity-30 group-hover:opacity-75 blur transition duration-500" />

              {/* Glassmorphic Card */}
              <div className="relative flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-[#120824]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Subtle shine line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />

                <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(244,63,94,0.6)] font-mono">
                  {unit.value}
                </span>

                <span className="mt-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-pink-300/80">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Small Bottom Mystery Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base text-purple-200/80 italic font-light">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Stay here... Something magical is about to happen!</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-300/60 mt-2 font-mono">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>
              Target: {birthdayPerson.birthdayDate} {birthdayPerson.birthdayTime} ({birthdayPerson.timezone})
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
