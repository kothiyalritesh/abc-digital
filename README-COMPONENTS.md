# Reusable Header & Footer System

## Overview
Your website now uses a centralized header and footer system. This means you can update the header or footer in ONE place, and it will automatically reflect across ALL pages.

## How It Works

### Files Created:
1. **header.html** - Contains the header HTML (navigation, logo, social icons)
2. **footer.html** - Contains the footer HTML (contact info, links, social media)
3. **components.js** - JavaScript that loads header and footer on every page

### How Pages Load Header & Footer:
Each HTML page now has:
```html
<body>
    <!-- Header Placeholder -->
    <div id="header-placeholder"></div>
    
    <!-- Your page content here -->
    
    <!-- Footer Placeholder -->
    <div id="footer-placeholder"></div>
    
    <script src="components.js"></script>
    <script src="script.js"></script>
</body>
```

The `components.js` script automatically:
- Fetches `header.html` and injects it into `#header-placeholder`
- Fetches `footer.html` and injects it into `#footer-placeholder`
- Initializes navigation functionality (active links, mobile menu, etc.)

## How to Update Header or Footer

### To Update Header:
1. Open `header.html`
2. Make your changes (update logo, navigation links, social media links, etc.)
3. Save the file
4. Refresh any page - the changes will appear on ALL pages!

### To Update Footer:
1. Open `footer.html`
2. Make your changes (update contact info, services links, social media, etc.)
3. Save the file
4. Refresh any page - the changes will appear on ALL pages!

## Benefits

✅ **Single Source of Truth** - Update once, apply everywhere
✅ **Consistency** - All pages always have the same header/footer
✅ **Easy Maintenance** - No need to update 30+ HTML files manually
✅ **Time Saving** - Make changes in seconds instead of hours

## Important Notes

- The header and footer are loaded via JavaScript, so JavaScript must be enabled
- The `components.js` file must be loaded BEFORE `script.js`
- Active navigation highlighting is handled automatically based on current page
- Mobile menu functionality is preserved and works across all pages

## Files Structure

```
project/
├── header.html          ← Edit this to update header
├── footer.html          ← Edit this to update footer
├── components.js        ← Loads header/footer (don't modify)
├── script.js            ← Main JavaScript functionality
├── index.html           ← Uses placeholders
├── about.html           ← Uses placeholders
├── services.html        ← Uses placeholders
└── [all other pages]    ← All use placeholders
```

## Troubleshooting

**Q: Header/Footer not showing?**
- Check browser console for errors
- Ensure `components.js` is loaded before `script.js`
- Verify `header.html` and `footer.html` exist in the same directory

**Q: Navigation not working?**
- The navigation is initialized after header loads
- Check that `script.js` is loaded after `components.js`

**Q: Active page not highlighted?**
- This is handled automatically by `components.js`
- It matches the current page URL with navigation links
