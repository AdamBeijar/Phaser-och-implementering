
var playState = {
    create: function() {
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
        console.log("spelet har startat");
        // addar vår background
        game.add.image(0,0, 'bg');
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.body.gravity.y = 500;
        this.player.animations.add('right', [1, 2], 8, true);
        this.player.animations.add('left', [3, 4], 8, true);
        //
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        // Coin in here
        this.coin  = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);
        this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
        this.score = 0;
        // function to create our World
        this.createWorld();
        game.time.events.loop(2200, this.addEnemy, this);
        //this.nextEnemy = 0;
        this.jumpfx = game.add.audio("jumpSound")
        this.coinsfx = game.add.audio("coinSound")
        this.deathfx = game.add.audio("deathSound")
    },
    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.enemies, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
        // här kommer move play funktion in kalla på den.
        this.movePlayer();
        if (this.nextEnemy < game.time.now) {
            var start = 4000, end = 10000, score = 100;
            var delay = Math.max(start - (start-end) * this.score/score, end);
            this.addEnemy();
            this.nextEnemy = game.time.now + delay;
        }
    },
    movePlayer: function() {
        if (this.cursor.left.isDown || this.wasd.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown || this.wasd.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;
        }
        if ((this.cursor.up.isDown || this.wasd.up.isDown) && this.player.body.touching.down) {
            this.jumpfx.play();
            this.player.body.velocity.y = -320;
        }
    },
    takeCoin: function() {
        this.score += 5;
        this.scoreLabel.text = 'score: ' + this.score;
        this.coinsfx.play();
        this.updateCoinPosition();
    },
    updateCoinPosition: function() {
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60},
            {x: 60, y: 140}, {x: 440, y: 140},
            {x: 130, y: 300}, {x: 370, y: 300}
        ];
        for(var i = 0; i < coinPosition.length; i++) {

            if (coinPosition[i].x === this.coin.x) {

                coinPosition.splice(i, 1);
            }
        }
        var newPosition = coinPosition[game.rnd.integerInRange(0, this.updateCoinPosition.length-1)];
        this.coin.reset(newPosition.x, newPosition.y);
    },
    addEnemy: function() {
        var enemy = this.enemies.getFirstDead();
        if(!enemy) {
            return;
        }
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.world.centerX, 0);
        enemy.body.gravity.y = 500;
        enemy.body.bounce.x = 1;
        enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        enemy.checkWorldBounds = true;
        enemy.outOfBondsKill = true;
    },
    createWorld: function() {
        this.walls = game.add.group();
        this.walls.enableBody = true;
        game.add.sprite(0, 0, 'wallV', 0, this.walls);
        game.add.sprite(480, 0, 'wallV', 0, this.walls);
        game.add.sprite(0, 0, 'wallH', 0, this.walls);
        game.add.sprite(300, 0, 'wallH', 0, this.walls);
        game.add.sprite(0, 330, 'wallH', 0, this.walls);
        game.add.sprite(300, 330, 'wallH', 0, this.walls);
        game.add.sprite(-100, 160, 'wallH', 0, this.walls);
        game.add.sprite(400, 160, 'wallH', 0, this.walls);
        // todo walls
        var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
        middleTop.scale.setTo(1.5, 1);
        var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
        middleBottom.scale.setTo(1.5, 1);
        this.walls.setAll('body.immovable', true);
    },
    playerDie: function() {
        if(!this.player.alive) {
            return;
        }
        console.log("spelaren dör");
        this.deathfx.play()
        this.player.kill();
        // en delay på ett par sekunder
        // Uppgift  när spelaren dör skall vi hamna back to menu
        setTimeout(function (){
            game.state.start("menu")
            }, 5000)
    }
};