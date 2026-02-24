import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "VoiceCeleb - AI Voice Cloning & Dubbing",
  description: "Experience high-fidelity AI voice cloning and global dubbing solutions.",
  openGraph: {
    title: "VoiceCeleb - AI Voice Cloning & Dubbing",
    description: "Experience high-fidelity AI voice cloning and global dubbing solutions that sound undeniably human.",
    url: "https://voiceceleb.ai", // Replace with your actual domain
    siteName: "VoiceCeleb",
    images: [
      {
        url: "/images/og-image.jpg", // Place your image file here
        width: 1200,
        height: 630,
        alt: "VoiceCeleb AI Voice Cloning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceCeleb - AI Voice Cloning & Dubbing",
    description: "Experience high-fidelity AI voice cloning and global dubbing solutions.",
    images: ["/images/og-image.jpg"], // Same image for Twitter card
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-navy-900 text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <GoogleAnalytics gaId="G-4QP294DYTH" />
      </body>
    </html>
  );
}
