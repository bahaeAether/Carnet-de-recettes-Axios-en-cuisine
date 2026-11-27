
import { getRecipes } from "./api.js";

import {
    displayRecipes,
    updateRecipeCount,
    showMessage
} from "./display.js";

async function testDisplay() {
    try {
        const response = await getRecipes();

        const container = document.querySelector("#recipes-container");
        const counter = document.querySelector("#recipes-count");
        const message = document.querySelector("#message");

        displayRecipes(response.recipes, container);

        updateRecipeCount(response.recipes.length, counter);

        showMessage("Recettes chargées avec succès !", message);

    } catch (error) {
        console.error(error);
    }
}

testDisplay();
