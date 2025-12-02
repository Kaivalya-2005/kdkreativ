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
      className={`fixed top-0 left-0 right-0 z-50 ${theme.card} backdrop-blur-lg bg-opacity-60 border-b ${theme.border}`}
    >
      <nav className="container mx-auto px-9 py-1.5 flex items-center justify-between">
        <Link to="/" onClick={() => {
          sessionStorage.setItem('skipWelcome', 'true');
          sessionStorage.setItem('scrollToTop', 'true');
        }} className="flex items-center space-x-3 gap-4 ">
          <div className="relative shrink-0 " style={{ width: '64px', height: '64px' }}>
            <motion.img
              src={circleLogo}
              alt="KD Kreativ Logo"
              style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              className="absolute inset-0"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            />
            <motion.img
              src={nameLogo}
              alt="KD Kreativ Text"
              style={{ width: '64px', height: '64px', objectFit: 'contain', position: 'absolute', top: 0, left: '1px' }}
              initial={{ opacity: 1 }}
            />
          </div>
          <span className={`text-4xl font-bold ${theme.accent}`}>KD's Kreativ</span>
        </Link>

        <div className="text-2xl flex items-center gap-5">
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
    </motion.header>
  );
};

export default Header;
