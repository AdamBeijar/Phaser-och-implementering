var game, emitter, music;
game = new Phaser.Game(1024, 786, Phaser.AUTO, "snowSlope")
const mainState = {
    preload: function () {
        game.load.image("bg", "./assets/img/bg.jpg")
        game.load.spritesheet("snowflake", "./assets/img/snowflakes_large.png", 64, 64)
        game.load.audio("song", "./assets/audio/song.mp3")
    },
    create: function () {
        music = game.add.audio('song')
        music.play()
        game.add.tileSprite(0, 0, 1024, 786, "bg")
        var delay = 0;
        for (var i = 0; i < 400; i++)
        {
            var sprite = game.add.sprite(0 + (game.world.randomX), -64, 'snowflake', Math.floor(Math.random()*6));
            sprite.scale.set(game.rnd.realInRange(0.1, 0.6));
            var speed = game.rnd.between(4000, 6000);
            game.add.tween(sprite).to({ y: 1000 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 20;
        }
    },
    update: function () {

    }
};
game.state.add("main", mainState)
game.state.start("main")

