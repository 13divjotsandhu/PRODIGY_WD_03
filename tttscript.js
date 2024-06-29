const gamecells= document.querySelectorAll('.cell')
const player1=document.querySelector('.player1')
const player2=document.querySelector('.player2')
const restartButton = document.querySelector('.restart');
const message = document.querySelector('.message');


let currentplayer='X';
let nextplayer='O';
let playerturn=currentplayer;
let player1Wins = 0;
let player2Wins = 0;

//function to start game
const startgame = () => {
gamecells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click',handleclick);
});
message.textContent = 'Player 1 (X) starts the game.';

}

const handleclick = (e)=>{
    if(e.target.textContent=== ''){
        e.target.textContent=playerturn;
        if( wincheck()){
            message.textContent = `${playerturn} is a Winner !!!`;
            console.log(`${playerturn} is a Winner !!!`);
            updateWins(playerturn);
            disableCells();
        }
        else if ( checkTie()){
            message.textContent = `It's a Tie`;
            console.log(` Its is Tie`);
            disableCells();
        }else{
            PlayerTurnchange();
            message.textContent = `Next turn: Player ${playerturn === 'X' ? '1 (X)' : '2 (O)'}`;

        }
    }
}


//funtion to change player turn
const PlayerTurnchange = () =>{

    console.log(`Current player: ${playerturn}`);
    if (playerturn===currentplayer){
        playerturn=nextplayer;
    }
    else{
        playerturn=currentplayer;
    }

}

//win check funtion
const wincheck = () => {
    const winningConditons= [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]

    ];

    let isWinner = false;
    for (let i = 0; i < winningConditons.length; i++){
        const[pos1,pos2,pos3]=winningConditons[i];
        if (gamecells[pos1].textContent !== '' &&
            gamecells[pos1].textContent === gamecells[pos2].textContent &&
            gamecells[pos2].textContent === gamecells[pos3].textContent) {
            gamecells[pos1].classList.add('winner');
            gamecells[pos2].classList.add('winner');
            gamecells[pos3].classList.add('winner');
    
            isWinner = true;
            return true;
        
       }
    }
    return false;
}

//to check tie
const checkTie=()=>{
    let emptycellcount=0;
    gamecells.forEach(cell=>{
        if(cell.textContent===''){
            emptycellcount++;
        }
    });
    return emptycellcount===0 && !wincheck();


}

//funtion to disable cell after win or tie
const disableCells=()=>{
    gamecells.forEach(cell=>{
        cell.removeEventListener('click', handleclick);
        cell.classList.add('disabled',);

    });

}
const restartGame = () => {
    playerturn = 'X';
    message.textContent = '';
    gamecells.forEach(cell=>{
        cell.textContent='';
        cell.classList.remove('disabled','winner');
   });
    startgame();
    
}
// Function to update player wins

const updateWins = (player) => {
    if (player === 'X') {
        player1Wins++;
        player1.textContent = `PLAYER 1 (X): ${player1Wins}`;
    } else if (player === 'O') {
        player2Wins++;
        player2.textContent = `PLAYER 2 (O): ${player2Wins}`;
    }
}

// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);

// Initialize the game
startgame();

