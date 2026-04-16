import type { Metadata } from "next";
import { Manrope, Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { LayoutContainer } from "@/components/LayoutContainer";
import { Toaster } from "sonner";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Brainware Rooms - Student Housing for Brainware University",
  description: "Find and book quality rooms near Brainware University campus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${manrope.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <div className="hidden md:block fixed top-0 w-full z-50">
            <Navbar />
          </div>
          <LayoutContainer>
            {children}
          </LayoutContainer>
          <BottomNav />
          <Toaster position="bottom-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
