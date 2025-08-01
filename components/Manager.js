import React from 'react'

const Manager = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="h-screen flex flex-col pt-12 p-4 pb-16 overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-creepster), cursive' }}>
            &lt; Nex<span className="text-purple-400">LOCK</span> /&gt;
          </h1>
          <p className="text-gray-300 text-base">Your Password Manager</p>
        </div>

        {/* Input Form Section */}
        <div className="max-w-4xl mx-auto w-full bg-black/40 backdrop-blur-lg rounded-lg p-5 border border-gray-700/50 shadow-2xl mb-10">
          <div className="grid gap-3">
            {/* Website URL Input */}
            <div>
              <input
                type="url"
                placeholder="Enter website URL"
                className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/50 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm"
              />
            </div>

            {/* Username and Password Row */}
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Enter Username"
                className="px-4 py-3 bg-gray-900/60 border border-gray-600/50 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm"
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 pr-12 bg-gray-900/60 border border-gray-600/50 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-sm">
                  👁️
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm">
                🔒 Save
              </button>
            </div>
          </div>
        </div>

        {/* Passwords Table Section */}
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col min-h-0 mb-4">
          <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-griffy), serif' }}>
            Your Passwords
          </h2>

          <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-2xl overflow-hidden flex-1 flex flex-col mb-4">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 py-2 flex-shrink-0">
              <div className="grid grid-cols-12 gap-1.5 text-gray-200 font-semibold text-xs">
                <div className="col-span-4">Site</div>
                <div className="col-span-3">Username</div>
                <div className="col-span-3">Password</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            {/* Table Content with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="divide-y divide-gray-700/50">
                {/* Sample Rows - Multiple for testing scrollbar */}
                <div className="px-4 py-3 hover:bg-gray-800/30 transition-colors duration-200">
                  <div className="grid grid-cols-12 gap-2 items-center text-gray-300 text-sm">
                    <div className="col-span-4 flex items-center gap-2 truncate">
                      <span className="truncate">https://www.codewithharry.com/</span>
                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                    </div>
                    <div className="col-span-3 flex items-center gap-2 truncate">
                      <span className="truncate">harry</span>
                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                    </div>
                    <div className="col-span-3 flex items-center gap-2 truncate">
                      <span className="truncate">••••••</span>
                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                    </div>
                    <div className="col-span-2 flex gap-1 justify-end">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">✏️</button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">🗑️</button>
                    </div>
                  </div>
                </div>

                {/* Additional dummy data for scrollbar testing */}
                <div className="px-4 py-3 hover:bg-gray-800/30 transition-colors duration-200">
                  <div className="grid grid-cols-12 gap-2 items-center text-gray-300 text-sm">
                    <div className="col-span-4 flex items-center gap-2 truncate">
                      <span className="truncate">https://www.github.com/</span>
                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                    </div>
                    <div className="col-span-3 flex items-center gap-2 truncate">
                      <span className="truncate">developer123</span>
                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                    </div>
                    <div className="col-span-3 flex items-center gap-2 truncate">
                      <span className="truncate">••••••••</span>
                      <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                    </div>
                    <div className="col-span-2 flex gap-1 justify-end">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">✏️</button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">🗑️</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
