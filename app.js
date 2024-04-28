// Initial references
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let input = document.querySelector("input");

let defaultSearchTerm = "chicken"; // Default search term
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Fetch and display default recipes on page load
window.onload = function () {
  fetchAndDisplayMeals(defaultSearchTerm);
};

function fetchAndDisplayMeals(searchTerm) {
  fetch(url + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        displayMeal(data.meals[0]);
      } else {
        result.innerHTML = `<h3>No recipes found for "${searchTerm}"</h3>`;
      }
    })
    .catch(() => {
      result.innerHTML = `<h3>Error fetching recipes. Please try again later.</h3>`;
    });
}

function displayMeal(myMeal) {
  console.log(myMeal);
  let count = 1;
  let ingredients = [];
  for (let i in myMeal) {
    let ingredient = "";
    let measure = "";
    if (i.startsWith("strIngredient") && myMeal[i]) {
      ingredient = myMeal[i];
      measure = myMeal["strMeasure" + count];
      count += 1;
      ingredients.push(`${measure} ${ingredient} `);
    }
  }
  result.innerHTML = `
    <img src=${myMeal.strMealThumb}>
    <div class="details">
      <h2>${myMeal.strMeal}</h2>
      <h4>${myMeal.strArea}</h4>
    </div>
    <div class="ingredient-content"></div>
    <div class="recipe">
      <button id="hide-recipe">X</button>
      <pre id="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
  `;
  let ingredientContent = document.querySelector(".ingredient-content");
  let parent = document.createElement("ul");
  ingredients.forEach((ingredient) => {
    let child = document.createElement("li");
    child.innerText = ingredient;
    parent.appendChild(child);
    ingredientContent.appendChild(parent);
  });
  let hideRecipe = document.getElementById("hide-recipe");
  let showRecipe = document.getElementById("show-recipe");
  let recipe = document.querySelector(".recipe");
  hideRecipe.addEventListener("click", () => {
    recipe.style.display = "none";
  });
  showRecipe.addEventListener("click", () => {
    recipe.style.display = "block";
  });
}

// Remove input event listener setup for searching
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    fetchAndDisplayMeals(input.value);
  }
});
searchBtn.addEventListener("click", () => fetchAndDisplayMeals(input.value));
