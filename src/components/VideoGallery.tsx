"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Film, Maximize2, Sparkles, Volume2, VolumeX } from "lucide-react";

interface VideoGalleryProps {
  videos: string[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [failedVideos, setFailedVideos] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoError = (index: number) => {
    setFailedVideos((prev) => ({ ...prev, [index]: true }));
  };

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex]?.pause();
      }
      video.play().catch((err) => console.log("Play error:", err));
      setPlayingIndex(index);
    }
  };

  const toggleFullscreen = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  if (!videos || videos.length === 0) return null;

  // Helper to detect if a link is a Google Drive URL
  const getGoogleDriveEmbed = (url: string) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_\-]+)/);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return null;
  };

  return (
    <section className="relative w-full py-20 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <span className="text-sm font-semibold tracking-widest text-amber-400 uppercase flex items-center justify-center gap-2 mb-2">
          <Film className="w-4 h-4 text-amber-400" />
          Cinematic Moments
          <Sparkles className="w-4 h-4 text-amber-400" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold tracking-tight mb-3">
          A Little Surprise For You 🎬
        </h2>
        <p className="text-purple-200/80 text-base sm:text-lg max-w-xl mx-auto">
          Sweet memories, heartwarming messages, and videos made with all my love.
        </p>
      </motion.div>

      {/* Videos Grid */}
      <div className={`grid gap-8 ${videos.length === 1 ? "max-w-2xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
        {videos.map((src, index) => {
          const isFailed = failedVideos[index];
          const isPlaying = playingIndex === index;
          const gdriveEmbed = getGoogleDriveEmbed(src);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group rounded-3xl overflow-hidden bg-gradient-to-b from-[#180a33] to-[#0c0419] border border-white/10 shadow-2xl"
            >
              {/* Outer Card Glow */}
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-amber-500/20 group-hover:from-purple-600/40 group-hover:to-amber-500/40 opacity-50 blur transition duration-500 pointer-events-none" />

              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                {gdriveEmbed ? (
                  /* Google Drive Embedded Player */
                  <iframe
                    src={gdriveEmbed}
                    allow="autoplay; fullscreen"
                    className="w-full h-full border-0"
                    title={`Surprise Video ${index + 1}`}
                  />
                ) : !isFailed ? (
                  /* Local MP4 Player */
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={src}
                    playsInline
                    controls
                    preload="metadata"
                    onError={() => handleVideoError(index)}
                    onEnded={() => setPlayingIndex(null)}
                    onPlay={() => setPlayingIndex(index)}
                    onPause={() => {
                      if (playingIndex === index) setPlayingIndex(null);
                    }}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1c0a35] to-[#0a0314] text-purple-200">
                    <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-3 text-amber-400">
                      <Film className="w-7 h-7" />
                    </div>
                    <span className="font-serif text-lg font-semibold text-white mb-1">
                      Birthday Surprise Video #{index + 1}
                    </span>
                    <p className="text-xs text-purple-300/80 mb-2">
                      Place your video file in:
                    </p>
                    <code className="text-xs bg-black/50 px-2.5 py-1 rounded text-amber-300 font-mono">
                      {src}
                    </code>
                  </div>
                )}
              </div>

              {/* Video Bottom Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between bg-[#110722]/90 backdrop-blur-md border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
                    <Film className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Birthday Surprise Video
                    </h4>
                    <span className="text-xs text-purple-300/70">
                      Special Video For Keerthana ❤️
                    </span>
                  </div>
                </div>

                {!gdriveEmbed && !isFailed && (
                  <button
                    onClick={() => toggleFullscreen(index)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
