import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["var(--font-comfortaa)"],
        openSans: ["var(--font-open-sans)"],
      },
      fontSize: {
        h1: ["3rem", { lineHeight: "53.5px", fontWeight: 700 }],
        h2: ["2.5rem", { lineHeight: "45px", fontWeight: 700 }],
        h3: ["2.06rem", { lineHeight: "37px", fontWeight: 700 }],
        h4: ["1.75rem", { lineHeight: "32px", fontWeight: 700 }],
        h5: ["1.44rem", { lineHeight: "25px", fontWeight: 700 }],
        h6: ["1.19rem", { lineHeight: "21px", fontWeight: 700 }],
        subHeading: ["0.75rem", { lineHeight: "13px", fontWeight: 700 }],
        paragraphLg: ["1.75rem", { lineHeight: "38px", fontWeight: 300 }],
        paragraphBase: ["1rem", { lineHeight: "30px", fontWeight: 300 }],
        paragraphSm: ["0.75rem", { lineHeight: "16px", fontWeight: 300 }],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to top, hsla(var(--primary) / 50%) 10%, hsl(var(--secondary) / 50%) 90%)",
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary) / <alpha-value>)",
          foreground: "hsl(var(--tertiary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / 25%)",
          foreground: "hsl(var(--muted-foreground) / 75%)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
      },
      spacing: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "5rem",
        "3xl": "7.5rem",
        "4xl": "12.5rem",
        input: "2.75rem",
        "card-form": "17rem",
      },
      borderRadius: {
        lg: "calc(var(--radius) * 2)",
        md: "var(--radius)",
        sm: "calc(var(--radius) / 2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
