const fs = require('fs');
const path = require('path');

// Read the recipe data
const recipesData = JSON.parse(fs.readFileSync('./recipes-data.json', 'utf8'));

// Read the template
const template = fs.readFileSync('./single-listing/recipe-template.html', 'utf8');

// Helper function to convert newline-separated text to HTML list
function textToHtmlList(text, ordered = false) {
  const items = text.split('\n').filter(item => item.trim());
  const tag = ordered ? 'ol' : 'ul';
  const listItems = items.map(item => `  <li class="ingredients-single-item">${item.trim()}</li>`).join('\n');
  return `<${tag} class="ingredients-main-list">\n${listItems}\n</${tag}>`;
}

// Helper function to convert method steps to HTML
function methodToHtml(methodText) {
  const steps = methodText.split(/Step \d+:/).filter(step => step.trim());
  const methodHtml = steps.map((step, index) => {
    const stepNumber = index + 1;
    const cleanStep = step.trim();
    return `<div class="method_step">
  <div class="method_num">${stepNumber}</div>
  <p>${cleanStep}</p>
</div>`;
  }).join('\n');

  return `<div class="MethodStepper">\n${methodHtml}\n</div>`;
}

// Helper function to pick a random review
function getRandomReview(reviewRotations) {
  const reviews = reviewRotations.split('|').filter(r => r.trim());
  return reviews[Math.floor(Math.random() * reviews.length)];
}

// Generate Schema.org JSON-LD for recipe
function generateRecipeSchema(recipe) {
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.name,
    "image": [recipe.coverPhoto],
    "description": recipe.shortDescription,
    "prepTime": recipe.prepTimeSchema,
    "cookTime": recipe.cookTimeSchema,
    "totalTime": recipe.prepTimeSchema && recipe.cookTimeSchema ?
      `PT${parseInt(recipe.prepTimeSchema.match(/\d+/)[0]) + parseInt(recipe.cookTimeSchema.match(/\d+/)[0])}M` :
      recipe.cookTimeSchema,
    "recipeYield": recipe.servings,
    "recipeIngredient": recipe.ingredients.split('\n').filter(i => i.trim()),
    "recipeInstructions": recipe.method.split(/Step \d+:/).filter(s => s.trim()).map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step.trim()
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.calories} calories`
    }
  };
}

// Create recipes directory if it doesn't exist
if (!fs.existsSync('./recipes')) {
  fs.mkdirSync('./recipes');
}

// Generate HTML for each recipe
recipesData.forEach((recipe, index) => {
  console.log(`Generating page for: ${recipe.name}`);

  // Convert ingredients and method to HTML
  const ingredientsHtml = textToHtmlList(recipe.ingredients, false);
  const methodHtml = methodToHtml(recipe.method);

  // Get a random review
  const randomReview = getRandomReview(recipe.reviewRotations);

  // Generate schema
  const schema = generateRecipeSchema(recipe);

  // Replace placeholders in template
  let html = template;

  // Update page title
  html = html.replace(/<title>.*?<\/title>/, `<title>${recipe.name} | Crumb Trail Cookies</title>`);

  // Add meta description
  html = html.replace('<meta content="Webflow" name="generator">',
    `<meta name="description" content="${recipe.shortDescription}">
  <meta content="Webflow" name="generator">`);

  // Update recipe schema in head
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`
  );

  // Update thumbnail image
  html = html.replace(
    /(<img data-js="thumbnail"[^>]*src=")[^"]*(")/,
    `$1${recipe.coverPhoto}$2`
  );
  html = html.replace(
    /(<img data-js="thumbnail"[^>]*alt=")[^"]*(")/,
    `$1${recipe.name}$2`
  );

  // Update review blip
  html = html.replace(
    /<div class="review-text-block">.*?<\/div>/,
    `<div class="review-text-block">${randomReview}</div>`
  );

  // Update title
  html = html.replace(
    /<h1 data-js="title"[^>]*>.*?<\/h1>/,
    `<h1 data-js="title" class="recipe-name">${recipe.name}</h1>`
  );

  // Update description
  html = html.replace(
    /<h2 data-js="description"[^>]*>.*?<\/h2>/,
    `<h2 data-js="description" class="subtitle-text inner">${recipe.oneLiner}</h2>`
  );

  // Update prep time
  html = html.replace(
    /(<h3 class="tag-text prep">Prep<\/h3>\s*<div class="timing listed">).*?(<\/div>)/,
    `$1${recipe.prepTime}$2`
  );

  // Update cook time
  html = html.replace(
    /(<h3 class="tag-text prep">Cook<\/h3>\s*<div[^>]*data-js="cookTime"[^>]*>).*?(<\/div>)/,
    `$1${recipe.cookTime}$2`
  );

  // Update servings
  html = html.replace(
    /(<h3 class="tag-text prep">Serve<\/h3>\s*<div class="timing listed">).*?(<\/div>)/,
    `$1${recipe.servings} cookies$2`
  );

  // Update calories
  html = html.replace(
    /(<h3 class="tag-text prep">Kcal<\/h3>\s*<div class="timing listed">).*?(<\/div>)/,
    `$1${recipe.calories}$2`
  );

  // Update ingredients section
  html = html.replace(
    /<div id="ingredients" class="recipe-tab-text">.*?<\/div>/s,
    `<div id="ingredients" class="recipe-tab-text">${ingredientsHtml}</div>`
  );

  // Update method section
  html = html.replace(
    /<div id="method" class="recipe-tab-text">.*?<\/div>/s,
    `<div id="method" class="recipe-tab-text">${methodHtml}</div>`
  );

  // Update FAQ section
  html = html.replace(
    /<div class="faq-title title">.*?<\/div>/,
    `<div class="faq-title title">${recipe.name}</div>`
  );
  html = html.replace(
    /<div class="faq-subtitle title name">.*?<\/div>/,
    `<div class="faq-subtitle title name">Common Questions Answered</div>`
  );
  html = html.replace(
    /<div class="faq-content w-richtext">[\s\S]*?<\/div>\s*<\/div>\s*<div class="caloriewarning">/,
    `<div class="faq-content w-richtext">${recipe.faqs}</div>
                      </div>
                      <div class="caloriewarning">`
  );

  // Write the HTML file
  const filename = `./recipes/${recipe.slug}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✓ Created: ${filename}`);
});

console.log(`\n✅ Generated ${recipesData.length} recipe page(s)!`);
