import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { artworks } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';
import Modal from '../components/Modal';

const Landing = () => {
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_center,_#79b791_0%,_#0b6e4f_50%,_#073b3a_100%)]"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex items-center justify-center gap-6"
          >
            <div className="relative flex-shrink-0" style={{ width: '128px', height: '128px' }}>
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
      <div className="pt-32 pb-16">

        {/* Top 21 Artworks Grid - Interactive Hover Reveal */}
        <section className="relative w-full h-screen mb-28 overflow-hidden">
          {/* Black overlay with 20% opacity */}
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
          
          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <h2 
              className="text-3xl md:text-6xl font-black text-white tracking-tight"
              style={{
                fontFamily: "'Permanent Marker', cursive",
                WebkitTextStroke: '3px black',
                textShadow: '6px 6px 0 rgba(0,0,0,0.4)',
              }}
            >
              KD's Kreativ
            </h2>
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
              to="/drawings"
              className={`inline-flex items-center gap-3 px-10 py-5 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
            >
              View All Drawings
              <span className="text-2xl">→</span>
            </Link>
          </div>
        </section>

        {/* Best Artwork Section */}
        <section className="container mx-auto px-8 mb-28">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-extrabold mb-14 ${theme.text} tracking-tight`}
          >
            Featured Artworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedArtwork(artwork)}
                className={`${theme.card} rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 ${theme.border} backdrop-blur-md`}
              >
                <div className="aspect-square overflow-hidden relative group">
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className={`text-3xl font-extrabold mb-3 ${theme.accent} tracking-tight leading-tight`}>
                    {artwork.title}
                  </h3>
                  <p className={`${theme.text} opacity-85 text-lg leading-relaxed`}>
                    {artwork.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Artist Preview */}
        <section className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${theme.card} rounded-3xl p-16 text-center border-2 ${theme.border} backdrop-blur-md shadow-2xl`}
          >
            <h2 className={`text-4xl md:text-5xl font-black mb-8 ${theme.accent} tracking-tight`}>
              About the Artist
            </h2>
            <p className={`text-xl md:text-2xl ${theme.text} opacity-90 max-w-4xl mx-auto mb-10 font-light leading-relaxed`}>
              Kaivalya Deshpande is a passionate artist exploring the boundaries of 
              creativity through various mediums. Each piece tells a unique story, 
              inviting viewers into a world of imagination and emotion.
            </p>
            <Link
              to="/about"
              className={`inline-flex items-center gap-3 px-10 py-5 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
            >
              Learn More
              <span className="text-2xl">→</span>
            </Link>
          </motion.div>
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
