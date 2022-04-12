import frontIdle from "../../assets/sprites/player/frontidle.png";
import backIdle from "../../assets/sprites/player/backidle.png";
import leftIdle from "../../assets/sprites/player/leftidle.png";
import rightIdle from "../../assets/sprites/player/rightIdle.png";
import upWalk from "../../assets/sprites/player/upwalk.png";
import downWalk from "../../assets/sprites/player/downwalk.png";
import leftWalk from "../../assets/sprites/player/leftwalk.png";
import rightWalk from "../../assets/sprites/player/rightwalk.png";
import attackRight from "../../assets/sprites/player/attack.png";
import attackLeft from "../../assets/sprites/player/attack_left.png";
import diagUpLeft from "../../assets/sprites/player/diag_up_left.png";
import diagUpLeftIdle from "../../assets/sprites/player/diag_up_left_idle.png";
import diagUpRight from "../../assets/sprites/player/diag_up_right.png";
import diagUpRightIdle from "../../assets/sprites/player/diag_up_right_idle.png";
import diagDownLeft from "../../assets/sprites/player/diag_down_left.png";
import diagDownLeftIdle from "../../assets/sprites/player/diag_down_left_idle.png";
import diagDownRight from "../../assets/sprites/player/diag_down_right.png";
import diagDownRightIdle from "../../assets/sprites/player/diag_down_right_idle.png";
// Animal imports
import pigFront from "../../assets/sprites/pig/pig-frontfacing.png";
import pigBack from "../../assets/sprites/pig/pig-backfacing.png";
import wood from "../../assets/sprites/wood.png";
import stone from "../../assets/sprites/rock.png";
import weeds from "../../assets/sprites/weeds.png";
import campfire from "../../assets/sprites/campfire.png";
import bandage from "../../assets/sprites/bandage.png";
import shelter from "../../assets/sprites/shelter.png";

class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    // #region SPRITESHEETS

    this.load.spritesheet("player", frontIdle, {
      frameWidth: 41,
      frameHeight: 41,
    });

    this.load.spritesheet("player_up_left", diagUpLeft, {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_up_right", diagUpRight, {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_down_left", diagDownLeft, {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_down_right", diagDownRight, {
      frameWidth: 26.1,
      frameHeight: 33,
    });

    this.load.spritesheet("player_up_left_idle", diagUpLeftIdle, {
      frameWidth: 30.9,
      frameHeight: 38,
    });

    this.load.spritesheet("player_up_right_idle", diagUpRightIdle, {
      frameWidth: 30.1,
      frameHeight: 38,
    });

    this.load.spritesheet("player_down_right_idle", diagDownRightIdle, {
      frameWidth: 28.2,
      frameHeight: 35,
    });

    this.load.spritesheet("player_down_left_idle", diagDownLeftIdle, {
      frameWidth: 28.2,
      frameHeight: 35,
    });

    this.load.spritesheet("player_back", backIdle, {
      frameWidth: 41,
      frameHeight: 41,
    });

    this.load.spritesheet("player_left", leftIdle, {
      frameWidth: 33,
      frameHeight: 40,
    });

    this.load.spritesheet("player_right", rightIdle, {
      frameWidth: 33,
      frameHeight: 40,
    });

    this.load.spritesheet("upwalk", upWalk, {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("downwalk", downWalk, {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("leftwalk", leftWalk, {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("rightwalk", rightWalk, {
      frameWidth: 41.12,
      frameHeight: 41,
    });

    this.load.spritesheet("attack-right", attackRight, {
      frameWidth: 51,
      frameHeight: 35,
    });

    this.load.spritesheet("attack-left", attackLeft, {
      frameWidth: 50,
      frameHeight: 35,
    });

    //Objects and animals
    this.load.spritesheet("pig-frontfacing", pigFront, {
      frameWidth: 32,
      frameHeight: 36,
    });

    this.load.spritesheet("pig-backfacing", pigBack, {
      frameWidth: 31,
      frameHeight: 36,
    });
    // #endregion

    // #region IMAGES
    this.load.image("wood", wood);

    this.load.image("stone", stone);

    this.load.image("weeds", weeds);
    // #endregion

    this.load.image("campfire", campfire);
    this.load.image("bandage", bandage);
    this.load.image("shelter", shelter);
  }

  create() {
    this.wood = 0;
    this.stone = 0;
    this.weeds = 0;
    this.bandages = 0;
    this.isShelter = false;
    this.isFire = false;
    this.fireCheck = 0;
    this.shelterCheck = 0;
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame", {
      "wood": this.wood,
      "stone": this.stone,
      "weeds": this.weeds,
      "bandages": this.bandages,
      "isShelter": this.isShelter,
      "isFire": this.isFire,
      "fireCheck": this.fireCheck,
      "shelterCheck": this.shelterCheck
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
      frameRate: 13,
      repeat: -1,
    });
    this.anims.create({
      key: "pig-idle-back",
      frames: this.anims.generateFrameNumbers("pig-backfacing"),
      frameRate: 13,
      repeat: -1,
    });

    // #endregion
  }
}

export default Scene1;
