// create Recipe
const createRecipe = (id, name, ingredients) => {
  const html = `
   <ul class="card-wrapping d-flex list-group col" data-id-number="${id}">
        <li class="card mb-2" style="width: 100%">
            <div class="card-body">
               <h5 class="card-title">${name}</h5>
            </div>
            <ul class="list-group list-group-flush">
              ${ingredients}
            </ul>
            <div class="card-body">
                <button type="button" class="btn $btn-border-width:0 btn-sm edit-button">
                 Edit
                </button>
                <button type="button" class="btn btn-sm delete-button">Delete</button>
            </div>
        </li>
    </ul>`;
  return html;
};

class RecipeCollection {
  constructor(currentId = 0) {
    this.currentId = currentId;
    this.recipes = [];
  }

  addRecipes(name, ingredients) {
    // const ingredientList = ingredients.split(",");
    // console.log(`ingredientList: ${ingredientList}`);
    const recipe = {
      id: this.currentId++,
      name: name,
      ingredients: ingredients,
    };
    this.recipes.push(recipe);
  }

  //the method to render
  render() {
    const recipeList = [];
    for (let i = 0; i < this.recipes.length; i++) {
      const renderRecipe = this.recipes[i];

      const recipeHtml = createRecipe(
        renderRecipe.id,
        renderRecipe.name,
        renderRecipe.ingredients
      );
      recipeList.unshift(recipeHtml);
    }

    const recipeHtml = recipeList.join("\n");
    const displayRecipes = document.querySelector("#displayRecipes");
    displayRecipes.innerHTML = recipeHtml;
  }

  //this method finds the id
  recipeById(recipeId) {
    let foundRecipe;
    for (let i = 0; i < this.recipes.length; i++) {
      let getRecipe = this.recipes[i];
      if (getRecipe.id === recipeId) {
        foundRecipe = getRecipe;
      }
    }
    return foundRecipe;
  }

  //delete method
  delete(recipeId) {
    const newRecipes = [];
    for (let i = 0; i < this.recipes.length; i++) {
      const recipe = this.recipes[i];
      if (recipe.id !== recipeId) {
        newRecipes.push(recipe);
      }
    }
    this.recipes = newRecipes;
  }

  //   For local storage
  save() {
    // create a json stringfy
    const recipeJson = JSON.stringify(this.recipes);
    // store json in local Storage
    localStorage.setItem("recipe", recipeJson);
    // convert id into string
    const currentId = String(this.currentId);
    // store Id in localstorage
    localStorage.setItem("currentId", currentId);
  }

  //This method loads the saved data
  load() {
    if (localStorage.getItem("recipe")) {
      //to get the recipe from local storage
      const recipeJson = localStorage.getItem("recipe");
      this.recipes = JSON.parse(recipeJson);
    }
    if (localStorage.getItem("currentId")) {
      const currentId = localStorage.getItem("currentId");
      this.currentId = Number(currentId);
    }
  }
}
