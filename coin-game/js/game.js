var game = new Phaser.Game(500, 350, Phaser.AUTO, 'gameDiv');


// define states

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// we start boot state

game.state.start('boot');