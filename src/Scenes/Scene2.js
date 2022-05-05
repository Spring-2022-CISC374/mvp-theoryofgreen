import Phaser from 'phaser';
import { config, gameSettings } from "../game.js";

class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	}

	init(data) {
		this.wood = data.wood;
		this.stone = data.stone;
		this.weeds = data.weeds;
		this.bandages = data.bandages;
		this.isShelter = data.isShelter;
		this.isFire = data.isFire;
		this.fireCheck = data.fireCheck;
		this.shelterCheck = data.shelterCheck;
		this.timerDelay = data.timerDelay;
		this.meter_value = data.enviroMeter;
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

	//environmental meter
	environment_meter() {
		//this.meter_value = 100;
		this.bar_size = 100;
		this.meter_label = this.add.text(400, 5, `ENVIRONMENT METER : ${this.meter_value}`);
		this.meter_label.setOrigin(0.5,0,5);
		this.meter_label.setColor('white');
		this.meter_label.setDepth(100);

		this.meter_bar = this.add.rectangle(400, 30, this.bar_size, 20, 0x3dbf00, 1);
		this.meter_bar.scaleX = 3;
		this.meter_bar.setDepth(100);
	}

	environment_meter_value(amount, direction) {
		if(direction == "minus") {
			this.meter_value -= amount;
		}
		else if(direction == "plus") {
			this.meter_value += amount;
			if(this.meter_value >= 100) {
				this.meter_value = 100;
			}
		}
		this.meter_label.text = `ENVIRONMENT METER : ${this.meter_value}`;

		//bar color and size
		//this.meter_bar.setSize(this.bar_size--, 20);
		this.meter_bar.setSize(this.meter_value, 20);
		if (this.meter_value >= 80) {
			this.meter_bar.setFillStyle(0x3dbf00);
		} else if (this.meter_value >= 60) {
			this.meter_bar.setFillStyle(0xe6c700);	
		} else if (this.meter_value >= 50) {
			this.meter_bar.setFillStyle(0xe03800);
		} else if (this.meter_value >= 20) {
			this.meter_bar.setFillStyle(0xe00000);	
		}

		//game over if meter reaches 0
		if (this.meter_value <= 0) {
			this.gameEnd();
		}
	}

	add_materials() {
		//this.wood = 0;
		this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
		this.woodText.depth = 100;
		this.woodText.setColor("white");

		this.woodCount = 0;
		this.woods = this.add.group();
		this.input.on("gameobjectdown", this.click, this);
		var maxWood = 5;
		for (var i = 0; i < maxWood; i++) {
			var woody = this.add.sprite(16, 16, "wood");
			woody.group = "wood";
			woody.setScale(0.1);
			woody.setInteractive();
			this.woods.add(woody);
			woody.setRandomPosition(100, 200, 650, 350);
			this.woodCount++;
		}

		//this.stone = 0;
		this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
		this.stoneText.depth = 100;
		this.stoneText.setColor("white");

		this.stoneCount = 0;
		this.stones = this.add.group();
		var maxStone = 5;
		for (var i = 0; i < maxWood; i++) {
			var stony = this.add.sprite(16, 16, "stone");
			stony.group = "stone";
			stony.setScale(0.1);
			stony.setInteractive();
			this.stones.add(stony);
			stony.setRandomPosition(100, 200, 650, 350);
			this.stoneCount++;	
		}

		//this.weeds = 0;
		this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
		this.weedsText.depth = 100;
		this.weedsText.setColor("white");

		this.weedsCount = 0;
		this.weedss = this.add.group();
		var maxWeeds = 5;
		for (var i = 0; i < maxWood; i++) {
			var weedy = this.add.sprite(16, 16, "weeds");
			weedy.group = "weeds";
			weedy.setScale(0.1);
			weedy.setInteractive();
			this.weedss.add(weedy);
			weedy.setRandomPosition(100, 200, 650, 350);
			this.weedsCount++;
		}

		this.bandageText = this.add.text(150, 670, `Bandages : ${this.bandages}`);
		this.bandageText.depth = 100;
		this.bandageText.setColor("white");

		this.waterText = this.add.text(150, 650, `Water : ${this.collected_water}`);
		this.waterText.depth = 100;
		this.waterText.setColor("white");

		this.foodText = this.add.text(150, 630, `Food : ${this.collected_food}`);
		this.foodText.depth = 100;
		this.foodText.setColor("white");
	}

	water() {
		if(this.isWater) {
			this.pond = this.add.circle(650, 200, this.pondradius, 0x3382FF);
			this.pond.setDepth(-1);
			this.pond.setInteractive();
			this.pond.group = "water";
		}
	}

	playerbars() {
		this.border = this.add.rectangle(0, 700, 300, 15, 'black', 1);
		this.border.setScale(10);
		this.border.setDepth(99);
		this.borderup = this.add.rectangle(0, 0, 300, 10, 'black', 1);
		this.borderup.setScale(10);
		this.borderup.setDepth(99);

		this.size = 100;
		this.health_label = this.add.text(470, 633, `HEALTH : `);
		this.health_label.setColor('white');
		this.health_label.setDepth(100);

		this.health_bar = this.add.rectangle(650, 640, this.size, 13, 0x3dbf00, 1);
		this.health_bar.scaleX = 2;
		this.health_bar.setDepth(100);
		this.health_bar.name = "health";

		this.food_label = this.add.text(470, 653, `FOOD : `);
		this.food_label.setColor('white');
		this.food_label.setDepth(100);

		this.food_bar = this.add.rectangle(650, 660, this.size, 13, 0x3dbf00, 1);
		this.food_bar.scaleX = 2;
		this.food_bar.setDepth(100);
		this.food_bar.name = "food";

		this.water_label = this.add.text(470, 673, `WATER : `);
		this.water_label.setColor('white');
		this.water_label.setDepth(100);

		this.water_bar = this.add.rectangle(650, 680, this.size, 13, 0x3dbf00, 1);
		this.water_bar.scaleX = 2;
		this.water_bar.setDepth(100);
		this.water_bar.name = "water";

		this.correctPlayerBars();
	}

	updatePlayerBars(bar, amount, direction) {
		if(bar.name == "health") {
			if(direction == "minus") {
				this.player_health -= amount;
			}
			else if(direction == "plus") {
				this.player_health += amount;
				if(this.player_health >= 100) {
					this.player_health = 100;
				}
			}

			if (this.player_health <= 0) {
				this.player_health = 0;
				this.gameEnd();
			}

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

		} else if(bar.name == "food") {
			if(direction == "minus") {
				this.player_food -= amount;
			}
			else if(direction == "plus") {
				this.player_food += amount;
				if(this.player_food >= 100) {
					this.player_food = 100;
				}
			}

			if (this.player_food <= 0) {
				this.player_food = 0;
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
			
		} else if(bar.name == "water") {
			if(direction == "minus") {
				this.player_water -= amount;
			}
			else if(direction == "plus") {
				this.player_water += amount;
				if(this.player_water >= 100) {
					this.player_water = 100;
				}
			}

			if (this.player_food <= 0) {
				this.player_food = 0;
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

	drainhealth() {
		if(this.player_food <= 0 || this.player_water <= 0) {
			this.updatePlayerBars(this.health_bar, .1, "minus");
		}
	}

	drainfood() {
		if(this.player_food > 0) {
			this.updatePlayerBars(this.food_bar, .01, "minus");
		}
	}

	drainwater() {
		if(this.player_water > 0) {
			this.updatePlayerBars(this.water_bar, .02, "minus");
		}
	}

	day_or_night() {
		if(this.timer.getRemainingSeconds() < 250 && !this.isNight) {
			this.nighttime();
		}
		if(this.timer.getRemainingSeconds() < 200 && this.isNight) {
			this.daytime();
		}
		if(this.timer.getRemainingSeconds() < 150 && !this.isNight) {
			this.nighttime();
		}
		if(this.timer.getRemainingSeconds() < 100 && this.isNight) {
			this.daytime();
		}
		if(this.timer.getRemainingSeconds() < 50 && !this.isNight) {
			this.nighttime();
		}
	}

	nighttime() {
		this.environment_meter_value(10, "plus");
		this.night = this.add.rectangle(0, 0, 800, 800, 'black', 1);
		this.night.alpha = .5;
		this.night.setScale(10);
		this.sun.destroy();
		this.moon = this.add.image(775, 663, "moon");
		this.moon.setDepth(100);
		this.moon.setScale(.04);
		this.isNight = true;
	}

	daytime() {
		this.environment_meter_value(10, "plus");
		this.night.destroy();
		this.moon.destroy();
		this.sun = this.add.image(775, 663, "sun");
		this.sun.setDepth(100);
		this.sun.setScale(.05);
		this.sunMade = true;
		this.isNight = false;
	}

	create() {
		this.craft = this.add.text(25, 25, "Click to craft!");
		this.craft.group = "craftButton";
		this.craft.setColor("white");
		this.craft.setInteractive();
		this.craft.setDepth(100);
        this.num_pigs = 0
		this.playerbars();

		if(!this.canClickShelter) {
			this.makeShelterTimer();
		}

		this.shelterTimerText = this.add.text(320, 100);
		this.shelterTimerText.setDepth(100);

		this.foodButton = this.add.text(310, 630, "Eat Food");
		this.foodButton.setDepth(101);
		this.foodBack = this.add.rectangle(350, 637, 120, 16, 0x2A7A16, 1);
		this.foodBack.setDepth(100);
		this.foodButton.setInteractive();
		this.foodBack.setInteractive();
		this.foodButton.group = "foodbutton";
		this.foodBack.group = "foodbutton";

		this.waterButton = this.add.text(298, 650, "Drink Water");
		this.waterButton.setDepth(101);
		this.waterBack = this.add.rectangle(350, 657, 120, 16, 0x2A7A16, 1);
		this.waterBack.setDepth(100);
		this.waterButton.setInteractive();
		this.waterBack.setInteractive();
		this.waterButton.group = "waterbutton";
		this.waterBack.group = "waterbutton";

		this.bandageButton = this.add.text(305, 670, "Heal Self");
		this.bandageButton.setDepth(101);
		this.bandageBack = this.add.rectangle(350, 677, 120, 16, 0x2A7A16, 1);
		this.bandageBack.setDepth(100);
		this.bandageButton.setInteractive();
		this.bandageBack.setInteractive();
		this.bandageButton.group = "bandagebutton";
		this.bandageBack.group = "bandagebutton";

		if(!this.isNight) {
			this.sun = this.add.image(775, 663, "sun");
			this.sun.setDepth(100);
			this.sun.setScale(.05);
		}
		else {
			this.night = this.add.rectangle(0, 0, 800, 800, 'black', 1);
			this.night.alpha = .5;
			this.night.setScale(10);
			this.night.setDepth(99);
			this.moon = this.add.image(775, 663, "moon");
			this.moon.setDepth(100);
			this.moon.setScale(.04);
		}

        /** @type {Array<Phaser.GameObjects.Rectangle>} */
		this.health_bars = [];
		this.health_bar_backgrounds = [];
		this.last_dir = "d";
		this.idle_dirs = {
			d: "idle_down",
			l: "idle_left",
			r: "idle_right",
			u: "idle_back",
			dl: "idle_down_left",
			dr: "idle_down_right",
			ul: "idle_up_left",
			ur: "idle_up_right",
		};
		/** @type {Array<Phaser.GameObjects.Sprite>} */
		this.pigs = [];
		this.water();
		this.add_materials();

		//create envi meter
		this.environment_meter();

		//player - allison
		this.player = this.physics.add.sprite(300, 300, "player");
        this.physics.world.add(this.player.body);
		this.player.setSize(25, 20);
		this.player.setScale(2);
		this.player.play("idle_down");
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.player.setCollideWorldBounds(true);

		//Objects and animals - zoe
		var rand_val = Phaser.Math.Between(5, 7);
        this.num_pigs = rand_val;
		for (let i = 0; i < rand_val; i++) {
			this.randomPigPositioning(i);
		}

		/** @type{Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody} */
		this.weaponHitbox = this.add.rectangle(0, 0, 40, 35, 0xfffff, 0);
		this.physics.add.existing(this.weaponHitbox);

		this.pigCollisions();

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

	click(pointer, gameObject) {
		if (gameObject.group == "wood") {
			this.wood += 1;
			this.woodText.destroy();
			this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
			this.woodText.setDepth(100);
			gameObject.destroy();
			this.woodCount--;
			if (this.woodCount < 1) {
				while (this.woodCount < 5) {
					var woody = this.add.sprite(16, 16, "wood");
					woody.group = "wood";
					woody.setScale(0.1);
					woody.setInteractive();
					this.woods.add(woody);
					woody.setRandomPosition(100, 200, 650, 350);
					this.woodCount++;
				}
			}
			// envi impact wood = 1
			this.environment_meter_value(1, "minus");
		} else if (gameObject.group == "stone") {
			this.stone += 1;
			this.stoneText.destroy();
			this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
			this.stoneText.setDepth(100);
			gameObject.destroy();
			this.stoneCount--;
			if (this.stoneCount < 1) {
				while (this.stoneCount < 5) {
					var stony = this.add.sprite(16, 16, "stone");
					stony.group = "stone";
					stony.setScale(0.1);
					stony.setInteractive();
					this.stones.add(stony);
					stony.setRandomPosition(100, 200, 650, 350);
					this.stoneCount++;
				}
			}
			//envi impact stone = 1
			this.environment_meter_value(1, "minus");
		} else if (gameObject.group == "weeds") {
			this.weeds += 1;
			this.weedsText.destroy();
			this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
			this.weedsText.setDepth(100);
			gameObject.destroy();
			this.weedsCount--;
			if (this.weedsCount < 1) {
				while (this.weedsCount < 5) {
					var weedy = this.add.sprite(16, 16, "weeds");
					weedy.group = "weeds";
					weedy.setScale(0.1);
					weedy.setInteractive();
					this.weedss.add(weedy);
					weedy.setRandomPosition(100, 200, 650, 350);
					this.weedsCount++;
				}
			}
			//envi impact weeds = 1
			this.environment_meter_value(1, "minus");
		} else if (gameObject.group == "craftButton") {
			this.scene.start("craftScreen", {
				"wood": this.wood,
				"stone": this.stone,
				"weeds": this.weeds,
				"bandages": this.bandages,
				"isShelter": this.isShelter,
				"isFire": this.isFire,
				"fireCheck": this.fireCheck,
				"shelterCheck": this.shelterCheck,
				"timerDelay": this.timerDelay,
				"enviroMeter": this.meter_value,
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
		} else if (gameObject.group == "water") {
			this.collected_water += 1;
			this.waterText.destroy();
			this.waterText = this.add.text(150, 650, `Water : ${this.collected_water}`);
			this.waterText.depth = 100;
			this.waterText.setColor("white");
			this.pond.destroy();
			this.pondradius -= 2;
			this.pond = this.add.circle(650, 200, this.pondradius, 0x3382FF);
			this.pond.setDepth(-1);
			this.pond.setInteractive();
			this.pond.group = "water";
			if(this.pondradius <= 0) {
				this.isWater = false;
			}
			this.environment_meter_value(1, "minus");
		}
		else if (gameObject.group == "foodbutton") {
			if(this.collected_food > 0 && this.player_food < 100) {
				this.updatePlayerBars(this.food_bar, 10, "plus");
				this.collected_food -= 1;
				this.foodText.destroy();
				this.foodText = this.add.text(150, 630, `Food : ${this.collected_food}`);
				this.foodText.depth = 100;
				this.foodText.setColor("white");
			}
		}
		else if (gameObject.group == "waterbutton") {
			if(this.collected_water > 0 && this.player_water < 100) {
				this.updatePlayerBars(this.water_bar, 10, "plus");
				this.collected_water -= 1;
				this.waterText.destroy();
				this.waterText = this.add.text(150, 650, `Water : ${this.collected_water}`);
				this.waterText.depth = 100;
				this.waterText.setColor("white");
			}
		}
		else if (gameObject.group == "bandagebutton") {
			if(this.bandages > 0 && this.player_health < 100) {
				this.updatePlayerBars(this.health_bar, 10, "plus");
				this.bandages -= 1;
				this.bandageText.destroy();
				this.bandageText = this.add.text(150, 670, `Bandages : ${this.bandages}`);
				this.bandageText.depth = 100;
				this.bandageText.setColor("white");
		
			}
		}
		else if (gameObject.group = "shelter") {
			if(this.canClickShelter) {
				this.shelterTimerText.setVisible(true);
				this.updatePlayerBars(this.health_bar, 100, "plus");
				this.makeShelterTimer();
				this.canClickShelter = false;
			}
		}
	}

	makeShelterTimer() {
			this.shelterTimer = this.time.addEvent({
				delay: this.shelterTimerDelay,
				args: [],
				callbackScope: this,
				loop: false,
				repeat: 0,
				startAt: 1,
				timeScale: 1,
				paused: false
			});
	}

	update() {
		this.movePlayerManager();
		this.spawnCampfire();
		this.spawnShelter();
		this.day_or_night();
		this.drainhealth();
		this.drainfood();
		this.drainwater();

		//pig movement 
		this.pigMovement(1);

		//timer
		if(this.timer.getRemainingSeconds() >= 100) {
			this.x = 6;
		}
		else if (this.timer.getRemainingSeconds() >= 10) {
			this.x = 5;
		}
		else {
			this.x = 4;
		}

        if (this.pigs.filter(e => e.hp === 0).length === this.num_pigs) {
            // all pigs are dead
            this.health_bars = [];
            this.health_bar_backgrounds = [];
            this.pigs = [];
            for (let i = 0; i < this.num_pigs; i++) {
                this.randomPigPositioning(i);
            }
            this.pigCollisions();
        }
		this.timerDelay = this.timer.getRemainingSeconds() * 1000;
		//console.log(this.timer.getRemainingSeconds());
		this.timerText.setText('Survive for: ' + this.timer.getRemainingSeconds().toString().substring(0, this.x));

		if(!this.canClickShelter) {
			this.shelterTimerDelay = this.shelterTimer.getRemainingSeconds() * 1000;
			this.shelterTimerText.setText(this.shelterTimer.getRemainingSeconds().toString().substring(0, 4));
			if(this.shelterTimer.getRemainingSeconds().toString().substring(0, 4) <= 0) {
				this.shelterTimerText.setVisible(false);
				this.canClickShelter = true;
				this.shelterTimerDelay = 50000;
			}
		}
	}

	spawnCampfire() {
		if(this.isFire && this.fireCheck == 1) {
			this.fireSpawn = this.add.image(450, 125, "campfire");
			this.fireSpawn.setScale(.12);
			this.fireCheck = 2;
			this.fireSpawn.setDepth(-1);
			this.glow1 = this.add.circle(450, 125, 15, 0xF20505, 1);
			this.glow1.setAlpha(.2);
			this.glow1.setDepth(103);
			this.glow2 = this.add.circle(450, 125, 30, 0xEA9734, 1);
			this.glow2.setAlpha(.3);
			this.glow2.setDepth(102);
			this.glow3 = this.add.circle(450, 125, 40, 0xFEF455, 1);
			this.glow3.setAlpha(.2);
			this.glow3.setDepth(101);
		}
	}

	spawnShelter() {
		if(this.isShelter && this.shelterCheck == 1) {
			this.shelterSpawn = this.add.image(350, 100, "shelter");
			this.shelterSpawn.setScale(.3);
			this.shelterCheck = 2;
			this.shelterSpawn.setDepth(-1);
			this.shelterSpawn.setInteractive();
			this.shelterSpawn.group = "shelter";
		}
	}

	movePlayerManager() {
		this.player.setVelocityX(0);
		this.player.setVelocityY(0);
		this.physics.world.remove(this.weaponHitbox.body);
		this.weaponHitbox.body.enable = false;
		if (this.cursorKeys.up.isDown) {
			if (!this.cursorKeys.left.isDown && !this.cursorKeys.right.isDown) {
				this.player.play("walk_up", true);
				this.player.setVelocityX(0);
				this.player.setVelocityY(-gameSettings.playerSpeed);
				this.last_dir = "u";
			} else if (
				this.cursorKeys.left.isDown &&
				!this.cursorKeys.right.isDown
			) {
				this.player.play("walk_up_left", true);
				this.player.setVelocityX(-gameSettings.playerSpeed);
				this.player.setVelocityY(-gameSettings.playerSpeed);
				this.last_dir = "ul";
			} else if (
				!this.cursorKeys.left.isDown &&
				this.cursorKeys.right.isDown
			) {
				this.player.play("walk_up_right", true);
				this.player.setVelocityX(gameSettings.playerSpeed);
				this.player.setVelocityY(-gameSettings.playerSpeed);
				this.last_dir = "ur";
			} else {
				this.player.play("walk_up", true);
				this.player.setVelocityX(0);
				this.player.setVelocityY(-gameSettings.playerSpeed);
				this.last_dir = "u";
			}
		} else if (this.cursorKeys.down.isDown) {
			if (!this.cursorKeys.left.isDown && !this.cursorKeys.right.isDown) {
				this.player.play("walk_down", true);
				this.player.setVelocityX(0);
				this.player.setVelocityY(gameSettings.playerSpeed);
				this.last_dir = "d";
			} else if (
				this.cursorKeys.left.isDown &&
				!this.cursorKeys.right.isDown
			) {
				this.player.play("walk_down_left", true);
				this.player.setVelocityX(-gameSettings.playerSpeed);
				this.player.setVelocityY(gameSettings.playerSpeed);
				this.last_dir = "dl";
			} else if (
				!this.cursorKeys.left.isDown &&
				this.cursorKeys.right.isDown
			) {
				this.player.play("walk_down_right", true);
				this.player.setVelocityX(gameSettings.playerSpeed);
				this.player.setVelocityY(gameSettings.playerSpeed);
				this.last_dir = "dr";
			} else {
				this.player.play("walk_down", true);
				this.player.setVelocityX(0);
				this.player.setVelocityY(gameSettings.playerSpeed);
				this.last_dir = "d";
			}
		} else if (this.cursorKeys.left.isDown) {
			this.player.play("walk_left", true);
			this.player.setVelocityX(-gameSettings.playerSpeed);
			this.player.setVelocityY(0);
			this.last_dir = "l";
		} else if (this.cursorKeys.right.isDown) {
			this.player.play("walk_right", true);
			this.player.setVelocityX(gameSettings.playerSpeed);
			this.player.setVelocityY(0);
			this.last_dir = "r";
		} else if (this.cursorKeys.space.isDown) {
			if (this.last_dir == "r") {
				this.physics.world.add(this.weaponHitbox.body);
				this.player.play("attack_right", true);
				this.weaponHitbox.x = this.player.x + this.player.width * 0.5;
				this.weaponHitbox.y = this.player.y;
			} else if (this.last_dir == "l") {
				this.physics.world.add(this.weaponHitbox.body);
				this.player.play("attack_left", true);
				this.weaponHitbox.x = this.player.x - this.player.width * 0.5;
				this.weaponHitbox.y = this.player.y;
			}
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
		} else {
			this.player.play(this.idle_dirs[this.last_dir], true);
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
		}
	}

	pigCollisions() {
		this.pigs.forEach((eachPig) => {
			this.physics.add.collider(this.player, eachPig, () => {
				const oinkText = this.add.text(
					eachPig.x,
					eachPig.y,
					"Oink!",
					0xfffff,
				);
				setTimeout(() => {
					oinkText.destroy();
				}, 1);
			});
			this.physics.add.overlap(
				this.weaponHitbox,
				eachPig,
				this.handleHitboxCollide,
				undefined,
				this,
			);
		});
		this.pigs = this.pigs.map((eachPig) => {
			eachPig.setInteractive();
			eachPig.addListener("pointerdown", () => {
				console.log(
					`this is a pig at coords: ${eachPig.x},${eachPig.y} with id ${eachPig.id}`,
				);
			});
			return eachPig;
		});
	}

	handleHitboxCollide(obj1, obj2) {
		/** @type {Phaser.GameObjects.Rectangle} */
		const healthBar = this.health_bars[obj2.id];
		if (obj2.hp > 0) {
			healthBar.displayWidth -= 1;
			healthBar.x -= 0.5;
			obj2.hp -= 1;
		} else {
			console.log("in else");
			healthBar.destroy();
			/** @type {Phaser.GameObjects.Rectangle} */
			const healthbarBackground = this.health_bar_backgrounds[obj2.id];
			healthbarBackground.destroy();
			/** @type {Phaser.GameObjects.Sprite} */
			obj2.destroy();
			this.addMeat(obj2.x, obj2.y);
		}
		this.physics.world.remove(this.weaponHitbox);
	}

	randomPigPositioning(pig_num) {
		var x_val = Phaser.Math.Between(150, 700);
		var y_val = Phaser.Math.Between(100, 600);
		this.pig = this.physics.add.existing(
			this.add.sprite(x_val, y_val, "pig-frontfacing"),
			true,
		);
		this.pig.hp = 100;
		this.pig.id = pig_num;
		const healthbarBackground = this.add.rectangle(
			this.pig.x,
			this.pig.y - 30,
			100,
			20,
			0x787475,
			0.4,
		);

		const healthbar = this.add.rectangle(
			this.pig.x,
			this.pig.y - 30,
			this.pig.hp,
			20,
			0xff0000,
			0.55,
		);
		this.health_bars = [...this.health_bars, healthbar];
		this.health_bar_backgrounds = [
			...this.health_bar_backgrounds,
			healthbarBackground,
		];
		// health bar
		this.pig.setScale(1.5);
		this.pig.play("pig-idle-front");
		this.pigs = [...this.pigs, this.pig];
	}

	pigMovement(speed) {
		this.pigs = this.pigs.map((eachPig) => {
            const ind = eachPig.id;
            const health_bar = this.health_bars.splice(ind, 1)[0];
            const health_bar_bg = this.health_bar_backgrounds.splice(ind, 1)[0];
            if (eachPig.hp > 0) {
                eachPig.y += speed;
                if (eachPig.y > config.height) {
                    this.resetPigPosition(eachPig);
                }
                eachPig.body.updateFromGameObject();
                health_bar.y = eachPig.y - 35;
                health_bar.x = eachPig.x;
                health_bar_bg.y = eachPig.y - 35;
                health_bar_bg.x = eachPig.x;
            } else {
                eachPig.destroy();
                health_bar.destroy();
                health_bar_bg.destroy();
            }
            this.health_bar_backgrounds.splice(ind, 0, health_bar_bg);
            this.health_bars.splice(ind, 0, health_bar);
            return eachPig;
		});
	}
	resetPigPosition(a_pig) {
		a_pig.y = 0
		var rand_x = Phaser.Math.Between(0, config.width);
		a_pig.x = rand_x;
	}
}

export default Scene2;
