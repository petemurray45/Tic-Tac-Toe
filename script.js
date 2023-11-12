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

//dynamically creates the 3x3 grid for the game 

const gameBoard = (() => {
    const board = [];
    const restart = document.querySelector('.restart');

    let spaces = document.querySelector('.spaces');

    for(let i =0; i < 9; i++){
        board.push('');
    }

    board.forEach((item , i) => {
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
                    
                    if(space.innerText === ''){
                        space.innerText = game.currentPlayer.marker;
                        
                        if(game.currentPlayer === player1){
                            game.currentPlayer = player2;
                            turnIndicator.innerText = 'Player 2`s turn';
                        } else {
                            game.currentPlayer = player1;
                            turnIndicator.innerText = 'Player 1`s turn';
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

    

    const winningCombinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7 ,8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        
    ];

    function checkWinner(){
        winningCombinations.forEach((item, i) => {
            if(gameBoard.board[item[0]] === this.currentPlayer.marker && gameBoard.board[item[1]] === this.currentPlayer.marker && gameBoard.board[item[2]] === this.currentPlayer.marker){
                console.log(this.currentPlayer.name + ' Wins!');
                gameWon = true;
            }
        })
    }

    

    return {
       
        checkWinner,
        currentPlayer,
        gameWon
    };




})();





