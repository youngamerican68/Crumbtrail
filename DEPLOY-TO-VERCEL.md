# Deploy to Vercel (2 Minutes)

## Method 1: Drag & Drop (Easiest!)

1. **Go to** [https://vercel.com/new](https://vercel.com/new)

2. **Sign in** to your Vercel account

3. **Click** "Continue with GitHub" (or drag & drop your folder)

4. **Select your repository:** `Crumbtrail`

5. **Configure project:**
   - Framework Preset: **Other** (or None)
   - Root Directory: `./` (leave as is)
   - Build Command: *leave empty*
   - Output Directory: *leave empty*
   - Install Command: *leave empty*

6. **Click** "Deploy"

7. **Wait ~20 seconds** → Your site is live!

## Method 2: Vercel CLI (For Quick Testing)

```bash
# Install Vercel CLI (one time only)
npm install -g vercel

# In your Crumbtrail folder:
cd Crumbtrail

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - What's your project name? crumbtrail-cookies (or whatever)
# - In which directory is your code? ./
# - Want to modify settings? No

# Done! You get a URL instantly
```

## Your Live URLs

After deployment, Vercel gives you:
- Production URL: `https://crumbtrail-cookies.vercel.app` (or similar)
- You can also add your custom domain later

### Test These Pages:

✅ Homepage: `https://your-site.vercel.app/`
✅ Recipes: `https://your-site.vercel.app/recipes.html`
✅ Single Recipe: `https://your-site.vercel.app/recipes/almond-cinnamon-cookies-recipe.html`

## Auto-Deploy from GitHub

Once you connect via Method 1, every time you push to your GitHub branch, Vercel automatically rebuilds and deploys. It's instant!

## Custom Domain (Later)

1. In Vercel dashboard: Settings → Domains
2. Add your domain (e.g., `crumbtrailcookies.com`)
3. Update your domain's DNS settings (Vercel shows you exactly what to do)
4. Done!

## What to Check After Deploy

✅ Homepage loads properly
✅ Recipe card appears with image
✅ Click recipe → goes to detail page
✅ Recipe page shows ingredients, method, prep/cook times
✅ Recipes listing page displays the recipe
✅ No errors in browser console (press F12 → Console tab)

## Vercel vs Netlify - Both Are Great!

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Free tier | ✅ Yes | ✅ Yes |
| Custom domain | ✅ Free | ✅ Free |
| Auto-deploy | ✅ Yes | ✅ Yes |
| Speed | 🚀 Fast | 🚀 Fast |
| SSL/HTTPS | ✅ Auto | ✅ Auto |

**Use whichever you already have an account with!** They're both excellent.

## If Something Breaks

Open browser console (F12 → Console) and check for errors. Let me know what you see!
