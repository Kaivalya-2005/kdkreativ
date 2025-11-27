import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

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
            About the Artist
          </h1>
          <p className={`text-2xl md:text-3xl ${theme.text} opacity-90 max-w-4xl mx-auto font-light leading-relaxed`}>
            Kaivalya Deshpande - A Journey Through Art
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`${theme.card} rounded-3xl overflow-hidden shadow-2xl border-2 ${theme.border} backdrop-blur-md`}
          >
            <div className="grid md:grid-cols-2 gap-10 p-10 md:p-16">
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
                <h2 className={`text-4xl md:text-5xl font-black mb-8 ${theme.accent} tracking-tight leading-tight`}>
                  Kaivalya Deshpande
                </h2>
                <div className={`${theme.text} space-y-6 text-xl opacity-90 leading-relaxed`}>
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className={`${theme.card} rounded-2xl p-10 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
              <div className={`text-6xl font-black mb-4 ${theme.accent} tracking-tight`}>50+</div>
              <div className={`${theme.text} opacity-85 text-lg font-medium`}>Artworks Created</div>
            </div>
            <div className={`${theme.card} rounded-2xl p-10 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
              <div className={`text-6xl font-black mb-4 ${theme.accent} tracking-tight`}>5+</div>
              <div className={`${theme.text} opacity-85 text-lg font-medium`}>Years of Experience</div>
            </div>
            <div className={`${theme.card} rounded-2xl p-10 text-center border-2 ${theme.border} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
              <div className={`text-6xl font-black mb-4 ${theme.accent} tracking-tight`}>∞</div>
              <div className={`${theme.text} opacity-85 text-lg font-medium`}>Endless Creativity</div>
            </div>
          </motion.div>

          {/* Philosophy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${theme.card} rounded-3xl p-12 md:p-16 mt-16 border-2 ${theme.border} backdrop-blur-md shadow-2xl`}
          >
            <h3 className={`text-3xl md:text-4xl font-black mb-8 ${theme.accent} text-center tracking-tight`}>
              Artistic Philosophy
            </h3>
            <p className={`${theme.text} text-xl md:text-2xl opacity-90 text-center max-w-4xl mx-auto font-light leading-relaxed italic`}>
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
            <h3 className={`text-3xl md:text-4xl font-black mb-8 ${theme.text} tracking-tight`}>
              Get in Touch
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:contact@kdkreativ.com"
                className={`px-10 py-5 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
              >
                Email Me
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-10 py-5 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-2xl transition-all duration-500 font-bold text-xl hover:scale-110 transform shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20`}
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
