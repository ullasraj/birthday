"use client";

import { motion } from "framer-motion";
import { BirthdayConfig } from "@/types/birthday";
import Fireworks from "./Fireworks";
import FlowerShower from "./FlowerShower";
import BirthdayCake from "./BirthdayCake";
import BirthdayMessage from "./BirthdayMessage";
import PhotoGallery from "./PhotoGallery";
import VideoGallery from "./VideoGallery";
import BackgroundMusic from "./BackgroundMusic";
import { Sparkles, Heart, Crown, Gift, Stars } from "lucide-react";

interface BirthdayCelebrationProps {
  config: BirthdayConfig;
}

export default function BirthdayCelebration({ config }: BirthdayCelebrationProps) {
  const { birthdayPerson, birthdayMessage, media, features } = config;
  const heroPhoto = media.photos && media.photos.length > 0 ? media.photos[0] : null;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#090214] via-[#15042a] via-[#1d0738] to-[#080210] text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* Spectacular Fireworks & Firecrackers */}
      {features.fireworks && <Fireworks isActive={true} intensity="epic" />}

      {/* Romantic Flower & Rose Petal Shower */}
      <FlowerShower isActive={true} />

      {/* Background Birthday Music */}
      {features.backgroundMusic && (
        <BackgroundMusic musicSrc={media.backgroundMusic} autoPlayTrigger={true} />
      )}

      {/* Rich Multi-Color Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-gradient-to-b from-pink-500/25 via-purple-600/20 via-amber-400/15 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] bg-gradient-to-bl from-rose-500/20 via-amber-400/20 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[700px] h-[500px] bg-gradient-to-t from-fuchsia-600/15 via-indigo-600/15 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Colorful Floating Balloons, Hearts & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[
          { color: "text-rose-500 fill-rose-500/30", icon: "heart", size: 28, left: 8, top: 15 },
          { color: "text-amber-400", icon: "sparkle", size: 26, left: 88, top: 20 },
          { color: "text-pink-400 fill-pink-400/30", icon: "heart", size: 34, left: 18, top: 45 },
          { color: "text-cyan-400", icon: "sparkle", size: 24, left: 82, top: 55 },
          { color: "text-purple-400 fill-purple-400/30", icon: "heart", size: 30, left: 12, top: 78 },
          { color: "text-yellow-300", icon: "balloon", size: 32, left: 92, top: 82 },
          { color: "text-emerald-400", icon: "sparkle", size: 22, left: 28, top: 30 },
          { color: "text-rose-400", icon: "balloon", size: 30, left: 72, top: 12 },
          { color: "text-indigo-400", icon: "sparkle", size: 26, left: 65, top: 70 },
          { color: "text-fuchsia-400 fill-fuchsia-400/30", icon: "heart", size: 26, left: 35, top: 88 },
        ].map((item, i) => (
          <motion.div
            key={`float-bg-${i}`}
            className="absolute"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
            }}
            animate={{
              y: [0, -32, 0],
              x: [0, i % 2 === 0 ? 14 : -14, 0],
              rotate: [0, i % 2 === 0 ? 18 : -18, 0],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          >
            {item.icon === "heart" ? (
              <Heart size={item.size} className={`${item.color} filter drop-shadow-[0_0_12px_currentColor]`} />
            ) : item.icon === "sparkle" ? (
              <Sparkles size={item.size} className={`${item.color} filter drop-shadow-[0_0_12px_currentColor]`} />
            ) : (
              <span className="text-3xl select-none filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">🎈</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center">
        {/* HERO CELEBRATION SECTION */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-16 relative">
          {/* Royal Festive Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border border-amber-300/60 bg-gradient-to-r from-amber-500/30 via-pink-500/30 via-purple-500/30 to-cyan-500/30 backdrop-blur-xl text-amber-200 text-sm sm:text-base font-semibold tracking-wider shadow-[0_0_35px_rgba(251,191,36,0.4)] mb-6"
          >
            <Crown className="w-5 h-5 text-amber-300 animate-bounce" />
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 bg-clip-text text-transparent font-bold">
              {birthdayPerson.title || `Happy Birthday, ${birthdayPerson.name}!`}
            </span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
          </motion.div>

          {/* Grand Happy Birthday Headline with Rainbow Metallic Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-200 via-rose-300 via-purple-300 to-cyan-300 drop-shadow-[0_4px_40px_rgba(244,63,94,0.6)] mb-3">
              🎉 HAPPY BIRTHDAY! 🎂
            </h1>

            {/* Glowing Royal Portrait Frame of Keerthana */}
            {heroPhoto && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.35, type: "spring", bounce: 0.45 }}
                className="relative my-7 group"
              >
                {/* Multi-layered Glowing Rainbow Halos */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500 via-amber-400 via-emerald-400 via-cyan-400 to-purple-600 blur-2xl opacity-80 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-300 via-rose-400 to-yellow-200 opacity-90 blur-sm" />

                <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-amber-300 shadow-[0_0_50px_rgba(251,191,36,0.7)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroPhoto}
                    alt={birthdayPerson.name}
                    className="w-full h-full object-cover object-top hover:scale-108 transition duration-700"
                  />
                </div>

                {/* Floating Festive Heart Badge */}
                <div className="absolute bottom-1 right-3 p-3.5 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 border-2 border-white shadow-[0_0_20px_rgba(244,63,94,0.7)]">
                  <Heart className="w-6 h-6 text-white fill-white animate-bounce" />
                </div>
              </motion.div>
            )}

            {/* Keerthana's Name in Glowing Script */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-2 mb-4"
            >
              <span className="text-5xl sm:text-7xl md:text-8xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-rose-300 via-pink-400 to-cyan-300 font-bold drop-shadow-[0_0_35px_rgba(251,191,36,0.8)]">
                {birthdayPerson.name}
              </span>
            </motion.div>

            {/* "Today is all about YOU!" Subhead */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-2xl sm:text-4xl font-light text-pink-200/95 tracking-wide flex items-center justify-center gap-3 drop-shadow-[0_2px_15px_rgba(244,63,94,0.4)]"
            >
              <span>Today is all about YOU!</span>
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 inline animate-bounce" />
            </motion.p>

            {/* Interactive Cracker Tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-purple-200/70 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Tap anywhere on screen to burst colorful firecrackers! ✨</span>
            </motion.div>
          </motion.div>

          {/* Scroll Down Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-2 text-purple-300/80 text-xs sm:text-sm tracking-widest uppercase font-medium"
          >
            <span>Scroll for your surprises</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-9 rounded-full border-2 border-pink-400/50 flex items-start justify-center p-1"
            >
              <div className="w-1.5 h-2.5 bg-gradient-to-b from-pink-400 to-amber-400 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* PERSONAL MESSAGE SECTION */}
        {features.secretMessage && (
          <BirthdayMessage
            messageData={birthdayMessage}
            personName={birthdayPerson.name}
          />
        )}

        {/* PHOTO MEMORIES GALLERY */}
        {features.photoGallery && (
          <PhotoGallery
            photos={media.photos}
            personName={birthdayPerson.name}
          />
        )}

        {/* VIDEO SURPRISE SECTION */}
        {features.videoGallery && (
          <VideoGallery videos={media.videos} />
        )}

        {/* INTERACTIVE BIRTHDAY CAKE */}
        {features.birthdayCake && (
          <BirthdayCake />
        )}

        {/* FOOTER WISH */}
        <footer className="w-full py-16 px-4 text-center border-t border-white/10 mt-16 bg-black/50 backdrop-blur-md">
          <div className="max-w-md mx-auto flex flex-col items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse" />
            <p className="font-serif text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 font-semibold">
              Made with infinite love for {birthdayPerson.name}
            </p>
            <p className="text-xs text-purple-300/80 font-mono">
              A magical, vibrant, one-day celebration to remember forever. ✨
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
