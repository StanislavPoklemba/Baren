/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pearl:     "#F5F2EC",
        alabaster: "#FAF7F2",
        cream:     "#F2EDE4",
        ivory:     "#FBF8F3",
        walnut:    "#1C0F00",
        charcoal:  "#2A2A28",
        graphite:  "#383836",
        muted:     "#706B65",
        gold:      "#C5A572",
        "gold-light": "#D9BE8E",
        "gold-dark":  "#A8895A",
        line:      "#E5DDD0",
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', "Georgia", "serif"],
        sans:  ["Montserrat", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "wide-2": "0.18em",
        "wide-3": "0.24em",
        "wide-4": "0.32em",
        "wide-5": "0.4em",
      },
      fontSize: {
        mega: ["clamp(3.5rem, 12vw, 10rem)", { lineHeight: "0.95", letterSpacing: "0.04em" }],
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent 0%, #C5A572 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up-slow": "fadeUp 1.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
