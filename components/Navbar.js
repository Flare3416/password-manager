"use client"
import React, { useState } from 'react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="relative px-4 sm:px-6 py-3 sm:py-4 shadow-2xl border-b border-gray-800/50" 
         style={{
           background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
           fontFamily: 'var(--font-creepster), var(--font-griffy), cursive'
         }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-black/20 to-gray-900/30"></div>
        <div className="relative container mx-auto flex items-center justify-between">
            {/* Logo - Responsive sizing */}
            <div className="text-2xl sm:text-3xl font-bold text-white" style={{fontFamily: 'var(--font-creepster), cursive'}}>
                &lt; Nex<span className="text-purple-400">LOCK</span> /&gt;
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 items-center">
                <li>
                    <a 
                        href="https://github.com/Flare3416/password-manager" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-purple-400 transition-all duration-300 font-semibold tracking-wide drop-shadow-md hover:drop-shadow-lg hover:scale-110 relative group"
                        title="View on GitHub"
                    >
                        <div className="flex items-center gap-2">
                            <svg 
                                className="w-6 h-6 sm:w-8 sm:h-8 fill-current transition-all duration-300 group-hover:rotate-12" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            <span className="text-lg sm:text-xl relative z-10">GitHub</span>
                        </div>
                    </a>
                </li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-gray-300 hover:text-purple-400 transition-colors focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-gray-800/50 shadow-2xl z-50">
                <div className="px-4 py-3">
                    <a 
                        href="https://github.com/Flare3416/password-manager" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 font-semibold py-3 px-2 rounded-lg hover:bg-gray-800/30"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <svg 
                            className="w-6 h-6 fill-current" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span className="text-lg">GitHub</span>
                    </a>
                </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar
