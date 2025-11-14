const fs = require('fs');

// Recipe names from your CSV export (in order)
const recipeNames = [
  "Almond and Cinnamon Cookie Recipe",
  "Anise and Almond Cookie Recipe",
  "Apple Cinnamon Pecan Cookie Recipe",
  "Beetroot and White Chocolate with Pistachios Cookie Recipe",
  "Caramel Hazelnut Coffee Cookie Recipe",
  "Chocolate Chip and Chili Cookie Recipe",
  "Coconut Lime Macadamia Cookie Recipe",
  "Coriander Seed Cookie Recipe",
  "Dark Chocolate with Rosemary Cookie Recipe",
  "Fig and Walnut Cookie Recipe",
  "Gingerbread Cream Cheese Frosting Cookie Recipe",
  "Kinder Bueno Cookie Recipe",
  "Lavender Lemon Shortbread Cookie Recipe",
  "Lavender and Chamomile Tea Cookie Recipe",
  "Miso and Caramel Cookie Recipe",
  "Mousserons and Walnut Cookie Recipe",
  "Orange and Olive Cookie Recipe",
  "Orange and Saffron Cookie Recipe",
  "Raspberry White Chocolate Cheesecake Cookie Recipe",
  "Red Licorice and White Chocolate Macadamia Nut Cookie Recipe",
  "Rich Chocolate Florentines with Ginger and Almond Cookie Recipe",
  "Rolled Date Cookie Recipe",
  "Rosemary and Apricot Shortbread Cookie Recipe",
  "Rosemary and Lime Cookie Recipe",
  "Rutabaga and Nutmeg Cookie Recipe",
  "Soft Matcha with Raspberry and White Chocolate Cookie Recipe",
  "Spiced Chai Masala Cookie Recipe",
  "White Chocolate and Almonds Cookie Recipe"
];

// Slugs corresponding to each recipe
const recipeSlugs = [
  "almond-cinnamon-cookies-recipe",
  "anise-almond-cookies-recipe-32891",
  "apple-cinnamon-pecan-cookie-recipe",
  "beetroot-and-white-chocolate-with-pistachios-cookie-recipe",
  "caramel-hazelnut-coffee-cookie-recipe",
  "chocolate-chip-and-chili-cookies-recipe",
  "coconut-lime-macadamia-cookie-recipe",
  "coriander-seed-cookies-recipe",
  "dark-chocolate-with-rosemary-recipe",
  "fig-walnut-cookie-recipe",
  "gingerbread-cream-cheese-frosting-cookies-recipe",
  "kinder-bueno-cookie-recipe",
  "lavender-lemon-shortbread-cookie-recipe",
  "lavender-and-chamomile-tea-cookie-recipe",
  "miso-and-caramel-cookie-recipe",
  "mousserons-and-walnut-cookies-recipe",
  "orange-and-olive-cookies-recipe",
  "orange-saffron-cookies-recipe",
  "raspberry-white-chocolate-cheesecake-cookie-recipe",
  "red-licorice-and-white-chocolate-macadamia-nut-cookies-recipe",
  "rich-chocolate-florentines-with-ginger-and-almond-recipe-5df2f",
  "rolled-date-cookie-recipe",
  "rosemary-apricot-shortbread-recipe",
  "rosemary-and-lime-cookies-recipe",
  "rutabaga-and-nutmeg-cookies-recipe",
  "soft-matcha-cookies-with-raspberry-and-white-chocolate-recipe",
  "spiced-chai-masala-cookie-recipe",
  "white-chocolate-and-almonds-recipe"
];

console.log(`Found ${recipeNames.length} recipes to process`);

// We'll use the existing recipe data as a template and just ensure we have entries for all slugs
const existingData = JSON.parse(fs.readFileSync('./recipes-data.json', 'utf8'));

// Make sure we have at least placeholder entries for all recipes
const recipes = [];
for (let i = 0; i < recipeNames.length; i++) {
  // Find if this recipe already exists in our data
  const existing = existingData.find(r => r.slug === recipeSlugs[i] || r.name === recipeNames[i]);

  if (existing) {
    recipes.push(existing);
  } else {
    // Create placeholder
    recipes.push({
      name: recipeNames[i],
      slug: recipeSlugs[i],
      coverPhoto: "",
      oneLiner: "",
      shortDescription: "",
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: "24",
      calories: "150",
      ingredients: "",
      method: "",
      faqs: "",
      reviewRotations: "",
      prepTimeSchema: "PT15M",
      cookTimeSchema: "PT12M"
    });
  }
}

fs.writeFileSync('./recipes-data.json', JSON.stringify(recipes, null, 2));
console.log(`✅ Created recipes-data.json with ${recipes.length} recipes!`);
ENDSCRIPT