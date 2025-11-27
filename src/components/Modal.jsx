import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Modal = ({ artwork, onClose }) => {
  const { theme } = useTheme();

  if (!artwork) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`${theme.card} rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl`}
        >
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="relative">
              <img
                src={artwork.image_url}
                alt={artwork.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${theme.accent}`}>
                  {artwork.title}
                </h2>
                <p className={`${theme.text} text-lg mb-4`}>
                  {artwork.description}
                </p>
                <p className={`${theme.text} opacity-70 text-sm`}>
                  Created on: {new Date(artwork.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <button
                onClick={onClose}
                className={`mt-6 px-6 py-3 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
