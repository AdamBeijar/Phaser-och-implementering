var playState = {
    create: function() {
    console.log("spelet har startat");
        this.createWorld();
        // skapar en wall group
        //skapa alla övriga väggar
        game.add.sprite(250, 235, 'player', 0)
    },
    update: function() {

    },
    createWorld: function () {
        this.walls = game.add.group();
        this.walls.enableBody = true;
        game.add.sprite(0,0, 'Vwall', 0, this.walls);
        game.add.sprite(480,0, 'Vwall', 0, this.walls);
        game.add.sprite(0,0, 'Hwall', 0, this.walls);
        game.add.sprite(300,0, 'Hwall', 0, this.walls);
        game.add.sprite(0,330, 'Hwall', 0, this.walls);
        game.add.sprite(300,330, 'Hwall', 0, this.walls);
        game.add.sprite(150,255, 'Hwall', 0, this.walls);
        game.add.sprite(150,65, 'Hwall', 0, this.walls);
    }
};