import Phaser from "phaser";

export default class Scene2 extends Phaser.Scene {


    create() {
        this.score = 0;
        this.scoreLabelText = this.add.text(400, 250, `Score : ${this.score}`);
        this.scoreLabelText.setOrigin(0.5, 0.5);
        this.scoreLabelText.setColor('white');

        const score_label = this.add.rectangle(400, 50, 30, 200, 0xffffff, 1);
        this.physics.add.existing(score_label, true);
        this.tweens.add({
            targets: score_label,
            angle: 90
        });

        /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {

        if (this.cursors.up.isDown) {
            this.score++;
            this.scoreLabelText.text = `Score : ${this.score}`;
        } else if (this.cursors.down.isDown) {
            this.score--;
            this.scoreLabelText.text = `Score : ${this.score}`;
        }

    }

}