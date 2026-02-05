import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "VoiceCeleb - AI Voice Cloning & Dubbing",
  description: "Experience high-fidelity AI voice cloning and global dubbing solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-navy-900 text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
