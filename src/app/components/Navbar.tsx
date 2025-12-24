'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CreditDisplay from './CreditDisplay';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut, loading } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = {
    tools: ['Image Upscaling', 'Background Remover', 'Object Detection', 'Style Transfer'],
    developers: ['API Documentation', 'SDKs', 'Code Examples', 'Pricing Plans'],
  };

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center py-3 px-4 sm:px-6">
        <p className="text-sm sm:text-base">
          🎄 Holiday Sale: Get 30% off on all Pro plans. Use code at checkout{' '}
          <span className="font-bold border border-white rounded-full px-3 py-1 ml-2 inline-block">
            SALE 30
          </span>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✕</span>
                </div>
                <span className="hidden sm:inline text-xl sm:text-2xl font-bold text-gray-900">
                  ImageUpscale
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {/* AI Tools Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm lg:text-base">
                  <span>AI Tools</span>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {menuItems.tools.map((item) => (
                    <Link
                      key={item}
                      href={`/tools/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Developers Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm lg:text-base">
                  <span>Developers</span>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {menuItems.developers.map((item) => (
                    <Link
                      key={item}
                      href={`/developers/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <Link
                href="/pricing"
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm lg:text-base"
              >
                Pricing
              </Link>
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Credit Display */}
              <CreditDisplay />
              
              {/* Auth Section */}
              {loading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-violet-600 border-t-transparent"></div>
              ) : user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    <User size={16} />
                    <span className="text-sm font-medium">{user.email}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors text-sm"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors text-sm"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors text-sm"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-gray-700 hover:text-violet-600 transition-colors font-medium text-sm"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X size={24} className="text-gray-900" />
              ) : (
                <Menu size={24} className="text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              {/* Mobile AI Tools */}
              <div className="py-2">
                <button
                  onClick={() => toggleDropdown('tools')}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium">AI Tools</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      activeDropdown === 'tools' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeDropdown === 'tools' && (
                  <div className="pl-4">
                    {menuItems.tools.map((item) => (
                      <Link
                        key={item}
                        href={`/tools/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Developers */}
              <div className="py-2">
                <button
                  onClick={() => toggleDropdown('developers')}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium">Developers</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      activeDropdown === 'developers' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeDropdown === 'developers' && (
                  <div className="pl-4">
                    {menuItems.developers.map((item) => (
                      <Link
                        key={item}
                        href={`/developers/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Pricing */}
              <div className="py-2">
                <Link
                  href="/pricing"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Pricing
                </Link>
              </div>

              {/* Mobile Auth */}
              {user ? (
                <>
                  <div className="py-2">
                    <div className="px-4 py-2 text-gray-700 font-medium">
                      {user.email}
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Dashboard
                    </Link>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="py-2">
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="py-2 px-4">
                    <Link
                      href="/auth/signup"
                      className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-medium text-center"
                    >
                      Sign up
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
