// components/layout/AuthLayout.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LogOut, Menu, X, Bell } from 'lucide-react';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('Partner');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('velora_demo_token');
    const role = localStorage.getItem('velora_user_role');
    
    if (token) {
      setIsLoggedIn(true);
      if (role) setUserRole(role);
    } else {
      // Not logged in and not on the login page or homepage, redirect to login
      const publicPages = ['/', '/login'];
      if (!publicPages.includes(router.pathname)) {
        router.push('/login');
      }
    }
  }, [router.pathname]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('velora_demo_token');
    localStorage.removeItem('velora_user_role');
    setIsLoggedIn(false);
    router.push('/login');
  };
  
  // Update role in localStorage when it changes
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('velora_user_role', newRole);
  };
  
  // Define navigation items
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Data Sources', href: '/data-sources' },
    { name: 'Reports', href: '/reports' },
    { name: 'AI Insights', href: '/ai-insights' }
  ];
  
  // If on a public page (login or home) or not logged in, just render children
  if (router.pathname === '/' || router.pathname === '/login' || !isLoggedIn) {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <img src="/logo.png" alt="Velora AI" className="h-10" />
                <div className="py-1 px-3 bg-white/20 rounded-full text-sm hidden sm:block">Legal Analytics</div>
              </a>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Role Selector */}
            <select
              value={userRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm hidden md:block"
            >
              <option value="Partner">Partner View</option>
              <option value="Attorney">Attorney View</option>
              <option value="Operations">Operations View</option>
            </select>
            
            {/* Notifications */}
            <button className="p-1 rounded-full hover:bg-white/10">
              <Bell className="h-6 w-6" />
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 hover:bg-white/10 rounded-full"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="font-medium">JD</span>
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-1 rounded-full hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    router.pathname === item.href
                      ? 'bg-indigo-50 text-indigo-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="px-3 mb-3">
                <label htmlFor="mobile-role" className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Switch Role
                </label>
                <select
                  id="mobile-role"
                  value={userRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="Partner">Partner View</option>
                  <option value="Attorney">Attorney View</option>
                  <option value="Operations">Operations View</option>
                </select>
              </div>
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-8">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a
                  className={`h-full flex items-center border-b-2 px-1 text-sm font-medium ${
                    router.pathname === item.href
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      
      {/* Demo Mode Indicator */}
      <div className="fixed bottom-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
        Demo Mode
      </div>
    </div>
  );
};

export default AuthLayout;
