const createPlayer = (playerName, marker) => {
    return {playerName, marker};
}

const player1 = createPlayer('Player One', 'X');
const player2 = createPlayer('Player Two', 'O');

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


        restart.addEventListener('click', () => {
            board.forEach((item, i) => {
                board[i] = '';
                space.removeAttribute('data');
                spaces.innerText = '';
                
                
            })
        })
    
    })

})();

const game = (() => {
    let currentPlayer = player1;
    let won = false;

    const winning = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7 ,8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function checkWinner(){
        winning.forEach((item, i) => {
            if(gameBoard[item[0]] === this.currentPlayer.sign && gameBoard[item[1]] === this.currentPlayer.sign && gameBoard[item[2]] === this.currentPlayer.sign){
                console.log(this.currentPlayer.name + ' Wins!');
                this.won = true;
            }
        })
        return {
            checkWinner,
            currentPlayer,
            won
        };
    }
})();





