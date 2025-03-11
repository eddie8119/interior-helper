'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RegisterSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/login')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50">
      <Card className="w-[400px] rounded-lg bg-red-500 p-8 shadow-lg">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#8DC63F]">
            <Check className="h-12 w-12 text-white" strokeWidth={3} />
          </div>

          {/* Success Text */}
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">SUCCESS</h1>

          {/* Messages */}
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              You have successfully registered
            </p>
            <p className="text-sm text-gray-500">
              Please verify your email address before you can login
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={() => router.push('/login')}
            className="mt-8 w-full rounded-full bg-[#8DC63F] px-6 py-3 text-white hover:bg-[#7DB32F]"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  )
}
