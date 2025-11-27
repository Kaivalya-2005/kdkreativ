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
    <div className={`min-h-screen ${theme.bg} pt-24 pb-12`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${theme.accent}`}>
            All Drawings
          </h1>
          <p className={`text-xl ${theme.text} opacity-80 max-w-2xl mx-auto`}>
            Explore the complete collection of {artworks.length} artworks, sorted by newest first
          </p>
        </motion.div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          className={`mt-16 text-center ${theme.text} opacity-60`}
        >
          <p className="text-lg">
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
