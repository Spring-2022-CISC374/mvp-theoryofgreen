class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //score label - cameron
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

        const display = this.add.text(400, 250, "In the future this can be wired up to user inputs, breaking blocks, etc.");
        display.setOrigin(0.5, 0.5);

        /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
        this.cursors = this.input.keyboard.createCursorKeys();

        //player - allison
        this.player = this.physics.add.sprite(300, 300, "player");
        this.player.setScale(2);
        this.player.play("idle");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        //Objects and animals - zoe
        var rand_val = Phaser.Math.Between(5, 10);
        for (let i = 0; i < rand_val; i++) {
            this.randomPigPositioning();
        }
        this.pigCollisions();
    }

    update() {
        this.movePlayerManager();
        this.scoreLabel();
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

    //score label
    scoreLabel() {
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

    //Colliding with objects/animals

    //pigs
    pigCollisions() {
        //let pig = this.add.sprite("pig-frontfacing");
        this.pig.setInteractive();
        this.input.on('gameobjectdown', this.pig.destroy, this);
        // this.pig.on('pointerdown', function(pointer){
        //     this.pig.destroy();
        //     console.log("click"+pig);
        // });
        //this.physics.add.collider(this.player, this.pig, function(pig){pig.destroy();});
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