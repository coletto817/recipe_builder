// create Recipe
<<<<<<< HEAD
const createRecipe = (id, name, ingredients) => {
||||||| 96551c8
const createRecipe = (id, name, description, addIngredient) => {
=======
const createRecipe = (id, name, ingredientList) => {
  const list = ["flour", "egg", "sugar"];
  const listItems = `
  <li class="list-group-item">flour</li>
  <li class="list-group-item">egg</li>
  <li class="list-group-item">sugar</li>
  `;
>>>>>>> cf926cb73eb8f2edc6313310b28ba157f150ea5c
  const html = `
<<<<<<< HEAD
   <ul class="card-wrapping d-flex list-group col" data-id-number="${id}">
||||||| 96551c8
   <ul class="card-wrapping d-flex list-group col collapse"  id="collapseform" data-id-number="${id}">
=======
   <ul class="card-wrapping d-flex list-group col" id="cards" data-id-number="${id}">
>>>>>>> cf926cb73eb8f2edc6313310b28ba157f150ea5c
        <li class="card mb-2" style="width: 100%">
            <div class="card-body">
               <h5 class="card-title">${name}</h5>
            </div>
            <ul class="list-group list-group-flush">
<<<<<<< HEAD
              ${ingredients}
||||||| 96551c8
                  <li class="list-group-item">${description}</li>
                  <li class="list-group-item">${addIngredient}</li>
=======
              ${ingredientList}
>>>>>>> cf926cb73eb8f2edc6313310b28ba157f150ea5c
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

<<<<<<< HEAD
  addRecipes(name, ingredients) {
    // const ingredientList = ingredients.split(",");
    // console.log(`ingredientList: ${ingredientList}`);
||||||| 96551c8
  addRecipes(name, description, addIngredient) {
=======
  addRecipes(name, ingredients) {
    // console.log(`name: ${name}`);
    // console.log(`ingredients: ${ingredients}`);
    const ingredientList = ingredients.split(",");
    // console.log(`ingredientList: ${ingredientList}`);
>>>>>>> cf926cb73eb8f2edc6313310b28ba157f150ea5c
    const recipe = {
      id: this.currentId++,
      name: name,
<<<<<<< HEAD
      ingredients: ingredients,
||||||| 96551c8
      description: description,
      addIngredient: addIngredient,
=======
      ingredientList: ingredientList,
>>>>>>> cf926cb73eb8f2edc6313310b28ba157f150ea5c
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
<<<<<<< HEAD
        renderRecipe.ingredients
||||||| 96551c8
        renderRecipe.description,
        renderRecipe.addIngredient
=======
        renderRecipe.ingredientList
>>>>>>> cf926cb73eb8f2edc6313310b28ba157f150ea5c
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
