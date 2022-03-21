class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

    preload() {
        this.load.spritesheet("player", "assets/sprites/main-character_emo2.png", {
          frameWidth: 45,
          frameHeight: 50
        });
      }

    create() {
		  this.add.text(20, 20, "Loading game...");
		  this.scene.start("playGame");

    }
}