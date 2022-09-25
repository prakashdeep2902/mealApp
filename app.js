const icon=document.querySelector('.icon');
const search=document.querySelector('.search');
const clear=document.querySelector('.clear');
const searchInputTxt=document.getElementById('submit')
const search_button=document.getElementById('search_button')
const mealList=document.getElementById('meal')
const resultHeading=document.getElementsByClassName('result-heading')
const mealDetailContent=document.querySelector('.meal-details-content');
const recipeCloseButton=document.getElementById('recipe-close-btn');


icon.onclick=function(){
  search.classList.toggle('active')

};

//   intilize event listener
search_button.addEventListener('click',getMealList);   


mealList.addEventListener('click',getMealRecipe);
mealList.addEventListener('click',addInFav);

recipeCloseButton.addEventListener('click',()=>{

  mealDetailContent.parentElement.classList.remove('showRecipe')
})



function getMealList()
{
  let term=searchInputTxt.value
  term.trim()
 
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then((res)=>res.json())
  .then(data=>{
       
         let html="";
         if(data.meals){
        
          data.meals.forEach(meal =>{
            html += `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                   <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <div class="about-name-recipe">
                       <h3>${meal.strMeal}</h3>
                    </div>
                    <div class="Get-Recipe-add-fav">
                        <a href="#" class="recipe-btn">Get-Recipe</a>
                      
                    </div>
               </div>
           </div>
            `;

          });
        }
        else{
          html="sorry, we don't find any meal!";
          mealList.classList.add('notFound');
        }

        mealList.innerHTML=html;
     });
 
}

function addInFav(e)
{
   e.preventDefault();
   if(e.target.classList.contains('fav-recipe')) {

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(res=>res.json())
    .then(data=> myFavrecipemeal(data.meals))

   }
}

function myFavrecipemeal(meal){

  console.log(meal)
  meal=meal[0];
  let html=`
  <div class="image-and-details"  data-id="${meal.idMeal}">
  <div class="image-part">
   <img src="${meal.strMealThumb}" alt="">
   </div>
   <div class="${meal.strMeal}">
    <header>name

     
    </header>
    <p>${meal.strInstructions}</p>

   </div>
 <div class="remove_button">

   <button class="remove">remove</button>
 </div>

  `;
  mealDetailContent.innerHTML=html;
  mealDetailContent.parentElement.classList.add('showRecipe');
}

function getMealRecipe(e){
  e.preventDefault();
 
  if(e.target.classList.contains('recipe-btn')){
    let mealItem=e.target.parentElement.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(res=>res.json())
    .then(data=> mealRecipeModal(data.meals))
 
  }
  
  

}



// create a model

function mealRecipeModal(meal){

  console.log(meal)
  meal=meal[0];
  let html=`
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <center><p class="recipe-category">${meal.strCategory}</p></center> 
   <div class="recipe-instruct">
     <h3>instruction:</h3>
     <p>${meal.strInstructions}</p>
   </div>
   <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="">
   </div>
   <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">watch video</a>
   </div>

  `;
  mealDetailContent.innerHTML=html;
  mealDetailContent.parentElement.classList.add('showRecipe');
}
clear.onclick=function()
{
  searchInputTxt.value='';
  window.location.reload();
 
};

