import { config, gameSettings } from '../game.js';

class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    add_materials() {

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

    }

    create() {

        /** @type {Array<Phaser.GameObjects.Sprite>} */
        this.pigs = []
        this.add_materials();

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

    //Colliding with objects/animals

    //pigs
    pigCollisions() {
        this.pigs.forEach((eachPig) => {
            this.physics.add.collider(this.player, eachPig, () => {
                console.log('you collided with a pig!');
            })
        });
        this.physics.add.staticGroup(this.pigs);
    }

    randomPigPositioning() {
        var x_val = Phaser.Math.Between(0, config.width);
        var y_val = Phaser.Math.Between(0, config.height);
        this.pig = this.add.sprite(x_val, y_val, "pig-frontfacing");
        this.pig.setScale(1.5);
        this.pig.play("pig-idle-front");
        this.pig.setInteractive();
        this.pigs = [...this.pigs, this.pig];
    }
}

export default Scene2;