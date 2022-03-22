import Phaser from "phaser";

export default class Scene1 extends Phaser.Scene {


    preload() {
        this.load.spritesheet("player", "assets/sprites/main-character.png");
    }

    create() {
		const text = this.add.text(400, 250, "Loading game...");
        text.setOrigin(0.5, 0.5);
    }
}