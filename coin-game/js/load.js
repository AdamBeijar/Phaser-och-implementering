// saknar class samt funktioner till uppgift1

var loadState = {

    preload: function() {

        var loadingLabel = game.add.text(game.world.centerX, 150, 
            'loading...', {font: '30px Arial', fill: '#ffffff'});

        loadingLabel.anchor.setTo(0.5, 0.5); 
        
        // Load all assets

        // mute button
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);




    },

    create: function() {

        game.state.start('menu');




    }







};