import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Navbar } from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { LayoutContainer } from '@/components/LayoutContainer'
import { Toaster } from 'sonner'
import ScrollToTop from '@/components/ScrollToTop'
import { ViewingAsIndicator } from '@/components/ViewingAsIndicator'

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
      </head>

      <body className='min-h-screen bg-slate-50 text-slate-900 flex flex-col'>
        <AuthProvider>
          <ScrollToTop />

          {/* Fixed Top Navigation Stack */}
          <div className='sticky top-0 z-50 flex flex-col bg-white'>
            <ViewingAsIndicator />
            <div className='hidden md:block'>
              <Navbar />
            </div>
          </div>

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
          <Toaster position='bottom-center' richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
