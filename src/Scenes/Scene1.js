class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    //audio loading
    //this.load.audio("background_music", ["assets/audio/music.mp3"]);

    // #region SPRITESHEETS

    this.load.spritesheet("player", "assets/sprites/player/frontidle.png", {
      frameWidth: 41,
      frameHeight: 41,
    });

    this.load.spritesheet("player_up_left", "assets/sprites/player/diag_up_left.png", {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_up_right", "assets/sprites/player/diag_up_right.png", {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_down_left", "assets/sprites/player/diag_down_left.png", {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_down_right", "assets/sprites/player/diag_down_right.png", {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_up_left_idle", "assets/sprites/player/diag_up_left_idle.png", {
      frameWidth: 30.9,
      frameHeight: 38,
    });

    this.load.spritesheet("player_up_right_idle", "assets/sprites/player/diag_up_right_idle.png", {
      frameWidth: 30.1,
      frameHeight: 38,
    });

    this.load.spritesheet("player_down_right_idle", "assets/sprites/player/diag_down_right_idle.png", {
      frameWidth: 28.2,
      frameHeight: 35,
    });

    this.load.spritesheet("player_down_left_idle", "assets/sprites/player/diag_down_left_idle.png", {
      frameWidth: 28.2,
      frameHeight: 35,
    });

    this.load.spritesheet("player_back", "assets/sprites/player/backidle.png", {
      frameWidth: 41,
      frameHeight: 41,
    });

    this.load.spritesheet("player_left", "assets/sprites/player/leftidle.png", {
      frameWidth: 33,
      frameHeight: 40,
    });

    this.load.spritesheet("player_right", "assets/sprites/player/rightidle.png", {
      frameWidth: 33,
      frameHeight: 40,
    });

    this.load.spritesheet("upwalk", "assets/sprites/player/upwalk.png", {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("downwalk", "assets/sprites/player/downwalk.png", {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("leftwalk", "assets/sprites/player/leftwalk.png", {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("rightwalk", "assets/sprites/player/rightwalk.png", {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("attack-right", "assets/sprites/player/attack.png", {
      frameWidth: 51,
      frameHeight: 35,
    });

    this.load.spritesheet("attack-left", "assets/sprites/player/attack_left.png", {
      frameWidth: 50,
      frameHeight: 35,
    });

    //Objects and animals
    this.load.spritesheet("pig-frontfacing", "assets/sprites/pig/pig-frontfacing.png", {
      frameWidth: 32,
      frameHeight: 36,
    });

    this.load.spritesheet("pig-backfacing", "assets/sprites/pig/pig-backfacing.png", {
      frameWidth: 31,
      frameHeight: 36,
    });
    // #endregion

    // #region IMAGES
    this.load.image("wood", "assets/sprites/wood.png");
    this.load.image("stone", "assets/sprites/rock.png");
    this.load.image("weeds", "assets/sprites/weeds.png");
    this.load.image("meat", "assets/sprites/meat.png");
    // #endregion

    this.load.image("campfire", "assets/sprites/campfire.png");
    this.load.image("bandage", "assets/sprites/bandage.png");
    this.load.image("shelter", "assets/sprites/shelter.png");

    //edu elements
    this.load.image("berry-bush", "assets/plants/berry_bush.png");
    this.load.image("poisonous-mushroom", "assets/plants/poison_mushroom.png");
    this.load.image("berry-bush-text", "assets/plants/berry-bush-text.png");
    this.load.image("poisonous-mushroom-text", "assets/plants/poisonous-mushroom-text.png");

    this.load.image("sun", "assets/sprites/sun.png");
    this.load.image("moon", "assets/sprites/moon.png");

    this.load.image("envirobar-image", "assets/sprites/envirobar.png");
    this.load.image("playerbars-image", "assets/sprites/playerbars.png");
  }

  create() {
    //materials
    this.wood = 0;
    this.stone = 0;
    this.weeds = 0;
    //objects
    this.bandages = 0;
    
  }

  create() {
    //audio
    // this.music = this.sound.add("background_music");
    // var musicConfig = {
    //   mute: false,
    //   volume: .01,
    //   detune: 0,
    //   seek: 0,
    //   loop: true,
    //   delay: 0
    // }
    // this.music.play(musicConfig);
    
    this.wood = 10;
    this.stone = 10;
    this.weeds = 10;
    this.bandages = 1;
    this.meat = 0;
    this.isShelter = false;
    this.isFire = false;
    this.fireCheck = 0;
    this.shelterCheck = 0;
    this.timerDelay = 300000;
    this.enviro_meter_value = 100;
    this.player_health = 100;
    this.player_food = 100;
    this.player_water = 100;
    this.collected_water = 3;
    this.collected_food = 3;
    this.isNight = false;
    this.isWater = true;
    this.pondradius = 120;
    this.canClickShelter = true;
    this.shelterTimerDelay = 50000;

    this.add.text(20, 20, "Loading game...");
    this.scene.start("infoScreen", {
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
      "enviroMeter": this.enviro_meter_value,
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

    // #region ANIMS

    this.anims.create({
      key: "idle_down",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_back",
      frames: this.anims.generateFrameNumbers("player_back"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_left",
      frames: this.anims.generateFrameNumbers("player_left"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_right",
      frames: this.anims.generateFrameNumbers("player_right"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_down_right",
      frames: this.anims.generateFrameNumbers("player_down_right_idle"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_up_right",
      frames: this.anims.generateFrameNumbers("player_up_right_idle"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_up_left",
      frames: this.anims.generateFrameNumbers("player_up_left_idle"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "idle_down_left",
      frames: this.anims.generateFrameNumbers("player_down_left_idle"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_down_right",
      frames: this.anims.generateFrameNumbers("player_down_right"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_up_right",
      frames: this.anims.generateFrameNumbers("player_up_right"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_down_left",
      frames: this.anims.generateFrameNumbers("player_down_left"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_up_left",
      frames: this.anims.generateFrameNumbers("player_up_left"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("upwalk"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("downwalk"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("leftwalk"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("rightwalk"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "attack_right",
      frames: this.anims.generateFrameNumbers("attack-right"),
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: "attack_left",
      frames: this.anims.generateFrameNumbers("attack-left"),
      frameRate: 13,
      repeat: -1,
    });

    //Objects and animals
    this.anims.create({
      key: "pig-idle-front",
      frames: this.anims.generateFrameNumbers("pig-frontfacing"),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "pig-idle-back",
      frames: this.anims.generateFrameNumbers("pig-backfacing"),
      frameRate: 5,
      repeat: -1,
    });

    // #endregion
  }
}

//export default Scene1;
