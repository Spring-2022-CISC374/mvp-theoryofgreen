class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

    preload() {
        
        this.load.spritesheet("player", "assets/sprites/main-character.png");

    }

    create() {
		this.add.text(20, 20, "Loading game...");
		this.scene.start("playGame");

    }
}