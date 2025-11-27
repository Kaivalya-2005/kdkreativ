# 📘 KD Kreativ - Complete Usage Guide

## 🎯 Getting Started

Your KD Kreativ portfolio website is now ready! The development server is running at `http://localhost:5173`

## 🖼️ Adding Your Artworks

### Step-by-Step Process:

1. **Prepare Your Images**
   - Recommended size: At least 1920x1080 pixels
   - Format: JPG, PNG, or WebP
   - Optimize images before uploading (use tools like TinyPNG)

2. **Upload to Cloudinary**
   ```
   1. Go to https://cloudinary.com/
   2. Sign up for a free account
   3. Go to Media Library
   4. Click "Upload" button
   5. Upload your artwork images
   6. Click on each image to get the URL
   7. Copy the full URL (looks like: https://res.cloudinary.com/...)
   ```

3. **Update the Data File**
   Open `src/data/artworks.js` and replace with your artwork data:

   ```javascript
   export const artworks = [
     {
       id: 1,
       title: "Sunset Dreams",
       image_url: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sunset.jpg",
       description: "A vibrant sunset captured in watercolor",
       date: "2024-11-20",
       featured: true
     },
     {
       id: 2,
       title: "Urban Life",
       image_url: "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/urban.jpg",
       description: "City streets in charcoal",
       date: "2024-11-15",
       featured: true
     },
     // Add up to 50 artworks
   ];
   ```

4. **Mark Featured Artworks**
   - Set `featured: true` for your 5 best artworks
   - These will appear in the Featured section on the landing page
   - All others should have `featured: false`

## 🎨 Customizing Themes

### Current Themes Available:
1. **Dark Mode** - Professional dark theme
2. **Light Mode** - Clean white theme
3. **Ocean Theme** - Blue/teal gradients
4. **Solar Theme** - Warm orange/yellow tones

### To Add a New Theme:

Edit `src/context/ThemeContext.jsx`:

```javascript
export const themes = {
  // ... existing themes
  
  sunset: {
    name: 'Sunset',
    bg: 'bg-gradient-to-br from-pink-900 via-purple-800 to-orange-900',
    text: 'text-pink-50',
    accent: 'text-orange-300',
    card: 'bg-pink-900/50',
    hover: 'hover:bg-pink-800/50',
    border: 'border-orange-700'
  }
};
```

## ✏️ Updating About Page

Edit `src/pages/About.jsx`:

### Update Artist Bio:
```javascript
<p>
  YOUR NEW BIO TEXT HERE
</p>
```

### Update Profile Image:
```javascript
<img
  src="YOUR_CLOUDINARY_IMAGE_URL"
  alt="Kaivalya Deshpande"
  className="w-full h-full object-cover"
/>
```

### Update Statistics:
```javascript
<div className={`text-4xl font-bold mb-2 ${theme.accent}`}>50+</div>
<div className={`${theme.text} opacity-80`}>Artworks Created</div>
```

## 🔗 Updating Social Links

### Footer Links
Edit `src/components/Footer.jsx`:

```javascript
<a 
  href="https://instagram.com/YOUR_USERNAME" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Instagram
</a>
```

### About Page Links
Edit `src/pages/About.jsx`:

```javascript
<a
  href="mailto:YOUR_EMAIL@example.com"
  className={...}
>
  Email Me
</a>
```

## 🎬 Customizing Animations

### Change Welcome Screen Duration
Edit `src/pages/Landing.jsx`:

```javascript
const timer = setTimeout(() => {
  setShowWelcome(false);
}, 3000); // Change 3000 to your desired milliseconds (3000 = 3 seconds)
```

### Disable Welcome Animation
Set `showWelcome` to `false` by default:

```javascript
const [showWelcome, setShowWelcome] = useState(false);
```

### Adjust Hover Effects
Edit `src/components/ArtworkCard.jsx`:

```javascript
whileHover={{ scale: 1.05, y: -5 }} // Change scale and y values
```

## 🎭 Changing Logo

Replace the logo URL in two places:

1. **Header** - `src/components/Header.jsx`:
```javascript
<img 
  src="YOUR_NEW_LOGO_URL" 
  alt="KD Kreativ Logo" 
/>
```

