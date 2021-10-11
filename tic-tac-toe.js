const player_X = "X";
const player_O = "O";
var xPlay = true;
var array_X = [];
var array_O = [];
var currentPlays = [];

const Wins = 
[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]

document.addEventListener("DOMContentLoaded",function()
{
    restartGame();
    var button = document.getElementsByClassName("btn");
    console.log(button);
    button[0].addEventListener("click",restartGame);
})

function restartGame()
{ 
    array_X = [];
    array_O = [];
    currentPlays = [];

    state = document.getElementById("status"); //Get element with ID status
    state.innerHTML = "Move your mouse over a square and click to play an X or an O.";

    var squares = document.getElementById("board").children; //Get all children of the board, which are the divs
    for (i = 0; i < squares.length; i++)
    {
        squares[i].className = "square"; //Style squares
        squares[i].innerHTML = "";
        squares[i].addEventListener('click',clickFunc,{once : true}); //Add an onclick event listener to each squares
        squares[i].id = i; //Add number ID to each square to check wins
        squares[i].addEventListener("mouseover",squareDesign);
        squares[i].addEventListener("mouseout",noHighlight);
    }
}

function squareDesign(e)
{
    //Changes css by adding hover class to square
    e.target.classList.add("hover");
}

function noHighlight(e)
{
    //Changes css by removing hover class to square
    e.target.classList.remove("hover");
}

function clickFunc(e)
{
    var currentPlayer = xPlay ? player_X : player_O; //Once it's X's turn the current player = X
    
    console.log(e);
    const square = e.target;
    square.innerHTML = square.innerHTML + currentPlayer; //Put X or O in square
    square.className = square.className + " " + currentPlayer; //Add X or O to  class
    
    //Take note of the squares that have already been played
    if (xPlay)
    {
        array_X.push(parseInt(square.id)) ; //X's Moves
        currentPlays = array_X;
    }
    else
    {
        array_O.push(parseInt(square.id)) ; //O's Moves
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

function Winner(plays)
{    
    console.log(plays);
    return Wins.some(winCombo => { //Check if there is a winning combination which has 
        return winCombo.every(pos =>{  //all positions in the combination filled in the players' moves
            return plays.includes(pos); //this checks each play against position being tried
                
        })
               
    })   
}