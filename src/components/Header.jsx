import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import circleLogo from '../assets/circle.png';
import nameLogo from '../assets/name.png';

const Header = () => {
  const { theme, themes, currentTheme, changeTheme } = useTheme();
  const location = useLocation();
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect();
          // Check if about section is in the viewport
          setIsAboutInView(rect.top < window.innerHeight && rect.bottom > 0);
        }
      } else {
        // Reset isAboutInView when not on home page
        setIsAboutInView(false);
      }
    };

    // Reset when pathname changes
    if (location.pathname !== '/') {
      setIsAboutInView(false);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 ${theme.card} backdrop-blur-lg md:bg-opacity-60 border-b ${theme.border}`}
      style={{ WebkitBackdropFilter: 'blur(16px)' }}
    >
      <nav className="w-full max-w-[1920px] mx-auto px-4 md:px-9 py-1.5 md:py-1.5 flex items-center justify-between">
        <Link to="/" onClick={() => {
          sessionStorage.setItem('skipWelcome', 'true');
          sessionStorage.setItem('scrollToTop', 'true');
          setIsMobileMenuOpen(false);
        }} className="flex items-center space-x-2 md:space-x-3 gap-2 md:gap-4">
          <div className="relative shrink-0 w-12 h-12 md:w-16 md:h-16">
            <motion.img
              src={circleLogo}
              alt="KD Kreativ Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              className="absolute inset-0"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            />
            <motion.img
              src={nameLogo}
              alt="KD Kreativ Text"
              style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', top: 0, left: '1px' }}
              className=""
              initial={{ opacity: 1 }}
            />
          </div>
          <span className={`text-lg md:text-4xl font-bold ${theme.accent}`}>KD's Kreativ</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg ${theme.text} transition-colors`}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex text-2xl items-center gap-5 shrink-0">
          <motion.button
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                sessionStorage.setItem('skipWelcome', 'true');
                sessionStorage.setItem('scrollToTop', 'true');
                window.location.href = '/';
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isActive('/') && !isAboutInView 
                ? `${theme.accent}` 
                : `${theme.text} opacity-70 hover:opacity-100`
            }`}
          >
            Home
          </motion.button>
          <motion.button
            onClick={() => window.location.href = '/Gallery'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isActive('/Gallery')
                ? `${theme.accent}`
                : `${theme.text} opacity-70 hover:opacity-100`
            }`}
          >
            Gallery
          </motion.button>
          <motion.button
            onClick={() => {
              if (location.pathname === '/') {
                const aboutSection = document.getElementById('about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              } else {
                sessionStorage.setItem('skipWelcome', 'true');
                sessionStorage.setItem('scrollToAbout', 'true');
                window.location.href = '/';
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isAboutInView 
                ? `${theme.accent}` 
                : `${theme.text} opacity-70 hover:opacity-100`
            }`}
          >
            About
          </motion.button>

          {/* Theme Switcher */}
          <div className="relative group">
            <button className={`px-3 py-2 rounded-lg ${theme.card} ${theme.hover} ${theme.text} transition-colors border ${theme.border}`}>
              Theme
            </button>
            <div className={`absolute right-0 mt-2 w-40 ${theme.card} rounded-lg shadow-xl border ${theme.border} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}>
              {Object.keys(themes).map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => changeTheme(themeName)}
                  className={`w-full text-center px-4 py-2 ${theme.text} ${theme.hover} first:rounded-t-lg last:rounded-b-lg transition-colors ${currentTheme === themeName ? theme.accent : ''
                    }`}
                >
                  {themes[themeName].name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden ${theme.bg} border-t ${theme.bg}`}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (location.pathname === '/') {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              } else {
                sessionStorage.setItem('skipWelcome', 'true');
                sessionStorage.setItem('scrollToTop', 'true');
                window.location.href = '/';
              }
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isActive('/') && !isAboutInView 
                ? `${theme.accent}` 
                : `${theme.text} opacity-70`
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              window.location.href = '/Gallery';
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isActive('/Gallery')
                ? `${theme.accent}`
                : `${theme.text} opacity-70`
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (location.pathname === '/') {
                setTimeout(() => {
                  const aboutSection = document.getElementById('about-section');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              } else {
                sessionStorage.setItem('skipWelcome', 'true');
                sessionStorage.setItem('scrollToAbout', 'true');
                window.location.href = '/';
              }
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isAboutInView 
                ? `${theme.accent}` 
                : `${theme.text} opacity-70`
            }`}
          >
            About
          </button>

          {/* Theme Switcher - Mobile */}
          <div className="pt-2 border-t border-opacity-20">
            <p className={`px-4 py-2 text-sm ${theme.text} opacity-60`}>Theme</p>
            <div className="space-y-1">
              {Object.keys(themes).map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => {
                    changeTheme(themeName);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg ${theme.text} transition-colors ${
                    currentTheme === themeName ? theme.accent : ''
                  }`}
                >
                  {themes[themeName].name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
