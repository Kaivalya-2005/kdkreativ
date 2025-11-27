# 🎨 Quick Customization Cheat Sheet

## Most Common Changes

### 1. Add New Artwork (5 minutes)
```javascript
// File: src/data/artworks.js

{
  id: 22,  // Next available number
  title: "Your New Artwork",
  image_url: "https://res.cloudinary.com/...",
  description: "Brief description",
  date: "2024-11-27",  // Today's date
  featured: false  // Or true for featured section
}
```

### 2. Change Website Title (1 minute)
```html
<!-- File: index.html -->
<title>Your Custom Title</title>
```

### 3. Update Artist Name (2 minutes)
```javascript
// File: src/components/Header.jsx
<span className={`text-2xl font-bold ${theme.accent}`}>Your Name</span>

// File: src/pages/Landing.jsx
<h1 className={`text-5xl md:text-7xl font-bold mb-6 ${theme.accent}`}>
  Welcome to Your Portfolio
</h1>
```

### 4. Change Theme Colors (5 minutes)
```javascript
// File: src/context/ThemeContext.jsx

// Example: Make dark theme purple instead
dark: {
  name: 'Dark',
  bg: 'bg-purple-900',        // Was: bg-gray-900
  text: 'text-purple-100',    // Was: text-gray-100
  accent: 'text-pink-400',    // Was: text-purple-400
  card: 'bg-purple-800',      // Was: bg-gray-800
  hover: 'hover:bg-purple-700', // Was: hover:bg-gray-700
  border: 'border-purple-700'  // Was: border-gray-700
}
```

### 5. Change Welcome Screen Duration (1 minute)
```javascript
// File: src/pages/Landing.jsx

const timer = setTimeout(() => {
  setShowWelcome(false);
}, 5000);  // Change from 3000 to 5000 for 5 seconds
```

### 6. Update Email & Social Links (3 minutes)
```javascript
// File: src/components/Footer.jsx
<a href="https://instagram.com/YOUR_USERNAME">Instagram</a>
<a href="https://twitter.com/YOUR_USERNAME">Twitter</a>
<a href="mailto:YOUR_EMAIL@example.com">Contact</a>

// File: src/pages/About.jsx
<a href="mailto:YOUR_EMAIL@example.com">Email Me</a>
<a href="https://instagram.com/YOUR_USERNAME">Follow on Instagram</a>
```

### 7. Update About Section Text (10 minutes)
```javascript
// File: src/pages/About.jsx

<p>
  Replace this with your actual bio.
  Tell your story.
  Share your artistic journey.
</p>
```

### 8. Change Number of Featured Artworks (1 minute)
```javascript
// File: src/pages/Landing.jsx

// Show 3 instead of 5
const featuredArtworks = artworks.filter(art => art.featured).slice(0, 3);

// Show 10
const featuredArtworks = artworks.filter(art => art.featured).slice(0, 10);
```

### 9. Adjust Grid Layout (2 minutes)
```javascript
// File: src/pages/Drawings.jsx

// For fewer columns (3 max)
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"

// For more columns (6 max)
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
```

### 10. Change Logo (2 minutes)
Replace URL in these files with your new logo:
- `index.html` (line 5)
- `src/components/Header.jsx` (line 15)
- `src/pages/Landing.jsx` (line 28)

## 🎨 Tailwind Color Classes Reference

### Backgrounds
- `bg-gray-900` - Dark gray
- `bg-white` - White
- `bg-blue-500` - Blue
- `bg-purple-600` - Purple
- `bg-gradient-to-br from-purple-900 to-pink-900` - Gradient

### Text Colors
- `text-gray-100` - Light gray
- `text-gray-900` - Dark gray
- `text-blue-500` - Blue
- `text-purple-400` - Purple
- `text-white` - White

### Common Color Palettes

**Professional Dark**
```
bg: bg-gray-900
text: text-gray-100
accent: text-blue-400
```

**Clean Light**
```
bg: bg-gray-50
text: text-gray-900
accent: text-indigo-600
```

**Artistic Purple**
```
bg: bg-gradient-to-br from-purple-900 to-indigo-900
text: text-purple-50
accent: text-pink-400
```

**Nature Green**
```
bg: bg-gradient-to-br from-green-900 to-emerald-900
text: text-green-50
accent: text-lime-400
```

## 🚀 Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name

# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📁 File Reference

**Need to edit text/content:**
- `src/pages/Landing.jsx` - Home page
- `src/pages/Drawings.jsx` - Drawings page
- `src/pages/About.jsx` - About page
- `src/components/Header.jsx` - Navigation bar
- `src/components/Footer.jsx` - Footer

**Need to change data:**
- `src/data/artworks.js` - All artwork information

**Need to change styling:**
- `src/context/ThemeContext.jsx` - Theme colors
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles

**Need to change animations:**
- `src/components/ArtworkCard.jsx` - Card animations
- `src/components/Modal.jsx` - Modal animations
- `src/pages/Landing.jsx` - Welcome animation

## 💡 Quick Fixes

**Problem: Can't see changes**
```bash
# Clear cache and restart
Ctrl + Shift + R (or Cmd + Shift + R on Mac)
```

**Problem: Errors after editing**
```bash
# Check for missing commas, brackets
# Look at browser console (F12)
# Check terminal for error messages
```

**Problem: Images not loading**
```javascript
// Check URL format is correct
"https://res.cloudinary.com/your-cloud/image/upload/v12345/image.jpg"
// Not just: "image.jpg"
```

## 🎯 Priority Customization Order

1. ✅ Add your artworks to `artworks.js`
2. ✅ Update About page with your bio
3. ✅ Change social media links
4. ✅ Update logo if you have one
5. ✅ Customize theme colors (optional)
6. ✅ Adjust animations (optional)
7. ✅ Test everything
8. ✅ Build and deploy

## 📊 Image URL Format (Cloudinary)

**Basic URL:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/IMAGE_ID.jpg
```

**Optimized URL:**
```
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_800,h_800,c_fill,f_auto,q_auto/IMAGE_ID.jpg
```

**Parameters:**
- `w_800` - Width 800px
- `h_800` - Height 800px
- `c_fill` - Crop to fill
- `f_auto` - Auto format
- `q_auto` - Auto quality

## 🔥 Hot Tips

1. **Save Often**: Vite auto-reloads, so save to see changes instantly
2. **Use DevTools**: F12 to see errors and inspect elements
3. **Test Mobile**: Use DevTools mobile view (Ctrl+Shift+M)
4. **Backup Data**: Keep a copy of `artworks.js` before major changes
5. **One Change at a Time**: Test each change before making another

---

**Need More Help? Check USAGE_GUIDE.md for detailed instructions!**
