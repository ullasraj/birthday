import { CountdownTimeRemaining } from "@/types/birthday";

/**
 * Normalizes date strings like "2026-11-9" or "2026/11/9" into "2026-11-09"
 */
export function normalizeDate(dateStr: string): string {
  if (!dateStr) return "2026-11-10";
  const parts = dateStr.trim().replace(/\//g, "-").split("-").map(Number);
  if (parts.length === 3 && !parts.some(isNaN)) {
    const [y, m, d] = parts;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  return dateStr.trim();
}

/**
 * Normalizes time strings like "17:9:0" or "17:09" into "17:09:00"
 */
export function normalizeTime(timeStr: string = "00:00:00"): string {
  if (!timeStr) return "00:00:00";
  const parts = timeStr.trim().split(":").map(Number);
  const h = String(parts[0] || 0).padStart(2, "0");
  const m = String(parts[1] || 0).padStart(2, "0");
  const s = String(parts[2] || 0).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/**
 * Calculates the exact UTC timestamp for a given date, time, and IANA timezone.
 * Uses native Intl API for robust timezone calculations across all browsers.
 */
export function getTargetTimestamp(
  dateStr: string,
  timeStr: string = "00:00:00",
  timeZone: string = "Asia/Kolkata"
): number {
  try {
    const cleanDate = normalizeDate(dateStr);
    const cleanTime = normalizeTime(timeStr);

    const [year, month, day] = cleanDate.split("-").map(Number);
    const [hours, minutes, seconds] = cleanTime.split(":").map(Number);

    // Initial UTC guess
    const targetUtcGuess = Date.UTC(year, month - 1, day, hours, minutes, seconds);

    // Use Intl to find the timezone offset for this guess
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Formatting gives local time in the specified timezone
    const parts = formatter.formatToParts(new Date(targetUtcGuess));
    const partMap: Record<string, number> = {};
    for (const p of parts) {
      if (p.type !== "literal") {
        partMap[p.type] = Number(p.value);
      }
    }

    const localFromGuessUtc = Date.UTC(
      partMap.year,
      partMap.month - 1,
      partMap.day,
      partMap.hour === 24 ? 0 : partMap.hour,
      partMap.minute,
      partMap.second
    );

    const offsetMs = localFromGuessUtc - targetUtcGuess;
    const exactTimestamp = targetUtcGuess - offsetMs;
    return exactTimestamp;
  } catch (error) {
    console.warn("Timezone calculation fallback triggered:", error);
    const cleanDate = normalizeDate(dateStr);
    const cleanTime = normalizeTime(timeStr);
    return new Date(`${cleanDate}T${cleanTime}`).getTime();
  }
}

/**
 * Calculates remaining time until target timestamp.
 */
export function calculateTimeRemaining(
  targetTimestamp: number,
  celebrationDuration: string = "whole-day"
): CountdownTimeRemaining {
  const now = Date.now();
  const diff = targetTimestamp - now;

  // 24 hours in ms for whole-day celebration
  const wholeDayMs = 24 * 60 * 60 * 1000;

  if (diff <= 0) {
    // Target time has arrived or passed
    const isWithinCelebrationWindow =
      celebrationDuration === "whole-day" ? Math.abs(diff) <= wholeDayMs : true;

    return {
      totalSeconds: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
      isCelebrationActive: isWithinCelebrationWindow || true,
      targetDateFormatted: new Date(targetTimestamp).toLocaleDateString(),
    };
  }

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    days,
    hours,
    minutes,
    seconds,
    isComplete: false,
    isCelebrationActive: false,
    targetDateFormatted: new Date(targetTimestamp).toLocaleDateString(),
  };
}

/**
 * Format a number as 2 digits with leading zero.
 */
export function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}
