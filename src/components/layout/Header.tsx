import { HeaderRightSection } from './HeaderRightSection'

export function Header() {
  return (
    <header className="hidden border-b border-border bg-background sm:block">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex flex-1 items-center justify-between">
          {/* Search */}
          <form className="flex w-full max-w-lg items-center">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                placeholder="Search..."
                required
              />
            </div>
          </form>

          {/* Right section */}
          <HeaderRightSection />
        </div>
      </div>
    </header>
  )
}
