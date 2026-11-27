export function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "bg-white rounded-xl shadow-sm overflow-hidden";

  const image = document.createElement("img");
  image.src = recipe.image || "https://placehold.co/600x400?text=No+Image";
  image.alt = recipe.name;
  image.className = "w-full h-48 object-cover";

  const content = document.createElement("div");
  content.className = "p-4";

  const name = document.createElement("h3");
  name.textContent = recipe.name;
  name.className = "text-lg font-bold";

  const cuisine = document.createElement("p");
  cuisine.textContent = `Cuisine : ${recipe.cuisine}`;

  const difficulty = document.createElement("p");
  difficulty.textContent = `Difficulté : ${recipe.difficulty}`;

  const prepTime = document.createElement("p");
  prepTime.textContent = `Préparation : ${recipe.prepTimeMinutes} minutes`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  deleteBtn.className =
    "mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700";

  content.append(name, cuisine, difficulty, prepTime, deleteBtn);

  card.append(image, content);

  return card;
}

export function displayRecipes(recipes, container) {
  container.replaceChildren();

  for (const recipe of recipes) {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  }
}

export function updateRecipeCount(count, element) {
  element.textContent = `${count} recette${count > 1 ? "s" : ""}`;
}

export function showMessage(message, element, type = "success") {
  element.textContent = message;

  element.classList.remove(
    "hidden",
    "bg-green-100",
    "text-green-800",
    "bg-red-100",
    "text-red-800",
  );

  if (type === "error") {
    element.classList.add("bg-red-100", "text-red-800");
  } else {
    element.classList.add("bg-green-100", "text-green-800");
  }
}

export function hideMessage(element) {
  element.classList.add("hidden");
}
