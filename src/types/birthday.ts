export interface BirthdayPerson {
  name: string;
  title: string;
  birthdayDate: string; // e.g. "2026-11-10" or "YYYY-MM-DD"
  birthdayTime: string; // e.g. "00:00:00" or "HH:mm:ss"
  timezone: string;     // e.g. "Asia/Kolkata"
}

export interface CountdownConfig {
  enabled: boolean;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
}

export interface BirthdayMessage {
  heading: string;
  message: string;
  signature: string;
}

export interface MediaConfig {
  photos: string[];
  videos: string[];
  backgroundMusic: string;
}

export interface FeaturesConfig {
  fireworks: boolean;
  confetti: boolean;
  backgroundMusic: boolean;
  photoGallery: boolean;
  videoGallery: boolean;
  birthdayCake: boolean;
  secretMessage: boolean;
}

export interface CelebrationConfig {
  enableAutomaticTrigger: boolean;
  allowPreview: boolean;
  allowReset: boolean;
  celebrationDuration: "whole-day" | string;
}

export interface BirthdayConfig {
  birthdayPerson: BirthdayPerson;
  countdown: CountdownConfig;
  birthdayMessage: BirthdayMessage;
  media: MediaConfig;
  features: FeaturesConfig;
  celebration: CelebrationConfig;
}

export interface CountdownTimeRemaining {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  isCelebrationActive: boolean;
  targetDateFormatted: string;
}
