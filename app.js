//In order to tackle this I am going to take it a step at a time and reference the hand-written list of functions needed (organised in order of when a user would/could come across them). After speaking with Manny and Joe, and reflecting on my feedback from my last assignment, I am aware that scope is something that will probably trip me up at least once!

//I would like a "title screen" to work (a splash or loading screen) - I will aim to handle this by hiding a div after user interaction with the site - although this will be the final piece I add as it's purely aesthetic and will not impact the function in any way.

//we first need to set the original stats for the user - this should be clicks and clicks per second both set to 0 unless they have data saved
let userStats = {
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

//I think it's finally working and not just adding +1 to the end of the count (the ++ was probably better to use anyway)Now I would like to try and make a reset button that resets the stats I just stored back to 0 by adding an event listener to the button in the HTML. I spoke with some others in the class about the best logic to apply to this - resetting it back to 0, or clearing it

/* function resetStats() {
  userStats.dragonScales = 0;
  localStorage.clear;
  console.log("testing eventlistener");
}

document.getElementById("reset-button").addEventListener("click", resetStats); */

//my attempt above didn't work (the console log did work though), so I took Alisons advice of also forcing a reload of the window. At the time of making this, I haven't implimented the title screen, but I hope it continues to work just fine

document.getElementById("reset-button").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//second function - I will fetch the data from the API provided. Reminder to self that API is an async function (think of the burger shop)
async function shopAPI() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const APIdata = await response.json();
  console.log(APIdata); //for testing. yay its working ＼(٥⁀▽⁀ )／
  return APIdata;
}

//shopAPI();//this was a test run so I could see it in console. realising now I probably could have node app'd it (thinking)

//now that I have the data from the API, I can use them to create the upgrade items available in my shop. these will be appended into a section in the DOM but first... I'm going to try and rename the items so that they make more sense with the context of my game by storing the new names in an array. If they are not renamed assume this did not work :)

const newNames = [
  "A tiny dragon-preening bug",
  "A rat wizard",
  "A pinching crab",
  "A cat who uses dragons like a scratch post",
  "A wise raven",
  "An enchanted creature",
  "A friend who owes you a favour",
  "Mobile dragon grooming service",
  "Automated scale-plucking device",
  "Delivery of wholesale scales",
];

//displaying the upgrade items requires 2 different functions: one to create the element and one to display the data as the element. I am having some trouble getting the new names to display though (╬ Ò﹏Ó)

const spellBook = document.getElementById("shop-container");

function createSpellBook(APIdata) {
  APIdata.forEach((item, index) => {
    const spellListItem = document.createElement("div");
    spellListItem.setAttribute("id", "spell-list-item");
    spellListItem.setAttribute("class", "spell-list-item");
    spellListItem.addEventListener("click", () => {
      if (userStats.dragonScales >= APIdata[index].cost)
        userStats.scalesPerSecond += APIdata[index].increase;
      userStats.dragonScales -= APIdata[index].cost;
    });

    spellListItem.innerHTML = `${newNames[index]} 
      : ${APIdata[index].cost} - increase: ${APIdata[index].increase}`;
    spellBook.appendChild(spellListItem);
  });
}

//we need to use that function of making divs within a function that fetches the API data (async)

async function createSpellBookandAddSpells() {
  const fetchedData = await shopAPI();
  createSpellBook(fetchedData);
  document.getElementById("closed-book").style.display = "none";
  document.getElementById("open-book").style.display = "flex";
}

//createSpellBookandAddSpells();

const closedBook = document.getElementById("closed-book");
closedBook.addEventListener("click", createSpellBookandAddSpells);

/* function bookSwap() {
  document.getElementById("closed-book").style.display = "flex";
  document.getElementById("open-book").style.display = "none";
}

const openBook = document.getElementById("open-book");
openBook.addEventListener("click", bookSwap);
(I realised this was basically re-making the array every time as the opening book is linked to the array. I guess once the book is open you can't close it until I learn more) */
