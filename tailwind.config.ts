import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          gold: "#F4A636",
          peach: "#FFCBA4",
          coral: "#E8855A",
          pink: "#F2A7B0",
          rose: "#D4687A",
          brown: "#8B5E3C",
          cream: "#FFF3E8",
          twilight: "#4A3B6B",
          dusk: "#7B5EA7",
          night: "#1A1035",
          dawn: "#FFB5A0",
          muted: "#C4956A",
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        serif: ["Lora", "serif"],
        mono: ["Space Mono", "monospace"],
      },
      boxShadow: {
        scene:
          "0 8px 40px rgba(139, 94, 60, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
        choice: "0 4px 20px rgba(244, 166, 54, 0.2)",
        glow: "0 0 0 1px rgba(244, 166, 54, 0.25), 0 12px 40px rgba(244, 166, 54, 0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(14px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "soft-pulse": {
          "0%, 100%": {
            opacity: "0.72",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.02)",
          },
        },
        drift: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
          },
          "50%": {
            transform: "translate3d(0, -10px, 0)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        "soft-pulse": "soft-pulse 4s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
      },
      backdropBlur: {
        glass: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
