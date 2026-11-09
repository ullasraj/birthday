# 🎂 Magical One-Day Birthday Surprise Website

A beautiful, premium, romantic, and fully interactive birthday surprise website designed to celebrate one special person's birthday.

---

## ✨ Features

- **Magical Countdown Screen:**
  - Real-time countdown (Days, Hours, Minutes, Seconds) calculated from target timestamp.
  - Multi-timezone support (default `Asia/Kolkata` IST).
  - Dark purple & midnight gradients, glowing numbers, floating stars, hearts, and sparkles.
  - Recalculates accurately across page reloads.

- **Grand Celebration Trigger:**
  - Screen fade-out and fade-in cinematic transition when countdown hits zero.
  - Spectacular multi-stage fireworks and confetti cannon (`canvas-confetti`).
  - Glowing animated typography: *"🎉 HAPPY BIRTHDAY! 🎂"* & *"Today is all about YOU! ❤️"*.
  - Birthday person's name highlighted in glowing typography.

- **Interactive Birthday Cake:**
  - Custom SVG/CSS layered birthday cake with flickering candle flames.
  - *"Make a Wish!"* button that blows out candles with soft smoke.
  - Triggers a second massive fireworks and confetti celebration.
  - Shows *"May all your wishes come true! ✨"*.

- **Personal Birthday Message:**
  - Character-by-character typing animation with replay and skip controls.
  - Glassmorphic card with golden highlights and romantic signature.

- **Photo Memories Gallery:**
  - Smooth card animations, glowing borders, and floating hearts.
  - Fullscreen lightbox viewer with Next/Prev and Zoom navigation.
  - Graceful fallback for missing photos.

- **Cinematic Video Section:**
  - MP4 and WebM video player with custom play/pause and fullscreen controls.
  - Graceful fallback cards if files are missing.

- **Background Birthday Music:**
  - Floating music widget with play, pause, mute, and animated sound wave bars.
  - Smooth autoplay unblock fallback banner if the browser prevents automatic audio.
  - Built-in procedural harmonic chime synthesizer fallback if custom MP3 is not yet added.

- **Discreet Testing & Preview Controls:**
  - Floating button at bottom-right for the website creator.
  - *"Preview Celebration Now"* (instant celebration preview).
  - *"Test 10-Second Transition"* (see countdown hit 0 and trigger fireworks).
  - *"Return to Countdown Mode"*.
  - *"Reset to Original Date"* (with confirmation).
  - *"Reload birthday.json"*.

---

## 🛠️ How to Customize (No Coding Needed!)

All configuration is strictly controlled via:

```text
public/data/birthday.json
```

### 1. Change Birthday Date, Time & Person Name

Open `public/data/birthday.json` and edit:

```json
{
  "birthdayPerson": {
    "name": "Sarah",
    "title": "Happy Birthday My Love",
    "birthdayDate": "2026-11-10",
    "birthdayTime": "00:00:00",
    "timezone": "Asia/Kolkata"
  }
}
```

### 2. Add Photos

Drop photo files into:
```text
public/media/photos/
```
Then reference them in `public/data/birthday.json`:
```json
"media": {
  "photos": [
    "/media/photos/photo1.jpg",
    "/media/photos/photo2.jpg",
    "/media/photos/photo3.jpg"
  ]
}
```

### 3. Add Videos

Drop MP4 or WebM video files into:
```text
public/media/videos/
```
Then reference them in `public/data/birthday.json`:
```json
"videos": [
  "/media/videos/video1.mp4",
  "/media/videos/video2.mp4"
]
```

### 4. Add Background Music

Drop an MP3 file into:
```text
public/media/music/birthday.mp3
```

---

## 🚀 Running the Project

### Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
npm run build
npm start
```
