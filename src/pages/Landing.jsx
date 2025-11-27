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
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.img
              src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764235611/KD_Kreativ_logo_1_0_vltlwo.png"
              alt="KD Kreativ"
              className="w-32 h-32 mx-auto mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl font-bold text-white mb-4"
            >
              KD Kreativ
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-2xl text-purple-300"
            >
              Where Art Meets Imagination
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="container mx-auto px-6 text-center mb-20"
        >
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${theme.accent}`}>
            Welcome to KD Kreativ
          </h1>
          <p className={`text-xl md:text-2xl ${theme.text} opacity-80 max-w-3xl mx-auto`}>
            Explore a curated collection of artistic expressions by Kaivalya Deshpande
          </p>
        </motion.section>

        {/* Top 21 Artworks Grid */}
        <section className="container mx-auto px-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-10 ${theme.text}`}
          >
            Recent Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
                onClick={() => setSelectedArtwork(artwork)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/drawings"
              className={`inline-block px-8 py-4 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold text-lg hover:scale-105 transform`}
            >
              View All Drawings →
            </Link>
          </div>
        </section>

        {/* Best Artwork Section */}
        <section className="container mx-auto px-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold mb-10 ${theme.text}`}
          >
            Featured Artworks
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedArtwork(artwork)}
                className={`${theme.card} rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 border ${theme.border}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${theme.accent}`}>
                    {artwork.title}
                  </h3>
                  <p className={`${theme.text} opacity-80`}>
                    {artwork.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Artist Preview */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${theme.card} rounded-2xl p-12 text-center border ${theme.border}`}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme.accent}`}>
              About the Artist
            </h2>
            <p className={`text-lg ${theme.text} opacity-80 max-w-3xl mx-auto mb-8`}>
              Kaivalya Deshpande is a passionate artist exploring the boundaries of 
              creativity through various mediums. Each piece tells a unique story, 
              inviting viewers into a world of imagination and emotion.
            </p>
            <Link
              to="/about"
              className={`inline-block px-8 py-4 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold hover:scale-105 transform`}
            >
              Learn More →
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
