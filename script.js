const global = (() => {
    
    const player = (playerSymbol, myTurn) => {
        return {playerSymbol, myTurn};
    };
    
    const x_player = player('X', true);
    const o_player = player('O', false);

    const gameBoard = (() => {
        
        var board = ['', '', '', '', '', '', '', '', ''];
        
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
            };
        };
        displayBoard(board);

        function emptyBoard() {
            for (let i = 0; i < board.length; i++){
                board[i] = '';
            };
        };

        return {board, displayBoard, emptyBoard};
    })();

    const game = (() => {
        let cells = document.querySelectorAll('div[class^=place]');
        let announce = document.querySelector('.announcer');
        let restart_btn = document.querySelector('.restart-btn');
        restart_btn.addEventListener('click', () => {
            gameBoard.emptyBoard();
            gameBoard.displayBoard(gameBoard.board);
            x_player.myTurn = true;
            o_player.myTurn = false;
            announce.innerHTML = "Player X's turn";
        });

        const fillBoard = (() => {
            for(let i = 0; i < gameBoard.board.length; i++) {
                cells[i].addEventListener('click', () => {
                    if (gameBoard.board[i] == '' && (isWon(gameBoard.board)[0] == false)) {
                        if(x_player.myTurn) {
                            gameBoard.board[i] = x_player.playerSymbol;
                            gameBoard.displayBoard(gameBoard.board);
                            x_player.myTurn = false;
                            o_player.myTurn = true;
                            announce.innerHTML = "Player O's turn";
                            let winner = isWon(gameBoard.board);
                            if (winner[0]) {
                                gameOver(winner[1]);
                            }
                            else if (isDraw(gameBoard.board)) {
                                gameOver('tie');
                            }
                        }
                        else {
                            gameBoard.board[i] = o_player.playerSymbol;
                            gameBoard.displayBoard(gameBoard.board);
                            x_player.myTurn = true;
                            o_player.myTurn = false;
                            announce.innerHTML = "Player X's turn";
                            let winner = isWon(gameBoard.board);
                            if (winner[0]) {
                                gameOver(winner[1]);
                            }
                            else if (isDraw(gameBoard.board)) {
                                gameOver('tie');
                            }
                        };
                    };
                });
            };
        })();

        function isAllEqual(board) {
            return (new Set(board).size == 1 && board[0] !== '');
        }

        function isDraw(board) {
            if (isWon(board)[0]) {
                return false;
            };

            for(let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    return false;
                };
            };

            return true;
        };

        function isWon(board) {
            new_board = [...board];
            first_row = new_board.slice(0, 3);
            second_row = new_board.slice(3, 6);
            third_row = new_board.slice(6, 9);
            allRows = [first_row, second_row, third_row];

            // Check if game is won by rows
            for (let i = 0; i < allRows.length; i++) {
                if (isAllEqual(allRows[i])) {
                    return [true, allRows[i][0]];
                };
            };

            // Check if game is won by columns
            for (let i = 0; i < first_row.length; i++) {
                if ((first_row[i] == second_row[i]) && (second_row[i] == third_row[i]) && first_row[i] != '') {
                    return [true, first_row[i]];
                };
            };

            // Check if game is won diagonally 
            if (((first_row[0] == second_row[1]) && (second_row[1] == third_row[2]) && first_row[0] != '')
                || ((first_row[2] == second_row[1]) && (second_row[1] == third_row[0]) && first_row[2] != '')) {
                    return [true, second_row[1]];
                };

            return [false, ''];
        };

        function gameOver(state) {
            if (state == 'tie'){
                announce.innerHTML = "It's a tie!";
            }
            else if (state == 'X') {
                announce.innerHTML = "Player X Wins!";
            }
            else {
                announce.innerHTML = "Player O Wins!";
            };
        };
    })();
    
    return {gameBoard, game, x_player, o_player};
})();