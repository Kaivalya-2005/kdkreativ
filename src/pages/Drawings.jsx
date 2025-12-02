import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useArtworks } from '../hooks/useArtworks';
import Modal from '../components/Modal';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

const Drawings = () => {
  const { theme } = useTheme();
  const { artworks, loading } = useArtworks();
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const categories = ['All', 'Charcoal', 'Pencil Sketch', 'Water Color', 'Color Pencil', 'Ball Pen', 'Others'];
  
  const categoryMap = {
    'Pencil Sketch': 'Pencil sketch',
    'Water Color': 'Water color',
    'Color Pencil': 'Color pencil',
    'Ball Pen': 'Ball pen'
  };

  const mainCategories = ['Charcoal', 'Pencil sketch', 'Water color', 'Color pencil', 'Ball pen'];

  const filteredArtworks = selectedCategory === 'All' 
    ? artworks 
    : selectedCategory === 'Others'
    ? artworks.filter(art => !mainCategories.includes(art.description))
    : artworks.filter(art => art.description === (categoryMap[selectedCategory] || selectedCategory));

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center pt-24`}>
        <div className={`text-2xl ${theme.text}`}>Loading artworks...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex-col items-center justify-center ${theme.bg}`}>
      {/* Category Carousel */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`${theme.card} backdrop-blur-md border-b ${theme.border} sticky top-20 z-40`}
      >
        <div className="container text-2xl mx-auto py-1 flex items-center justify-center gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? `${theme.accent} bg-white/10`
                  : `${theme.text} opacity-70 hover:opacity-100`
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-20 flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`text-6xl md:text-7xl font-black mb-7 ${theme.accent} tracking-tight p-2`}>
            {selectedCategory === 'All' ? 'All Drawings' : selectedCategory}
          </h1>
          <p className={`text-xl md:text-2xl ${theme.text} opacity-75 font-light p-2`}>
            Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Artworks Grid - Behance Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedArtwork(artwork)}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden rounded-2xl ${theme.card} border-2 ${theme.border} h-96`}>
                <img
                  src={getOptimizedImageUrl(artwork.image_url, 'thumb')}
                  alt={artwork.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-start p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white"
                  >
                    <h3 className="text-lg font-bold truncate">{artwork.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-1">{artwork.description}</p>
                  </motion.div>
                </div>
              </div>

              {/* Info Section */}
              <div className="mt-4 px-2">
                <h3 className={`text-lg font-bold ${theme.text} truncate mb-2`}>
                  {artwork.title}
                </h3>
                <p className={`text-sm ${theme.text} opacity-60 line-clamp-2 mb-3`}>
                  {artwork.description}
                </p>
                <div className={`flex ${theme.text} items-center justify-between text-1.5xl opacity-50`}>
                  <span>{artwork.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className={`text-2xl ${theme.text} opacity-50`}>No artworks found</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <Modal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
      )}
    </div>
  );
};

export default Drawings;
