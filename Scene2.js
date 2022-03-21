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

    }

    update() {

        this.movePlayerManager();
        
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
}