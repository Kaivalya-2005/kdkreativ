// Sample artwork data - Replace with your actual Cloudinary URLs
export const artworks = [
  {
    id: 1,
    title: "Eagle's Eye",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231555/WhatsApp_Image_2025-10-09_at_00.03.54_9baf4ac8_hdofj2.jpg",
    description: "A stunning piece of artistic vision",
    date: "2022-06-12",
    featured: true
  },
  {
    id: 2,
    title: "Horse",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231551/WhatsApp_Image_2025-10-09_at_00.03.54_7ff99787_urjdy7.jpg",
    description: "City life captured in charcoal",
    date: "2022-02-06",
    featured: true
  },
  {
    id: 3,
    title: "Eye",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231548/IMG-20251009-WA0008_tmajq2.jpg",
    description: "Exploring human emotions through portraiture",
    date: "2021-01-26",
    featured: true
  },
  {
    id: 4,
    title: "Car",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231541/IMG-20251009-WA0007_lip8nh.jpg",
    description: "Botanical illustrations in watercolor",
    date: "2021-12-05",
    featured: true
  },
  {
    id: 5,
    title: "Flower Vase",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231539/IMG-20251009-WA0006_lhdy9g.jpg",
    description: "Mathematical beauty in art",
    date: "2022-05-26",
    featured: true
  },
  {
    id: 6,
    title: "Vitthal",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231534/IMG-20251009-WA0005_q7dsvc.jpg",
    description: "Mathematical beauty in art",
    date: "2022-07-10",
    featured: true
  },
  {
    id: 7,
    title: "Wolf",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231530/IMG-20251009-WA0004_zdw0o9.jpg",
    description: "Mathematical beauty in art",
    date: "2022-04-15",
    featured: true
  },
  {
    id: 8,
    title: "Rose",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231524/IMG-20251009-WA0003_vuvmdj.jpg",
    description: "Mathematical beauty in art",
    date: "2021-01-27",
    featured: true
  },
  {
    id: 9,
    title: "Shivaji Maharaj",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231519/IMG_20250930_161837_brrpfe.jpg",
    description: "Mathematical beauty in art",
    date: "2021-05-07",
    featured: true
  },
  {
    id: 10,
    title: "Angry Girl",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231518/IMG-20250316-WA0001_dbgsra.jpg",
    description: "Mathematical beauty in art",
    date: "2025-03-15",
    featured: true
  },
  {
    id: 11,
    title: "Girl",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231481/IMG_20250930_160532_cmbllq.jpg",
    description: "Mathematical beauty in art",
    date: "2023-09-26",
    featured: true
  },
  {
    id: 12,
    title: "Cats",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231445/IMG_20250930_160155_hvc4nl.jpg",
    description: "Mathematical beauty in art",
    date: "2019-12-25",
    featured: true
  },
  {
    id: 13,
    title: "Swami Vivekananda",
    image_url: "https://res.cloudinary.com/dajlsmy3x/image/upload/v1764231442/IMG_20250930_155845_mxjgsa.jpg",
    description: "Mathematical beauty in art",
    date: "2024-01-10",
    featured: false
  },

  
];

// Sort artworks by date (newest first)
artworks.sort((a, b) => new Date(b.date) - new Date(a.date));
