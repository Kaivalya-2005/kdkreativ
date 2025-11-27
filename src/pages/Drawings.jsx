import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { artworks } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';
import Modal from '../components/Modal';

const Drawings = () => {
  const { theme } = useTheme();
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <div className={`min-h-screen ${theme.bg} pt-32 pb-16`}>
      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className={`text-6xl md:text-8xl font-black mb-8 ${theme.accent} tracking-tight leading-none`}>
            All Drawings
          </h1>
          <p className={`text-2xl md:text-3xl ${theme.text} opacity-90 max-w-4xl mx-auto font-light leading-relaxed`}>
            Explore the complete collection of {artworks.length} artworks, sorted by newest first
          </p>
        </motion.div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-20 text-center ${theme.text} opacity-70`}
        >
          <p className="text-xl md:text-2xl font-medium tracking-wide">
            Showing all {artworks.length} artworks
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <Modal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      )}
    </div>
  );
};

export default Drawings;
