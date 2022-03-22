class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {

        this.player = this.physics.add.sprite(300, 300, "player");
        this.player.setScale(2);
        this.player.play("idle");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        //Objects and animals
        var rand_val = Phaser.Math.Between(5, 10);
        for (let i = 0; i < rand_val; i++) {
            this.randomPigPositioning();
        }
    }

    update() {
        this.movePlayerManager();
        this.pigCollisions();
    }

    movePlayerManager() {
        if(this.cursorKeys.left.isDown) {
            this.player.play("walk_left", true);
            this.player.setVelocityX(-gameSettings.playerSpeed);
            this.player.setVelocityY(0);
        }
        else if(this.cursorKeys.right.isDown) {
            this.player.play("walk_right", true);
            this.player.setVelocityX(gameSettings.playerSpeed);
            this.player.setVelocityY(0);
        }
        else if(this.cursorKeys.up.isDown) {
            this.player.play("walk_up", true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown) {
            this.player.play("walk_down", true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else {
            this.player.play("idle", true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
    }

    //Colliding with objects/animals

    //pigs
    pigCollisions() {
        this.physics.add.collider(this.player, this.pig, function(pig){pig.destroy();});
    }

    randomPigPositioning() {
        var x_val = Phaser.Math.Between(0, config.width);
        var y_val = Phaser.Math.Between(0, config.height);
        this.pig = this.add.sprite(x_val, y_val, "pig-frontfacing");
        this.pig.setScale(1.5);
        this.pig.play("pig-idle-front");
        //this.pig.play("pig-idle-back");
    }
}