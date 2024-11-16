import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        caption: ["var(--font-caption)"],
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "pulse-opacity": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      fontSize: {
        "heading1-bold": [
          "50px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading2-bold": [
          "30px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading3-bold": [
          "24px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading4-bold": [
          "20px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "body-bold": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "body-semibold": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
        "body-medium": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "500",
          },
        ],
        "base-bold": [
          "16px",
          {
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
        "base-medium": [
          "16px",
          {
            lineHeight: "100%",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
