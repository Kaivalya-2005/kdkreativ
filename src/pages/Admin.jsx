import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { artworks } from '../data/artworks';

const Admin = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Admin password - Change this to your preferred password
  const ADMIN_PASSWORD = 'KD@2024';

  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    featured: true
  });

  const [editingId, setEditingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setPasswordError('');
    } else {
      setPasswordError('Invalid password');
      setPassword('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddArtwork = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image_url) {
      alert('Please fill in title and image URL');
      return;
    }

    if (editingId) {
      // Update existing artwork
      const index = artworks.findIndex(a => a.id === editingId);
      if (index > -1) {
        artworks[index] = {
          ...artworks[index],
          title: formData.title,
          image_url: formData.image_url,
          description: formData.description,
          date: formData.date,
          featured: formData.featured
        };
        alert('Artwork updated successfully!');
        setEditingId(null);
      }
    } else {
      // Add new artwork
      const newArtwork = {
        id: Math.max(...artworks.map(a => a.id)) + 1,
        title: formData.title,
        image_url: formData.image_url,
        description: formData.description,
        date: formData.date,
        featured: formData.featured
      };
      artworks.push(newArtwork);
      alert('Artwork added successfully!');
    }

    artworks.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFormData({
      title: '',
      image_url: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      featured: true
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    navigate('/');
  };

  const handleDeleteArtwork = (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      const index = artworks.findIndex(a => a.id === id);
      if (index > -1) {
        artworks.splice(index, 1);
        alert('Artwork deleted successfully!');
        // Trigger re-render by updating state
        setFormData({ ...formData });
      }
    }
  };

  const handleEditArtwork = (artwork) => {
    setEditingId(artwork.id);
    setFormData({
      title: artwork.title,
      image_url: artwork.image_url,
      description: artwork.description,
      date: artwork.date,
      featured: artwork.featured
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      image_url: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      featured: true
    });
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${theme.bg} flex items-center justify-center pt-20`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${theme.card} rounded-3xl p-12 w-full max-w-md border-2 ${theme.border} shadow-2xl`}
        >
          <h1 className={`text-4xl font-black mb-8 ${theme.accent} text-center tracking-tight`}>
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-3`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 rounded-xl ${theme.card} ${theme.border} border-2 focus:outline-none focus:ring-2 ${theme.text}`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-xl transition-all duration-500 font-bold text-lg shadow-lg`}
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} pt-24 pb-20`}>
      <div className="container mx-auto px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-black ${theme.accent} tracking-tight`}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className={`px-6 py-3 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-xl transition-all duration-500 font-bold shadow-lg`}
          >
            Logout
          </button>
        </motion.div>

        {/* Add/Edit Artwork Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${theme.card} rounded-3xl p-10 border-2 ${theme.border} shadow-2xl mb-12`}
        >
          <h2 className={`text-3xl font-bold mb-8 ${theme.text} tracking-tight`}>
            {editingId ? 'Edit Artwork' : 'Add New Artwork'}
          </h2>

          <form onSubmit={handleAddArtwork} className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-3`}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Artwork title"
                className={`w-full px-4 py-3 rounded-xl ${theme.card} ${theme.border} border-2 focus:outline-none focus:ring-2 ${theme.text}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-3`}>
                Image URL (Cloudinary)
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://res.cloudinary.com/..."
                className={`w-full px-4 py-3 rounded-xl ${theme.card} ${theme.border} border-2 focus:outline-none focus:ring-2 ${theme.text}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold ${theme.text} mb-3`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Artwork description"
                rows="4"
                className={`w-full px-4 py-3 rounded-xl ${theme.card} ${theme.border} border-2 focus:outline-none focus:ring-2 ${theme.text}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-3`}>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl ${theme.card} ${theme.border} border-2 focus:outline-none focus:ring-2 ${theme.text}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text} mb-3`}>
                  Featured
                </label>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded cursor-pointer"
                  />
                  <span className={`ml-3 ${theme.text}`}>Mark as featured</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 ${theme.accent} bg-white/10 hover:bg-white/25 rounded-xl transition-all duration-500 font-bold text-lg shadow-lg`}
            >
              {editingId ? 'Update Artwork' : 'Add Artwork'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className={`w-full py-3 bg-gray-500/20 hover:bg-gray-500/40 text-gray-400 rounded-xl transition-all duration-500 font-bold text-lg shadow-lg`}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </motion.div>

        {/* Artworks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${theme.card} rounded-3xl p-10 border-2 ${theme.border} shadow-2xl`}
        >
          <h2 className={`text-3xl font-bold mb-8 ${theme.text} tracking-tight`}>
            All Artworks ({artworks.length})
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 ${theme.accent} bg-white/5 rounded-2xl border ${theme.border} flex justify-between items-start hover:bg-white/10 transition-all duration-300`}
              >
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${theme.accent} mb-2`}>
                    {artwork.title}
                  </h3>
                  <p className={`${theme.text} opacity-75 text-sm mb-2`}>
                    {artwork.description}
                  </p>
                  <div className={`${theme.text} opacity-60 text-xs flex gap-4`}>
                    <span>ID: {artwork.id}</span>
                    <span>Date: {artwork.date}</span>
                    <span>Featured: {artwork.featured ? '✓' : '✗'}</span>
                  </div>
                </div>
                <div className="ml-4 flex gap-2">
                  <button
                    onClick={() => handleEditArtwork(artwork)}
                    className={`px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-lg transition-all duration-300 text-sm font-semibold`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteArtwork(artwork.id)}
                    className={`px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-all duration-300 text-sm font-semibold`}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
