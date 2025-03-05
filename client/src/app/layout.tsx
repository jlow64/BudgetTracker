import type { Metadata } from "next";
import QueryClientProvider from "./providers";
import { Comfortaa, Open_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import { Toaster } from "@/components/ui/sonner";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Stop, tracking time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-background'>
      <body
        className={`${comfortaa.variable} ${openSans.variable} antialiased min-h-screen bg-brand-gradient`}
      >
        <QueryClientProvider>
          <Navbar />
          <Toaster position='top-right' />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
