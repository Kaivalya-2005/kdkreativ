import { useState, useEffect } from 'react';
import { fetchArtworks } from '../data/artworks';

export const useArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const data = await fetchArtworks();
      setArtworks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  return { artworks, loading, error, refetch: loadArtworks };
};
