//In order to tackle this I am going to take it a step at a time and reference the hand-written list of functions needed (organised in order of when a user would/could come across them). After speaking with Manny and Joe, and reflecting on my feedback from my last assignment, I am aware that scope is something that will probably trip me up at least once when working on this and I am aiming to visually distingush global/non-global values viusally here for ease during future bug-checking

//I would like a "title screen" to work (a splash or loading screen) - I will aim to handle this by hiding a div after user interaction with the site - although this will be the final piece I add as it's purely aesthetic and will not impact the function in any way.

//GLOBAL
//we first need to set the original stats for the user - this should be clicks and clicks per second both set to 0
const userStats = {
  dragonScales: 0,
  scalesPerSecond: 0,
};

//first function - adding click to the image in order for the count to go up by 1 time per click. this should be done with an eventlistener on the image element itself

const dragonImage = document.getElementById("dragon-image");
dragonImage.addEventListener("click", clickDragon);

function clickDragon() {
  userStats.dragonScales++;
  console.log(userStats); //for testing if the function is working before adding the number to the DOM
  const stringifiedScales = JSON.stringify(userStats.dragonScales);
  localStorage.setItem("scales", stringifiedScales);
  document.getElementById("total-scales").innerHTML = userStats.dragonScales;
}
dragonImage.addEventListener("click", clickDragon);

//second function - I will fetch the data from the API provided. Reminder to self that API is an async function (think of the burger shop)

async function shopAPI() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const APIdata = await response.json();
  const wrangledData = APIdata;
  console.log(wrangledData); //for testing. yay its working ＼(٥⁀▽⁀ )／
  return wrangledData;
}

shopAPI();
