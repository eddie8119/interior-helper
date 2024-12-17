"use client";

import { useState } from "react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <aside
      className={`bg-white border-r transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center">
        <div
          className={`flex items-center ${isCollapsed ? "hidden" : "block"}`}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg mr-2"></div>
          <span className="font-semibold">Acme Co.</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <div className="px-3 py-2">
        <span className="text-xs text-gray-500">Main Menu</span>
        <nav className="mt-2 space-y-1">
          <a
            href="/dashboard"
            className="flex items-center px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-600"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className={isCollapsed ? "hidden" : "block"}>Home</span>
          </a>
          {[
            "Accounts",
            "Payments",
            "Balances",
            "Customers",
            "Products",
            "Reports",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className={isCollapsed ? "hidden" : "block"}>{item}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
