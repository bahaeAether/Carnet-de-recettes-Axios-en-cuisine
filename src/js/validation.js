export function validateRecipe(recipe) {
  const errors = {};

  const name = recipe.name.trim();

  if (name.length < 3 || name.length > 60) {
    errors.name = "Le nom doit contenir entre 3 et 60 caractères.";
  }

  if (!recipe.cuisine.trim()) {
    errors.cuisine = "Veuillez renseigner la cuisine.";
  }

  if (!recipe.difficulty.trim()) {
    errors.difficulty = "Veuillez sélectionner une difficulté.";
  }

  const prepTime = Number(recipe.prepTimeMinutes);

  if (!Number.isInteger(prepTime) || prepTime < 1 || prepTime > 300) {
    errors.prepTimeMinutes =
      "Le temps doit être un nombre entier entre 1 et 300 minutes.";
  }

  return errors;
}
