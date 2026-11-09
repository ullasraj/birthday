import { BirthdayConfig } from "@/types/birthday";

export const DEFAULT_CONFIG: BirthdayConfig = {
  birthdayPerson: {
    name: "Keerthana",
    title: "Happy Birthday, Keerthana! ❤️",
    birthdayDate: "2026-11-09",
    birthdayTime: "17:09:00",
    timezone: "Asia/Kolkata",
  },
  countdown: {
    enabled: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
  },
  birthdayMessage: {
    heading: "Happy Birthday, Dearest Keerthana! ❤️",
    message:
      "Dearest Keerthana,\n\nYou are one of the most wonderful, kind, and radiant souls in my life. Your smile brings so much warmth, and every moment spent with you is truly special.\n\nI hope your day is filled with boundless happiness, sweet laughter, love, and unforgettable memories. May all your dreams take flight and turn into reality!\n\nKeep shining bright, keep smiling your magical smile, and stay blessed always. Today is all about YOU, Keerthana. Celebrate and enjoy every single second of it! 🎉🎂✨",
    signature: "With all my love and blessings, forever ❤️",
  },
  media: {
    photos: [
      "/media/photos/keerthana.jpg",
      "/media/photos/photo2.jpg",
      "/media/photos/photo3.jpg",
      "/media/photos/photo4.jpg",
    ],
    videos: [
      "/media/videos/surprise.mp4",
    ],
    backgroundMusic: "/media/music/birthday.mp3",
  },
  features: {
    fireworks: true,
    confetti: true,
    backgroundMusic: true,
    photoGallery: true,
    videoGallery: true,
    birthdayCake: true,
    secretMessage: true,
  },
  celebration: {
    enableAutomaticTrigger: true,
    allowPreview: true,
    allowReset: true,
    celebrationDuration: "whole-day",
  },
};

/**
 * Loads the configuration from `/data/birthday.json`.
 * Includes cache-busting timestamp so modifications take effect immediately upon refresh.
 */
export async function loadBirthdayConfig(): Promise<BirthdayConfig> {
  try {
    const res = await fetch(`/data/birthday.json?_t=${Date.now()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Failed to fetch /data/birthday.json: status ${res.status}. Falling back to default.`);
      return DEFAULT_CONFIG;
    }

    const data = await res.json();
    return {
      ...DEFAULT_CONFIG,
      ...data,
      birthdayPerson: {
        ...DEFAULT_CONFIG.birthdayPerson,
        ...(data.birthdayPerson || {}),
      },
      countdown: {
        ...DEFAULT_CONFIG.countdown,
        ...(data.countdown || {}),
      },
      birthdayMessage: {
        ...DEFAULT_CONFIG.birthdayMessage,
        ...(data.birthdayMessage || {}),
      },
      media: {
        ...DEFAULT_CONFIG.media,
        ...(data.media || {}),
      },
      features: {
        ...DEFAULT_CONFIG.features,
        ...(data.features || {}),
      },
      celebration: {
        ...DEFAULT_CONFIG.celebration,
        ...(data.celebration || {}),
      },
    };
  } catch (err) {
    console.error("Error loading birthday config:", err);
    return DEFAULT_CONFIG;
  }
}
