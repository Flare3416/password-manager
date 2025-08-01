"use client"
import React, { useState } from 'react'

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState([
    { id: 1, site: "https://www.blablabla.com/", username: "bot1234", password: "password123" },
    { id: 2, site: "https://www.github.com/", username: "developer123", password: "securepass" }
  ])
  const [formData, setFormData] = useState({
    site: "",
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.site.trim()) {
      newErrors.site = "Please fill website URL"
    } 
    
    if (!formData.username.trim()) {
      newErrors.username = "Please fill username"
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Please fill password"
    } 
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const savePassword = () => {
    // Clear previous messages
    setSuccessMessage("")
    
    if (validateForm()) {
      const newPassword = {
        id: Date.now(), // Simple ID generation
        site: formData.site,
        username: formData.username,
        password: formData.password
      }
      
      setPasswords(prev => [newPassword, ...prev])
      setFormData({ site: "", username: "", password: "" })
      setSuccessMessage("Password saved successfully!")
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }
  }
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
          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
              {successMessage}
            </div>
          )}
          
          <div className="grid gap-3">
            {/* Website URL Input */}
            <div>
              <input
                type="url"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                placeholder="Enter website URL"
                className={`w-full px-4 py-3 bg-gray-900/60 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm ${
                  errors.site ? 'border-red-500/50' : 'border-gray-600/50'
                }`}
              />
              {errors.site && (
                <p className="mt-1 text-red-400 text-xs">{errors.site}</p>
              )}
            </div>

            {/* Username and Password Row */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter Username"
                  className={`w-full px-4 py-3 bg-gray-900/60 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm ${
                    errors.username ? 'border-red-500/50' : 'border-gray-600/50'
                  }`}
                />
                {errors.username && (
                  <p className="mt-1 text-red-400 text-xs">{errors.username}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 pr-12 bg-gray-900/60 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm ${
                    errors.password ? 'border-red-500/50' : 'border-gray-600/50'
                  }`}
                />
                <button 
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
                >
                  <img 
                    src={showPassword ? "/view.svg" : "/closedview.svg"} 
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="w-6 h-6"
                  />
                </button>
                {errors.password && (
                  <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button 
                onClick={savePassword} 
                type="button"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm"
              >
                🔒 Save Password
              </button>
            </div>
          </div>
        </div>

        {/* Passwords Table Section */}
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0 mb-4">
          <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-griffy), serif' }}>
            Your Passwords
          </h2>

          <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-2xl overflow-hidden flex-1 flex flex-col mb-4">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex-shrink-0">
              <div className="grid grid-cols-4 gap-4 text-gray-200 font-semibold text-sm">
                <div>Site</div>
                <div>Username</div>
                <div>Password</div>
                <div className="text-center">Actions</div>
              </div>
            </div>

            {/* Table Content with Custom Scrollbar */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="divide-y divide-gray-700/50">
                {passwords.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400">
                    No passwords saved yet. Add your first password above!
                  </div>
                ) : (
                  passwords.map((password) => (
                    <div key={password.id} className="px-4 py-4 hover:bg-gray-800/30 transition-colors duration-200">
                      <div className="grid grid-cols-4 gap-6 items-center text-gray-300 text-sm">
                        <div className="flex items-center gap-3 min-w-0">
                          <span 
                            className="truncate block cursor-pointer hover:text-white transition-colors max-w-[200px]"
                            title={password.site}
                          >
                            {password.site.length > 30 ? `${password.site.substring(0, 30)}...` : password.site}
                          </span>
                          <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                        </div>
                        <div className="flex items-center gap-3 min-w-0">
                          <span 
                            className="truncate block cursor-pointer hover:text-white transition-colors max-w-[120px]"
                            title={password.username}
                          >
                            {password.username.length > 15 ? `${password.username.substring(0, 15)}...` : password.username}
                          </span>
                          <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                        </div>
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="truncate block">••••••••</span>
                          <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0">📋</button>
                        </div>
                        <div className="flex gap-3 justify-center flex-shrink-0">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">✏️</button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager
