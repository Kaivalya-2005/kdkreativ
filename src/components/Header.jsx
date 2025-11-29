import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

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
      }
    };

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
      <nav className="container mx-auto px-9 py-3 flex items-center justify-between ">
        <Link to="/" className="flex items-center space-x-3 gap-4 ">
          <div className="relative shrink-0 " style={{ width: '64px', height: '64px' }}>
            <motion.img
              src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764246725/logo_circle1_au6wyw.png"
              alt="KD Kreativ Logo"
              style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              className="absolute inset-0"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            />
            <motion.img
              src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764248620/name_kd_wftrsu.png"
              alt="KD Kreativ Text"
              style={{ width: '64px', height: '64px', objectFit: 'contain', position: 'absolute', top: 0, left: '2px' }}
              initial={{ opacity: 1 }}
            />
          </div>
          <span className={`text-5xl font-bold ${theme.accent}`}>KD's Kreativ</span>
        </Link>

        <div className="text-3xl flex items-center space-x-8 gap-5">
          <button
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.location.href = '/';
              }
            }}
            className={`transition-colors font-medium ${isActive('/') && !isAboutInView
                ? `${theme.accent}`
                : `${theme.text} hover:${theme.accent}`
              }`}
          >
            Home
          </button>
          <Link
            to="/Gallery"
            className={`${theme.text} hover:${theme.accent} transition-colors font-medium ${isActive('/Gallery') ? theme.accent : ''
              }`}
          >
            Gallery
          </Link>
          <button
            onClick={() => {
              if (location.pathname === '/') {
                const aboutSection = document.getElementById('about-section');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              } else {
                window.location.href = '/';
              }
            }}
            className={`transition-colors font-medium ${isAboutInView
                ? `${theme.accent}`
                : `${theme.text} hover:${theme.accent}`
              }`}
          >
            About
          </button>

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
