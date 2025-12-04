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
    <div className={`min-h-screen ${theme.bg}`}>
      {/* Cinematic Welcome Animation */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_center,#79b791_0%,#0b6e4f_50%,#073b3a_100%)]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex items-center justify-center gap-6"
          >
            <div className="relative shrink-0" style={{ width: '128px', height: '128px' }}>
              <motion.img
                src={circleLogo}
                alt="KD Kreativ Logo"
                style={{ width: '128px', height: '128px', objectFit: 'contain' }}
                className="absolute inset-0"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.img
                src={nameLogo}
                alt="KD Kreativ Text"
                style={{ width: '128px', height: '128px', objectFit: 'contain', position: 'absolute', top: 0, left: '2px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              />
            </div>
            <div className="flex flex-col items-start space-y-3 text-center md:text-left">
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-wide"
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  WebkitTextStroke: '2.5px black',
                  textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                  letterSpacing: '0.02em'
                }}
              >
                KD's Kreativ
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
                className="text-xl sm:text-2xl lg:text-3xl text-yellow-100 font-semibold tracking-wide"
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  WebkitTextStroke: '1.5px black',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.25)',
                  letterSpacing: '0.01em'
                }}
              >
                Where Art Meets Imagination
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="pt-10 md:pt-19 pb-1 flex-col items-center justify-center">

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
                        src={getOptimizedImageUrl(currentArtwork.image_url, 'thumb')}
                        alt={currentArtwork.title}
                        className="w-full h-full object-contain rounded-2xl"
                        loading="eager"
                      />
                      {/* Carousel Indicators on Image */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {artworks.filter(art => art.featured).slice(0, 4).map((_, index) => (
                          <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === rotatingIndices[0] % artworks.filter(art => art.featured).length
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
                { width: 212, height:290, top: 200, left: 0 },
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
                { width:120, height: 189, top: 513, left: 1223 },
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
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.6,
                      ease: "easeOut"
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
                    <div className="relative w-full h-full overflow-hidden transition-all duration-700 ease-out group-hover:scale-130">
                      <img
                        src={getOptimizedImageUrl(artwork.image_url, 'thumb')}
                        alt={artwork.title}
                        className="w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-900 ease-in-out"
                        loading="lazy"
                      />
                    </div>
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
        <section className="hidden md:block container mx-auto px-4 md:px-10 py-10 mb-16 md:mb-32 scroll-mt-20">
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
        <section id="about-section" className="container mx-auto px-4 md:px-8 py-5 scroll-mt-10 md:scroll-mt-16 flex items-center justify-center">
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
              className={`${theme.card} rounded-3xl overflow-hidden shadow-2xl border-2 ${theme.border} backdrop-blur-md mb-20`}
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
                      A passionate artist with a unique vision for transforming everyday moments
                      into extraordinary visual narratives. Through a diverse range of mediums
                      and styles, KD Kreativ brings stories to life on canvas.
                    </p>
                    <p>
                      Each artwork is a reflection of deep observation, emotional connection,
                      and technical mastery. From intricate portraits to abstract explorations,
                      every piece invites viewers to discover new perspectives.
                    </p>
                    <p>
                      With a commitment to continuous growth and artistic evolution,
                      Kaivalya explores various techniques and subjects, always seeking
                      to push creative boundaries and inspire others through art.
                    </p>
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
              <div className={`${theme.card} rounded-2xl p-8 md:p-12 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
                <div className={`text-5xl md:text-7xl font-black mb-3 md:mb-4 ${theme.accent} tracking-tight`}>
                  <CountUp from={0} to={50} separator="" direction="up" duration={2} className="count-up-text" />+
                </div>
                <div className={`${theme.text} opacity-85 text-base md:text-xl font-semibold`}>Artworks Created</div>
              </div>
              <div className={`${theme.card} rounded-2xl p-8 md:p-12 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
                <div className={`text-5xl md:text-7xl font-black mb-3 md:mb-4 ${theme.accent} tracking-tight`}>
                  <CountUp from={0} to={10} separator="" direction="up" duration={2} className="count-up-text" />+
                </div>
                <div className={`${theme.text} opacity-85 text-base md:text-xl font-semibold`}>Years of Experience</div>
              </div>
              <div className={`${theme.card} rounded-2xl p-8 md:p-12 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
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
              className={`${theme.card} rounded-3xl p-6 md:p-15 mb-12 md:mb-20 border-2 ${theme.border} backdrop-blur-md shadow-2xl`}
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
                  href="mailto:contact@kdkreativ.com"
                  className={`px-8 md:px-12 py-4 md:py-6 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-base md:text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
                >
                  Email Me
                </a>
                <a
                  href="https://instagram.com/kaivalya738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 md:px-12 py-4 md:py-6 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-base md:text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
                >
                  Follow on Instagram
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
