// saknar class samt funktioner till uppgift1
var muteButton;
var currentFrame = 0;
var menuState = {
    create: function() {
        this.mute = false
        var menuLabel = game.add.text(game.world.centerX, 30, 
            'menu..', {font: '30px Arial', fill: '#ffffff'});
        menuLabel.anchor.setTo(0.5, 0.5);
        var startLabel = game.add.text(game.world.centerX, 150, 
            'Press the up arrow key to start', {font: '30px Arial', fill: '#ffffff'});
        startLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start();
        // start the game when up arrow key is pressed
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);
        muteButton = game.add.button(game.world.centerX -10, 100, 'mute', this.muteAudio, this, currentFrame)
    },
    start: function() {
        game.state.start('play');
    },
    muteAudio: function () {
        if (currentFrame === 0){
            currentFrame = 1
            muteButton.setFrames(1)
            this.mute = true
        } else if(currentFrame === 1){
            currentFrame = 0
            muteButton.setFrames(0)
            this.mute = false
        }
    }
};