# Crumb Trail Cookies - Static Site

AI-generated cookie recipes platform. This is a static export from Webflow, now hosted independently.

## Project Info

- **Company**: Leafspire LLC
- **Original Platform**: Webflow
- **Current Status**: Static HTML/CSS/JS site
- **Last Webflow Export**: November 8, 2025

## Deployment Options

This site can be deployed to any static hosting provider for **FREE**. Recommended options:

### Option 1: Netlify (Recommended)

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Deploy via GitHub** (recommended):
   - Push this repo to GitHub
   - Click "New site from Git"
   - Select your repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Deploy!

3. **Deploy via Drag & Drop** (quick):
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the entire `Crumbtrail` folder onto the page
   - Done!

4. **Custom Domain**:
   - Go to Site Settings → Domain Management
   - Add your custom domain
   - Update your domain's DNS to point to Netlify

### Option 2: Vercel

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Deploy**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in this directory
   - Follow prompts

3. **Or use GitHub**:
   - Push to GitHub
   - Import project in Vercel dashboard
   - Deploy!

### Option 3: GitHub Pages

1. **Create repo** on GitHub
2. **Push code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/crumbtrail.git
   git push -u origin main
   ```
3. **Enable GitHub Pages** in repository settings
4. **Custom domain**: Add CNAME file with your domain

## File Structure

```
/
├── index.html              # Homepage
├── recipes.html            # Recipe listing
├── detail_recipes.html     # Recipe detail page
├── privacy-and-policy.html # Privacy policy
├── terms-and-conditions.html # Terms
├── /account               # Account pages
├── /css                   # Stylesheets
├── /js                    # JavaScript
└── /images                # Static images
```

## Important Notes

### Recipe Content

✅ **Recipe pages have been migrated to static HTML!**

The site now includes:
- Static recipe pages in `/recipes/` directory
- Recipe data stored in `recipes-data.json`
- Dynamic JavaScript loading for recipe grids
- Individual recipe pages with full SEO markup

To add more recipes:
1. Add recipe data to `recipes-data.json`
2. Run `node generate-recipes.js` to create HTML pages
3. Recipes will automatically appear on homepage and recipes listing

### Recipe Images

**Current Status:** Recipe images are hosted on Webflow's CDN (`cdn.prod.website-files.com`)

**Options:**
1. **Keep CDN URLs** (easiest): Images typically continue working after leaving Webflow
2. **Download locally** (recommended for full independence): Run the download script

To download images locally on your machine:
```bash
node download-recipe-images.js  # Downloads images to /images/recipes/
node generate-recipes.js        # Regenerates pages with local paths
```

### External Dependencies

The site uses CDN-hosted resources:
- jQuery 3.5.1 (CloudFront)
- Lottie animations (Webflow CDN)
- Google logo (Webflow CDN)

These will continue to work without Webflow hosting.

### Features That Will Work

✅ Static pages (Homepage, Privacy, Terms)
✅ Navigation
✅ Forms (need to add form handler)
✅ Responsive design
✅ Search functionality (client-side)

### Features That Need Attention

❌ Google Login (requires backend/auth service)
❌ User profiles (requires backend)
❌ Recipe CMS content (requires data export or CMS)
❌ Jetboost filtering (may need alternative)

## Custom Domain Setup

### For Netlify:

1. In Netlify dashboard: Domain Settings → Add custom domain
2. In your domain registrar, add these DNS records:
   ```
   A     @     75.2.60.5
   CNAME www   your-site.netlify.app
   ```

### For Vercel:

1. In Vercel dashboard: Settings → Domains → Add domain
2. Follow Vercel's DNS instructions

## Cost

- **Netlify Free**: 100GB bandwidth/month
- **Vercel Free**: 100GB bandwidth/month
- **GitHub Pages**: Unlimited (with fair use)

All are **$0/month** compared to Webflow's $30/month!

## Contact

Email: crumbtrailcookies@gmail.com

---

**Last Updated**: November 13, 2025
