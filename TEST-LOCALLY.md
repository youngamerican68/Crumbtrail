# Testing Your Site Locally

## Quick Start

1. **Clone or download this repository to your computer**

2. **Open terminal/command prompt in the Crumbtrail folder**

3. **Start a local web server:**

### Option A: Python (easiest, most common)
```bash
# Python 3
python3 -m http.server 8000

# OR Python 2
python -m SimpleHTTPServer 8000
```

### Option B: Node.js
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server -p 8000
```

### Option C: PHP
```bash
php -S localhost:8000
```

4. **Open your browser and go to:**
```
http://localhost:8000
```

## What to Test

### Homepage (index.html)
- [ ] Page loads without errors
- [ ] Recipe card appears in the "Discover Recipes" section
- [ ] Recipe image displays (should be almond cinnamon cookies)
- [ ] Click on recipe card → should go to recipe page

### Recipes Page (recipes.html)
- [ ] Navigate to http://localhost:8000/recipes.html
- [ ] Recipe appears in the grid
- [ ] Search box works (type "almond")
- [ ] Click recipe → goes to detail page

### Individual Recipe Page
- [ ] Navigate to http://localhost:8000/recipes/almond-cinnamon-cookies-recipe.html
- [ ] Recipe image displays at top
- [ ] Title shows: "Almond and Cinnamon Cookie Recipe"
- [ ] Prep time: 15 mins, Cook time: 12 mins
- [ ] Ingredients tab shows list of ingredients
- [ ] Directions tab shows cooking steps
- [ ] FAQ section appears at bottom

## Troubleshooting

**Recipe doesn't appear on homepage/recipes page:**
- Open browser console (F12)
- Look for errors loading `recipes-data.json`
- Make sure you're running a server (not just opening index.html directly)

**Images don't load:**
- Check browser console for image loading errors
- Currently using Webflow CDN - requires internet connection

## When Everything Works

If all tests pass, you're ready to:
1. Add all remaining recipes to `recipes-data.json`
2. Run `node generate-recipes.js` to create all recipe pages
3. Deploy to Netlify/Vercel

## Need Help?

Check the console (F12 → Console tab) for any JavaScript errors.
