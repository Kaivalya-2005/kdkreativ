import { supabase } from '../lib/supabase';

// Cache for artworks
let artworksCache = [];
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch artworks from Supabase
export const fetchArtworks = async () => {
  try {
    // Check cache first
    if (cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION && artworksCache.length > 0) {
      return artworksCache;
    }

    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    artworksCache = data || [];
    cacheTimestamp = Date.now();
    return artworksCache;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return [];
  }
};
