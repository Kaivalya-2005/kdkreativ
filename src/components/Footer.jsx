import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme.card} border-t ${theme.border} py-4 md:py-8 mt-8 md:mt-20`}>
      <div className="container mx-auto px-3 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          <div className={`${theme.text} text-sm md:text-sm mb-1 md:mb-0 text-center md:text-left`}>
            &copy; {new Date().getFullYear()} KD Kreativ. All rights reserved.
          </div>
          
          <div className="flex space-x-3 md:space-x-6">
            <a 
              href="https://instagram.com/kaivalya738" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-1.5 md:px-3 text-sm md:text-base ${theme.text} hover:${theme.accent} transition-colors`}
            >
              Instagram
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`px-1.5 md:px-3 text-sm md:text-base ${theme.text} hover:${theme.accent} transition-colors`}
            >
              Twitter
            </a>
            <a 
              href="mailto:contact@kdkreativ.com"
              className={`px-1.5 md:px-3 text-sm md:text-base ${theme.text} hover:${theme.accent} transition-colors`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
