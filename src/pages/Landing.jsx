import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useArtworks } from '../hooks/useArtworks';
import Modal from '../components/Modal';
import CountUp from '../components/CountUp';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import circleLogo from '../assets/circle.png';
import nameLogo from '../assets/name.png';
import profileImage from '../assets/Kaivalya_formal.jpg';

const Landing = () => {
  const { theme } = useTheme();
  const { artworks, loading } = useArtworks();
  const skipWelcome = sessionStorage.getItem('skipWelcome') === 'true';
  const [showWelcome, setShowWelcome] = useState(!skipWelcome);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [rotatingIndices, setRotatingIndices] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const scrollToTop = sessionStorage.getItem('scrollToTop') === 'true';
    const scrollToAbout = sessionStorage.getItem('scrollToAbout') === 'true';

    if (skipWelcome) {
      sessionStorage.removeItem('skipWelcome');

      // Handle scrolling based on flags
      setTimeout(() => {
        if (scrollToTop) {
          sessionStorage.removeItem('scrollToTop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (scrollToAbout) {
          sessionStorage.removeItem('scrollToAbout');
          const aboutSection = document.getElementById('about-section');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);
    } else {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [skipWelcome]);

  // Separate effect to handle scroll after page load
  useEffect(() => {
    const scrollToAbout = sessionStorage.getItem('scrollToAbout') === 'true';
    if (scrollToAbout) {
      sessionStorage.removeItem('scrollToAbout');
      setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    const featuredCount = artworks.filter(art => art.featured).length;
    if (featuredCount > 0) {
      const interval = setInterval(() => {
        setRotatingIndices(prev => prev.map(idx => (idx + 1) % featuredCount));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [artworks]);

  // Display artworks are those with display=true
  const displayArtworks = artworks.filter(art => art.display).slice(0, 21);

  // Don't show loading during welcome animation
  if (loading && !showWelcome && skipWelcome) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center`}>
        <div className={`text-2xl ${theme.text}`}>Loading artworks...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg}`} style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
      {/* Professional Welcome Animation */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'
          }}
        >
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(121, 183, 145, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(11, 110, 79, 0.3) 0%, transparent 50%)',
              animation: 'pulse 8s ease-in-out infinite'
            }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center gap-10 px-8"
          >
            {/* Logo with elegant animation */}
            <motion.div 
              className="relative" 
              style={{ width: '140px', height: '140px' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={circleLogo}
                alt="KD Kreativ Logo"
                style={{ width: '140px', height: '140px', objectFit: 'contain' }}
                className="absolute inset-0 drop-shadow-2xl"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              />
              <motion.img
                src={nameLogo}
                alt="KD Kreativ Text"
                style={{ width: '140px', height: '140px', objectFit: 'contain', position: 'absolute', top: 0, left: '2px' }}
                className="drop-shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Professional typography */}
            <div className="flex flex-col items-center gap-4 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[0.15em] uppercase"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontWeight: 300,
                  letterSpacing: '0.15em'
                }}
              >
                Kaivalya Deshpande
              </motion.h1>
              
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-32 bg-linear-to-r from-transparent via-green-400 to-transparent"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
                className="text-base sm:text-lg lg:text-xl text-gray-300 font-light tracking-wide"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontWeight: 300
                }}
              >
                Artist
              </motion.p>
            </div>

            {/* Elegant loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex gap-2 mt-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="pt-10 md:pt-19 pb-1 flex-col items-center justify-center" style={{ minHeight: '100vh' }}>

        {/* Mobile Hero Section - Animated Carousel */}
        <section className="md:hidden relative w-full px-4 py-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className={`text-4xl pb-2 font-extrabold mb-3 ${theme.accent} tracking-tight`}>
              KD's Kreativ
            </h1>
            <p className={`text-sm  pb-2 ${theme.text} opacity-75`}>
              Where Art Meets Imagination
            </p>
          </motion.div>

          {/* Mobile Artwork Carousel */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              {(() => {
                const featuredArtworks = artworks.filter(art => art.featured);
                const currentArtwork = featuredArtworks[rotatingIndices[0]];
                if (!currentArtwork) return null;
                return (
                  <motion.div
                    key={rotatingIndices[0]}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="cursor-pointer"
                    onClick={() => setSelectedArtwork(currentArtwork)}
                  >
                    {/* Image Container */}
                    <div className="relative h-96 mb-4 overflow-hidden rounded-2xl">
                      <img
                        src={getOptimizedImageUrl(currentArtwork.image_url, 'medium')}
                        alt={currentArtwork.title}
                        className="w-full h-full object-contain rounded-2xl"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                      />
                      {/* Carousel Indicators on Image */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {artworks.filter(art => art.featured).slice(0, 4).map((_, index) => (
                          <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${index === rotatingIndices[0] % artworks.filter(art => art.featured).length
                                ? `w-8 ${theme.accent.replace('text-', 'bg-')}`
                                : 'w-2 bg-white/40'
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Title and Description Below Image */}
                    <div className={`${theme.card} p-4 rounded-2xl border-2 ${theme.border} backdrop-blur-md shadow-lg`}>
                      <h3 className={`text-lg font-bold ${theme.accent} truncate`}>
                        {currentArtwork.title}
                      </h3>
                      <p className={`text-xs ${theme.text} opacity-75 line-clamp-2 mt-1`}>
                        {currentArtwork.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* View All Button */}
          <Link
            to="/Gallery"
            className={`w-full block text-center px-8 py-4 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 font-bold text-base shadow-lg`}
          >
            View All Drawings →
          </Link>
        </section>

        {/* Top 21 Artworks Grid - Interactive Hover Reveal (Desktop Only) */}
        <section className="hidden md:block relative w-full h-176 mb-32 overflow-hidden">
          {/* Black overlay with 20% opacity */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-7xl py-5 font-extrabold mb-16 ${theme.accent} tracking-tight text-center`}
            >
              KD's KREATIV
            </motion.h2>
          </div>
          {/* 21 Artworks Grid - Based on Figma Design */}
          <div className="absolute inset-0">
            {(() => {
              // Array of 21 artwork IDs in order of position (replace these IDs with your actual artwork IDs)
              const artworkIds = [
                18, 48, 9, 14, 44, 20, 49, 27, 22, 13, 43, 42, 23, 24, 51, 19, 28, 25, 26, 46, 17, 40
              ];

              const layouts = [
                // 1
                { width: 160, height: 200, top: 0, left: 0 },
                // 2
                { width: 212, height: 290, top: 200, left: 0 },
                // 3
                { width: 212, height: 212, top: 490, left: 0 },

                // 4
                { width: 150, height: 212, top: 490, left: 212 },
                // 5
                { width: 150, height: 150, top: 340, left: 212 },
                // 6
                { width: 240, height: 340, top: 0, left: 160 },

                // 7 
                { width: 162, height: 251, top: 0, left: 400 },
                // 8
                { width: 273, height: 451, top: 251, left: 362 },

                // 9 
                { width: 138, height: 172, top: 530, left: 635 },
                // 10
                { width: 110, height: 172, top: 530, left: 773 },
                // 11
                { width: 248, height: 279, top: 251, left: 635 },
                // 12 
                { width: 321, height: 251, top: 0, left: 562 },

                // 13
                { width: 280, height: 440, top: 0, left: 883 },
                // 14 
                { width: 188, height: 262, top: 440, left: 883 },

                // 15
                { width: 152, height: 262, top: 440, left: 1071 },
                // 16
                { width: 120, height: 189, top: 513, left: 1223 },
                // 17
                { width: 222, height: 262, top: 251, left: 1163 },

                // 18
                { width: 222, height: 252, top: 0, left: 1163 },
                // 19 
                { width: 150, height: 202, top: 0, left: 1385 },

                // 20 
                { width: 150, height: 152, top: 202, left: 1385 },
                // 21 
                { width: 150, height: 159, top: 354, left: 1385 },
                // 22 
                { width: 192, height: 189, top: 513, left: 1343 }
              ];

              return artworkIds.map((artworkId, index) => {
                const artwork = artworks.find(art => art.id === artworkId);
                if (!artwork) return null;

                const layout = layouts[index];

                return (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.05,
                      zIndex: 50,
                      transition: {
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                    className="absolute cursor-pointer group"
                    style={{
                      width: `${layout.width}px`,
                      height: `${layout.height}px`,
                      top: `${layout.top}px`,
                      left: `${layout.left}px`
                    }}
                    onClick={() => setSelectedArtwork(artwork)}
                  >
                    <motion.div
                      className="relative w-full h-full overflow-hidden rounded-lg shadow-lg"
                      whileHover={{
                        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                    >
                      <motion.img
                        src={getOptimizedImageUrl(artwork.image_url, 'thumb')}
                        alt={artwork.title}
                        className="w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        whileHover={{
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }}
                        animate={{
                          opacity: 0,
                          transition: {
                            duration: 0.5,
                            ease: [0.4, 0, 1, 1]
                          }
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.div>
                  </motion.div>
                );
              });
            })()}
          </div>

          {/* View All Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
            <Link
              to="/Gallery"
              className={`inline-flex items-center gap-3 px-10 py-5 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
            >
              View All Drawings
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </section>

        {/* Best Artwork Section - 4 Rotating Images with 12 Artworks (Desktop Only) */}
        <section className="hidden md:block w-full max-w-[1920px] mx-auto px-4 md:px-10 py-10 mb-16 md:mb-32 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-6xl py-3 md:py-5 font-extrabold mb-8 md:mb-16 ${theme.accent} tracking-tight text-center`}
          >
            Featured Artworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 py-3 md:py-5">
            {rotatingIndices.map((imageIndex, position) => {
              const featuredArtworks = artworks.filter(art => art.featured);
              const artwork = featuredArtworks[imageIndex];
              if (!artwork) return null;
              return (
                <div
                  key={position}
                  className={`${theme.card} rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 ${theme.border} backdrop-blur-md h-full`}
                  onClick={() => setSelectedArtwork(artwork)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  style={{ transition: 'transform 0.3s ease-in-out' }}
                >
                  <div className="h-64 md:h-96 overflow-hidden relative group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        src={getOptimizedImageUrl(artwork.image_url, 'thumb')}
                        alt={artwork.title}
                        className="w-full h-full object-contain"
                        key={`img-${imageIndex}`}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut"
                        }}
                        loading="eager"
                        decoding="async"
                      />
                    </AnimatePresence>
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-${imageIndex}`}
                      className="p-3 md:p-4 bg-linear-to-t from-black/40 to-transparent"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{
                        duration: 1.2,
                        ease: "easeInOut"
                      }}
                    >
                      <h3 className={`text-lg font-bold ${theme.accent} truncate`}>
                        {artwork.title}
                      </h3>
                      <p className={`text-sm ${theme.text} opacity-75 line-clamp-1 mt-1`}>
                        {artwork.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Artist Preview */}
        <section id="about-section" className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-5 scroll-mt-10 md:scroll-mt-16 flex items-center justify-center">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 md:mb-20"
            >
              <h1 className={`text-3xl md:text-6xl py-3 md:py-5 font-black mb-4 md:mb-8 ${theme.accent} tracking-tight leading-tight`}>
                About the Artist
              </h1>
            </motion.div>

            {/* Main Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`${theme.card} rounded-xl overflow-hidden shadow-lg border ${theme.border} backdrop-blur-md mb-20`}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 p-6 md:p-10">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex items-center justify-center"
                >
                  <div className='flex-col items-center justify-center'>
                    <div className="aspect-square w-48 h-48 md:w-80 md:h-80 overflow-hidden rounded-full">
                      <img
                        src={profileImage}
                        alt="Kaivalya Deshpande"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className='py-4 md:py-5 flex items-center justify-center'>
                      <h2 className={`text-2xl md:text-4xl font-black mb-4 md:mb-10 ${theme.accent} tracking-tight leading-tight`}>
                        Kaivalya Deshpande
                      </h2>
                    </div>
                  </div>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col justify-center"
                >
                  <div className={`${theme.text} space-y-4 md:space-y-6 text-center md:text-xl opacity-90 leading-relaxed`}>
                    <p>
                      I transform everyday moments into expressive visual stories through detailed and thoughtful drawings.
                      Each piece is created with close observation and emotional intent, allowing the subject to speak
                      beyond the lines and textures on paper.
                    </p>

                    <p>
                      My work ranges from portraits to creative explorations, with a strong focus on originality and growth.
                      This collection reflects my journey as an artist—constantly learning, experimenting, and sharing
                      perspectives through art.
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center gap-4 md:gap-6 pt-4 md:pt-6">
                      {/* Instagram */}
                      <a
                        href="https://instagram.com/kaivalya738"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full transition-all duration-300 hover:scale-105 shadow-md backdrop-blur-sm border border-white/20 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#FD1D1D] hover:shadow-[0_0_20px_rgba(225,48,108,0.6)]"
                        aria-label="Follow on Instagram"
                      >
                        <svg
                          className={`w-6 h-6 md:w-8 md:h-8 ${theme.accent} group-hover:text-white transition-colors duration-300`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      
                      {/* Behance */}
                      <a
                        href="https://www.behance.net/kaivalyadeshpande"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full transition-all duration-300 hover:scale-105 shadow-md backdrop-blur-sm border border-white/20 hover:bg-[#1769FF] hover:shadow-[0_0_20px_rgba(23,105,255,0.6)]"
                        aria-label="View on Behance"
                      >
                        <svg
                          className={`w-6 h-6 md:w-8 md:h-8 ${theme.accent} group-hover:text-white transition-colors duration-300`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 py-5 md:py-7"
            >
              <div className={`${theme.card} rounded-lg p-8 md:p-12 text-center border ${theme.border} backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102`}>
                <div className={`text-5xl md:text-7xl font-black mb-3 md:mb-4 ${theme.accent} tracking-tight`}>
                  <CountUp from={0} to={50} separator="" direction="up" duration={2} className="count-up-text" />+
                </div>
                <div className={`${theme.text} opacity-85 text-base md:text-xl font-semibold`}>Artworks Created</div>
              </div>
              <div className={`${theme.card} rounded-lg p-8 md:p-12 text-center border ${theme.border} backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102`}>
                <div className={`text-5xl md:text-7xl font-black mb-3 md:mb-4 ${theme.accent} tracking-tight`}>
                  <CountUp from={0} to={10} separator="" direction="up" duration={2} className="count-up-text" />+
                </div>
                <div className={`${theme.text} opacity-85 text-base md:text-xl font-semibold`}>Years of Experience</div>
              </div>
              <div className={`${theme.card} rounded-lg p-8 md:p-12 text-center border ${theme.border} backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102`}>
                <div className={`text-5xl md:text-7xl font-black mb-3 md:mb-4 ${theme.accent} tracking-tight`}>∞</div>
                <div className={`${theme.text} opacity-85 text-base md:text-xl font-semibold`}>Endless Creativity</div>
              </div>
            </motion.div>

            {/* Philosophy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${theme.card} rounded-xl p-6 md:p-15 mb-12 md:mb-20 border ${theme.border} backdrop-blur-md shadow-lg`}
            >
              <h3 className={`text-2xl md:text-5xl font-black mb-6 md:mb-10 ${theme.accent} text-center tracking-tight`}>
                Artistic Philosophy
              </h3>
              <p className={`${theme.text} text-base md:text-2xl opacity-90 text-center max-w-5xl mx-auto font-light leading-relaxed italic`}>
                "Art is not what you see, but what you make others see. Through every stroke,
                every color, and every composition, I strive to create connections that transcend
                the visual and touch the soul. My work is an ongoing dialogue between imagination
                and reality, where each piece invites viewers to embark on their own journey of discovery."
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center py-8 md:py-13"
            >
              <h3 className={`text-2xl md:text-5xl font-black mb-6 md:mb-10 ${theme.accent} tracking-tight`}>
                Get in Touch
              </h3>
              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-8 py-4 md:py-7">
                <a
                  href="mailto:kaivalya.deshpande2005@gmail.com"
                  className={`px-8 md:px-12 py-4 md:py-6 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-bold text-base md:text-xl hover:scale-105 shadow-md backdrop-blur-sm border border-white/20`}
                >
                  Email Me
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <Modal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      )}
    </div>
  );
};

export default Landing;
