// Load and display recipes on home page (limited to 3)
(function() {
  // Fetch the recipes data
  fetch('./recipes-data.json')
    .then(response => response.json())
    .then(recipes => {
      const grid = document.getElementById('homeRecipeGrid');
      if (!grid) return;

      // Clear existing placeholder
      grid.innerHTML = '';

      // Show only first 3 recipes on home page
      const limitedRecipes = recipes.slice(0, 3);

      // Generate HTML for each recipe
      limitedRecipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.setAttribute('role', 'listitem');
        recipeCard.className = 'recipe-collection-item w-dyn-item';

        recipeCard.innerHTML = `
          <a href="recipes/${recipe.slug}.html" class="recipe-single-item w-inline-block">
            <div class="recipe-grid-container">
              <div class="recipe-image-wrap" style="background-image: url('${recipe.coverPhoto}'); background-size: cover; background-position: center; height: 250px; border-radius: 8px;">
                <div class="recipe-category-tag">
                  <div class="card-tag single">Cookie Recipe</div>
                </div>
              </div>
              <h1 class="card-title">${recipe.name}</h1>
              <div class="card-description">${recipe.oneLiner}</div>
            </div>
            <div class="w-embed"><input type="hidden" class="jetboost-list-item" value="${recipe.name}"></div>
          </a>
        `;

        grid.appendChild(recipeCard);
      });
    })
    .catch(error => {
      console.error('Error loading recipes:', error);
      const grid = document.getElementById('homeRecipeGrid');
      if (grid) {
        grid.innerHTML = '<div class="w-dyn-empty"><div>Error loading recipes. Please refresh the page.</div></div>';
      }
    });
})();
