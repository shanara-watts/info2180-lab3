const player_X = 'X';
const player_O = 'O';
var array_X = [];
var array_O = [];
var xPlay = true;
var currentPlays = [];

const Wins = 
[
    [0,3,6],
    [0,1,2],
    [0,4,8],
    [2,5,8],
    [0,3,6],
    [1,4,7],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]

function restartGame()
{
    array_X = [];
    array_O = [];
    currentPlays = [];

    state = document.getElementById("status"); //Get element with ID status
    state.innerHTML = "Hover your mouse over a square and click to play X or O.";

    var squares = document.getElementById("board").children; //Get all children of the board, which are the divs
    for (i = 0; i < squares.length; i++)
    {
        squares[i].className = "squares"; //Style squares
        squares[i].innerHTML = "";
        squares[i].addEventListener('click', clickFunc, {once : true}); // Adds an onclick event listener to each square
        squares[i].id = i; // Add number ID to each of the squares to check the wins
        squares[i].addEventListener("mouseover", squareStyle);
        squares[i].addEventListener("mouseout", removeHighlight);
    }
}

function squareStyle(e)
{
    //Adds hover class to the square, this changes the css
    e.target.classList.add("hover");
}

function removeHighlight(e)
{
    //Removes hover class from the square, this chages the css
    e.target.classList.remove("hover");
}

document.addEventListener("DOMContentLoaded", function()
{
    restartGame();
    var button = document.getElementsByClassName("btn");
    console.log(button);
    button[0].addEventListener("click",restartGame);
})

function clickFunc(e)
{
    var currentPlayer = xPlay ? player_X : player_O; //Once it's X's turn the current player = X
    console.log(e);
    const square = e.target;
    square.innerHTML = square.innerHTML + currentPlayer; //Put an X or O in the square
    square.className = square.className + " " + currentPlayer; //Add the X or O to the class 

    //Take note of the squares that have already been played
    if (xPlay)
    {
        array_X.push(parseInt(square.id)); //X's moves
        currentPlays = array_X;
    }
    else
    {
        array_O.push(parseInt(square.id)); //X's moves
        currentPlays = array_O;
    }

    if (Winner(currentPlays))
    {
        state = document.getElementById("status"); //Get element with ID status
        state.classList.add("you-won");
        state.innerHTML = "Congratulations! " + currentPlayer + " is the Winner!";
    }

    xPlay = xPlay ? false : true; //Changes to other player
}

function Winner(play)
{
    console.log(play);
    return Win.some(winCombo => {//Checks if there is at least one winng combination that:
        return winCombo.every(pos =>{
            return play.includes(pos);
        })
    })
}
