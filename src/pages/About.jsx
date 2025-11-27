import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

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
            About the Artist
          </h1>
          <p className={`text-xl ${theme.text} opacity-80 max-w-2xl mx-auto`}>
            Kaivalya Deshpande - A Journey Through Art
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`${theme.card} rounded-2xl overflow-hidden shadow-xl border ${theme.border}`}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dajlsmy3x/image/upload/v1764235611/KD_Kreativ_logo_1_0_vltlwo.png"
                    alt="Kaivalya Deshpande"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Bio Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <h2 className={`text-3xl font-bold mb-6 ${theme.accent}`}>
                  Kaivalya Deshpande
                </h2>
                <div className={`${theme.text} space-y-4 text-lg opacity-90`}>
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

          {/* Stats/Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className={`${theme.card} rounded-xl p-8 text-center border ${theme.border}`}>
              <div className={`text-4xl font-bold mb-2 ${theme.accent}`}>50+</div>
              <div className={`${theme.text} opacity-80`}>Artworks Created</div>
            </div>
            <div className={`${theme.card} rounded-xl p-8 text-center border ${theme.border}`}>
              <div className={`text-4xl font-bold mb-2 ${theme.accent}`}>5+</div>
              <div className={`${theme.text} opacity-80`}>Years of Experience</div>
            </div>
            <div className={`${theme.card} rounded-xl p-8 text-center border ${theme.border}`}>
              <div className={`text-4xl font-bold mb-2 ${theme.accent}`}>∞</div>
              <div className={`${theme.text} opacity-80`}>Endless Creativity</div>
            </div>
          </motion.div>

          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${theme.card} rounded-2xl p-8 md:p-12 mt-12 border ${theme.border}`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${theme.accent} text-center`}>
              Artistic Philosophy
            </h3>
            <p className={`${theme.text} text-lg opacity-90 text-center max-w-3xl mx-auto`}>
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
            className="text-center mt-12"
          >
            <h3 className={`text-2xl font-bold mb-6 ${theme.text}`}>
              Get in Touch
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contact@kdkreativ.com"
                className={`px-6 py-3 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold hover:scale-105 transform`}
              >
                Email Me
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 ${theme.accent} bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-semibold hover:scale-105 transform`}
              >
                Follow on Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
