import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import '../styles/main.scss'
import { ThemeProvider } from '@/contexts/theme-context'
import { Sidebar } from '@/components/layout/navigation/sidebar'
import { MobileNav } from '@/components/layout/navigation/mobile-nav'
import { Header } from '@/components/layout/header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Interior Helper',
  description: '管理您的室內設計專案，追蹤進度並有效組織工作流程。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex h-screen bg-background">
            {/* mob */}
            <MobileNav />

            <Sidebar />
            <div className="mt-16 flex h-full flex-1 flex-col sm:mt-0">
              <Header />
              <main className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto max-w-7xl">{children}</div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
