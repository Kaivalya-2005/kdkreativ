import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark',
    bg: 'bg-gray-900',
    text: 'text-gray-100',
    accent: 'text-purple-400',
    card: 'bg-gray-800',
    hover: 'hover:bg-gray-700',
    border: 'border-gray-700'
  },
  light: {
    name: 'Light',
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'text-blue-600',
    card: 'bg-white',
    hover: 'hover:bg-gray-100',
    border: 'border-gray-200'
  },
  ocean: {
    name: 'Ocean',
    bg: 'bg-gradient-to-br from-blue-900 via-teal-800 to-cyan-900',
    text: 'text-cyan-50',
    accent: 'text-cyan-300',
    card: 'bg-blue-900/50',
    hover: 'hover:bg-blue-800/50',
    border: 'border-cyan-700'
  },
  solar: {
    name: 'Solar',
    bg: 'bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900',
    text: 'text-amber-50',
    accent: 'text-yellow-300',
    card: 'bg-orange-900/50',
    hover: 'hover:bg-orange-800/50',
    border: 'border-amber-700'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('kdkreativ-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('kdkreativ-theme', themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
