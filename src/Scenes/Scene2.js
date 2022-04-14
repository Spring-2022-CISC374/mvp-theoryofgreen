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
	}

	//environmental meter
	environment_meter() {
		this.meter_value = 100;
		this.bar_size = 100;
		this.meter_label = this.add.text(400, 5, `ENVIRONMENT METER : ${this.meter_value}`);
		this.meter_label.setOrigin(0.5,0,5);
		this.meter_label.setColor('white');

		this.meter_bar = this.add.rectangle(400, 30, this.bar_size, 20, 0xfffffff, 1);
		this.meter_bar.scaleX = 3;
	}

	environment_meter_value(amount) {
		this.meter_value -= amount;
		this.meter_label.text = `ENVIRONMENT METER : ${this.meter_value}`;

		//bar color and size
		this.meter_bar.setSize(this.bar_size--, 20);
		if (this.meter_value >= 90) {
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
			woody.setRandomPosition(100, 100, 650, 550);
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
			stony.setRandomPosition(100, 100, 650, 550);
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
			weedy.setRandomPosition(100, 100, 650, 550);
			this.weedsCount++;
		}

		this.bandageText = this.add.text(150, 670, `Bandages : ${this.bandages}`);
		this.bandageText.depth = 100;
		this.bandageText.setColor("white");
	}

	create() {
		this.craft = this.add.text(25, 25, "Click to craft!");
		this.craft.group = "craftButton";
		this.craft.setColor("white");
		this.craft.setInteractive();
        this.num_pigs = 0

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
		console.log("click");
		if (gameObject.group == "wood") {
			this.wood += 1;
			this.woodText.destroy();
			this.woodText = this.add.text(20, 630, `Wood : ${this.wood}`);
			gameObject.destroy();
			this.woodCount--;
			if (this.woodCount < 1) {
				while (this.woodCount < 5) {
					var woody = this.add.sprite(16, 16, "wood");
					woody.group = "wood";
					woody.setScale(0.1);
					woody.setInteractive();
					this.woods.add(woody);
					woody.setRandomPosition(100, 100, 650, 550);
					this.woodCount++;
				}
			}
			// envi impact wood = 1
			this.environment_meter_value(1);
		} else if (gameObject.group == "stone") {
			this.stone += 1;
			this.stoneText.destroy();
			this.stoneText = this.add.text(19, 650, `Stone : ${this.stone}`);
			gameObject.destroy();
			this.stoneCount--;
			if (this.stoneCount < 1) {
				while (this.stoneCount < 5) {
					var stony = this.add.sprite(16, 16, "stone");
					stony.group = "stone";
					stony.setScale(0.1);
					stony.setInteractive();
					this.stones.add(stony);
					stony.setRandomPosition(100, 100, 650, 550);
					this.stoneCount++;
				}
			}
			//envi impact stone = 1
			this.environment_meter_value(1);
		} else if (gameObject.group == "weeds") {
			this.weeds += 1;
			this.weedsText.destroy();
			this.weedsText = this.add.text(20, 670, `Weeds : ${this.weeds}`);
			gameObject.destroy();
			this.weedsCount--;
			if (this.weedsCount < 1) {
				while (this.weedsCount < 5) {
					var weedy = this.add.sprite(16, 16, "weeds");
					weedy.group = "weeds";
					weedy.setScale(0.1);
					weedy.setInteractive();
					this.weedss.add(weedy);
					weedy.setRandomPosition(100, 100, 650, 550);
					this.weedsCount++;
				}
			}
			//envi impact weeds = 1
			this.environment_meter_value(1);
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
				"timerDelay": this.timerDelay
			});
		}
	}

	update() {
		this.movePlayerManager();
		this.spawnCampfire();
		this.spawnShelter();

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
        console.log("# of pigs with 0 hp = ", this.pigs.filter(e => e.hp === 0).length);
		this.timerDelay = this.timer.getRemainingSeconds() * 1000;
		//console.log(this.timer.getRemainingSeconds());
		this.timerText.setText('Survive for: ' + this.timer.getRemainingSeconds().toString().substring(0, this.x));
	}

	spawnCampfire() {
		if(this.isFire && this.fireCheck == 1) {
			this.fireSpawn = this.add.image(500, 75, "campfire");
			this.fireSpawn.setScale(.12);
			this.fireCheck = 2;
		}
	}

	spawnShelter() {
		if(this.isShelter && this.shelterCheck == 1) {
			this.shelterSpawn = this.add.image(400, 50, "shelter");
			this.shelterSpawn.setScale(.3);
			this.shelterCheck = 2;
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
        console.log("in pig collisions");
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
			obj2.hp -= 5;
		} else {
			console.log("in else");
			healthBar.destroy();
			/** @type {Phaser.GameObjects.Rectangle} */
			const healthbarBackground = this.health_bar_backgrounds[obj2.id];
			healthbarBackground.destroy();
			/** @type {Phaser.GameObjects.Sprite} */
			obj2.destroy();
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
