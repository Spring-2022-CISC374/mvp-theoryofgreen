import Phaser from 'phaser';
import { config, gameSettings } from "../game.js";

class Scene3 extends Phaser.Scene {
	constructor() {
		super("craftScreen");
	}

    init(data){
        this.wood = data.wood;
        this.stone = data.stone;
        this.weeds = data.weeds;
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
    }

    create() {
        this.border = this.add.rectangle(0, 700, 300, 15, 'black', 1);
		this.border.setScale(10);
		this.border.setDepth(99);
		this.borderup = this.add.rectangle(0, 0, 300, 10, 'black', 1);
		this.borderup.setScale(10);
		this.borderup.setDepth(99);

		this.playerbars();

        this.text = this.add.text(25, 25, "Click to return to game!");
        this.text.setColor("white");
        this.text.setInteractive();
        this.text.group = "return";
        this.text.setDepth(100);
        this.input.on("gameobjectdown", this.click, this);

        this.craftText = this.add.text(350, 17, "CRAFTING");
        this.craftText.setColor("white");
        this.craftText.setDepth(100);
        this.craftText.setFontSize(25);

        this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
		this.woodText.depth = 100;
		this.woodText.setColor("white");

        this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
		this.stoneText.depth = 100;
		this.stoneText.setColor("white");

        this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
		this.weedsText.depth = 100;
		this.weedsText.setColor("white");

        this.bandagesText = this.add.text(150, 670, `Bandages : ${this.bandages}`);
		this.bandagesText.depth = 100;
		this.bandagesText.setColor("white");

        this.waterText = this.add.text(150, 650, `Water : ${this.collected_water}`);
		this.waterText.depth = 100;
		this.waterText.setColor("white");

		this.foodText = this.add.text(150, 630, `Food : ${this.collected_food}`);
		this.foodText.depth = 100;
		this.foodText.setColor("white");

        this.fire = this.add.image(150, 150, "campfire");
        this.fire.setScale(.2);
        this.fireText = this.add.text(80, 210, "Click to craft Campfire \n-10 wood\n-10 stone");
        this.fire.group = "fire";
        this.fireText.group = "fire";
        this.fire.setInteractive();
        this.fireText.setInteractive();

        this.bandage = this.add.image(450, 150, "bandage");
        this.bandageText = this.add.text(380, 210, "Click to craft Bandage\n-20 weeds");
        this.bandage.group = "bandage";
        this.bandageText.group = "bandage";
        this.bandage.setInteractive();
        this.bandageText.setInteractive();

        this.shelter = this.add.image(150, 400, "shelter");
        this.shelter.setScale(.3);
        this.shelterText = this.add.text(80, 460, "Click to craft Simple Shelter\n-30 wood\n-30 weeds");
        this.shelter.group = "shelter";
        this.shelterText.group = "shelter";
        this.shelter.setInteractive();
        this.shelterText.setInteractive();

        this.timerText = this.add.text(600, 25);
        this.timerText.setDepth(100);
		this.timer = this.time.addEvent({
			delay: this.timerDelay,
			callback: this.gameEnd,
			args: [],
			callbackScope: this,
			loop: false,
			repeat: 0,
			startAt: 1,
			timeScale: 1,
			paused: false
		});
    }

    gameEnd() {
		this.scene.start("endGame");
	}

    playerbars() {
        this.health_label = this.add.text(470, 633, `HEALTH : `);
		this.health_label.setColor('white');
		this.health_label.setDepth(100);

		this.health_bar = this.add.rectangle(650, 640, 100, 13, 0x3dbf00, 1);
		this.health_bar.scaleX = 2;
		this.health_bar.setDepth(100);
		this.health_bar.name = "health";

		this.food_label = this.add.text(470, 653, `FOOD : `);
		this.food_label.setColor('white');
		this.food_label.setDepth(100);

		this.food_bar = this.add.rectangle(650, 660, 100, 13, 0x3dbf00, 1);
		this.food_bar.scaleX = 2;
		this.food_bar.setDepth(100);
		this.food_bar.name = "food";

		this.water_label = this.add.text(470, 673, `WATER : `);
		this.water_label.setColor('white');
		this.water_label.setDepth(100);

		this.water_bar = this.add.rectangle(650, 680, 100, 13, 0x3dbf00, 1);
		this.water_bar.scaleX = 2;
		this.water_bar.setDepth(100);
		this.water_bar.name = "water";

        this.correctPlayerBars();
    }

