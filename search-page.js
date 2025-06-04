let divOfSearchedRecipe = document.querySelector(".searched-recipe");

let searchKey = localStorage.getItem("searchKey");
searchInput.value= searchKey;


async function displaySearchedRecipe(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
    let x = await response.json();
    let meals = x.meals;
    

    if(meals !== null){
        meals.forEach((item)=>{
            divOfSearchedRecipe.innerHTML = divOfSearchedRecipe.innerHTML + `
        <div class="searched-item " id=${item["idMeal"]}>
                <a href="recipe-page.html"><img src=${item["strMealThumb"]} alt=""></a>
                <div class="name-favourite">
                <p class="food-name">${item["strMeal"]}</p>
                <i  class="fa-regular fa-heart added-to-favourites"></i>
                </div>

       </div>
            `;
        })
    }
    else{
        divOfSearchedRecipe.innerHTML=`<div class="no-results-found-msg">
            <----No results found---->
        </div>`;
    }
    addToFavourite();
    generateRecipeKey("searched-item");
}

displaySearchedRecipe();

