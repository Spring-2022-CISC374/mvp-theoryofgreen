// import Scene1 from "./Scene1";
// import Scene2 from "./Scene2";
// import Phaser from "phaser";

var gameSettings = {
	playerSpeed: 200
}	

var config = {
	width: 800,
	height: 700,
	backgroundColor: 0x4AA04A,
	scene: [Scene1, Scene2],
	physics: {
		default: "arcade",
		arcade:{
			debug: false
		}
	}
}

var game = new Phaser.Game(config);