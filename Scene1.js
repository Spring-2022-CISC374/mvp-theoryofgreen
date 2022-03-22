class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}

    preload() {
        this.load.spritesheet({
          key: "player", 
          url: "assets/sprites/player/frontidle.png", 
          frameConfig: {
            frameWidth: 41,
            frameHeight: 41
          }
        });

        this.load.spritesheet({
          key: "player_back", 
          url: "assets/sprites/player/backidle.png", 
          frameConfig: {
            frameWidth: 41,
            frameHeight: 41
          }
        });

        this.load.spritesheet({
          key: "player_left", 
          url: "assets/sprites/player/leftidle.png", 
          frameConfig: {
            frameWidth: 33,
            frameHeight: 40
          }
        });

        this.load.spritesheet({
          key: "player_right", 
          url: "assets/sprites/player/rightidle.png", 
          frameConfig: {
            frameWidth: 33,
            frameHeight: 40
          }
        });

        this.load.spritesheet({
          key: "upwalk", 
          url: "assets/sprites/player/upwalk.png", 
          frameConfig: {
            frameWidth: 41.12,
            frameHeight: 41
          }
        });

        this.load.spritesheet({
          key: "downwalk", 
          url: "assets/sprites/player/downwalk.png", 
          frameConfig: {
            frameWidth: 41.12,
            frameHeight: 41
          }
        });

        this.load.spritesheet({
          key: "leftwalk", 
          url: "assets/sprites/player/leftwalk.png", 
          frameConfig: {
            frameWidth: 41.12,
            frameHeight: 41
          }
        });

        this.load.spritesheet({
          key: "rightwalk", 
          url: "assets/sprites/player/rightwalk.png", 
          frameConfig: {
            frameWidth: 41.12,
            frameHeight: 41
          }
        });

        //Objects and animals
        this.load.spritesheet({
          key: "pig-frontfacing",
          url: "assets/sprites/pig/pig-frontfacing.png",
          frameConfig: {
            frameWidth:32,
            frameHeight:36
          }
        });
        this.load.spritesheet({
          key: "pig-backfacing",
          url: "assets/sprites/pig/pig-backfacing.png",
          frameConfig: {
            frameWidth:31,
            frameHeight:36
          }
        });
      }

    create() {
		  this.add.text(20, 20, "Loading game...");
		  this.scene.start("playGame");

      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "idle_back",
        frames: this.anims.generateFrameNumbers("player_back"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "idle_left",
        frames: this.anims.generateFrameNumbers("player_left"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "idle_right",
        frames: this.anims.generateFrameNumbers("player_right"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "walk_up",
        frames: this.anims.generateFrameNumbers("upwalk"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "walk_down",
        frames: this.anims.generateFrameNumbers("downwalk"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "walk_left",
        frames: this.anims.generateFrameNumbers("leftwalk"),
        frameRate: 13,
        repeat: -1
      });

      this.anims.create({
        key: "walk_right",
        frames: this.anims.generateFrameNumbers("rightwalk"),
        frameRate: 13,
        repeat: -1
      });

      //Objects and animals
      this.anims.create({
        key: "pig-idle-front",
        frames: this.anims.generateFrameNumbers("pig-frontfacing"),
        frameRate: 13,
        repeat: -1
      });
      this.anims.create({
        key: "pig-idle-back",
        frames: this.anims.generateFrameNumbers("pig-backfacing"),
        frameRate: 13,
        repeat: -1
      });

    }
}