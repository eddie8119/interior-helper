'use client'

import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Available Balance</h1>
        <div className="text-sm">Section</div>
      </div>

      {/* Balance Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden rounded-xl bg-[#FFE7DE] p-6 dark:bg-gray-800 dark:bg-opacity-50">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString()}
            </span>
            <div className="mt-4">
              <h3 className="text-xl font-medium dark:text-white">
                Web Designing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prototyping
              </p>
            </div>
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium dark:text-gray-300">
                Progress
              </p>
              <div className="h-2 w-full rounded-full bg-white dark:bg-gray-700">
                <div className="h-full w-[60%] rounded-full bg-[#D4763B] dark:bg-orange-500"></div>
              </div>
              <div className="mt-2 flex justify-between text-sm dark:text-gray-400">
                <span>60%</span>
                <span>2 Days Left</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <button className="ml-2 rounded-full bg-white p-1 dark:bg-gray-700 dark:text-gray-300">
                <svg
                  className="h-6 w-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
