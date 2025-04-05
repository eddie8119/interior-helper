'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  // 自動重定向到首頁的計時器
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <div className="my-8 h-0.5 w-full bg-gray-300"></div>

        <h2 className="mb-4 text-3xl font-semibold text-gray-700">
          頁面找不到了
        </h2>

        <p className="mb-8 text-gray-600">
          抱歉，您要找的頁面可能已被移除或暫時無法使用。
          <br />
          5秒後將自動返回首頁。
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
          >
            返回首頁
          </Link>

          <button
            onClick={() => router.back()}
            className="rounded-lg bg-gray-200 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-300"
          >
            返回上一頁
          </button>
        </div>
      </div>
    </div>
  )
}
