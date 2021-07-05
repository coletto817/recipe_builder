//Making an instance of the class
const NewRecipe = new RecipeCollection();

//Loading the recipes from local storage
NewRecipe.load();
NewRecipe.render();

//The variables
const nameInput = document.querySelector("#recipe-name");
const ingredients = document.querySelector("#recipe-ingredients");
const addBtn = document.querySelector("#add-recipe");
const displayRecipes = document.querySelector("#displayRecipes");

checkFormInput = (event) => {
  event.preventDefault();

  NewRecipe.addRecipes(nameInput.value, ingredients.value);

  // For clear the field
  const formReset = () => {
    nameInput.value = "";
    ingredients.value = "";
  };

  //Calling render, save and form reset
  NewRecipe.render();
  NewRecipe.save();
  formReset();
};

//Submit Form Event Listener
addBtn.addEventListener("click", checkFormInput);

//toggles the form open and shut
function toggle() {
  const form = document.getElementById("collapseform");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

//the event listener for clicking on 'edit' and 'delete' button on a recipe
displayRecipes.addEventListener("click", (event) => {
  // if (event.target.classList.contains("edit-button")) {
  //   //find the main parent element of the 'edit' button
  //   let parentRecipe = event.target.parentElement.parentElement.parentElement;
  //   let recipeId = Number(parentRecipe.dataset.idNumber);
  //   const recipe = NewRecipe.getRecipeById(recipeId);
  //   NewRecipe.save();
  //   NewRecipe.render();
  // }
  //deleting recipes
  if (event.target.classList.contains("delete-button")) {
    let parentRecipe = event.target.parentElement.parentElement.parentElement;
    let recipeId = Number(parentRecipe.dataset.idNumber);
    NewRecipe.delete(recipeId);
    NewRecipe.save();
    NewRecipe.render();
  }
});
