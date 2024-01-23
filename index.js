const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//lets create the funtion to initialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI par v empty karna padega

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one thing is missing initialse properties again
        box.classList=`box box${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGame() {
    let answer = "";
    winningPosition.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in values
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
          
                //check if winner is X
                if(gameGrid[position[0]]==="X"){
                    answer="X";
                }else{
                    answer="0";
                }
                // disable pointer events
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })
                //now we know X/0 is winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //lets check weather there is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        fillCount++;
    });

    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check koi jeet to nai gaya
        checkGame();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

