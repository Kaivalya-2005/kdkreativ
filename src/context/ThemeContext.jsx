import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark',
    bg: 'bg-[#1C1E22]',
    text: 'text-[#9CA3AF]',
    accent: 'text-[#E2E8F0]',
    card: 'bg-[#25282E]/80',
    hover: 'hover:bg-[#2D3139]/80',
    border: 'border-[#333740]'
  },

  light: {
    name: 'Light',
    bg: 'bg-[#F3F5F7]',
    text: 'text-[#374151]',
    accent: 'text-[#64748B]',
    card: 'bg-[#FFFFFF]/80',
    hover: 'hover:bg-[#F8FAFC]/80',
    border: 'border-[#E2E8F0]'
  },

  ocean: {
    name: 'Ocean',
    bg: 'bg-gradient-to-br from-[#1F2937] via-[#243342] to-[#2C3E50]',
    text: 'text-[#CDD9E5]',
    accent: 'text-[#94A3B8]',
    card: 'bg-[#1F2937]/80',
    hover: 'hover:bg-[#374151]/80',
    border: 'border-[#475569]'
  },

  solar: {
    name: 'Solar',
    bg: 'bg-gradient-to-br from-[#272121] via-[#382E2C] to-[#443632]',
    text: 'text-[#D7CCC8]',
    accent: 'text-[#A1887F]',
    card: 'bg-[#2F2525]/80',
    hover: 'hover:bg-[#3E3230]/80',
    border: 'border-[#5D4037]'
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
