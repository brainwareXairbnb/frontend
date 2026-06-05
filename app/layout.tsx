import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Navbar } from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { LayoutContainer } from '@/components/LayoutContainer'
import { Toaster } from 'sonner'
import ScrollToTop from '@/components/ScrollToTop'
import { ViewingAsIndicator } from '@/components/ViewingAsIndicator'
import { AppInitializer } from '@/components/AppInitializer'
import { BackButtonHandler } from '@/components/BackButtonHandler'
import { StatusBarConfig } from '@/components/StatusBarConfig'

import { TopNavStack } from '@/components/TopNavStack'
import { DeepLinkHandler } from '@/components/DeepLinkHandler'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Prevent viewport resizing when keyboard opens on mobile
  interactiveWidget: 'resizes-content',
  // Enable viewport to extend into safe areas (status bar, notches, etc.)
  viewportFit: 'cover',
  // Set theme color to white
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: 'BrainX - Student Housing for Brainware University',
  description: 'Find and book quality rooms near Brainware University campus',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`h-full antialiased ${manrope.variable} ${inter.variable}`}
    >
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        />
        {/* Allow Razorpay domains for payment processing */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';"
        />
      </head>

      <body className='min-h-screen bg-slate-50 text-slate-900 flex flex-col'>
        <AppInitializer>
          <AuthProvider>
            <StatusBarConfig />
            <BackButtonHandler />
            <DeepLinkHandler />
            <ScrollToTop />

            {/* Fixed Top Navigation Stack */}
            <TopNavStack />

            {/* App Shell */}
            <div className='flex flex-1 flex-col'>
              {/* Main Content */}
              <main className='flex-1 pb-20 md:pb-0'>
                <LayoutContainer>{children}</LayoutContainer>
              </main>

              {/* Mobile Bottom Navigation */}
              <div className='md:hidden'>
                <BottomNav />
              </div>
            </div>

            {/* Notifications */}
            <Toaster
              position='bottom-center'
              richColors
              toastOptions={{
                className: 'mb-20 md:mb-0 pb-safe md:pb-0',
              }}
            />
          </AuthProvider>
        </AppInitializer>
      </body>
    </html>
  )
}
