const fs = require('fs');

// Paste your CSV data here as a string
const csvData = `Name	Slug	Collection ID	Locale ID	Item ID	Archived	Draft	Created On	Updated On	Published On	Cover Photo	Limited Edition	Signature Recipe	One Liner (Intro)	Short Description	Prep Time	Cook Time	Servings	Calories	Ingredients	Step by Step Method	FAQs	Review Rotations	Prep Time (Schema)	Cook Time (Schema)	FAQ Question 1	FAQ Question 2	FAQ Question 3	FAQ Question 4	FAQ Question 5	FAQ Answer 1	FAQ Answer 2	FAQ Answer 3	FAQ Answer 4	FAQ Answer 5
Almond and Cinnamon Cookie Recipe	almond-cinnamon-cookies-recipe	67f42d014d341b8d6c814a57	67f42d0082a6be99532bfade	686999adf079222de010bac4	FALSE	FALSE	Sat Jul 05 2025 21:31:25 GMT+0000 (Coordinated Universal Time)	Mon Oct 13 2025 17:37:49 GMT+0000 (Coordinated Universal Time)	Sat Nov 08 2025 16:57:53 GMT+0000 (Coordinated Universal Time)	https://cdn.prod.website-files.com/67f42d0082a6be99532bfae8/686999adf079222de010bac0_Leonardo_Phoenix_10_Overhead_flatlay_of_goldenbrown_almond_coo_0.jpeg	FALSE	FALSE	These buttery almond cookies feature warm cinnamon notes and a delicate crunch that melts into a soft, fragrant center with every blissful bite.	Learn how to make these irresistible Almond & Cinnamon Cookies with this quick and easy cookie recipe. Perfect for holiday baking or anytime treats, these homemade cookies blend warm cinnamon with rich almond flavor for a delightful sweet that's crisp outside and chewy inside.	15 mins	12 mins	24	135	"1 cup unsalted butter, softened
3/4 cup granulated sugar
1/4 cup light brown sugar, packed
1 large egg, room temperature
1/2 teaspoon pure almond extract
1/2 teaspoon pure vanilla extract
2 1/4 cups all-purpose flour
2 teaspoons ground cinnamon
1/2 teaspoon baking soda
1/4 teaspoon salt
1 cup almonds, finely chopped
3 tablespoons cinnamon sugar (2 1/2 tablespoons sugar mixed with 1/2 tablespoon cinnamon), for rolling"	"Step 1: Start by getting your oven nice and hot at 350°F (175°C). While that's heating up, grab two baking sheets and line them with parchment paper or silicone mats to prevent sticking – trust me, this little step saves so much hassle later!

Step 2: In a large mixing bowl, cream together your softened butter, granulated sugar, and brown sugar. Don't rush this bit – beat them together for about 3-4 minutes until the mixture becomes really light and fluffy. This creates air pockets that'll give your cookies that gorgeous texture.

Step 3: Crack in your egg and pour in both the almond and vanilla extracts. Beat again until everything's beautifully combined and looks smooth and glossy, about 1 minute. Scrape down the sides of the bowl with a rubber spatula to make sure everything's mixed evenly.

Step 4: In a separate bowl, whisk together your flour, cinnamon, baking soda, and salt. This helps distribute all those dry ingredients evenly before they hit your wet mixture.

Step 5: Gradually add your dry ingredients to the butter mixture, mixing on low speed just until combined – about 30 seconds. Over-mixing will make your cookies tough, so go easy here!

Step 6: Fold in your chopped almonds with a wooden spoon or spatula until they're evenly distributed throughout the dough. If the almonds are too large, they'll make the cookies fall apart, so make sure they're finely chopped.

Step 7: In a small bowl, mix together your cinnamon sugar topping. Scoop out tablespoon-sized portions of dough (about 1-inch balls), roll them between your palms to form perfect little spheres, then roll each ball in the cinnamon sugar mixture until completely coated.

Step 8: Place the coated dough balls on your prepared baking sheets, spacing them about 2 inches apart as they'll spread while baking. Gently flatten each ball slightly with the bottom of a glass or your palm.

Step 9: Bake in your preheated oven for 10-12 minutes, until the edges are set and just beginning to turn golden brown. The centers may look slightly underdone – that's perfect! They'll continue cooking a bit as they cool and stay wonderfully chewy.

Step 10: Let the cookies cool on the baking sheets for 5 minutes – they're quite delicate when hot. Then transfer them to wire racks to cool completely. As they cool, they'll develop that perfect balance of crisp edges and tender centers with the beautiful flavor of almonds and warm cinnamon."	<h3 id="">What ingredients are used in Almond &amp; Cinnamon Cookies?</h3><p id="">These cookies require unsalted butter, granulated and brown sugars, egg, almond and vanilla extracts, flour, cinnamon, baking soda, salt, chopped almonds, and a cinnamon sugar coating. The balance of warm spices with nutty almonds creates their distinctive flavour profile.</p><h3 id="">How to bake Almond &amp; Cinnamon Cookies at home?</h3><p id="">Learn how to bake Almond &amp; Cinnamon Cookies by preheating your oven to 350°F, creaming butter with sugars until fluffy, adding egg and extracts, mixing in dry ingredients, folding in chopped almonds, rolling dough balls in cinnamon sugar, and baking for 10-12 minutes until edges are golden but centres remain slightly soft for that perfect chewy texture.</p><h3 id="">Why should I chill cookie dough before baking?</h3><p id="">Chilling cookie dough allows fats to solidify, preventing excessive spreading during baking. It also deepens flavours as ingredients meld together and enhances the chewy texture. For these cinnamon almond cookies, 30 minutes in the fridge will improve their texture and flavour complexity.</p><h3 id="">Can I make these cookies without almond extract?</h3><p id="">Yes, you can omit almond extract or substitute with additional vanilla extract, though you'll lose some of the distinctive almond flavour. Another option is using a small amount of amaretto liqueur or a drop of bitter almond oil for a similar aromatic quality.</p><h3 id="">How long do homemade cookies stay fresh?</h3><p id="">These homemade cookies will stay fresh for up to 5 days when stored in an airtight container at room temperature. For longer storage, freeze baked cookies for up to 3 months. Adding a slice of bread to your storage container helps maintain moisture and prevent them from drying out.</p>	Warmth of cinnamon absolutely perfect!|Crisp edges with chewy almond center!|Made these twice already this week!|Dough freezes well for later baking!|Cinnamon sugar topping is addictive!|Almond extract makes these extra special!|Husband couldn't stop eating them!	PT15M	PT12M	What ingredients are used in Almond & Cinnamon Cookies?	How to bake Almond & Cinnamon Cookies at home?	Why should I chill cookie dough before baking?	Can I make these cookies without almond extract?	How long do homemade cookies stay fresh?	These cookies require unsalted butter, granulated and brown sugars, egg, almond and vanilla extracts, flour, cinnamon, baking soda, salt, chopped almonds, and a cinnamon sugar coating. The balance of warm spices with nutty almonds creates their distinctive flavour profile.	Learn how to bake Almond & Cinnamon Cookies by preheating your oven to 350°F, creaming butter with sugars until fluffy, adding egg and extracts, mixing in dry ingredients, folding in chopped almonds, rolling dough balls in cinnamon sugar, and baking for 10-12 minutes until edges are golden but centres remain slightly soft for that perfect chewy texture.	Chilling cookie dough allows fats to solidify, preventing excessive spreading during baking. It also deepens flavours as ingredients meld together and enhances the chewy texture. For these cinnamon almond cookies, 30 minutes in the fridge will improve their texture and flavour complexity.	Yes, you can omit almond extract or substitute with additional vanilla extract, though you'll lose some of the distinctive almond flavour. Another option is using a small amount of amaretto liqueur or a drop of bitter almond oil for a similar aromatic quality.	These homemade cookies will stay fresh for up to 5 days when stored in an airtight container at room temperature. For longer storage, freeze baked cookies for up to 3 months. Adding a slice of bread to your storage container helps maintain moisture and prevent them from drying out.`;

