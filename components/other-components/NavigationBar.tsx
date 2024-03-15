import React from 'react';
import Link from "next/link";
import { HomeIcon } from 'lucide-react';

export default function NavigationBar() {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full py-4 bg-gray-1000 dark:bg-gray-1000">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link className="flex items-center space-x-2" href="/">
            <HomeIcon size={24} />
            <span className="text-lg font-semibold tracking-wide">Company</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link className="text-sm font-medium" href="sign-in">
            Sign in
          </Link>
          <Link
            className="text-sm font-medium rounded-sm border border-transparent
        shadow-sm px-3 py-2 transition-colors duration-150 text-gray-50
        bg-gray-900 hover:bg-gray-900 dark:text-gray-900 dark:bg-gray-50
        dark:hover:bg-gray-50"
            href="sign-up"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  )
}

