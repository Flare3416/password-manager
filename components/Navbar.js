import React from 'react'

const Navbar = () => {
return (
    <nav className="relative px-6 py-4 shadow-2xl border-b border-gray-800/50" 
         style={{
           background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
           fontFamily: 'var(--font-creepster), var(--font-griffy), cursive'
         }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-black/20 to-gray-900/30"></div>
        <div className="relative container mx-auto flex items-center justify-between">
            <div className="text-3xl font-bold text-white mb-2" style={{fontFamily: 'var(--font-creepster), cursive'}}>
                &lt; Nex<span className="text-purple-400">LOCK</span> /&gt;
            </div>
            <ul className="flex space-x-8">
                <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-semibold tracking-wide drop-shadow-md hover:drop-shadow-lg hover:scale-110 relative">
                        <span className="relative z-10">🏠 Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-semibold tracking-wide drop-shadow-md hover:drop-shadow-lg hover:scale-110 relative">
                        <span className="relative z-10">🔑 Passwords</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-all duration-300 font-semibold tracking-wide drop-shadow-md hover:drop-shadow-lg hover:scale-110 relative">
                        <span className="relative z-10">⚙️ Settings</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
)
}

export default Navbar
