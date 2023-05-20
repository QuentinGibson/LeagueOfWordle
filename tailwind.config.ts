import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Asap", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
