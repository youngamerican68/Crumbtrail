const fs = require('fs');

// Number of expected columns in the CSV (count from header)
const EXPECTED_COLUMNS = 35;

// Read CSV file
const csvContent = fs.readFileSync('./webflow-export.csv', 'utf8');

// Function to parse TSV with embedded newlines
function parseTSV(text) {
  const lines = text.split('\n');
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let fieldsInCurrentRow = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const tabCount = (line.match(/\t/g) || []).length;

    if (fieldsInCurrentRow === 0) {
      // Starting a new row
      const fields = line.split('\t');
      if (fields.length === EXPECTED_COLUMNS) {
        // Complete row on one line
        rows.push(fields);
      } else {
        // Row spans multiple lines
        currentRow = fields;
        fieldsInCurrentRow = fields.length;
      }
    } else {
      // Continuation of previous row
      const fields = line.split('\t');

      // Append to last field of current row
      currentRow[currentRow.length - 1] += '\n' + fields[0];

      // Add remaining fields
      for (let j = 1; j < fields.length; j++) {
        currentRow.push(fields[j]);
        fieldsInCurrentRow++;
      }

      if (fieldsInCurrentRow >= EXPECTED_COLUMNS) {
        rows.push(currentRow);
        currentRow = [];
        fieldsInCurrentRow = 0;
      }
    }
  }

  return rows;
}

const rows = parseTSV(csvContent);
const headers = rows[0];
const recipes = [];

console.log(`Found ${rows.length - 1} recipe rows`);
console.log(`Headers: ${headers.length} columns`);

for (let i = 1; i < rows.length; i++) {
  const values = rows[i];
  const recipe = {};

  for (let j = 0; j < headers.length && j < values.length; j++) {
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
