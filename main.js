const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winCodition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const leaderboard = document.getElementById("leaderboard");

document.getElementById("accept").addEventListener("click", () => {
    leaderboard.innerHTML = `Player1: ${player1.value} <br> Player2: ${player2.value}`;
  });



let options = ["","","","","","","","",""];
let currentplayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statustext.textContent = `${currentplayer}'s turn`;
    running = true;
}

function cellClicked(){ 
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(click,index){
    options[index] = currentplayer;
    click.textContent = currentplayer;
}

function changePlayer(){
    currentplayer = (currentplayer == "X") ? "O" : "X";
    statustext.textContent = `${currentplayer}'s turn`;
}

let scoreX = 0;
let scoreO = 0;

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winCodition.length; i++){
        const condition = winCodition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC ==""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statustext.textContent = `${currentplayer} wins!`;
        if(currentplayer === "X"){
            scoreX++;
        } else {
            scoreO++;
        }
        updateLeaderboard();
        running = false;
    }
    else if(!options.includes("")){
        statustext.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function updateLeaderboard(){
    leaderboard.innerHTML = `Player1: ${player1.value} : ${scoreX} <br> Player2: ${player2.value} : ${scoreO}`;
}


function restartGame(){
    currentplayer = "X";
    options = ["","","","","","","","",""];
    statustext.textContent = `${currentplayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
