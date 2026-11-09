import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#06030c",
          900: "#0d0718",
          800: "#170c2a",
          700: "#24133f",
          600: "#361c5c",
        },
        royal: {
          purple: "#4c1d95",
          magenta: "#831843",
          gold: "#fbbf24",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "Cambria", "'Times New Roman'", "serif"],
        handwriting: ["'Dancing Script'", "'Brush Script MT'", "cursive"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 25s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "flame": "flame 1s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.8",
            filter: "drop-shadow(0 0 15px rgba(244, 63, 94, 0.4))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 28px rgba(251, 191, 36, 0.7))",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        flame: {
          "0%": { transform: "scale(1) rotate(-1deg)" },
          "100%": { transform: "scale(1.08, 1.15) rotate(1deg)" },
        },
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
