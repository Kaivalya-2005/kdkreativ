import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import circleLogo from '../assets/circle.png';
import nameLogo from '../assets/name.png';

const Loading = ({ message = 'Loading artworks...' }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${theme.bg}`}
    >
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(121, 183, 145, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(11, 110, 79, 0.3) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite'
          }} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center justify-center gap-8 px-8"
      >
        {/* Logo with elegant animation */}
        <motion.div 
          className="relative" 
          style={{ width: '100px', height: '100px' }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={circleLogo}
            alt="KD Kreativ Logo"
            style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            className="absolute inset-0 drop-shadow-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />
          <motion.img
            src={nameLogo}
            alt="KD Kreativ Text"
            style={{ 
              width: '100px', 
              height: '100px', 
              objectFit: 'contain', 
              position: 'absolute', 
              top: 0, 
              left: '2px' 
            }}
            className="drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Loading text with elegant animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p 
            className="text-xl text-white/90 tracking-wider font-light"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              letterSpacing: '0.1em'
            }}
          >
            {message}
          </p>
          
          {/* Animated dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#79B791]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-[#79B791] to-[#0B6E4F]"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
