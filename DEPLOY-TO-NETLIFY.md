# Deploy to Netlify (2 Minutes)

## Method 1: Drag & Drop (Easiest!)

1. **Go to** [https://app.netlify.com/drop](https://app.netlify.com/drop)

2. **Drag your entire Crumbtrail folder** onto the page
   - Or click "browse to upload" and select the folder

3. **Wait ~30 seconds** for deployment

4. **Done!** Netlify gives you a URL like: `https://random-name-123.netlify.app`

5. **Test your site** at that URL

## Method 2: Connect to GitHub (Recommended for Updates)

1. **Push your code to GitHub** (already done ✓)

2. **Go to** [https://app.netlify.com](https://app.netlify.com)

3. **Click** "Add new site" → "Import an existing project"

4. **Connect to GitHub** and select your `Crumbtrail` repository

5. **Select the branch:** `claude/review-file-016k94FNahymypBqYjiWMCPb`

6. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `.` (dot means root folder)

7. **Click** "Deploy site"

8. **Done!** Every time you push to GitHub, Netlify auto-updates

## After Deployment

Your site will be live at: `https://[random-name].netlify.app`

### Test These URLs:

- Homepage: `https://[your-site].netlify.app/`
- Recipes: `https://[your-site].netlify.app/recipes.html`
- Single Recipe: `https://[your-site].netlify.app/recipes/almond-cinnamon-cookies-recipe.html`

## Custom Domain (Later)

Once everything works:
1. In Netlify: Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `crumbtrailcookies.com`)
4. Follow DNS instructions

## What to Check After Deploy

✅ Homepage loads
✅ Recipe appears on homepage with image
✅ Click recipe → goes to detail page
✅ Recipe page shows all content
✅ Recipes listing page works
✅ No console errors (F12 → Console)

## If Something Breaks

Check the browser console (F12) for errors and let me know what you see!
