"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BirthdayMessage as BirthdayMessageType } from "@/types/birthday";
import { Sparkles, Heart, Quote, RotateCcw } from "lucide-react";

interface BirthdayMessageProps {
  messageData: BirthdayMessageType;
  personName: string;
}

export default function BirthdayMessage({ messageData, personName }: BirthdayMessageProps) {
  const fullText = messageData.message;
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [speed, setSpeed] = useState(25); // ms per character

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [fullText, speed]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsTypingComplete(true);
  };

  const handleReplay = () => {
    setDisplayedText("");
    setIsTypingComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, speed);
  };

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-rose-600/10 via-purple-600/15 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full mx-auto relative group"
      >
        {/* Glowing border effect */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500/30 via-amber-400/30 to-purple-600/30 blur-lg group-hover:blur-xl transition duration-500" />

        {/* Card Content */}
        <div className="relative rounded-3xl bg-[#130728]/85 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 shadow-2xl text-white overflow-hidden">
          {/* Subtle watermark quote icon */}
          <Quote className="absolute right-6 bottom-6 w-32 h-32 text-purple-500/5 pointer-events-none" />

          {/* Top Header Badge */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-pink-400">
              <Heart className="w-5 h-5 fill-pink-500" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase">
                A Letter Just For You
              </span>
            </div>

            <div className="flex items-center gap-3">
              {!isTypingComplete ? (
                <button
                  onClick={handleSkipTyping}
                  className="text-xs text-purple-300 hover:text-white px-2.5 py-1 rounded-full bg-white/5 border border-white/10 transition"
                >
                  Skip typing
                </button>
              ) : (
                <button
                  onClick={handleReplay}
                  className="flex items-center gap-1 text-xs text-purple-300 hover:text-white px-2.5 py-1 rounded-full bg-white/5 border border-white/10 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 mb-6">
            {messageData.heading || `Happy Birthday, ${personName}!`}
          </h3>

          {/* Message Body with Typewriter Effect */}
          <div className="min-h-[140px] text-base sm:text-lg text-purple-100/90 leading-relaxed font-light whitespace-pre-line">
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="inline-block w-2 h-5 ml-1 bg-amber-400 translate-y-1 align-baseline"
              />
            )}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0.6 }}
            transition={{ duration: 0.5 }}
            className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-amber-300 font-serif italic text-lg sm:text-xl">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{messageData.signature || "With lots of love ❤️"}</span>
            </div>

            <span className="text-xs text-purple-300/60 font-mono tracking-wider">
              Forever celebrating you
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
