import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 1. Scan folder APP di root (Wajib)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // 2. Scan folder COMPONENTS di root (INI KUNCI UTAMANYA)
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // 3. Jaga-jaga kalau ada folder pages
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- KONFIGURASI TEMA JASURD (JANGAN DIHAPUS) ---
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'], 
      },
      colors: {
        primary: {
          DEFAULT: '#4f46e5', 
          dark: '#3730a3',
        },
        secondary: '#8b5cf6',
        accent: {
          DEFAULT: '#fbbf24', 
          hover: '#f59e0b',
        },
        surface: '#f1f5f9', 
        dark: '#0f172a',
        gold: '#FFD700', 
        // Default Next.js variables (biar aman)
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(15, 23, 42, 1)', 
        'hard-sm': '2px 2px 0px 0px rgba(15, 23, 42, 1)', 
        'hard-lg': '6px 6px 0px 0px rgba(15, 23, 42, 1)', 
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 2s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;