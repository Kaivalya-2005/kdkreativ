import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ArtworkCard = ({ artwork, onClick, index = 0 }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`${theme.card} rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 group border ${theme.border}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={artwork.image_url}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-lg mb-1">{artwork.title}</h3>
            <p className="text-gray-300 text-sm">{artwork.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
