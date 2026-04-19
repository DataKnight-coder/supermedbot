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
        // Brand Colors
        brand: {
          'medical': '#0B3C5D',   // Medical Blue – headers, authority
          'action': '#1DA1F2',    // Action Blue – buttons, links
          'teal': '#17C3B2',      // Teal Accent – callouts, icons
          'light': '#F5F7FA',     // Light Gray – backgrounds
          'dark': '#1A1A1A',      // Dark Text
        },
        // Legacy mapping for components
        clinical: {
          50: '#F5F7FA',
          100: '#e8ecf2',
          200: '#d1d9e5',
          300: '#b0bed3',
          400: '#7a8da9',
          500: '#5a6f8a',
          600: '#475569',
          700: '#334155',
          800: '#1A1A1A',
          900: '#0B3C5D',
        },
        accent: {
          light: '#17C3B2',
          DEFAULT: '#1DA1F2',
          dark: '#0B3C5D',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
