let body = document.querySelector("body");
let categoriesContainer = document.querySelector(".categories-container");
let divOfRandomMeals = document.querySelector(".random-meals");

let randomMeals=[];
let favourite=JSON.parse(localStorage.getItem("favourite")) || [];

for(let i=0 ; i<30 ; i++){
    generateRandomMeals();
}
async function generateRandomMeals() {

    if(document.querySelector(".title-random-meal") !== null){

        document.querySelector(".title-random-meal").innerHTML="Random Recipe of foods";
    }

    let response =await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    let a = await response.json();
    let meal = a.meals[0];

    if(divOfRandomMeals !== null){
        divOfRandomMeals.innerHTML= divOfRandomMeals.innerHTML + `<div class="meal" id=${meal.idMeal}>
            <a href="recipe-page.html"><img src="${meal.strMealThumb}" alt=""></a>
            <div class="name-favourite">
                <p class="food-name">${meal.strMeal}</p>
                <i  class="fa-regular fa-heart added-to-favourites"></i>
            </div>
        </div>`;
    }
    addToFavourite();
    generateRecipeKey("meal");

}



async function generateCategoriesList(){
    let response =await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let a = await response.json();
    let categoriesList = a.categories;
    
    categoriesList.map((list) => {

      
              categoriesContainer.innerHTML= categoriesContainer.innerHTML +  `
        <div class="categories-item" id=${list["strCategory"]}>

                    <img src="${list["strCategoryThumb"]}" alt="">
                    <span>${list["strCategory"]}</span>
                </div>
        `;
        

       

filterFoods();
    });

    

}
generateCategoriesList();

function addToFavourite(){
    let favouriteIcons = document.querySelectorAll(".name-favourite i");

    favouriteIcons.forEach((icon)=>{
        icon.addEventListener("click",(element)=>{
            

        if(element.target.classList.contains("fa-regular")){
            element.target.classList.remove("fa-regular");
            element.target.classList.add("fa-solid");
        } 
        else{
            element.target.classList.remove("fa-solid");
            element.target.classList.add("fa-regular");
        }
        

        let id = parseInt(element.target.parentElement.parentElement.getAttribute("id"));

        let search = favourite.find((x)=> x === id )

        if(search === undefined || search === null){
            favourite.unshift(id);
        }else {
            favourite = favourite.filter((x)=> x !== search );
        }

        localStorage.setItem("favourite",JSON.stringify(favourite));
        
    })
    });
}
/*


SCRIPT FOR FAVOURITE PAGE


*/

let divOffavouriteFood = document.querySelector(".favourite-foods");

if(divOffavouriteFood !== null){

    if(favourite.length === 0){

    
        divOffavouriteFood.innerHTML = `
        <div class="empty-favourite">
            <h3> No  Foods in Favourite </h3>
            <a href="index.html"><button>Back to home </button>
        </div>
    `;
    
    
    
}
else{
    favourite.forEach( async (list)=>{
        let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${list}`);
        let x = await response.json();
        let data = x.meals[0];

        divOffavouriteFood.innerHTML = divOffavouriteFood.innerHTML + `
            <div class="meal" id=${data.idMeal}>
            <a href="recipe-page.html"><img src="${data.strMealThumb}" alt=""></a>
            <div class="name-favourite">
                <p class="food-name">${data.strMeal}</p>
                <i  class="fa-solid fa-heart added-to-favourites"></i>
            </div>
        </div>
        `;
        addToFavourite();
        generateRecipeKey("meal");
    })
}
}




/*


SCRIPT FOR FILTERD FOOD PAGE


*/

function filterFoods(){
    let divOfCategoriesItems = document.querySelectorAll(".categories-item img");
    let divOfFilteredMeals = document.querySelector(".filtered-meals");

    divOfCategoriesItems.forEach((img)=>{
       img.addEventListener("click",async (e)=>{
            if(divOfRandomMeals !== null){
                divOfRandomMeals.innerHTML="";
            }

            if(divOffavouriteFood !== null){
                divOffavouriteFood.innerHTML="";
            }
            
            divOfFilteredMeals.innerHTML="";

            let id = e.currentTarget.parentElement.getAttribute("id");
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
            let x = await response.json();
            let filters = x.meals;

            document.querySelector(".title-filtered-meal").innerHTML=`Filtered Category : ${id}`;

            filters.forEach((item)=>{
                
                
                

              divOfFilteredMeals.innerHTML = divOfFilteredMeals.innerHTML + `
                <div class="meal" id=${item["idMeal"]}>
            <a href="recipe-page.html"><img src="${item["strMealThumb"]}" alt=""></a>
            <div class="name-favourite">
                <p class="food-name">${item["strMeal"]}</p>
                <i  class="fa-regular fa-heart added-to-favourites"></i>
            </div>
        </div>
            `;
                
                addToFavourite();
                generateRecipeKey("meal");
            })
             
       })
      
    })
    

}

/*


SCRIPT FOR SEARCH PAGE


*/
let searchInput =document.querySelector(".search input");
let searchBtn = document.getElementById("search-btn");


searchBtn.addEventListener("click",()=>{
    if(searchInput.value !== ""){
        let attr = document.createAttribute("href");
        attr.value ="search-page.html"; 
        searchBtn.setAttributeNode(attr);
        localStorage.setItem("searchKey",searchInput.value);


    }
    else{
        if(searchBtn.getAttribute("href") !== null){
            searchBtn.removeAttributeNode("href");
        }
        
    }
});

/*


SCRIPT FOR RECIPE PAGE


 */

function generateRecipeKey(className){
    let imgs = document.querySelectorAll(`.${className} img`);

    imgs.forEach((img)=>{
        img.addEventListener("click",(e)=>{
            let id = e.target.parentElement.parentElement.getAttribute("id");

            localStorage.setItem("recipeKey",id);
            
        })
    });
   

}