import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        neonBlue: "#00D6FF",
        electricPurple: "#8A2BE2"
      },
      boxShadow: {
        neon: "0 0 24px rgba(0, 214, 255, .35), 0 0 48px rgba(138, 43, 226, .18)"
      },
      backgroundImage: {
        grid:
          "linear-gradient(to right, rgba(0,214,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(138,43,226,.05) 1px, transparent 1px)",
        glow:
          "radial-gradient(60% 50% at 50% 40%, rgba(0,214,255,.22) 0%, rgba(0,214,255,0) 60%), radial-gradient(70% 60% at 60% 30%, rgba(138,43,226,.18) 0%, rgba(138,43,226,0) 60%)"
      }
    }
  },
  plugins: []
} satisfies Config;

