const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = './Crumb trail cookies  - Recipes.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV (simple parser - handles quoted fields with newlines)
function parseCSV(content) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quotes
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      currentLine.push(currentField);
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      // End of line
      if (currentField || currentLine.length > 0) {
        currentLine.push(currentField);
        lines.push(currentLine);
        currentLine = [];
        currentField = '';
      }
    } else {
      currentField += char;
    }
  }

  // Add last field/line
  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField);
    lines.push(currentLine);
  }

  return lines;
}

// Parse the CSV
const rows = parseCSV(csvContent);
const headers = rows[0];
const recipes = [];

// Find column indices
const colMap = {};
headers.forEach((header, index) => {
  colMap[header.trim()] = index;
});

console.log('Found columns:', Object.keys(colMap).slice(0, 10) + '...');

// Process each recipe row
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  if (!row[colMap['Name']] || row[colMap['Name']].trim() === '') {
    continue; // Skip empty rows
  }

  const recipe = {
    name: row[colMap['Name']] || '',
    slug: row[colMap['Slug']] || '',
    coverPhoto: row[colMap['Cover Photo']] || '',
    oneLiner: row[colMap['One Liner (Intro)']] || '',
    shortDescription: row[colMap['Short Description']] || '',
    prepTime: row[colMap['Prep Time']] || '15 mins',
    cookTime: row[colMap['Cook Time']] || '12 mins',
    servings: row[colMap['Servings']] || '24',
    calories: row[colMap['Calories']] || '150',
    ingredients: row[colMap['Ingredients']] || '',
    method: row[colMap['Step by Step Method']] || '',
    faqs: row[colMap['FAQs']] || '',
    reviewRotations: row[colMap['Review Rotations']] || '',
    prepTimeSchema: row[colMap['Prep Time (Schema)']] || 'PT15M',
    cookTimeSchema: row[colMap['Cook Time (Schema)']] || 'PT12M'
  };

  recipes.push(recipe);
  console.log(`✓ Parsed: ${recipe.name}`);
}

// Save to recipes-data.json
fs.writeFileSync('./recipes-data.json', JSON.stringify(recipes, null, 2));

console.log(`\n✅ Successfully parsed ${recipes.length} recipes!`);
console.log('📄 Saved to recipes-data.json');
console.log('\nNext step: Run "node generate-recipes.js" to create HTML pages');
