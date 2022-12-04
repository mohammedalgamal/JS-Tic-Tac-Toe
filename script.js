const global = (() => {
    const gameBoard = (() => {
        const board = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
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