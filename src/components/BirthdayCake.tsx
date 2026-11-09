"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Flame } from "lucide-react";
import { triggerWishCelebration } from "./Fireworks";

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWishMade(true);
    // Trigger epic wish fireworks explosion
    triggerWishCelebration();
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[450px] h-[450px] bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto mb-10"
      >
        <span className="text-sm font-semibold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" />
          Interactive Birthday Ritual
          <Sparkles className="w-4 h-4" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold tracking-tight mb-4">
          Blow Out The Candles! 🎂
        </h2>
        <p className="text-purple-200/90 text-base sm:text-lg">
          {wishMade
            ? "Your wish is sent to the stars! ✨"
            : "Close your eyes, make a wish, and blow out the candles! ❤️"}
        </p>
      </motion.div>

      {/* Cake Container */}
      <div className="relative w-72 sm:w-80 h-72 flex flex-col items-center justify-end select-none">
        {/* Cake Stand */}
        <div className="absolute -bottom-4 w-64 sm:w-72 h-6 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 rounded-full shadow-[0_10px_30px_rgba(251,191,36,0.3)] z-0" />
        <div className="absolute -bottom-10 w-24 h-8 bg-gradient-to-b from-amber-300 to-amber-500 rounded-b-xl z-0 shadow-lg" />
        <div className="absolute -bottom-12 w-44 h-4 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 rounded-full z-0" />

        {/* Candles Group */}
        <div className="relative z-20 flex justify-center gap-6 sm:gap-8 mb-[-4px]">
          {[1, 2, 3].map((candleIndex) => (
            <div key={candleIndex} className="relative flex flex-col items-center">
              {/* Flame / Smoke */}
              <AnimatePresence>
                {candlesLit ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.15, 0.95, 1.05],
                      rotate: [0, -2, 2, 0],
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.2,
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + candleIndex * 0.15,
                      ease: "easeInOut",
                    }}
                    className="relative flex items-center justify-center mb-1"
                  >
                    {/* Flame Glow */}
                    <div className="absolute w-8 h-8 bg-amber-400/50 rounded-full blur-md" />
                    {/* Flame Core */}
                    <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 rounded-full shadow-[0_0_12px_#fbbf24] animate-flame" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
                    animate={{ opacity: 0, y: -25, scale: 1.6 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-3 h-5 bg-white/40 rounded-full blur-[2px] mb-1"
                  />
                )}
              </AnimatePresence>

              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-stone-700" />

              {/* Candle Body */}
              <div
                className={`w-3.5 h-12 rounded-t-sm shadow-md bg-gradient-to-b ${
                  candleIndex === 1
                    ? "from-pink-400 to-rose-500"
                    : candleIndex === 2
                    ? "from-amber-300 to-yellow-500"
                    : "from-purple-400 to-indigo-500"
                } border-t border-white/40`}
              >
                {/* Candle spiral stripes */}
                <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,#fff,#fff_2px,transparent_2px,transparent_6px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Tier 1 (Top Layer) */}
        <div className="relative z-10 w-44 sm:w-48 h-20 rounded-t-2xl bg-gradient-to-b from-rose-300 via-pink-400 to-pink-500 shadow-xl overflow-hidden border-t-2 border-pink-200">
          {/* Frosting drips */}
          <div className="absolute top-0 inset-x-0 h-5 bg-white rounded-b-xl shadow-sm flex justify-around">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-4 h-5 bg-white rounded-b-full shadow-sm" />
            ))}
          </div>
          {/* Decorative Pearls / Strawberries */}
          <div className="absolute bottom-2 inset-x-0 flex justify-around px-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xs">🍓</span>
            ))}
          </div>
        </div>

        {/* Tier 2 (Bottom Layer) */}
        <div className="relative z-10 w-56 sm:w-64 h-24 rounded-t-3xl bg-gradient-to-b from-purple-800 via-purple-900 to-[#1e0a3c] shadow-2xl overflow-hidden border-t-2 border-purple-400/40">
          {/* Cream Drip */}
          <div className="absolute top-0 inset-x-0 h-6 bg-pink-100 rounded-b-2xl shadow-md flex justify-around">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-5 h-6 bg-pink-100 rounded-b-full shadow-sm" />
            ))}
          </div>
          {/* Gold Sparkle sprinkles */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:12px_12px]" />
          {/* Heart Decors */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-4 text-pink-400">
            <Heart size={14} fill="currentColor" />
            <Heart size={16} fill="currentColor" />
            <Heart size={14} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Action Button & Wish Outcome Message */}
      <div className="mt-12 flex flex-col items-center gap-4 z-20">
        {candlesLit ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBlowCandles}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:shadow-[0_0_45px_rgba(251,191,36,0.7)] transition-all duration-300"
          >
            <Flame className="w-5 h-5 text-amber-200 animate-bounce" />
            <span>Make a Wish!</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/80 via-purple-950/80 to-pink-950/80 border border-pink-500/40 backdrop-blur-md shadow-2xl">
              <p className="text-xl sm:text-2xl font-serif text-amber-300 font-bold tracking-wide flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>May all your wishes come true!</span>
                <Sparkles className="w-6 h-6 text-amber-400" />
              </p>
              <p className="text-pink-200 text-sm mt-1">
                Your heart&apos;s deepest desires have been blessed today. ❤️
              </p>
            </div>

            <button
              onClick={handleRelight}
              className="text-xs text-purple-300/80 hover:text-white underline decoration-dotted transition"
            >
              Want to make another wish? Re-light candles
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
