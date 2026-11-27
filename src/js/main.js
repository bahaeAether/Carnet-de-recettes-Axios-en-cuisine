import { getRecipes, searchRecipes, addRecipe } from "./api.js";
import {
  displayRecipes,
  updateRecipeCount,
  showMessage,
  hideMessage,
} from "./display.js";
import { validateRecipe } from "./validation.js";

let recipes = [];

const recipesContainer = document.querySelector("#recipes-container");
const recipesCount = document.querySelector("#recipes-count");
const loading = document.querySelector("#loading");

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resetSearchBtn = document.querySelector("#reset-search-btn");
const emptyState = document.querySelector("#empty-state");

const recipeForm = document.querySelector("#recipe-form");

const recipeName = document.querySelector("#recipe-name");
const recipeCuisine = document.querySelector("#recipe-cuisine");
const recipeDifficulty = document.querySelector("#recipe-difficulty");
const recipeTime = document.querySelector("#recipe-time");

const submitRecipeBtn = document.querySelector("#submit-recipe-btn");

const nameError = document.querySelector("#name-error");
const cuisineError = document.querySelector("#cuisine-error");
const difficultyError = document.querySelector("#difficulty-error");
const prepTimeError = document.querySelector("#prepTimeMinutes-error");

const message = document.querySelector("#message");

async function loadRecipes() {
  hideMessage(message);

  loading.classList.remove("hidden");

  try {
    const response = await getRecipes();

    recipes = response.recipes;

    displayRecipes(recipes, recipesContainer);

    updateRecipeCount(recipes.length, recipesCount);
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

  hideMessage(message);

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

function resetSearch() {
  hideMessage(message);

  searchInput.value = "";

  emptyState.classList.add("hidden");
  resetSearchBtn.classList.add("hidden");

  displayRecipes(recipes, recipesContainer);

  updateRecipeCount(recipes.length, recipesCount);
}

resetSearchBtn.addEventListener("click", resetSearch);

function getFormData() {
  return {
    name: recipeName.value.trim(),
    cuisine: recipeCuisine.value.trim(),
    difficulty: recipeDifficulty.value,
    prepTimeMinutes: recipeTime.value,
  };
}

recipeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideMessage(message);

  const recipeData = getFormData();

  const errors = validateRecipe(recipeData);

  displayValidationErrors(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  try {
    submitRecipeBtn.disabled = true;
    submitRecipeBtn.textContent = "Ajout en cours...";

    const newRecipe = await addRecipe(recipeData);

    recipes.unshift(newRecipe);

    displayRecipes(recipes, recipesContainer);

    updateRecipeCount(recipes.length, recipesCount);

    recipeForm.reset();

    displayValidationErrors({});

    showMessage("Recette ajoutée avec succès !", message);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  } finally {
    submitRecipeBtn.disabled = false;
    submitRecipeBtn.textContent = "Ajouter la recette";
  }
});

function displayValidationErrors(errors) {
  nameError.textContent = "";
  cuisineError.textContent = "";
  difficultyError.textContent = "";
  prepTimeError.textContent = "";

  nameError.textContent = errors.name || "";
  cuisineError.textContent = errors.cuisine || "";
  difficultyError.textContent = errors.difficulty || "";
  prepTimeError.textContent = errors.prepTimeMinutes || "";
}
