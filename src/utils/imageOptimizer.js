/**
 * Optimize Cloudinary image URLs for better performance
 * Transforms large images (5-9 MB) to optimized versions (200-500 KB)
 * Works with existing Cloudinary URLs without requiring re-upload
 */

/**
 * Get optimized Cloudinary URL with transformations
 * @param {string} url - Original Cloudinary image URL
 * @param {string} size - Size preset: 'thumb', 'medium', 'large', 'full'
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (url, size = 'medium') => {
  // Return original URL if not a Cloudinary URL
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  // Transformation presets for different use cases
  const transformations = {
    // Small thumbnail for grid previews - 400x400px, fill to square
    thumb: 'f_auto,q_auto:good,w_400,h_400,c_fill',
    
    // Medium size for modal/lightbox view - 1200px wide
    medium: 'f_auto,q_auto:good,w_1200',
    
    // Large size for full screen view - 2000px wide
    large: 'f_auto,q_auto:best,w_2000',
    
    // Original size with format optimization only
    full: 'f_auto,q_auto:best'
  };

  const transform = transformations[size] || transformations.medium;

  // Insert transformation parameters before '/upload/'
  // f_auto = automatic format (WebP for modern browsers, JPG fallback)
  // q_auto = automatic quality optimization
  // w_X = width in pixels
  // c_fill = crop/fill mode for thumbnails
  return url.replace('/upload/', `/upload/${transform}/`);
};

/**
 * Preload optimized image for faster loading
 * @param {string} url - Image URL to preload
 * @param {string} size - Size preset
 */
export const preloadImage = (url, size = 'medium') => {
  const optimizedUrl = getOptimizedImageUrl(url, size);
  const img = new Image();
  img.src = optimizedUrl;
};