    correctPlayerBars() {
        this.health_bar.setSize(this.player_health, 13);
		this.health_bar.setDepth(100);
		if (this.player_health >= 80) {
			this.health_bar.setFillStyle(0x3dbf00);
		} else if (this.player_health >= 60) {
			this.health_bar.setFillStyle(0xe6c700);	
		} else if (this.player_health >= 50) {
			this.health_bar.setFillStyle(0xe03800);
		} else if (this.player_health >= 20) {
			this.health_bar.setFillStyle(0xe00000);	
		}

        this.food_bar.setSize(this.player_food, 13);
	    this.food_bar.setDepth(100);
		if (this.player_food >= 80) {
			this.food_bar.setFillStyle(0x3dbf00);
		} else if (this.player_food >= 60) {
			this.food_bar.setFillStyle(0xe6c700);	
		} else if (this.player_food >= 50) {
			this.food_bar.setFillStyle(0xe03800);
		} else if (this.player_food >= 20) {
			this.food_bar.setFillStyle(0xe00000);	
		}

        this.water_bar.setSize(this.player_water, 13);
		this.water_bar.setDepth(100);
		if (this.player_water >= 80) {
			this.water_bar.setFillStyle(0x3dbf00);
		} else if (this.player_water >= 60) {
			this.water_bar.setFillStyle(0xe6c700);	
		} else if (this.player_water >= 50) {
			this.water_bar.setFillStyle(0xe03800);
		} else if (this.player_water >= 20) {
			this.water_bar.setFillStyle(0xe00000);	
		}
    }

    update() {
		if(this.timer.getRemainingSeconds() >= 100) {
			this.x = 6;
		}
		else if (this.timer.getRemainingSeconds() >= 10) {
			this.x = 5;
		}
		else {
			this.x = 4;
		}
		this.timerDelay = this.timer.getRemainingSeconds() * 1000;
		this.timerText.setText('Survive for: ' + this.timer.getRemainingSeconds().toString().substring(0, this.x));
	}

    click(pointer, gameObject) {
        if(this.fireCheck == 2) {
            this.fireCheck = 1;
        }
        if(this.shelterCheck == 2) {
            this.shelterCheck = 1;
        }
        if(gameObject.group == "return") {
            this.scene.start("playGame", {
                "wood": this.wood,
                "stone": this.stone,
                "weeds": this.weeds,
                "bandages": this.bandages,
                "isShelter": this.isShelter,
                "isFire": this.isFire,
                "fireCheck": this.fireCheck,
                "shelterCheck": this.shelterCheck,
                "timerDelay": this.timerDelay,
                "enviroMeter": this.enviroMeter,
                "player_health": this.player_health,
                "player_food": this.player_food,
                "player_water": this.player_water,
                "collected_water": this.collected_water,
                "collected_food": this.collected_food
            });
        } else if (gameObject.group == "fire") {
            if(!this.isFire) {
                if(this.wood >= 10 && this.stone >= 10) {
                    this.isFire = true;
                    this.fireCheck = 1;
                    this.wood -= 10;
                    this.stone -= 10;
                    this.woodText.destroy();
			        this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
                    this.woodText.setDepth(100);
                    this.stoneText.destroy();
			        this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
                    this.stoneText.setDepth(100);
                    this.add.text(80, 260, "Campfire crafted!");
                } else {
                    this.add.text(80, 260, "Not enough materials");
                }
            } else {
                this.add.text(80, 260, "You already have a Campfire!");
            }
        } else if (gameObject.group == "shelter") {
            if(!this.isShelter) {
                if(this.wood >= 30 && this.weeds >= 30) {
                    this.isShelter = true;
                    this.shelterCheck = 1;
                    this.wood -= 30;
                    this.weeds -= 30;
                    this.woodText.destroy();
			        this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
                    this.woodText.setDepth(100);
                    this.weedsText.destroy();
			        this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
                    this.weedsText.setDepth(100);
                    this.add.text(80, 510, "Simple Shelter crafted!");
                } else {
                    this.add.text(80, 510, "Not enough materials");
                }
            } else {
                this.add.text(80, 510, "You already have a Simple Shelter!");
            }
        } else if (gameObject.group == "bandage") {
            if(this.weeds >= 20) {
                this.bandages += 1;
                this.weeds -= 20;
                this.weedsText.destroy();
			    this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
                this.weedsText.setDepth(100);
                this.bandagesText.destroy();
			    this.bandagesText = this.add.text(150, 670, `Bandages : ${this.bandages}`);
                this.bandagesText.setDepth(100);
            } else {
                this.add.text(380, 245, "Not enough materials");
            }
        }
    }
}
    

export default Scene3;