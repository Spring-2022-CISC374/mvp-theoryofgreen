import Phaser from 'phaser';
import { check } from "prettier";
import { config, gameSettings } from "../game.js";

class Scene4 extends Phaser.Scene {
	constructor() {
		super("endGame");
	}

    create() {
        this.add.text(350, 350, "Game Over");
        this.replay = this.add.text(347, 375, "Try again?");
        this.input.on("gameobjectdown", this.click, this);
        this.replay.setInteractive();
    }

    click(pointer, gameObject) {
        this.scene.start("playGame");
    }
}

export default Scene4;