2. **HTML Head** - `index.html`:
```html
<link rel="icon" type="png" href="YOUR_NEW_LOGO_URL" />
```

3. **Welcome Animation** - `src/pages/Landing.jsx`:
```javascript
<motion.img
  src="YOUR_NEW_LOGO_URL"
  alt="KD Kreativ"
/>
```

## 📱 Layout Adjustments

### Change Grid Columns

**Landing Page (21 artworks)**
Edit `src/pages/Landing.jsx`:
```javascript
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
// Adjust: sm:grid-cols-2 (mobile), md:grid-cols-3 (tablet), lg:grid-cols-4 (laptop), xl:grid-cols-5 (desktop)
```

**Drawings Page (all artworks)**
Edit `src/pages/Drawings.jsx`:
```javascript
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
```

### Adjust Featured Artworks Count
Edit `src/pages/Landing.jsx`:
```javascript
const featuredArtworks = artworks.filter(art => art.featured).slice(0, 5);
// Change 5 to your desired number
```

## 🚀 Building for Production

1. **Build the project**:
```bash
npm run build
```

2. **Preview the build**:
```bash
npm run preview
```

3. **Deploy** (choose one):

### Option A: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option B: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🎨 Color Customization

### Add Custom Colors to Tailwind
Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'kd-purple': '#9333ea',
      'kd-blue': '#3b82f6',
      'kd-pink': '#ec4899',
    }
  }
}
```

Then use in components:
```javascript
className="text-kd-purple bg-kd-blue"
```

## 📊 Performance Tips

1. **Optimize Images on Cloudinary**:
   - Add transformations to URLs: `w_800,h_800,c_fill,f_auto,q_auto`
   - Example: `https://res.cloudinary.com/.../w_800,h_800,c_fill,f_auto,q_auto/image.jpg`

2. **Lazy Loading**:
   - Already implemented with `loading="lazy"` attribute
   - Images load as they come into view

3. **Reduce Animation Delays**:
   - Edit delay values in motion components
   - Lower values = faster animations

## 🐛 Common Issues & Fixes

### Issue: Images Not Showing
**Fix**: 
- Check Cloudinary URLs are complete
- Ensure images are set to "public" in Cloudinary
- Clear browser cache

### Issue: Theme Not Changing
**Fix**:
- Open browser DevTools > Application > Local Storage
- Delete `kdkreativ-theme` entry
- Refresh page

### Issue: Welcome Animation Not Playing
**Fix**:
- Check `showWelcome` state in `Landing.jsx`
- Ensure timeout is not too short
- Check console for errors

### Issue: Slow Loading
**Fix**:
- Optimize images (reduce file size)
- Use Cloudinary transformations
- Check internet connection

## 📝 Content Updates Checklist

- [ ] Upload all artwork images to Cloudinary
- [ ] Update `src/data/artworks.js` with actual artwork data
- [ ] Mark 5 best artworks as `featured: true`
- [ ] Update artist bio in `src/pages/About.jsx`
- [ ] Replace profile image URL in About page
- [ ] Update social media links in Footer
- [ ] Update contact email in About page
- [ ] Test all theme options
- [ ] Test on mobile devices
- [ ] Test all navigation links
- [ ] Build and preview production version

## 🎯 Final Steps Before Launch

1. **Test Everything**:
   - Click every link
   - Try all themes
   - Test on mobile/tablet/desktop
   - Check all images load

2. **SEO Optimization**:
   - Update meta description in `index.html`
   - Add og:image meta tags
   - Add keywords

3. **Analytics** (Optional):
   - Add Google Analytics
   - Add visitor tracking

4. **Domain Setup**:
   - Purchase domain name
   - Point domain to deployment platform
   - Set up SSL certificate (automatic on Netlify/Vercel)

## 💡 Pro Tips

1. **Consistent Naming**: Use consistent naming for artwork titles
2. **Date Format**: Always use YYYY-MM-DD format for dates
3. **Backup**: Keep a backup of your `artworks.js` file
4. **Version Control**: Use Git to track changes
5. **Regular Updates**: Add new artworks regularly to keep content fresh

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors (F12)
2. Read error messages carefully
3. Check file paths are correct
4. Ensure all dependencies are installed
5. Try `npm install` again if modules are missing

---

**Happy Creating! 🎨**
