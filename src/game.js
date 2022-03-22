import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";
import Phaser from "phaser";

var gameSettings = {
	playerSpeed: 200
}	

var config = {
	width: 800,
	height: 700,
    type: Phaser.AUTO,
	backgroundColor: 0x000000,
	physics: {
		default: "arcade",
		arcade:{
			debug: false
		}
	}
}

var game = new Phaser.Game(config);

game.scene.add('titleScreen', Scene1);
game.scene.add('scene2', Scene2);

game.scene.start('scene2');