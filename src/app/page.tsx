"use client";

import { useEffect, useState, useCallback } from "react";
import { BirthdayConfig } from "@/types/birthday";
import { loadBirthdayConfig, DEFAULT_CONFIG } from "@/lib/config";
import { useCountdown } from "@/hooks/useCountdown";
import Countdown from "@/components/Countdown";
import BirthdayCelebration from "@/components/BirthdayCelebration";
import AdminPreview from "@/components/AdminPreview";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function BirthdayPage() {
  const [config, setConfig] = useState<BirthdayConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Load configuration from /data/birthday.json
  const refreshConfig = useCallback(async () => {
    try {
      const data = await loadBirthdayConfig();
      setConfig(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshConfig();
  }, [refreshConfig]);

  // Countdown and celebration trigger logic
  const {
    timeRemaining,
    isCelebration,
    manualPreview,
    hasCustomTestTimestamp,
    triggerPreviewCelebration,
    returnToCountdown,
    setQuickTestCountdown,
    resetToOriginalConfig,
  } = useCountdown({ config });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#06030c] text-white">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-pink-500 mb-4"
        >
          <Heart className="w-10 h-10 fill-pink-500" />
        </motion.div>
        <p className="text-sm tracking-widest text-purple-200/80 font-light flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Preparing something magical...
        </p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-[#06030c]">
      <AnimatePresence mode="wait">
        {!isCelebration ? (
          <motion.div
            key="countdown-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(10px)",
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
          >
            <Countdown config={config} timeRemaining={timeRemaining} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration-screen"
            initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 1.5, ease: "easeOut" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <BirthdayCelebration config={config} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Testing & Preview Controls */}
      {config.celebration.allowPreview && (
        <AdminPreview
          config={config}
          isCelebration={isCelebration}
          manualPreview={manualPreview}
          hasCustomTestTimestamp={hasCustomTestTimestamp}
          onTriggerPreview={triggerPreviewCelebration}
          onReturnToCountdown={returnToCountdown}
          onSetQuickTest={setQuickTestCountdown}
          onResetToOriginal={resetToOriginalConfig}
          onReloadConfig={refreshConfig}
        />
      )}
    </main>
  );
}
