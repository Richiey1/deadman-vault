"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] border-b border-[#14B8A6]/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#14B8A6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                Deadman Vault
              </span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-[#5EEAD4] hover:text-white font-medium transition-colors"
            >
              Home
            </Link>
            <a 
              href="#how-it-works" 
              className="text-[#5EEAD4] hover:text-white font-medium transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="text-[#5EEAD4] hover:text-white font-medium transition-colors"
            >
              Features
            </a>
          </nav>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Reown AppKit Account Button - shows wallet icon and address when connected */}
            <appkit-account-button />
          </div>
        </div>
      </div>
    </header>
  );
}
