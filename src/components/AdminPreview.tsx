"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirthdayConfig } from "@/types/birthday";
import {
  Settings,
  Sparkles,
  RotateCcw,
  Play,
  Clock,
  RefreshCw,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

interface AdminPreviewProps {
  config: BirthdayConfig;
  isCelebration: boolean;
  manualPreview: boolean;
  hasCustomTestTimestamp: boolean;
  onTriggerPreview: () => void;
  onReturnToCountdown: () => void;
  onSetQuickTest: (seconds?: number) => void;
  onResetToOriginal: () => void;
  onReloadConfig: () => void;
}

export default function AdminPreview({
  config,
  isCelebration,
  manualPreview,
  hasCustomTestTimestamp,
  onTriggerPreview,
  onReturnToCountdown,
  onSetQuickTest,
  onResetToOriginal,
  onReloadConfig,
}: AdminPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);

  const handleConfirmReset = () => {
    onResetToOriginal();
    setShowResetConfirm(false);
  };

  return (
    <>
      {/* Floating Toggle Button (Discreet Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative p-3 rounded-full bg-gradient-to-tr from-purple-900 to-indigo-950 border border-purple-400/30 text-purple-200 shadow-2xl backdrop-blur-xl hover:text-white hover:border-pink-500/50 transition group"
          title="Admin & Preview Controls"
          aria-label="Open Admin and Preview Controls"
        >
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          {(manualPreview || hasCustomTestTimestamp) && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          )}
        </motion.button>
      </div>

      {/* Floating Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] rounded-3xl bg-[#110624]/95 border border-purple-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white p-6 overflow-hidden select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-serif font-bold text-lg text-white">
                  Preview & Testing Panel
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-purple-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Active Mode Badge */}
            <div className="mb-4 p-3 rounded-2xl bg-purple-950/50 border border-purple-800/40 text-xs flex items-center justify-between">
              <span className="text-purple-300 font-medium">Current Mode:</span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-semibold ${
                  isCelebration
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-pink-500/20 text-pink-300 border border-pink-500/40"
                }`}
              >
                {isCelebration ? "🎉 Celebration Active" : "⏳ Countdown Running"}
              </span>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-2.5 mb-5">
              {/* Preview Celebration Immediately */}
              {!isCelebration ? (
                <button
                  onClick={() => {
                    onTriggerPreview();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:brightness-110 font-semibold text-sm shadow-md transition"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Preview Celebration Now
                  </span>
                  <Play className="w-3.5 h-3.5 fill-white" />
                </button>
              ) : (
                <button
                  onClick={onReturnToCountdown}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-purple-800 hover:bg-purple-700 font-semibold text-sm shadow-md transition"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-300" />
                    Return To Countdown Mode
                  </span>
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Quick 10s Countdown Test */}
              <button
                onClick={() => onSetQuickTest(10)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-purple-200 hover:text-white transition"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Test 10-Second Transition
                </span>
                <span className="text-[11px] text-amber-300 font-mono">10s</span>
              </button>

              {/* Reset to Original JSON Config */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-xs sm:text-sm font-medium text-purple-200 hover:text-rose-200 transition"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  Reset To Original Date
                </span>
                <span className="text-[11px] text-purple-400 font-mono">JSON</span>
              </button>

              {/* Reload birthday.json */}
              <button
                onClick={onReloadConfig}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-purple-200 hover:text-white transition"
              >
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-sky-400" />
                  Reload birthday.json
                </span>
                <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>

            {/* Config Summary Info */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-[11px] space-y-1.5 text-purple-300 font-mono">
              <div className="flex items-center justify-between">
                <span>Person:</span>
                <span className="text-white font-sans">{config.birthdayPerson.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Target:</span>
                <span className="text-amber-300">
                  {config.birthdayPerson.birthdayDate} {config.birthdayPerson.birthdayTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Timezone:</span>
                <span className="text-purple-200">{config.birthdayPerson.timezone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Photos / Videos:</span>
                <span className="text-pink-300">
                  {config.media.photos.length} photos / {config.media.videos.length} videos
                </span>
              </div>
            </div>

            <p className="mt-3 text-[10px] text-purple-400/70 text-center">
              Edit <code className="text-amber-300">public/data/birthday.json</code> to update date, messages & media.
            </p>

            {/* Confirmation Dialog for Reset */}
            <AnimatePresence>
              {showResetConfirm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-[#0c0419]/98 p-6 flex flex-col justify-center items-center text-center z-10"
                >
                  <AlertTriangle className="w-10 h-10 text-rose-500 mb-3" />
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    Reset Countdown?
                  </h4>
                  <p className="text-xs text-purple-200/80 mb-6">
                    This will clear temporary test overrides and recalculate remaining time from the real date in <code className="text-amber-300 font-mono">birthday.json</code>.
                  </p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmReset}
                      className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-lg"
                    >
                      Yes, Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
