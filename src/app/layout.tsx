import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ThreeProvider from "@/components/three-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADIL ERRABHY | C Programming Enthusiast & Engineering Student",
  description: "Personal portfolio of Adil Errabhy, a C Programming Enthusiast, Web Developer, and Engineering Student at ENSA Agadir. Explore my projects, skills, and contact information.",
  keywords: ["Adil Errabhy", "C Programming", "Web Developer", "Next.js", "TypeScript", "Tailwind CSS", "React", "ENSA Agadir"],
  authors: [{ name: "Adil Errabhy" }],
  openGraph: {
    title: "ADIL ERRABHY - Portfolio",
    description: "Personal portfolio showcasing programming projects and skills",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADIL ERRABHY - Portfolio",
    description: "Personal portfolio showcasing programming projects and skills",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThreeProvider>
          {children}
          <Toaster />
        </ThreeProvider>
      </body>
    </html>
  );
}
