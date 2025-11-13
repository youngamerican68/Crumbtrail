// Load and display recipes dynamically
document.addEventListener('DOMContentLoaded', function() {
  // Fetch the recipes data
  fetch('./recipes-data.json')
    .then(response => response.json())
    .then(recipes => {
      const grid = document.getElementById('recipeGrid');
      if (!grid) {
        console.error('recipeGrid element not found');
        return;
      }

      // Clear existing placeholder
      grid.innerHTML = '';

      // Generate HTML for each recipe
      recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.setAttribute('role', 'listitem');
        recipeCard.className = 'recipe-collection-item w-dyn-item';

        recipeCard.innerHTML = `
          <a id="recipeItem" href="recipes/${recipe.slug}.html" class="recipe-single-item w-inline-block">
            <div class="recipe-grid-container">
              <div class="recipe-image-wrap" style="background-image: url('${recipe.coverPhoto}'); background-size: cover; background-position: center; height: 250px; border-radius: 8px;"></div>
              <div class="recipe-category-tag">
                <div class="card-tag single">Cookie Recipe</div>
              </div>
              <h1 id="recipeTitle" class="card-title">${recipe.name}</h1>
              <div class="card-description">${recipe.oneLiner}</div>
              <div class="card-details row">
                <div class="card-index-label labels">
                  <h3 class="detail-title pre">Prep</h3>
                  <div class="detail-label colored">${recipe.prepTime}</div>
                </div>
                <div class="card-index-label labels">
                  <h3 class="detail-title pre">Cook</h3>
                  <div class="detail-label colored">${recipe.cookTime}</div>
                </div>
                <div class="card-index-label labels">
                  <h3 class="detail-title pre">Serves</h3>
                  <div class="detail-label colored">${recipe.servings}</div>
                </div>
                <div class="card-index-label labels">
                  <h3 class="detail-title pre">Kcal</h3>
                  <div class="detail-label colored">${recipe.calories}</div>
                </div>
              </div>
            </div>
            <div class="w-embed"><input type="hidden" class="jetboost-list-item" value="${recipe.name}"></div>
          </a>
        `;

        grid.appendChild(recipeCard);
      });
    })
    .catch(error => {
      console.error('Error loading recipes:', error);
      const grid = document.getElementById('recipeGrid');
      if (grid) {
        grid.innerHTML = '<div class="w-dyn-empty"><div>Error loading recipes. Please refresh the page.</div></div>';
      }
    });
});
