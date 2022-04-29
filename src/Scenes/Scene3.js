//import Phaser from 'phaser';
//import { config, gameSettings } from "../game.js";

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
    }

    create() {
        this.text = this.add.text(25, 25, "Click to return to game!");
        this.text.setColor("white");
        this.text.setInteractive();
        this.text.group = "return";
        this.input.on("gameobjectdown", this.click, this);

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
                "timerDelay": this.timerDelay
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
                    this.stoneText.destroy();
			        this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
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
                    this.weedsText.destroy();
			        this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
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
                this.bandagesText.destroy();
			    this.bandagesText = this.add.text(150, 670, `Bandages : ${this.bandages}`);
            } else {
                this.add.text(380, 245, "Not enough materials");
            }
        }
    }
}
    

//export default Scene3;