const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const { URL } = require('url');

// Create images/recipes directory if it doesn't exist
const recipeImagesDir = './images/recipes';
if (!fs.existsSync(recipeImagesDir)) {
  fs.mkdirSync(recipeImagesDir, { recursive: true });
}

// Read the recipe data
const recipesData = JSON.parse(fs.readFileSync('./recipes-data.json', 'utf8'));

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    console.log(`Downloading: ${url}`);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ Saved: ${filepath}`);
        resolve(filepath);
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to get file extension from URL
function getFileExtension(url) {
  const parsedUrl = new URL(url);
  const pathname = parsedUrl.pathname;
  const ext = path.extname(pathname);
  return ext || '.jpeg'; // Default to .jpeg if no extension
}

// Process each recipe
async function processRecipes() {
  console.log(`Processing ${recipesData.length} recipe(s)...\n`);

  for (let i = 0; i < recipesData.length; i++) {
    const recipe = recipesData[i];

    if (!recipe.coverPhoto || !recipe.coverPhoto.startsWith('http')) {
      console.log(`⚠ Skipping ${recipe.name}: No valid image URL`);
      continue;
    }

    try {
      // Generate filename from slug
      const ext = getFileExtension(recipe.coverPhoto);
      const filename = `${recipe.slug}${ext}`;
      const filepath = path.join(recipeImagesDir, filename);

      // Download the image
      await downloadImage(recipe.coverPhoto, filepath);

      // Update the recipe data to use local path
      recipe.coverPhoto = `images/recipes/${filename}`;

    } catch (error) {
      console.error(`✗ Error downloading image for ${recipe.name}:`, error.message);
    }
  }

  // Save the updated recipe data
  fs.writeFileSync('./recipes-data.json', JSON.stringify(recipesData, null, 2));
  console.log('\n✅ Updated recipes-data.json with local image paths');
  console.log('\nNext step: Run "node generate-recipes.js" to regenerate recipe pages');
}

processRecipes().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
