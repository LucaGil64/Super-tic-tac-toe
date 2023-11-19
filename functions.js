
const textShadow = (element,number,color)=>{
    let shadow = "";
    for(let i = 0; i < number; i+=0.5){
        shadow+= `${i}px ${i}px ${color}, `;
    }
    shadow = shadow.slice(0,-2);
    element.style.textShadow = shadow;
};
const createItems = ()=>{
    let fragment = document.createDocumentFragment();
    for(let i = 0; i < 9; i++){
        const div = document.createElement("div");
        div.classList.add("item-grid-container");
        div.id = `${i+1}`;
        div.setAttribute("state","")
        fragment.appendChild(div);

        for(let j = 0; j < 9; j++){
            const div2 = document.createElement("div");
            div2.classList.add("grid-item");
            div2.id = `${i+1}-${j+1}`;
            div2.classList.add("hover");
            div.appendChild(div2);
        }
    }
    mainGridContainer.appendChild(fragment);
};


const markSquare = (square,turn)=>{
    if(!square.textContent){
        if(nextBigSquare == 0 ||
           square.parentElement.id == nextBigSquare ||
           squaresUsed[nextBigSquare-1] == 9){

            nextBigSquare = square.id[2];
            squaresUsed[square.parentElement.id-1]++;

            square.textContent = turn;
            square.style.color = color;

            winCheckSmall(square,turn);
            winCheckBig(turn);

            restartClasses();
            addClasses();
            bigSquareFull();
            
            changeTurn();
        }
    }
};


const winCheckSmall = (square,turn)=>{
    const groupOfSquares = square.parentElement.children;
        if(
            groupOfSquares[0].textContent == turn &&
            groupOfSquares[1].textContent == turn &&
            groupOfSquares[2].textContent == turn ||
            groupOfSquares[3].textContent == turn &&
            groupOfSquares[4].textContent == turn &&
            groupOfSquares[5].textContent == turn ||
            groupOfSquares[6].textContent == turn &&
            groupOfSquares[7].textContent == turn &&
            groupOfSquares[8].textContent == turn ||

            groupOfSquares[0].textContent == turn &&
            groupOfSquares[3].textContent == turn &&
            groupOfSquares[6].textContent == turn ||
            groupOfSquares[1].textContent == turn &&
            groupOfSquares[4].textContent == turn &&
            groupOfSquares[7].textContent == turn ||
            groupOfSquares[2].textContent == turn &&
            groupOfSquares[5].textContent == turn &&
            groupOfSquares[8].textContent == turn ||
        
            groupOfSquares[0].textContent == turn &&
            groupOfSquares[4].textContent == turn &&
            groupOfSquares[8].textContent == turn ||
            groupOfSquares[2].textContent == turn &&
            groupOfSquares[4].textContent == turn &&
            groupOfSquares[6].textContent == turn){

            squaresUsed[square.parentElement.id - 1] = 9;
            
            itemsGridContainer[square.parentElement.id - 1].setAttribute("state",turn);

            const div = document.createElement("div");
            div.classList.add("small-win");
            div.textContent = turn;
            div.style.color = color;
            square.parentElement.appendChild(div)
        }
};
const winCheckBig = (turn)=>{
    
    if(
        itemsGridContainer[0].getAttribute("state") == turn &&
        itemsGridContainer[1].getAttribute("state") == turn &&
        itemsGridContainer[2].getAttribute("state") == turn ||
        itemsGridContainer[3].getAttribute("state") == turn &&
        itemsGridContainer[4].getAttribute("state") == turn &&
        itemsGridContainer[5].getAttribute("state") == turn ||
        itemsGridContainer[6].getAttribute("state") == turn &&
        itemsGridContainer[7].getAttribute("state") == turn &&
        itemsGridContainer[8].getAttribute("state") == turn ||

        itemsGridContainer[0].getAttribute("state") == turn &&
        itemsGridContainer[3].getAttribute("state") == turn &&
        itemsGridContainer[6].getAttribute("state") == turn ||
        itemsGridContainer[1].getAttribute("state") == turn &&
        itemsGridContainer[4].getAttribute("state") == turn &&
        itemsGridContainer[7].getAttribute("state") == turn ||
        itemsGridContainer[2].getAttribute("state") == turn &&
        itemsGridContainer[5].getAttribute("state") == turn &&
        itemsGridContainer[8].getAttribute("state") == turn ||

        itemsGridContainer[0].getAttribute("state") == turn &&
        itemsGridContainer[4].getAttribute("state") == turn &&
        itemsGridContainer[8].getAttribute("state") == turn ||
        itemsGridContainer[2].getAttribute("state") == turn &&
        itemsGridContainer[4].getAttribute("state") == turn &&
        itemsGridContainer[6].getAttribute("state") == turn){

        let backgroundRGBA;
        if(turn=="X"){backgroundRGBA="rgba(51, 51, 255, 0.75)"}
        else if(turn=="O"){backgroundRGBA="rgba(255, 51, 51, 0.75)"}
        showWinner(turn,color," YOU WIN",backgroundRGBA);

    }
    else if(squaresUsed.every(element=> element==9)){

        let x = 0;
        let o = 0;
        let winner,color,text,backgroundRGBA;

        let smallWins = document.querySelectorAll(".small-win");
        smallWins.forEach(element=>{
            if(element.textContent == "X"){x++}
            else if(element.textContent == "O"){o++}

            if(x > o){winner="X";color="var(--blue)";text=" YOU WIN";backgroundRGBA="rgba(51, 51, 255, 0.75)"}
            else if(x < o){winner="O";color="var(--red)";text=" YOU WIN";backgroundRGBA="rgba(255, 51, 51, 0.75)"}
            else{winner="";color="var(--black)";text="IT'S A DRAW",backgroundRGBA="rgba(127, 127, 127, 0.75)"}
        })

        showWinner(winner,color,text,backgroundRGBA);
    }
};

