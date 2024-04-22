const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeCon = document.querySelector(".recipe-container");
const recipeDetaileContent= document.querySelector(".recipe-detailes-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (query) =>{
    recipeCon.innerHTML= "<h2>Fetching Recipes...</h2>";
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response =await data.json();


    recipeCon.innerHTML="";
    response.meals.forEach(meal => {
    //    console.log(meal); 
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML= `
    <img src="${meal.strMealThumb}">
    <h3><span>${meal.strMeal}</span> </h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Blonges to <span>${meal.strCategory}</span> Category </p>
    `
    const button = document.createElement("button");
    button.textContent= "View Recipe";
    recipeDiv.appendChild(button);

    // Adding Event listner to recipe button
        button.addEventListener("click", () => {
            openRecipePopUp(meal);
        });


    recipeCon.appendChild(recipeDiv);

    });
} 
catch (error) {
    recipeCon.innerHTML= "<h2>Error in Fetching Recipes...</h2>";
}
    // console.log(response.meals[0]);
}

const fetchIngredients = (meal)=> {
    // console.log(meal);
    let IngredentsList = "";
    for(let i=1; i<=20; i++){
        const Ingredent =meal[`strIngredient${i}`];
        if(Ingredent){
            const measure = meal[`strMeasure${i}`];
            IngredentsList += `<li>${measure} ${Ingredent}</li>`
        }else{
            break
        }
    }
    return IngredentsList;
}

const  openRecipePopUp = (meal) => {
    recipeDetaileContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents: </h3>
        <ul class="IngredientList">${fetchIngredients(meal)}</ul>
        <div class="Instructios" >
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        </div>
    `


    recipeDetaileContent.parentElement.style.display= "block";
}
recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetaileContent.parentElement.style.display = "none";
})
searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeCon.innerHTML= ` <h2>Type the meal, You want to search.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

