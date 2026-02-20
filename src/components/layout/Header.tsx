import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Search, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'خانه', path: '/' },
    { name: 'قرآن کریم', path: '/quran' },
    { name: 'احادیث بخاری', path: '/hadith' },
    { name: 'ذکرها و دعاها', path: '/dhikr' },
    { name: 'درباره ما', path: '/about' },
  ];

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return saved === 'dark' || (!saved && prefersDark);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm dark:bg-gray-900/90 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-primary-600 hover:opacity-80 transition-opacity">
          <BookOpen className="w-8 h-8 text-sky-500" />
          <span className="text-xl font-bold text-gray-800 tracking-tight dark:text-white">قرآن عبدالمتین</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-sky-600 ${
                location.pathname === item.path ? 'text-sky-600' : 'text-gray-600 dark:text-gray-300 dark:hover:text-sky-400'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-sky-600 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-sky-400">
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-sky-600 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-yellow-400"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden dark:bg-gray-900 dark:border-gray-800"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    location.pathname === item.path ? 'text-sky-600 bg-sky-50 dark:bg-gray-800' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between p-2 border-t border-gray-100 dark:border-gray-800 mt-2 pt-4">
                <span className="text-gray-600 dark:text-gray-300">حالت شب</span>
                <button 
                  onClick={toggleTheme}
                  className="p-2 text-gray-500 hover:text-sky-600 transition-colors rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
