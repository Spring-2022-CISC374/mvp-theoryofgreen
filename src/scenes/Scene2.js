import Phaser from "phaser";

export default class Scene2 extends Phaser.Scene {


    create() {
        this.score = 0;
        this.scoreLabelText = this.add.text(400, 250, `Score : ${this.score}`);
        this.scoreLabelText.setOrigin(0.5, 14);
        this.scoreLabelText.depth = 100;
        this.scoreLabelText.setColor('black');

        const score_label = this.add.rectangle(400, 50, 30, 200, 0xffffff, 1);
        this.physics.add.existing(score_label, true);
        this.tweens.add({
            targets: score_label,
            angle: 90,
            duration: 0
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
        } else if (this.cursors.left.isDown) {
            this.score *= 2;
            this.scoreLabelText.text = `Score : ${this.score}`;
        } else if (this.cursors.right.isDown) {
            this.score = Math.round(this.score / 2);
            this.scoreLabelText.text = `Score : ${this.score}`;
        }
    }

}