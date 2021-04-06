// saknar class samt funktioner till uppgift1

var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(game.world.centerX, 150, 
            'loading...', {font: '30px Arial', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5, 0.5);
        // Load all assets
        // mute button
        game.load.spritesheet('mute', 'assets/img/muteButton.png', 28, 22);
        game.load.spritesheet('player', 'assets/img/player2.png', 20, 20);
        game.load.image("background", "assets/img/background.png")
        game.load.spritesheet("enemy", "assets/img/enemy.png", 20, 20)
        game.load.image("coin", "assets/img/coin.png")
        game.load.image("wallH", "assets/img/HorizontalWall.png")
        game.load.image("wallV", "assets/img/VerticalWall.png")
        game.load.audio("coinSound", ["assets/sound/coin.mp3", "assets/sound/coin.ogg"])
        game.load.audio("deathSound", ["assets/sound/death.mp3", "assets/sound/death.ogg"])
        game.load.audio("jumpSound", ["assets/sound/Jump.mp3", "assets/sound/Jump.ogg"])
        game.load.image("explosion", "assets/img/explode.png")
    },
    create: function() {
        game.state.start('menu');
    }
};