// Parse CSV with proper handling of quoted fields containing tabs and newlines
function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === '\t' && !insideQuotes) {
      // Field separator
      currentRow.push(currentField);
      currentField = '';
    } else if (char === '\n' && !insideQuotes) {
      // Row separator
      currentRow.push(currentField);
      if (currentRow.some(field => field.trim())) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Add last field and row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(field => field.trim())) {
      rows.push(currentRow);
    }
  }

  return rows;
}

const rows = parseCSV(csvData);
const headers = rows[0];
const recipes = [];

for (let i = 1; i < rows.length; i++) {
  const values = rows[i];
  const recipe = {};

  for (let j = 0; j < headers.length; j++) {
    recipe[headers[j]] = values[j] || '';
  }

  recipes.push({
    name: recipe['Name'],
    slug: recipe['Slug'],
    coverPhoto: recipe['Cover Photo'],
    oneLiner: recipe['One Liner (Intro)'],
    shortDescription: recipe['Short Description'],
    prepTime: recipe['Prep Time'],
    cookTime: recipe['Cook Time'],
    servings: recipe['Servings'],
    calories: recipe['Calories'],
    ingredients: recipe['Ingredients'],
    method: recipe['Step by Step Method'],
    faqs: recipe['FAQs'],
    reviewRotations: recipe['Review Rotations'],
    prepTimeSchema: recipe['Prep Time (Schema)'],
    cookTimeSchema: recipe['Cook Time (Schema)']
  });
}

// Write to JSON file
fs.writeFileSync('./recipes-data.json', JSON.stringify(recipes, null, 2));
console.log(`✅ Parsed ${recipes.length} recipes!`);
