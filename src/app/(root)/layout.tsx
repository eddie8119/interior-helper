import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { auth } from '@/auth'
import { Header } from '@/components/layout/header'
import { MobileNav } from '@/components/layout/navigation/mobile-nav'
import { Sidebar } from '@/components/layout/navigation/sidebar'
import { DatePickerProvider } from '@/components/providers/date-picker-provider'
import { LoginDialogWrapper } from '@/components/providers/login-dialog-wrapper'
import { QueryProvider } from '@/components/providers/query-provider'
import { LoginDialogProvider } from '@/contexts/login-dialog-context'
import { ThemeProvider } from '@/contexts/theme-context'
import '../../styles/main.scss'
import '../globals.css'

import 'react-toastify/dist/ReactToastify.css'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* session，根組件配置 確保整個應用在服務器端和客戶端之間的狀態一致  避免Hydration Mismatch*/}
        <SessionProvider session={session}>
          <QueryProvider>
            <ThemeProvider>
              <DatePickerProvider>
                <LoginDialogProvider>
                  <ToastContainer
                    position="bottom-right"
                    hideProgressBar
                    className="z-50"
                  />
                  <div className="flex h-screen w-screen bg-background">
                    {/* mob */}
                    <MobileNav />

                    <Sidebar />

                    <div className="mt-16 flex h-full flex-1 flex-col sm:mt-0">
                      <Header />
                      <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {children}
                      </main>
                    </div>
                  </div>
                  <LoginDialogWrapper />
                </LoginDialogProvider>
              </DatePickerProvider>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
