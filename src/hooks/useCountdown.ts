"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { BirthdayConfig, CountdownTimeRemaining } from "@/types/birthday";
import { getTargetTimestamp, calculateTimeRemaining } from "@/lib/dateUtils";

interface UseCountdownOptions {
  config: BirthdayConfig;
  previewMode?: boolean;
}

export function useCountdown({ config, previewMode = false }: UseCountdownOptions) {
  // Temporary overrides for developer/admin preview & testing (in-memory & session storage)
  const [manualPreview, setManualPreview] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_preview_active") === "true";
    }
    return false;
  });

  const [testTargetTimestamp, setTestTargetTimestamp] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("admin_test_timestamp");
      return stored ? Number(stored) : null;
    }
    return null;
  });

  // Calculate official target timestamp from JSON config
  const officialTargetTimestamp = useMemo(() => {
    return getTargetTimestamp(
      config.birthdayPerson.birthdayDate,
      config.birthdayPerson.birthdayTime,
      config.birthdayPerson.timezone
    );
  }, [
    config.birthdayPerson.birthdayDate,
    config.birthdayPerson.birthdayTime,
    config.birthdayPerson.timezone,
  ]);

  // Effective target timestamp
  const effectiveTargetTimestamp = testTargetTimestamp ?? officialTargetTimestamp;

  // Real-time remaining state
  const [timeRemaining, setTimeRemaining] = useState<CountdownTimeRemaining>(() =>
    calculateTimeRemaining(effectiveTargetTimestamp, config.celebration.celebrationDuration)
  );

  // Interval timer updating every second
  useEffect(() => {
    const updateCountdown = () => {
      const remaining = calculateTimeRemaining(
        effectiveTargetTimestamp,
        config.celebration.celebrationDuration
      );
      setTimeRemaining(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [effectiveTargetTimestamp, config.celebration.celebrationDuration]);

  // Is celebration active?
  const isCelebration = useMemo(() => {
    if (manualPreview || previewMode) return true;
    if (!config.celebration.enableAutomaticTrigger) return false;
    return timeRemaining.isComplete;
  }, [manualPreview, previewMode, config.celebration.enableAutomaticTrigger, timeRemaining.isComplete]);

  // Preview celebration trigger
  const triggerPreviewCelebration = useCallback(() => {
    setManualPreview(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin_preview_active", "true");
    }
  }, []);

  // Return to countdown mode
  const returnToCountdown = useCallback(() => {
    setManualPreview(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_preview_active");
    }
  }, []);

  // Set a quick test countdown (e.g. 10 seconds from now)
  const setQuickTestCountdown = useCallback((secondsFromNow: number = 10) => {
    const future = Date.now() + secondsFromNow * 1000;
    setTestTargetTimestamp(future);
    setManualPreview(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin_test_timestamp", future.toString());
      sessionStorage.removeItem("admin_preview_active");
    }
  }, []);

  // Reset to original JSON configuration target date
  const resetToOriginalConfig = useCallback(() => {
    setTestTargetTimestamp(null);
    setManualPreview(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_test_timestamp");
      sessionStorage.removeItem("admin_preview_active");
    }
  }, []);

  return {
    timeRemaining,
    isCelebration,
    manualPreview,
    effectiveTargetTimestamp,
    officialTargetTimestamp,
    hasCustomTestTimestamp: testTargetTimestamp !== null,
    triggerPreviewCelebration,
    returnToCountdown,
    setQuickTestCountdown,
    resetToOriginalConfig,
  };
}
