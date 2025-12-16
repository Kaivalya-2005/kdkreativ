import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

const Modal = ({ artwork, onClose }) => {
  const { theme } = useTheme();
  const [useHighQuality, setUseHighQuality] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);

  const handleDoubleClick = (e) => {
    if (zoomLevel === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomLevel(2.5);
      setPosition({ x: -x, y: -y });
    } else {
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      if (zoomLevel === 1) {
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        setZoomLevel(2.5);
        setPosition({ x: -x, y: -y });
      } else {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
      }
    } else if (zoomLevel > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
    setLastTap(currentTime);
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newZoom = Math.min(Math.max(1, zoomLevel + delta), 4);
    setZoomLevel(newZoom);
    if (newZoom === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

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
          className={`${theme.card} rounded-lg max-w-5xl w-full h-auto md:max-h-[90vh] md:overflow-y-auto shadow-lg`}
        >
          {/* Mobile Layout - Vertical Stack */}
          <div className="md:hidden flex flex-col max-h-[95vh]">
            {/* Image Section - Takes most space */}
            <div 
              className="relative flex items-center justify-center bg-black/5 rounded-t-xl p-3 overflow-hidden" 
              style={{ height: 'calc(95vh - 180px)' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.img
                key={useHighQuality ? 'hq' : 'normal'}
                src={useHighQuality ? getOptimizedImageUrl(artwork.image_url, 'ultra') : getOptimizedImageUrl(artwork.image_url, 'medium')}
                alt={artwork.title}
                className="w-full h-full object-contain select-none"
                loading="eager"
                animate={{ 
                  scale: zoomLevel,
                  x: zoomLevel > 1 ? position.x : 0,
                  y: zoomLevel > 1 ? position.y : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ 
                  imageRendering: useHighQuality ? 'high-quality' : 'auto',
                  imageResolution: useHighQuality ? '300dpi' : 'auto',
                  cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                  touchAction: 'none'
                }}
                draggable={false}
              />
              <button
                onClick={() => setUseHighQuality(!useHighQuality)}
                className={`absolute top-2 right-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  useHighQuality 
                    ? `${theme.accent} bg-green-500/90 backdrop-blur-sm` 
                    : `${theme.text} bg-black/40 backdrop-blur-sm hover:bg-black/60`
                }`}
                title={useHighQuality ? 'Using High Quality' : 'Switch to High Quality'}
              >
                {useHighQuality ? '✓ HD' : 'HD'}
              </button>
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
            <div 
              className="relative flex items-center justify-center bg-black/5 rounded-lg min-h-[400px] overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <motion.img
                key={useHighQuality ? 'hq' : 'normal'}
                src={useHighQuality ? getOptimizedImageUrl(artwork.image_url, 'ultra') : getOptimizedImageUrl(artwork.image_url, 'medium')}
                alt={artwork.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg select-none"
                loading="eager"
                onDoubleClick={handleDoubleClick}
                animate={{ 
                  scale: zoomLevel,
                  x: zoomLevel > 1 ? position.x : 0,
                  y: zoomLevel > 1 ? position.y : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ 
                  imageRendering: useHighQuality ? 'high-quality' : 'auto',
                  imageResolution: useHighQuality ? '300dpi' : 'auto',
                  cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
                }}
                draggable={false}
              />
              <button
                onClick={() => setUseHighQuality(!useHighQuality)}
                className={`absolute top-3 right-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  useHighQuality 
                    ? `${theme.accent} bg-green-500/90 backdrop-blur-sm shadow-lg` 
                    : `${theme.text} bg-black/40 backdrop-blur-sm hover:bg-black/60`
                }`}
                title={useHighQuality ? 'Using Original High Quality' : 'Switch to High Quality'}
              >
                {useHighQuality ? '✓ High Quality' : 'High Quality'}
              </button>
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
