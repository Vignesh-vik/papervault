import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PaperVault - Previous Year Question Papers",
  description:
    "Access and search CATs and semester question papers by subject code. PaperVault helps students quickly find past exams and prepare better.",
  keywords: ["question papers", "CAT exams", "semester papers", "PaperVault", "subject code"],
  openGraph: {
    title: "PaperVault",
    description:
      "Find previous year question papers for CATs and semester exams easily with PaperVault.",
    url: "https://papervault.vercel.app",
    siteName: "PaperVault",
    images: [
      {
        url: "/og-image.png", // you can add an image later
        width: 1200,
        height: 630,
        alt: "PaperVault - Question Papers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PaperVault",
    description:
      "Find previous year question papers for CATs and semester exams easily with PaperVault.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
