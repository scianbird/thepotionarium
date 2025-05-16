console.log("Hello world!");

// hide title-screen div on click
/* 
const TitleScreen = document.getElementById("title-screen");

/* function HideScreen() {
  TitleScreen.style.display = "none";
  console.log("you clicked it!");
} */

//I need a function to count & display the increments every time the user clicks the image of the dragon. this should begin with setting it at 0 and maybe use an innerHTML method to continually update the count?

let dragonScales = 0;

function clickDragon() {
  dragonScales = dragonScales + 1;
  const stringifiedScales = JSON.stringify(dragonScales);
  localStorage.setItem("scales", stringifiedScales);
  document.getElementById("total-scales").innerHTML = dragonScales;
}
const dragonImage = document.getElementById("dragon-image");
dragonImage.addEventListener("click", clickDragon);

//this count should be sored in local data, so that the user can refresh and still come back to the same point in their game. step one is to stringify the data and step 2 is to store. steps 3 & 4 are those steps in reverse (do I need these if the amount will be stored?)

//  const scalesData = localStorage.getItem("scales");
/* const parsedScales = JSON.parse(scalesData);
document.getElementById("total-scales").innerHTML = parsedScales;
 */
