var primary = "X",
    secondary = "O",
    thisOnBoard,
    grid = 3,
    move = 0;
board = document.getElementById('game')
rows = board.getElementsByTagName("tr");
setup();


function setup(param){
    console.log(param)
    rowLength = rows.length;
    for(i=0;i<rowLength;i++){
        cellCount = board.rows[i].cells
        for(j=0;j<cellCount.length;j++){
            //checks if reset button was pressed
            if(param){
                board.rows[i].cells[j].innerHTML = "";
                move = 0;
            }else{
                cell = board.rows[i].cells[j];
                cell.onclick = function(){
                    var cellIndex  = this.cellIndex;
                    var rowIndex = this.parentNode.rowIndex;
                    playMove(this,cellIndex,rowIndex);
                }
            }
        }
    }
}


function evaluate(turn,rowIndex,cellIndex){
    counterX = counterY = counterDiag =counterAnti= 0;
    move++;
    for(x=0;x<grid;x++){
        //check row
        if(board.rows[rowIndex].cells[x].innerHTML == turn){
            if(counterX < (grid-1)){
                counterX++;
            }else{
                gameSet(turn)
            }
        }
        //check col
        if(board.rows[x].cells[cellIndex].innerHTML == turn){
            if(counterY < (grid-1)){
                counterY++;
            }else{
                gameSet(turn)
            }
        }
        //check diag
        if(board.rows[x].cells[x].innerHTML == turn){
            if(counterDiag < (grid-1)){
                counterDiag++;
            }else{
                gameSet(turn)
            }
        }
        //check anti diag
        rowVal = (grid-1)-x;
        if(board.rows[rowVal].cells[x].innerHTML == turn){
            if(counterAnti < (grid-1)){
                counterAnti++;
            }else{
                gameSet(turn)
            }
        }
    }
    //check draw
    if(move == Math.pow(grid,2)){
        gameSet(false);
    }
}

function gameSet(turn){
    if(turn){
        alert(turn+' wins the game. Play again?')
    }else{
        alert('Game ended in a draw. Play again?')
    }
    setup(true);
}


function playMove(thisCell,cellIndex,rowIndex){
    if(thisCell.innerHTML == ""){
        setVal = swapxo();
        thisCell.setAttribute("type",setVal);
        thisCell.innerHTML = setVal;
    } else{
        console.log('pick another box')
    }
    evaluate(setVal,rowIndex,cellIndex)
}

function swapxo(){
    thisOnBoard = primary;
    primary = secondary;
    secondary = thisOnBoard;
    return thisOnBoard;
}

