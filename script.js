const createPlayer = (playerName, marker) => {
    return {playerName, marker};
}

const player1 = createPlayer('Player One', 'X');
const player2 = createPlayer('Player Two', 'O');

const turnIndicator = document.querySelector('.subtitle');

const displayWinner = document.getElementById('show-winner');
const overlay = document.getElementById('overlay');
const winnerName = document.getElementById('winnerName')

// displays game winner on a pop up screen

// closes winner screen

const winScreenClose = () => {
    displayWinner.classList.remove('active');
    overlay.classList.remove('active');
}

// closes winner screen on click of overlay

overlay.onclick = winScreenClose;

//creates the 3x3 grid for the game 

const gameBoard = (() => {
    const board = [];
    const restart = document.querySelector('.restart');

    let spaces = document.querySelector('.spaces');

    for(let i =0; i < 9; i++){
        board.push('');
    }

    board.forEach(() => {
        const space = document.createElement('div');
        space.className = 'space';
        spaces.appendChild(space);

// ensures when retart button is hit the grid clears for a new game to begin 

        restart.addEventListener('click', () => {
            board.forEach((item, i) => {
                board[i] = '';
                spaces.innerText = '';
                
                
            })
        })

        //  creates array of square children that gives ability to add selections based on player input through innerText and class changes

        const gridArray = Array.from(spaces.children);

       gridArray.forEach((space, i) => {
            space.addEventListener('click',() => {

                if(game.gameWon === false){

                    board[i] = game.currentPlayer.marker;
                    space.setAttribute('data', game.currentPlayer.marker);
                    game.checkWinner();
                    console.log(board);
                    
                
                    if(space.innerText === ''){
                        space.innerText = game.currentPlayer.marker;
                        
                        if(game.currentPlayer === player1){
                            game.currentPlayer = player2;
                            turnIndicator.innerText = 'Player 2`s Turn';

                        } else {
                            game.currentPlayer = player1;
                            turnIndicator.innerText = 'Player 1`s Turn';
                        }

                    }
                }
            })
        })
    })

    return { board };

    

})();

//  game state IIFE - decides current player and checks the grid inputs to see if the game has been won

const game = (() => {

    let currentPlayer = player1;
    let gameWon = false;
    

    const winningCominations = [
         ,
    ];

    
    function checkWinner(){
        let gameWon = false;

        for(let i = 0; i < winningCominations.length; i++){
            const condition = winningCominations[i];
            const cellA = gameBoard.board[condition[0]];
            const cellB = gameBoard.board[condition[1]];
            const cellC = gameBoard.board[condition[2]]; 


            if( cellA == '' || cellB == '' || cellC == ''){
                continue
            }

            

            if(cellA == cellB && cellB == cellC){
                console.log(cellA)
                console.log(cellB)
                console.log(cellC)
                gameWon = true;
                break;
            }

        }

        if(gameWon){
            turnIndicator.innerText = 'Game Won!';
        }

    }

    return {
       
        checkWinner,
        currentPlayer,
        gameWon
    };

})();





