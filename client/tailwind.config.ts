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
        h1: ["3rem", { lineHeight: "53px", fontWeight: 700 }],
        h2: ["2.5rem", { lineHeight: "45px", fontWeight: 700 }],
        h3: ["2.06rem", { lineHeight: "37px", fontWeight: 300 }],
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
          "linear-gradient(to bottom, hsl(var(--tertiary)), hsl(var(--secondary)))",
      },
      colors: {
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsla(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsla(var(--popover))",
          foreground: "hsla(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsla(var(--muted))",
          foreground: "hsla(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsla(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive))",
          foreground: "hsla(var(--destructive-foreground))",
        },
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsla(var(--ring))",
        chart: {
          "1": "hsla(var(--chart-1))",
          "2": "hsla(var(--chart-2))",
          "3": "hsla(var(--chart-3))",
          "4": "hsla(var(--chart-4))",
          "5": "hsla(var(--chart-5))",
        },
      },
      spacing: {
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "5rem",
        "2xl": "7.5rem",
        "3xl": "12.5rem",
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
