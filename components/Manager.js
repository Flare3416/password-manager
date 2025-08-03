"use client"
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [formData, setFormData] = useState({ site: "", username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [originalPassword, setOriginalPassword] = useState(null);
  const [expandedPasswordId, setExpandedPasswordId] = useState(null);
  const getConfirmPosition = () => (window.innerWidth < 640 ? "top-right" : "top-center");

  // Helper function to format URLs properly
  const formatUrl = (url) => {
    if (!url) return '';
    
    // If it already has a protocol, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it starts with www. or other common patterns, add https://
    if (url.startsWith('www.') || url.includes('.com') || url.includes('.org') || url.includes('.net') || url.includes('.edu') || url.includes('.gov')) {
      return `https://${url}`;
    }
    
    // For other cases, try to add https://
    return `https://${url}`;
  };

  const defaultToastConfig = { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "dark" };

  useEffect(() => {
    const savedPasswords = localStorage.getItem('nexlock-passwords')
    if (savedPasswords) {
      setPasswords(JSON.parse(savedPasswords))
    } else {
      setPasswords([])
    }
  }, [])

  useEffect(() => {
    if (passwords.length > 0) {
      localStorage.setItem('nexlock-passwords', JSON.stringify(passwords));
    }
  }, [passwords]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.site.trim()) newErrors.site = "Please fill website URL";
    if (!formData.username.trim()) newErrors.username = "Please fill username";
    if (!formData.password.trim()) newErrors.password = "Please fill password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const savePassword = () => {
    if (validateForm()) {
      if (editingId) {
        const updatedPassword = {
          id: editingId,
          site: formData.site,
          username: formData.username,
          password: formData.password
        }

        setPasswords(prev => [updatedPassword, ...prev.filter(p => p.id !== editingId)])
        setFormData({ site: "", username: "", password: "" })
        setEditingId(null)
        setOriginalPassword(null)

        toast.success("Password updated successfully!", { ...defaultToastConfig, className: "toast-save" });
      } else {
        const newPassword = { id: uuidv4(), site: formData.site, username: formData.username, password: formData.password };
        setPasswords(prev => [newPassword, ...prev]);
        setFormData({ site: "", username: "", password: "" });

        toast.success("Password saved successfully!", { ...defaultToastConfig, className: "toast-save" });
      }
    }
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${type} copied to clipboard!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "toast-copy"
      })
    } catch (err) {
      console.error('Failed to copy: ', err)
      toast.error("Failed to copy to clipboard", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "toast-error"
      })
    }
  }

  const deletePassword = (id) => {
    toast.dismiss();

    const confirmDelete = () => {
      setPasswords(prev => prev.filter(password => password.id !== id))
      toast.dismiss();

      toast.error("Password deleted successfully!", { ...defaultToastConfig, className: "toast-delete" });
    }

    const cancelDelete = () => {
      toast.dismiss();
    }

    // Custom confirmation toast with clean design
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col">
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-lg font-semibold text-white">Delete?</h3>
          </div>
          <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
            This action cannot be undone. The password will be permanently removed.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                cancelDelete();
                closeToast();
              }}
              className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-blue-400 text-sm font-medium rounded-lg transition-all duration-200 border border-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmDelete();
                closeToast();
              }}
              className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-red-400 text-sm font-medium rounded-lg transition-all duration-200 border border-gray-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        position: getConfirmPosition(),
        autoClose: false, // Don't auto-close
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        className: "toast-confirm-delete-clean",
        closeButton: false // Remove the X button
      }
    )
  }

  const editPassword = (id) => {
    toast.dismiss();

    const passwordToEdit = passwords.find(password => password.id === id)

    const confirmEdit = () => {
      setOriginalPassword(passwordToEdit)

      setFormData({
        site: passwordToEdit.site,
        username: passwordToEdit.username,
        password: passwordToEdit.password
      })

      setPasswords(prev => prev.filter(password => password.id !== id))
      setEditingId(id)

      toast.dismiss();

      toast.success("Password loaded for editing!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        className: "toast-copy"
      })
    }

    const cancelEdit = () => {
      toast.dismiss();
    }

    // Custom confirmation toast for edit
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-lg font-semibold text-white">Edit Password?</h3>
          </div>
          <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
            This will load the password data into the form for editing.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => {
                cancelEdit();
                closeToast();
              }}
              className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-blue-400 text-sm font-medium rounded-lg transition-all duration-200 border border-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmEdit();
                closeToast();
              }}
              className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-yellow-400 text-sm font-medium rounded-lg transition-all duration-200 border border-gray-600"
            >
              Edit
            </button>
          </div>
        </div>
      ),
      {
        position: getConfirmPosition(),
        autoClose: false, // Don't auto-close
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        className: "toast-confirm-delete-clean",
        closeButton: false // Remove the X button
      }
    )
  }

  return (
    <>
      <ToastContainer
        enableMultiContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={4}
      />
      <ToastContainer
        containerId="confirm"
        enableMultiContainer
        position="top-center"
        autoClose={false}
        hideProgressBar
        closeOnClick={false}
        pauseOnHover={false}
        draggable={false}
        theme="dark"
      />
      <div className="fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="h-screen flex flex-col pt-[3vh] px-[2vw] pb-[4vh] overflow-y-auto">
        <div className="text-center mb-[3vh]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-creepster), cursive' }}>
            &lt; Nex<span className="text-purple-400">LOCK</span> /&gt;
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Your Password Manager</p>
        </div>

        <div className="max-w-4xl mx-auto w-full bg-black/40 backdrop-blur-lg rounded-lg p-[2vh] border border-gray-700/50 shadow-2xl mb-[3vh]">
          <div className="grid gap-[2vh]">
            <div>
              <input
                type="url"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                placeholder="Enter website URL"
                className={`w-full px-[1vw] py-[1vh] bg-gray-900/60 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm ${errors.site ? 'border-red-500/50' : 'border-gray-600/50'
                  }`}
              />
              {errors.site && (
                <p className="mt-1 text-red-400 text-xs">{errors.site}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-[2vh]">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter Username"
                  className={`w-full px-[1vw] py-[1vh] bg-gray-900/60 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm ${errors.username ? 'border-red-500/50' : 'border-gray-600/50'
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
                  className={`w-full px-[1vw] py-[1vh] pr-[4vw] bg-gray-900/60 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm ${errors.password ? 'border-red-500/50' : 'border-gray-600/50'
                    }`}
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute right-[1vw] top-[1vh] text-gray-400 hover:text-white transition-colors hover:cursor-pointer"
                >
                  <img
                    src={showPassword ? "/view.svg" : "/closedview.svg"}
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </button>
                {errors.password && (
                  <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={savePassword}
                type="button"
                className="px-[2vw] py-[1vh] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm flex items-center gap-2 mx-auto"
              >
                <img
                  src="/lock.svg"
                  alt="Lock"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                {editingId ? "Update Password" : "Save Password"}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    // Restore the original password data
                    if (originalPassword) {
                      setPasswords(prev => [originalPassword, ...prev])
                    }
                    setFormData({ site: "", username: "", password: "" })
                    setEditingId(null)
                    setOriginalPassword(null)
                    toast.info("Edit cancelled", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "dark",
                      className: "toast-error"
                    })
                  }}
                  type="button"
                  className="mt-[1vh] px-[1.5vw] py-[0.5vh] bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-all duration-300 text-sm"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full mb-[2vh] min-h-[40vh]">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-[2vh] px-[0.5vw]" style={{ fontFamily: 'var(--font-griffy), serif' }}>
            Your Passwords
          </h2>

          <div className="bg-black/40 backdrop-blur-lg rounded-lg border border-gray-700/50 shadow-2xl mb-[1vh] min-h-[40vh] ">
            <div className="hidden sm:block bg-gradient-to-r from-gray-800 to-gray-900 px-[1vw] py-[1vh] flex-shrink-0">
              <div className="grid grid-cols-4 gap-[1vw] text-gray-200 font-semibold text-sm">
                <div>Site</div>
                <div>Username</div>
                <div>Password</div>
                <div className="text-center">Actions</div>
              </div>
            </div>

            {/* Table Content with Custom Scrollbar */}
            <div className="overflow-y-auto h-[40vh]  custom-scrollbar">
              <div className="divide-y divide-gray-700/50 min-h-[25vh]">
                {passwords.length === 0 ? (
                  <div className="px-[1vw] py-[3vh] text-center text-gray-400 text-sm flex items-center justify-center h-[20vh]">
                    No passwords saved yet. Add your first password above!
                  </div>
                ) : (
                  passwords
                    .filter(password => password && password.id && typeof password === 'object')
                    .map((password) => (
                      <div key={password.id} className="px-[1vw] py-[1vh] hover:bg-gray-800/30 transition-colors duration-200">
                        <div className="hidden sm:grid grid-cols-4 gap-[1vw] items-center text-gray-300 text-sm">
                          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                            <a
                              href={formatUrl(password?.site || '')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate block cursor-pointer hover:text-blue-300 hover:underline transition-colors max-w-[120px] lg:max-w-[200px] text-blue-400"
                              title={`Open ${password?.site || ''} in new tab`}
                            >
                              {(password?.site || '').length > 25 ? `${(password?.site || '').substring(0, 25)}...` : (password?.site || '')}
                            </a>
                            <button
                              className="text-gray-400 hover:text-white transition-colors flex-shrink-0 group relative p-1 hover:bg-gray-700/30 rounded"
                              title="Copy Site URL"
                              onClick={() => copyToClipboard(password?.site || '', "Site URL")}
                            >
                              <img
                                src="/copy.svg"
                                alt="Copy"
                                className="w-3.5 h-3.5 lg:w-4 lg:h-4 filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                              />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                            <span
                              className="truncate block cursor-pointer hover:text-white transition-colors max-w-[100px] lg:max-w-[120px]"
                              title={password?.username || ''}
                            >
                              {(password?.username || '').length > 12 ? `${(password?.username || '').substring(0, 12)}...` : (password?.username || '')}
                            </span>
                            <button
                              className="text-gray-400 hover:text-white transition-colors flex-shrink-0 group relative p-1 hover:bg-gray-700/30 rounded"
                              title="Copy Username"
                              onClick={() => copyToClipboard(password?.username || '', "Username")}
                            >
                              <img
                                src="/copy.svg"
                                alt="Copy"
                                className="w-3.5 h-3.5 lg:w-4 lg:h-4 filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                              />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 lg:gap-3 min-w-0">
                            <span className="truncate block">••••••••</span>
                            <button
                              className="text-gray-400 hover:text-white transition-colors flex-shrink-0 group relative p-1 hover:bg-gray-700/30 rounded"
                              title="Copy Password"
                              onClick={() => copyToClipboard(password?.password || '', "Password")}
                            >
                              <img
                                src="/copy.svg"
                                alt="Copy"
                                className="w-3.5 h-3.5 lg:w-4 lg:h-4 filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                              />
                            </button>
                          </div>
                          <div className="flex gap-2 lg:gap-3 justify-center items-center">
                            <button
                              className="group relative transition-all duration-200 hover:scale-110 p-1.5 hover:bg-blue-600/20 rounded-lg"
                              title="Edit Password"
                              onClick={() => editPassword(password.id)}
                            >
                              <img
                                src="/edit.svg"
                                alt="Edit"
                                className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-all duration-200"
                                style={{ filter: 'brightness(0) saturate(100%) invert(59%) sepia(85%) saturate(2076%) hue-rotate(200deg) brightness(105%) contrast(101%)' }}
                              />
                            </button>
                            <button
                              className="group relative transition-all duration-200 hover:scale-110 p-1.5 hover:bg-red-600/20 rounded-lg"
                              title="Delete Password"
                              onClick={() => deletePassword(password.id)}
                            >
                              <img
                                src="/bin.svg"
                                alt="Delete"
                                className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-all duration-200"
                                style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(1919%) hue-rotate(336deg) brightness(98%) contrast(94%)' }}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="sm:hidden">
                          {expandedPasswordId === password.id ? (
                            // Expanded view with all details
                            <div className="space-y-3 bg-gray-800/20 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">Site</span>
                                  <a
                                    href={formatUrl(password?.site || '')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-blue-400 hover:text-blue-300 hover:underline text-sm cursor-pointer transition-colors"
                                    title={`Open ${password?.site || ''} in new tab`}
                                  >
                                    {(password?.site || '').length > 20 ? `${(password?.site || '').substring(0, 20)}...` : (password?.site || '')}
                                  </a>
                                </div>
                                <button
                                  className="text-gray-400 hover:text-purple-400 transition-colors flex-shrink-0 p-2 hover:bg-gray-700/30 rounded-lg"
                                  title="Copy Site URL"
                                  onClick={() => copyToClipboard(password?.site || '', "Site URL")}
                                >
                                  <img
                                    src="/copy.svg"
                                    alt="Copy"
                                    className="w-4 h-4 filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                                  />
                                </button>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">User</span>
                                  <span
                                    className="truncate text-gray-300 text-sm cursor-pointer hover:text-white transition-colors"
                                    title={password?.username || ''}
                                  >
                                    {(password?.username || '').length > 18 ? `${(password?.username || '').substring(0, 18)}...` : (password?.username || '')}
                                  </span>
                                </div>
                                <button
                                  className="text-gray-400 hover:text-purple-400 transition-colors flex-shrink-0 p-2 hover:bg-gray-700/30 rounded-lg"
                                  title="Copy Username"
                                  onClick={() => copyToClipboard(password?.username || '', "Username")}
                                >
                                  <img
                                    src="/copy.svg"
                                    alt="Copy"
                                    className="w-4 h-4 filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                                  />
                                </button>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">Pass</span>
                                  <span className="text-gray-300 text-sm">••••••••••</span>
                                </div>
                                <button
                                  className="text-gray-400 hover:text-purple-400 transition-colors flex-shrink-0 p-2 hover:bg-gray-700/30 rounded-lg"
                                  title="Copy Password"
                                  onClick={() => copyToClipboard(password?.password || '', "Password")}
                                >
                                  <img
                                    src="/copy.svg"
                                    alt="Copy"
                                    className="w-4 h-4 filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                                  />
                                </button>
                              </div>

                              <div className="flex gap-3 pt-3 border-t border-gray-700/30">
                                <button
                                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 text-sm font-medium rounded-lg transition-all duration-200 flex-1 border border-blue-600/20 hover:border-blue-600/40"
                                  onClick={() => editPassword(password.id)}
                                >
                                  <img
                                    src="/edit.svg"
                                    alt="Edit"
                                    className="w-4 h-4"
                                    style={{ filter: 'brightness(0) saturate(100%) invert(59%) sepia(85%) saturate(2076%) hue-rotate(200deg) brightness(105%) contrast(101%)' }}
                                  />
                                  <span>Edit</span>
                                </button>
                                <button
                                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-all duration-200 flex-1 border border-red-600/20 hover:border-red-600/40"
                                  onClick={() => deletePassword(password.id)}
                                >
                                  <img
                                    src="/bin.svg"
                                    alt="Delete"
                                    className="w-4 h-4"
                                    style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(77%) saturate(1919%) hue-rotate(336deg) brightness(98%) contrast(94%)' }}
                                  />
                                  <span>Delete</span>
                                </button>
                              </div>

                              <div className="flex justify-center pt-2">
                                <button
                                  className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-purple-400 text-xs font-medium transition-all duration-200"
                                  onClick={() => setExpandedPasswordId(null)}
                                >
                                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                  <span>Collapse</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            // Collapsed view - only site name
                            <div
                              className="flex items-center justify-between py-3 px-4 bg-gray-800/10 hover:bg-gray-800/20 rounded-lg transition-all duration-200 cursor-pointer border border-gray-700/30 hover:border-purple-500/30"
                              onClick={() => setExpandedPasswordId(password.id)}
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-purple-400 text-sm font-semibold">
                                    {(password?.site || '').charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <a
                                    href={formatUrl(password?.site || '')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-blue-400 hover:text-blue-300 hover:underline text-base font-medium transition-colors block"
                                    title={`Open ${password?.site || ''} in new tab`}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {(password?.site || '').length > 25 ? `${(password?.site || '').substring(0, 25)}...` : (password?.site || '')}
                                  </a>
                                  <p className="text-xs text-gray-500 truncate" title={password?.username || ''}>
                                    {(password?.username || '').length > 30 ? `${(password?.username || '').substring(0, 30)}...` : (password?.username || '')}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="text-xs text-gray-500 font-medium">
                                  Tap to expand
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          )}
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
