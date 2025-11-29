import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { artworks } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';
import Modal from '../components/Modal';

const Landing = () => {
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [rotatingIndices, setRotatingIndices] = useState([0, 1, 2, 3]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const featuredCount = artworks.filter(art => art.featured).length;
    const interval = setInterval(() => {
      setRotatingIndices((prev) => prev.map((idx) => {
        const nextIdx = (idx + 1) % featuredCount;
        return nextIdx;
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const topArtworks = artworks.slice(0, 21);
  const featuredArtworks = artworks.filter(art => art.featured).slice(0, 5);

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
                src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764246725/logo_circle1_au6wyw.png"
                alt="KD Kreativ Logo"
                style={{ width: '128px', height: '128px', objectFit: 'contain' }}
                className="absolute inset-0"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <motion.img
                src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764248620/name_kd_wftrsu.png"
                alt="KD Kreativ Text"
                style={{ width: '128px', height: '128px', objectFit: 'contain', position: 'absolute', top: 0, left: '4px' }}
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
      <div className="pt-22 pb-10 flex-col items-center justify-center">

        {/* Top 21 Artworks Grid - Interactive Hover Reveal */}
        <section className="relative w-full h-173 mb-32 overflow-hidden">
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

          {/* Artworks with varying sizes - reveals on cursor hover */}
          <div className="absolute inset-0">
            {topArtworks.map((artwork, index) => {
              // Generate random positions and sizes for each artwork
              const sizes = ['w-32 h-32', 'w-40 h-40', 'w-36 h-36', 'w-44 h-44', 'w-48 h-48', 'w-28 h-28', 'w-52 h-52'];
              const size = sizes[index % sizes.length];

              // Calculate grid-like positions but with some randomness
              const row = Math.floor(index / 7);
              const col = index % 7;
              const topPercent = (row * 25) + (Math.random() * 10 - 5);
              const leftPercent = (col * 14) + (Math.random() * 8 - 4);

              return (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`absolute ${size} cursor-pointer group`}
                  style={{
                    top: `${topPercent}%`,
                    left: `${leftPercent}%`,
                  }}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  {/* Hidden by default, reveals on hover */}
                  <div className="relative w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover rounded-lg shadow-2xl"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <Link
              to="/Gallery"
              className={`inline-flex items-center gap-3 px-10 py-5 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
            >
              View All Drawings
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </section>

        {/* Best Artwork Section - 4 Rotating Images with 12 Artworks */}
        <section className="container mx-auto px-10 py-10 mb-32 scroll-mt-20">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-6xl py-5 font-extrabold mb-16 ${theme.accent} tracking-tight text-center`}
          >
            Featured Artworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-5">
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
                  <div className="aspect-square overflow-hidden relative group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        src={artwork.image_url}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                        key={`img-${imageIndex}`}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ 
                          duration: 1.2,
                          ease: "easeInOut"
                        }}
                      />
                    </AnimatePresence>
                    <motion.div 
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                    />
                  </div>
                  <motion.div 
                    className="p-4 bg-linear-to-t from-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <h3 className={`text-lg font-bold ${theme.accent} truncate`}>
                      {artwork.title}
                    </h3>
                    <p className={`text-sm ${theme.text} opacity-75 line-clamp-1 mt-1`}>
                      {artwork.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Artist Preview */}
        <section id="about-section" className="container mx-auto px-8 py-5 scroll-mt-24 flex items-center justify-center">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h1 className={`text-4xl md:text-6xl py-5 font-black mb-8 ${theme.accent} tracking-tight leading-tight`}>
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
              <div className="grid md:grid-cols-2 gap-16 md:p-10">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex items-center justify-center"
                >
                  <div className='flex-col items-center justify-center'>
                    <div className="aspect-square w-80 h-80 overflow-hidden" style={{ borderRadius: '50%' }}>
                      <img
                        src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764228907/Kaivalya_formal_id2qh7.jpg"
                        alt="Kaivalya Deshpande"
                        className="w-full h-full object-cover"
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                    <div className='py-5 flex items-center justify-center'>
                      <h2 className={`text-4xl md:text-4xl font-black mb-10 ${theme.accent} tracking-tight leading-tight`}>
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
                  <div className={`${theme.text} space-y-6 text-lg md:text-xl opacity-90 leading-relaxed`}>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-10 py-7"
            >
              <div className={`${theme.card} rounded-2xl p-12 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
                <div className={`text-7xl font-black mb-4 ${theme.accent} tracking-tight`}>50+</div>
                <div className={`${theme.text} opacity-85 text-xl font-semibold`}>Artworks Created</div>
              </div>
              <div className={`${theme.card} rounded-2xl p-12 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
                <div className={`text-7xl font-black mb-4 ${theme.accent} tracking-tight`}>10+</div>
                <div className={`${theme.text} opacity-85 text-xl font-semibold`}>Years of Experience</div>
              </div>
              <div className={`${theme.card} rounded-2xl p-12 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
                <div className={`text-7xl font-black mb-4 ${theme.accent} tracking-tight`}>∞</div>
                <div className={`${theme.text} opacity-85 text-xl font-semibold`}>Endless Creativity</div>
              </div>
            </motion.div>

            {/* Philosophy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${theme.card} rounded-3xl md:p-15 mb-20 border-2 ${theme.border} backdrop-blur-md shadow-2xl`}
            >
              <h3 className={`text-4xl md:text-5xl font-black mb-10 ${theme.accent} text-center tracking-tight`}>
                Artistic Philosophy
              </h3>
              <p className={`${theme.text} text-xl md:text-2xl opacity-90 text-center max-w-5xl mx-auto font-light leading-relaxed italic`}>
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
              className="text-center py-13"
            >
              <h3 className={`text-4xl md:text-5xl font-black mb-10 ${theme.accent} tracking-tight`}>
                Get in Touch
              </h3>
              <div className="flex flex-wrap justify-center gap-8 py-7">
                <a
                  href="mailto:contact@kdkreativ.com"
                  className={`px-12 py-6 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
                >
                  Email Me
                </a>
                <a
                  href="https://instagram.com/kaivalya738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-12 py-6 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
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
