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
    text: 'text-[#374151]/60',
    accent: 'text-[#64748B]',
    card: 'bg-[#FFFFFF]/80',
    hover: 'hover:bg-[#F8FAFC]/80',
    border: 'border-[#E2E8F0]'
  },

  ocean: {
    name: 'Ocean',
    bg: 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]',
    text: 'text-[#94A3B8]',
    accent: 'text-[#E2E8F0]',
    card: 'bg-[#1E293B]/70',
    hover: 'hover:bg-[#334155]/70',
    border: 'border-[#334155]/50'
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

  useEffect(() => {
    // Update body, html background, and meta theme-color when theme changes
    const root = document.documentElement;
    const body = document.body;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (currentTheme === 'light') {
      root.style.backgroundColor = '#F3F5F7';
      body.style.backgroundColor = '#F3F5F7';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#F3F5F7');
    } else if (currentTheme === 'ocean') {
      root.style.background = 'linear-gradient(to bottom right, #0F172A, #1E293B, #0F172A)';
      body.style.background = 'linear-gradient(to bottom right, #0F172A, #1E293B, #0F172A)';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0F172A');
    } else {
      root.style.backgroundColor = '#1C1E22';
      body.style.backgroundColor = '#1C1E22';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#1C1E22');
    }
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('kdkreativ-theme', themeName);
    
    // Store background color info
    const bgColors = {
      dark: '#1C1E22',
      light: '#F3F5F7',
      ocean: '#0F172A'
    };
    localStorage.setItem('kdkreativ-theme-bg', bgColors[themeName]);
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
