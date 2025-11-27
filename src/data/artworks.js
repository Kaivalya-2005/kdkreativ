// Sample artwork data - Replace with your actual Cloudinary URLs
export const artworks = [
  {
    id: 1,
    title: "Abstract Dreams",
    image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    description: "A vibrant exploration of color and form",
    date: "2024-11-20",
    featured: true
  },
  {
    id: 2,
    title: "Urban Sketches",
    image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    description: "City life captured in charcoal",
    date: "2024-11-15",
    featured: true
  },
  {
    id: 3,
    title: "Portrait Series I",
    image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    description: "Exploring human emotions through portraiture",
    date: "2024-11-10",
    featured: true
  },
  {
    id: 4,
    title: "Nature Studies",
    image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    description: "Botanical illustrations in watercolor",
    date: "2024-11-05",
    featured: false
  },
  {
    id: 5,
    title: "Geometric Forms",
    image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    description: "Mathematical beauty in art",
    date: "2024-10-28",
    featured: false
  },
  // Add more artworks here - up to 50 total
  // Copy the structure above and increment IDs, update titles, URLs, descriptions, and dates
  ...Array.from({ length: 16 }, (_, i) => ({
    id: i + 6,
    title: `Artwork ${i + 6}`,
    image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    description: `Description for artwork ${i + 6}`,
    date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    featured: false
  }))
];

// Sort artworks by date (newest first)
artworks.sort((a, b) => new Date(b.date) - new Date(a.date));
