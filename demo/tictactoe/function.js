var primary = "X",
    secondary = "O",
    thisOnBoard,
    cell = document.getElementsByClassName('cell'),
    cellLength = cell.length,
    noOfx = noOfo = 0;
var ctx = 9;

winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

for(i=0;i<cellLength;i++){
    cell[i].addEventListener('click',function() {
        setVal = swapxo();
        this.setAttribute("type",setVal);

        if(this.innerHTML == ""){
            this.innerHTML = setVal;
        }

        if(this.innerHTML === "X"){
            noOfx++
        }else{
            noOfo++
        }
        if(noOfx > 2 || noOfo > 2){
            evaluate();
        }
        ctx--;
        console.log(document.querySelectorAll('type').value);
    });
    cell[i].setAttribute("id",i+1);
}

function swapxo(){
    thisOnBoard = primary;
    primary = secondary;
    secondary = thisOnBoard;
    return thisOnBoard;
}


function evaluate(){
    if(ctx > 0){
        if(
        document.getElementById('1').getAttribute('type') == "X" &&
        document.getElementById('2').getAttribute('type') == "X" &&
        document.getElementById('3').getAttribute('type') == "X" ||
        document.getElementById('4').getAttribute('type') == "X" &&
        document.getElementById('5').getAttribute('type') == "X" &&
        document.getElementById('6').getAttribute('type') == "X" ||
        document.getElementById('7').getAttribute('type') == "X" &&
        document.getElementById('8').getAttribute('type') == "X" &&
        document.getElementById('9').getAttribute('type') == "X" ||
        document.getElementById('1').getAttribute('type') == "X" &&
        document.getElementById('4').getAttribute('type') == "X" &&
        document.getElementById('7').getAttribute('type') == "X" ||
        document.getElementById('2').getAttribute('type') == "X" &&
        document.getElementById('5').getAttribute('type') == "X" &&
        document.getElementById('8').getAttribute('type') == "X" ||
        document.getElementById('3').getAttribute('type') == "X" &&
        document.getElementById('6').getAttribute('type') == "X" &&
        document.getElementById('9').getAttribute('type') == "X" ||
        document.getElementById('1').getAttribute('type') == "X" &&
        document.getElementById('5').getAttribute('type') == "X" &&
        document.getElementById('9').getAttribute('type') == "X" ||
        document.getElementById('7').getAttribute('type') == "X" &&
        document.getElementById('5').getAttribute('type') == "X" &&
        document.getElementById('3').getAttribute('type') == "X"
        ){
            alert("X won\nDo you want to play another game?");
            resetBoard();
        }else if(
        document.getElementById('1').getAttribute('type') == "O" &&
        document.getElementById('2').getAttribute('type') == "O" &&
        document.getElementById('3').getAttribute('type') == "O" ||
        document.getElementById('4').getAttribute('type') == "O" &&
        document.getElementById('5').getAttribute('type') == "O" &&
        document.getElementById('6').getAttribute('type') == "O" ||
        document.getElementById('7').getAttribute('type') == "O" &&
        document.getElementById('8').getAttribute('type') == "O" &&
        document.getElementById('9').getAttribute('type') == "O" ||
        document.getElementById('1').getAttribute('type') == "O" &&
        document.getElementById('4').getAttribute('type') == "O" &&
        document.getElementById('7').getAttribute('type') == "O" ||
        document.getElementById('2').getAttribute('type') == "O" &&
        document.getElementById('5').getAttribute('type') == "O" &&
        document.getElementById('8').getAttribute('type') == "O" ||
        document.getElementById('3').getAttribute('type') == "O" &&
        document.getElementById('6').getAttribute('type') == "O" &&
        document.getElementById('9').getAttribute('type') == "O" ||
        document.getElementById('1').getAttribute('type') == "O" &&
        document.getElementById('5').getAttribute('type') == "O" &&
        document.getElementById('9').getAttribute('type') == "O" ||
        document.getElementById('7').getAttribute('type') == "O" &&
        document.getElementById('5').getAttribute('type') == "O" &&
        document.getElementById('3').getAttribute('type') == "O"
        ){
            alert("0 won\nDo you want to play another game?");
            resetBoard();
        }
    }else{
        alert("Game ended in draw\nDo you want to play another game?");
        resetBoard();
    }

}

function resetBoard(){
    ctx = 9;
    noOfx = noOfo = 0;
    for(i=0;i<cellLength;i++){
        cell[i].innerHTML = "";
        cell[i].removeAttribute('type')
    }
}
