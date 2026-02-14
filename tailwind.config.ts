import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#FF6B00',
          light: '#FF8C00',
          dark: '#E65100',
        },
        orange: {
          500: '#FF6B00',
          600: '#E65100',
        }
      },
    },
  },
  plugins: [],
};
export default config;
