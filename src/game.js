var gameSettings = {
	playerSpeed: 200
}	

var config = {
	width: 800,
	height: 700,
    type: Phaser.AUTO,
	backgroundColor: 0x4AA04A,
	scene: [Scene1, Scene2, Scene3, Scene4, Instructions],
    title: "Theory of Green",
	physics: {
		default: "arcade",
		arcade:{
			debug: false
		}
	}
}

var game = new Phaser.Game(config);