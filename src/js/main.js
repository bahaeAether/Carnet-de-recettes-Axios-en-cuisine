
import {
    getRecipes,
    searchRecipes,
    addRecipe,
    deleteRecipe
} from "./api.js";

// Test GET
const recipes = await getRecipes();
console.log("Recipes:", recipes);

// Test search
const results = await searchRecipes("pizza");
console.log("Search results:", results);

// Test POST
const newRecipe = await addRecipe({
    name: "Moroccan Couscous",
    cuisine: "Moroccan",
    difficulty: "Medium",
    prepTimeMinutes: 45
});

console.log("Added recipe:", newRecipe);

// Test DELETE
const deletedRecipe = await deleteRecipe(1);
console.log("Deleted recipe:", deletedRecipe);

// reTest GET
const newRecipes = await getRecipes();
console.log("Recipes:", newRecipes);
