'use client'

import { LoginForm } from '@/components/auth/login-form'
import { Card } from '@/components/core/Card'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex items-center justify-center">
        <Card className="w-[400px] rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="mb-6 text-2xl font-semibold">登入室內工程手帳</h1>
            <div className="mb-4">
              還沒有帳號？
              <button
                onClick={() => router.push('/register')}
                className="text-[#F59E0B] hover:underline"
              >
                註冊
              </button>
            </div>
          </div>

          <LoginForm
            showRegisterLink={false}
            onRegisterClick={() => router.push('/register')}
          />
        </Card>
      </div>
    </div>
  )
}
