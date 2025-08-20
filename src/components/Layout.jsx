import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Plus, User, Trophy, Bookmark, Users, Sun, Moon, BarChart3, Map, TrendingUp, UserCheck, Activity, Menu, X, Target, Folder } from 'lucide-react';
import { useState } from 'react';
import useStore from '../store/useStore';

const Layout = ({ children }) => {
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Primary navigation for main features
  const primaryNavigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Create', href: '/create', icon: Plus },
    { name: 'Groups', href: '/groups', icon: Users },
    { name: 'Social', href: '/social-feed', icon: Activity },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  // Secondary navigation for additional features
  const secondaryNavigation = [
    { name: 'Challenges', href: '/challenges', icon: Users },
    { name: 'Mentorship', href: '/mentorship', icon: UserCheck },
    { name: 'Quiz', href: '/quiz', icon: Target },
    { name: 'Media Library', href: '/media-library', icon: Folder },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Learning Paths', href: '/learning-paths', icon: Map },
    { name: 'Difficulty Assessment', href: '/difficulty-assessment', icon: TrendingUp },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  ];

  const allNavigation = [...primaryNavigation, ...secondaryNavigation];

  const isActive = (path) => location.pathname === path;

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="Skilllet Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Skilllet</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 xl:space-x-2">
              {primaryNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden xl:block">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* More Menu for Additional Navigation */}
            <div className="hidden lg:block relative">
              <div className="group">
                <button className="flex items-center space-x-1 px-2 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                  <span>More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {secondaryNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md ${
                          isActive(item.href) ? 'bg-gray-100 dark:bg-gray-700' : ''
                        }`}
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side - User Menu & Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 hidden dark:block" />
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 dark:hidden" />
              </button>

              {/* Desktop User Menu */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center space-x-2 lg:space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                  >
                    <img
                      src={currentUser?.avatar || 'https://api.dicebear.com/7.x/lorelei/svg?seed=default'}
                      alt={currentUser?.username}
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full"
                    />
                    <span className="hidden lg:block">{currentUser?.username}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hidden lg:block"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-sm px-3 py-1.5"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="px-3 py-3 space-y-1 max-h-96 overflow-y-auto">
              {allNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile User Actions */}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <img
                      src={currentUser?.avatar || 'https://api.dicebear.com/7.x/lorelei/svg?seed=default'}
                      alt={currentUser?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{currentUser?.username}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 w-full text-left"
                  >
                    <User size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 dark:bg-gray-800 dark:border-gray-700 z-50">
        <div className="grid grid-cols-5 gap-1">
          {primaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default Layout;