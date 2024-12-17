'use client'

import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Available Balance</h1>
        <div className="text-sm">Section</div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-500 text-white p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-400 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Auto Insurance</h3>
              <p className="text-sm opacity-80">1311 Cars</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-4">$45,910</div>
          <div className="flex justify-between text-sm">
            <div>
              <div>100,930</div>
              <div className="opacity-80">USD</div>
            </div>
            <div>
              <div>54,120</div>
              <div className="opacity-80">USD</div>
            </div>
            <div>
              <div>⭐ 125</div>
              <div className="opacity-80">VIP</div>
            </div>
          </div>
        </Card>

        {/* Health Insurance Card */}
        <Card className="bg-white p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Health Insurance</h3>
              <p className="text-sm text-gray-500">+2400 People</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-4">$12,138</div>
          <div className="text-sm text-green-500">+4.5%</div>
        </Card>

        {/* Balance Insurance Card */}
        <Card className="bg-emerald-500 text-white p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-emerald-400 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Balance Insurance</h3>
              <p className="text-sm opacity-80">1311 Cars</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-4">$3,910</div>
          <div className="flex justify-between text-sm">
            <div>
              <div>100,930</div>
              <div className="opacity-80">USD</div>
            </div>
            <div>
              <div>54,120</div>
              <div className="opacity-80">USD</div>
            </div>
            <div>
              <div>⭐ 125</div>
              <div className="opacity-80">VIP</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="h-80 w-full bg-gray-50 rounded-lg">
              {/* Add chart component here */}
            </div>
          </Card>
        </div>

        {/* Agents Section */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">⭐ Agents</h2>
            <p className="text-sm text-gray-500 mb-4">
              Meet your agenda and see their ranks to get the best results
            </p>
            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-sm text-gray-500">
                +12
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
