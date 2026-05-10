/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F5F5F4",
          900: "#0A0A0A",
        },
        gold: {
          DEFAULT: "#D4AF37",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["IBM Plex Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
        ja: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
};
