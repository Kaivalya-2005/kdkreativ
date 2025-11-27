import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme.card} border-t ${theme.border} py-8 mt-20`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className={`${theme.text} text-sm mb-4 md:mb-0`}>
            © {new Date().getFullYear()} KD Kreativ. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${theme.text} hover:${theme.accent} transition-colors`}
            >
              Instagram
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${theme.text} hover:${theme.accent} transition-colors`}
            >
              Twitter
            </a>
            <a 
              href="mailto:contact@kdkreativ.com"
              className={`${theme.text} hover:${theme.accent} transition-colors`}
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
