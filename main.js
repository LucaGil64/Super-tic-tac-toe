//Create the title text shadow
const h1 = document.getElementById("h1");
textShadow(h1,4,"var(--dark-gray-3)");

//Create the items of the tic-tac-toe game
const mainGridContainer = document.getElementById("main-grid-container");
createItems();


const itemsGridContainer = document.querySelectorAll(".item-grid-container");
const gridItems = document.querySelectorAll(".grid-item");
const body = document.getElementById("body");
const spanTurn = document.getElementById("span-turn");
const headerTurn = document.getElementById("header-turn")
const hover = document.querySelector(".hover")
const blocked = document.querySelectorAll(".blocked")

let turn = `X`;
let color = `var(--blue)`;
let nextBigSquare = 0;
let squaresUsed = [0,0,0,0,0,0,0,0,0];

//Click the squares to play de game
mainGridContainer.addEventListener("click",event=>{
    let square = event.target;
    if(square.className.includes("grid-item")){markSquare(square,turn)}
});


const bigWinContainer = document.getElementById("big-win-container");
const bigWinAlert = document.getElementById("big-win-alert");
const bigWinner = document.getElementById("big-winner");
const bigWinnerSpan = document.getElementById("big-winner-span");

//Play again button(just reload the page)
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click",()=>{location.reload()});


//Change theme 
let currentTheme = "light_mode";
const changeThemeButton = document.getElementById("change-theme-button");
changeThemeButton.addEventListener("click",event=>{changeTheme();});


//Cookie if you where playing and set the game in dark mode
if(getCookie() == "dark_mode"){changeTheme();}