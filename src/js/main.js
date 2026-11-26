import api from "./api.js";

async function testAPI() {
  try {
    const response = await api.get("/recipes?limit=12");

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

testAPI();
