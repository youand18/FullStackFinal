//const board = require('./board.js')


//Vertical Win Logic
function verticalCheck(status, currentTurn)
{
    var connected = 0;
    for (var j = 0; j < 7; j++)
    {
        for (var i = j; i < status.length; i += 7)
        {
            if (status[i] == currentTurn)
            {
                connected += 1;
                if (connected >= 4) {
                    console.log("Vertical Check Win");
                    return true;
                }
            } 
            else
            {
                connected = 0;
            }
        }
        connected = 0;
    }
    return false;
}

//Horizontal Win Logic
function horizontalCheck(status, currentTurn)
{
    var connected = 0;
    for (var i = 0; i < status.length; i++)
    {
        if (i % 7 == 0) connected = 0;
        if (status[i] == currentTurn)
        {
            connected += 1;
            if (connected >= 4) {
                console.log("Horizontal Check win");
                return true;
            }
        }
        else connected = 0;
    }
    return false;
}


//Diagonal Win Logic
function diagonalCheck(status, currentTurn)
{
    var connected = 0;
    for (var i = 0; i < status.length / 2; i++)
    {
        if (status[i] == currentTurn) 
        {
            connected = 1;
            if ((i % 7) <= 3)
            {
                var j = i;
                while (connected > 0)
                {
                    if(status[j+8] == currentTurn)
                    {
                        connected++;
                        if (connected >= 4) {
                            console.log("Diagonal Check Win");
                            return true;
                        }
                        j += 8;
                    }
                    else connected = 0;
                }
            }
            connected = 1;
            if ((i % 7) >= 3)
            {
                var x = i;
                while (connected > 0)
                {
                    if(status[x+6] == currentTurn)
                    {
                        connected++;
                        if (connected >= 4) {
                            console.log("Diagonal Check Win");
                            return true;
                        }
                        x += 6;
                    }
                    else connected = 0;
                }
            }
        }
    }
    return false;
}

//All three checks combined into one call
function winCheck(status, currentTurn)
{
    var win1 = verticalCheck(status, currentTurn);
    var win2 = horizontalCheck(status, currentTurn);
    var win3 = diagonalCheck(status, currentTurn);
    //console.log("vertical check: " + win1 + "\nhorizontal check: " + win2 + "\ndiagonal check: " + win3);
    if ((win1 == true) || (win2 == true) || (win3 == true))
    {
        console.log("Win condition met");
        return currentTurn;
    }
    else return null;   
}






module.exports = {winCheck, verticalCheck, horizontalCheck, diagonalCheck};