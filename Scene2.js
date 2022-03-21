class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {

        this.player = this.physics.add.sprite(300, 300, "player");
        this.player.setScale(2);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

    }

    update() {

        this.movePlayerManager();
        
    }

    movePlayerManager() {
        if(this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else {
            this.player.setVelocityX(0);
        }

        if(this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else {
            this.player.setVelocityY(0);
        }
    }
}