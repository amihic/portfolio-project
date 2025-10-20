// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // <— ovde forsiramo dark preko .dark klase, ne preko system
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
