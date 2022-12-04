const global = (() => {
    const gameBoard = (() => {
        const board = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
        const makeBoard = (() => {
            let container = document.querySelector('.board');
            for (let i = 1; i <= 9; i++) {
                let temp_div = document.createElement('div');
                temp_div.className = `place${i}`;
                temp_div.classList += ' cell';
                container.appendChild(temp_div);
            };
        })();
        return {board};
    })();

    const game = (() => {

    })();

    const player = (playerSymbol) => {
        return {playerSymbol};
    };

    const x_player = player('x');
    const o_player = player('o');
    
    return {gameBoard, game, x_player, o_player};
})();