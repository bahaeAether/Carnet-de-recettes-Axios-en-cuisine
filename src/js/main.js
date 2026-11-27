import { getRecipes, searchRecipes } from "./api.js";
import { displayRecipes, updateRecipeCount } from "./display.js";

const recipesContainer = document.querySelector("#recipes-container");
const recipesCount = document.querySelector("#recipes-count");
const loading = document.querySelector("#loading");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resetSearchBtn = document.querySelector("#reset-search-btn");
const emptyState = document.querySelector("#empty-state");

async function loadRecipes() {
  loading.classList.remove("hidden");

  try {
    const response = await getRecipes();

    displayRecipes(response.recipes, recipesContainer);

    updateRecipeCount(response.recipes.length, recipesCount);
  } catch (error) {
    console.error("Erreur lors du chargement des recettes :", error);
  } finally {
    loading.classList.add("hidden");
  }
}

loadRecipes();

async function searchForRecipes() {
  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  resetSearchBtn.classList.remove("hidden");

  loading.classList.remove("hidden");
  emptyState.classList.add("hidden");

  try {
    const response = await searchRecipes(query);

    displayRecipes(response.recipes, recipesContainer);

    updateRecipeCount(response.recipes.length, recipesCount);

    if (response.recipes.length === 0) {
      emptyState.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
  } finally {
    loading.classList.add("hidden");
  }
}

searchBtn.addEventListener("click", searchForRecipes);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchForRecipes();
  }
});

async function resetSearch() {
  searchInput.value = "";

  loading.classList.remove("hidden");

  emptyState.classList.add("hidden");
  resetSearchBtn.classList.add("hidden");

  try {
    const response = await getRecipes();

    displayRecipes(response.recipes, recipesContainer);

    updateRecipeCount(response.recipes.length, recipesCount);
  } catch (error) {
    console.error("Erreur lors du chargement des recettes :", error);
  } finally {
    loading.classList.add("hidden");
  }
}

resetSearchBtn.addEventListener("click", resetSearch);
