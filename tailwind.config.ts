// @ts-expect-error - no types
import nativewind from "nativewind/preset"

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [nativewind],
  theme: {
    extend: {
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies import("tailwindcss").Config
