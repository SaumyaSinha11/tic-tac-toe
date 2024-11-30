document.addEventListener('DOMContentLoaded', ()=>{
// GAME COMPONENTS---------------------------------------------------------------------------------------------
const gameBoard = (()=>{
        
function player(name, symbol){
    this.name = name;
    this.symbol = symbol;
}
    const allCell = document.getElementsByClassName('cell');//creating a gameboard
    const row = 3;
    const column = 3;
    const cellContainer = [];
    let k=0;
    for(let i=0; i<row ; i++){
        cellContainer[i] = []
        for(let j=0; j<column; j++){
            cellContainer[i].push(allCell[k]);
            k++;
        }
    }  
    
    const mark = (i,j,symbol) => {
        cellContainer[i][j].innerText = symbol; 
    }

    return {mark, allCell, cellContainer, player};
})()

// GAME LOGIC--------------------------------------------------------------------------------------------------
const gamePlay = (() =>{
    const startBtn = document.getElementsByTagName('button')[0];
    const endBtn = document.getElementById('end');
    const display = document.getElementById('display');
    let gameEnd = false; 
    let availCellCount = gameBoard.allCell.length //since count should go from 0 to 8

    const winCondition = () => {
        for(let i=0; i<3; i++){
            if(gameBoard.cellContainer[0][i].innerText !== '' && 
               gameBoard.cellContainer[0][i].innerText === gameBoard.cellContainer[1][i].innerText &&
               gameBoard.cellContainer[1][i].innerText === gameBoard.cellContainer[2][i].innerText){

                gameBoard.cellContainer[0][i].style.color = "red";
                gameBoard.cellContainer[1][i].style.color = "red";
                gameBoard.cellContainer[2][i].style.color = "red";
                return true}

            if(gameBoard.cellContainer[i][0].innerText !== '' &&
               gameBoard.cellContainer[i][0].innerText === gameBoard.cellContainer[i][1].innerText && 
               gameBoard.cellContainer[i][1].innerText === gameBoard.cellContainer[i][2].innerText){
             
                gameBoard.cellContainer[i][0].style.color = "red";
                gameBoard.cellContainer[i][1].style.color = "red";
                gameBoard.cellContainer[i][2].style.color = "red";
                return true}

            if(gameBoard.cellContainer[0][0].innerText !== '' && 
               gameBoard.cellContainer[0][0].innerText === gameBoard.cellContainer[1][1].innerText && 
               gameBoard.cellContainer[1][1].innerText === gameBoard.cellContainer[2][2].innerText){
                
                gameBoard.cellContainer[0][0].style.color = "red";
                gameBoard.cellContainer[1][1].style.color = "red";
                gameBoard.cellContainer[2][2].style.color = "red";
                return true}

            if(gameBoard.cellContainer[0][2].innerText !== '' && 
               gameBoard.cellContainer[0][2].innerText === gameBoard.cellContainer[1][1].innerText && 
               gameBoard.cellContainer[1][1].innerText === gameBoard.cellContainer[2][0].innerText){
                
                gameBoard.cellContainer[0][2].style.color = "red";
                gameBoard.cellContainer[2][0].style.color = "red";
                gameBoard.cellContainer[1][1].style.color = "red";
                return true}
        }
    }
    const drawCondition = () => {
        if(availCellCount === 0){return true}
        else{return false}
    }
    function reset(){   //reset function
        gameEnd = false;
        for(let i=0; i<3 ; i++){   
            for(let j=0; j<3; j++){
                gameBoard.cellContainer[i][j].innerText = '';
                gameBoard.cellContainer[i][j].style.color = 'var(--secondary-color)';
            }
        }  
    } 
 
// START-RESET GAME

startBtn.addEventListener('click', function play(){
    const name = document.getElementsByTagName('input');
    const player0 = new gameBoard.player(name[0].value, '0') //declaring player here so that they update after any new name is entered
    const player1 = new gameBoard.player(name[1].value, 'X') 
    let currentPlayer = player0;

if(player0.name !=='' && player1.name !==''){   //to make entering names cumpulsory
    name[0].disabled = true;    //cannot change name in between
    name[1].disabled = true;
    currentPlayer = player0;
    display.innerHTML = currentPlayer.symbol + ` Starts!`;
    startBtn.innerHTML = "RESET"

    reset();//resset when resest button is clicked
    availCellCount = gameBoard.allCell.length ; //playing game
         row:   for(let i = 0; i<3; i++){  
             column:   for(let j=0; j<3; j++){
                    gameBoard.cellContainer[i][j].addEventListener('click', function(){
                        if(this.innerText === '' && !gameEnd){
                        gameBoard.mark(i, j, currentPlayer.symbol);
                        {currentPlayer = currentPlayer===player0? player1 : player0};   //switching player
                        display.innerHTML = currentPlayer.name + `'s turn`
                        console.log(currentPlayer.name)
                        availCellCount--
                        }

                        if(winCondition() || 0){
                            gameEnd = true;
                            display.innerText = `Congratulations! `
                        }

                        if(drawCondition() && !winCondition()){
                            gameEnd = true;
                            display.innerText = "Its a Draw"
                        }

                    })
                }
            }
}
else{
    display.innerText = "Please enter the names"
    gameEnd = true;
}
})

// END GAME
    endBtn.addEventListener('click', ()=>{
        const name = document.getElementsByTagName('input');
        name[0].value=''
        name[1].value=''
        location.reload();
    })
})(gameBoard);

})