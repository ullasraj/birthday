"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
  personName?: string;
  heading?: string;
}

export default function PhotoGallery({
  photos,
  personName = "Keerthana",
  heading,
}: PhotoGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [srcOverrides, setSrcOverrides] = useState<Record<number, string>>({});

  const displayHeading = heading || `${personName}'s Beautiful Memories ❤️`;

  const getEffectiveSrc = (index: number, originalSrc: string) => {
    return srcOverrides[index] || originalSrc;
  };

  const handleImageError = (index: number, currentSrc: string) => {
    // If user saved as .jpg.jpeg on Windows, auto-retry with .jpeg extension
    if (!currentSrc.includes(".jpeg")) {
      const altSrc = `${currentSrc}.jpeg`;
      setSrcOverrides((prev) => ({ ...prev, [index]: altSrc }));
    } else {
      setFailedImages((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
  };

  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative w-full py-20 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <span className="text-sm font-semibold tracking-widest text-pink-400 uppercase flex items-center justify-center gap-2 mb-2">
          <Heart className="w-4 h-4 fill-pink-500" />
          Treasured Moments
          <Heart className="w-4 h-4 fill-pink-500" />
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold tracking-tight mb-3">
          {displayHeading}
        </h2>
        <p className="text-purple-200/80 text-base sm:text-lg max-w-xl mx-auto">
          Every picture holds a thousand smiles, endless grace, and moments to cherish forever.
        </p>
      </motion.div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((src, index) => {
          const isFailed = failedImages[index];
          const activeSrc = getEffectiveSrc(index, src);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/40 via-purple-950/60 to-black/80 border border-white/10 shadow-xl backdrop-blur-md aspect-[4/5] flex items-center justify-center"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-amber-500/0 group-hover:from-pink-500/40 group-hover:to-amber-500/40 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              {!isFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeSrc}
                  alt={`Memory ${index + 1}`}
                  onError={() => handleImageError(index, activeSrc)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                /* Fallback artistic card if image file is not found */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#24113e] to-[#120722] text-purple-200">
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-4 text-pink-400 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 fill-pink-500/40" />
                  </div>
                  <span className="font-serif text-lg font-medium text-white mb-1">
                    Special Memory #{index + 1}
                  </span>
                  <p className="text-xs text-purple-300/80 mb-3">
                    Add your photo to:
                  </p>
                  <code className="text-[11px] bg-black/40 px-2 py-1 rounded text-amber-300 font-mono">
                    {src}
                  </code>
                </div>
              )}

              {/* Overlay with Heart and Zoom on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="self-end p-2 rounded-full bg-black/50 backdrop-blur-md text-white/90">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between text-white">
                  <span className="text-sm font-medium tracking-wide">
                    Memory #{index + 1}
                  </span>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition z-50"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              {!failedImages[selectedPhotoIndex] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getEffectiveSrc(selectedPhotoIndex, photos[selectedPhotoIndex])}
                  alt={`Memory ${selectedPhotoIndex + 1}`}
                  className="w-full h-full max-h-[80vh] object-contain"
                />
              ) : (
                <div className="p-12 text-center bg-[#150a26] text-white">
                  <ImageIcon className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                  <p className="text-xl font-serif">Photo #{selectedPhotoIndex + 1}</p>
                  <p className="text-sm text-purple-300 mt-2">
                    Place image file in: {photos[selectedPhotoIndex]}
                  </p>
                </div>
              )}

              {/* Photo Caption / Counter */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center text-white text-sm font-medium">
                Memory {selectedPhotoIndex + 1} of {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
