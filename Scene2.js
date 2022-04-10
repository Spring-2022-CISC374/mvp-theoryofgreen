class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.wood = 0;
        this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
        this.woodText.depth = 100;
        this.woodText.setColor('white');

        this.woodCount = 0;
        this.woods = this.add.group();
        this.input.on('gameobjectdown', this.collect, this);
        var maxWood = 5;
        for(var i = 0; i < maxWood; i++) {
            var woody = this.add.sprite(16, 16, "wood");
            woody.group = "wood";
            woody.setScale(.1);
            woody.setInteractive();
            this.woods.add(woody);
            woody.setRandomPosition(0, 0, config.width, config.height);
            this.woodCount++;
        }

        this.stone = 0;
        this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
        this.stoneText.depth = 100;
        this.stoneText.setColor('white');

        this.stoneCount = 0;
        this.stones = this.add.group();
        var maxStone = 5;
        for(var i = 0; i < maxWood; i++) {
            var stony = this.add.sprite(16, 16, "stone");
            stony.group = "stone";
            stony.setScale(.1);
            stony.setInteractive();
            this.stones.add(stony);
            stony.setRandomPosition(0, 0, config.width, config.height);
            this.stoneCount++;
        }

        this.weeds = 0;
        this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
        this.weedsText.depth = 100;
        this.weedsText.setColor('white');

        this.weedsCount = 0;
        this.weedss = this.add.group();
        var maxWeeds = 5;
        for(var i = 0; i < maxWood; i++) {
            var weedy = this.add.sprite(16, 16, "weeds");
            weedy.group = "weeds";
            weedy.setScale(.1);
            weedy.setInteractive();
            this.weedss.add(weedy);
            weedy.setRandomPosition(0, 0, config.width, config.height);
            this.weedsCount++;
        }

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
    }

    collect(pointer, gameObject) {
        if(gameObject.group == "wood"){
            this.wood += 1;
            this.woodText.destroy();
            this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
            gameObject.destroy();
            this.woodCount--;
            if(this.woodCount < 1){
                while(this.woodCount < 5) {
                    var woody = this.add.sprite(16, 16, "wood");
                    woody.group = "wood";
                    woody.setScale(.1);
                    woody.setInteractive();
                    this.woods.add(woody);
                    woody.setRandomPosition(0, 0, config.width, config.height);
                    this.woodCount++;
                }
            }
        }
        else if(gameObject.group == "stone"){
            this.stone += 1;
            this.stoneText.destroy();
            this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
            gameObject.destroy();
            this.stoneCount--;
            if(this.stoneCount < 1){
                while(this.stoneCount < 5) {
                    var stony = this.add.sprite(16, 16, "stone");
                    stony.group = "stone";
                    stony.setScale(.1);
                    stony.setInteractive();
                    this.stones.add(stony);
                    stony.setRandomPosition(0, 0, config.width, config.height);
                    this.stoneCount++;
                }
            }
        }
        else if(gameObject.group == "weeds"){
            this.weeds += 1;
            this.weedsText.destroy();
            this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
            gameObject.destroy();
            this.weedsCount--;
            if(this.weedsCount < 1){
                while(this.weedsCount < 5) {
                    var weedy = this.add.sprite(16, 16, "weeds");
                    weedy.group = "weeds";
                    weedy.setScale(.1);
                    weedy.setInteractive();
                    this.weedss.add(weedy);
                    weedy.setRandomPosition(0, 0, config.width, config.height);
                    this.weedsCount++;
                }
            }
        }
    }

    update() {
        this.movePlayerManager();
        this.pigCollisions();
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
        this.physics.add.collider(this.player, this.pig, function(pig){pig.destroy();});
    }

    randomPigPositioning() {
        var x_val = Phaser.Math.Between(0, config.width);
        var y_val = Phaser.Math.Between(0, config.height);
        this.pig = this.add.sprite(x_val, y_val, "pig-frontfacing");
        this.pig.setScale(1.5);
        this.pig.play("pig-idle-front");
        //this.pig.play("pig-idle-back");
        let pig = this.add.sprite("pig-frontfacing");
        this.pig.setInteractive();
        this.pig.on('pointerdown', function(pointer){
            console.log("click"+pig);
        });

    }
}