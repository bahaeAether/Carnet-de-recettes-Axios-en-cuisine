import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export async function getRecipes() {
  const response = await api.get("/recipes", {
    params: {
      limit: 12,
    },
  });

  return response.data;
}

export async function searchRecipes(query) {
  const response = await api.get("/recipes/search", {
    params: {
      q: query,
    },
  });

  return response.data;
}

export async function addRecipe(recipe) {
  const response = await api.post("/recipes/add", recipe);

  return response.data;
}

export async function deleteRecipe(id) {
  const response = await api.delete(`/recipes/${id}`);

  return response.data;
}
