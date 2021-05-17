 var boardValues = new Array(42);


//Displays the board
function board()
{
    console.clear();
    var j = 0;
    var i = 0
    for (i in boardValues)
    {
        process.stdout.write(boardValues[i]);
        process.stdout.write("  ");
        j++;
        if (j % 7 === 0)
        {
            console.log("\n");
        }    
    }
    console.log("-------------------")
    var bottomLine = "";
    for (i = 0; i < 7; i++)
    {
        bottomLine += i;
        bottomLine += "  ";
    }
    console.log(bottomLine);
}

//returns the array of board values
function boardState()
{
    return boardValues;
}

//sets all positions in the board array to O
function resetBoard()
{
    boardValues.fill('O');
}

//checks if the board is full
function fullBoard()
{
    for (i in boardValues) if (boardValues[i] == 'O') return false;
    return true;
}

//sets the board to the given array, as long as they are the same length
function setBoard(arr)
{
    if (arr.length == boardValues.length)
    {
        for (i in arr) boardValues[i] = arr[i];
    } 
}

//Inserts a token given the user's input
function updateBoard(space, currentTurn)
{
    var i = parseInt(space);
    if (i > 6 || i < 0) return -1;
    for (i; i < boardValues.length; i += 7)
    {
        if ((boardValues[i] === 'R' || boardValues[i] == 'B') && i < 7)
        {
            board();
            console.log("Selected Row is Full");
            return -1;
        }
        if ((boardValues[i] === 'R' || boardValues[i] == 'B') && i > 6)
        {
            boardValues[i-7] = currentTurn;
            board();
            return i-7;
        }
        if ((boardValues[i] === 'O') && i > 34)
        {
            boardValues[i] = currentTurn;
            board();
            return i;
        }
    }
}

module.exports = {board, updateBoard, boardState, resetBoard, setBoard, fullBoard};

if (require.main === module)
{
    board();
}