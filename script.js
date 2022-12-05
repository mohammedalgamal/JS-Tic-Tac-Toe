const global = (() => {
    const gameBoard = (() => {
        
        const board = ['', '', '', '', '', '', '', '', ''];
        
        const makeBoard = (() => {
            let container = document.querySelector('.board');
            for (let i = 0; i < board.length; i++) {
                let temp_div = document.createElement('div');
                temp_div.className = `place${i}`;
                temp_div.classList += ' cell';
                container.appendChild(temp_div);
            };
        })();

        function displayBoard(board) {
            let cells = document.querySelectorAll('div[class^=place]');
            for(let i = 0; i < board.length; i++) {
                cells[i].innerHTML = board[i];
            }
        };
        displayBoard(board);

        return {board, displayBoard};
    })();

    const game = (() => {
        const fillBoard = (() => {
            let cells = document.querySelectorAll('div[class^=place]');
            let announce = document.querySelector('.announcer');
            for(let i = 0; i < gameBoard.board.length; i++) {
                cells[i].addEventListener('click', () => {
                    if (gameBoard.board[i] == '') {
                        if(x_player.myTurn) {
                            gameBoard.board[i] = x_player.playerSymbol;
                            gameBoard.displayBoard(gameBoard.board);
                            x_player.myTurn = false;
                            o_player.myTurn = true;
                            announce.innerHTML = "Player O's turn";
                            isWon(gameBoard.board);
                        }
                        else {
                            gameBoard.board[i] = o_player.playerSymbol;
                            gameBoard.displayBoard(gameBoard.board);
                            x_player.myTurn = true;
                            o_player.myTurn = false;
                            announce.innerHTML = "Player X's turn";
                            isWon(gameBoard.board);
                        };
                    };
                });
            };
        })();

        function isAllEqual(board) {
            return new Set(board).size == 1;
        }

        function isWon(board) {
            new_board = [...board];
            first_row = new_board.slice(0, 3);
            second_row = new_board.slice(3, 6);
            third_row = new_board.slice(6, 9);
            
        };
    })();

    const player = (playerSymbol, myTurn) => {
        return {playerSymbol, myTurn};
    };

    const x_player = player('X', true);
    const o_player = player('O', false);
    
    return {gameBoard, game, x_player, o_player};
})();