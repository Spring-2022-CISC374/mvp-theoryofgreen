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
	}

	environment_meter_counter() {
		this.environmentMeter = 100;
		this.environmentMeterText = this.add.text(400, 15, `ENVIRONMENT METER : ${this.environmentMeter}`);
		this.environmentMeterText.setOrigin(0.5, 0.5);
		this.environmentMeterText.setColor('white');
		const environment_meter = this.add.rectangle(400, 35, 300, 20, 0xffffff, 1);

		
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
		this.environment_meter_counter();

		//player - allison
		this.player = this.physics.add.sprite(300, 300, "player");
		this.player.setSize(25, 20);
		this.player.setScale(2);
		this.player.play("idle_down");
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.player.setCollideWorldBounds(true);

		//Objects and animals - zoe
		var rand_val = Phaser.Math.Between(5, 7);
		for (let i = 0; i < rand_val; i++) {
			this.randomPigPositioning(i);
		}

		/** @type{Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody} */
		this.weaponHitbox = this.add.rectangle(0, 0, 40, 35, 0xfffff, 0);
		this.physics.add.existing(this.weaponHitbox);

		this.pigCollisions();
	}

	click(pointer, gameObject) {
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
		} else if (gameObject.group == "craftButton") {
			this.scene.start("craftScreen", {
				"wood": this.wood,
				"stone": this.stone,
				"weeds": this.weeds,
				"bandages": this.bandages,
				"isShelter": this.isShelter,
				"isFire": this.isFire,
				"fireCheck": this.fireCheck,
				"shelterCheck": this.shelterCheck
			});
		}
	}

	update() {
		this.movePlayerManager();
		this.spawnCampfire();
		this.spawnShelter();
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
				}, 100);
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
		this.physics.add.staticGroup(this.pigs);
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
}

export default Scene2;
