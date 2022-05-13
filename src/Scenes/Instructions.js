class Instructions extends Phaser.Scene {
	constructor() {
		super("infoScreen");
	}

    init(data){
        console.log("data = ", data);
        this.wood = data.wood;
        this.stone = data.stone;
        this.weeds = data.weeds;
        this.meat = data.meat;
        this.bandages = data.bandages;
        this.isShelter = data.isShelter;
        this.isFire = data.isFire;
        this.fireCheck = data.fireCheck;
        this.shelterCheck = data.shelterCheck;
        this.timerDelay = data.timerDelay;
        this.enviroMeter = data.enviroMeter;
        this.player_health = data.player_health;
		this.player_food = data.player_food;
		this.player_water = data.player_water;
        this.collected_water = data.collected_water;
		this.collected_food = data.collected_food;
        this.isNight = data.isNight;
		this.isWater = data.isWater;
        this.pondradius = data.pondradius;
        this.canClickShelter = data.canClickShelter;
        this.shelterTimerDelay = data.shelterTimerDelay;
    }

    create() {
        this.borderup = this.add.rectangle(0, 0, 300, 10, 'black', 1);
		this.borderup.setScale(10);
		this.borderup.setDepth(99);

        this.back = this.add.rectangle(600, 200, 400, 1000, 0x3B3A39, 1);

        this.title = this.add.text(230, 10, "THEORY OF GREEN");
        this.title.setDepth(100);
        this.title.setFontSize(40);

        this.play = this.add.text(13, 15, "Play Game");
        this.play.setDepth(100);
        this.play.setFontSize(23);
        this.input.on("gameobjectdown", this.click, this);
        this.play.setInteractive();

		this.playButton = this.add.rectangle(76, 27, 130, 30, 0x2A7A16, 1);
		this.playButton.setDepth(99);
		this.playButton.setInteractive();

        this.surviveText = this.add.text(480, 60, "Survive while keeping the\nenvironment alive!");
        this.surviveText.setAlign("center");

        this.playerImage1 = this.add.sprite(50, 125, "player");
        this.playerImage1.setScale(2);
        this.playerImage1.play("walk_down");

        this.playerImage2 = this.add.sprite(125, 130, "player");
        this.playerImage2.setScale(2);
        this.playerImage2.play("walk_up");

        this.playerImage3 = this.add.sprite(210, 130, "player");
        this.playerImage3.setScale(2);
        this.playerImage3.play("walk_right");

        this.playerImage4 = this.add.sprite(300, 135, "player");
        this.playerImage4.setScale(2);
        this.playerImage4.play("walk_left");

        this.moveText = this.add.text(465, 125, "Move your character with the \narrow keys!");
        this.moveText.setAlign("center");

        this.playerImage5 = this.add.sprite(125, 250, "player");
        this.playerImage5.setScale(2);
        this.playerImage5.play("attack_right");

        this.attackText = this.add.text(425, 220, "When facing a pig from the side,\nhold down the space bar to attack it!\nWhen it drops meat, click on it\nto pick it up!");
        this.attackText.setAlign("center");

        this.pigImage = this.add.sprite(175, 250, "pig-frontfacing");
        this.pigImage.setScale(1.5);
        this.pigImage.play("pig-idle-front");

        this.woodImage = this.add.image(50, 350, "wood");
        this.woodImage.setScale(.1);

        this.stoneImage = this.add.image(110, 350, "stone");
        this.stoneImage.setScale(.1);

        this.weedsImage = this.add.image(170, 350, "weeds");
        this.weedsImage.setScale(.1);

        this.pondImage = this.add.circle(230, 350, 17, 0x3382FF);

        this.berryImage = this.add.image(300, 350, "berry-bush");
        this.berryImage.setScale(1);

        this.materialText = this.add.text(500, 330, "Click on materials to\npick them up!");
        this.materialText.setAlign("center");

        this.fireImage = this.add.image(60, 450, "campfire");
        this.fireImage.setScale(.12);

        this.shelterImage = this.add.image(175, 450, "shelter");
        this.shelterImage.setScale(.2);

        this.bandageImage = this.add.image(300, 450, "bandage");
        this.bandageImage.setScale(.65);

        this.craftText = this.add.text(435, 400, "On the Crafting Screen, click the images\nof craftable objects to\nuse your materials and build them!\nFire provides light, a shelter\nwill fully heal you every 50 seconds,\nand bandages will heal you\na little bit instantly!");
        this.craftText.setFontSize(14);
        this.craftText.setAlign("center");

        this.enviroImage = this.add.image(200, 560, "envirobar-image");
        this.enviroImage.setScale(.5);

        this.enviroText = this.add.text(445, 530, "Keep an eye on the Environment Meter!\nIf you take too much from\nyour environment,it will have\nbad effects on the ecosystem, and\nyour game will be over!");
        this.enviroText.setAlign("center");
        this.enviroText.setFontSize(14);

        this.playerbarImage = this.add.image(200, 650, "playerbars-image");
        this.playerbarImage.setScale(.4);

        this.playerbarText = this.add.text(420, 620, "If you have food, water, or\nbandages, you can click the 'Eat Food',\n'Drink Water', and 'Heal Self' buttons to\nrestore your player's meters! Be careful -\nif your health runs out, it's game over!");
        this.playerbarText.setAlign("center");
        this.playerbarText.setFontSize(14);
    }

    click(pointer, gameObject) {
        this.scene.start("playGame", {
            "wood": this.wood,
            "stone": this.stone,
            "weeds": this.weeds,
            "meat": this.meat,
            "bandages": this.bandages,
            "isShelter": this.isShelter,
            "isFire": this.isFire,
            "fireCheck": this.fireCheck,
            "shelterCheck": this.shelterCheck,
            "timerDelay": this.timerDelay,
            "enviroMeter": this.enviroMeter,
            "berry-bush": this.berryBush,
            "berry-bush-text": this.berryBushText,
            "poisonous-mushroom": this.poisonMushroom,
            "poisonous-mushroom-text": this.poisonMushroomText,
            "player_health": this.player_health,
            "player_food": this.player_food,
            "player_water": this.player_water,
            "collected_water": this.collected_water,
            "collected_food": this.collected_food,
            "isNight": this.isNight,
            "isWater": this.isWater,
            "pondradius": this.pondradius,
            "canClickShelter": this.canClickShelter,
            "shelterTimerDelay": this.shelterTimerDelay
          });
    }
}