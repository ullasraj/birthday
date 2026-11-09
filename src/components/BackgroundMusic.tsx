"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundMusicProps {
  musicSrc: string;
  autoPlayTrigger?: boolean;
}

export default function BackgroundMusic({ musicSrc, autoPlayTrigger = false }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Fallback Web Audio Synthesizer in case user hasn't added custom MP3 file yet
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const playSynthesizedMelody = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Simple sweet celebratory chord arpeggios
      const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 493.88, 587.33];
      let noteIndex = 0;

      const playTone = () => {
        if (!isPlaying && hasInteracted) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);
        noteIndex++;

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      };

      synthIntervalRef.current = setInterval(playTone, 800);
    } catch (e) {
      console.warn("Synth audio not supported:", e);
    }
  };

  const stopSynthesizedMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const attemptPlay = () => {
    if (!audioRef.current) return;

    if (audioFailed) {
      setIsPlaying(true);
      playSynthesizedMelody();
      setShowPrompt(false);
      return;
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowPrompt(false);
      })
      .catch((err) => {
        console.log("Autoplay waiting for direct interaction:", err);
        setShowPrompt(true);
      });
  };

  // When autoPlayTrigger turns true (celebration launched)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      attemptPlay();
    }
  }, [autoPlayTrigger]);

  // First interaction handler on window
  useEffect(() => {
    const handleFirstClick = () => {
      setHasInteracted(true);
      if (autoPlayTrigger && !isPlaying) {
        attemptPlay();
      }
    };

    window.addEventListener("click", handleFirstClick, { once: true });
    window.addEventListener("touchstart", handleFirstClick, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstClick);
      window.removeEventListener("touchstart", handleFirstClick);
    };
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !audioFailed) {
        audioRef.current.pause();
      }
      stopSynthesizedMelody();
      setIsPlaying(false);
    } else {
      attemptPlay();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleAudioError = () => {
    console.log("Custom MP3 not found. Switching to procedural celebratory chime fallback.");
    setAudioFailed(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        onError={handleAudioError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Music Pill Widget */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1.5 p-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl text-white"
        >
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 hover:brightness-110 text-white transition shadow-[0_0_15px_rgba(244,63,94,0.4)]"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
          </button>

          {/* Sound waves indicator */}
          <div className="px-2 flex items-center gap-1">
            <Music className={`w-3.5 h-3.5 ${isPlaying ? "text-pink-400" : "text-purple-300/60"}`} />
            <div className="flex items-end gap-0.5 h-4 w-6">
              {[0.4, 0.9, 0.6, 1, 0.3].map((height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying ? "bg-amber-400 animate-pulse" : "bg-purple-300/30 h-1"
                  }`}
                  style={{
                    height: isPlaying ? `${height * 100}%` : "3px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/10 text-purple-200 transition"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Gentle unblock prompt if browser autoplay was blocked */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={attemptPlay}
            className="fixed bottom-20 left-6 z-40 cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-900/95 via-pink-900/95 to-amber-900/95 border border-amber-400/50 backdrop-blur-md shadow-2xl text-amber-200 text-xs sm:text-sm font-medium hover:scale-105 transition"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Tap here to play birthday music 🎵</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
