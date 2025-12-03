import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`${theme.card} rounded-xl md:rounded-2xl max-w-5xl w-full h-auto md:max-h-[90vh] md:overflow-y-auto shadow-2xl`}
        >
          {/* Mobile Layout - Vertical Stack */}
          <div className="md:hidden flex flex-col max-h-[95vh]">
            {/* Image Section - Takes most space */}
            <div className="flex items-center justify-center bg-black/5 rounded-t-xl p-3" style={{ height: 'calc(95vh - 180px)' }}>
              <img
                src={getOptimizedImageUrl(artwork.image_url, 'medium')}
                alt={artwork.title}
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>

            {/* Details Section - Compact at bottom */}
            <div className={`${theme.card} p-3 rounded-b-xl border-t ${theme.border} shrink-0`}>
              <h2 className={`text-lg font-bold mb-1 ${theme.accent}`}>
                {artwork.title}
              </h2>
              <p className={`${theme.text} text-sm mb-2 line-clamp-2`}>
                {artwork.description}
              </p>
              <p className={`${theme.text} opacity-70 text-xs mb-3`}>
                {new Date(artwork.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <button
                onClick={onClose}
                className={`w-full px-4 py-2 text-sm ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-semibold`}
              >
                Close
              </button>
            </div>
          </div>

          {/* Desktop Layout - Side by side (unchanged) */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="relative flex items-center justify-center bg-black/5 rounded-lg min-h-[400px]">
              <img
                src={getOptimizedImageUrl(artwork.image_url, 'medium')}
                alt={artwork.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                loading="eager"
              />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between min-h-[400px]">
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
                className={`mt-6 px-6 py-3 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-semibold sticky bottom-0`}
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