const showWinner = (winner,color,youWin,backgroundRGBA)=>{
    bigWinContainer.style.display = "flex";
    bigWinContainer.style.backgroundColor = backgroundRGBA;
    bigWinner.appendChild(document.createTextNode(youWin));;

    bigWinnerSpan.textContent = winner;
    bigWinnerSpan.style.color = color;

    bigWinContainer.style.animationName = "showUp";
};


const restartClasses = ()=>{
    for (let i = 0; i < 9; i++) {
        itemsGridContainer[i].classList.add("blocked");
        for (let j = 0; j < 9; j++){
            itemsGridContainer[i].children[j].classList.remove("hover");
        }
    }
};
const addClasses = ()=>{
    for (let i = 0; i < 9; i++) {
        if(itemsGridContainer[i].id[0] == nextBigSquare &&
           squaresUsed[nextBigSquare-1] !== 9){
            itemsGridContainer[i].classList.remove("blocked");
            for(let j = 0; j < 9; j++){
                if(itemsGridContainer[i].children[j].textContent){continue};
                itemsGridContainer[i].children[j].classList.add("hover");
            }
        }
        else if(squaresUsed[nextBigSquare-1] == 9){ 
            for(let j = 0; j < 9; j++){
                if(squaresUsed[j] == 9){continue};
                itemsGridContainer[j].classList.remove("blocked");
                
                for(let k = 0; k < 9; k++){
                    if(itemsGridContainer[i].children[k].textContent){continue};
                    itemsGridContainer[i].children[k].classList.add("hover");
                }
            }
        }
    }
};
const bigSquareFull = ()=>{
    if(squaresUsed[nextBigSquare - 1] == 9){nextBigSquare = 0}
};


const changeTurn = ()=>{
    if(turn == "X"){
        turn = "O";
        color = `var(--red)`;}
    else{
        turn = "X";
        color = `var(--blue)`;}
    spanTurn.textContent = turn;
    spanTurn.style.color = color;
};


const changeTheme = ()=>{
    if(changeThemeButton.firstElementChild.textContent == "dark_mode"){
        changeThemeButton.firstElementChild.textContent = "light_mode";
        currentTheme="dark_mode";
        setCookie(currentTheme);

        body.style.backgroundColor = "var(--dark-gray-1)";

        h1.style.color = "var(--white)";
        textShadow(h1,4,"var(--light-gray-3)");

        changeThemeButton.style.color = "var(--white)";
        changeThemeButton.style.backgroundColor = "var(--dark-gray-3)";
        changeThemeButton.style.border = "3px solid var(--white)";

        spanTurn.style.textShadow = "1px 1px var(--white)";
        headerTurn.style.color = "var(--white)";

        mainGridContainer.style.backgroundColor = "var(--white)";
        mainGridContainer.style.border = "5px solid var(--white)";

        itemsGridContainer.forEach(element=>{
            element.style.backgroundColor = "var(--white)";
            element.style.border = ".5em solid var(--dark-gray-2)"
        })
        gridItems.forEach(element=>{
            element.style.backgroundColor = "var(--dark-gray-2)"
        })

        bigWinAlert.style.backgroundColor = "var(--dark-gray-1)";
        bigWinAlert.style.border = "4px solid var(--white)";
        bigWinner.style.color = "var(--white)";
        bigWinnerSpan.style.textShadow = "1px 1px var(--white)";
        playAgainButton.style.background = "var(--dark-gray-1)";
        playAgainButton.style.color = "var(--white)";
        playAgainButton.style.border = "3px solid var(--white)";

    }
    else if(changeThemeButton.firstElementChild.textContent == "light_mode"){
        changeThemeButton.firstElementChild.textContent = "dark_mode";
        currentTheme="light_mode";
        setCookie(currentTheme);

        body.style.backgroundColor = "var(--light-gray-1)";

        h1.style.color = "var(--black)";
        textShadow(h1,4,"var(--dark-gray-3)");

        changeThemeButton.style.color = "var(--black)";
        changeThemeButton.style.backgroundColor = "var(--white)";
        changeThemeButton.style.border = "3px solid var(--black)";

        spanTurn.style.textShadow = "1px 1px var(--black)";
        headerTurn.style.color = "var(--black)";

        mainGridContainer.style.backgroundColor = "var(--black)";
        mainGridContainer.style.border = "5px solid var(--black)";

        itemsGridContainer.forEach(element=>{
            element.style.backgroundColor = "var(--black)";
            element.style.border = ".5em solid var(--white)"
        })
        gridItems.forEach(element=>{
            element.style.backgroundColor = "var(--white)"
        })

        bigWinAlert.style.backgroundColor = "var(--white)";
        bigWinAlert.style.border = "4px solid var(--black)";
        bigWinner.style.color = "var(--black)";
        bigWinnerSpan.style.textShadow = "1px 1px var(--black)";
        playAgainButton.style.background = "var(--white)";
        playAgainButton.style.color = "var(--black)";
        playAgainButton.style.border = "3px solid var(--black)";

    }
};


const setCookie = (currentTheme)=>{
    const cookie = currentTheme;
    document.cookie = cookie;
};
const getCookie = ()=>{
    return document.cookie
};