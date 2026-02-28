import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import EmergencySOS from '@/components/EmergencySOS';
import { ToastProvider } from '@/components/ToastProvider';
import ThemeRegistry from './ThemeRegistry';
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
  title: "PeaceMatcher - AI-Powered Healthcare Platform",
  description: "AI-powered healthcare platform providing intelligent medical assistance, telehealth, and comprehensive health management for every family.",
  keywords: ["healthcare", "AI", "telehealth", "medical assistant", "health platform", "PeaceMatcher"],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ThemeRegistry>
          <ToastProvider>
            <ErrorBoundary>
              <NavBar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <EmergencySOS />
            </ErrorBoundary>
          </ToastProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
