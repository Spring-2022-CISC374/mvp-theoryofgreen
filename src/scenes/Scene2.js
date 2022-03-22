import Phaser from "phaser";

export default class Scene2 extends Phaser.Scene {


    create() {
        const text = this.add.text(400, 250, 'Scene 2');
        text.setOrigin(0.5, 0.5);
    }

}