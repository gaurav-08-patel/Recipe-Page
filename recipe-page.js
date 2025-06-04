let recipeKey = localStorage.getItem("recipeKey");
let divOfRecipe = document.querySelector(".recipe-of-meals");

async function recipeCard() {
    
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeKey}`);
    let x = await response.json();
    let data = x.meals[0];

    // let a=1;
    let string ="";
    let strIngredient ="";
    let strInstructions="";

    // console.log(data);

  for(let a=1 ; a<=20 ; a++){
    
    if( data[`strMeasure${a}`] !== " ") {
        string = data[`strMeasure${a}`]+" "+ data[`strIngredient${a}`];
        // console.log(string);
        strIngredient = strIngredient + ", " + string;
        
        strInstructions = data["strInstructions"];

        
        divOfRecipe.innerHTML = `
        <div class="recipe">
            <div class="name-img">
                <h3 >${data["strMeal"]}</h3>
                <img src="${data["strMealThumb"]}" >
            </div>
            <div class="details">
                <div class="ingredients-req">
                    <h3>Ingredients Require</h3>
                    <p>${strIngredient.slice(1)}</p>
                </div>

                <div class="instruction">
                    <h3>Instructions</h3>
                    <p>${strInstructions}</p>
                </div>
            </div>

            <div class="yt-link">
                <h3>Watch It On YouTube</h3>
                <a href="${data["strYoutube"]}"><img src="https://www.freepnglogos.com/uploads/512x512-logo/512x512-transparent-logo-youtube-icon-transparent-youtube-images-vector-1.png"></a>
            </div>
            
        </div>
        `;


       console.log(a,data[`strMeasure${a}`]) 
    //    a++; 
    }
    else{
       break;
    }
  
    

  }


    
}

recipeCard();

